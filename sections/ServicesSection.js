import {
  TruckIcon,
  ArchiveBoxIcon,
  BoltIcon,
  BuildingStorefrontIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const ICON_MAP = {
  ftl: TruckIcon,
  ptl: ArchiveBoxIcon,
  express: BoltIcon,
  warehouse: BuildingStorefrontIcon,
};

const COLORS = {
  ftl: { bg: "bg-blue-50", icon: "text-blue-600", border: "hover:border-blue-300" },
  ptl: { bg: "bg-violet-50", icon: "text-violet-600", border: "hover:border-violet-300" },
  express: { bg: "bg-orange-50", icon: "text-orange-600", border: "hover:border-orange-300" },
  warehouse: { bg: "bg-emerald-50", icon: "text-emerald-600", border: "hover:border-emerald-300" },
};

export default function ServicesSection({ content }) {
  const services = content?.services || [
    {
      id: "ftl",
      title: "Full Truck Load (FTL)",
      badge: "Dedicated",
      shortDesc: "Exclusive vehicles for bulk cargo, corporate supply chains, and direct point-to-point transit across Kerala.",
    },
    {
      id: "ptl",
      title: "Part Truck Load (PTL)",
      badge: "Cost Efficient",
      shortDesc: "Economical shared freight for small-to-mid sized shipments with scheduled daily departures.",
    },
    {
      id: "express",
      title: "Express Same-Day",
      badge: "Priority",
      shortDesc: "Time-critical transportation for urgent business deliveries dispatched within 60 minutes.",
    },
    {
      id: "warehouse",
      title: "Warehousing & Cross-Dock",
      badge: "Secure Storage",
      shortDesc: "CCTV-secured transit storage and distribution facilities along primary highway corridors.",
    },
  ];

  const company = content?.company || { whatsappNumber: "918590411061" };

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern-sm opacity-60 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="eyebrow mb-3">Logistics Portfolio</p>
          <h2 className="section-title">
            Tailored Freight For{" "}
            <span className="text-gradient">Every Scale</span>
          </h2>
          <p className="section-subtitle mt-4">
            Whether you&apos;re shipping a few cartons or a full truckload, we have the right solution.
          </p>
        </div>

        {/* Bento-style Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((srv, idx) => {
            const color = COLORS[srv.id] || COLORS.ftl;
            const Icon = ICON_MAP[srv.id] || TruckIcon;
            const whatsappMsg = encodeURIComponent(
              `Hello Oscar Logistics! I'd like to inquire about your ${srv.title} service.`
            );

            return (
              <div
                key={srv.id || srv.title}
                className={`group relative p-7 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${color.border} cursor-default`}
              >
                {/* Number watermark */}
                <span className="absolute top-5 right-5 text-5xl font-black text-slate-50 select-none pointer-events-none">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className={`h-12 w-12 rounded-xl ${color.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-6 w-6 ${color.icon}`} />
                </div>

                {/* Badge */}
                {srv.badge && (
                  <span className="badge badge-slate text-[11px] mb-4 inline-flex">
                    {srv.badge}
                  </span>
                )}

                {/* Content */}
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {srv.shortDesc}
                </p>

                {/* CTA */}
                <a
                  href={`https://wa.me/${company.whatsappNumber}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 group-hover:gap-2.5 transition-all"
                >
                  Enquire Now
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
