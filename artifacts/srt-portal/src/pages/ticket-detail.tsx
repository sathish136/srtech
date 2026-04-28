import { Layout } from "@/components/layout";
import {
  useGetTicket,
  getGetTicketQueryKey,
  useUpdateTicket,
  getListTicketsQueryKey,
  useListEmployees,
} from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  ArrowLeft,
  ClipboardList,
  User,
  Tag,
  UserCheck,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FollowupsTimeline } from "@/components/followups-timeline";

const PRIORITY_STYLES: Record<string, string> = {
  urgent: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20",
  high: "bg-orange-500/10 text-orange-700 ring-1 ring-orange-500/20",
  medium: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  low: "bg-slate-500/10 text-slate-700 ring-1 ring-slate-500/20",
};

const STATUS_STYLES: Record<string, string> = {
  open: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  in_progress: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/20",
  on_hold: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  resolved: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  closed: "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20",
};

const STATUS_OPTIONS = ["open", "in_progress", "on_hold", "resolved", "closed"];
const PRIORITY_OPTIONS = ["low", "medium", "high", "urgent"];

const STATUS_FLOW: { from: string[]; to: string; label: string; tone: string }[] = [
  { from: ["open"], to: "in_progress", label: "Start Work", tone: "bg-violet-600 hover:bg-violet-700" },
  { from: ["open", "in_progress"], to: "on_hold", label: "Put On Hold", tone: "bg-amber-600 hover:bg-amber-700" },
  { from: ["on_hold"], to: "in_progress", label: "Resume", tone: "bg-violet-600 hover:bg-violet-700" },
  { from: ["in_progress", "on_hold"], to: "resolved", label: "Mark Resolved", tone: "bg-emerald-600 hover:bg-emerald-700" },
  { from: ["resolved"], to: "closed", label: "Close Ticket", tone: "bg-slate-600 hover:bg-slate-700" },
  { from: ["closed", "resolved"], to: "open", label: "Reopen", tone: "bg-blue-600 hover:bg-blue-700" },
];

export default function TicketDetail() {
  const params = useParams();
  const id = Number(params.id);
  const qc = useQueryClient();

  const { data: ticket, isLoading } = useGetTicket(id, {
    query: { enabled: !!id, queryKey: getGetTicketQueryKey(id) },
  });
  const { data: employees } = useListEmployees();

  const updateMut = useUpdateTicket({
    mutation: {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: getGetTicketQueryKey(id) });
        qc.invalidateQueries({ queryKey: getListTicketsQueryKey() });
      },
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Layout>
    );
  }

  if (!ticket) {
    return (
      <Layout>
        <div className="p-12 text-center text-muted-foreground">Ticket not found</div>
      </Layout>
    );
  }

  const sendUpdate = (overrides: Partial<typeof ticket>) => {
    updateMut.mutate({
      id,
      data: {
        customerId: ticket.customerId,
        subject: ticket.subject,
        description: ticket.description,
        priority: ticket.priority as "low" | "medium" | "high" | "urgent",
        status: ticket.status as "open" | "in_progress" | "on_hold" | "resolved" | "closed",
        category: ticket.category as
          | "hardware"
          | "biometric"
          | "maintenance"
          | "storage"
          | "installation"
          | "amc"
          | "other",
        assignedToId: ticket.assignedToId ?? undefined,
        ...overrides,
      },
    });
  };

  return (
    <Layout>
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Link href="/tickets">
          <Button variant="ghost" size="sm" className="-ml-2 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Tickets
          </Button>
        </Link>

        <Card className="overflow-hidden">
          <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">{ticket.ticketNumber}</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">{ticket.subject}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Opened {format(new Date(ticket.createdAt), "dd MMM yyyy")} for{" "}
                  <Link
                    href={`/customers/${ticket.customerId}`}
                    className="font-medium text-foreground hover:underline"
                  >
                    {ticket.customerName}
                  </Link>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                  STATUS_STYLES[ticket.status] ?? "bg-muted text-muted-foreground",
                )}
              >
                {ticket.status.replace("_", " ")}
              </span>
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                  PRIORITY_STYLES[ticket.priority] ?? "bg-muted text-muted-foreground",
                )}
              >
                {ticket.priority} priority
              </span>
            </div>
          </div>
        </Card>

        {/* Work allocation + status workflow */}
        <Card>
          <CardContent className="space-y-4 p-5">
            <h3 className="text-sm font-semibold">Work Allocation</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Assigned technician</p>
                <Select
                  value={ticket.assignedToId ? String(ticket.assignedToId) : ""}
                  onValueChange={(v) =>
                    sendUpdate({ assignedToId: v ? Number(v) : undefined })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees?.map((e) => (
                      <SelectItem key={e.id} value={String(e.id)}>
                        {e.name} — {e.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Status</p>
                <Select
                  value={ticket.status}
                  onValueChange={(v) => sendUpdate({ status: v as typeof ticket.status })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">
                        {s.replace("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Priority</p>
                <Select
                  value={ticket.priority}
                  onValueChange={(v) => sendUpdate({ priority: v as typeof ticket.priority })}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_OPTIONS.map((p) => (
                      <SelectItem key={p} value={p} className="capitalize">
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t pt-3">
              {STATUS_FLOW.filter((f) => f.from.includes(ticket.status)).map((f) => (
                <Button
                  key={f.to}
                  size="sm"
                  className={cn("text-white", f.tone)}
                  onClick={() => sendUpdate({ status: f.to as typeof ticket.status })}
                  disabled={updateMut.isPending}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Description
            </h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">
              {ticket.description || "No description provided."}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
          <InfoRow icon={Tag} label="Category">
            <span className="capitalize">{ticket.category.replace("_", " ")}</span>
          </InfoRow>
          <InfoRow icon={UserCheck} label="Assigned To">
            {ticket.assignedToName || <span className="text-muted-foreground">Unassigned</span>}
          </InfoRow>
          <InfoRow icon={User} label="Customer">
            <Link href={`/customers/${ticket.customerId}`} className="hover:underline">
              {ticket.customerName}
            </Link>
          </InfoRow>
          <InfoRow icon={Calendar} label="Created">
            {format(new Date(ticket.createdAt), "dd MMM yyyy, hh:mm a")}
          </InfoRow>
        </div>

        <FollowupsTimeline entityType="ticket" entityId={ticket.id} />
      </div>
    </Layout>
  );
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-0.5 truncate text-sm font-medium">{children}</p>
        </div>
      </CardContent>
    </Card>
  );
}
