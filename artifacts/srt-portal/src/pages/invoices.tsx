import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListInvoices } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";
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

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  overdue: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20",
  pending: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  sent: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  draft: "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20",
  partial: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/20",
  cancelled: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20",
};

export default function Invoices() {
  const { data: invoices, isLoading } = useListInvoices();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    if (!invoices) return [];
    const s = search.trim().toLowerCase();
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (!s) return true;
      return (
        inv.invoiceNumber.toLowerCase().includes(s) ||
        (inv.customerName ?? "").toLowerCase().includes(s)
      );
    });
  }, [invoices, search, statusFilter]);

  const totalAmount = filtered.reduce((sum, inv) => sum + Number(inv.total ?? 0), 0);

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={FileText}
          title="Invoices"
          description="Manage billing and payments."
          actions={
            <Button>
              <Plus className="h-4 w-4" /> Create Invoice
            </Button>
          }
        />

        <DataToolbar
          placeholder="Search by invoice # or customer…"
          value={search}
          onChange={setSearch}
          filters={
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          }
        />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Invoice #</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Customer</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Issue Date</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="h-11 pr-4 text-right text-xs uppercase tracking-wider">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3 pr-4 text-right"><Skeleton className="ml-auto h-5 w-20" /></TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                    No invoices match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((invoice) => (
                  <TableRow key={invoice.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                    <TableCell className="px-4 py-3 font-mono text-sm">
                      <Link
                        href={`/invoices/${invoice.id}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {invoice.invoiceNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="py-3">
                      <Link href={`/customers/${invoice.customerId}`} className="hover:underline">
                        {invoice.customerName}
                      </Link>
                    </TableCell>
                    <TableCell className="py-3 text-muted-foreground">
                      {format(new Date(invoice.issueDate), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell className="py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          STATUS_STYLES[invoice.status] ?? "bg-muted text-muted-foreground"
                        )}
                      >
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 pr-4 text-right font-semibold">
                      ₹{invoice.total.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!isLoading && invoices && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>Showing {filtered.length} of {invoices.length} invoices</span>
            <span>Total of filtered: <strong className="text-foreground">₹{totalAmount.toLocaleString()}</strong></span>
          </div>
        )}
      </div>
    </Layout>
  );
}
