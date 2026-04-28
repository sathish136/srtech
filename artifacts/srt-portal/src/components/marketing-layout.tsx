import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function MarketingLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-slate-900">
      {/* Top utility bar */}
      <div className="hidden bg-slate-900 text-slate-200 md:block">
        <div className="mx-auto flex h-10 w-full max-w-screen-2xl items-center justify-between px-6 text-xs">
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Welcome to Sree Ram Technologies</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:info@sreeramtech.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3.5 w-3.5" />
              info@sreeramtech.in
            </a>
            <a href="tel:+919876543210" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3.5 w-3.5" />
              +91 98765 43210
            </a>
            <span className="flex items-center gap-1.5 text-slate-400">
              <MapPin className="h-3.5 w-3.5" />
              Hyderabad, Telangana
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-18 w-full max-w-screen-2xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/">
            <div className="flex items-center gap-3 transition-opacity hover:opacity-80">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-primary/10">
                <img
                  src={import.meta.env.BASE_URL + "logo.png"}
                  alt="Sree Ram Technologies"
                  className="h-9 w-9 object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  Sree Ram Technologies
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold">
                  Security · Surveillance · Solutions
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={cn(
                      "relative px-4 py-2 text-sm font-semibold transition-colors",
                      active
                        ? "text-primary"
                        : "text-slate-700 hover:text-primary"
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-1 h-0.5 rounded-full bg-primary" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Open Web App CTA */}
            <Link href="/portal">
              <button
                className="hidden h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md sm:inline-flex"
                data-testid="button-open-portal"
              >
                Open Web App
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 text-slate-700 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <nav className="mx-auto flex w-full max-w-screen-2xl flex-col gap-1 px-4 py-3">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-md px-4 py-3 text-sm font-semibold",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      {item.label}
                    </div>
                  </Link>
                );
              })}
              <Link href="/portal">
                <div className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground sm:hidden">
                  Open Web App
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
        <div className="mx-auto w-full max-w-screen-2xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg bg-white/5">
                  <img
                    src={import.meta.env.BASE_URL + "logo.png"}
                    alt="Sree Ram Technologies"
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Sree Ram Technologies</p>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">
                    Established 2008
                  </p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-slate-400">
                A trusted CCTV, biometrics, security systems and RF tower
                solutions provider — sales, installation and after-sales support
                across South India.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-slate-300 transition-colors hover:bg-primary hover:text-white">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-slate-300 transition-colors hover:bg-primary hover:text-white">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-slate-300 transition-colors hover:bg-primary hover:text-white">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-slate-300 transition-colors hover:bg-primary hover:text-white">
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Company</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/about"><span className="cursor-pointer hover:text-white">About Us</span></Link></li>
                <li><Link href="/services"><span className="cursor-pointer hover:text-white">Services</span></Link></li>
                <li><Link href="/products"><span className="cursor-pointer hover:text-white">Products</span></Link></li>
                <li><Link href="/contact"><span className="cursor-pointer hover:text-white">Contact</span></Link></li>
                <li><Link href="/portal"><span className="cursor-pointer hover:text-white">Customer Portal</span></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Solutions</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="hover:text-white cursor-pointer">CCTV Surveillance</li>
                <li className="hover:text-white cursor-pointer">Biometric Access</li>
                <li className="hover:text-white cursor-pointer">Fire & Alarm Systems</li>
                <li className="hover:text-white cursor-pointer">RF Tower Installation</li>
                <li className="hover:text-white cursor-pointer">Annual Maintenance</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Get In Touch</h4>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Plot 12, HITEC City, Hyderabad, Telangana 500081</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:info@sreeramtech.in" className="hover:text-white">info@sreeramtech.in</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 md:flex-row">
            <p>© {new Date().getFullYear()} Sree Ram Technologies Pvt Ltd. All rights reserved.</p>
            <p className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
