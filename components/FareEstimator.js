"use client";

import { useState } from "react";
import {
  MapPinIcon,
  TruckIcon,
  ArrowRightIcon,
  ClockIcon,
  ShieldCheckIcon,
  CalculatorIcon,
  ChatBubbleLeftEllipsisIcon
} from "@heroicons/react/24/solid";

// Kerala district coordinates & estimated road distances matrix (approx highway km from Kochi hub)
const DISTRICT_DISTANCES = {
  "Ernakulam (Kochi)": 0,
  "Thrissur": 75,
  "Alappuzha": 60,
  "Kottayam": 65,
  "Palakkad": 135,
  "Kollam": 140,
  "Malappuram": 145,
  "Idukki": 120,
  "Pathanamthitta": 115,
  "Kozhikode": 180,
  "Thiruvananthapuram": 205,
  "Wayanad": 250,
  "Kannur": 270,
  "Kasaragod": 355,
};

const VEHICLES = [
  {
    name: "Tata Intra V30 / V50",
    payload: "1.0 - 1.2 Ton",
    baseRate: 900,
    perKm: 28,
    speedAvg: 40,
    idealFor: "City distribution, retail boxes, FMCG",
  },
  {
    name: "Ashok Leyland Dosth +",
    payload: "1.5 - 1.8 Ton",
    baseRate: 1400,
    perKm: 34,
    speedAvg: 45,
    idealFor: "Heavy retail pallets, industrial goods",
  },
  {
    name: "Tata 407 Heavy LCV",
    payload: "3.0 - 3.5 Ton",
    baseRate: 2200,
    perKm: 46,
    speedAvg: 42,
    idealFor: "Bulk wholesale, machinery, full loads",
  },
];

