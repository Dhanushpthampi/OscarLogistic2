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
    idealFor: "City retail, fast FMCG",
  },
  {
    name: "Ashok Leyland Dosth +",
    payload: "1.5 - 1.8 Ton",
    baseRate: 1400,
    perKm: 34,
    speedAvg: 45,
    idealFor: "General cargo, wholesale",
  },
  {
    name: "Tata 407 Heavy LCV",
    payload: "3.0 - 3.5 Ton",
    baseRate: 2200,
    perKm: 46,
    speedAvg: 42,
    idealFor: "Heavy bulk, machinery",
  },
];

export default function FareEstimator({ content }) {
  const [fromDistrict, setFromDistrict] = useState("Ernakulam (Kochi)");
  const [toDistrict, setToDistrict] = useState("Kozhikode");
  const [vehicleIdx, setVehicleIdx] = useState(0);

  const districtsList = Object.keys(DISTRICT_DISTANCES);
  const company = content?.company || { whatsappNumber: "918590411061" };

  const getDistanceKm = (from, to) => {
    if (from === to) return 30;
    const dist1 = DISTRICT_DISTANCES[from] || 50;
    const dist2 = DISTRICT_DISTANCES[to] || 50;
    const diff = Math.abs(dist1 - dist2);
    return Math.max(diff, 40);
  };

  const distanceKm = getDistanceKm(fromDistrict, toDistrict);
  const selectedVehicle = VEHICLES[vehicleIdx];

  const estimatedCost = Math.round(selectedVehicle.baseRate + distanceKm * selectedVehicle.perKm);
  const minCost = Math.round(estimatedCost * 0.95);
  const maxCost = Math.round(estimatedCost * 1.1);

  const estHours = (distanceKm / selectedVehicle.speedAvg).toFixed(1);
  const turnaroundText =
    distanceKm <= 90
      ? "2-3 Hours (Express)"
      : distanceKm <= 190
      ? "4-6 Hours (Same Day)"
      : "Next Morning Delivery";

  const whatsappMessage = encodeURIComponent(
    `Hello Oscar Logistics! I would like a quote for:\n• Pickup: ${fromDistrict}\n• Delivery: ${toDistrict}\n• Distance: ~${distanceKm} km\n• Vehicle: ${selectedVehicle.name} (${selectedVehicle.payload})\n• Estimated Budget: ₹${minCost.toLocaleString()} - ₹${maxCost.toLocaleString()}\nPlease confirm availability.`
  );

  return (
    <section id="calculator" className="py-20 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
            <CalculatorIcon className="h-3.5 w-3.5 text-orange-600" /> Instant Rate Tool
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            Instant Kerala Freight <span className="text-orange-600">Estimator</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Pick your corridor and payload for an upfront rate guide and instant WhatsApp dispatch.
          </p>
        </div>

        {/* Crisp Light Glass Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl relative">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPinIcon className="h-3.5 w-3.5 text-emerald-600" />
                    Pickup District
                  </label>
                  <select
                    value={fromDistrict}
                    onChange={(e) => setFromDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    {districtsList.map((d) => (
                      <option key={d} value={d} className="bg-white text-slate-900">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <MapPinIcon className="h-3.5 w-3.5 text-orange-600" />
                    Delivery District
                  </label>
                  <select
                    value={toDistrict}
                    onChange={(e) => setToDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-2xl px-4 py-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-orange-500 outline-none"
                  >
                    {districtsList.map((d) => (
                      <option key={d} value={d} className="bg-white text-slate-900">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Vehicle Pills */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                  <TruckIcon className="h-3.5 w-3.5 text-orange-600" />
                  Select Vehicle Capacity
                </label>
                <div className="grid gap-2.5 sm:grid-cols-3">
                  {VEHICLES.map((veh, idx) => (
                    <button
                      key={veh.name}
                      type="button"
                      onClick={() => setVehicleIdx(idx)}
                      className={`text-left p-3 rounded-2xl border transition text-xs ${
                        vehicleIdx === idx
                          ? "bg-orange-50 border-orange-500 text-slate-900 ring-2 ring-orange-500/30"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="block font-bold text-slate-900 mb-0.5">{veh.name.split("/")[0]}</span>
                      <span className="block font-mono text-orange-600 font-bold text-[11px]">{veh.payload}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output HUD (5 cols) */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-200">
                <span className="text-slate-500 font-mono text-[11px] font-bold">CORRIDOR SUMMARY</span>
                <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Route
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
                  <span className="text-emerald-700">{fromDistrict.split("(")[0]}</span>
                  <ArrowRightIcon className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-orange-700">{toDistrict.split("(")[0]}</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-600 pt-1">
                  <span>~{distanceKm} km</span>
                  <span>Drive: ~{estHours}h</span>
                  <span className="text-orange-600 font-bold">{turnaroundText}</span>
                </div>
              </div>

              {/* Price Banner */}
              <div className="pt-2">
                <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">
                  Estimated Tariff Range
                </span>
                <div className="text-2xl sm:text-3xl font-black text-orange-600">
                  ₹{minCost.toLocaleString()} - ₹{maxCost.toLocaleString()}
                </div>
              </div>

              {/* Book WhatsApp Action */}
              <a
                href={`https://wa.me/${company.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs bg-orange-600 hover:bg-orange-700 text-white shadow-md shadow-orange-600/20 transition transform hover:scale-105"
              >
                <ChatBubbleLeftEllipsisIcon className="h-4 w-4" />
                <span>Confirm Rate on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
