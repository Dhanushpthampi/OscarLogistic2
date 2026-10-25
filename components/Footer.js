import Link from "next/link";
import { PhoneIcon, EnvelopeIcon, MapPinIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function Footer({ content }) {
  const company = content?.company || {
    name: "Oscar Logistics",
    phonePrimary: "+918590411061",
    phoneSecondary: "+919847789998",
    email: "oscarlogisticspvr@gmail.com",
    address: "Oscar Logistics Hub, NH 66 Bypass, Kerala, India",
  };

  const districts = [
    "Ernakulam (Kochi)",
    "Kozhikode",
    "Thiruvananthapuram",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kannur",
    "Kottayam",
    "Alappuzha",
    "Kollam",
    "Pathanamthitta",
    "Idukki",
    "Wayanad",
    "Kasaragod",
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-slate-800">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500 text-slate-950 font-black text-xl">
                O
              </span>
              <div>
                <span className="block text-lg font-black text-white tracking-wider">OSCAR LOGISTICS</span>
                <span className="block text-[10px] font-extrabold text-orange-500 tracking-[0.25em] uppercase">
                  Kerala Freight Network
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Kerala&apos;s dependable goods transportation and commercial fleet rental partner. Providing GPS-tracked Full Truck Load (FTL), Part Truck Load (PTL), and express corridor distribution across all 14 districts.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <p className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-orange-500" />
                <a href={`tel:${company.phonePrimary}`} className="hover:text-white transition">
                  {company.phonePrimary} / {company.phoneSecondary}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-orange-500" />
                <a href={`mailto:${company.email}`} className="hover:text-white transition">
                  {company.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-orange-500" />
                <span>{company.address}</span>
              </p>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-white">Logistics Navigation</p>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#calculator" className="hover:text-orange-400 transition">
                  Rate &amp; Route Estimator
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-orange-400 transition">
                  Full Truck Load (FTL) &amp; PTL
                </a>
              </li>
              <li>
                <a href="#fleet" className="hover:text-orange-400 transition">
                  Tata Intra &amp; Dosth Commercial Fleet
                </a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-orange-400 transition">
                  All 14 Kerala Districts Coverage
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-orange-400 transition">
                  Why Choose Oscar Logistics
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-orange-400 transition">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-400 transition">
                  24×7 Dispatch Desk Contact
                </a>
              </li>
            </ul>
          </div>

          {/* District Coverage Tags for SEO (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-black uppercase tracking-wider text-white">Kerala District Service Network</p>
            <p className="text-[11px] text-slate-400">Daily scheduled freight departures serving all commercial hubs:</p>
            <div className="flex flex-wrap gap-1.5">
              {districts.map((d) => (
                <span
                  key={d}
                  className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Login Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Oscar Logistics India. All rights reserved. Driven by <span className="text-orange-500 font-semibold">Trust</span>, powered by <span className="text-orange-500 font-semibold">Commitment</span>.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition text-[11px] font-semibold"
            >
              <ShieldCheckIcon className="h-4 w-4" />
              <span>Admin Portal Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
