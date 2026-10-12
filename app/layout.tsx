import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { SITE, abs } from "@/lib/site";
import { organizationLd, websiteLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import EnquiryProvider from "@/components/EnquiryProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const jost = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "GoZamindar — Landowner Share Flats & Villas in Hyderabad", template: "%s | GoZamindar" },
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "Real Estate",
  description: SITE.description,
  applicationName: SITE.name,
  keywords: ["landowner share flats Hyderabad", "flats for sale in Kokapet", "Neopolis Kokapet apartments", "Financial District flats", "Narsingi flats", "Tellapur apartments", "Kollur villas", "Hyderabad real estate", "West Hyderabad property"],
  alternates: { canonical: abs("/") },
  openGraph: { type: "website", siteName: SITE.name, locale: "en_IN", url: abs("/"), images: [{ url: SITE.ogImage, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined,
  },
  other: { "geo.region": "IN-TG", "geo.placename": "Kokapet, Narsingi, Financial District, Tellapur, Kollur — Hyderabad", "geo.position": "17.3952;78.3365", ICBM: "17.3952, 78.3365", "content-language": "en-IN" },
};

export const viewport: Viewport = { themeColor: "#FEFBF6", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" dir="ltr" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary" />
        <link rel="preconnect" href="https://www.privyr.com" />
      </head>
      <body>
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-olive focus:px-4 focus:py-2 focus:text-paper">Skip to content</a>
        <EnquiryProvider>
          <Header />
          <main id="main" className="w-full overflow-x-hidden">{children}</main>
          <Footer />
          <StickyCta />
        </EnquiryProvider>
      </body>
    </html>
  );
}
