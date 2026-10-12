import { PROJECTS, Project } from "./projects";

export interface Location {
  slug: string;
  name: string;
  areas: string[];
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  highlights: string[];
  heroProject: string;
  faqs: { q: string; a: string }[];
}

export const LOCATIONS: Location[] = [
  {
    slug: "kokapet",
    name: "Kokapet",
    areas: ["Kokapet"],
    h1: "Landowner share flats in Kokapet, Hyderabad",
    metaTitle: "Flats for Sale in Kokapet – Landowner Share Below Builder Price",
    metaDescription: "Buy 2, 3 & 4 BHK landowner share flats in Kokapet, Hyderabad below builder list price. My Home APAS, Rajpushpa Prestinia, Evania and more. Call 94409 12347.",
    intro: [
      "Kokapet is West Hyderabad's premium high-rise corridor, sitting on the Outer Ring Road beside Narsingi, Gandipet and the Financial District.",
      "It is home to the HMDA Neopolis layout and a cluster of gated towers from leading developers. GoZamindar lists the landowner's share of units in these projects — the same buildings, sold direct and typically below the builder's list price.",
    ],
    highlights: ["Direct Outer Ring Road access", "Minutes to the Financial District and Gachibowli IT hubs", "Neopolis high-rise layout", "Premium gated communities with large-format homes"],
    heroProject: "evania-kokapet",
    faqs: [
      { q: "Why buy a flat in Kokapet?", a: "Kokapet offers ORR connectivity, proximity to the Financial District and Gachibowli offices, and some of Hyderabad's newest gated high-rise communities." },
      { q: "What is the price per sft in Kokapet?", a: "Current landowner share listings in Kokapet start from the lowest rate shown on this page. Rates vary by project, floor and payment plan." },
    ],
  },
  {
    slug: "neopolis",
    name: "Neopolis",
    areas: ["Kokapet"],
    h1: "Neopolis, Kokapet — landowner share apartments",
    metaTitle: "Neopolis Kokapet Flats – Landowner Share Apartments Hyderabad",
    metaDescription: "Explore landowner share apartments in and around Neopolis, Kokapet — Hyderabad's HMDA high-rise layout. Below-list pricing, direct from landowners. Call 94409 12347.",
    intro: [
      "Neopolis is the HMDA-planned high-rise layout in Kokapet, designed for tall mixed-use and residential towers with wide internal roads.",
      "Projects in and around Neopolis are among the most sought-after addresses in West Hyderabad. GoZamindar tracks landowner units here so you can buy into the same towers below the builder's list price.",
    ],
    highlights: ["Planned HMDA high-rise layout", "Wide internal roads and ORR access", "Close to Financial District offices", "Luxury large-format apartments"],
    heroProject: "my-home-apas-kokapet",
    faqs: [
      { q: "Where is Neopolis in Hyderabad?", a: "Neopolis is in Kokapet, West Hyderabad, next to the Outer Ring Road and close to Narsingi, Gandipet and the Financial District." },
      { q: "Can I buy a landowner share unit near Neopolis?", a: "Yes. The Kokapet projects listed on this page are in the Neopolis corridor. Call or WhatsApp us for current availability." },
    ],
  },
  {
    slug: "financial-district",
    name: "Financial District",
    areas: ["Financial District"],
    h1: "Landowner share flats in Financial District, Hyderabad",
    metaTitle: "Flats in Financial District Hyderabad – Landowner Share Prices",
    metaDescription: "3 & 4 BHK landowner share apartments in Financial District (Nanakramguda), Hyderabad — Sunshine Destino, Raghava Cinq, Srivaraha Aurum. Call 94409 12347.",
    intro: [
      "The Financial District around Nanakramguda is Hyderabad's largest office cluster, home to global technology and financial companies.",
      "Living here means a walk or a short drive to work. GoZamindar offers landowner share units in the district's premium towers, including ready-to-move options.",
    ],
    highlights: ["Walk-to-work from major IT campuses", "ORR and Gachibowli connectivity", "Ready-to-move options with OC", "Premium 3 & 4 BHK towers"],
    heroProject: "sunshine-destino-financial-district",
    faqs: [
      { q: "Are there ready-to-move flats in Financial District?", a: "Yes — listings marked 'Ready to move' on this page have possession available now." },
      { q: "Is Financial District good for investment?", a: "Its concentration of offices keeps rental demand steady. Always compare price, possession and documentation before you decide." },
    ],
  },
  {
    slug: "narsingi",
    name: "Narsingi",
    areas: ["Narsingi"],
    h1: "Landowner share flats & villas in Narsingi, Hyderabad",
    metaTitle: "Flats & Villas in Narsingi Hyderabad – Landowner Share Deals",
    metaDescription: "Landowner share flats and villas in Narsingi — Aparna Zenon, Rajpushpa Provincia, Vasavi Atlantis, Moonglade, Sriven IRIS. Below builder price. Call 94409 12347.",
    intro: [
      "Narsingi sits at the Outer Ring Road junction between Kokapet, Puppalguda and Gandipet, making it one of the best-connected residential pockets in West Hyderabad.",
      "It combines ready-to-move towers, under-construction launches and luxury villas — and landowner units here give you an entry below the builder's list price.",
    ],
    highlights: ["ORR junction location", "Mix of ready and under-construction projects", "Luxury villa options", "Close to Kokapet and the Financial District"],
    heroProject: "rajpushpa-provincia-narsingi",
    faqs: [
      { q: "Which projects in Narsingi are ready to move?", a: "Listings marked 'Ready to move' on this page — such as Aparna Zenon Phase 1 and Rajpushpa Provincia Phase 1 — are available for immediate possession." },
      { q: "Are there villas in Narsingi?", a: "Yes, Narsingi has premium villa communities. See the villa listings on this page." },
    ],
  },
  {
    slug: "tellapur",
    name: "Tellapur",
    areas: ["Tellapur"],
    h1: "Landowner share flats in Tellapur & Osman Nagar",
    metaTitle: "Flats in Tellapur Hyderabad – Landowner Share Below List Price",
    metaDescription: "2 & 3 BHK landowner share flats in Tellapur and Osman Nagar — Aparna Cyber Shine, Altitude, Anvitha High9. Value pricing in West Hyderabad. Call 94409 12347.",
    intro: [
      "Tellapur and Osman Nagar form a fast-growing residential belt west of Nallagandla and Gachibowli, anchored by large gated townships.",
      "Prices per sft here are more accessible than Kokapet or the Financial District, and landowner units bring the entry cost down further.",
    ],
    highlights: ["Value pricing per sft", "Large gated townships", "Close to Nallagandla and Gachibowli", "Good schools and hospitals nearby"],
    heroProject: "aparna-cyber-shine-cyber-star-tellapur",
    faqs: [
      { q: "Is Tellapur a good place to buy a flat?", a: "Tellapur suits buyers who want gated-community living at lower per-sft rates while staying within reach of the western IT corridor." },
      { q: "What is the starting price in Tellapur?", a: "See the 'From / sft' figure on this page for the current lowest landowner share rate." },
    ],
  },
  {
    slug: "kollur",
    name: "Kollur",
    areas: ["Kollur"],
    h1: "Landowner share flats & villas in Kollur, Hyderabad",
    metaTitle: "Flats & Villas in Kollur Hyderabad – ORR Exit 2 Landowner Share",
    metaDescription: "Affordable landowner share flats and 4 BHK villas in Kollur near ORR Exit 2 — Project K2, Anvitha Ivana, Vajra West City, Elegans Homes. Call 94409 12347.",
    intro: [
      "Kollur, around ORR Exit 2, is West Hyderabad's value corridor — with some of the lowest per-sft entry prices near the Outer Ring Road.",
      "It has a growing mix of high-rise apartments and gated villa communities, several available as landowner share units.",
    ],
    highlights: ["Near ORR Exit 2", "Lowest entry price per sft in the corridor", "Gated villa communities", "Next to Tellapur and Velimela"],
    heroProject: "elegans-homes-villas-kollur",
    faqs: [
      { q: "Why is Kollur cheaper than Kokapet?", a: "Kollur is further along the ORR from the core IT hubs, so land and per-sft prices are lower — making it popular with first-time buyers and villa seekers." },
      { q: "Are there ready villas in Kollur?", a: "Yes — villa listings marked 'Ready to move' on this page are available now." },
    ],
  },
  {
    slug: "puppalguda",
    name: "Puppalguda",
    areas: ["Puppalguda"],
    h1: "Landowner share flats in Puppalguda, Hyderabad",
    metaTitle: "Flats in Puppalguda Hyderabad – Landowner Share Apartments",
    metaDescription: "Landowner share 2, 3 & 4 BHK apartments in Puppalguda between Narsingi and Financial District — Vue Residences, SRIAS IWA. Call 94409 12347.",
    intro: [
      "Puppalguda lies between Narsingi and the Financial District, giving residents short commutes to the western office hubs.",
      "Landowner share units here include ready-to-move and under-construction towers.",
    ],
    highlights: ["Between Narsingi and Financial District", "Short commute to IT offices", "Ready and under-construction options"],
    heroProject: "vue-residences-puppalguda",
    faqs: [{ q: "How far is Puppalguda from the Financial District?", a: "Puppalguda borders the Financial District, typically a short drive depending on traffic." }],
  },
  {
    slug: "gachibowli",
    name: "Gachibowli",
    areas: ["Gachibowli"],
    h1: "Luxury landowner share apartments in Gachibowli & Raidurgam",
    metaTitle: "Luxury Flats in Gachibowli & Raidurgam – Landowner Share",
    metaDescription: "Ultra-luxury 4 & 6 BHK landowner share apartments in Raidurgam, Gachibowli — Raghava IRIS. Direct from landowners. Call 94409 12347.",
    intro: [
      "Gachibowli and Raidurgam sit at the heart of Hyderabad's IT corridor, next to HITEC City.",
      "Landowner units here are rare and typically large-format luxury residences.",
    ],
    highlights: ["Next to HITEC City", "Ultra-luxury large-format homes", "Established social infrastructure"],
    heroProject: "raghava-iris-gachibowli",
    faqs: [{ q: "Are there landowner share flats in Gachibowli?", a: "Yes, availability is limited. See the listings on this page or call for new units." }],
  },
  {
    slug: "shaikpet",
    name: "Shaikpet",
    areas: ["Shaikpet"],
    h1: "Landowner share apartments in Shaikpet, Hyderabad",
    metaTitle: "Flats in Shaikpet Hyderabad – Ready Landowner Share Apartments",
    metaDescription: "Ready-to-move landowner share 3 & 4 BHK apartments in Shaikpet near Jubilee Hills — Aparna One. Call 94409 12347.",
    intro: [
      "Shaikpet connects the established neighbourhoods of Jubilee Hills and Banjara Hills with the western IT corridor.",
      "It offers central-city living in modern towers, with ready landowner units available.",
    ],
    highlights: ["Near Jubilee Hills and Banjara Hills", "Central-city convenience", "Ready-to-move luxury towers"],
    heroProject: "aparna-one-shaikpet",
    faqs: [{ q: "Is Aparna One in Shaikpet ready to move?", a: "Yes, Aparna One is listed as ready. Call for current landowner unit availability." }],
  },
];

