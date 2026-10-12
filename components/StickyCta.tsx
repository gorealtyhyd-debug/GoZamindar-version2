import { telLink, waLink } from "@/lib/site";
import EnquireButton from "./EnquireButton";

export default function StickyCta() {
  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-olive/20 bg-paper/95 backdrop-blur md:hidden">
        <a href={telLink} className="flex h-14 items-center justify-center text-[11px] uppercase tracking-[0.18em]">Call</a>
        <a href={waLink()} target="_blank" rel="noopener" className="flex h-14 items-center justify-center border-x border-olive/15 text-[11px] uppercase tracking-[0.18em]">WhatsApp</a>
        <EnquireButton target={{ source: "Mobile Sticky Bar" }} className="flex h-14 items-center justify-center bg-olive text-[11px] uppercase tracking-[0.18em] text-paper">Enquire</EnquireButton>
      </div>
      <EnquireButton target={{ source: "Floating Button" }} className="btn-olive fixed bottom-5 right-5 z-30 hidden text-[11px] shadow-[0_12px_30px_-12px_rgba(30,32,22,0.6)] md:inline-flex">
        Enquire now
      </EnquireButton>
    </>
  );
}
