import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { customersTable } from "./customers";
import { employeesTable } from "./employees";

export const ticketsTable = pgTable("tickets", {
  id: serial("id").primaryKey(),
  ticketNumber: text("ticket_number").notNull().unique(),
  customerId: integer("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  priority: text("priority").notNull(),
  status: text("status").notNull(),
  category: text("category").notNull(),
  assignedToId: integer("assigned_to_id").references(() => employeesTable.id, { onDelete: "set null" }),
  resolvedAt: timestamp("resolved_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Ticket = typeof ticketsTable.$inferSelect;
