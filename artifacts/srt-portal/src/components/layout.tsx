import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  Users,
  Package,
  Wrench,
  ClipboardList,
  FileText,
  UserCircle,
  CalendarClock,
  Menu,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Target,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };

const navItems: NavItem[] = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/leads", label: "Leads / CRM", icon: Target },
  { href: "/portal/customers", label: "Customers", icon: Users },
  { href: "/portal/installations", label: "Installations", icon: Wrench },
  { href: "/portal/tickets", label: "Tickets", icon: ClipboardList },
  { href: "/portal/assets", label: "Inventory", icon: Package },
  { href: "/portal/invoices", label: "Invoices", icon: FileText },
  { href: "/portal/employees", label: "Employees", icon: UserCircle },
  { href: "/portal/attendance", label: "Attendance", icon: CalendarClock },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const isItemActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Top brand bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-card">
        <div className="mx-auto flex h-16 w-full max-w-screen-2xl items-center gap-4 px-4 md:px-6">
          {/* Mobile menu trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex h-16 items-center border-b border-border px-5">
                <span className="text-sm font-semibold">Sree Ram Technologies</span>
              </div>
              <nav className="flex flex-col p-3">
                {navItems.map((item) => {
                  const active = isItemActive(item.href);
                  return (
                    <Link key={item.href} href={item.href}>
                      <div
                        className={cn(
                          "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-foreground/70 hover:bg-muted hover:text-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Brand */}
          <Link href="/portal">
            <div className="flex items-center gap-2.5 transition-opacity hover:opacity-80">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md bg-primary/10">
                <img
                  src={import.meta.env.BASE_URL + "logo.png"}
                  alt="Sree Ram Technologies"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <div className="hidden flex-col leading-tight sm:flex">
                <span className="text-sm font-semibold tracking-tight">
                  Sree Ram Technologies
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Control Portal
                </span>
              </div>
            </div>
          </Link>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {/* Search */}
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search…"
                className="h-9 w-56 border-border bg-muted/40 pl-9 focus-visible:bg-card focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>

            {/* Bell */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
              <span className="sr-only">Notifications</span>
            </Button>

            {/* Avatar */}
            <button className="flex items-center gap-2 rounded-md border border-border bg-card px-1.5 py-1 pr-2 transition-colors hover:bg-muted">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                AD
              </div>
              <div className="hidden text-left text-xs leading-tight sm:block">
                <p className="font-semibold">Admin</p>
                <p className="text-[10px] text-muted-foreground">Control Room</p>
              </div>
              <ChevronDown className="hidden h-3.5 w-3.5 text-muted-foreground sm:block" />
            </button>
          </div>
        </div>

        {/* Desktop nav row */}
        <nav className="hidden border-t border-border md:block">
          <div className="mx-auto flex h-12 w-full max-w-screen-2xl items-center gap-1 overflow-x-auto px-4 md:px-6">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "relative flex h-12 items-center gap-2 px-3 text-sm font-medium transition-colors whitespace-nowrap",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary" />
                    )}
                  </div>
                </Link>
              );
            })}
            <button className="ml-auto flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-screen-2xl">{children}</div>
      </main>
    </div>
  );
}
