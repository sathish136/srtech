import { pgTable, serial, text, integer, numeric, timestamp } from "drizzle-orm/pg-core";

export const assetsTable = pgTable("assets", {
  id: serial("id").primaryKey(),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull().default("0"),
  quantityInStock: integer("quantity_in_stock").notNull().default(0),
  reorderLevel: integer("reorder_level").notNull().default(0),
  warrantyMonths: integer("warranty_months").notNull().default(0),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Asset = typeof assetsTable.$inferSelect;
