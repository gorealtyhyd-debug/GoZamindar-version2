import Image from "next/image";
import { PROJECTS, READY, getProject } from "@/lib/projects";
import { LOCATIONS, LOCATION_FAQS } from "@/lib/locations";
import { ALL_FAQS } from "@/lib/faqs";
import { faqLd, pageMeta, placesLd, projectsListLd, webPageLd } from "@/lib/seo";
import LocationGuides from "@/components/LocationGuides";
import HeroCarousel from "@/components/HeroCarousel";
import { localityTiles } from "@/lib/tiles";
import JsonLd from "@/components/JsonLd";
import EnquireButton from "@/components/EnquireButton";
import ProjectExplorer from "@/components/ProjectExplorer";
import ReadySlider from "@/components/ReadySlider";
import LocalityStrip from "@/components/LocalityStrip";
import FaqList from "@/components/FaqList";
import EmiCalculator from "@/components/EmiCalculator";
import EnquiryForm from "@/components/EnquiryForm";
import { SITE, telLink, waLink } from "@/lib/site";

const TITLE = "Landowner Share Flats & Villas in Hyderabad | Kokapet, Neopolis, Narsingi, Tellapur, Kollur – GoZamindar";
const DESCRIPTION = `Buy landowner share flats & villas in Kokapet, Neopolis, Financial District, Narsingi, Tellapur and Kollur, West Hyderabad — below builder list price, direct from landowners. ${PROJECTS.length} projects, ready-to-move & under-construction. Call 94409 12347.`;
export const metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: "/",
  keywords: [
    "landowner share flats Hyderabad", "landowner share flats for sale", "JDA flats Hyderabad", "flats below builder price Hyderabad",
    "flats for sale in Kokapet", "Kokapet apartments", "Neopolis Kokapet flats", "Neopolis apartments",
    "flats in Financial District Hyderabad", "Nanakramguda apartments", "flats in Narsingi", "villas in Narsingi",
    "flats in Tellapur", "Osman Nagar apartments", "flats in Kollur", "villas in Kollur", "Puppalguda flats", "Gachibowli luxury apartments",
    "ready to move flats West Hyderabad", "3 BHK flats Kokapet", "4 BHK flats Financial District", "gated community villas Hyderabad", "Hyderabad real estate", "West Hyderabad property",
  ],
});

const steps = [
  { t: "Development agreement", b: "The builder and landowner sign an agreement giving the builder the right to develop the land." },
  { t: "Units allotted to the owner", b: "In exchange, the landowner receives ownership of a fixed number of flats or villas in the project." },
  { t: "You buy direct, for less", b: "GoZamindar connects you with these owners and supports you through to registration." },
];

