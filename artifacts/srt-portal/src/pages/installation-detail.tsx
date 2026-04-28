import { Layout } from "@/components/layout";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { ArrowLeft, Wrench, MapPin, Phone, Calendar, Camera, ShieldCheck, AlertTriangle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = ["active", "inactive", "decommissioned"];

export default function InstallationDetail() {
  const params = useParams();
  const id = Number(params.id);
  const qc = useQueryClient();

  const { data: inst, isLoading } = useQuery({
    queryKey: ["installation", id],
    queryFn: () => api.getInstallation(id),
    enabled: !!id,
  });

  const update = useMutation({
    mutationFn: (body: Record<string, unknown>) => api.updateInstallation(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["installation", id] });
      qc.invalidateQueries({ queryKey: ["installations"] });
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </Layout>
    );
  }

  if (!inst) {
    return <Layout><div className="p-8 text-center text-muted-foreground">Installation not found</div></Layout>;
  }

  const expired = inst.amcExpiry && new Date(inst.amcExpiry) < new Date();
  const daysToAmc = inst.amcExpiry
    ? Math.ceil((new Date(inst.amcExpiry).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  function setStatus(value: string) {
    update.mutate({
      customerId: inst!.customerId,
      siteName: inst!.siteName,
      address: inst!.address,
      installedDate: inst!.installedDate,
      status: value,
      totalCameras: inst!.totalCameras,
      amcExpiry: inst!.amcExpiry,
      notes: inst!.notes,
    });
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <Link href="/portal/installations" className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Installations
        </Link>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Wrench className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{inst.siteName}</h1>
                <Link href={`/portal/customers/${inst.customerId}`} className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary hover:underline">
                  <User className="h-3.5 w-3.5" /> {inst.customerName}
                </Link>
              </div>
            </div>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold capitalize",
                inst.status === "active"
                  ? "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20"
                  : "bg-slate-500/10 text-slate-600 ring-1 ring-slate-500/20"
              )}
            >
              {inst.status}
            </span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoTile icon={Camera} label="Cameras" value={`${inst.totalCameras}`} accent="indigo" />
          <InfoTile icon={Calendar} label="Installed On" value={format(new Date(inst.installedDate), "dd MMM yyyy")} accent="violet" />
          <InfoTile
            icon={ShieldCheck}
            label="AMC Expiry"
            value={inst.amcExpiry ? format(new Date(inst.amcExpiry), "dd MMM yyyy") : "No AMC"}
            accent={expired ? "rose" : "emerald"}
          />
          <InfoTile
            icon={AlertTriangle}
            label="AMC Status"
            value={
              !inst.amcExpiry
                ? "—"
                : expired
                ? `Expired ${Math.abs(daysToAmc!)} days ago`
                : `${daysToAmc} days left`
            }
            accent={expired ? "rose" : daysToAmc! < 30 ? "amber" : "emerald"}
          />
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Update Status</h2>
          <div className="max-w-xs space-y-2">
            <Label>Site status</Label>
            <Select value={inst.status} onValueChange={setStatus} disabled={update.isPending}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Site Address</p>
            <p className="flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{inst.address}</span>
            </p>
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer Contact</p>
            <p className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono">{inst.customerPhone ?? "—"}</span>
            </p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {inst.customerCity ?? "—"}
            </p>
          </div>
        </div>

        {inst.notes && (
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</p>
            <p className="whitespace-pre-wrap text-sm">{inst.notes}</p>
          </div>
        )}

        <div className="rounded-xl border bg-card p-4 text-center text-xs text-muted-foreground shadow-sm">
          Created {format(new Date(inst.createdAt), "dd MMM yyyy, hh:mm a")}
        </div>
      </div>
    </Layout>
  );
}

const ACCENTS: Record<string, string> = {
  emerald: "bg-emerald-500/10 text-emerald-700",
  rose: "bg-rose-500/10 text-rose-700",
  amber: "bg-amber-500/10 text-amber-700",
  indigo: "bg-indigo-500/10 text-indigo-700",
  violet: "bg-violet-500/10 text-violet-700",
};

function InfoTile({
  icon: Icon,
  label,
  value,
  accent = "indigo",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${ACCENTS[accent] ?? ACCENTS.indigo}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-xl font-bold">{value}</p>
    </div>
  );
}
