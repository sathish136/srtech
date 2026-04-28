import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type AccentColor =
  | "blue"
  | "violet"
  | "emerald"
  | "amber"
  | "rose"
  | "cyan"
  | "indigo"
  | "orange";

const ACCENT_STYLES: Record<AccentColor, { bg: string; ring: string; icon: string }> = {
  blue:    { bg: "bg-gradient-to-br from-blue-500 to-blue-600",       ring: "ring-blue-500/15",    icon: "text-white" },
  violet:  { bg: "bg-gradient-to-br from-violet-500 to-purple-600",   ring: "ring-violet-500/15",  icon: "text-white" },
  emerald: { bg: "bg-gradient-to-br from-emerald-500 to-teal-600",    ring: "ring-emerald-500/15", icon: "text-white" },
  amber:   { bg: "bg-gradient-to-br from-amber-400 to-orange-500",    ring: "ring-amber-500/15",   icon: "text-white" },
  rose:    { bg: "bg-gradient-to-br from-rose-500 to-pink-600",       ring: "ring-rose-500/15",    icon: "text-white" },
  cyan:    { bg: "bg-gradient-to-br from-cyan-500 to-sky-600",        ring: "ring-cyan-500/15",    icon: "text-white" },
  indigo:  { bg: "bg-gradient-to-br from-indigo-500 to-blue-700",     ring: "ring-indigo-500/15",  icon: "text-white" },
  orange:  { bg: "bg-gradient-to-br from-orange-500 to-red-500",      ring: "ring-orange-500/15",  icon: "text-white" },
};

interface KpiCardProps {
  title: string;
  value?: string | number;
  icon: LucideIcon;
  accent?: AccentColor;
  loading?: boolean;
  hint?: ReactNode;
}

export function KpiCard({
  title,
  value,
  icon: Icon,
  accent = "blue",
  loading,
  hint,
}: KpiCardProps) {
  const styles = ACCENT_STYLES[accent];
  return (
    <Card className="group relative overflow-hidden p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </p>
          {loading ? (
            <Skeleton className="mt-2 h-8 w-24" />
          ) : (
            <div className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {value ?? "—"}
            </div>
          )}
          {hint && (
            <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
          )}
        </div>
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl ring-4 shrink-0",
            styles.bg,
            styles.ring,
          )}
        >
          <Icon className={cn("h-5 w-5", styles.icon)} />
        </div>
      </div>
      <div className={cn(
        "absolute -bottom-12 -right-12 h-32 w-32 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100",
        styles.bg,
        "blur-3xl"
      )} />
    </Card>
  );
}
