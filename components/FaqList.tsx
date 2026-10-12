import type { Faq } from "@/lib/faqs";

/** Native <details> — answers are in the HTML for crawlers and work without JS. */
export default function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-olive/30">
      {faqs.map((f, i) => (
        <details key={i} className="group border-b border-olive/20" open={i === 0}>
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5">
            <h3 className="m-0 font-serif text-[clamp(20px,2vw,26px)] font-normal leading-snug">{f.q}</h3>
            <span aria-hidden="true" className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-olive/40 text-lg transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="faq-answer m-0 max-w-[70ch] pb-6 text-[15px] leading-[1.8] text-olive-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
