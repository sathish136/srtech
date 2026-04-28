import { Router, type IRouter } from "express";
import { and, desc, eq } from "drizzle-orm";
import { db, followupsTable, employeesTable } from "@workspace/db";
import type { Followup, Employee } from "@workspace/db";

const router: IRouter = Router();

function serializeFollowup(row: Followup, by: Employee | null) {
  return {
    id: row.id,
    entityType: row.entityType,
    entityId: row.entityId,
    action: row.action,
    note: row.note,
    byEmployeeId: row.byEmployeeId ?? null,
    byEmployeeName: by?.name ?? null,
    nextActionDate: row.nextActionDate ?? null,
    createdAt: row.createdAt.toISOString(),
  };
}

router.get("/followups", async (req, res): Promise<void> => {
  const entityType = String(req.query.entityType ?? "");
  const entityId = Number(req.query.entityId);
  if (!entityType || !entityId) {
    res.status(400).json({ error: "entityType and entityId required" });
    return;
  }

  const rows = await db
    .select({ f: followupsTable, by: employeesTable })
    .from(followupsTable)
    .leftJoin(employeesTable, eq(followupsTable.byEmployeeId, employeesTable.id))
    .where(
      and(
        eq(followupsTable.entityType, entityType),
        eq(followupsTable.entityId, entityId),
      ),
    )
    .orderBy(desc(followupsTable.createdAt));
  res.json(rows.map(({ f, by }) => serializeFollowup(f, by)));
});

router.post("/followups", async (req, res): Promise<void> => {
  const body = req.body ?? {};
  if (!body.entityType || !body.entityId || !body.action || !body.note) {
    res.status(400).json({ error: "entityType, entityId, action, note required" });
    return;
  }

  const [inserted] = await db
    .insert(followupsTable)
    .values({
      entityType: body.entityType,
      entityId: body.entityId,
      action: body.action,
      note: body.note,
      byEmployeeId: body.byEmployeeId ?? null,
      nextActionDate: body.nextActionDate ?? null,
    })
    .returning();

  let by: Employee | null = null;
  if (inserted.byEmployeeId) {
    const [b] = await db.select().from(employeesTable).where(eq(employeesTable.id, inserted.byEmployeeId));
    by = b ?? null;
  }
  res.status(201).json(serializeFollowup(inserted, by));
});

export default router;
