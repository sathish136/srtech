import { Link } from "wouter";
import {
  ArrowRight,
  Target,
  Eye,
  Heart,
  CheckCircle2,
  Award,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To deliver dependable security and surveillance solutions that protect people, property and businesses across South India.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "To be the most trusted technology partner for security infrastructure in the region — known for engineering quality and lifetime support.",
  },
  {
    icon: Heart,
    title: "Our Values",
    text: "Integrity, accountability and craft. We treat every project — large or small — with the same diligence and follow-through.",
  },
];

const milestones = [
  { year: "2008", title: "Founded in Hyderabad", text: "Started as a 3-person CCTV installation team serving local businesses." },
  { year: "2012", title: "Expanded to biometrics", text: "Became authorised partner for major biometric access control brands." },
  { year: "2016", title: "RF Tower division", text: "Launched specialised telecom & broadcast tower installation services." },
  { year: "2020", title: "100+ AMC clients", text: "Crossed 100 active annual maintenance contracts across 5 states." },
  { year: "2024", title: "Digital control room", text: "Built our integrated portal for service tickets, inventory and field ops." },
];

export default function MarketingAbout() {
  return (
    <MarketingLayout>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 opacity-30">
          <img src={`${import.meta.env.BASE_URL}images/office.jpg`} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/85 to-slate-950" />
        </div>
        <div className="relative mx-auto w-full max-w-screen-2xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">About Us</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight md:text-6xl">
            16+ years of building safer environments
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Sree Ram Technologies has grown from a small Hyderabad-based CCTV
            outfit into a full-service security and telecom infrastructure
            company — serving 350+ active clients today.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-white py-24">
        <div className="mx-auto grid w-full max-w-screen-2xl items-center gap-14 px-6 lg:grid-cols-2">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/20 to-sky-300/10 blur-2xl" />
            <img
              src={`${import.meta.env.BASE_URL}images/engineer.jpg`}
              alt="Engineer installing security equipment"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Our Story</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              From three engineers to a regional powerhouse
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                Founded in 2008 by a small group of telecom engineers, Sree
                Ram Technologies began with a simple promise: deliver
                dependable security systems and stand behind every
                installation.
              </p>
              <p>
                Today we operate across five states, run our own dedicated
                service teams and maintain in-house inventory of every major
                brand we install. Our customers stay with us because we treat
                support as seriously as the original sale.
              </p>
              <p>
                From small retail showrooms to multi-acre industrial
                facilities and government installations — we have designed,
                deployed and maintained security infrastructure for them
                all.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-gradient-to-br from-primary to-sky-600 p-6 text-white shadow-lg shadow-primary/25">
                <p className="text-4xl font-extrabold">1,200+</p>
                <p className="mt-1 text-sm font-medium text-white/90">Installations Completed</p>
              </div>
              <div className="rounded-2xl bg-slate-900 p-6 text-white shadow-lg">
                <p className="text-4xl font-extrabold">5</p>
                <p className="mt-1 text-sm font-medium text-slate-300">States Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">What Drives Us</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Mission, Vision & Values
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-[0_2px_20px_-8px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(31,169,230,0.35)]">
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-all group-hover:scale-150" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-sky-600 text-white shadow-lg shadow-primary/25">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="relative mt-5 text-xl font-bold text-slate-900">{v.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Journey</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              A timeline of milestones
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="relative space-y-8 border-l-2 border-primary/20 pl-8 md:pl-12">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <div className="absolute -left-[42px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary md:-left-[54px] md:h-8 md:w-8">
                    <div className="h-2 w-2 rounded-full bg-white md:h-3 md:w-3" />
                  </div>
                  <p className="text-sm font-bold text-primary">{m.year}</p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">{m.title}</h3>
                  <p className="mt-1 text-sm text-slate-600">{m.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-screen-2xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Why Choose Us</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Our differentiators
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Award, title: "Certified Engineers", text: "OEM-trained, ISO 9001 audited processes." },
              { icon: Users, title: "Dedicated Teams", text: "Named project leads from start to handover." },
              { icon: Briefcase, title: "End-to-end Services", text: "Survey · Supply · Install · AMC." },
              { icon: TrendingUp, title: "Proven Track Record", text: "1,200+ projects delivered on time." },
            ].map((d) => (
              <div key={d.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                  <d.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-900">{d.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{d.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm">
            {[
              "Same-day support response",
              "OEM authorised partner",
              "In-house spare parts stock",
              "GST registered & compliant",
            ].map((tag) => (
              <div key={tag} className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="font-medium">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              Want to see our work in action?
            </h2>
            <p className="mt-2 text-sm text-white/90">
              Tell us about your site — we will set up a free survey and walkthrough.
            </p>
          </div>
          <Link href="/contact">
            <button className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 text-sm font-bold text-primary shadow-lg transition-colors hover:bg-slate-100">
              Get in Touch <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </section>
    </MarketingLayout>
  );
}
