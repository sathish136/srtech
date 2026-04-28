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
  LogOut
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/assets", label: "Inventory", icon: Package },
  { href: "/installations", label: "Installations", icon: Wrench },
  { href: "/tickets", label: "Tickets", icon: ClipboardList },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/employees", label: "Employees", icon: UserCircle },
  { href: "/attendance", label: "Attendance", icon: CalendarClock },
];

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Link href="/">
          <div className="flex items-center gap-3 font-semibold hover:opacity-90 transition-opacity">
            <img 
              src={import.meta.env.BASE_URL + 'logo.png'} 
              alt="Sree Ram Technologies" 
              className="h-8 w-8 object-contain bg-white rounded p-0.5" 
            />
            <span className="truncate">Sree Ram Tech</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="grid gap-1 px-3">
          {navItems.map((item) => {
            const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}>
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer">
          <LogOut className="h-4 w-4" />
          Logout
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="hidden w-64 flex-col md:flex border-r border-border">
        <SidebarContent />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-6 bg-card sticky top-0 z-10">
          <div className="flex items-center gap-4">
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
            <h1 className="text-lg font-semibold truncate capitalize">
              {navItems.find(item => location === item.href || (item.href !== "/" && location.startsWith(item.href)))?.label || "Portal"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                AD
              </div>
              <div className="hidden text-sm md:block">
                <p className="font-medium leading-none">Admin</p>
                <p className="text-xs text-muted-foreground leading-none mt-1">Control Room</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          <div className="mx-auto max-w-7xl w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
