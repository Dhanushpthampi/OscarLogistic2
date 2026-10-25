"use client";

import {
  ArrowRightIcon,
  PhoneIcon,
  TruckIcon,
  MapPinIcon,
  ShieldCheckIcon,
  BoltIcon,
  SignalIcon,
  ClockIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

const TRUST_BADGES = [
  { Icon: TruckIcon, label: "Direct Express" },
  { Icon: ClockIcon, label: "60-min Dispatch" },
  { Icon: ShieldCheckIcon, label: "Monsoon Safe" },
  { Icon: BanknotesIcon, label: "Zero Hidden Fees" },
];

export default function HeroSection({ content }) {
  const hero = content?.hero || {
    eyebrow: "Kerala's Modern Freight Network",
    headline: "Logistics That Move",
    headlineHighlight: "Kerala Forward.",
    description:
      "Direct commercial goods transport, FTL, PTL & express cargo across all 14 districts of Kerala. On time, every time.",
  };

  const company = content?.company || {
    phonePrimary: "+918590411061",
    whatsappNumber: "918590411061",
    activeTrucks: "25+",
  };

  const stats = [
    { value: "25+", label: "Trucks Active" },
    { value: "14", label: "Districts" },
    { value: "99%", label: "On-Time" },
    { value: "5 yrs", label: "Experience" },
  ];

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16 bg-white"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-100 pointer-events-none" />

      {/* Warm gradient blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-orange-100 via-amber-50 to-transparent rounded-full blur-[120px] pointer-events-none animate-glow" />
      <div className="absolute -top-20 right-0 w-[400px] h-[400px] bg-orange-50 rounded-full blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid gap-16 lg:grid-cols-2 items-center">

          {/* ── Left Column ── */}
          <div className="space-y-8">
            {/* Headline */}
            <div className="space-y-2 animate-fade-up delay-100">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.0]">
                {hero.headline}{" "}
                <span className="text-gradient">{hero.headlineHighlight}</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg animate-fade-up delay-200">
              {hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up delay-300">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/30 transition-all hover:scale-105 hover:shadow-orange-500/50"
              >
                Get Instant Quote
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href={`tel:${company.phonePrimary}`}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-sm transition-all hover:scale-105 hover:border-orange-300"
              >
                <PhoneIcon className="h-4 w-4 text-orange-500" />
                Call Dispatch
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 animate-fade-up delay-400">
              {TRUST_BADGES.map((b) => (
                <span key={b.label} className="badge badge-slate text-xs">
                  <b.Icon className="h-3.5 w-3.5 text-slate-500" />
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right Column: Visual HUD Card ── */}
          <div className="relative animate-slide-right delay-200">
            {/* Floating decorative ring */}
            <div className="absolute -inset-8 rounded-3xl border border-dashed border-orange-200/60 animate-spin-slow pointer-events-none" />

            <div className="relative bg-white rounded-3xl shadow-2xl shadow-slate-200/80 border border-slate-100 p-6 space-y-5 animate-float">
              {/* Beam shimmer */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute top-0 left-0 h-[2px] w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-beam" />
              </div>

              {/* Top badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Corridor Transit</span>
                <span className="text-[10px] text-slate-400 font-mono">KL-07-TR-4110</span>
              </div>

              {/* Route visualization */}
              <div className="bg-gradient-to-br from-slate-50 to-orange-50/30 rounded-2xl p-5 border border-slate-100">
                <div className="flex items-center justify-between text-sm font-bold text-slate-800 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                      <MapPinIcon className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-normal">Origin</p>
                      <p>Kochi Hub</p>
                    </div>
                  </div>
                  <div className="flex-1 mx-4 relative">
                    <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-1 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full w-3/5 relative">
                        <div className="absolute right-0 -top-1 w-2 h-2 bg-orange-500 rounded-full shadow-lg shadow-orange-400/50" />
                      </div>
                    </div>
                    <div className="absolute -top-5 left-3/5 -translate-x-1/2">
                      <TruckIcon className="h-4 w-4 text-orange-500 animate-truck" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-orange-100 flex items-center justify-center">
                      <MapPinIcon className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-normal">Destination</p>
                      <p>Kozhikode</p>
                    </div>
                  </div>
                </div>

                {/* Telemetry readouts */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-200/80">
                  {[
                    { label: "Speed", value: "54 km/h", color: "text-slate-900" },
                    { label: "Distance", value: "180 km", color: "text-slate-900" },
                    { label: "ETA", value: "1h 15m", color: "text-emerald-600" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-[10px] text-slate-400 font-mono uppercase">{item.label}</p>
                      <p className={`text-sm font-bold font-mono ${item.color}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <p className="text-lg font-black text-orange-600">{s.value}</p>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wide">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Trust row */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="h-4 w-4 text-emerald-500" />
                  Zero Damage Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <BoltIcon className="h-4 w-4 text-orange-500" />
                  Express Corridors
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-20 flex justify-center">
          <a
            href="#services"
            className="flex flex-col items-center gap-2 text-xs text-slate-400 hover:text-orange-500 transition group"
          >
            <span>Explore Services</span>
            <div className="w-5 h-8 rounded-full border-2 border-slate-300 group-hover:border-orange-400 flex justify-center pt-1.5 transition">
              <div className="w-1 h-1.5 bg-slate-400 group-hover:bg-orange-500 rounded-full animate-bounce transition" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
