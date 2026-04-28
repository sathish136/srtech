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
  Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type NavItem = { href: string; label: string; icon: typeof LayoutDashboard };
type NavSection = { label: string; items: NavItem[] };

const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [{ href: "/", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "Operations",
    items: [
      { href: "/customers", label: "Customers", icon: Users },
      { href: "/installations", label: "Installations", icon: Wrench },
      { href: "/tickets", label: "Tickets", icon: ClipboardList },
      { href: "/assets", label: "Inventory", icon: Package },
    ],
  },
  {
    label: "Finance",
    items: [{ href: "/invoices", label: "Invoices", icon: FileText }],
  },
  {
    label: "Workforce",
    items: [
      { href: "/employees", label: "Employees", icon: UserCircle },
      { href: "/attendance", label: "Attendance", icon: CalendarClock },
    ],
  },
];

const allItems = navSections.flatMap((s) => s.items);

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const isItemActive = (href: string) =>
    location === href || (href !== "/" && location.startsWith(href));

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <Link href="/">
          <div className="flex items-center gap-3 font-semibold transition-opacity hover:opacity-90">
            <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-chart-3 shadow-lg shadow-primary/30">
              <img
                src={import.meta.env.BASE_URL + "logo.png"}
                alt="Sree Ram Technologies"
                className="h-7 w-7 rounded object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">Sree Ram Tech</span>
              <span className="text-[10px] uppercase tracking-wider text-sidebar-foreground/50">
                Control Portal
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-5">
        <nav className="flex flex-col gap-5 px-3">
          {navSections.map((section) => (
            <div key={section.label} className="flex flex-col gap-1">
              <div className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sidebar-foreground/40">
                {section.label}
              </div>
              {section.items.map((item) => {
                const active = isItemActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        active
                          ? "bg-gradient-to-r from-primary/20 via-primary/10 to-transparent text-white"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-white"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gradient-to-b from-primary to-chart-3" />
                      )}
                      <item.icon
                        className={`h-4 w-4 transition-colors ${
                          active
                            ? "text-primary"
                            : "text-sidebar-foreground/60 group-hover:text-white"
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>

      {/* Pro callout + Logout */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        <div className="rounded-lg border border-sidebar-border bg-gradient-to-br from-primary/15 to-chart-3/10 p-3">
          <div className="mb-1 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-white">All systems normal</span>
          </div>
          <p className="text-[11px] text-sidebar-foreground/60 leading-relaxed">
            Operations running smoothly across all modules.
          </p>
        </div>
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent/60 hover:text-white">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  const currentTitle =
    allItems.find((item) => isItemActive(item.href))?.label || "Portal";

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 flex-col md:flex border-r border-sidebar-border">
        <SidebarContent />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 border-r-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2 text-sm">
              <span className="hidden font-medium text-muted-foreground md:inline">
                Portal
              </span>
              <span className="hidden text-muted-foreground/50 md:inline">/</span>
              <span className="font-semibold text-foreground">{currentTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative hidden lg:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search anything…"
                className="h-9 w-64 border-0 bg-muted/60 pl-9 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-card" />
              <span className="sr-only">Notifications</span>
            </Button>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-1 py-1 pr-3 shadow-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-chart-3 text-sm font-semibold text-white">
                AD
              </div>
              <div className="hidden text-sm leading-tight md:block">
                <p className="font-semibold">Admin</p>
                <p className="text-[11px] text-muted-foreground">Control Room</p>
              </div>
            </div>
          </div>
        </header>

        <main className="relative flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto h-full w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
