import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListInstallations } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function Installations() {
  const { data: installations, isLoading } = useListInstallations();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [amcFilter, setAmcFilter] = useState("all");

  const filtered = useMemo(() => {
    if (!installations) return [];
    const s = search.trim().toLowerCase();
    const now = Date.now();
    return installations.filter((inst) => {
      if (statusFilter !== "all" && inst.status !== statusFilter) return false;
      if (amcFilter !== "all") {
        if (!inst.amcExpiry) return amcFilter === "none";
        const exp = new Date(inst.amcExpiry).getTime();
        const days = (exp - now) / (1000 * 60 * 60 * 24);
        if (amcFilter === "expired" && days >= 0) return false;
        if (amcFilter === "expiring" && (days < 0 || days > 30)) return false;
        if (amcFilter === "active" && days < 30) return false;
      }
      if (!s) return true;
      return (
        inst.siteName.toLowerCase().includes(s) ||
        (inst.customerName ?? "").toLowerCase().includes(s)
      );
    });
  }, [installations, search, statusFilter, amcFilter]);

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

        <DataToolbar
          placeholder="Search by site or customer…"
          value={search}
          onChange={setSearch}
          filters={
            <>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="decommissioned">Decommissioned</SelectItem>
                </SelectContent>
              </Select>
              <Select value={amcFilter} onValueChange={setAmcFilter}>
                <SelectTrigger className="w-[170px]"><SelectValue placeholder="AMC" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All AMC</SelectItem>
                  <SelectItem value="active">AMC active</SelectItem>
                  <SelectItem value="expiring">Expiring &lt;30 days</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="none">No AMC</SelectItem>
                </SelectContent>
              </Select>
            </>
          }
        />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Site Name</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Customer</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Cameras</TableHead>
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
                    <TableCell className="py-3"><Skeleton className="h-5 w-12" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No installations match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((inst) => {
                  const expired = inst.amcExpiry && new Date(inst.amcExpiry) < new Date();
                  return (
                    <TableRow key={inst.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                      <TableCell className="px-4 py-3 font-medium">
                        <Link href={`/portal/installations/${inst.id}`} className="text-primary hover:underline">
                          {inst.siteName}
                        </Link>
                      </TableCell>
                      <TableCell className="py-3">
                        <Link href={`/portal/customers/${inst.customerId}`} className="hover:underline">
                          {inst.customerName}
                        </Link>
                      </TableCell>
                      <TableCell className="py-3 text-sm">{inst.totalCameras}</TableCell>
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

        {!isLoading && installations && (
          <p className="text-xs text-muted-foreground">
            Showing {filtered.length} of {installations.length} installations
          </p>
        )}
      </div>
    </Layout>
  );
}
