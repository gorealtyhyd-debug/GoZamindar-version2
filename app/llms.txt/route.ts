import { PROJECTS } from "@/lib/projects";
import { LOCATIONS, projectsIn, geoFor } from "@/lib/locations";
import { inr, minPsf } from "@/lib/projects";
import { ALL_FAQS } from "@/lib/faqs";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-static";

/** llms.txt — concise, factual site summary for AI search engines (GEO). */
export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `Phone / WhatsApp: ${SITE.phoneDisplay}`,
    `Service area: West Hyderabad, Telangana, India`,
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    `Website: ${abs("/")}`,
    "",
    "## What is a landowner share?",
    ALL_FAQS[0].a,
    "",
    "## Locations",
    ...LOCATIONS.flatMap((l) => {
      const ps = projectsIn(l), m = minPsf(ps), g = geoFor(l.slug);
      return [
        `### [${l.name}, Hyderabad](${abs("/")}#location-${l.slug})`,
        l.intro.join(" "),
        `- Projects: ${ps.length}${m ? ` · landowner rates from ${inr(m)}/sft` : ""}`,
        `- Coordinates: ${g.lat}, ${g.lng}${g.pin ? ` · PIN ${g.pin}` : ""}${g.near.length ? ` · near ${g.near.join(", ")}` : ""}`,
        `- Highlights: ${l.highlights.join("; ")}`,
        ...l.faqs.map((f) => `- Q: ${f.q} A: ${f.a}`),
        "",
      ];
    }),
    "",
    "## Projects",
    ...PROJECTS.map((p) => `- [${p.name}](${abs("/")}#project-${p.slug}) — ${p.loc}; ${p.bhk}; ${p.size}; ${p.price} ${p.unit}; possession ${p.poss}; ${p.pay}`),
    "",
    "## FAQ",
    ...ALL_FAQS.map((f) => `- **${f.q}** ${f.a}`),
    "",
    "## Tools",
    `- [Home loan EMI calculator](${abs("/")}#emi)`,
    "",
    "Prices are indicative and change with availability.",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
