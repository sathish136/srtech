import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, assetsTable } from "@workspace/db";
import {
  CreateAssetBody,
  UpdateAssetBody,
  GetAssetParams,
  UpdateAssetParams,
  DeleteAssetParams,
} from "@workspace/api-zod";
import { serializeAsset } from "../lib/serializers";

const router: IRouter = Router();

router.get("/assets", async (_req, res): Promise<void> => {
  const rows = await db.select().from(assetsTable).orderBy(desc(assetsTable.createdAt));
  res.json(rows.map(serializeAsset));
});

router.post("/assets", async (req, res): Promise<void> => {
  const parsed = CreateAssetBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .insert(assetsTable)
    .values({ ...data, unitPrice: String(data.unitPrice) })
    .returning();
  res.status(201).json(serializeAsset(row));
});

router.get("/assets/:id", async (req, res): Promise<void> => {
  const params = GetAssetParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db.select().from(assetsTable).where(eq(assetsTable.id, params.data.id));
  if (!row) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }
  res.json(serializeAsset(row));
});

router.patch("/assets/:id", async (req, res): Promise<void> => {
  const params = UpdateAssetParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateAssetBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const data = parsed.data;
  const [row] = await db
    .update(assetsTable)
    .set({ ...data, unitPrice: String(data.unitPrice) })
    .where(eq(assetsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }
  res.json(serializeAsset(row));
});

router.delete("/assets/:id", async (req, res): Promise<void> => {
  const params = DeleteAssetParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .delete(assetsTable)
    .where(eq(assetsTable.id, params.data.id))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Asset not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
