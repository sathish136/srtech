import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { PageHeader } from "@/components/page-header";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useListEmployees } from "@workspace/api-client-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Target, Search, TrendingUp, Trophy, Flame } from "lucide-react";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
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

const SOURCE_OPTIONS = ["website", "referral", "cold_call", "walk_in", "tender", "social"];

function formatINR(n: number): string {
  return "₹" + new Intl.NumberFormat("en-IN").format(n);
}

export default function Leads() {
  const qc = useQueryClient();
  const { data: leads, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: () => api.listLeads(),
  });
  const { data: summary } = useQuery({
    queryKey: ["leads", "summary"],
    queryFn: () => api.leadsSummary(),
  });
  const { data: employees } = useListEmployees();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (!leads) return [];
    return leads.filter((l) => {
      const matchesText =
        !search ||
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        l.phone.includes(search) ||
        l.leadNumber.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    city: "",
    source: "walk_in",
    requirement: "",
    estimatedValue: "0",
    status: "new",
    assignedToId: "",
    notes: "",
  });

  const create = useMutation({
    mutationFn: () =>
      api.createLead({
        name: form.name,
        contactPerson: form.contactPerson || form.name,
        phone: form.phone,
        email: form.email,
        city: form.city,
        source: form.source,
        requirement: form.requirement,
        estimatedValue: Number(form.estimatedValue) || 0,
        status: form.status,
        assignedToId: form.assignedToId ? Number(form.assignedToId) : null,
        notes: form.notes,
      }),
    onSuccess: () => {
      setOpen(false);
      setForm({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        city: "",
        source: "walk_in",
        requirement: "",
        estimatedValue: "0",
        status: "new",
        assignedToId: "",
        notes: "",
      });
      qc.invalidateQueries({ queryKey: ["leads"] });
      qc.invalidateQueries({ queryKey: ["leads", "summary"] });
    },
  });

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <PageHeader
          icon={Target}
          title="Leads / CRM"
          description="Track prospects, follow-ups and pipeline value."
          actions={
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4" /> New Lead
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Lead</DialogTitle>
                </DialogHeader>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    placeholder="Company / Lead name *"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    placeholder="Contact person"
                    value={form.contactPerson}
                    onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  />
                  <Input
                    placeholder="Phone *"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Input
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  <Input
                    type="number"
                    placeholder="Estimated value (₹)"
                    value={form.estimatedValue}
                    onChange={(e) => setForm({ ...form, estimatedValue: e.target.value })}
                  />
                  <Select
                    value={form.source}
                    onValueChange={(v) => setForm({ ...form, source: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SOURCE_OPTIONS.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={form.status}
                    onValueChange={(v) => setForm({ ...form, status: v })}
                  >
                    <SelectTrigger>
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
                  <Select
                    value={form.assignedToId}
                    onValueChange={(v) => setForm({ ...form, assignedToId: v })}
                  >
                    <SelectTrigger className="sm:col-span-2">
                      <SelectValue placeholder="Assign to (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees?.map((e) => (
                        <SelectItem key={e.id} value={String(e.id)}>
                          {e.name} — {e.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    className="sm:col-span-2"
                    placeholder="Requirement / scope"
                    value={form.requirement}
                    onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  />
                  <Textarea
                    className="sm:col-span-2"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => create.mutate()}
                    disabled={!form.name || !form.phone || create.isPending}
                  >
                    {create.isPending ? "Saving…" : "Create Lead"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          }
        />

        {/* KPI tiles */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryTile
            label="Total Leads"
            value={summary?.total ?? 0}
            icon={Target}
            tone="bg-blue-500/10 text-blue-600"
          />
          <SummaryTile
            label="Hot Leads"
            value={summary?.hotLeads ?? 0}
            icon={Flame}
            tone="bg-orange-500/10 text-orange-600"
            subtitle="Qualified · Proposal · Negotiation"
          />
          <SummaryTile
            label="Pipeline Value"
            value={formatINR(summary?.pipelineValue ?? 0)}
            icon={TrendingUp}
            tone="bg-violet-500/10 text-violet-600"
          />
          <SummaryTile
            label="Won (Value)"
            value={formatINR(summary?.wonValue ?? 0)}
            icon={Trophy}
            tone="bg-emerald-500/10 text-emerald-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, phone, contact…"
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="h-11 px-4 text-xs uppercase tracking-wider">Lead #</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Contact</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Source</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Value</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Status</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Owner</TableHead>
                <TableHead className="h-11 text-xs uppercase tracking-wider">Next Follow-up</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4].map((i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <TableCell key={j} className="py-3">
                        <Skeleton className="h-5 w-24" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
                    No leads found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((l) => (
                  <TableRow key={l.id} className="cursor-pointer hover:bg-muted/40">
                    <TableCell className="px-4 py-3 font-mono text-sm">
                      <Link
                        href={`/leads/${l.id}`}
                        className="font-semibold text-primary hover:underline"
                      >
                        {l.leadNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="py-3 font-medium">
                      <Link href={`/leads/${l.id}`} className="hover:underline">
                        {l.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{l.city}</p>
                    </TableCell>
                    <TableCell className="py-3 text-sm">
                      <p>{l.contactPerson}</p>
                      <p className="text-xs text-muted-foreground">{l.phone}</p>
                    </TableCell>
                    <TableCell className="py-3 capitalize text-sm text-muted-foreground">
                      {l.source.replace("_", " ")}
                    </TableCell>
                    <TableCell className="py-3 font-semibold">{formatINR(l.estimatedValue)}</TableCell>
                    <TableCell className="py-3">
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                          STATUS_STYLES[l.status] ?? "bg-muted text-muted-foreground",
                        )}
                      >
                        {l.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 text-sm text-muted-foreground">
                      {l.assignedToName ?? "—"}
                    </TableCell>
                    <TableCell className="py-3 text-sm text-muted-foreground">
                      {l.nextFollowUpDate ?? "—"}
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

function SummaryTile({
  label,
  value,
  icon: Icon,
  tone,
  subtitle,
}: {
  label: string;
  value: number | string;
  icon: typeof Target;
  tone: string;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", tone)}>
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
