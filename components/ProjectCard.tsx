import Image from "next/image";
import { Project } from "@/lib/projects";
import EnquireButton from "./EnquireButton";

/** Saving vs market price, e.g. "Save 18%" — or a soft label when price is on request. */
function saving(p: Project) {
  const m = p.mkt || "";
  const mPsf = parseInt(m.replace(/[^\d]/g, ""), 10);
  if (p.psf && /sft/.test(m) && mPsf > p.psf) return `Save ${Math.round(((mPsf - p.psf) / mPsf) * 100)}%`;
  const cr = (s: string) => parseFloat((s.match(/([\d.]+)\s*Cr/i) || [])[1] || "");
  const a = cr(p.price), b = cr(m);
  if (a && b && b > a) return `Save ~${Math.round(((b - a) / b) * 100)}%`;
  return "Best price on call";
}

export default function ProjectCard({ p, headingLevel = "h3" }: { p: Project; num?: number; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const target = { name: p.name, loc: p.loc, meta: `${p.bhk} · ${p.size} · ${p.price} ${p.unit}`, source: "Project Card" };
  const badge = saving(p);
  const alt = `${p.name}, ${p.loc} — landowner share ${p.bhk} ${p.type === "Villa" ? "villas" : "flats"}`;

  return (
    <article id={`project-${p.slug}`} className="scroll-mt-24" itemScope itemType="https://schema.org/Residence">
      {/* Tablet / laptop / desktop */}
      <div className="hidden flex-col gap-3.5 rounded-[22px] border border-olive/10 bg-white px-2 pb-3.5 pt-2 shadow-[0_22px_44px_-30px_rgba(30,32,22,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_60px_-30px_rgba(30,32,22,0.45)] sm:flex">
        <EnquireButton target={target} ariaLabel={`Enquire about ${p.name}`} className="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-stone">
          <Image src={p.img} alt={alt} fill loading="lazy" sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" itemProp="image" />
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-ink shadow"><span className="text-xs text-[#C9AE7E]">★</span>{badge}</span>
          <span className="absolute right-3 top-3 rounded-full bg-ink/60 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.18em] text-paper">{p.area}</span>
        </EnquireButton>
        <div className="flex flex-col gap-1.5 px-2">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="font-serif text-[32px] font-normal leading-none text-ink">{p.price}</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-olive-muted">{p.unit}</span>
            {p.mkt && <span className="ml-auto text-[11px] text-olive-muted">Market <s>{p.mkt}</s></span>}
          </div>
          <div className="flex min-w-0 items-baseline gap-1.5 whitespace-nowrap text-[13px]">
            <H className="m-0 shrink-0 font-serif text-[22px] font-normal text-ink" itemProp="name">{p.name}</H>
            <span className="truncate text-olive-muted" itemProp="address">· {p.loc}</span>
          </div>
        </div>
        <div className="mx-2 flex items-center gap-3.5 border-y border-olive/10 py-2.5 text-[13px] text-ink">
          <span className="flex items-center gap-1.5 whitespace-nowrap"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>{p.size}</span>
          <span className="h-4 w-px bg-olive/20" />
          <span className="flex items-center gap-1.5 truncate"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" /></svg>{p.bhk}</span>
        </div>
        <div className="flex items-center justify-between gap-3 px-2 text-xs text-olive-muted"><span>{p.type} · <span className="text-ink">{p.pay}</span></span><span className="whitespace-nowrap">{p.ready ? "Ready to move" : p.poss}</span></div>
        <EnquireButton target={target} className="mx-1.5 cursor-pointer rounded-full bg-gradient-to-b from-olive to-[#2A2C1F] px-5 py-[15px] text-[11px] uppercase tracking-[0.2em] text-paper hover:from-olive-dark hover:to-olive-dark">Get best price</EnquireButton>
      </div>

      {/* Mobile */}
      <EnquireButton target={target} ariaLabel={`Enquire about ${p.name}`} className="relative isolate block aspect-[4/5] min-h-[420px] w-full cursor-pointer overflow-hidden rounded-[22px] bg-ink text-left text-paper shadow-[0_30px_60px_-36px_rgba(30,32,22,0.55)] sm:hidden">
        <Image src={p.img} alt={alt} fill loading="lazy" sizes="100vw" className="object-cover" />
        <span className="absolute inset-0 bg-gradient-to-b from-transparent from-45% via-ink/55 via-70% to-ink/90" />
        <span className="absolute left-[18px] top-[18px] flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-2 text-[10px] uppercase tracking-[0.2em] text-ink shadow"><span className="text-sm text-[#C9AE7E]">★</span>{badge}</span>
        <span className="absolute inset-x-[22px] bottom-5 flex flex-col gap-3.5">
          <span className="flex flex-col gap-1">
            {p.mkt && <span className="text-[11px] uppercase tracking-[0.16em] text-paper/75">Market <s>{p.mkt}</s></span>}
            <span className="font-serif text-[32px] font-normal leading-none">{p.price} <span className="font-sans text-[11px] font-light uppercase tracking-[0.16em] text-paper/80">{p.unit}</span></span>
          </span>
          <span className="flex items-end justify-between gap-3.5">
            <span className="flex min-w-0 flex-col gap-0.5"><span className="truncate font-serif text-[26px] leading-tight">{p.name}</span><span className="truncate text-[13px] font-light text-paper/75">{p.loc}</span></span>
            <span className="flex flex-none items-stretch">
              <span className="flex flex-col items-center gap-0.5 px-3"><span className="text-sm">{p.bhk}</span><span className="text-[9px] uppercase tracking-[0.22em] text-paper/70">Config</span></span>
              <span className="w-px bg-paper/30" />
              <span className="flex flex-col items-center gap-0.5 pl-3"><span className="text-sm">{p.type}</span><span className="text-[9px] uppercase tracking-[0.22em] text-paper/70">Type</span></span>
            </span>
          </span>
          <span className="h-px bg-paper/30" />
          <span className="flex items-center justify-between gap-3 text-xs font-light text-paper/80"><span className="truncate">{p.size} • {p.ready ? "Ready to move" : p.poss}</span><span className="flex-none text-[10px] uppercase tracking-[0.2em] text-paper underline underline-offset-[5px]">Get best price</span></span>
        </span>
      </EnquireButton>
    </article>
  );
}
