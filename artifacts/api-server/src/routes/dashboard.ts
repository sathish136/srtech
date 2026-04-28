import { Router, type IRouter } from "express";
import { sql, eq, desc, lte } from "drizzle-orm";
import {
  db,
  customersTable,
  installationsTable,
  ticketsTable,
  invoicesTable,
  employeesTable,
  attendanceTable,
  assetsTable,
} from "@workspace/db";
import { serializeAsset } from "../lib/serializers";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const [customers] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(customersTable);
  const [activeInstalls] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(installationsTable)
    .where(eq(installationsTable.status, "active"));
  const [openT] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(ticketsTable)
    .where(sql`${ticketsTable.status} in ('open','in_progress','on_hold')`);
  const [stock] = await db
    .select({ c: sql<number>`coalesce(sum(${assetsTable.quantityInStock}), 0)::int` })
    .from(assetsTable);
  const [emp] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(employeesTable);

  const today = new Date().toISOString().slice(0, 10);
  const [present] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(attendanceTable)
    .where(sql`${attendanceTable.date} = ${today} and ${attendanceTable.status} in ('present','late','half_day')`);

  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);
  const monthStartStr = monthStart.toISOString().slice(0, 10);

  const [revRow] = await db
    .select({ s: sql<string>`coalesce(sum(${invoicesTable.total}), 0)` })
    .from(invoicesTable)
    .where(sql`${invoicesTable.issueDate} >= ${monthStartStr} and ${invoicesTable.status} = 'paid'`);

  const [outRow] = await db
    .select({ s: sql<string>`coalesce(sum(${invoicesTable.total}), 0)` })
    .from(invoicesTable)
    .where(sql`${invoicesTable.status} in ('sent','overdue')`);

  res.json({
    totalCustomers: customers?.c ?? 0,
    activeInstallations: activeInstalls?.c ?? 0,
    openTickets: openT?.c ?? 0,
    assetsInStock: stock?.c ?? 0,
    employeesTotal: emp?.c ?? 0,
    presentToday: present?.c ?? 0,
    revenueThisMonth: Number(revRow?.s ?? 0),
    outstandingAmount: Number(outRow?.s ?? 0),
  });
});

router.get("/dashboard/revenue", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      month: sql<string>`to_char(date_trunc('month', ${invoicesTable.issueDate}::date), 'YYYY-MM')`,
      revenue: sql<string>`coalesce(sum(${invoicesTable.total}), 0)`,
    })
    .from(invoicesTable)
    .where(sql`${invoicesTable.issueDate}::date >= (current_date - interval '11 months')`)
    .groupBy(sql`date_trunc('month', ${invoicesTable.issueDate}::date)`)
    .orderBy(sql`date_trunc('month', ${invoicesTable.issueDate}::date)`);

  const map = new Map<string, number>();
  for (const r of rows) map.set(r.month, Number(r.revenue));

  const out: { month: string; revenue: number }[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    out.push({ month: key, revenue: map.get(key) ?? 0 });
  }
  res.json(out);
});

router.get("/dashboard/ticket-status", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      status: ticketsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(ticketsTable)
    .groupBy(ticketsTable.status);
  res.json(rows.map((r) => ({ status: r.status, count: r.count })));
});

router.get("/dashboard/asset-categories", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      category: assetsTable.category,
      count: sql<number>`coalesce(sum(${assetsTable.quantityInStock}), 0)::int`,
    })
    .from(assetsTable)
    .groupBy(assetsTable.category);
  res.json(rows.map((r) => ({ category: r.category, count: r.count })));
});

router.get("/dashboard/recent-activity", async (_req, res): Promise<void> => {
  const ticketRows = await db
    .select({ t: ticketsTable, c: customersTable })
    .from(ticketsTable)
    .leftJoin(customersTable, eq(ticketsTable.customerId, customersTable.id))
    .orderBy(desc(ticketsTable.createdAt))
    .limit(10);
  const invoiceRows = await db
    .select({ i: invoicesTable, c: customersTable })
    .from(invoicesTable)
    .leftJoin(customersTable, eq(invoicesTable.customerId, customersTable.id))
    .orderBy(desc(invoicesTable.createdAt))
    .limit(10);
  const customers = await db
    .select()
    .from(customersTable)
    .orderBy(desc(customersTable.createdAt))
    .limit(5);
  const installations = await db
    .select({ i: installationsTable, c: customersTable })
    .from(installationsTable)
    .leftJoin(customersTable, eq(installationsTable.customerId, customersTable.id))
    .orderBy(desc(installationsTable.createdAt))
    .limit(5);

  const items = [
    ...ticketRows.map(({ t, c }) => ({
      id: `ticket-${t.id}`,
      type: "ticket" as const,
      title: `${t.ticketNumber} · ${t.subject}`,
      subtitle: `${c?.name ?? "Unknown"} · ${t.priority} · ${t.status}`,
      timestamp: t.createdAt.toISOString(),
    })),
    ...invoiceRows.map(({ i, c }) => ({
      id: `invoice-${i.id}`,
      type: "invoice" as const,
      title: `${i.invoiceNumber} · ₹${Number(i.total).toLocaleString("en-IN")}`,
      subtitle: `${c?.name ?? "Unknown"} · ${i.status}`,
      timestamp: i.createdAt.toISOString(),
    })),
    ...customers.map((c) => ({
      id: `customer-${c.id}`,
      type: "customer" as const,
      title: `New customer: ${c.name}`,
      subtitle: `${c.city} · ${c.type}`,
      timestamp: c.createdAt.toISOString(),
    })),
    ...installations.map(({ i, c }) => ({
      id: `installation-${i.id}`,
      type: "installation" as const,
      title: `${i.siteName}`,
      subtitle: `${c?.name ?? "Unknown"} · ${i.totalCameras} cameras · ${i.status}`,
      timestamp: i.createdAt.toISOString(),
    })),
  ];

  items.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));
  res.json(items.slice(0, 15));
});

router.get("/dashboard/low-stock", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(assetsTable)
    .where(lte(assetsTable.quantityInStock, assetsTable.reorderLevel))
    .orderBy(assetsTable.quantityInStock);
  res.json(rows.map(serializeAsset));
});

export default router;
