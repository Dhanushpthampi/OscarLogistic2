import {
  MapPinIcon,
  UserGroupIcon,
  BanknotesIcon,
  BoltIcon,
  ShieldCheckIcon,
  PhoneArrowUpRightIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";

export default function WhyUsSection({ content }) {
  const reasons = content?.whyUs || [
    {
      id: "gps",
      title: "Real-Time GPS Tracking",
      description: "Every vehicle in our fleet is fitted with telematics hardware so you get exact real-time milestone updates.",
      stat: "100% Tracked",
    },
    {
      id: "drivers",
      title: "Certified Professional Drivers",
      description: "Background-verified, disciplined drivers trained in defensive driving, hill routes, and careful goods handling.",
      stat: "5+ Yrs Avg Exp",
    },
    {
      id: "pricing",
      title: "Transparent No-Surprise Pricing",
      description: "Clear tariff calculations based on actual weight, vehicle type, and mileage with zero hidden toll surprises.",
      stat: "Zero Hidden Fees",
    },
    {
      id: "speed",
      title: "Express Transit Corridors",
      description: "Optimized highway routing across NH 66 and MC Road ensures minimum transit hours between North and South Kerala.",
      stat: "Fast Turnaround",
    },
    {
      id: "support",
      title: "24×7 Local Dispatch Desk",
      description: "Speak with a dedicated logistics coordinator in Malayalam, English, or Hindi at any time of day or night.",
      stat: "Always On",
    },
    {
      id: "safety",
      title: "Cargo Safety & Weather Protection",
      description: "All open-body trucks are equipped with heavy industrial tarpaulins and lashing belts to protect during monsoon.",
      stat: "Zero Damage Goal",
    },
  ];

  const getPillarIcon = (id) => {
    switch (id) {
      case "gps":
        return <MapPinIcon className="h-6 w-6 text-orange-600" />;
      case "drivers":
        return <UserGroupIcon className="h-6 w-6 text-orange-600" />;
      case "pricing":
        return <BanknotesIcon className="h-6 w-6 text-orange-600" />;
      case "speed":
        return <BoltIcon className="h-6 w-6 text-orange-600" />;
      case "support":
        return <PhoneArrowUpRightIcon className="h-6 w-6 text-orange-600" />;
      case "safety":
        return <ShieldCheckIcon className="h-6 w-6 text-orange-600" />;
      default:
        return <CheckBadgeIcon className="h-6 w-6 text-orange-600" />;
    }
  };

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
            The Oscar Advantage
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
            Why Kerala&apos;s Top Businesses <span className="text-orange-600">Trust Oscar Logistics</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            From pickup to final delivery receipt, we treat your consignments with the same precision and urgency as you do.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item) => (
            <div
              key={item.id || item.title}
              className="p-6 sm:p-7 rounded-3xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-orange-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-orange-100/70 flex items-center justify-center">
                    {getPillarIcon(item.id)}
                  </div>
                  {item.stat && (
                    <span className="text-xs font-black text-orange-600 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full">
                      {item.stat}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-navy-900 tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <CheckBadgeIcon className="h-4 w-4 text-emerald-500" /> Verified Standard
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
