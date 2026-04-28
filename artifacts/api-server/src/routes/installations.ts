import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, installationsTable, customersTable } from "@workspace/db";
import {
  CreateInstallationBody,
  UpdateInstallationBody,
  UpdateInstallationParams,
  DeleteInstallationParams,
} from "@workspace/api-zod";
import { serializeInstallationRow, toDateString, toDateStringRequired } from "../lib/serializers";

const router: IRouter = Router();

router.get("/installations", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      installation: installationsTable,
      customer: customersTable,
    })
    .from(installationsTable)
    .leftJoin(customersTable, eq(installationsTable.customerId, customersTable.id))
    .orderBy(desc(installationsTable.createdAt));
  res.json(
    rows.map(({ installation, customer }) =>
      serializeInstallationRow(installation, customer?.name ?? "Unknown"),
    ),
  );
});

router.get("/installations/:id", async (req, res): Promise<void> => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: "invalid id" });
    return;
  }
  const [row] = await db
    .select({ installation: installationsTable, customer: customersTable })
    .from(installationsTable)
    .leftJoin(customersTable, eq(installationsTable.customerId, customersTable.id))
    .where(eq(installationsTable.id, id));
  if (!row) {
    res.status(404).json({ error: "Installation not found" });
    return;
  }
  res.json({
    ...serializeInstallationRow(row.installation, row.customer?.name ?? "Unknown"),
    customerPhone: row.customer?.phone ?? null,
    customerCity: row.customer?.city ?? null,
    customerAddress: row.customer?.address ?? null,
  });
});

router.post("/installations", async (req, res): Promise<void> => {
  const parsed = CreateInstallationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .insert(installationsTable)
    .values({
      customerId: data.customerId,
      siteName: data.siteName,
      address: data.address,
      installedDate: toDateStringRequired(data.installedDate),
      status: data.status,
      totalCameras: data.totalCameras,
      amcExpiry: toDateString(data.amcExpiry),
      notes: data.notes ?? null,
    })
    .returning();
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, row.customerId));
  res.status(201).json(serializeInstallationRow(row, customer?.name ?? "Unknown"));
});

router.patch("/installations/:id", async (req, res): Promise<void> => {
  const params = UpdateInstallationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateInstallationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .update(installationsTable)
    .set({
      customerId: data.customerId,
      siteName: data.siteName,
      address: data.address,
      installedDate: toDateStringRequired(data.installedDate),
      status: data.status,
      totalCameras: data.totalCameras,
      amcExpiry: toDateString(data.amcExpiry),
      notes: data.notes ?? null,
    })
    .where(eq(installationsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Installation not found" });
    return;
  }
  const [customer] = await db
    .select()
    .from(customersTable)
    .where(eq(customersTable.id, row.customerId));
  res.json(serializeInstallationRow(row, customer?.name ?? "Unknown"));
});

router.delete("/installations/:id", async (req, res): Promise<void> => {
  const params = DeleteInstallationParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(installationsTable)
    .where(eq(installationsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Installation not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
