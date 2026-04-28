import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import {
  db,
  customersTable,
  installationsTable,
  ticketsTable,
  invoicesTable,
  employeesTable,
} from "@workspace/db";
import {
  CreateCustomerBody,
  UpdateCustomerBody,
  GetCustomerParams,
  UpdateCustomerParams,
  DeleteCustomerParams,
} from "@workspace/api-zod";
import { serializeCustomer } from "../lib/serializers";
import {
  serializeInstallationRow,
  serializeTicketRow,
  serializeInvoiceRow,
} from "../lib/serializers";

const router: IRouter = Router();

router.get("/customers", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(customersTable)
    .orderBy(desc(customersTable.createdAt));
  res.json(rows.map(serializeCustomer));
});

router.post("/customers", async (req, res): Promise<void> => {
  const parsed = CreateCustomerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db.insert(customersTable).values(parsed.data).returning();
  res.status(201).json(serializeCustomer(row));
});

router.get("/customers/:id", async (req, res): Promise<void> => {
  const params = GetCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const id = params.data.id;

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, id));

  if (!customer) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  const installations = await db
    .select()
    .from(installationsTable)
    .where(eq(installationsTable.customerId, id))
    .orderBy(desc(installationsTable.createdAt));

  const ticketRows = await db
    .select({
      ticket: ticketsTable,
      assignee: employeesTable,
    })
    .from(ticketsTable)
    .leftJoin(employeesTable, eq(ticketsTable.assignedToId, employeesTable.id))
    .where(eq(ticketsTable.customerId, id))
    .orderBy(desc(ticketsTable.createdAt));

  const invoices = await db
    .select()
    .from(invoicesTable)
    .where(eq(invoicesTable.customerId, id))
    .orderBy(desc(invoicesTable.createdAt));

  res.json({
    ...serializeCustomer(customer),
    installations: installations.map((i) =>
      serializeInstallationRow(i, customer.name),
    ),
    tickets: ticketRows.map(({ ticket, assignee }) =>
      serializeTicketRow(ticket, customer.name, assignee),
    ),
    invoices: invoices.map((i) => serializeInvoiceRow(i, customer.name)),
  });
});

router.patch("/customers/:id", async (req, res): Promise<void> => {
  const params = UpdateCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateCustomerBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [row] = await db
    .update(customersTable)
    .set(parsed.data)
    .where(eq(customersTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }

  res.json(serializeCustomer(row));
});

router.delete("/customers/:id", async (req, res): Promise<void> => {
  const params = DeleteCustomerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [row] = await db
    .delete(customersTable)
    .where(eq(customersTable.id, params.data.id))
    .returning();

  if (!row) {
    res.status(404).json({ error: "Customer not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
