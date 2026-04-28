import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { DataToolbar } from "@/components/data-toolbar";
import { useListTickets } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Plus, ClipboardList } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const PRIORITY_STYLES: Record<string, string> = {
  urgent: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20",
  high: "bg-orange-500/10 text-orange-700 ring-1 ring-orange-500/20",
  medium: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  low: "bg-slate-500/10 text-slate-700 ring-1 ring-slate-500/20",
};

const STATUS_STYLES: Record<string, string> = {
  open: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  in_progress: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/20",
  resolved: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  closed: "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20",
};

function StatusPill({ value, palette }: { value: string; palette: Record<string, string> }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        palette[value] ?? "bg-muted text-muted-foreground"
      )}
    >
      {value.replace("_", " ")}
    </span>
  );
}

export default function Tickets() {
  const { data: tickets, isLoading } = useListTickets();

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={ClipboardList}
          title="Service Tickets"
          description="Manage installation, repair, and AMC service requests."
          accentClassName="from-rose-500 to-pink-600"
          actions={
            <Button>
              <Plus className="h-4 w-4" /> Create Ticket
            </Button>
          }
        />

        <DataToolbar placeholder="Search tickets…" />

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Ticket #</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Subject</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Customer</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Priority</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i}>
                    <TableCell className="px-4 py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-20" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                    <TableCell className="py-3"><Skeleton className="h-5 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : tickets?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    No tickets found.
                  </TableCell>
                </TableRow>
              ) : (
                tickets?.map((ticket) => (
                  <TableRow key={ticket.id} className="cursor-pointer transition-colors hover:bg-muted/40">
                    <TableCell className="px-4 py-3 font-mono text-sm">
                      <Link
                        href={`/tickets/${ticket.id}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {ticket.ticketNumber}
                      </Link>
                    </TableCell>
                    <TableCell
                      className="py-3 max-w-[240px] truncate font-medium"
                      title={ticket.subject}
                    >
                      {ticket.subject}
                    </TableCell>
                    <TableCell className="py-3">
                      <Link href={`/customers/${ticket.customerId}`} className="hover:underline">
                        {ticket.customerName}
                      </Link>
                    </TableCell>
                    <TableCell className="py-3">
                      <StatusPill value={ticket.priority} palette={PRIORITY_STYLES} />
                    </TableCell>
                    <TableCell className="py-3">
                      <StatusPill value={ticket.status} palette={STATUS_STYLES} />
                    </TableCell>
                    <TableCell className="py-3 text-muted-foreground">
                      {format(new Date(ticket.createdAt), "dd MMM yyyy")}
                    </TableCell>
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
