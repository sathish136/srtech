import { Router, type IRouter } from "express";
import { eq, desc, sql } from "drizzle-orm";
import { db, leadsTable, employeesTable } from "@workspace/db";
import type { Lead, Employee } from "@workspace/db";

const router: IRouter = Router();

function serializeLead(row: Lead, assignee: Employee | null) {
  return {
    id: row.id,
    leadNumber: row.leadNumber,
    name: row.name,
    contactPerson: row.contactPerson,
    phone: row.phone,
    email: row.email,
    city: row.city,
    source: row.source,
    requirement: row.requirement,
    estimatedValue: Number(row.estimatedValue),
    status: row.status,
    assignedToId: row.assignedToId ?? null,
    assignedToName: assignee?.name ?? null,
    nextFollowUpDate: row.nextFollowUpDate ?? null,
    notes: row.notes ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

function leadNumber(id: number): string {
  const year = new Date().getFullYear();
  return `LEAD-${year}-${String(id).padStart(4, "0")}`;
}

router.get("/leads/summary", async (_req, res): Promise<void> => {
  const [total] = await db.select({ c: sql<number>`count(*)::int` }).from(leadsTable);

  const byStatusRows = await db
    .select({
      status: leadsTable.status,
      count: sql<number>`count(*)::int`,
      value: sql<string>`coalesce(sum(${leadsTable.estimatedValue}), 0)`,
    })
    .from(leadsTable)
    .groupBy(leadsTable.status);

  const [hot] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(leadsTable)
    .where(sql`${leadsTable.status} in ('qualified','proposal','negotiation')`);

  const [pipeline] = await db
    .select({ s: sql<string>`coalesce(sum(${leadsTable.estimatedValue}), 0)` })
    .from(leadsTable)
    .where(sql`${leadsTable.status} not in ('won','lost')`);

  const [won] = await db
    .select({ s: sql<string>`coalesce(sum(${leadsTable.estimatedValue}), 0)` })
    .from(leadsTable)
    .where(eq(leadsTable.status, "won"));

  res.json({
    total: total?.c ?? 0,
    byStatus: byStatusRows.map((r) => ({
      status: r.status,
      count: r.count,
      value: Number(r.value),
    })),
    hotLeads: hot?.c ?? 0,
    pipelineValue: Number(pipeline?.s ?? 0),
    wonValue: Number(won?.s ?? 0),
  });
});

router.get("/leads", async (_req, res): Promise<void> => {
  const rows = await db
    .select({ lead: leadsTable, assignee: employeesTable })
    .from(leadsTable)
    .leftJoin(employeesTable, eq(leadsTable.assignedToId, employeesTable.id))
    .orderBy(desc(leadsTable.createdAt));
  res.json(rows.map(({ lead, assignee }) => serializeLead(lead, assignee)));
});

router.get("/leads/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const [result] = await db
    .select({ lead: leadsTable, assignee: employeesTable })
    .from(leadsTable)
    .leftJoin(employeesTable, eq(leadsTable.assignedToId, employeesTable.id))
    .where(eq(leadsTable.id, id));
  if (!result) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  res.json(serializeLead(result.lead, result.assignee));
});

router.post("/leads", async (req, res): Promise<void> => {
  const body = req.body ?? {};
  if (!body.name || !body.phone) {
    res.status(400).json({ error: "name and phone are required" });
    return;
  }

  const [inserted] = await db
    .insert(leadsTable)
    .values({
      leadNumber: "TEMP",
      name: body.name,
      contactPerson: body.contactPerson ?? body.name,
      phone: body.phone,
      email: body.email ?? "",
      city: body.city ?? "",
      source: body.source ?? "walk_in",
      requirement: body.requirement ?? "",
      estimatedValue: String(body.estimatedValue ?? 0),
      status: body.status ?? "new",
      assignedToId: body.assignedToId ?? null,
      nextFollowUpDate: body.nextFollowUpDate ?? null,
      notes: body.notes ?? null,
    })
    .returning();

  const [row] = await db
    .update(leadsTable)
    .set({ leadNumber: leadNumber(inserted.id) })
    .where(eq(leadsTable.id, inserted.id))
    .returning();

  let assignee: Employee | null = null;
  if (row.assignedToId) {
    const [a] = await db.select().from(employeesTable).where(eq(employeesTable.id, row.assignedToId));
    assignee = a ?? null;
  }
  res.status(201).json(serializeLead(row, assignee));
});

router.patch("/leads/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!id) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const body = req.body ?? {};
  const updates: Record<string, unknown> = {};
  for (const k of [
    "name",
    "contactPerson",
    "phone",
    "email",
    "city",
    "source",
    "requirement",
    "status",
    "assignedToId",
    "nextFollowUpDate",
    "notes",
  ]) {
    if (k in body) updates[k] = body[k];
  }
  if ("estimatedValue" in body) updates.estimatedValue = String(body.estimatedValue ?? 0);

  const [row] = await db
    .update(leadsTable)
    .set(updates)
    .where(eq(leadsTable.id, id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Lead not found" });
    return;
  }
  let assignee: Employee | null = null;
  if (row.assignedToId) {
    const [a] = await db.select().from(employeesTable).where(eq(employeesTable.id, row.assignedToId));
    assignee = a ?? null;
  }
  res.json(serializeLead(row, assignee));
});

export default router;
