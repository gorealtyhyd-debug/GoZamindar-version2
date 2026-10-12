"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export type HeroSlide = { src: string; alt: string; cap: string };

/** Cross-fading hero background. First slide is in the static HTML (LCP); the rest fade in. */
export default function HeroCarousel({ slides, interval = 5500 }: { slides: HeroSlide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);
  const n = slides.length;
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), interval);
    return () => clearInterval(t);
  }, [n, interval, tick]);
  const go = (k: number) => { setI((k + n) % n); setTick((t) => t + 1); };

  return (
    <>
      {slides.map((s, k) => (
        <Image key={s.src} src={s.src} alt={k === 0 ? s.alt : ""} aria-hidden={k !== 0} fill priority={k === 0} loading={k === 0 ? undefined : "lazy"} sizes="100vw"
          className={`object-cover object-[center_40%] transition-[opacity,transform] duration-[1400ms,7000ms] ease-out ${k === i ? "scale-100 opacity-100" : "scale-[1.08] opacity-0"}`} />
      ))}
      <div className="absolute right-[clamp(20px,5vw,72px)] top-[clamp(24px,4vw,48px)] z-[3] flex flex-col items-end gap-3 text-paper">
        <span className="text-[10px] uppercase tracking-[0.26em] text-paper/85" aria-live="polite">{slides[i].cap}</span>
        <div className="flex items-center gap-2.5">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous image" className="h-10 w-10 rounded-full border border-paper/50 bg-ink/25 text-[15px] hover:bg-paper/20">←</button>
          {slides.map((s, k) => (
            <button key={s.src} type="button" onClick={() => go(k)} aria-label={s.cap} aria-current={k === i} className={`h-[3px] transition-all duration-500 ${k === i ? "w-[34px] bg-paper" : "w-3.5 bg-paper/45"}`} />
          ))}
          <button type="button" onClick={() => go(i + 1)} aria-label="Next image" className="h-10 w-10 rounded-full border border-paper/50 bg-ink/25 text-[15px] hover:bg-paper/20">→</button>
        </div>
      </div>
    </>
  );
}
