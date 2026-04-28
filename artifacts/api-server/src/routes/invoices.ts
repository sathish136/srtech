import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, invoicesTable, customersTable } from "@workspace/db";
import type { InvoiceItem } from "@workspace/db";
import {
  CreateInvoiceBody,
  UpdateInvoiceBody,
  GetInvoiceParams,
  UpdateInvoiceParams,
  DeleteInvoiceParams,
} from "@workspace/api-zod";
import { serializeInvoiceRow, toDateStringRequired } from "../lib/serializers";

const router: IRouter = Router();

function generateInvoiceNumber(id: number): string {
  const year = new Date().getFullYear();
  return `INV-${year}-${String(id).padStart(4, "0")}`;
}

router.get("/invoices", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      invoice: invoicesTable,
      customer: customersTable,
    })
    .from(invoicesTable)
    .leftJoin(customersTable, eq(invoicesTable.customerId, customersTable.id))
    .orderBy(desc(invoicesTable.createdAt));
  res.json(
    rows.map(({ invoice, customer }) =>
      serializeInvoiceRow(invoice, customer?.name ?? "Unknown"),
    ),
  );
});

router.post("/invoices", async (req, res): Promise<void> => {
  const parsed = CreateInvoiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const items = (data.items ?? []) as InvoiceItem[];

  const [inserted] = await db
    .insert(invoicesTable)
    .values({
      invoiceNumber: "TEMP",
      customerId: data.customerId,
      issueDate: toDateStringRequired(data.issueDate),
      dueDate: toDateStringRequired(data.dueDate),
      status: data.status,
      subtotal: String(data.subtotal),
      tax: String(data.tax),
      total: String(data.total),
      notes: data.notes ?? null,
      items,
    })
    .returning();

  const invoiceNumber = generateInvoiceNumber(inserted.id);
  const [row] = await db
    .update(invoicesTable)
    .set({ invoiceNumber })
    .where(eq(invoicesTable.id, inserted.id))
    .returning();

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, row.customerId));
  res.status(201).json(serializeInvoiceRow(row, customer?.name ?? "Unknown"));
});

router.get("/invoices/:id", async (req, res): Promise<void> => {
  const params = GetInvoiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [result] = await db
    .select({
      invoice: invoicesTable,
      customer: customersTable,
    })
    .from(invoicesTable)
    .leftJoin(customersTable, eq(invoicesTable.customerId, customersTable.id))
    .where(eq(invoicesTable.id, params.data.id));
  if (!result) {
    res.status(404).json({ error: "Invoice not found" });
    return;
  }
  res.json(serializeInvoiceRow(result.invoice, result.customer?.name ?? "Unknown"));
});

router.patch("/invoices/:id", async (req, res): Promise<void> => {
  const params = UpdateInvoiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateInvoiceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const items = (data.items ?? []) as InvoiceItem[];
  const [row] = await db
    .update(invoicesTable)
    .set({
      customerId: data.customerId,
      issueDate: toDateStringRequired(data.issueDate),
      dueDate: toDateStringRequired(data.dueDate),
      status: data.status,
      subtotal: String(data.subtotal),
      tax: String(data.tax),
      total: String(data.total),
      notes: data.notes ?? null,
      items,
    })
    .where(eq(invoicesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Invoice not found" });
    return;
  }
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, row.customerId));
  res.json(serializeInvoiceRow(row, customer?.name ?? "Unknown"));
});

router.delete("/invoices/:id", async (req, res): Promise<void> => {
  const params = DeleteInvoiceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(invoicesTable)
    .where(eq(invoicesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Invoice not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
