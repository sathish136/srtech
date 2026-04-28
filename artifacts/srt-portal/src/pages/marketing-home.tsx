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
  Building2,
  Factory,
  Home,
  Landmark,
  Quote,
  Star,
  PlayCircle,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";

const BASE = import.meta.env.BASE_URL;

const services = [
  { icon: Camera, title: "CCTV Surveillance", description: "HD / 4K IP cameras, NVRs, video analytics and 24×7 monitoring." },
  { icon: Fingerprint, title: "Biometric Access", description: "Fingerprint, face & RFID access control for secure entry management." },
  { icon: Flame, title: "Fire & Alarm Systems", description: "Smoke, heat & gas detection integrated with addressable panels." },
  { icon: RadioTower, title: "RF Tower Installation", description: "Telecom & broadcast tower erection, alignment and AMC contracts." },
  { icon: ShieldCheck, title: "Intrusion Detection", description: "Burglar alarms, perimeter sensors and integrated SOS panic systems." },
  { icon: Wrench, title: "AMC & Maintenance", description: "Preventive maintenance, on-site service and 24-hour response SLAs." },
];

const stats = [
  { value: "16+", label: "Years in Business" },
  { value: "1,200+", label: "Installations Done" },
  { value: "350+", label: "Active AMC Clients" },
  { value: "24×7", label: "Support & Response" },
];

const sectors = [
  { icon: Building2, label: "Commercial Offices", image: `${BASE}images/office.jpg` },
  { icon: Factory, label: "Industrial Plants", image: `${BASE}images/industrial.jpg` },
  { icon: Home, label: "Residential Estates", image: `${BASE}images/hero-camera.jpg` },
  { icon: Landmark, label: "Government & Public", image: `${BASE}images/control-room.jpg` },
];

const testimonials = [
  {
    quote: "Sree Ram Technologies handled our entire campus surveillance — 80+ cameras, biometrics and a control room. Rollout was smooth and the after-sales response is excellent.",
    name: "Ramesh K.",
    role: "Facility Head, Hyderabad",
  },
  {
    quote: "Their RF tower team is one of the best we have worked with. On-time delivery and very disciplined safety practices on site.",
    name: "Anita P.",
    role: "Project Manager, Bharat Telecom",
  },
  {
    quote: "The AMC has been worth every rupee. Tickets are answered the same day and the on-site engineers genuinely know the equipment.",
    name: "Suresh M.",
    role: "Plant Manager, Vijayawada",
  },
];

