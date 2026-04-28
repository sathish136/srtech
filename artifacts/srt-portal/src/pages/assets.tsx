import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListAssets } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "wouter";
import { useMemo, useState } from "react";

export default function Assets() {
  const { data: assets, isLoading } = useListAssets();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const categories = useMemo(() => {
    if (!assets) return [];
    return Array.from(new Set(assets.map((a) => a.category))).sort();
  }, [assets]);

  const filtered = useMemo(() => {
    if (!assets) return [];
    const s = search.trim().toLowerCase();
    return assets.filter((a) => {
      if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
      if (stockFilter === "low" && a.quantityInStock > a.reorderLevel) return false;
      if (stockFilter === "in" && a.quantityInStock <= a.reorderLevel) return false;
      if (stockFilter === "out" && a.quantityInStock !== 0) return false;
      if (!s) return true;
      return a.name.toLowerCase().includes(s) || a.sku.toLowerCase().includes(s);
    });
  }, [assets, search, categoryFilter, stockFilter]);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={Package}
          title="Inventory & Assets"
          description="Manage CCTV cameras, biometrics, and other equipment."
          actions={
            <Button>
              <Plus className="h-4 w-4" /> Add Asset
            </Button>
          }
        />

        <DataToolbar
          placeholder="Search by name or SKU…"
          value={search}
          onChange={setSearch}
          filters={
            <>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[170px]"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c} className="capitalize">{c.replace("_", " ")}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Stock" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All stock</SelectItem>
                  <SelectItem value="in">In stock</SelectItem>
                  <SelectItem value="low">Low stock</SelectItem>
                  <SelectItem value="out">Out of stock</SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">SKU</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Category</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Stock</TableHead>
                <TableHead className="h-11 pr-4 text-right text-xs uppercase tracking-wider">Unit Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell className="py-3 pr-4 text-right"><Skeleton className="ml-auto h-5 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                    No assets match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((asset) => {
                  const isLow = asset.quantityInStock <= asset.reorderLevel;
                  const isOut = asset.quantityInStock === 0;
                  return (
                    <TableRow key={asset.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                      <TableCell className="px-4 py-3 font-mono text-sm text-muted-foreground">
                        <Link href={`/assets/${asset.id}`} className="hover:underline">{asset.sku}</Link>
                      </TableCell>
                      <TableCell className="py-3 font-medium">
                        <Link href={`/assets/${asset.id}`} className="text-primary hover:underline">
                          {asset.name}
                        </Link>
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge variant="secondary" className="capitalize">
                          {asset.category.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isOut
                              ? "bg-rose-500/15 text-rose-700 ring-1 ring-rose-500/30"
                              : isLow
                              ? "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
                          }`}
                        >
                          {asset.quantityInStock} units
                        </span>
                      </TableCell>
                      <TableCell className="py-3 pr-4 text-right font-semibold">
                        ₹{asset.unitPrice.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && assets && (
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {assets.length} items
          </p>
        )}
      </div>
    </Layout>
  );
}
