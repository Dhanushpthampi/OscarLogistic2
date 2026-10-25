"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const CATEGORY_COLORS = {
  Coverage: "bg-blue-50 text-blue-700",
  Dispatch: "bg-emerald-50 text-emerald-700",
  Pricing: "bg-orange-50 text-orange-700",
  Services: "bg-violet-50 text-violet-700",
  Safety: "bg-rose-50 text-rose-700",
  Booking: "bg-cyan-50 text-cyan-700",
};

export default function FaqSection({ content }) {
  const [active, setActive] = useState(null);

  const faqs = content?.faqs || [
    {
      id: "faq-1",
      category: "Coverage",
      question: "What areas in Kerala does Oscar Logistics cover?",
      answer:
        "We provide end-to-end transport across all 14 revenue districts of Kerala—from Kasaragod to Thiruvananthapuram, including high-range routes in Idukki and Wayanad.",
    },
    {
      id: "faq-2",
      category: "Dispatch",
      question: "How do I get status updates on my consignment in transit?",
      answer:
        "Once dispatched, our 24×7 dispatch desk coordinates directly with you via phone and WhatsApp, providing scheduled departure, checkpoint, and delivery updates.",
    },
    {
      id: "faq-3",
      category: "Pricing",
      question: "How are freight rates calculated?",
      answer:
        "Rates are based on origin, destination distance (km), vehicle payload, and cargo type. We provide upfront, transparent quotations with zero hidden surprises.",
    },
    {
      id: "faq-4",
      category: "Services",
      question: "Do you provide both FTL and PTL services?",
      answer:
        "Yes. Dedicated truck (FTL) or shared freight for smaller shipments (PTL)—we have scheduled daily departures for both across all Kerala districts.",
    },
    {
      id: "faq-5",
      category: "Safety",
      question: "How do you protect cargo during monsoon rains?",
      answer:
        "All vehicles carry triple-layer heavy waterproof tarpaulins, rubberized edge protectors, and ratcheted cargo lashing belts for zero moisture ingress.",
    },
    {
      id: "faq-6",
      category: "Booking",
      question: "How fast can you dispatch a truck for immediate pickup?",
      answer:
        "For urgent bookings within major clusters like Kochi, Thrissur, and Kozhikode, trucks can arrive at your location within 60–90 minutes of confirmation.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern-sm opacity-50 pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="eyebrow mb-3">FAQ</p>
          <h2 className="section-title">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="section-subtitle mt-4">
            Everything you need to know about shipping with Oscar Logistics.
          </p>
        </div>

        {/* Vertical Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = active === index;
            const catColor = CATEGORY_COLORS[faq.category] || "bg-slate-100 text-slate-600";

            return (
              <div
                key={faq.id || faq.question}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-orange-200 shadow-md shadow-orange-500/5 bg-white"
                    : "border-slate-100 shadow-sm bg-white hover:border-slate-200"
                }`}
              >
                <button
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  onClick={() => setActive(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span
                      className={`shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full ${catColor}`}
                    >
                      {faq.category}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isOpen ? "text-orange-600" : "text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-orange-600" : "text-slate-400"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Still have questions?{" "}
            <a
              href="#contact"
              className="font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2 transition"
            >
              Contact our dispatch team
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
