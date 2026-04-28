import { Link } from "wouter";
import {
  ArrowRight,
  Camera,
  Fingerprint,
  Flame,
  RadioTower,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Clock,
  Phone,
  Building2,
  Factory,
  Home,
  Landmark,
  Quote,
  Star,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";

const BASE = import.meta.env.BASE_URL;

const categories = [
  { icon: Camera, label: "CCTV Surveillance" },
  { icon: Fingerprint, label: "Biometric Access" },
  { icon: Flame, label: "Fire Alarm" },
  { icon: RadioTower, label: "RF Tower" },
  { icon: ShieldCheck, label: "Intrusion Alarm" },
  { icon: Wrench, label: "AMC Service" },
];

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
    role: "Facility Head, Tirupur",
  },
  {
    quote: "Their RF tower team is one of the best we have worked with. On-time delivery and very disciplined safety practices on site.",
    name: "Anita P.",
    role: "Project Manager, Coimbatore",
  },
  {
    quote: "The AMC has been worth every rupee. Tickets are answered the same day and the on-site engineers genuinely know the equipment.",
    name: "Suresh M.",
    role: "Plant Manager, Erode",
  },
];

export default function MarketingHome() {
  return (
    <MarketingLayout>
      {/* HERO — liveu.lk style with product collage */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
          <div className="lg:col-span-6">
            <p className="font-serif text-base italic text-orange-500 md:text-lg">
              No.1 CCTV / Biometric &amp; Security Solution Provider in Tamil Nadu.
            </p>
            <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              SREE RAM
              <br />
              <span className="text-primary">TECHNOLOGIES</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600">
              Sree Ram Technologies, established in 2008 in Tirupur, is a
              leading provider of electronic security solutions across Tamil
              Nadu. With 16+ years of expertise in installation and
              after-sales support, we serve Residential, Commercial,
              Industrial, Manufacturing and Government sectors. Committed to
              quality and innovation, we deliver reliable, tailored security
              systems to safeguard homes and enterprises alike.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/services">
                <button className="inline-flex h-12 items-center gap-2 rounded-md bg-orange-500 px-7 text-sm font-bold text-white transition-colors hover:bg-orange-600" data-testid="button-explore-services">
                  Explore Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link href="/about">
                <button className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-7 text-sm font-bold text-white transition-colors hover:bg-primary/90" data-testid="button-about">
                  About Us
                  <ArrowRight className="h-4 w-4" />
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

          {/* Product collage */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto h-[480px] w-full max-w-[560px]">
              {/* Decorative dotted orbit */}
              <div className="absolute inset-4 rounded-full border-2 border-dashed border-slate-200" />
              <div className="absolute inset-16 rounded-full border-2 border-dashed border-slate-200" />

              {/* Decorative dots */}
              <span className="absolute left-2 top-32 h-2.5 w-2.5 rounded-full bg-orange-500" />
              <span className="absolute right-6 top-12 h-3 w-3 rounded-full bg-primary" />
              <span className="absolute bottom-12 left-12 h-2 w-2 rounded-full bg-orange-500" />
              <span className="absolute bottom-20 right-8 h-2.5 w-2.5 rounded-full bg-primary" />

              {/* Center logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  src={`${BASE}logo.png`}
                  alt="Sree Ram Technologies"
                  className="h-44 w-44 object-contain"
                />
              </div>

              {/* Floating product 1 — camera */}
              <div className="absolute -left-2 top-4 h-36 w-36 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                <img src={`${BASE}images/hero-camera.jpg`} alt="CCTV camera" className="h-full w-full object-cover" />
              </div>

              {/* Floating product 2 — biometric */}
              <div className="absolute -right-2 top-16 h-40 w-40 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                <img src={`${BASE}images/biometric.jpg`} alt="Biometric reader" className="h-full w-full object-cover" />
              </div>

              {/* Floating product 3 — control room */}
              <div className="absolute -right-4 bottom-4 h-36 w-36 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                <img src={`${BASE}images/control-room.jpg`} alt="Control room" className="h-full w-full object-cover" />
              </div>

              {/* Floating product 4 — fire alarm */}
              <div className="absolute -left-4 bottom-8 h-36 w-36 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                <img src={`${BASE}images/fire-alarm.jpg`} alt="Fire alarm" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP CATEGORIES — liveu.lk style rounded cards */}
      <section className="border-y border-dashed border-orange-300 bg-white py-16">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Our Top Categories
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-slate-600">
              Browse the complete range of security and surveillance solutions we deliver.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((c) => (
              <Link key={c.label} href="/services">
                <div className="group flex cursor-pointer flex-col items-center text-center">
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-slate-50 ring-1 ring-slate-200 transition-all group-hover:bg-primary group-hover:ring-primary">
                    <c.icon className="h-10 w-10 text-primary transition-colors group-hover:text-white" strokeWidth={1.5} />
                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-orange-500 ring-2 ring-white" />
                  </div>
                  <p className="mt-4 text-sm font-bold text-slate-900">{c.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR — flat */}
      <section className="bg-primary text-white">
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
      <section className="bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">What We Do</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              End-to-end security &amp; surveillance services
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
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-white p-8 ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:ring-primary hover:shadow-lg"
                data-testid={`card-service-${s.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
                <Link href="/services">
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-orange-500 opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US — with image */}
      <section className="bg-white py-24">
        <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-14 px-6 lg:grid-cols-2">
          <div className="relative">
            <img
              src={`${BASE}images/control-room.jpg`}
              alt="Security control room"
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 md:block">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["A", "B", "C", "D"].map((l) => (
                    <div key={l} className="h-10 w-10 rounded-full border-2 border-white bg-primary text-xs font-bold text-white flex items-center justify-center">
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">350+ happy clients</p>
                  <div className="flex items-center gap-0.5 text-orange-500">
                    {[1,2,3,4,5].map((i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                    <span className="ml-1 text-xs font-semibold text-slate-600">4.9 / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">Why Sree Ram</p>
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
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
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
      <section className="bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">Sectors We Serve</p>
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
              <div key={sec.label} className="group relative h-72 cursor-pointer overflow-hidden rounded-2xl">
                <img src={sec.image} alt={sec.label} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/55" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500">
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
        <div className="absolute inset-0 opacity-25">
          <img src={`${BASE}images/rf-tower.jpg`} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>
        <div className="relative mx-auto grid w-full max-w-screen-2xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">Telecom Infrastructure</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
              RF Tower Installation &amp; Maintenance
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
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                  <span className="text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            <Link href="/services">
              <button className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-orange-500 px-6 text-sm font-bold text-white transition-colors hover:bg-orange-600">
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
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-500">Client Voices</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Trusted by businesses across Tamil Nadu
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`relative rounded-2xl p-8 ${
                  i === 1
                    ? "bg-primary text-white"
                    : "bg-slate-50 text-slate-700 ring-1 ring-slate-200"
                }`}
              >
                <Quote className={`h-10 w-10 ${i === 1 ? "text-white/30" : "text-orange-500/40"}`} />
                <p className={`mt-4 text-sm leading-relaxed ${i === 1 ? "text-white/95" : "text-slate-700"}`}>
                  {t.quote}
                </p>
                <div className={`mt-6 flex items-center gap-3 border-t pt-5 ${i === 1 ? "border-white/20" : "border-slate-200"}`}>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${i === 1 ? "bg-white/20 text-white" : "bg-orange-500 text-white"}`}>
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
      <section className="bg-slate-950 py-20">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-8 px-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
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
              <button className="inline-flex h-12 items-center gap-2 rounded-md bg-orange-500 px-7 text-sm font-bold text-white transition-colors hover:bg-orange-600">
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <a href="tel:+919876543210">
              <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white/30 bg-transparent px-7 text-sm font-bold text-white transition-colors hover:bg-white/10">
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
