"use client";

import { useState } from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

export default function ContactSection({ content }) {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [cargo, setCargo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const company = content?.company || {
    phonePrimary: "+918590411061",
    phoneSecondary: "+919847789998",
    email: "oscarlogisticspvr@gmail.com",
    address: "Oscar Logistics Hub, NH 66 Bypass, Kerala, India",
    operatingHours: "24×7 Dispatch & Support (Mon-Sun)",
    whatsappNumber: "918590411061",
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Oscar Logistics! New Freight Inquiry:\n• Customer: ${name || "Business Shipper"}\n• Phone: ${phone || "Not specified"}\n• Pickup: ${pickup || "Kerala"}\n• Drop: ${drop || "Kerala"}\n• Cargo/Weight: ${cargo || "General Cargo"}\nPlease share rate & availability.`
    );
    window.open(`https://wa.me/${company.whatsappNumber}?text=${msg}`, "_blank");
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-pattern opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          {/* Left Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">
                24×7 Operations Desk
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white tracking-tight">
                Ready to Move Your <span className="text-orange-500">Business Forward?</span>
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Connect directly with our logistics dispatch coordinator for urgent vehicle placements, contract logistics, and personalized quotes.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <a
                href={`tel:${company.phonePrimary}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-orange-500/50 hover:bg-slate-800 transition duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-slate-400">Primary Dispatch</span>
                  <span className="block text-base font-black text-white">{company.phonePrimary}</span>
                </div>
              </a>

              <a
                href={`tel:${company.phoneSecondary}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-orange-500/50 hover:bg-slate-800 transition duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-700/50 text-slate-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-slate-400">Secondary Coordinator</span>
                  <span className="block text-base font-black text-white">{company.phoneSecondary}</span>
                </div>
              </a>

              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-orange-500/50 hover:bg-slate-800 transition duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-700/50 text-slate-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <EnvelopeIcon className="h-6 w-6" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase font-bold text-slate-400">Official Email</span>
                  <span className="block text-sm font-black text-white break-all">{company.email}</span>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300">
                <ClockIcon className="h-5 w-5 text-amber-400 shrink-0" />
                <span>{company.operatingHours}</span>
              </div>
            </div>
          </div>

          {/* Right Direct Quote Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-700 bg-slate-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <h3 className="text-xl font-black text-white">Instant Transport Quotation Form</h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill details below to send an instant pre-formatted booking request to our dispatch manager.
              </p>

              <form onSubmit={handleWhatsAppSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Your Name / Company
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul / ABC Traders"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Pickup Location
                    </label>
                    <input
                      type="text"
                      required
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="e.g. Edappally, Kochi"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Delivery Destination
                    </label>
                    <input
                      type="text"
                      required
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                      placeholder="e.g. Palayam, Kozhikode"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Cargo Details &amp; Weight (Tons / Cartons)
                  </label>
                  <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="e.g. 1.2 Tons electrical equipment / 40 cartons"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-black text-sm bg-orange-600 hover:bg-orange-500 text-white shadow-xl transition transform hover:-translate-y-0.5"
                  >
                    <ChatBubbleLeftRightIcon className="h-5 w-5" />
                    <span>Send Quote Request on WhatsApp</span>
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2">
                    Instant response • Dispatch team confirms within 10 minutes
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
