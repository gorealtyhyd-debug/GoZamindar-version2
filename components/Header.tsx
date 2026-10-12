"use client";
import Image from "next/image";
import { useState } from "react";
import { NAV, SITE, telLink } from "@/lib/site";
import EnquireButton from "./EnquireButton";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="section-x sticky top-0 z-40 border-b border-olive/15 bg-paper/95 backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 py-3">
        <a href="#top" aria-label="GoZamindar home" className="flex shrink-0 flex-col gap-1">
          <Image src={SITE.logo.src} alt="GoZamindar" width={SITE.logo.width} height={SITE.logo.height} priority className="h-7 w-auto md:h-8" />
          <span className="hidden text-[9px] uppercase tracking-[0.28em] text-olive-muted sm:block">Landowner share homes · Hyderabad</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-[clamp(14px,1.8vw,30px)] text-xs uppercase tracking-[0.16em] lg:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="border-b border-transparent py-1 hover:border-olive/40">
              {n.label}
            </a>
          ))}
          <a href={telLink} className="whitespace-nowrap">94409 12347</a>
          <EnquireButton className="btn-olive px-5 py-3 tracking-[0.16em]">Enquire now</EnquireButton>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <EnquireButton className="btn-olive px-4 py-2.5 text-[10px]">Enquire</EnquireButton>
          <button type="button" aria-label="Menu" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-olive/30">
            <span className={`block h-px w-5 bg-olive transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-olive transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-olive transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col border-t border-olive/15 pb-4 lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-olive/10 py-3.5 text-sm uppercase tracking-[0.16em]">{n.label}</a>
          ))}
          <a href={telLink} className="py-3.5 text-sm uppercase tracking-[0.16em]">Call {SITE.phoneDisplay}</a>
        </nav>
      )}
    </header>
  );
}
