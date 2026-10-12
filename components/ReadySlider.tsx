"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/projects";
import { useEnquiry } from "./EnquiryProvider";

export default function ReadySlider({ projects }: { projects: Project[] }) {
  const { openEnquiry } = useEnquiry();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = projects.length;
  useEffect(() => {
    if (paused || n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n, paused]);
  if (!n) return null;
  const s = projects[i];

  return (
    <section aria-labelledby="ready-title" className="section-x py-[clamp(56px,8vw,110px)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid items-stretch gap-[clamp(20px,3vw,40px)] bg-olive p-[clamp(20px,3vw,34px)] text-paper md:grid-cols-2">
        <div className="relative aspect-[16/10] w-full min-w-0 overflow-hidden">
          {projects.map((p, k) => (
            <Image key={p.slug} src={p.imgLg} alt={`${p.name}, ${p.area}`} fill loading="lazy" sizes="(min-width:768px) 50vw, 100vw" className={`object-cover transition-opacity duration-[900ms] ${k === i ? "opacity-100" : "opacity-0"}`} />
          ))}
          <div className="absolute left-[18px] top-[18px] rounded-full bg-ink/70 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em]">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 py-[clamp(6px,1vw,16px)]">
          <div className="flex flex-col gap-4" aria-live="polite">
            <span id="ready-title" className="text-[11px] uppercase tracking-[0.3em] text-paper/75">Ready to move · {s.area}</span>
            <h3 className="m-0 font-serif text-[clamp(34px,3.6vw,56px)] font-light leading-[1.02]">
              <a href={`#project-${s.slug}`} className="!text-paper hover:underline">{s.name}</a>
            </h3>
            <p className="m-0 max-w-[40ch] text-[15px] leading-[1.75] text-paper/90">{s.bhk} · {s.size}. {s.pay}.</p>
            <div className="flex items-baseline gap-2.5">
              <span className="text-[clamp(38px,4vw,54px)] font-light leading-none">{s.price}</span>
              <span className="text-[11px] uppercase tracking-[0.16em] text-paper/75">{s.unit}</span>
            </div>
            <button onClick={() => openEnquiry({ name: s.name, loc: s.loc, meta: `${s.bhk} · ${s.size} · ${s.price} ${s.unit}`, source: "Ready Slider" })} className="btn-ghost-light self-start hover:!bg-paper hover:!text-olive">Book a site visit</button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-[18px]">
            <div className="flex flex-wrap gap-2">
              {projects.map((p, k) => (
                <button key={p.slug} aria-label={`Show ${p.name}`} aria-current={k === i} onClick={() => setI(k)} className={`h-1 w-[30px] ${k === i ? "bg-paper" : "bg-paper/35"}`} />
              ))}
            </div>
            <div className="flex gap-2.5">
              <button aria-label="Previous" onClick={() => setI((i + n - 1) % n)} className="h-[52px] w-[52px] rounded-full border border-paper/50 text-lg hover:bg-paper hover:text-olive">←</button>
              <button aria-label="Next" onClick={() => setI((i + 1) % n)} className="h-[52px] w-[52px] rounded-full border border-paper/50 text-lg hover:bg-paper hover:text-olive">→</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
