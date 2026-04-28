import { Link } from "wouter";
import {
  ArrowRight,
  Camera,
  Fingerprint,
  Flame,
  RadioTower,
  ShieldCheck,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";

const services = [
  {
    icon: Camera,
    title: "CCTV Surveillance",
    tagline: "From single shop to multi-site campuses",
    description:
      "End-to-end design and deployment of HD/4K IP-based surveillance systems with central NVR, video analytics and remote viewing.",
    features: [
      "Site survey & camera placement design",
      "HD / 4K bullet, dome, PTZ & panoramic cameras",
      "Centralised NVR / hybrid DVR setup",
      "Cloud backup & remote mobile viewing",
      "Video analytics — line-cross, intrusion, ANPR",
    ],
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Fingerprint,
    title: "Biometric Access Control",
    tagline: "Modern, secure entry management",
    description:
      "Fingerprint, face recognition and RFID access systems integrated with door controllers, attendance and visitor management.",
    features: [
      "Multi-modal biometric readers",
      "Door controllers & electromagnetic locks",
      "Time-attendance integration",
      "Visitor & contractor management module",
      "Anti-passback & multi-zone access rules",
    ],
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Flame,
    title: "Fire Detection & Alarm",
    tagline: "Code-compliant life safety",
    description:
      "Conventional and addressable fire alarm systems with smoke, heat and gas detection — designed to local fire safety norms.",
    features: [
      "Smoke, heat & multi-criteria detectors",
      "Addressable fire panels & repeaters",
      "Gas leak (LPG / CO) detection",
      "Public address & voice evacuation",
      "Annual fire safety compliance reporting",
    ],
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: RadioTower,
    title: "RF Tower Installation",
    tagline: "Telecom & broadcast infrastructure",
    description:
      "End-to-end RF tower erection, antenna alignment and structural certification for telecom and broadcast operators.",
    features: [
      "Self-supporting & guyed towers",
      "Antenna mounting & RF alignment",
      "Lightning protection & earthing",
      "Tower painting & galvanizing",
      "Periodic structural inspections",
    ],
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: ShieldCheck,
    title: "Intrusion & Perimeter",
    tagline: "Layered physical security",
    description:
      "Burglar alarms, perimeter sensors, panic buttons and integrated SOS systems for sensitive sites and high-value premises.",
    features: [
      "Wired & wireless intrusion panels",
      "Outdoor PIR & beam barriers",
      "Glass break and vibration sensors",
      "SOS & panic button integration",
      "24×7 monitored alarm response",
    ],
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Wrench,
    title: "AMC & Field Maintenance",
    tagline: "We stand behind every installation",
    description:
      "Comprehensive and non-comprehensive Annual Maintenance Contracts with on-site preventive servicing and breakdown response.",
    features: [
      "Quarterly preventive maintenance visits",
      "Same-day breakdown response in city",
      "Stocked spare-parts inventory",
      "Service ticket portal access",
      "Quarterly health & uptime reports",
    ],
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function MarketingServices() {
  return (
    <MarketingLayout>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(31,169,230,0.25),transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-screen-2xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Services</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            Full-stack security & infrastructure services
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            One accountable partner across surveillance, access control, fire
            safety, telecom infrastructure and lifetime maintenance.
          </p>
        </div>
      </section>

      {/* SERVICE LIST */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-screen-2xl space-y-10 px-6">
          {services.map((s, idx) => (
            <div
              key={s.title}
              className={`grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2 md:p-12 ${
                idx % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div>
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${s.color}`}>
                  <s.icon className="h-8 w-8" />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  {s.tagline}
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  {s.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  {s.description}
                </p>
                <Link href="/contact">
                  <button className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                    Discuss Your Requirement
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
              <div className="rounded-2xl bg-slate-50 p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">What's included</p>
                <ul className="mt-4 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 rounded-3xl bg-gradient-to-br from-primary to-sky-600 px-8 py-12 text-center text-white shadow-xl">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Need a customised solution?
          </h2>
          <p className="max-w-2xl text-base text-white/90">
            Tell us about your site, scale and security goals — our solution
            architects will design a system that fits your budget and risk
            profile.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact">
              <button className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-sm font-bold text-primary shadow-lg transition-colors hover:bg-slate-100">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/portal">
              <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white/40 bg-white/5 px-6 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10">
                Existing Customer? Open Portal
              </button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
