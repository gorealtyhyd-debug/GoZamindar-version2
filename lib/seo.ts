import type { Metadata } from "next";
import { ORG_ID, SITE, WEBSITE_ID, abs } from "./site";
import { LOCATIONS, Location, geoFor, locationForArea } from "./locations";
import { Project, describeProject } from "./projects";
import type { Faq } from "./faqs";

export const PAGE_ID = `${SITE.url}/#webpage`;
const anchor = (id: string) => `${abs("/")}#${id}`;

export function pageMeta({ title, description, path, image, keywords }: { title: string; description: string; path: string; image?: string; keywords?: string[] }): Metadata {
  const url = abs(path);
  const img = image || SITE.ogImage;
  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url, languages: { "en-IN": url, "x-default": url } },
    openGraph: { title, description, url, siteName: SITE.name, type: "website", locale: "en_IN", images: [{ url: img, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

const address = (locality: string = SITE.city, postalCode?: string) => ({
  "@type": "PostalAddress",
  addressLocality: locality,
  addressRegion: SITE.region,
  addressCountry: SITE.country,
  ...(postalCode ? { postalCode } : {}),
});
const geo = (lat: number, lng: number) => ({ "@type": "GeoCoordinates", latitude: lat, longitude: lng });
const placeId = (slug: string) => anchor(`location-${slug}`);

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": ["RealEstateAgent", "LocalBusiness"],
  "@id": ORG_ID,
  name: SITE.name,
  url: abs("/"),
  logo: abs(SITE.logo.src),
  image: abs(SITE.ogImage),
  description: SITE.description,
  slogan: SITE.tagline,
  telephone: SITE.phone,
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  address: address(),
  geo: geo(17.385, 78.4867),
  hasMap: "https://www.google.com/maps/search/?api=1&query=Kokapet+Hyderabad",
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], opens: "09:00", closes: "20:00" }],
  areaServed: [{ "@type": "City", name: "Hyderabad" }, ...LOCATIONS.map((l) => ({ "@id": placeId(l.slug) }))],
  knowsAbout: ["Landowner share flats", "Joint development agreement (JDA) property", "Hyderabad real estate", "West Hyderabad apartments", "Gated villa communities", "Home loans", "RERA Telangana"],
  knowsLanguage: ["en", "te", "hi"],
  contactPoint: { "@type": "ContactPoint", telephone: SITE.phone, contactType: "sales", areaServed: "IN", availableLanguage: ["English", "Telugu", "Hindi"] },
  sameAs: [`https://wa.me/${SITE.whatsapp}`],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: abs("/"),
  name: SITE.name,
  alternateName: ["Go Zamindar", "GoZamindar Hyderabad"],
  description: SITE.description,
  inLanguage: "en-IN",
  publisher: { "@id": ORG_ID },
});

/** WebPage node — speakable sections help voice assistants & AI answer engines quote the right text. */
export const webPageLd = (name: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": ["WebPage", "CollectionPage"],
  "@id": PAGE_ID,
  url: abs("/"),
  name,
  description,
  inLanguage: "en-IN",
  isPartOf: { "@id": WEBSITE_ID },
  about: { "@id": ORG_ID },
  primaryImageOfPage: abs("/images/hero.jpg"),
  dateModified: new Date().toISOString(),
  breadcrumb: breadcrumbLd([{ name: "Home", path: "/" }]),
  speakable: { "@type": "SpeakableSpecification", cssSelector: ["#how-title", "#how-summary", "#faq .faq-answer", ".loc-summary"] },
  mainEntity: { "@id": anchor("projects-list") },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": anchor("faq"),
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

export const projectLd = (p: Project) => {
  const loc = locationForArea(p.area);
  const g = loc ? geoFor(loc.slug) : null;
  return {
    "@type": "RealEstateListing",
    "@id": anchor(`project-${p.slug}`),
    url: anchor(`project-${p.slug}`),
    name: `${p.name} — landowner share ${p.bhk} ${p.type === "Villa" ? "villas" : "flats"} in ${p.loc}, Hyderabad`,
    image: abs(p.imgLg),
    description: describeProject(p),
    provider: { "@id": ORG_ID },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@id": ORG_ID },
      ...(p.psf ? { priceSpecification: { "@type": "UnitPriceSpecification", price: p.psf, priceCurrency: "INR", unitText: "sq ft", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "FTK" } } } : {}),
    },
    about: {
      "@type": p.type === "Villa" ? "SingleFamilyResidence" : "Apartment",
      name: p.name,
      numberOfRooms: p.bhk,
      address: address(p.area, g?.pin),
      ...(g ? { geo: geo(g.lat, g.lng) } : {}),
      ...(loc ? { containedInPlace: { "@id": placeId(loc.slug) } } : {}),
    },
  };
};

export const projectsListLd = (projects: Project[]) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": anchor("projects-list"),
  name: "Landowner share flats and villas for sale in West Hyderabad",
  numberOfItems: projects.length,
  itemListOrder: "https://schema.org/ItemListUnordered",
  itemListElement: projects.map((p, i) => ({ "@type": "ListItem", position: i + 1, item: projectLd(p) })),
});

export const placeLd = (l: Location) => {
  const g = geoFor(l.slug);
  return {
    "@type": "Place",
    "@id": placeId(l.slug),
    name: `${l.name}, Hyderabad`,
    url: placeId(l.slug),
    description: l.intro[0],
    address: address(l.name, g.pin),
    geo: geo(g.lat, g.lng),
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.name + ", Hyderabad")}`,
    containedInPlace: { "@type": "City", name: "Hyderabad", containedInPlace: { "@type": "State", name: "Telangana" } },
    ...(g.near.length ? { additionalProperty: { "@type": "PropertyValue", name: "Nearby", value: g.near.join(", ") } } : {}),
  };
};

export const placesLd = () => ({ "@context": "https://schema.org", "@graph": LOCATIONS.map(placeLd) });