export default function FareEstimator({ content }) {
  const [fromDistrict, setFromDistrict] = useState("Ernakulam (Kochi)");
  const [toDistrict, setToDistrict] = useState("Kozhikode");
  const [vehicleIdx, setVehicleIdx] = useState(0);

  const districtsList = Object.keys(DISTRICT_DISTANCES);
  const company = content?.company || { whatsappNumber: "918590411061" };

  // Calculate approximate road distance between two districts
  const getDistanceKm = (from, to) => {
    if (from === to) return 30; // local intra-city
    const dist1 = DISTRICT_DISTANCES[from] || 50;
    const dist2 = DISTRICT_DISTANCES[to] || 50;
    // Approximation based on Kerala linear geography (North-South highway corridor)
    const diff = Math.abs(dist1 - dist2);
    return Math.max(diff, 40);
  };

  const distanceKm = getDistanceKm(fromDistrict, toDistrict);
  const selectedVehicle = VEHICLES[vehicleIdx];

  // Estimated tariff range (approximate reference)
  const estimatedCost = Math.round(selectedVehicle.baseRate + distanceKm * selectedVehicle.perKm);
  const minCost = Math.round(estimatedCost * 0.95);
  const maxCost = Math.round(estimatedCost * 1.1);

  // Estimated transit time
  const estHours = (distanceKm / selectedVehicle.speedAvg).toFixed(1);
  const turnaroundText =
    distanceKm <= 90
      ? "2-3 Hours (Express Same Day)"
      : distanceKm <= 190
      ? "4-6 Hours (Same Day Delivery)"
      : "Next Morning / Scheduled Overnight";

  const whatsappMessage = encodeURIComponent(
    `Hello Oscar Logistics! I would like a quote for:\n• Pickup: ${fromDistrict}\n• Delivery: ${toDistrict}\n• Est. Distance: ${distanceKm} km\n• Vehicle: ${selectedVehicle.name} (${selectedVehicle.payload})\n• Est. Budget: ₹${minCost.toLocaleString()} - ₹${maxCost.toLocaleString()}\nPlease confirm availability and exact pricing.`
  );

  return (
    <section id="calculator" className="relative py-12 lg:py-16 bg-slate-900 text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-navy-pattern opacity-90 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-600/20 text-orange-400 text-xs font-black tracking-widest uppercase mb-3 border border-orange-500/30">
            <CalculatorIcon className="h-4 w-4" /> Instant Route &amp; Rate Estimator
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Plan Your Kerala Freight <span className="text-orange-500">In 30 Seconds</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Select your pickup district, destination, and vehicle capacity. Get immediate transparent estimates and instant dispatch confirmation.
          </p>
        </div>

        {/* Interactive Estimator Box */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
          <div className="grid gap-6 lg:grid-cols-12 items-center">
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Pickup & Destination */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <MapPinIcon className="h-4 w-4 text-emerald-400" />
                    Pickup District (Origin)
                  </label>
                  <select
                    value={fromDistrict}
                    onChange={(e) => setFromDistrict(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-600 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    {districtsList.map((d) => (
                      <option key={d} value={d} className="bg-slate-900 text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                    <MapPinIcon className="h-4 w-4 text-orange-400" />
                    Delivery District (Destination)
                  </label>
                  <select
                    value={toDistrict}
                    onChange={(e) => setToDistrict(e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-600 text-white rounded-xl px-4 py-3.5 text-sm font-semibold focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                  >
                    {districtsList.map((d) => (
                      <option key={d} value={d} className="bg-slate-900 text-white">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Selection */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <TruckIcon className="h-4 w-4 text-amber-400" />
                  Select Commercial Vehicle
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  {VEHICLES.map((veh, idx) => (
                    <button
                      key={veh.name}
                      type="button"
                      onClick={() => setVehicleIdx(idx)}
                      className={`text-left p-3.5 rounded-2xl border transition text-xs ${
                        vehicleIdx === idx
                          ? "bg-orange-600/20 border-orange-500 text-white ring-1 ring-orange-500"
                          : "bg-slate-900/60 border-slate-700/80 text-slate-300 hover:bg-slate-700/50"
                      }`}
                    >
                      <span className="block font-black text-sm text-white mb-0.5">{veh.name.split("/")[0]}</span>
                      <span className="block font-extrabold text-orange-400 text-[11px] mb-1">Cap: {veh.payload}</span>
                      <span className="block text-[10px] text-slate-400 line-clamp-1">{veh.idealFor}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guarantees */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 pt-2 border-t border-slate-700/60">
                <span className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="h-4 w-4 text-emerald-400" /> No Hidden Toll Charges
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="h-4 w-4 text-emerald-400" /> 100% Waterproof Cover
                </span>
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-4 w-4 text-emerald-400" /> Live GPS Tracking
                </span>
              </div>
            </div>

            {/* Output Estimate Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400 font-bold uppercase tracking-wider">Estimated Transit</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-[11px]">
                  Corridor Active
                </span>
              </div>

              {/* Route Display */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <span className="text-emerald-400">{fromDistrict}</span>
                  <ArrowRightIcon className="h-4 w-4 text-slate-500 shrink-0" />
                  <span className="text-orange-400">{toDistrict}</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                  <span>
                    Approx. Distance: <strong className="text-white">{distanceKm} km</strong>
                  </span>
                  <span>
                    Driving ETA: <strong className="text-white">~{estHours} hrs</strong>
                  </span>
                </div>
              </div>

              {/* Turnaround Badge */}
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-amber-400 shrink-0" />
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Delivery SLA</span>
                  <span className="block text-xs font-extrabold text-white">{turnaroundText}</span>
                </div>
              </div>

              {/* Tariff Guide */}
              <div>
                <span className="block text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-1">
                  Estimated Tariff Range
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400">
                    ₹{minCost.toLocaleString()} - ₹{maxCost.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">*indicative</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Includes driver, fuel &amp; transit. Actual quote confirmed based on loading specifics.
                </p>
              </div>

              {/* Book WhatsApp CTA */}
              <a
                href={`https://wa.me/${company.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl font-black text-sm bg-orange-600 hover:bg-orange-500 text-white shadow-lg transition transform hover:-translate-y-0.5"
              >
                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" />
                <span>Confirm Rate on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
