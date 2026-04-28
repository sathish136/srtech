import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListAssets } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Package } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Assets() {
  const { data: assets, isLoading } = useListAssets();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={Package}
          title="Inventory & Assets"
          description="Manage CCTV cameras, biometrics, and other equipment."
          accentClassName="from-cyan-500 to-blue-600"
          actions={
            <Button>
              <Plus className="h-4 w-4" /> Add Asset
            </Button>
          }
        />

        <DataToolbar placeholder="Search assets…" />

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
              ) : assets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                    No assets found in inventory.
                  </TableCell>
                </TableRow>
              ) : (
                assets?.map((asset) => {
                  const isLow = asset.quantityInStock <= asset.reorderLevel;
                  return (
                    <TableRow key={asset.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                      <TableCell className="px-4 py-3 font-mono text-sm text-muted-foreground">
                        {asset.sku}
                      </TableCell>
                      <TableCell className="py-3 font-medium">{asset.name}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant="secondary" className="capitalize">
                          {asset.category.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            isLow
                              ? "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20"
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
      </div>
    </Layout>
  );
}
