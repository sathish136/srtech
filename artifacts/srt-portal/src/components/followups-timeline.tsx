import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useListEmployees } from "@workspace/api-client-react";
import { api, type Followup } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  MessageSquare,
  Phone,
  MapPin,
  CheckCircle2,
  PauseCircle,
  UserPlus,
  FileText,
  TrendingUp,
  XCircle,
  Trophy,
  Send,
} from "lucide-react";

const ACTION_META: Record<string, { label: string; icon: typeof MessageSquare; tone: string }> = {
  assigned: { label: "Assigned", icon: UserPlus, tone: "bg-blue-500/10 text-blue-600" },
  called_customer: { label: "Customer Call", icon: Phone, tone: "bg-violet-500/10 text-violet-600" },
  called: { label: "Call", icon: Phone, tone: "bg-violet-500/10 text-violet-600" },
  site_visit: { label: "Site Visit", icon: MapPin, tone: "bg-cyan-500/10 text-cyan-600" },
  in_progress: { label: "Working", icon: TrendingUp, tone: "bg-amber-500/10 text-amber-600" },
  on_hold: { label: "On Hold", icon: PauseCircle, tone: "bg-slate-500/10 text-slate-600" },
  resolved: { label: "Resolved", icon: CheckCircle2, tone: "bg-emerald-500/10 text-emerald-600" },
  walk_in: { label: "Walk-in", icon: UserPlus, tone: "bg-indigo-500/10 text-indigo-600" },
  received_inquiry: { label: "Inquiry", icon: MessageSquare, tone: "bg-blue-500/10 text-blue-600" },
  quote_sent: { label: "Quote Sent", icon: FileText, tone: "bg-amber-500/10 text-amber-600" },
  negotiation: { label: "Negotiation", icon: TrendingUp, tone: "bg-orange-500/10 text-orange-600" },
  won: { label: "Won!", icon: Trophy, tone: "bg-emerald-500/10 text-emerald-600" },
  lost: { label: "Lost", icon: XCircle, tone: "bg-rose-500/10 text-rose-600" },
  note: { label: "Note", icon: MessageSquare, tone: "bg-muted text-muted-foreground" },
};

function actionMeta(action: string) {
  return ACTION_META[action] ?? ACTION_META.note;
}

type Props = {
  entityType: "ticket" | "lead";
  entityId: number;
  actionOptions?: { value: string; label: string }[];
};

const DEFAULT_TICKET_ACTIONS = [
  { value: "called_customer", label: "Called Customer" },
  { value: "site_visit", label: "Site Visit" },
  { value: "in_progress", label: "Working On It" },
  { value: "on_hold", label: "On Hold" },
  { value: "resolved", label: "Resolved" },
  { value: "note", label: "General Note" },
];

const DEFAULT_LEAD_ACTIONS = [
  { value: "called", label: "Called" },
  { value: "site_visit", label: "Site Visit" },
  { value: "quote_sent", label: "Quote Sent" },
  { value: "negotiation", label: "Negotiation" },
  { value: "won", label: "Won" },
  { value: "lost", label: "Lost" },
  { value: "note", label: "General Note" },
];

export function FollowupsTimeline({ entityType, entityId, actionOptions }: Props) {
  const qc = useQueryClient();
  const queryKey = ["followups", entityType, entityId];

  const { data: items, isLoading } = useQuery({
    queryKey,
    queryFn: () => api.listFollowups(entityType, entityId),
  });

  const { data: employees } = useListEmployees();

  const options =
    actionOptions ?? (entityType === "ticket" ? DEFAULT_TICKET_ACTIONS : DEFAULT_LEAD_ACTIONS);

  const [action, setAction] = useState(options[0].value);
  const [note, setNote] = useState("");
  const [byId, setById] = useState<string>("");
  const [nextDate, setNextDate] = useState<string>("");

  const create = useMutation({
    mutationFn: () =>
      api.createFollowup({
        entityType,
        entityId,
        action,
        note,
        byEmployeeId: byId ? Number(byId) : null,
        nextActionDate: nextDate || null,
      }),
    onSuccess: () => {
      setNote("");
      setNextDate("");
      qc.invalidateQueries({ queryKey });
    },
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-3 p-5">
          <h3 className="text-sm font-semibold">Add Follow-up</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger>
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                {options.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={byId} onValueChange={setById}>
              <SelectTrigger>
                <SelectValue placeholder="By employee" />
              </SelectTrigger>
              <SelectContent>
                {employees?.map((e) => (
                  <SelectItem key={e.id} value={String(e.id)}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={nextDate}
              onChange={(e) => setNextDate(e.target.value)}
              placeholder="Next action date"
            />
          </div>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you do? Notes for the team…"
            className="min-h-[80px]"
          />
          <div className="flex justify-end">
            <Button
              onClick={() => create.mutate()}
              disabled={!note.trim() || create.isPending}
            >
              <Send className="h-4 w-4" />
              {create.isPending ? "Saving…" : "Add Follow-up"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Activity Timeline</h3>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : !items || items.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-sm text-muted-foreground">
              No follow-ups yet. Add the first one above.
            </CardContent>
          </Card>
        ) : (
          <ol className="relative space-y-3 border-l-2 border-border pl-6">
            {items.map((f) => (
              <FollowupItem key={f.id} f={f} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

function FollowupItem({ f }: { f: Followup }) {
  const meta = actionMeta(f.action);
  const Icon = meta.icon;
  return (
    <li className="relative">
      <span
        className={`absolute -left-[34px] top-2 flex h-7 w-7 items-center justify-center rounded-full ring-4 ring-background ${meta.tone}`}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold">{meta.label}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              {f.byEmployeeName ?? "System"}
            </span>
            <span className="ml-auto text-xs text-muted-foreground">
              {format(new Date(f.createdAt), "dd MMM yyyy, hh:mm a")}
            </span>
          </div>
          <p className="mt-1 whitespace-pre-wrap text-sm">{f.note}</p>
          {f.nextActionDate && (
            <p className="mt-2 text-xs text-muted-foreground">
              Next action: {format(new Date(f.nextActionDate), "dd MMM yyyy")}
            </p>
          )}
        </CardContent>
      </Card>
    </li>
  );
}
