"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { Bars3Icon, XMarkIcon, PhoneIcon, TruckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Header({ content }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const company = content?.company || {
    name: "Oscar Logistics",
    phonePrimary: "+918590411061",
    whatsappNumber: "918590411061",
  };

  const logo = content?.logo;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Fleet", href: "#fleet" },
    { label: "Coverage", href: "#coverage" },
    { label: "Why Us", href: "#why-us" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-md shadow-slate-200/60 border-b border-slate-200/80"
          : "bg-white/90 backdrop-blur-sm border-b border-slate-200/50"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Logo logo={logo} company={company} variant="light" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${company.phonePrimary}`}
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-orange-600 transition-colors"
            >
              <PhoneIcon className="h-4 w-4 text-orange-500" />
              {company.phonePrimary}
            </a>
            <a
              href={`https://wa.me/${company.whatsappNumber}?text=Hello%20Oscar%20Logistics%2C%20I%20need%20a%20transport%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105 hover:shadow-orange-500/40"
            >
              <TruckIcon className="h-4 w-4" />
              Book Truck
            </a>
            <Link
              href="/admin"
              title="Admin"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              <span className="sr-only">Admin</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            {open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl">
          <div className="section-container py-4 space-y-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${company.phonePrimary}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-slate-100 text-slate-800"
              >
                <PhoneIcon className="h-4 w-4 text-orange-500" />
                Call Us
              </a>
              <a
                href={`https://wa.me/${company.whatsappNumber}?text=Hello%20Oscar%20Logistics!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-bold bg-orange-500 text-white"
              >
                <TruckIcon className="h-4 w-4" />
                WhatsApp Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
