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

const BASE = import.meta.env.BASE_URL;

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
    image: `${BASE}images/hero-camera.jpg`,
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
    image: `${BASE}images/biometric.jpg`,
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
    image: `${BASE}images/fire-alarm.jpg`,
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
    image: `${BASE}images/rf-tower.jpg`,
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
    image: `${BASE}images/control-room.jpg`,
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
    image: `${BASE}images/engineer.jpg`,
  },
];

export default function MarketingServices() {
  return (
    <MarketingLayout>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 opacity-25">
          <img src={`${BASE}images/control-room.jpg`} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
        </div>
        <div className="relative mx-auto w-full max-w-screen-2xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our Services</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight md:text-6xl">
            Full-stack security & infrastructure services
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            One accountable partner across surveillance, access control, fire
            safety, telecom infrastructure and lifetime maintenance.
          </p>
        </div>
      </section>

      {/* SERVICE LIST — alternating image rows */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-screen-2xl space-y-24 px-6">
          {services.map((s, idx) => {
            const reversed = idx % 2 === 1;
            return (
              <div
                key={s.title}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16`}
              >
                <div className={`relative ${reversed ? "md:order-2" : ""}`}>
                  <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-sky-300/10 blur-2xl" />
                  <img
                    src={s.image}
                    alt={s.title}
                    className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
                  />
                  <div className={`absolute ${reversed ? "-right-6" : "-left-6"} -bottom-6 hidden h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-600 text-white shadow-2xl md:flex`}>
                    <s.icon className="h-11 w-11" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                    {s.tagline}
                  </p>
                  <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">
                    {s.title}
                  </h2>
                  <p className="mt-5 text-base leading-relaxed text-slate-600">
                    {s.description}
                  </p>

                  <ul className="mt-7 space-y-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact">
                    <button className="mt-7 inline-flex h-12 items-center gap-2 rounded-md bg-gradient-to-r from-primary to-sky-600 px-6 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:scale-[1.02]">
                      Discuss Your Requirement
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-5 rounded-3xl bg-gradient-to-br from-primary to-sky-600 px-8 py-14 text-center text-white shadow-2xl shadow-primary/30">
          <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Need a customised solution?
          </h2>
          <p className="max-w-2xl text-base text-white/90">
            Tell us about your site, scale and security goals — our solution
            architects will design a system that fits your budget and risk
            profile.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact">
              <button className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-7 text-sm font-bold text-primary shadow-lg transition-transform hover:scale-[1.02]">
                Request a Quote <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="/portal">
              <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-white/40 bg-white/5 px-7 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10">
                Existing Customer? Open Portal
              </button>
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
