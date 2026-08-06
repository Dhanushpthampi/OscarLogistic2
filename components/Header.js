"use client";
import { Bars3Icon, PhoneIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const links = ["Services", "Fleet", "Why us", "Coverage", "FAQ"];
export default function Header() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"><a href="#top" className="flex items-center gap-2"><span className="grid h-10 w-10 place-items-center rounded-lg bg-navy text-lg font-black text-white">O</span><span className="leading-none"><b className="block text-xl tracking-[.12em] text-navy">OSCAR</b><small className="font-bold tracking-[.28em] text-orange">LOGISTICS</small></span></a><nav className="hidden items-center gap-7 lg:flex">{links.map((link) => <a className="text-sm font-bold text-slate-600 transition hover:text-orange" href={`#${link.toLowerCase().replace(" ", "-")}`} key={link}>{link}</a>)}<a href="tel:+918590411061" className="inline-flex items-center gap-2 rounded-md bg-orange px-4 py-3 text-sm font-extrabold text-white transition hover:bg-navy"><PhoneIcon className="h-4 w-4" />Get a quote</a></nav><button onClick={() => setOpen(!open)} className="lg:hidden" aria-label="Toggle navigation">{open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}</button></div>{open && <nav className="border-t bg-white px-5 py-4 lg:hidden">{links.map((link) => <a onClick={() => setOpen(false)} className="block py-3 font-bold text-navy" href={`#${link.toLowerCase().replace(" ", "-")}`} key={link}>{link}</a>)}</nav>}</header>;
}
