import Link from "next/link";
import Logo from "@/components/Logo";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const DISTRICTS = [
  "Ernakulam", "Kozhikode", "Thiruvananthapuram", "Thrissur",
  "Palakkad", "Malappuram", "Kannur", "Kottayam",
  "Alappuzha", "Kollam", "Pathanamthitta", "Idukki", "Wayanad", "Kasaragod",
];

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Fleet", href: "#fleet" },
  { label: "Coverage", href: "#coverage" },
  { label: "Why Us", href: "#why-us" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ content }) {
  const company = content?.company || {
    name: "Oscar Logistics",
    phonePrimary: "+918590411061",
    phoneSecondary: "+919847789998",
    email: "oscarlogisticspvr@gmail.com",
    address: "NH 66 Bypass, Kerala, India",
  };

  const logo = content?.logo;

  return (
    <footer className="relative bg-slate-900 text-slate-300 overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-orange-600/5 rounded-full blur-[80px] pointer-events-none" />

      {/* CTA Banner */}
      <div className="border-b border-slate-800 relative z-10">
        <div className="section-container py-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-1">Ready to Ship?</p>
              <h3 className="text-2xl font-black text-white">
                Get your cargo moving across Kerala today.
              </h3>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href={`tel:${company.phonePrimary}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition hover:scale-105"
              >
                <PhoneIcon className="h-4 w-4 text-orange-500" />
                Call Us
              </a>
              <a
                href={`https://wa.me/${company.phonePrimary?.replace(/\D/g, "")}?text=Hello%20Oscar%20Logistics!`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 transition hover:scale-105"
              >
                WhatsApp Quote →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="section-container py-16 relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block">
              <Logo logo={logo} company={company} variant="dark" />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Kerala&apos;s modern commercial freight network. Dedicated FTL, PTL, and express freight across all 14 districts.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href={`tel:${company.phonePrimary}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition">
                <PhoneIcon className="h-4 w-4 text-orange-500 shrink-0" />
                {company.phonePrimary} / {company.phoneSecondary}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-slate-400 hover:text-white transition">
                <EnvelopeIcon className="h-4 w-4 text-orange-500 shrink-0" />
                {company.email}
              </a>
              <span className="flex items-center gap-3 text-slate-400">
                <MapPinIcon className="h-4 w-4 text-orange-500 shrink-0" />
                {company.address}
              </span>
            </div>
          </div>

          {/* Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white">Navigation</p>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-slate-400 hover:text-orange-400 transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Districts (4 cols) — SEO */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-white">Kerala Coverage</p>
            <div className="flex flex-wrap gap-1.5">
              {DISTRICTS.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 text-[11px] rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:border-orange-500/50 hover:text-slate-300 transition cursor-default"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800 relative z-10">
        <div className="section-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Oscar Logistics India. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-slate-500 hover:text-white transition"
            >
              <ShieldCheckIcon className="h-3.5 w-3.5" />
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