export default function Home() {
  const stats = [
    { v: PROJECTS.length, l: "Live projects" },
    { v: LOCATIONS.length, l: "Localities" },
    { v: READY.length, l: "Ready to move" },
    { v: PROJECTS.filter((p) => p.type === "Villa").length, l: "Villa communities" },
  ];
  const gallery = ["aparna-zenon-narsingi", "sunshine-destino-financial-district", "evania-kokapet", "elegans-homes-villas-kollur"].map((s) => getProject(s)!).filter(Boolean);
  const faqs = ALL_FAQS;

  return (
    <>
      <JsonLd data={[webPageLd(TITLE, DESCRIPTION), projectsListLd(PROJECTS), placesLd(), faqLd([...faqs, ...LOCATION_FAQS])]} />

      <section id="top" className="relative flex min-h-[min(92vh,880px)] items-end overflow-hidden">
        <HeroCarousel slides={[
          { src: "/images/projects/prestige-golden-grove.png", alt: "Prestige Golden Grove landowner share towers, Kollur, Hyderabad", cap: "Prestige Golden Grove · Kollur" },
          { src: "/images/projects/raghava-linq.png", alt: "Raghava Linq towers, Kokapet", cap: "Raghava Linq · Kokapet" },
          { src: "/images/hero.jpg", alt: "Aerial view of a landowner share project in West Hyderabad", cap: "West Hyderabad" },
          { src: "/images/projects/dsr-ciel.png", alt: "DSR Ciel, Tellapur", cap: "DSR Ciel · Tellapur" },
          { src: "/images/projects/prosper-ekam.png", alt: "Prosper Ekam, Kollur", cap: "Prosper Ekam · Kollur" },
          { src: "/images/projects/sky-49.png", alt: "Sky 49, Tellapur", cap: "Sky 49 · Tellapur" },
        ]} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/25" />
        <div className="section-x relative flex max-w-[1100px] animate-rise flex-col gap-6 py-[clamp(36px,6vw,84px)] text-paper">
          <h1 className="m-0 flex flex-col gap-5">
            <span className="flex items-center gap-3.5 text-[11px] font-normal uppercase tracking-eyebrow">
              <span className="block h-px w-[46px] bg-paper" />Landowner share flats &amp; villas in Hyderabad
            </span>
            <span className="font-serif text-[clamp(46px,7vw,104px)] font-light leading-[0.95]">The landowner’s share,<br /><em>quietly</em> below list price.</span>
          </h1>
          <p className="m-0 max-w-[56ch] text-pretty text-[clamp(15px,1.2vw,19px)] leading-[1.7] text-paper/90">
            Flats and villas allotted to landowners in Kokapet, Neopolis, Narsingi, Financial District, Tellapur and Kollur — the same buildings as the builder’s inventory, sold direct at discounted pricing.
          </p>
          <div className="flex max-w-[640px] flex-wrap bg-paper text-olive">
            <div className="flex flex-[1_1_240px] flex-col gap-1 px-6 py-[18px]">
              <span className="text-[10px] uppercase tracking-[0.28em] text-olive-muted">Flats starting at</span>
              <span className="text-[clamp(32px,3.8vw,46px)] font-light leading-none">₹4,700<span className="ml-2.5 text-xs uppercase tracking-[0.16em] text-olive-muted">per sft</span></span>
            </div>
            <div className="flex flex-[0_1_240px] flex-col justify-center gap-1 bg-olive px-6 py-[18px] text-paper">
              <span className="text-[10px] uppercase tracking-[0.28em] text-paper/75">Direct from owners</span>
              <span className="text-sm leading-snug">One-time, loan &amp; progressive payment options</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3.5">
            <EnquireButton target={{ source: "Home Hero" }} className="btn-light">Enquire now</EnquireButton>
            <a href="#projects" className="btn-ghost-light">View all projects</a>
            <EnquireButton target={{ source: "Home Hero · Site visit" }} className="btn-ghost-light">Book a site visit</EnquireButton>
          </div>
          <dl className="m-0 grid max-w-[720px] grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-5 border-t border-paper/30 pt-5">
            {stats.map((s) => (
              <div key={s.l} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[10px] uppercase tracking-label text-paper/80">{s.l}</dt>
                <dd className="m-0 text-[38px] font-light leading-none">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="overflow-hidden whitespace-nowrap bg-olive py-[15px] text-paper" aria-hidden="true">
        <div className="inline-flex animate-marquee gap-[46px] text-[11px] uppercase tracking-[0.3em]">
          {[...LOCATIONS, ...LOCATIONS].map((l, i) => <span key={i} className="flex gap-[46px]"><span>{l.name}</span><span>·</span></span>)}
        </div>
      </div>

      <section id="how" aria-labelledby="how-title" className="section-x section-y flex flex-col gap-[clamp(36px,5vw,64px)]">
        <div className="grid items-end gap-[clamp(24px,4vw,64px)] md:grid-cols-2">
          <div>
            <p className="eyebrow m-0">What is a landowner share?</p>
            <h2 id="how-title" className="mt-[18px] font-serif text-[clamp(38px,5vw,76px)] font-light leading-[1.02] tracking-[-0.01em]">Same building. Same specs.<br /><em>A better</em> price.</h2>
          </div>
          <p className="m-0 max-w-[46ch] text-pretty text-[clamp(15px,1.15vw,18px)] leading-[1.75] text-olive-muted">
            <span id="how-summary">Builders often pay for land with apartments instead of cash. Landowners who receive those units usually sell them below the builder’s list price — and that’s the inventory we bring you.</span> <a href="#faq" className="underline">Read the FAQ</a>.
          </p>
        </div>
        <ol className="m-0 grid list-none gap-[clamp(24px,3vw,48px)] p-0 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="flex flex-col gap-3 border-t border-olive/30 pt-[22px]">
              <span className="font-mono text-xs text-olive-muted">0{i + 1}</span>
              <h3 className="m-0 font-serif text-[clamp(26px,2.4vw,34px)] font-normal leading-[1.1]">{s.t}</h3>
              <p className="m-0 max-w-[34ch] text-sm leading-[1.7] text-olive-muted">{s.b}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Featured projects" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-0.5 bg-olive/20">
        {gallery.map((p) => (
          <a key={p.slug} href={`#project-${p.slug}`} className="group relative block aspect-[4/3] overflow-hidden bg-stone">
            <Image src={p.imgLg} alt={`${p.name}, ${p.area}`} fill loading="lazy" sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-[18px] py-4 text-[11px] uppercase tracking-label text-paper">{p.name} — {p.area}</span>
          </a>
        ))}
      </section>

      <section id="projects" aria-labelledby="projects-title" className="section-x section-y border-b border-olive/15 bg-[#F1EEE6] bg-[url(/images/cream-paper-bg.png)] bg-[length:380px_380px]">
        <div className="mb-[38px] flex flex-wrap items-end justify-between gap-[22px]">
          <div>
            <p className="eyebrow m-0">Available now</p>
            <h2 id="projects-title" className="h2 mt-[18px]">{PROJECTS.length} landowner share flats &amp;<br />villas for sale in Hyderabad.</h2>
          </div>
          <p className="m-0 max-w-[34ch] text-sm leading-[1.7] text-olive-muted">Prices are indicative per-sft rates from owners. OTP = one-time payment · PLC = preferential location charges.</p>
        </div>
        <ProjectExplorer projects={PROJECTS} />
      </section>

      <ReadySlider projects={READY} />
      <LocalityStrip items={localityTiles()} />
      <LocationGuides />

      <section id="emi" aria-labelledby="emi-title" className="section-x section-y flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-[22px]">
          <div>
            <p className="eyebrow m-0">Plan your purchase</p>
            <h2 id="emi-title" className="h2 mt-[18px]">Home loan<br /><em>EMI calculator</em>.</h2>
          </div>
          <p className="m-0 max-w-[38ch] text-sm leading-[1.7] text-olive-muted">Adjust price, down payment, interest rate and tenure to see your monthly EMI instantly.</p>
        </div>
        <EmiCalculator />
      </section>

      <section id="faq" aria-labelledby="faq-title" className="section-x section-y border-t border-olive/15 bg-sand">
        <div className="grid gap-[clamp(28px,5vw,64px)] md:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-5">
            <p className="eyebrow m-0">Questions buyers ask</p>
            <h2 id="faq-title" className="h2 m-0">Landowner share,<br /><em>explained</em>.</h2>
            <EnquireButton target={{ source: "FAQ" }} className="btn-outline self-start">Ask us a question</EnquireButton>
          </div>
          <FaqList faqs={faqs} />
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="section-x section-y">
        <div className="relative flex min-h-[clamp(340px,34vw,460px)] items-end overflow-hidden bg-stone">
          <Image src="/images/contact.jpg" alt="Landowner share project in Hyderabad" fill loading="lazy" sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-ink/10" />
          <div className="relative flex flex-col gap-[18px] p-[clamp(22px,4vw,56px)] text-paper">
            <p className="m-0 text-[11px] uppercase tracking-[0.3em] text-paper/80">Enquiry</p>
            <h2 id="contact-title" className="m-0 max-w-[22ch] font-serif text-[clamp(30px,3.6vw,52px)] font-light leading-[1.05]">Your home is <em>one call</em> away.</h2>
            <p className="m-0 max-w-[48ch] text-[15px] leading-[1.7] text-paper/90">Tell us the project or locality you like. We’ll share current landowner units, floor plans and the best price available.</p>
            <EnquireButton target={{ source: "Home Contact" }} className="btn-light self-start">Enquire now</EnquireButton>
          </div>
        </div>
      </section>

      <section aria-label="Enquiry form and contact details" className="section-x pb-[clamp(56px,8vw,120px)] grid items-start gap-[clamp(28px,5vw,64px)] md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="eyebrow m-0">Talk to us</p>
          <address className="flex flex-col gap-3 text-[15px] not-italic">
            <a href={telLink} className="font-serif text-[clamp(28px,4vw,40px)] font-light leading-none">{SITE.phoneDisplay}</a>
            <a href={waLink()} target="_blank" rel="noopener" className="underline">WhatsApp us ↗</a>
            <span className="text-olive-muted">West Hyderabad — Kokapet, Narsingi, Financial District, Tellapur, Kollur · Telangana, India</span>
          </address>
        </div>
        <div className="border border-olive/20 bg-sand p-[clamp(22px,3vw,36px)]">
          <h3 className="mb-6 mt-0 font-serif text-[clamp(26px,4vw,32px)] font-light">Send an enquiry</h3>
          <EnquiryForm source="Contact Section" />
        </div>
      </section>

      <section id="about" aria-labelledby="about-title" className="section-x section-y grid gap-[clamp(28px,5vw,64px)] border-t border-olive/15 md:grid-cols-[1fr_1.6fr]">
        <div>
          <p className="eyebrow m-0">About GoZamindar</p>
          <h2 id="about-title" className="h2 mt-[18px]">We bring you the<br /><em>landowner’s share</em>.</h2>
        </div>
        <div className="prose-gz">
          <p>When builders develop land in Hyderabad, they often pay landowners with finished apartments or villas instead of cash. These landowner share units sit in the same towers, with the same specifications, as the builder’s own inventory — but landowners usually want to sell sooner, and typically price below the builder’s list.</p>
          <p>GoZamindar tracks this inventory across West Hyderabad, verifies what’s available, and connects buyers directly with owners. We help you compare projects, arrange site visits, understand the paperwork and reach registration.</p>
          <p>We work across {LOCATIONS.map((l) => l.name).join(", ")}.</p>
        </div>
      </section>

      <section id="privacy" aria-labelledby="privacy-title" className="section-x section-y border-t border-olive/15 bg-sand">
        <h2 id="privacy-title" className="mb-6 mt-0 font-serif text-[clamp(26px,4vw,34px)] font-light">Privacy policy</h2>
        <div className="prose-gz">
          <p>When you submit an enquiry we collect your name, mobile number, the project you asked about and the page you were on. We use these details only to contact you about properties you enquired about. Enquiries are stored in our CRM (Privyr) and may be shared with the property owner or developer to arrange site visits.</p>
          <p>To stop receiving calls or messages, or to ask us to delete your details, call or WhatsApp {SITE.phoneDisplay}.</p>
        </div>
      </section>
    </>
  );
}
