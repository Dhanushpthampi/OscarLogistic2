"use client";

import { useState } from "react";
import { MapPinIcon, ClockIcon } from "@heroicons/react/24/solid";

const ZONE_COLORS = {
  "Central Kerala": { dot: "bg-orange-500", label: "bg-orange-50 text-orange-700 border-orange-200" },
  "North Kerala": { dot: "bg-blue-500", label: "bg-blue-50 text-blue-700 border-blue-200" },
  "South Kerala": { dot: "bg-emerald-500", label: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export default function CoverageSection({ content }) {
  const [activeZone, setActiveZone] = useState("all");

  const districts = content?.districts || [
    { name: "Ernakulam (Kochi)", hub: "Central Hub", deliveryTime: "Same Day", zone: "Central Kerala" },
    { name: "Thrissur", hub: "Cultural Corridor", deliveryTime: "Same Day", zone: "Central Kerala" },
    { name: "Kozhikode", hub: "Malabar Hub", deliveryTime: "Same Day / Overnight", zone: "North Kerala" },
    { name: "Thiruvananthapuram", hub: "Capital Hub", deliveryTime: "Overnight", zone: "South Kerala" },
    { name: "Palakkad", hub: "Gateway Hub", deliveryTime: "Same Day", zone: "Central Kerala" },
    { name: "Malappuram", hub: "Transit Facility", deliveryTime: "Same Day", zone: "North Kerala" },
    { name: "Kannur", hub: "North Coast Hub", deliveryTime: "Next Morning", zone: "North Kerala" },
    { name: "Kottayam", hub: "Highland Corridor", deliveryTime: "Same Day", zone: "Central Kerala" },
    { name: "Alappuzha", hub: "Coastal Network", deliveryTime: "Same Day", zone: "South Kerala" },
    { name: "Kollam", hub: "South Coastal Hub", deliveryTime: "Same Day", zone: "South Kerala" },
    { name: "Pathanamthitta", hub: "Regional Hub", deliveryTime: "Next Morning", zone: "South Kerala" },
    { name: "Idukki", hub: "High-Range Route", deliveryTime: "Next Morning", zone: "Central Kerala" },
    { name: "Wayanad", hub: "Ghat Route", deliveryTime: "Next Morning", zone: "North Kerala" },
    { name: "Kasaragod", hub: "Northern Border", deliveryTime: "24-36 Hours", zone: "North Kerala" },
  ];

  const zones = ["all", "Central Kerala", "North Kerala", "South Kerala"];
  const filteredDistricts =
    activeZone === "all" ? districts : districts.filter((d) => d.zone === activeZone);

  return (
    <section id="coverage" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-sm opacity-70 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="eyebrow mb-3">Network Coverage</p>
          <h2 className="section-title">
            14 Districts{" "}
            <span className="text-gradient">Connected Daily</span>
          </h2>
          <p className="section-subtitle mt-4">
            From the northern border of Kasaragod to the southern tip of Thiruvananthapuram — fully covered.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {Object.entries(ZONE_COLORS).map(([zone, c]) => (
            <span key={zone} className="flex items-center gap-2 text-xs text-slate-600">
              <span className={`h-2.5 w-2.5 rounded-full ${c.dot}`} />
              {zone}
            </span>
          ))}
        </div>

        {/* Zone Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {zones.map((z) => (
            <button
              key={z}
              onClick={() => setActiveZone(z)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeZone === z
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {z === "all" ? "All 14 Districts" : z}
            </button>
          ))}
        </div>

        {/* District Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredDistricts.map((item) => {
            const c = ZONE_COLORS[item.zone] || ZONE_COLORS["Central Kerala"];
            return (
              <div
                key={item.name}
                className="group p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md hover:border-slate-200 hover:-translate-y-1 transition-all duration-200 cursor-default"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`h-2 w-2 rounded-full ${c.dot} shrink-0`} />
                  <span className="text-sm font-bold text-slate-900 leading-tight">{item.name}</span>
                </div>
                <div className="flex items-center gap-1.5 pl-4">
                  <ClockIcon className="h-3 w-3 text-slate-400 shrink-0" />
                  <span className="text-[11px] text-slate-500">{item.deliveryTime}</span>
                </div>
                <div className="mt-2 pl-4">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${c.label}`}>
                    {item.zone.split(" ")[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 mb-4">
            Need shipping to a location not listed? We can arrange special routes.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
          >
            <MapPinIcon className="h-4 w-4" />
            Request a Custom Route
          </a>
        </div>
      </div>
    </section>
  );
}
