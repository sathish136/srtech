import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actions?: ReactNode;
  accentClassName?: string;
}

export function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
  accentClassName = "from-primary to-chart-3",
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        {Icon && (
          <div
            className={`hidden md:flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accentClassName} text-white shadow-md shadow-primary/20`}
          >
            <Icon className="h-6 w-6" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {description && (
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
