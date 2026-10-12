import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

// Single-page site: one URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: abs("/"), lastModified: new Date(), changeFrequency: "daily", priority: 1 }];
}
