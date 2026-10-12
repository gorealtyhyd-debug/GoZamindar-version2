import { LOCATIONS, projectsIn } from "./locations";
import { getProject, inr, minPsf } from "./projects";
import type { LocalityTile } from "@/components/LocalityStrip";

export const localityTiles = (): LocalityTile[] =>
  LOCATIONS.map((l) => {
    const ps = projectsIn(l);
    const m = minPsf(ps);
    const types = Array.from(new Set(ps.map((p) => p.type)));
    return {
      slug: l.slug,
      name: l.name,
      img: getProject(l.heroProject)?.imgLg || ps[0]?.imgLg || "/images/hero.jpg",
      count: ps.length,
      from: m ? inr(m) : "On request",
      types: types.length > 1 ? "Flats & villas" : types[0] === "Villa" ? "Villas" : "Flats",
    };
  });
