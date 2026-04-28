import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, ticketsTable, customersTable, employeesTable } from "@workspace/db";
import {
  CreateTicketBody,
  UpdateTicketBody,
  GetTicketParams,
  UpdateTicketParams,
  DeleteTicketParams,
} from "@workspace/api-zod";
import { serializeTicketRow } from "../lib/serializers";

const router: IRouter = Router();

function generateTicketNumber(id: number): string {
  const year = new Date().getFullYear();
  return `SRT-${year}-${String(id).padStart(4, "0")}`;
}

router.get("/tickets", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      ticket: ticketsTable,
      customer: customersTable,
      assignee: employeesTable,
    })
    .from(ticketsTable)
    .leftJoin(customersTable, eq(ticketsTable.customerId, customersTable.id))
    .leftJoin(employeesTable, eq(ticketsTable.assignedToId, employeesTable.id))
    .orderBy(desc(ticketsTable.createdAt));
  res.json(
    rows.map(({ ticket, customer, assignee }) =>
      serializeTicketRow(ticket, customer?.name ?? "Unknown", assignee),
    ),
  );
});

router.post("/tickets", async (req, res): Promise<void> => {
  const parsed = CreateTicketBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;

  const [inserted] = await db
    .insert(ticketsTable)
    .values({
      ticketNumber: "TEMP",
      customerId: data.customerId,
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      status: data.status,
      category: data.category,
      assignedToId: data.assignedToId ?? null,
      resolvedAt: data.status === "resolved" || data.status === "closed" ? new Date() : null,
    })
    .returning();

  const ticketNumber = generateTicketNumber(inserted.id);
  const [row] = await db
    .update(ticketsTable)
    .set({ ticketNumber })
    .where(eq(ticketsTable.id, inserted.id))
    .returning();

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, row.customerId));
  let assignee = null;
  if (row.assignedToId) {
    const [a] = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, row.assignedToId));
    assignee = a ?? null;
  }
  res.status(201).json(serializeTicketRow(row, customer?.name ?? "Unknown", assignee));
});

router.get("/tickets/:id", async (req, res): Promise<void> => {
  const params = GetTicketParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [result] = await db
    .select({
      ticket: ticketsTable,
      customer: customersTable,
      assignee: employeesTable,
    })
    .from(ticketsTable)
    .leftJoin(customersTable, eq(ticketsTable.customerId, customersTable.id))
    .leftJoin(employeesTable, eq(ticketsTable.assignedToId, employeesTable.id))
    .where(eq(ticketsTable.id, params.data.id));

  if (!result) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }
  res.json(
    serializeTicketRow(result.ticket, result.customer?.name ?? "Unknown", result.assignee),
  );
});

router.patch("/tickets/:id", async (req, res): Promise<void> => {
  const params = UpdateTicketParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateTicketBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [existing] = await db
    .select()
    .from(ticketsTable)
    .where(eq(ticketsTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }

  const becameResolved =
    (data.status === "resolved" || data.status === "closed") && !existing.resolvedAt;

  const [row] = await db
    .update(ticketsTable)
    .set({
      customerId: data.customerId,
      subject: data.subject,
      description: data.description,
      priority: data.priority,
      status: data.status,
      category: data.category,
      assignedToId: data.assignedToId ?? null,
      resolvedAt: becameResolved
        ? new Date()
        : data.status === "open" || data.status === "in_progress" || data.status === "on_hold"
          ? null
          : existing.resolvedAt,
    })
    .where(eq(ticketsTable.id, params.data.id))
    .returning();

  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, row.customerId));
  let assignee = null;
  if (row.assignedToId) {
    const [a] = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, row.assignedToId));
    assignee = a ?? null;
  }
  res.json(serializeTicketRow(row, customer?.name ?? "Unknown", assignee));
});

router.delete("/tickets/:id", async (req, res): Promise<void> => {
  const params = DeleteTicketParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(ticketsTable)
    .where(eq(ticketsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Ticket not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
