import { LOCATIONS, projectsIn, geoFor } from "@/lib/locations";
import { inr, minPsf } from "@/lib/projects";
import EnquireButton from "./EnquireButton";

/** Server-rendered locality guides: one crawlable block per micro-market (SEO + GEO). */
export default function LocationGuides() {
  return (
    <section id="area-guides" aria-labelledby="guides-title" className="section-x section-y flex flex-col gap-[clamp(32px,4vw,56px)]">
      <div className="flex flex-wrap items-end justify-between gap-[22px]">
        <div>
          <p className="eyebrow m-0">Area guides</p>
          <h2 id="guides-title" className="h2 mt-[18px]">Buying in West Hyderabad,<br /><em>locality by locality</em>.</h2>
        </div>
        <nav aria-label="Area guides" className="flex max-w-[560px] flex-wrap gap-2">
          {LOCATIONS.map((l) => (
            <a key={l.slug} href={`#location-${l.slug}`} className="rounded-full border border-olive/30 px-4 py-2 text-[11px] uppercase tracking-[0.16em] hover:bg-olive hover:!text-paper">{l.name}</a>
          ))}
        </nav>
      </div>

      <div className="grid gap-px bg-olive/15 md:grid-cols-2">
        {LOCATIONS.map((l) => {
          const ps = projectsIn(l);
          const m = minPsf(ps);
          const g = geoFor(l.slug);
          return (
            <article key={l.slug} id={`location-${l.slug}`} aria-labelledby={`loc-${l.slug}-h`} className="flex scroll-mt-24 flex-col gap-4 bg-paper p-[clamp(22px,3vw,40px)]">
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 id={`loc-${l.slug}-h`} className="m-0 font-serif text-[clamp(26px,2.6vw,36px)] font-light leading-[1.05]">{l.h1}</h3>
                <span className="text-[10px] uppercase tracking-[0.22em] text-olive-muted">{ps.length} projects{m ? ` · from ${inr(m)}/sft` : ""}</span>
              </header>
              <p className="loc-summary m-0 text-pretty text-[15px] leading-[1.75] text-olive-muted">{l.intro.join(" ")}</p>
              <ul className="m-0 grid list-none gap-1.5 p-0 text-sm sm:grid-cols-2">
                {l.highlights.map((h) => <li key={h} className="flex gap-2"><span aria-hidden="true" className="text-olive-muted">—</span>{h}</li>)}
              </ul>
              {ps.length > 0 && (
                <p className="m-0 text-sm leading-[1.8]">
                  <span className="text-olive-muted">Landowner share projects in {l.name}: </span>
                  {ps.map((p, i) => <span key={p.slug}><a href={`#project-${p.slug}`} className="underline underline-offset-4">{p.name}</a>{i < ps.length - 1 ? ", " : "."}</span>)}
                </p>
              )}
              {g.near.length > 0 && <p className="m-0 text-xs text-olive-muted">Near {g.near.join(", ")}{g.pin ? ` · PIN ${g.pin}` : ""}</p>}
              {l.faqs.length > 0 && (
                <div className="flex flex-col border-t border-olive/15">
                  {l.faqs.map((f) => (
                    <details key={f.q} className="group border-b border-olive/10 py-3">
                      <summary className="cursor-pointer list-none text-sm font-normal marker:hidden">{f.q}<span className="float-right transition group-open:rotate-45">+</span></summary>
                      <p className="faq-answer mb-0 mt-2 text-sm leading-[1.7] text-olive-muted">{f.a}</p>
                    </details>
                  ))}
                </div>
              )}
              <EnquireButton target={{ source: `Area guide · ${l.name}`, name: `Homes in ${l.name}`, loc: `${l.name}, Hyderabad` }} className="btn-outline mt-auto self-start">Enquire about {l.name}</EnquireButton>
            </article>
          );
        })}
      </div>
    </section>
  );
}
