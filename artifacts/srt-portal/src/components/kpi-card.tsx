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

const ACCENT_STYLES: Record<AccentColor, string> = {
  blue: "bg-blue-500/10 text-blue-600",
  violet: "bg-violet-500/10 text-violet-600",
  emerald: "bg-emerald-500/10 text-emerald-600",
  amber: "bg-amber-500/10 text-amber-600",
  rose: "bg-rose-500/10 text-rose-600",
  cyan: "bg-cyan-500/10 text-cyan-600",
  indigo: "bg-indigo-500/10 text-indigo-600",
  orange: "bg-orange-500/10 text-orange-600",
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
  return (
    <Card className="p-5 transition-colors hover:border-foreground/20">
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
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            ACCENT_STYLES[accent]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}
