"use client";

import { useState } from "react";
import { MapPinIcon, CheckCircleIcon, ClockIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

export default function CoverageSection({ content }) {
  const [activeZone, setActiveZone] = useState("all");

  const districts = content?.districts || [
    { name: "Ernakulam (Kochi)", hub: "Central Hub", deliveryTime: "Immediate / Same Day", zone: "Central Kerala" },
    { name: "Thrissur", hub: "Cultural Corridor Hub", deliveryTime: "Same Day", zone: "Central Kerala" },
    { name: "Kozhikode", hub: "Malabar Regional Hub", deliveryTime: "Same Day / Overnight", zone: "North Kerala" },
    { name: "Thiruvananthapuram", hub: "Capital Hub", deliveryTime: "Same Day / Overnight", zone: "South Kerala" },
    { name: "Palakkad", hub: "Gateway Logistics Hub", deliveryTime: "Same Day", zone: "Central Kerala" },
    { name: "Malappuram", hub: "Transit Facility", deliveryTime: "Same Day", zone: "North Kerala" },
    { name: "Kannur", hub: "North Coast Hub", deliveryTime: "Next Morning", zone: "North Kerala" },
    { name: "Kottayam", hub: "Highland Corridor", deliveryTime: "Same Day", zone: "Central Kerala" },
    { name: "Alappuzha", hub: "Coastal Network", deliveryTime: "Same Day", zone: "South Kerala" },
    { name: "Kollam", hub: "South Coastal Hub", deliveryTime: "Same Day", zone: "South Kerala" },
    { name: "Pathanamthitta", hub: "Regional Distribution", deliveryTime: "Next Morning", zone: "South Kerala" },
    { name: "Idukki", hub: "High-Range Specialized", deliveryTime: "Next Morning", zone: "Central Kerala" },
    { name: "Wayanad", hub: "Ghat Route Network", deliveryTime: "Next Morning", zone: "North Kerala" },
    { name: "Kasaragod", hub: "Northern Border Hub", deliveryTime: "24 - 36 Hours", zone: "North Kerala" },
  ];

  const zones = ["all", "Central Kerala", "North Kerala", "South Kerala"];

  const filteredDistricts =
    activeZone === "all" ? districts : districts.filter((d) => d.zone === activeZone);

  return (
    <section id="coverage" className="py-16 lg:py-24 bg-navy-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-pattern opacity-95 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">
            Statewide Footprint
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-white tracking-tight">
            Connecting All <span className="text-orange-500">14 Districts of Kerala</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            From the bustling wholesale markets of Broadway Kochi to the high-ranges of Wayanad and Idukki, our daily dispatch fleet ensures zero delivery blindspots.
          </p>
        </div>

        {/* Zone Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setActiveZone(z)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition capitalize ${
                activeZone === z
                  ? "bg-orange-600 text-white shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              {z === "all" ? "All 14 Districts" : z}
            </button>
          ))}
        </div>

        {/* Districts Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredDistricts.map((item) => (
            <div
              key={item.name}
              className="p-5 rounded-2xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 hover:border-orange-500/50 hover:bg-slate-800 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-400 bg-orange-950/60 border border-orange-800/60 px-2 py-0.5 rounded">
                    {item.zone}
                  </span>
                  <MapPinIcon className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-base font-black text-white tracking-tight">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">{item.hub}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-slate-300">
                <ClockIcon className="h-4 w-4 text-amber-400 shrink-0" />
                <span>Transit: {item.deliveryTime}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Corridor Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-black text-white">Need Interstate or Multi-Point Distribution?</h4>
            <p className="text-xs text-slate-300">
              We also handle regular cargo movements connecting Kerala to Coimbatore, Bengaluru, and Chennai corridors.
            </p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl text-xs font-black bg-orange-600 hover:bg-orange-500 text-white transition flex items-center gap-1.5 shrink-0"
          >
            <span>Request Route Consultation</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
