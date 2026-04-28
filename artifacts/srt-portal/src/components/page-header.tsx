import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actions?: ReactNode;
  /**
   * @deprecated kept for backward compatibility, no longer used.
   */
  accentClassName?: string;
}

export function PageHeader({ icon: Icon, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="hidden h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary md:flex">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-[28px]">{title}</h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
