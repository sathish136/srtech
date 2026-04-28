import { pgTable, serial, text, integer, timestamp, numeric, date } from "drizzle-orm/pg-core";
import { employeesTable } from "./employees";

export const leadsTable = pgTable("leads", {
  id: serial("id").primaryKey(),
  leadNumber: text("lead_number").notNull().unique(),
  name: text("name").notNull(),
  contactPerson: text("contact_person").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  city: text("city").notNull(),
  source: text("source").notNull(),
  requirement: text("requirement").notNull(),
  estimatedValue: numeric("estimated_value", { precision: 12, scale: 2 }).notNull().default("0"),
  status: text("status").notNull(),
  assignedToId: integer("assigned_to_id").references(() => employeesTable.id, { onDelete: "set null" }),
  nextFollowUpDate: date("next_follow_up_date"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Lead = typeof leadsTable.$inferSelect;
