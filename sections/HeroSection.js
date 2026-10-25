import {
  ArrowRightIcon,
  CheckCircleIcon,
  PhoneIcon,
  TruckIcon,
  MapPinIcon,
  ShieldCheckIcon,
  SignalIcon,
} from "@heroicons/react/24/solid";

export default function HeroSection({ content }) {
  const hero = content?.hero || {
    eyebrow: "Kerala's Trusted Freight Network",
    headline: "Reliable Logistics That Keep",
    headlineHighlight: "Kerala Moving Fast.",
    description:
      "From express parcel delivery to dedicated full truckloads, Oscar Logistics delivers precision, GPS-tracked freight handling across all 14 districts of Kerala—on time, every time.",
    bannerPill: "⚡ 24×7 Operations • Live GPS Tracking • 100% Safe Handling",
    activeCorridorText: "Kochi ➔ Kozhikode ➔ Trivandrum Express Corridors Active",
    ctaQuoteText: "Calculate Rate & Book",
    ctaCallText: "Call Dispatch Desk",
  };

  const company = content?.company || {
    phonePrimary: "+918590411061",
    activeTrucks: "25+",
    citiesCovered: "14 Districts",
  };

  return (
    <section id="top" className="relative overflow-hidden bg-navy-900 text-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Background glow effects & pattern */}
      <div className="absolute inset-0 bg-navy-pattern opacity-95 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Hero Content (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-slate-700/80 text-xs font-bold text-amber-400 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{hero.bannerPill}</span>
            </div>

            {/* Main Headline */}
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-500 mb-2">
                {hero.eyebrow}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
                {hero.headline} <span className="text-orange-500 underline decoration-orange-500/30">{hero.headlineHighlight}</span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-300">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:items-center">
              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-black text-sm bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-950/40 transition transform hover:-translate-y-0.5"
              >
                <span>{hero.ctaQuoteText}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </a>

              <a
                href={`tel:${company.phonePrimary}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-extrabold text-sm border-2 border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 text-white transition transform hover:-translate-y-0.5"
              >
                <PhoneIcon className="h-4 w-4 text-orange-400" />
                <span>{hero.ctaCallText}: {company.phonePrimary}</span>
              </a>
            </div>

            {/* Trust checkmarks */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-300 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>100% Kerala Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Live GPS Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Monsoon Protected</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card (5 cols) - Telematics / Live Radar Simulator */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card Container */}
              <div className="rounded-3xl border border-slate-700/80 bg-slate-950/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-xs font-bold tracking-wider text-emerald-400 uppercase">
                      Dispatch Telematics Active
                    </span>
                  </div>
                  <SignalIcon className="h-4 w-4 text-slate-400" />
                </div>

                {/* Live Route Milestone */}
                <div className="mt-5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-400">VEHICLE #KL-07-CD-4110</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black bg-orange-500/20 text-orange-400 uppercase">
                      On Transit
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm font-bold text-white pt-1">
                    <div className="flex items-center gap-1.5">
                      <MapPinIcon className="h-4 w-4 text-emerald-400" />
                      <span>Kochi Hub</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                      <span className="h-0.5 w-6 bg-orange-500"></span>
                      <TruckIcon className="h-4 w-4 text-orange-500 animate-bounce" />
                      <span className="h-0.5 w-6 bg-slate-700"></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPinIcon className="h-4 w-4 text-amber-400" />
                      <span>Kozhikode</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-600 to-amber-400 h-2 rounded-full w-2/3"></div>
                  </div>

                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Speed: 52 km/h</span>
                    <span>Remaining: 58 km</span>
                    <span className="text-emerald-400 font-bold">ETA: 1h 10m</span>
                  </div>
                </div>

                {/* Fleet Overview Metrics */}
                <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <span className="block text-xl font-black text-white">{company.activeTrucks}</span>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 mt-0.5">Active Fleet</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <span className="block text-xl font-black text-orange-400">100%</span>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 mt-0.5">GPS Linked</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <span className="block text-xl font-black text-amber-400">14/14</span>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 mt-0.5">Districts</span>
                  </div>
                </div>

                {/* Quick corridor marquee note */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-slate-400">
                  <ShieldCheckIcon className="h-4 w-4 text-orange-500 shrink-0" />
                  <span className="truncate">{hero.activeCorridorText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
