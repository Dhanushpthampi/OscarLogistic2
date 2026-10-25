"use client";

import { useState } from "react";
import { TruckIcon, CheckBadgeIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function FleetSection({ content }) {
  const [selectedTag, setSelectedTag] = useState("all");

  const fleet = content?.fleet || [
    {
      id: "intra-82",
      size: "8.2 FT Deck",
      vehicle: "Tata Intra V30 / V50",
      payload: "1.0 - 1.2 Ton",
      volume: "180 cu.ft",
      ideal: "City retail distribution, fast FMCG delivery, parcel drop-offs",
      tag: "City Express",
    },
    {
      id: "intra-88",
      size: "8.8 FT Deck",
      vehicle: "Tata Intra Long Wheelbase",
      payload: "1.3 - 1.5 Ton",
      volume: "220 cu.ft",
      ideal: "General cargo, furniture, wholesale appliances & industrial boxes",
      tag: "Most Versatile",
    },
    {
      id: "dosth-92",
      size: "9.2 FT High-Deck",
      vehicle: "Ashok Leyland Dosth +",
      payload: "1.5 - 1.8 Ton",
      volume: "260 cu.ft",
      ideal: "High volume packages, textile cartons, consumer electronics",
      tag: "High Torque",
    },
    {
      id: "dosth-108",
      size: "10.8 FT Closed Container",
      vehicle: "Ashok Leyland Dosth Container",
      payload: "2.0 Ton",
      volume: "320 cu.ft",
      ideal: "Weather-sealed protection for FMCG, pharmaceuticals & e-commerce",
      tag: "Weatherproof",
    },
    {
      id: "tata-407",
      size: "12.0 FT Heavy Deck",
      vehicle: "Tata 407 Gold LCV",
      payload: "3.0 - 3.5 Ton",
      volume: "480 cu.ft",
      ideal: "Heavy machinery parts, construction hardware, agricultural loads",
      tag: "Heavy Hauler",
    },
  ];

  const company = content?.company || { whatsappNumber: "918590411061" };

  const tags = ["all", "City Express", "Most Versatile", "High Torque", "Weatherproof", "Heavy Hauler"];

  const filteredFleet =
    selectedTag === "all" ? fleet : fleet.filter((truck) => truck.tag === selectedTag);

  return (
    <section id="fleet" className="py-16 lg:py-24 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
            Commercial Fleet Specifications
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
            The Right Commercial Vehicle for <span className="text-orange-600">Every Payload</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Our company-owned and maintained commercial vehicles range from nimble urban mini-trucks to high-capacity 3.5-ton transporters.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition capitalize ${
                selectedTag === t
                  ? "bg-navy-900 text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {t === "all" ? "All Fleet Vehicles" : t}
            </button>
          ))}
        </div>

        {/* Fleet Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filteredFleet.map((truck) => {
            const whatsappMsg = encodeURIComponent(
              `Hello Oscar Logistics! I would like to book a ${truck.vehicle} (${truck.size}, payload ${truck.payload}).`
            );
            return (
              <div
                key={truck.id || truck.size}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl hover:border-orange-500/40 transition-all duration-300"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                      {truck.size}
                    </span>
                    {truck.tag && (
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {truck.tag}
                      </span>
                    )}
                  </div>

                  {/* Truck Illustration Placeholder / Icon Graphic */}
                  <div className="my-3 py-6 rounded-2xl bg-slate-100 flex flex-col items-center justify-center group-hover:bg-slate-900 transition-colors duration-300">
                    <TruckIcon className="h-16 w-16 text-navy-900 group-hover:text-amber-400 transition-colors duration-300" />
                    <span className="text-[11px] font-mono font-bold text-slate-500 group-hover:text-slate-300 mt-2 transition-colors">
                      {truck.volume || "Standard Volume"}
                    </span>
                  </div>

                  {/* Model & Specs */}
                  <h3 className="text-base font-black text-navy-900 tracking-tight mt-2">
                    {truck.vehicle}
                  </h3>

                  <div className="mt-3 p-2.5 rounded-xl bg-orange-50/70 border border-orange-200/50 flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">Payload Capacity</span>
                    <span className="text-orange-700 font-black">{truck.payload}</span>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 leading-relaxed">
                    <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                      Recommended Cargo:
                    </span>
                    {truck.ideal}
                  </div>
                </div>

                {/* Book Action */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={`https://wa.me/${company.whatsappNumber}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-xs bg-navy-900 hover:bg-orange-600 text-white transition-colors"
                  >
                    <span>Book This Vehicle</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fleet Hygiene Guarantee */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-700">
          <div className="flex items-center gap-3">
            <ShieldCheckIcon className="h-6 w-6 text-emerald-500 shrink-0" />
            <span>
              <strong>100% Verified Fleet:</strong> All vehicles carry valid RTO commercial fitness certificates, active insurance, and factory-fitted telematics.
            </span>
          </div>
          <span className="text-orange-600 font-bold whitespace-nowrap">
            Monthly Preventative Maintenance Audits
          </span>
        </div>
      </div>
    </section>
  );
}
