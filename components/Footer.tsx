import Image from "next/image";
import { LOCATIONS } from "@/lib/locations";
import { PROJECTS } from "@/lib/projects";
import { SITE, telLink, waLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="section-x border-t border-olive/15 bg-sand pb-24 pt-[clamp(40px,5vw,72px)] md:pb-10">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Image src={SITE.logo.src} alt="GoZamindar" width={SITE.logo.width} height={SITE.logo.height} className="h-8 w-auto self-start" />
          <p className="m-0 max-w-[36ch] text-[13px] leading-[1.75] text-olive-muted">{SITE.description}</p>
          <address className="flex flex-col gap-1.5 text-[13px] not-italic">
            <span>Hyderabad, Telangana, India</span>
            <a href={telLink}>{SITE.phoneDisplay}</a>
            <a href={waLink()} target="_blank" rel="noopener">WhatsApp us ↗</a>
          </address>
        </div>
        <FooterCol title="Locations" links={LOCATIONS.map((l) => ({ href: `#location-${l.slug}`, label: `Flats in ${l.name}` }))} />
        <FooterCol title="Popular projects" links={PROJECTS.slice(0, 12).map((p) => ({ href: `#project-${p.slug}`, label: p.name }))} />
        <FooterCol
          title="Resources"
          links={[
            { href: "#projects", label: "All projects" },
            { href: "#emi", label: "Home loan EMI calculator" },
            { href: "#faq", label: "Landowner share FAQ" },
            { href: "#about", label: "About GoZamindar" },
            { href: "#contact", label: "Contact" },
            { href: "#privacy", label: "Privacy policy" },
          ]}
        />
      </div>
      <p className="mt-10 max-w-[90ch] text-[12px] leading-[1.75] text-olive-muted">
        Prices, sizes and possession timelines are indicative and change with availability. Please verify all details, approvals and documents before booking. Images courtesy of respective developers.
      </p>
      <div className="mt-6 flex flex-wrap justify-between gap-4 border-t border-olive/15 pt-5 text-[11px] uppercase tracking-[0.18em] text-olive-muted">
        <span>© {new Date().getFullYear()} GoZamindar · gozamindar.in</span>
        <span>Real estate in West Hyderabad</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-[0.26em] text-olive-muted">{title}</span>
      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[13px]">
        {links.map((l) => <li key={l.label}><a href={l.href} className="hover:underline">{l.label}</a></li>)}
      </ul>
    </nav>
  );
}
