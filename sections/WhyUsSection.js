import {
  MapPinIcon,
  UserGroupIcon,
  BanknotesIcon,
  BoltIcon,
  ShieldCheckIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";

const ICONS = {
  direct: MapPinIcon,
  drivers: UserGroupIcon,
  pricing: BanknotesIcon,
  speed: BoltIcon,
  support: PhoneArrowUpRightIcon,
  safety: ShieldCheckIcon,
};

const BG_COLORS = [
  "from-blue-50 to-blue-100/50",
  "from-violet-50 to-violet-100/50",
  "from-emerald-50 to-emerald-100/50",
  "from-orange-50 to-orange-100/50",
  "from-rose-50 to-rose-100/50",
  "from-cyan-50 to-cyan-100/50",
];

const ICON_COLORS = [
  "text-blue-600",
  "text-violet-600",
  "text-emerald-600",
  "text-orange-600",
  "text-rose-600",
  "text-cyan-600",
];

export default function WhyUsSection({ content }) {
  const reasons = content?.whyUs || [
    {
      id: "direct",
      title: "Direct Point-to-Point Transit",
      description: "Direct non-stop transit between pickup and destination with zero intermediate warehouse delays.",
      stat: "Direct Transit",
    },
    {
      id: "drivers",
      title: "Vetted Professional Drivers",
      description: "Background-verified drivers trained in safe cargo handling and Kerala ghat routes.",
      stat: "5+ Yrs Exp",
    },
    {
      id: "pricing",
      title: "Transparent Pricing",
      description: "Upfront kilometer-based pricing with zero hidden toll surcharges or surprise fees.",
      stat: "Zero Hidden Fees",
    },
    {
      id: "speed",
      title: "Express Corridors",
      description: "Optimized highway routing across NH 66 ensuring fast turnaround on all major routes.",
      stat: "Fast Transit",
    },
    {
      id: "support",
      title: "24×7 Dispatch Support",
      description: "Direct logistics coordinator support in Malayalam, English, and Hindi. Always available.",
      stat: "Always Active",
    },
    {
      id: "safety",
      title: "Monsoon Protection",
      description: "Heavy waterproof tarpaulins and lashing belts to protect cargo during monsoon rains.",
      stat: "100% Safe",
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="eyebrow mb-3">Trust & Precision</p>
          <h2 className="section-title">
            Built for Dependable{" "}
            <span className="text-gradient">Supply Chains</span>
          </h2>
          <p className="section-subtitle mt-4">
            Every pillar of our operations is designed to give you peace of mind.
          </p>
        </div>

        {/* 3-col grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, idx) => {
            const Icon = ICONS[item.id] || ShieldCheckIcon;
            const bg = BG_COLORS[idx % BG_COLORS.length];
            const iconColor = ICON_COLORS[idx % ICON_COLORS.length];

            return (
              <div
                key={item.id || item.title}
                className="group bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-slate-200 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${iconColor}`} />
                  </div>
                  <span className="badge badge-orange text-[10px]">{item.stat}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
