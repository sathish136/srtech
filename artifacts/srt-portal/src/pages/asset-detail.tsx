import { Layout } from "@/components/layout";
import { useGetAsset, useUpdateAsset, getGetAssetQueryKey, getListAssetsQueryKey } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Package, ArrowLeft, AlertTriangle, BadgeIndianRupee, Boxes, Tag } from "lucide-react";

export default function AssetDetail() {
  const params = useParams();
  const id = Number(params.id);
  const qc = useQueryClient();
  const { data: asset, isLoading } = useGetAsset(id, { query: { enabled: !!id, queryKey: getGetAssetQueryKey(id) } });
  const update = useUpdateAsset();

  const [stock, setStock] = useState("");
  const [reorder, setReorder] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (asset) {
      setStock(String(asset.quantityInStock));
      setReorder(String(asset.reorderLevel));
      setPrice(String(asset.unitPrice));
    }
  }, [asset]);

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Layout>
    );
  }

  if (!asset) {
    return <Layout><div className="p-8 text-center text-muted-foreground">Asset not found</div></Layout>;
  }

  const isLow = asset.quantityInStock <= asset.reorderLevel;

  function save() {
    update.mutate(
      {
        id,
        data: {
          name: asset!.name,
          sku: asset!.sku,
          category: asset!.category,
          unitPrice: Number(price),
          quantityInStock: Number(stock),
          reorderLevel: Number(reorder),
          description: asset!.description ?? undefined,
        },
      },
      {
        onSuccess: () => {
          qc.invalidateQueries({ queryKey: getGetAssetQueryKey(id) });
          qc.invalidateQueries({ queryKey: getListAssetsQueryKey() });
        },
      },
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <Link href="/assets" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Inventory
        </Link>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Package className="h-7 w-7" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{asset.sku}</p>
                <h1 className="text-2xl font-bold">{asset.name}</h1>
                <p className="mt-1 text-sm capitalize text-muted-foreground">{asset.category.replace("_", " ")}</p>
              </div>
            </div>
            {isLow && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-3 py-1 text-sm font-semibold text-rose-700 ring-1 ring-rose-500/20">
                <AlertTriangle className="h-4 w-4" /> Low stock — reorder soon
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoTile icon={Boxes} label="Current Stock" value={`${asset.quantityInStock} units`} accent={isLow ? "rose" : "emerald"} />
          <InfoTile icon={AlertTriangle} label="Reorder At" value={`${asset.reorderLevel} units`} accent="amber" />
          <InfoTile icon={BadgeIndianRupee} label="Unit Price" value={`₹${asset.unitPrice.toLocaleString()}`} accent="indigo" />
          <InfoTile icon={Tag} label="Stock Value" value={`₹${(asset.quantityInStock * asset.unitPrice).toLocaleString()}`} accent="violet" />
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Update Stock & Price</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label>Quantity in stock</Label>
              <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Reorder level</Label>
              <Input type="number" value={reorder} onChange={(e) => setReorder(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Unit price (₹)</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={save} disabled={update.isPending}>
              {update.isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </div>

        {asset.description && (
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</p>
            <p className="whitespace-pre-wrap text-sm">{asset.description}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

const ACCENTS: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-700",
  rose: "bg-rose-500/10 text-rose-700",
  amber: "bg-amber-500/10 text-amber-700",
  indigo: "bg-indigo-500/10 text-indigo-700",
  violet: "bg-violet-500/10 text-violet-700",
};

function InfoTile({
  icon: Icon,
  label,
  value,
  accent = "indigo",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: keyof typeof ACCENTS | string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${ACCENTS[accent] ?? ACCENTS.indigo}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}
