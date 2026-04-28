import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Link } from "wouter";

export default function MarketingContact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: "CCTV Surveillance",
    message: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MarketingLayout>
      {/* HEADER */}
      <section className="relative overflow-hidden bg-slate-950 py-24 text-white">
        <div className="absolute inset-0 opacity-25">
          <img src={`${import.meta.env.BASE_URL}images/engineer.jpg`} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-slate-950/75" />
        </div>
        <div className="relative mx-auto w-full max-w-screen-2xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Contact Us</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tight md:text-6xl">
            Talk to our security experts
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Get a free site survey, a tailored proposal and answers to your
            questions — usually within one business day.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-white py-20">
        <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-6 lg:grid-cols-3">
          {/* Info cards */}
          <div className="space-y-5 lg:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Head Office</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                No. 12, Avinashi Road,<br />
                Tirupur,<br />
                Tamil Nadu 641601, India
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Phone</h3>
              <ul className="mt-1 space-y-1 text-sm text-slate-600">
                <li><a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a> · Sales</li>
                <li><a href="tel:+919876543211" className="hover:text-primary">+91 98765 43211</a> · Service</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Email</h3>
              <ul className="mt-1 space-y-1 text-sm text-slate-600">
                <li><a href="mailto:info@sreeramtech.in" className="hover:text-primary">info@sreeramtech.in</a></li>
                <li><a href="mailto:service@sreeramtech.in" className="hover:text-primary">service@sreeramtech.in</a></li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Working Hours</h3>
              <ul className="mt-1 space-y-1 text-sm text-slate-600">
                <li>Mon – Sat · 9:00 AM – 7:00 PM</li>
                <li>Service desk · 24×7 (AMC clients)</li>
              </ul>
            </div>

            <Link href="/portal">
              <div className="cursor-pointer rounded-2xl bg-slate-900 p-6 text-white transition-colors hover:bg-slate-800">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Existing Customer?</p>
                <p className="mt-2 text-base font-bold">Open the Customer Portal</p>
                <p className="mt-1 text-xs text-slate-300">
                  Log tickets, view invoices, track AMC visits.
                </p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Open Portal <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">Thank you!</h3>
                  <p className="mt-2 max-w-md text-sm text-slate-600">
                    Your enquiry has been received. Our sales team will get
                    back to you within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", company: "", interest: "CCTV Surveillance", message: "" });
                    }}
                    className="mt-6 inline-flex h-10 items-center gap-2 rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-slate-900">Send us a message</h2>
                  <p className="mt-2 text-sm text-slate-600">
                    Tell us about your project — site type, scale and what you
                    are trying to achieve. We will follow up promptly.
                  </p>

                  <form onSubmit={onSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Full Name *</label>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Your name"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Company</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={onChange}
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Company name"
                        data-testid="input-company"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Email *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="you@company.com"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Phone *</label>
                      <input
                        required
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="+91 98765 43210"
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">I am interested in</label>
                      <select
                        name="interest"
                        value={form.interest}
                        onChange={onChange}
                        className="h-11 w-full rounded-md border border-slate-300 bg-white px-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        data-testid="select-interest"
                      >
                        <option>CCTV Surveillance</option>
                        <option>Biometric Access</option>
                        <option>Fire & Alarm Systems</option>
                        <option>RF Tower Installation</option>
                        <option>Intrusion Alarms</option>
                        <option>AMC / Maintenance</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Message *</label>
                      <textarea
                        required
                        name="message"
                        value={form.message}
                        onChange={onChange}
                        rows={5}
                        className="w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Tell us about your site, scale, and goals…"
                        data-testid="input-message"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <button
                        type="submit"
                        className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-7 text-sm font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                        data-testid="button-submit-contact"
                      >
                        <Send className="h-4 w-4" />
                        Send Message
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
