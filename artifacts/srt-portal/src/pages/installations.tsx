import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListInstallations } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

export default function Installations() {
  const { data: installations, isLoading } = useListInstallations();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={Wrench}
          title="Installations"
          description="Manage customer installation sites and AMC contracts."
          actions={
            <Button>
              <Plus className="h-4 w-4" /> Add Installation
            </Button>
          }
        />

        <DataToolbar placeholder="Search installations…" />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Site Name</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Customer</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Installed On</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">AMC Expiry</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 py-3"><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : installations?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                    No installations found.
                  </TableCell>
                </TableRow>
              ) : (
                installations?.map((inst) => {
                  const expired = inst.amcExpiry && new Date(inst.amcExpiry) < new Date();
                  return (
                    <TableRow key={inst.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                      <TableCell className="px-4 py-3 font-medium">{inst.siteName}</TableCell>
                      <TableCell className="py-3">
                        <Link href={`/customers/${inst.customerId}`} className="hover:underline">
                          {inst.customerName}
                        </Link>
                      </TableCell>
                      <TableCell className="py-3 text-muted-foreground">
                        {format(new Date(inst.installedDate), "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="py-3">
                        {inst.amcExpiry ? (
                          <span className={cn(expired && "font-semibold text-rose-600")}>
                            {format(new Date(inst.amcExpiry), "dd MMM yyyy")}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="py-3">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                            inst.status === "active"
                              ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
                              : "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20"
                          )}
                        >
                          {inst.status}
                        </span>
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
