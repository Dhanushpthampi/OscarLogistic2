import {
  TruckIcon,
  ArchiveBoxIcon,
  BoltIcon,
  BuildingStorefrontIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

export default function ServicesSection({ content }) {
  const services = content?.services || [
    {
      id: "ftl",
      title: "Full Truck Load (FTL)",
      badge: "Popular for B2B",
      shortDesc: "Dedicated exclusive vehicles for bulk cargo, corporate supply chain, and point-to-point shipments.",
      features: [
        "Exclusive vehicle assigned strictly to your cargo",
        "Direct point-to-point transport with zero transshipment",
        "Live satellite GPS link shared with client",
        "Customized multi-stop distribution available",
      ],
    },
    {
      id: "ptl",
      title: "Part Truck Load (PTL)",
      badge: "Cost Efficient",
      shortDesc: "Economical shared freight for small-to-mid sized shipments across Kerala with consolidated routes.",
      features: [
        "Pay strictly for the weight and volume you consume",
        "Daily scheduled departures across all major hubs",
        "Barcoded carton tracking and proof of delivery",
        "Ideal for distributors, e-commerce, and manufacturers",
      ],
    },
    {
      id: "express",
      title: "Express Cargo & Same-Day",
      badge: "High Priority",
      shortDesc: "Urgent, time-critical transportation for perishable items, spare parts, and urgent business stock.",
      features: [
        "Same-day delivery across adjacent Kerala districts",
        "Priority dispatch within 60 minutes of booking",
        "Dedicated dispatch coordinator assigned",
        "Doorstep pickup & direct handoff",
      ],
    },
    {
      id: "warehouse",
      title: "Warehousing & Hub Storage",
      badge: "Safe Storage",
      shortDesc: "Secure short-term transit storage and cross-docking facilities located along primary Kerala highway routes.",
      features: [
        "CCTV-monitored fire-safe storage spaces",
        "Quick loading, palletizing, and transshipment handling",
        "Inventory reconciliation and packing services",
        "Flexible daily, weekly, and monthly storage options",
      ],
    },
  ];

  const company = content?.company || { whatsappNumber: "918590411061" };

  const getServiceIcon = (id) => {
    switch (id) {
      case "ftl":
        return <TruckIcon className="h-7 w-7 text-orange-600" />;
      case "ptl":
        return <ArchiveBoxIcon className="h-7 w-7 text-orange-600" />;
      case "express":
        return <BoltIcon className="h-7 w-7 text-orange-600" />;
      case "warehouse":
        return <BuildingStorefrontIcon className="h-7 w-7 text-orange-600" />;
      default:
        return <TruckIcon className="h-7 w-7 text-orange-600" />;
    }
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
            Tailored Logistics Capabilities
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
            One Dependable Partner for <span className="text-orange-600">Every Consignment</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether you need a dedicated 3-ton truck or space for a single carton, our flexible transport framework is built around speed, care, and transparent pricing.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {services.map((srv) => {
            const whatsappMsg = encodeURIComponent(
              `Hello Oscar Logistics! I would like to inquire about your ${srv.title} service in Kerala.`
            );
            return (
              <div
                key={srv.id || srv.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-14 w-14 rounded-2xl bg-orange-50 group-hover:bg-orange-600 flex items-center justify-center transition-colors duration-300">
                      <div className="group-hover:text-white transition-colors duration-300">
                        {getServiceIcon(srv.id)}
                      </div>
                    </div>
                    {srv.badge && (
                      <span className="px-2.5 py-1 text-[11px] font-black uppercase tracking-wider rounded-full bg-slate-100 text-navy-900 border border-slate-200">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black text-navy-900 tracking-tight group-hover:text-orange-600 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.shortDesc}
                  </p>

                  {/* Feature Bullets */}
                  {srv.features && (
                    <ul className="mt-5 space-y-2 pt-4 border-t border-slate-100 text-xs text-slate-700">
                      {srv.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircleIcon className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${company.whatsappNumber}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-black text-orange-600 hover:text-orange-700 uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                  >
                    <span>Enquire This Service</span>
                    <ArrowRightIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
