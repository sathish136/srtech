import { Link } from "wouter";
import {
  ArrowRight,
  Camera,
  Video,
  Fingerprint,
  ScanFace,
  Siren,
  Flame,
  RadioTower,
  Antenna,
  DoorOpen,
  Lock,
  Bell,
  Cpu,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";

const categories = [
  {
    title: "CCTV Cameras",
    description: "IP, analog HD, PTZ, 4K and panoramic cameras",
    icon: Camera,
    color: "from-sky-500 to-sky-600",
    items: ["IP Bullet & Dome", "PTZ Cameras", "4K Panoramic", "Thermal Cameras"],
  },
  {
    title: "Recorders & Storage",
    description: "NVRs, hybrid DVRs and enterprise NAS",
    icon: Video,
    color: "from-indigo-500 to-indigo-600",
    items: ["4 / 8 / 16 / 32 ch NVR", "Hybrid DVR", "Enterprise NAS", "Cloud Backup"],
  },
  {
    title: "Biometric Devices",
    description: "Fingerprint and face recognition readers",
    icon: Fingerprint,
    color: "from-violet-500 to-violet-600",
    items: ["Fingerprint Readers", "Multi-modal Devices", "RFID Card Readers", "Mobile Credentials"],
  },
  {
    title: "Face Recognition",
    description: "AI-powered face recognition terminals",
    icon: ScanFace,
    color: "from-fuchsia-500 to-fuchsia-600",
    items: ["Wall-mount Terminals", "Mask Detection", "Temperature Detection", "Cloud Enrollment"],
  },
  {
    title: "Access Control",
    description: "Door controllers, locks and accessories",
    icon: DoorOpen,
    color: "from-emerald-500 to-emerald-600",
    items: ["Door Controllers", "EM Locks", "Push Buttons", "Turnstiles"],
  },
  {
    title: "Locks & Hardware",
    description: "Smart locks for offices and homes",
    icon: Lock,
    color: "from-teal-500 to-teal-600",
    items: ["Smart Door Locks", "Hotel Locks", "Padlocks", "Cabinet Locks"],
  },
  {
    title: "Fire Alarm Systems",
    description: "Detectors, panels and notification",
    icon: Flame,
    color: "from-rose-500 to-rose-600",
    items: ["Smoke / Heat Detectors", "Addressable Panels", "MCP & Sounders", "Gas Detectors"],
  },
  {
    title: "Intrusion Alarms",
    description: "Burglar panels and sensors",
    icon: Siren,
    color: "from-orange-500 to-orange-600",
    items: ["Wired / Wireless Panels", "PIR Sensors", "Glass-break Sensors", "Panic Buttons"],
  },
  {
    title: "RF Towers",
    description: "Self-supporting and guyed towers",
    icon: RadioTower,
    color: "from-amber-500 to-amber-600",
    items: ["Self-supporting Towers", "Guyed Towers", "Roof-top Towers", "Pole Mounts"],
  },
  {
    title: "Antennas & Feeders",
    description: "RF antennas, cables and connectors",
    icon: Antenna,
    color: "from-yellow-500 to-yellow-600",
    items: ["Sector Antennas", "Omni Antennas", "Coaxial Feeders", "Connectors"],
  },
  {
    title: "Public Address",
    description: "PA systems for buildings and campuses",
    icon: Bell,
    color: "from-cyan-500 to-cyan-600",
    items: ["PA Amplifiers", "Ceiling Speakers", "Horn Speakers", "Microphones"],
  },
  {
    title: "Networking",
    description: "Switches, PoE and structured cabling",
    icon: Cpu,
    color: "from-slate-600 to-slate-700",
    items: ["PoE Switches", "Routers", "Cat6 Cabling", "Fiber Backbone"],
  },
];

export default function MarketingProducts() {
  return (
    <MarketingLayout>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(31,169,230,0.25),transparent_60%)]" />
        <div className="relative mx-auto w-full max-w-screen-2xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Our Products</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            A complete catalog of security & telecom equipment
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            We supply, install and service products from every major brand —
            picked for reliability, parts availability and long product
            lifecycle.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Browse Categories</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              12 specialised product lines
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((c) => (
              <div
                key={c.title}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl"
                data-testid={`card-product-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${c.color}`}>
                  <c.icon className="h-14 w-14 text-white/90" strokeWidth={1.5} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{c.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-xs text-slate-600">
                        <span className="h-1 w-1 rounded-full bg-primary" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
            <h3 className="text-2xl font-bold text-slate-900">
              Looking for a specific brand or model?
            </h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
              We are authorised dealers for major OEMs including Hikvision,
              Dahua, CP Plus, Honeywell, Bosch, ZKTeco, eSSL and more. Tell
              us your requirement and we will ship across India.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact">
                <button className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                  Request Product Quote
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <a href="tel:+919876543210">
                <button className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-slate-300 bg-white px-6 text-sm font-bold text-slate-900 transition-colors hover:bg-slate-100">
                  Call +91 98765 43210
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
