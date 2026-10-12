export const SITE = {
  name: "GoZamindar",
  legalName: "GoZamindar",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://gozamindar.in").replace(/\/$/, ""),
  phone: "+919440912347",
  phoneDisplay: "+91 94409 12347",
  whatsapp: "919440912347",
  city: "Hyderabad",
  region: "Telangana",
  country: "IN",
  tagline: "Landowner share flats & villas in Hyderabad",
  description:
    "GoZamindar sells landowner share flats and villas in West Hyderabad — Kokapet, Neopolis, Financial District, Narsingi, Tellapur, Kollur and more — below builder list price, direct from landowners.",
  logo: { src: "/images/logo.png", width: 1092, height: 192 },
  ogImage: "/images/og.jpg",
} as const;

export const ORG_ID = `${SITE.url}/#organization`;
export const WEBSITE_ID = `${SITE.url}/#website`;

/** Absolute URL with trailing slash for pages (matches next.config trailingSlash + sitemap). */
export const abs = (path = "/") => {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = /\.[a-z0-9]{2,5}$/i.test(p) || p.endsWith("/") ? p : `${p}/`;
  return SITE.url + withSlash;
};

export const telLink = `tel:${SITE.phone}`;
export const waLink = (topic?: string) =>
  `https://wa.me/${SITE.whatsapp}?text=` +
  encodeURIComponent(`Hi GoZamindar, I'm interested in ${topic || "a landowner share property"} in Hyderabad.`);

export const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#area-guides", label: "Locations" },
  { href: "#emi", label: "EMI Calculator" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

/** In-page anchor for a project card (single-page site). */
export const projectAnchor = (slug: string) => `#project-${slug}`;
