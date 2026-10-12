"use client";
import { useState } from "react";
import { isValidIndianMobile, submitLeadToPrivyr } from "@/lib/lead";
import { PROJECTS } from "@/lib/projects";
import { telLink, waLink } from "@/lib/site";

const labelCls = "flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-muted";
const fieldCls =
  "w-full border border-olive/30 bg-paper px-3.5 py-[13px] text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive";
const pillOutline =
  "flex-1 rounded-full border border-olive/40 p-[13px] text-center text-[11px] uppercase tracking-[0.2em] hover:bg-olive hover:text-paper";

export default function EnquiryForm({
  project, location, source = "GoZamindar Website", onClose,
}: { project?: string; location?: string; source?: string; onClose?: () => void }) {
  const [f, setF] = useState({ name: "", phone: "", project: project || "", company: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (f.company) { setState("done"); return; } // spam honeypot
    if (!isValidIndianMobile(f.phone)) { setState("error"); setMsg("Please enter a valid 10-digit mobile number."); return; }
    setState("sending");
    const res = await submitLeadToPrivyr({ name: f.name, phone: f.phone, project: f.project || undefined, location, source });
    setMsg(res.message);
    setState(res.success ? "done" : "error");
  };

  if (state === "done") {
    return (
      <div className="flex flex-col gap-[18px]" role="status">
        <div className="border border-olive/25 bg-[#F4F0E6] p-[22px] text-sm leading-[1.7]">
          Thank you{f.name ? `, ${f.name}` : ""} — we’ll call you on {f.phone} within one working day.
        </div>
        {onClose && (
          <button type="button" onClick={onClose} className="self-start rounded-full bg-olive px-7 py-[15px] text-xs uppercase tracking-[0.2em] text-paper">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
      <label className={labelCls}>Name
        <input type="text" required name="name" autoComplete="name" placeholder="Your full name" className={fieldCls} value={f.name} onChange={set("name")} />
      </label>
      <label className={labelCls}>Phone number
        <input type="tel" required name="phone" inputMode="tel" autoComplete="tel" placeholder="+91 00000 00000" className={fieldCls} value={f.phone} onChange={set("phone")} />
      </label>
      <label className={labelCls}>Project
        <select className={fieldCls} value={f.project} onChange={set("project")}>
          <option value="">Not decided yet</option>
          {PROJECTS.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
        </select>
      </label>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" value={f.company} onChange={set("company")} className="absolute -left-[9999px] h-0 w-0 opacity-0" aria-hidden="true" />

      {state === "error" && <p role="alert" className="m-0 border-l-2 border-brand-red bg-brand-red/5 px-3 py-2 text-[13px] text-[#9b1015]">{msg}</p>}

      <button type="submit" disabled={state === "sending"} className="mt-2 rounded-full bg-olive px-7 py-4 text-xs uppercase tracking-[0.2em] text-paper hover:bg-[#383A2A] disabled:cursor-wait disabled:opacity-70">
        {state === "sending" ? "Sending…" : "Send me the best price"}
      </button>
      <div className="flex flex-wrap gap-2.5">
        <a href={telLink} className={pillOutline}>Call now</a>
        <a href={waLink(f.project || project)} target="_blank" rel="noopener" className={pillOutline}>WhatsApp</a>
      </div>
    </form>
  );
}
