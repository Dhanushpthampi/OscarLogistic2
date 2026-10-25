"use client";

import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";

export default function ContactSection({ content }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [cargo, setCargo] = useState("");

  const company = content?.company || {
    phonePrimary: "+918590411061",
    phoneSecondary: "+919847789998",
    email: "oscarlogisticspvr@gmail.com",
    address: "Oscar Logistics Hub, NH 66 Bypass, Kerala, India",
    operatingHours: "24×7 Dispatch & Support",
    whatsappNumber: "918590411061",
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Oscar Logistics! New Freight Inquiry:\n• Pickup: ${pickup || "Kerala"}\n• Drop: ${drop || "Kerala"}\n• Cargo/Weight: ${cargo || "General Cargo"}\nPlease share quote & vehicle availability.`
    );
    window.open(`https://wa.me/${company.whatsappNumber}?text=${msg}`, "_blank");
  };

  const GUARANTEES = [
    "Direct transit updates via WhatsApp",
    "Response within 15 minutes",
    "Upfront transparent pricing",
    "60-min pickup in major cities",
  ];

  return (
    <section id="contact" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="eyebrow mb-3">24×7 Dispatch</p>
          <h2 className="section-title">
            Let&apos;s Get Your{" "}
            <span className="text-gradient">Cargo Moving</span>
          </h2>
          <p className="section-subtitle mt-4">
            Fill in your route below and we&apos;ll respond instantly on WhatsApp with a quote and vehicle availability.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* ── Left: Contact Info Panel ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Dark info card */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">
                  Contact Information
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our dispatch desk operates around the clock. Reach us by phone, WhatsApp, or email.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`tel:${company.phonePrimary}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition">
                    <PhoneIcon className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Primary</p>
                    <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition">
                      {company.phonePrimary}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${company.phoneSecondary}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition">
                    <PhoneIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Secondary</p>
                    <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition">
                      {company.phoneSecondary}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-3 group"
                >
                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition">
                    <EnvelopeIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Email</p>
                    <p className="text-xs font-semibold text-white group-hover:text-orange-400 transition break-all">
                      {company.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <MapPinIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Location</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{company.address}</p>
                  </div>
                </div>
              </div>

              {/* Live hours badge */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <ClockIcon className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-400">{company.operatingHours}</span>
              </div>
            </div>

            {/* Guarantees card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
                Our Commitments
              </p>
              <ul className="space-y-3">
                {GUARANTEES.map((g) => (
                  <li key={g} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckCircleIcon className="h-4 w-4 text-emerald-500 shrink-0" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: Quote Form ── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
              <div className="mb-7">
                <h3 className="text-xl font-bold text-slate-900">Get an Instant WhatsApp Quote</h3>
                <p className="text-sm text-slate-500 mt-1">
                  Takes 30 seconds. We respond within minutes with pricing and availability.
                </p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="e.g. Edappally, Kochi"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-orange-400 focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                      Destination
                    </label>
                    <input
                      type="text"
                      required
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      placeholder="e.g. Palayam, Kozhikode"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-orange-400 focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">
                    Cargo Details / Weight
                  </label>
                  <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="e.g. 1.2 Ton retail boxes, 50 cartons, furniture"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-orange-400 focus:bg-white transition"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100 pt-2" />

                {/* Quick call option */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-5 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
                  >
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    Send on WhatsApp
                  </button>
                  <a
                    href={`tel:${company.phonePrimary}`}
                    className="flex items-center justify-center gap-2 py-4 px-5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all hover:scale-[1.02]"
                  >
                    <PhoneIcon className="h-4 w-4" />
                    Call Now
                  </a>
                </div>

                <p className="text-xs text-slate-400 text-center">
                  Opens WhatsApp with your details pre-filled — no apps or sign-up needed.
                </p>
              </form>
            </div>

            {/* Map-style decorative strip */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-20 bg-gradient-to-r from-slate-100 via-orange-50 to-slate-100 flex items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <MapPinIcon className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Serving all 14 districts of Kerala</span>
                <ArrowRightIcon className="h-4 w-4 text-slate-400" />
                <a href="#coverage" className="text-orange-600 font-bold hover:underline text-xs">
                  View coverage map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
