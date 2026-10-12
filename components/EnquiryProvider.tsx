"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import EnquiryForm from "./EnquiryForm";

export type EnquiryTarget = { name?: string; loc?: string; meta?: string; source?: string };
const Ctx = createContext<{ openEnquiry: (t?: EnquiryTarget) => void } | null>(null);

export const useEnquiry = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return c;
};

export default function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const [target, setTarget] = useState<EnquiryTarget | null>(null);
  const [key, setKey] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);

  const openEnquiry = useCallback((t: EnquiryTarget = {}) => { setTarget(t); setKey((k) => k + 1); }, []);
  const close = useCallback(() => setTarget(null), []);

  useEffect(() => {
    if (!target) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.querySelector<HTMLInputElement>("input")?.focus();
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [target, close]);

  return (
    <Ctx.Provider value={{ openEnquiry }}>
      {children}
      {target && (
        <div onClick={close} className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/60 p-[clamp(12px,4vw,40px)] backdrop-blur-sm">
          <div
            ref={dialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enq-title"
            className="relative max-h-[92vh] w-full max-w-[520px] animate-pop overflow-y-auto border border-olive/25 bg-paper p-[clamp(22px,4vw,40px)]"
          >
            <button onClick={close} aria-label="Close" className="absolute right-3.5 top-3.5 h-[38px] w-[38px] rounded-full border border-olive/30 text-base hover:bg-olive hover:text-paper">✕</button>
            <div className="mb-6 flex flex-col gap-1.5 border-b border-olive/20 pb-5 pr-11">
              <span className="text-[10px] uppercase tracking-[0.3em] text-olive-muted">{target.loc || "GoZamindar · Enquiry"}</span>
              <span id="enq-title" className="font-serif text-[34px] leading-[1.05]">{target.name || "Talk to our team"}</span>
              <span className="text-[13px] text-olive-muted">{target.meta || "Share your details and we’ll send current landowner units and prices."}</span>
            </div>
            <EnquiryForm key={key} project={target.name} location={target.loc} source={target.source || "Website Enquiry Popup"} onClose={close} />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
