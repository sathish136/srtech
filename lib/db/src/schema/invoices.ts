import { pgTable, serial, text, integer, numeric, date, timestamp, jsonb } from "drizzle-orm/pg-core";
import { customersTable } from "./customers";

export type InvoiceItem = {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export const invoicesTable = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: text("invoice_number").notNull().unique(),
  customerId: integer("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
  issueDate: date("issue_date").notNull(),
  dueDate: date("due_date").notNull(),
  status: text("status").notNull(),
  subtotal: numeric("subtotal", { precision: 12, scale: 2 }).notNull().default("0"),
  tax: numeric("tax", { precision: 12, scale: 2 }).notNull().default("0"),
  total: numeric("total", { precision: 12, scale: 2 }).notNull().default("0"),
  notes: text("notes"),
  items: jsonb("items").$type<InvoiceItem[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Invoice = typeof invoicesTable.$inferSelect;
