export type Faq = { q: string; a: string };

export const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: "Landowner share basics",
    items: [
      { q: "What is a landowner share flat?", a: "When a builder develops land under a development agreement (JDA), the landowner is paid with a fixed share of the finished flats or villas instead of cash. These units are the 'landowner share'. They are in the same towers, with the same specifications, as the builder's units." },
      { q: "Why are landowner share flats cheaper than builder flats?", a: "Landowners usually want to sell their units quickly and don't carry the builder's marketing costs, so they typically price below the builder's list price." },
      { q: "Is the quality or specification any different?", a: "No. Landowner units are part of the same project, built to the same specifications, and share the same amenities as the builder's units." },
      { q: "What do OTP and PLC mean in your prices?", a: "OTP is one-time payment — paying the full amount upfront, usually at a lower rate. PLC is preferential location charges, added for premium floors, corners or views." },
    ],
  },
  {
    title: "Buying, loans & documents",
    items: [
      { q: "Is it safe to buy a landowner share unit?", a: "Yes, when the paperwork is clear. Verify the development agreement and supplementary agreement that lists the landowner's units, title and link documents, encumbrance certificate, RERA registration and building approvals, and register the sale deed. GoZamindar helps you through each step." },
      { q: "Can I get a home loan for a landowner share flat?", a: "In most RERA-registered, bank-approved projects, yes. Loan eligibility depends on the bank's approval of the project and your profile. Many listings also offer a lower one-time payment rate." },
      { q: "Which documents should I check before booking?", a: "Development agreement, supplementary/allotment agreement, title and link documents, encumbrance certificate, RERA registration, HMDA/GHMC building approvals, and the occupancy certificate (OC) for ready-to-move homes." },
      { q: "Are the prices on the website final?", a: "Prices are indicative and change with availability, floor and payment plan. Call or WhatsApp +91 94409 12347 for today's best price." },
    ],
  },
  {
    title: "Working with GoZamindar",
    items: [
      { q: "Which areas of Hyderabad do you cover?", a: "West Hyderabad — Kokapet, Neopolis, Financial District, Narsingi, Puppalguda, Gachibowli, Tellapur, Osman Nagar, Kollur, Velimela and Shaikpet." },
      { q: "How do I book a site visit?", a: "Tap 'Enquire now' on any project, call +91 94409 12347 or message us on WhatsApp. We'll arrange a visit at a time that suits you." },
      { q: "Do you have ready-to-move homes?", a: "Yes. Filter by 'Ready to move' on the projects page to see homes with possession available now." },
    ],
  },
];

export const ALL_FAQS: Faq[] = FAQ_GROUPS.flatMap((g) => g.items);
