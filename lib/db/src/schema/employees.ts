import { pgTable, serial, text, numeric, date, timestamp } from "drizzle-orm/pg-core";

export const employeesTable = pgTable("employees", {
  id: serial("id").primaryKey(),
  employeeCode: text("employee_code").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  department: text("department").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  joinDate: date("join_date").notNull(),
  status: text("status").notNull(),
  salary: numeric("salary", { precision: 12, scale: 2 }).notNull().default("0"),
  address: text("address"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Employee = typeof employeesTable.$inferSelect;
