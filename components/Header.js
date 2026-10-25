"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bars3Icon,
  XMarkIcon,
  PhoneIcon,
  TruckIcon,
  ShieldCheckIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

export default function Header({ content }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const company = content?.company || {
    name: "Oscar Logistics",
    phonePrimary: "+918590411061",
    whatsappNumber: "918590411061",
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Rate Estimator", href: "#calculator", highlight: true },
    { label: "Services", href: "#services" },
    { label: "Fleet", href: "#fleet" },
    { label: "14 Districts", href: "#coverage" },
    { label: "Why Us", href: "#why-us" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80 py-3"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="h-11 w-11 rounded-xl bg-navy-900 group-hover:bg-navy-800 flex items-center justify-center text-amber-400 font-black text-2xl shadow-md transition transform group-hover:scale-105">
                O
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
            <div>
              <span className="block text-xl font-black tracking-tight text-navy-900 leading-none">
                OSCAR <span className="text-orange-600">LOGISTICS</span>
              </span>
              <span className="block text-[10px] font-extrabold uppercase tracking-[0.22em] text-slate-500 mt-0.5">
                Kerala Freight Network
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  item.highlight
                    ? "text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 flex items-center gap-1.5"
                    : "text-slate-600 hover:text-navy-900 hover:bg-slate-100"
                }`}
              >
                {item.highlight && <CalculatorIcon className="h-3.5 w-3.5 text-orange-600" />}
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Admin Link */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href={`tel:${company.phonePrimary}`}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-navy-900 bg-slate-100 hover:bg-slate-200 transition"
            >
              <PhoneIcon className="h-4 w-4 text-orange-600" />
              <span>{company.phonePrimary}</span>
            </a>

            <a
              href={`https://wa.me/${company.whatsappNumber}?text=Hello%20Oscar%20Logistics%2C%20I%20need%20a%20transport%20quote%20for%20Kerala.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold bg-orange-600 hover:bg-orange-700 text-white shadow-sm hover:shadow transition transform hover:-translate-y-0.5"
            >
              <TruckIcon className="h-4 w-4" />
              <span>Book A Truck</span>
            </a>

            <Link
              href="/admin"
              title="Admin CMS Portal"
              className="p-2 text-slate-400 hover:text-navy-900 hover:bg-slate-100 rounded-lg transition"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              <span className="sr-only">Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {open && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between px-2 py-1 text-xs text-emerald-600 font-bold bg-emerald-50 rounded-lg mb-2">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                24×7 Kerala Dispatch Live
              </span>
              <span className="text-[11px] font-mono text-slate-500">All 14 Districts</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-xs font-bold text-slate-700 hover:text-navy-900 hover:bg-slate-100 transition flex items-center gap-1.5"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${company.phonePrimary}`}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-navy-900 text-white"
              >
                <PhoneIcon className="h-4 w-4 text-orange-500" />
                Call Dispatch: {company.phonePrimary}
              </a>

              <a
                href={`https://wa.me/${company.whatsappNumber}?text=Hello%20Oscar%20Logistics%2C%20I%20would%20like%20to%20inquire%20about%20goods%20transport.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold bg-orange-600 text-white"
              >
                <TruckIcon className="h-4 w-4" />
                Instant WhatsApp Quote
              </a>

              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="text-center text-xs text-slate-400 hover:text-slate-700 py-1"
              >
                🔒 Admin Panel Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