export default function MarketingHome() {
  return (
    <MarketingLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(31,169,230,0.15),transparent_55%)]" />
        <div className="relative mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              No.1 Security Solutions Provider in South India
            </div>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              Smarter Security.
              <br />
              <span className="bg-gradient-to-r from-primary to-sky-600 bg-clip-text text-transparent">
                Stronger Surveillance.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Sree Ram Technologies designs, installs and maintains end-to-end
              security infrastructure — CCTV, biometrics, fire alarms and RF
              towers — for businesses, factories and government across South
              India.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/services">
                <button className="inline-flex h-12 items-center gap-2 rounded-md bg-gradient-to-r from-primary to-sky-600 px-7 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]" data-testid="button-explore-services">
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/portal">
                <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-slate-900 bg-white px-7 text-sm font-bold text-slate-900 transition-all hover:bg-slate-900 hover:text-white" data-testid="button-hero-portal">
                  <PlayCircle className="h-5 w-5" />
                  Open Web App
                </button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                ISO 9001 Certified
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                In-house Engineers
              </div>
              <div className="flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                24×7 Service Desk
              </div>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative lg:col-span-6">
            <div className="absolute -left-8 -top-8 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -bottom-10 -right-8 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />
            <div className="relative">
              <img
                src={`${BASE}images/hero-camera.jpg`}
                alt="Modern CCTV security camera"
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
              />
              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-slate-900">1,200+</p>
                    <p className="text-xs font-medium text-slate-500">Successful Installations</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 hidden rounded-2xl bg-slate-900 p-5 text-white shadow-2xl md:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">24×7</p>
                    <p className="text-xs font-medium text-slate-300">Live Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gradient-to-r from-primary to-sky-600 text-white">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-extrabold md:text-5xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium uppercase tracking-wider text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">What We Do</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              End-to-end security & surveillance services
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              From the first site survey to lifetime maintenance — one
              accountable partner across every domain you need.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.title}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8 shadow-[0_2px_20px_-8px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(31,169,230,0.35)] hover:ring-primary/30"
                data-testid={`card-service-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/5 transition-all group-hover:scale-150 group-hover:bg-primary/10" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-600 text-white shadow-lg shadow-primary/25">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <Link href="/services">
                  <div className="relative mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — with image */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-14 px-6 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-8 top-8 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <img
              src={`${BASE}images/control-room.jpg`}
              alt="Security control room"
              className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-slate-200 md:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-br from-primary to-sky-600 text-xs font-bold text-white flex items-center justify-center">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">350+ happy clients</p>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                    <span className="ml-1 text-xs font-semibold text-slate-600">4.9 / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Why Sree Ram</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              The reliable partner for mission-critical security
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              We design, install and maintain — so you get a single
              accountable team for the entire lifecycle of your security
              infrastructure.
            </p>

            <div className="mt-8 space-y-6">
              {[
                { icon: Award, title: "16+ years of field expertise", text: "Engineering teams trained on every major brand of camera, panel and biometric reader." },
                { icon: Users, title: "Dedicated account management", text: "Every client gets a named project lead and a 24×7 escalation matrix." },
                { icon: Clock, title: "Fast on-site response SLAs", text: "Same-day response across our service zones with stocked spare parts." },
              ].map((b) => (
                <div key={b.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-sky-600 text-white shadow-lg shadow-primary/25">
                    <b.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{b.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Sectors We Serve</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Built for every environment
            </h2>
            <p className="mt-5 text-base text-slate-600">
              From small offices to large industrial plants — our solutions
              scale to fit any setting.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sec) => (
              <div key={sec.label} className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl shadow-lg">
                <img src={sec.image} alt={sec.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur transition-all group-hover:bg-primary">
                    <sec.icon className="h-5 w-5" />
                  </div>
                  <p className="text-base font-bold">{sec.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RF TOWER feature row */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 opacity-30">
          <img src={`${BASE}images/rf-tower.jpg`} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
        </div>
        <div className="relative mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Telecom Infrastructure</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              RF Tower Installation & Maintenance
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
              Specialised teams for telecom, broadcast and microwave tower
              erection — from foundation to antenna alignment, lightning
              protection and lifetime maintenance contracts.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                "Self-supporting & guyed towers",
                "Antenna mounting & RF alignment",
                "Lightning & earthing systems",
                "Periodic structural inspections",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/services">
              <button className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-sm font-bold text-slate-900 shadow-lg transition-all hover:scale-[1.02]">
                Explore Tower Services <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-24">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Client Voices</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Trusted by businesses across South India
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`relative rounded-2xl p-8 ${i === 1 ? "bg-gradient-to-br from-primary to-sky-600 text-white shadow-2xl shadow-primary/30" : "bg-slate-50 text-slate-700"}`}>
                <Quote className={`h-10 w-10 ${i === 1 ? "text-white/30" : "text-primary/30"}`} />
                <p className={`mt-4 text-sm leading-relaxed ${i === 1 ? "text-white/95" : "text-slate-700"}`}>
                  {t.quote}
                </p>
                <div className={`mt-6 flex items-center gap-3 border-t pt-5 ${i === 1 ? "border-white/20" : "border-slate-200"}`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${i === 1 ? "bg-white/20 text-white" : "bg-primary/10 text-primary"}`}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${i === 1 ? "text-white" : "text-slate-900"}`}>{t.name}</p>
                    <p className={`text-xs ${i === 1 ? "text-white/80" : "text-slate-500"}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,169,230,0.3),transparent_60%)]" />
        <div className="relative mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-8 px-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Ready to secure what matters most?
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Talk to our solution architect today — get a free site survey
              and a tailored quotation within 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact">
              <button className="inline-flex h-12 items-center gap-2 rounded-md bg-gradient-to-r from-primary to-sky-600 px-7 text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.02]">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <a href="tel:+919876543210">
              <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white/30 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10">
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
