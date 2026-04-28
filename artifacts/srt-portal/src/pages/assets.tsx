import { Layout } from "@/components/layout";
import { useListAssets } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function Assets() {
  const { data: assets, isLoading } = useListAssets();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Inventory & Assets</h2>
            <p className="text-muted-foreground">Manage CCTV cameras, biometrics, and other equipment.</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Button>
        </div>

        <div className="flex items-center gap-2 max-w-sm">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search assets..." className="w-full pl-8" />
          </div>
        </div>

        <div className="border rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Unit Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map(i => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : assets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No assets found in inventory.
                  </TableCell>
                </TableRow>
              ) : (
                assets?.map(asset => (
                  <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                    <TableCell className="font-mono text-sm">{asset.sku}</TableCell>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">{asset.category.replace('_', ' ')}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={asset.quantityInStock <= asset.reorderLevel ? "destructive" : "outline"}>
                        {asset.quantityInStock}
                      </Badge>
                    </TableCell>
                    <TableCell>₹{asset.unitPrice.toLocaleString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
