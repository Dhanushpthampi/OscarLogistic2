"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function FleetSection({ content }) {
  const [selectedTag, setSelectedTag] = useState("all");

  const fleet = content?.fleet || [
    {
      id: "intra-82",
      size: "8.2 FT Deck",
      vehicle: "Tata Intra V30 / V50",
      payload: "1.0 – 1.2 Ton",
      volume: "180 cu.ft",
      ideal: "City retail distribution, fast FMCG delivery across urban routes.",
      tag: "City Express",
      image: "/vehicles/intra-v30.jpg",
    },
    {
      id: "intra-88",
      size: "8.8 FT Deck",
      vehicle: "Tata Intra Long Wheelbase",
      payload: "1.3 – 1.5 Ton",
      volume: "220 cu.ft",
      ideal: "General cargo, furniture, wholesale appliances & B2B goods.",
      tag: "Most Versatile",
      image: "/vehicles/intra-lwb.jpg",
    },
    {
      id: "dosth-92",
      size: "9.2 FT High-Deck",
      vehicle: "Ashok Leyland Dosth +",
      payload: "1.5 – 1.8 Ton",
      volume: "260 cu.ft",
      ideal: "High volume packages, textile cartons, electronics & grains.",
      tag: "High Torque",
      image: "/vehicles/dosth-highdeck.jpg",
    },
    {
      id: "dosth-108",
      size: "10.8 FT Container",
      vehicle: "Ashok Leyland Dosth",
      payload: "2.0 Ton",
      volume: "320 cu.ft",
      ideal: "Weather-sealed protection for FMCG, e-commerce & sensitive goods.",
      tag: "Weatherproof",
      image: "/vehicles/dosth-container.jpg",
    },
    {
      id: "tata-407",
      size: "12.0 FT Heavy Deck",
      vehicle: "Tata 407 Gold LCV",
      payload: "3.0 – 3.5 Ton",
      volume: "480 cu.ft",
      ideal: "Heavy machinery parts, hardware, construction materials & bulk loads.",
      tag: "Heavy Hauler",
      image: "/vehicles/tata-407.jpg",
    },
  ];

  const company = content?.company || { whatsappNumber: "918590411061" };

  const tags = ["all", ...fleet.map((f) => f.tag)];
  const filteredFleet =
    selectedTag === "all" ? fleet : fleet.filter((t) => t.tag === selectedTag);

  return (
    <section id="fleet" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="eyebrow mb-3">Commercial Fleet</p>
          <h2 className="section-title">
            Vehicles for{" "}
            <span className="text-gradient">Every Payload</span>
          </h2>
          <p className="section-subtitle mt-4">
            A diverse fleet of LCVs and trucks — pick the right size for your cargo.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedTag === t
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
              }`}
            >
              {t === "all" ? "All Vehicles" : t}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFleet.map((truck) => {
            const whatsappMsg = encodeURIComponent(
              `Hello Oscar Logistics! I want to book a ${truck.vehicle} (${truck.size}, ${truck.payload}).`
            );
            return (
              <div
                key={truck.id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Vehicle Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
                  {truck.image ? (
                    <Image
                      src={truck.image}
                      alt={truck.vehicle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-slate-300 text-sm font-medium">{truck.vehicle}</span>
                    </div>
                  )}
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3">
                    <span className="badge badge-orange text-[10px] backdrop-blur-sm bg-white/90 border-orange-200">
                      {truck.size}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-sm">
                      {truck.tag}
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {truck.vehicle}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono shrink-0 ml-2">{truck.payload}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed flex-1">
                    {truck.ideal}
                  </p>

                  {/* Specs row */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-4 text-[11px] text-slate-500">
                    <span>Vol: {truck.volume}</span>
                    <span>Payload: {truck.payload}</span>
                  </div>

                  <a
                    href={`https://wa.me/${company.whatsappNumber}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-orange-500 hover:text-white text-slate-700 transition-all group-hover:bg-orange-500 group-hover:text-white"
                  >
                    Book This Truck
                    <ArrowRightIcon className="h-3 w-3" />
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
