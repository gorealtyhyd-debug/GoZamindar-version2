"use client";
import Image from "next/image";
import { useRef } from "react";

export type LocalityTile = { slug: string; name: string; img: string; count: number; from: string; types: string };

export default function LocalityStrip({ items, title = true }: { items: LocalityTile[]; title?: boolean }) {
  const strip = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => strip.current?.scrollBy({ left: d * strip.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <section id="locations" aria-labelledby="loc-title" className="flex flex-col gap-10 border-y border-olive/15 bg-sand py-[clamp(56px,8vw,110px)]">
      <div className="section-x flex flex-wrap items-end justify-between gap-[22px]">
        {title && (
          <div>
            <p className="eyebrow m-0">Explore by neighbourhood</p>
            <h2 id="loc-title" className="h2 mt-[18px]">Flats &amp; villas across<br />the <em>west side</em> of Hyderabad.</h2>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-[18px]">
          <p className="m-0 max-w-[30ch] text-sm leading-[1.7] text-olive-muted">Kokapet, Neopolis, Financial District, Narsingi, Tellapur, Kollur and more.</p>
          <div className="flex gap-2.5">
            <button aria-label="Scroll left" onClick={() => scroll(-1)} className="h-[52px] w-[52px] rounded-full border border-olive/50 text-lg hover:bg-olive hover:text-paper">←</button>
            <button aria-label="Scroll right" onClick={() => scroll(1)} className="h-[52px] w-[52px] rounded-full border border-olive/50 text-lg hover:bg-olive hover:text-paper">→</button>
          </div>
        </div>
      </div>

      <div ref={strip} className="no-scrollbar section-x flex snap-x snap-mandatory scroll-px-[clamp(20px,5vw,72px)] gap-[18px] overflow-x-auto pb-2">
        {items.map((l, i) => (
          <a key={l.slug} href={`#location-${l.slug}`} className="group relative aspect-[3/4] flex-[0_0_clamp(240px,24vw,320px)] snap-start overflow-hidden bg-stone !text-paper">
            <Image src={l.img} alt={`Flats in ${l.name}, Hyderabad`} fill loading="lazy" sizes="320px" className="object-cover transition-transform duration-700 group-hover:scale-[1.07]" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/15" />
            <span className="pointer-events-none absolute inset-3 border border-paper/35" />
            <span className="absolute left-[26px] top-[26px] text-[10px] uppercase tracking-[0.28em] text-paper/85">{String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            <span className="absolute inset-x-[26px] bottom-[26px] flex flex-col gap-3.5">
              <span className="font-serif text-[clamp(32px,3vw,42px)] font-light leading-none">{l.name}</span>
              <span className="grid grid-cols-2 gap-3 border-t border-paper/35 pt-3.5">
                <span className="flex flex-col gap-[3px]"><span className="text-[9px] uppercase tracking-[0.24em] text-paper/75">Projects</span><span className="text-[22px] font-light">{l.count}</span></span>
                <span className="flex flex-col gap-[3px]"><span className="text-[9px] uppercase tracking-[0.24em] text-paper/75">From / sft</span><span className="whitespace-nowrap text-[22px] font-light">{l.from}</span></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em]">{l.types} · Explore →</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
