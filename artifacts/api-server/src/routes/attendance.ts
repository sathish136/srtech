import { Router, type IRouter } from "express";
import { eq, desc, and, sql } from "drizzle-orm";
import { db, attendanceTable, employeesTable } from "@workspace/db";
import {
  CreateAttendanceBody,
  UpdateAttendanceBody,
  UpdateAttendanceParams,
  DeleteAttendanceParams,
} from "@workspace/api-zod";
import { serializeAttendance, toDateStringRequired } from "../lib/serializers";

const router: IRouter = Router();

router.get("/attendance", async (req, res): Promise<void> => {
  const rawDate = typeof req.query.date === "string" ? req.query.date : undefined;
  const date = rawDate && /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : undefined;

  const baseQuery = db
    .select({ attendance: attendanceTable, employee: employeesTable })
    .from(attendanceTable)
    .leftJoin(employeesTable, eq(attendanceTable.employeeId, employeesTable.id));

  const rows = date
    ? await baseQuery.where(eq(attendanceTable.date, date)).orderBy(desc(attendanceTable.createdAt))
    : await baseQuery.orderBy(desc(attendanceTable.date), desc(attendanceTable.createdAt)).limit(200);

  res.json(
    rows.map(({ attendance, employee }) =>
      serializeAttendance(attendance, employee?.name ?? "Unknown"),
    ),
  );
});

router.post("/attendance", async (req, res): Promise<void> => {
  const parsed = CreateAttendanceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;

  const dateStr = toDateStringRequired(data.date);
  const [existing] = await db
    .select()
    .from(attendanceTable)
    .where(
      and(eq(attendanceTable.employeeId, data.employeeId), eq(attendanceTable.date, dateStr)),
    );

  let row;
  if (existing) {
    [row] = await db
      .update(attendanceTable)
      .set({
        checkIn: data.checkIn ?? null,
        checkOut: data.checkOut ?? null,
        status: data.status,
        notes: data.notes ?? null,
      })
      .where(eq(attendanceTable.id, existing.id))
      .returning();
  } else {
    [row] = await db
      .insert(attendanceTable)
      .values({
        employeeId: data.employeeId,
        date: dateStr,
        checkIn: data.checkIn ?? null,
        checkOut: data.checkOut ?? null,
        status: data.status,
        notes: data.notes ?? null,
      })
      .returning();
  }

  const [employee] = await db
    .select()
    .from(employeesTable)
    .where(eq(employeesTable.id, row.employeeId));
  res.status(201).json(serializeAttendance(row, employee?.name ?? "Unknown"));
});

router.patch("/attendance/:id", async (req, res): Promise<void> => {
  const params = UpdateAttendanceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateAttendanceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .update(attendanceTable)
    .set({
      employeeId: data.employeeId,
      date: toDateStringRequired(data.date),
      checkIn: data.checkIn ?? null,
      checkOut: data.checkOut ?? null,
      status: data.status,
      notes: data.notes ?? null,
    })
    .where(eq(attendanceTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Attendance not found" });
    return;
  }
  const [employee] = await db
    .select()
    .from(employeesTable)
    .where(eq(employeesTable.id, row.employeeId));
  res.json(serializeAttendance(row, employee?.name ?? "Unknown"));
});

router.delete("/attendance/:id", async (req, res): Promise<void> => {
  const params = DeleteAttendanceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(attendanceTable)
    .where(eq(attendanceTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Attendance not found" });
    return;
  }
  res.sendStatus(204);
});

router.get("/attendance/today-summary", async (_req, res): Promise<void> => {
  const today = new Date().toISOString().slice(0, 10);
  const totalEmployeesRow = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(employeesTable)
    .where(eq(employeesTable.status, "active"));
  const totalEmployees = totalEmployeesRow[0]?.c ?? 0;

  const todays = await db
    .select()
    .from(attendanceTable)
    .where(eq(attendanceTable.date, today));

  const counts = { present: 0, absent: 0, onLeave: 0, halfDay: 0, late: 0 };
  for (const a of todays) {
    if (a.status === "present") counts.present++;
    else if (a.status === "absent") counts.absent++;
    else if (a.status === "on_leave") counts.onLeave++;
    else if (a.status === "half_day") counts.halfDay++;
    else if (a.status === "late") counts.late++;
  }

  res.json({
    date: today,
    present: counts.present,
    absent: counts.absent,
    onLeave: counts.onLeave,
    halfDay: counts.halfDay,
    late: counts.late,
    total: totalEmployees,
  });
});

export default router;
