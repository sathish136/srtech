import { pgTable, serial, text, integer, date, timestamp } from "drizzle-orm/pg-core";
import { customersTable } from "./customers";

export const installationsTable = pgTable("installations", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customersTable.id, { onDelete: "cascade" }),
  siteName: text("site_name").notNull(),
  address: text("address").notNull(),
  installedDate: date("installed_date").notNull(),
  status: text("status").notNull(),
  totalCameras: integer("total_cameras").notNull().default(0),
  amcExpiry: date("amc_expiry"),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Installation = typeof installationsTable.$inferSelect;
