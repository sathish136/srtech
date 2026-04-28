import { pgTable, serial, text, integer, timestamp, date } from "drizzle-orm/pg-core";
import { employeesTable } from "./employees";

export const followupsTable = pgTable("followups", {
  id: serial("id").primaryKey(),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id").notNull(),
  action: text("action").notNull(),
  note: text("note").notNull(),
  byEmployeeId: integer("by_employee_id").references(() => employeesTable.id, { onDelete: "set null" }),
  nextActionDate: date("next_action_date"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Followup = typeof followupsTable.$inferSelect;
