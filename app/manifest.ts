import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GoZamindar — Landowner Share Homes, Hyderabad",
    short_name: "GoZamindar",
    start_url: "/",
    display: "standalone",
    background_color: "#FEFBF6",
    theme_color: "#4B4D39",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
