import { Layout } from "@/components/layout";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useListEmployees } from "@workspace/api-client-react";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Target,
  Phone,
  Mail,
  MapPin,
  User,
  IndianRupee,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { FollowupsTimeline } from "@/components/followups-timeline";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20",
  contacted: "bg-cyan-500/10 text-cyan-700 ring-1 ring-cyan-500/20",
  qualified: "bg-violet-500/10 text-violet-700 ring-1 ring-violet-500/20",
  proposal: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20",
  negotiation: "bg-orange-500/10 text-orange-700 ring-1 ring-orange-500/20",
  won: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20",
  lost: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/20",
};

const STATUS_OPTIONS = [
  "new",
  "contacted",
  "qualified",
  "proposal",
  "negotiation",
  "won",
  "lost",
];

function formatINR(n: number): string {
  return "₹" + new Intl.NumberFormat("en-IN").format(n);
}

export default function LeadDetail() {
  const params = useParams();
  const id = Number(params.id);
  const qc = useQueryClient();

  const { data: lead, isLoading } = useQuery({
    queryKey: ["lead", id],
    queryFn: () => api.getLead(id),
    enabled: !!id,
  });
  const { data: employees } = useListEmployees();

  const updateStatus = useMutation({
    mutationFn: (status: string) => api.updateLead(id, { status }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lead", id] });
      qc.invalidateQueries({ queryKey: ["leads"] });
      qc.invalidateQueries({ queryKey: ["leads", "summary"] });
    },
  });

  const updateAssignee = useMutation({
    mutationFn: (assignedToId: number | null) => api.updateLead(id, { assignedToId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lead", id] });
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <Skeleton className="h-12 w-1/3" />
      </Layout>
    );
  }
  if (!lead) {
    return (
      <Layout>
        <div className="p-12 text-center text-muted-foreground">Lead not found</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <Link href="/portal/leads">
          <Button variant="ghost" size="sm" className="-ml-2 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Leads
          </Button>
        </Link>

        <Card>
          <div className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <p className="font-mono text-xs text-muted-foreground">{lead.leadNumber}</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">{lead.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lead.contactPerson} · {lead.city} · Source:{" "}
                  <span className="capitalize">{lead.source.replace("_", " ")}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                  STATUS_STYLES[lead.status] ?? "bg-muted text-muted-foreground",
                )}
              >
                {lead.status}
              </span>
              <p className="text-sm font-semibold">{formatINR(lead.estimatedValue)}</p>
            </div>
          </div>

          <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            <InfoRow icon={Phone} label="Phone">
              {lead.phone}
            </InfoRow>
            <InfoRow icon={Mail} label="Email">
              {lead.email || "—"}
            </InfoRow>
            <InfoRow icon={MapPin} label="City">
              {lead.city}
            </InfoRow>
            <InfoRow icon={User} label="Owner">
              {lead.assignedToName ?? "Unassigned"}
            </InfoRow>
            <InfoRow icon={IndianRupee} label="Estimated Value">
              {formatINR(lead.estimatedValue)}
            </InfoRow>
            <InfoRow icon={Calendar} label="Next Follow-up">
              {lead.nextFollowUpDate ?? "—"}
            </InfoRow>
          </CardContent>
        </Card>

        {/* Action bar */}
        <Card>
          <CardContent className="flex flex-wrap items-center gap-3 p-5">
            <span className="text-sm font-semibold">Update lead:</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Status</span>
              <Select
                value={lead.status}
                onValueChange={(v) => updateStatus.mutate(v)}
              >
                <SelectTrigger className="h-9 w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s} className="capitalize">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Owner</span>
              <Select
                value={lead.assignedToId ? String(lead.assignedToId) : ""}
                onValueChange={(v) => updateAssignee.mutate(v ? Number(v) : null)}
              >
                <SelectTrigger className="h-9 w-56">
                  <SelectValue placeholder="Assign to…" />
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
          </CardContent>
        </Card>

        {lead.requirement && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Requirement
              </h3>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed">{lead.requirement}</p>
              {lead.notes && (
                <>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Notes
                  </h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm">{lead.notes}</p>
                </>
              )}
            </CardContent>
          </Card>
        )}

        <FollowupsTimeline entityType="lead" entityId={lead.id} />

        <p className="text-xs text-muted-foreground">
          Created {format(new Date(lead.createdAt), "dd MMM yyyy, hh:mm a")}
        </p>
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
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-medium">{children}</p>
      </div>
    </div>
  );
}
