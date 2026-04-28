import { Link } from "wouter";
import {
  ArrowRight,
  ShieldCheck,
  Camera,
  Fingerprint,
  Flame,
  RadioTower,
  Wrench,
  CheckCircle2,
  Users,
  Award,
  Clock,
  Phone,
  ArrowUpRight,
  Sparkles,
  Building2,
  Factory,
  Home,
  Landmark,
  Quote,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";

const services = [
  {
    icon: Camera,
    title: "CCTV Surveillance",
    description: "HD / 4K IP cameras, NVRs, video analytics and 24×7 monitoring.",
    color: "text-sky-600 bg-sky-50",
  },
  {
    icon: Fingerprint,
    title: "Biometric Access",
    description: "Fingerprint, face & RFID access control for secure entry management.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: Flame,
    title: "Fire & Alarm Systems",
    description: "Smoke, heat & gas detection integrated with addressable panels.",
    color: "text-rose-600 bg-rose-50",
  },
  {
    icon: RadioTower,
    title: "RF Tower Installation",
    description: "Telecom & broadcast tower erection, alignment and AMC contracts.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: ShieldCheck,
    title: "Intrusion Detection",
    description: "Burglar alarms, perimeter sensors and integrated SOS panic systems.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Wrench,
    title: "AMC & Maintenance",
    description: "Preventive maintenance, on-site service and 24-hour response SLAs.",
    color: "text-cyan-600 bg-cyan-50",
  },
];

const stats = [
  { value: "16+", label: "Years in Business" },
  { value: "1,200+", label: "Installations Done" },
  { value: "350+", label: "Active AMC Clients" },
  { value: "24×7", label: "Support & Response" },
];

const sectors = [
  { icon: Building2, label: "Commercial Offices" },
  { icon: Factory, label: "Industrial Plants" },
  { icon: Home, label: "Residential Estates" },
  { icon: Landmark, label: "Government & Public" },
];

const testimonials = [
  {
    quote:
      "Sree Ram Technologies handled our entire campus surveillance — 80+ cameras, biometrics and a control room. Rollout was smooth and the after-sales response is excellent.",
    name: "Ramesh K.",
    role: "Facility Head, Hyderabad",
  },
  {
    quote:
      "Their RF tower team is one of the best we have worked with. On-time delivery and very disciplined safety practices on site.",
    name: "Anita P.",
    role: "Project Manager, Bharat Telecom",
  },
  {
    quote:
      "The AMC has been worth every rupee. Tickets are answered the same day and the on-site engineers genuinely know the equipment.",
    name: "Suresh M.",
    role: "Plant Manager, Vijayawada",
  },
];

export default function MarketingHome() {
  return (
    <MarketingLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,169,230,0.18),transparent_50%)]" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted security partner since 2008
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Smarter Security.
              <br />
              <span className="bg-gradient-to-r from-primary to-sky-600 bg-clip-text text-transparent">
                Stronger Surveillance.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Sree Ram Technologies is a leading provider of CCTV, biometric
              access, fire & alarm systems and RF tower installation across
              South India — backed by 16+ years of field expertise and a
              full-service AMC team.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/services">
                <button className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg" data-testid="button-explore-services">
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/portal">
                <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-slate-900 bg-white px-6 text-sm font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white" data-testid="button-hero-portal">
                  Open Web App
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ISO 9001 Certified
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                In-house Engineers
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                24×7 Service Desk
              </div>
            </div>
          </div>

          {/* Hero visual card */}
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-72 w-72 rounded-3xl bg-primary/20 blur-2xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100">
                    <Camera className="h-6 w-6 text-sky-600" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-900">4K IP CCTV</p>
                  <p className="mt-1 text-xs text-slate-500">Edge analytics & cloud NVR</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    <Fingerprint className="h-6 w-6 text-primary" />
                  </div>
                  <p className="mt-4 text-sm font-bold">Biometrics</p>
                  <p className="mt-1 text-xs text-slate-400">Face · Finger · RFID</p>
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-primary to-sky-600 p-6 text-white shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <RadioTower className="h-6 w-6" />
                  </div>
                  <p className="mt-4 text-sm font-bold">RF Towers</p>
                  <p className="mt-1 text-xs text-white/80">Erection & Alignment</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                    <Flame className="h-6 w-6 text-rose-600" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-900">Fire & Alarm</p>
                  <p className="mt-1 text-xs text-slate-500">Addressable detection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-primary md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">What We Do</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              End-to-end security & surveillance services
            </h2>
            <p className="mt-4 text-base text-slate-600">
              From the first site survey to lifetime maintenance — one
              accountable partner across every domain you need.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                data-testid={`card-service-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${s.color}`}>
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why Sree Ram</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              The reliable partner for mission-critical security
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We design, install and maintain — so you get a single
              accountable team for the entire lifecycle of your security
              infrastructure.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  icon: Award,
                  title: "16+ years of field expertise",
                  text: "Engineering teams trained on every major brand of camera, panel and biometric reader.",
                },
                {
                  icon: Users,
                  title: "Dedicated account management",
                  text: "Every client gets a named project lead and a 24×7 escalation matrix.",
                },
                {
                  icon: Clock,
                  title: "Fast on-site response SLAs",
                  text: "Same-day response across our service zones with stocked spare parts.",
                },
              ].map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Sectors We Serve</p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">Built for every environment</h3>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {sectors.map((sec) => (
                  <div key={sec.label} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <sec.icon className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{sec.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white">
                <p className="text-sm text-slate-300">Existing customer?</p>
                <p className="mt-1 text-lg font-bold">Manage tickets & invoices online</p>
                <Link href="/portal">
                  <button className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">
                    Open Customer Portal <ArrowUpRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Client Voices</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Trusted by businesses across South India
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
                <Quote className="h-8 w-8 text-primary/40" />
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{t.quote}</p>
                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-900 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,169,230,0.25),transparent_60%)]" />
        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-8 px-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Ready to secure what matters most?
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Talk to our solution architect today — get a free site survey
              and a tailored quotation within 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact">
              <button className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <a href="tel:+919876543210">
              <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white/30 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10">
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </button>
            </a>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
