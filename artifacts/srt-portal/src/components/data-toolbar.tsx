import { ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DataToolbarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  filters?: ReactNode;
}

export function DataToolbar({
  placeholder = "Search…",
  value,
  onChange,
  filters,
}: DataToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm sm:flex-row sm:items-center">
      <div className="relative flex-1 sm:max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-10 w-full border-0 bg-muted/40 pl-10 focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
      {filters && <div className="flex items-center gap-2">{filters}</div>}
    </div>
  );
}
