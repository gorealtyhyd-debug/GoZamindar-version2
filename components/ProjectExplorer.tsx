"use client";
import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

type TypeFilter = "All" | "Flat" | "Villa";
type Sort = "featured" | "low" | "high";

export default function ProjectExplorer({ projects, showAreaTabs = true }: { projects: Project[]; showAreaTabs?: boolean }) {
  const [area, setArea] = useState("All");
  const [type, setType] = useState<TypeFilter>("All");
  const [readyOnly, setReadyOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("featured");

  const areas = useMemo(() => Array.from(new Set(projects.map((p) => p.area))), [projects]);
  const byType = useMemo(() => projects.filter((p) => (type === "All" || p.type === type) && (!readyOnly || p.ready)), [projects, type, readyOnly]);
  const list = useMemo(() => {
    const l = byType.filter((p) => area === "All" || p.area === area);
    if (sort === "featured") return l;
    const d = sort === "low" ? 1 : -1;
    return [...l].sort((a, b) => Number(a.psf == null) - Number(b.psf == null) || d * ((a.psf ?? 0) - (b.psf ?? 0)));
  }, [byType, area, sort]);

  const hasVillas = projects.some((p) => p.type === "Villa");

  return (
    <div>
      {showAreaTabs && areas.length > 1 && (
        <div className="no-scrollbar -mx-[clamp(20px,5vw,72px)] mb-3.5 flex gap-2.5 overflow-x-auto px-[clamp(20px,5vw,72px)] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="tablist" aria-label="Filter by locality">
          {["All", ...areas].map((a) => {
            const on = area === a;
            const count = a === "All" ? byType.length : byType.filter((p) => p.area === a).length;
            return (
              <button key={a} role="tab" aria-selected={on} onClick={() => setArea(a)} className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-[11px] sm:px-5 text-xs uppercase tracking-[0.16em] transition-colors ${on ? "border-olive bg-olive text-paper" : "border-olive/30 text-olive hover:border-olive"}`}>
                {a === "All" ? "All localities" : a} <span className="ml-1 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
      )}

      <div className="mb-7 flex flex-wrap items-center gap-2.5 border-b border-olive/20 pb-7">
        {hasVillas && ([["All", "Flats & villas"], ["Flat", "Flats"], ["Villa", "Villas"]] as [TypeFilter, string][]).map(([k, l]) => (
          <button key={k} aria-pressed={type === k} onClick={() => setType(k)} className={`mr-3.5 whitespace-nowrap border-b px-0.5 py-2 text-xs uppercase tracking-[0.18em] ${type === k ? "border-olive text-olive" : "border-transparent text-olive-muted"}`}>{l}</button>
        ))}
        <button aria-pressed={readyOnly} onClick={() => setReadyOnly(!readyOnly)} className={`whitespace-nowrap border-b px-0.5 py-2 text-xs uppercase tracking-[0.18em] ${readyOnly ? "border-olive text-olive" : "border-transparent text-olive-muted"}`}>Ready to move only</button>
        <label className="w-full sm:ml-auto sm:w-auto">
          <span className="sr-only">Sort projects</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="w-full cursor-pointer rounded-full border border-olive/30 bg-paper px-4 py-2.5 sm:w-auto text-xs uppercase tracking-[0.12em] text-olive">
            <option value="featured">Sort · Featured</option>
            <option value="low">Price / sft · Low to high</option>
            <option value="high">Price / sft · High to low</option>
          </select>
        </label>
      </div>

      <p className="sr-only" aria-live="polite">{list.length} projects shown</p>

      {list.length === 0 ? (
        <div className="flex flex-col items-center gap-3.5 border border-olive/25 bg-paper px-6 py-14 text-center">
          <span className="font-serif text-[32px]">Nothing listed here right now.</span>
          <span className="text-sm text-olive-muted">New landowner units come up every week — call and we’ll tell you first.</span>
          <button onClick={() => { setArea("All"); setType("All"); setReadyOnly(false); }} className="btn-outline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(24px,2.6vw,36px)]">
          {list.map((p) => <ProjectCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}