export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
export const projectsIn = (l: Location): Project[] => PROJECTS.filter((p) => l.areas.includes(p.area));
/** Primary (non-alias) location page for a project's area. */
export const locationForArea = (area: string) => LOCATIONS.find((l) => l.areas.includes(area) && l.slug !== "neopolis");

/** Approximate locality centroids (WGS84) for GEO / schema.org GeoCoordinates. */
export const GEO: Record<string, { lat: number; lng: number; pin: string; near: string[] }> = {
  kokapet: { lat: 17.3952, lng: 78.3365, pin: "500075", near: ["Narsingi", "Gandipet", "Financial District", "Neopolis"] },
  neopolis: { lat: 17.4033, lng: 78.3247, pin: "500075", near: ["Kokapet", "Financial District", "Gandipet"] },
  "financial-district": { lat: 17.4167, lng: 78.3436, pin: "500032", near: ["Nanakramguda", "Gachibowli", "Kokapet", "Puppalguda"] },
  narsingi: { lat: 17.388, lng: 78.356, pin: "500089", near: ["Kokapet", "Puppalguda", "Manikonda", "Gandipet"] },
  tellapur: { lat: 17.4625, lng: 78.286, pin: "502032", near: ["Osman Nagar", "Nallagandla", "Kollur", "Gachibowli"] },
  kollur: { lat: 17.471, lng: 78.235, pin: "502300", near: ["Velimela", "Tellapur", "Osman Nagar", "ORR Exit 2"] },
  puppalguda: { lat: 17.401, lng: 78.372, pin: "500089", near: ["Narsingi", "Financial District", "Manikonda"] },
  gachibowli: { lat: 17.4401, lng: 78.3489, pin: "500032", near: ["Raidurgam", "HITEC City", "Financial District"] },
  shaikpet: { lat: 17.406, lng: 78.41, pin: "500008", near: ["Jubilee Hills", "Banjara Hills", "Tolichowki"] },
};
export const geoFor = (slug: string) => GEO[slug] || { lat: 17.385, lng: 78.4867, pin: "", near: [] };
export const LOCATION_FAQS = LOCATIONS.flatMap((l) => l.faqs);
