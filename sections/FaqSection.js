"use client";

import { useState } from "react";
import { ChevronDownIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

export default function FaqSection({ content }) {
  const [active, setActive] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const faqs = content?.faqs || [
    {
      id: "faq-1",
      category: "Coverage",
      question: "What geographic areas in Kerala does Oscar Logistics cover?",
      answer:
        "We provide end-to-end transport and logistics coverage across all 14 revenue districts of Kerala—from Kasaragod in the north to Thiruvananthapuram in the south, including high-range routes in Idukki and Wayanad.",
    },
    {
      id: "faq-2",
      category: "Tracking",
      question: "How can I track the exact location of my cargo in transit?",
      answer:
        "Every vehicle in our fleet is fitted with satellite GPS telematics. Once your consignment is dispatched, our 24×7 dispatch desk shares a live tracking link and automated WhatsApp transit checkpoints until delivery.",
    },
    {
      id: "faq-3",
      category: "Pricing",
      question: "How are freight rates calculated?",
      answer:
        "Rates are calculated based on origin, destination distance (km), vehicle payload capacity (e.g. Tata Intra vs 407), and cargo nature. We provide upfront, transparent quotations with zero hidden fuel surcharges or surprise tolls.",
    },
    {
      id: "faq-4",
      category: "Services",
      question: "Do you provide both Full Truck Load (FTL) and Part Truck Load (PTL)?",
      answer:
        "Yes! Whether you need a dedicated truck strictly for your goods (FTL) or want to save money by sharing space for a few cartons or pallets (PTL), we have dedicated scheduled operations for both.",
    },
    {
      id: "faq-5",
      category: "Safety",
      question: "How do you protect cargo from monsoon rains and road bumps in Kerala?",
      answer:
        "All our vehicles carry triple-layer heavy waterproof industrial tarpaulins, rubberized edge protectors, and ratcheted cargo lashing belts to guarantee zero moisture ingress and zero shifting.",
    },
    {
      id: "faq-6",
      category: "Booking",
      question: "How fast can I get a truck dispatched for immediate pickup?",
      answer:
        "For urgent express bookings within major logistics clusters like Kochi, Thrissur, and Kozhikode, our trucks can arrive at your warehouse or shop floor within 60 to 90 minutes of confirmation.",
    },
  ];

  const categories = ["all", "Coverage", "Tracking", "Pricing", "Services", "Safety", "Booking"];

  const filteredFaqs = faqs.filter((f) => {
    const matchesCategory = activeCategory === "all" || f.category === activeCategory;
    const matchesQuery =
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-600">
            Clear Answers
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">
            Frequently Asked <span className="text-orange-600">Questions</span>
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Have questions about shipping your cargo? Find instant answers below or chat with our 24×7 dispatch team.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. tracking, rates, monsoon, Kochi...)"
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 absolute left-4 top-4" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition capitalize ${
                activeCategory === cat
                  ? "bg-navy-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "all" ? "All Questions" : cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions */}
        <div className="divide-y divide-slate-200 rounded-3xl border border-slate-200 overflow-hidden bg-slate-50/50">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              No matching questions found. Try searching a different term or call our dispatch desk.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = active === index;
              return (
                <div key={faq.id || faq.question} className="bg-white">
                  <button
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left font-black text-navy-900 transition hover:bg-slate-50"
                    onClick={() => setActive(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-orange-600" : "text-slate-400"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
