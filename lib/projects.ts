import raw from "@/data/projects.json";

export type ProjectType = "Flat" | "Villa";
export interface Project {
  slug: string;
  name: string;
  loc: string;
  area: string;
  type: ProjectType;
  bhk: string;
  size: string;
  poss: string;
  price: string;
  unit: string;
  psf: number | null;
  pay: string;
  ready: boolean;
  img: string;
  imgLg: string;
  /** Market (builder list) price, e.g. "₹12,500 / sft" — optional */
  mkt?: string | null;
}

/** wix → downloaded by scripts/fetch-images.mjs; photo → your own file in /public (e.g. "/images/projects/raghava-linq.jpg"); neither → placeholder */
type RawProject = Omit<Project, "img" | "imgLg" | "type"> & { type: string; wix?: string; photo?: string; visible?: boolean };

export const PLACEHOLDER_IMG = "/images/placeholder.png";
export const PROJECTS: Project[] = (raw as RawProject[]).filter((p) => p.visible !== false).map(({ wix, photo, visible: _v, ...p }) => ({
  ...p,
  type: p.type === "Villa" ? "Villa" : "Flat",
  img: photo || (wix ? `/images/projects/${p.slug}.jpg` : PLACEHOLDER_IMG),
  imgLg: photo || (wix ? `/images/projects/${p.slug}-lg.jpg` : PLACEHOLDER_IMG),
}));

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);
export const READY = PROJECTS.filter((p) => p.ready);
export const AREAS = Array.from(new Set(PROJECTS.map((p) => p.area)));
export const areaSlug = (a: string) => a.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");
export const inrShort = (n: number) =>
  n >= 1e7 ? `₹${(n / 1e7).toFixed(2).replace(/\.?0+$/, "")} Cr` : n >= 1e5 ? `₹${(n / 1e5).toFixed(1).replace(/\.0$/, "")} L` : inr(n);

export const minPsf = (list: Project[]) => {
  const v = list.map((p) => p.psf).filter((x): x is number => x != null);
  return v.length ? Math.min(...v) : null;
};

export const statusLabel = (p: Project) => (p.ready ? "Ready to move" : `Possession · ${p.poss}`);
export const typeLabel = (p: Project) => (p.type === "Villa" ? "Villas" : "Apartments");

/** Rough entry ticket used to pre-fill the EMI calculator. */
export function estimatePrice(p: Project): number | null {
  const cr = p.price.match(/₹\s*([\d.]+)(?:\s*[–-]\s*[\d.]+)?\s*Cr/i);
  if (cr) return parseFloat(cr[1]) * 1e7;
  const sft = p.size.includes("sft") ? parseInt(p.size.replace(/,/g, "").match(/\d+/)?.[0] || "", 10) : NaN;
  if (p.psf && sft) return p.psf * sft;
  return null;
}

export function describeProject(p: Project) {
  const kind = p.type === "Villa" ? "gated villa community" : "residential apartment project";
  return `${p.name} is a ${kind} in ${p.loc}, West Hyderabad, with ${p.bhk} homes of ${p.size}. GoZamindar offers the landowner's share of units here${/₹/.test(p.price) ? ` at ${p.price} ${p.unit}` : ""} — typically below the builder's list price for the same building and specifications. Possession: ${p.poss}. Payment: ${p.pay}.`;
}

export function projectFaqs(p: Project) {
  const priceA = p.psf || /₹/.test(p.price)
    ? `Landowner share units at ${p.name} are currently offered at ${p.price} ${p.unit}. Prices are indicative and change with availability — call +91 94409 12347 for today's best price.`
    : `Landowner share prices at ${p.name} are shared on request because they change with floor, facing and availability. Call or WhatsApp +91 94409 12347 for today's best price.`;
  return [
    { q: `What is the price of ${p.name}?`, a: priceA },
    { q: `What sizes and configurations are available at ${p.name}?`, a: `${p.name} offers ${p.bhk} with sizes of ${p.size}.` },
    { q: `When is possession for ${p.name}?`, a: p.ready ? `${p.name} is ready to move (${p.poss}).` : `Expected possession for ${p.name} is ${p.poss}.` },
    { q: `What payment options are available?`, a: `${p.pay}. GoZamindar can also connect you with banks for a home loan where the project is loan-approved.` },
    { q: `Why is the landowner share cheaper than the builder price?`, a: `The landowner received these units in exchange for the land under a development agreement. Landowners typically sell faster and below the builder's list price — same tower, same specifications.` },
  ];
}

