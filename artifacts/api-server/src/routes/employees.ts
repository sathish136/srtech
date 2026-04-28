import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, employeesTable, attendanceTable, ticketsTable, customersTable } from "@workspace/db";
import {
  CreateEmployeeBody,
  UpdateEmployeeBody,
  GetEmployeeParams,
  UpdateEmployeeParams,
  DeleteEmployeeParams,
} from "@workspace/api-zod";
import {
  serializeEmployee,
  serializeAttendance,
  serializeTicketRow,
  toDateStringRequired,
} from "../lib/serializers";

const router: IRouter = Router();

router.get("/employees", async (_req, res): Promise<void> => {
  const rows = await db.select().from(employeesTable).orderBy(desc(employeesTable.createdAt));
  res.json(rows.map(serializeEmployee));
});

router.post("/employees", async (req, res): Promise<void> => {
  const parsed = CreateEmployeeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .insert(employeesTable)
    .values({
      employeeCode: data.employeeCode,
      name: data.name,
      role: data.role,
      department: data.department,
      phone: data.phone,
      email: data.email,
      joinDate: toDateStringRequired(data.joinDate),
      status: data.status,
      salary: String(data.salary),
      address: data.address ?? null,
    })
    .returning();
  res.status(201).json(serializeEmployee(row));
});

router.get("/employees/:id", async (req, res): Promise<void> => {
  const params = GetEmployeeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const id = params.data.id;
  const [employee] = await db.select().from(employeesTable).where(eq(employeesTable.id, id));
  if (!employee) {
    res.status(404).json({ error: "Employee not found" });
    return;
  }

  const recentAttendance = await db
    .select()
    .from(attendanceTable)
    .where(eq(attendanceTable.employeeId, id))
    .orderBy(desc(attendanceTable.date))
    .limit(30);

  const ticketRows = await db
    .select({
      ticket: ticketsTable,
      customer: customersTable,
    })
    .from(ticketsTable)
    .leftJoin(customersTable, eq(ticketsTable.customerId, customersTable.id))
    .where(eq(ticketsTable.assignedToId, id))
    .orderBy(desc(ticketsTable.createdAt));

  res.json({
    ...serializeEmployee(employee),
    recentAttendance: recentAttendance.map((a) => serializeAttendance(a, employee.name)),
    assignedTickets: ticketRows.map(({ ticket, customer }) =>
      serializeTicketRow(ticket, customer?.name ?? "Unknown", employee),
    ),
  });
});

router.patch("/employees/:id", async (req, res): Promise<void> => {
  const params = UpdateEmployeeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateEmployeeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .update(employeesTable)
    .set({
      employeeCode: data.employeeCode,
      name: data.name,
      role: data.role,
      department: data.department,
      phone: data.phone,
      email: data.email,
      joinDate: toDateStringRequired(data.joinDate),
      status: data.status,
      salary: String(data.salary),
      address: data.address ?? null,
    })
    .where(eq(employeesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Employee not found" });
    return;
  }
  res.json(serializeEmployee(row));
});

router.delete("/employees/:id", async (req, res): Promise<void> => {
  const params = DeleteEmployeeParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(employeesTable)
    .where(eq(employeesTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Employee not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
