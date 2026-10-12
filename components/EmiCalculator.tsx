"use client";
import { useMemo, useState } from "react";
import { inr, inrShort } from "@/lib/projects";
import EnquireButton from "./EnquireButton";

function Slider({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void; display: string }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[10px] uppercase tracking-label text-olive-muted">{label}</span>
        <span className="text-xl font-light">{display}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-olive" />
    </label>
  );
}

export default function EmiCalculator({ defaultPrice = 15000000, project }: { defaultPrice?: number; project?: string }) {
  const [price, setPrice] = useState(Math.min(Math.max(defaultPrice, 3000000), 150000000));
  const [down, setDown] = useState(20);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const r = useMemo(() => {
    const P = price * (1 - down / 100);
    const m = rate / 12 / 100;
    const n = years * 12;
    const emi = m === 0 ? P / n : (P * m * Math.pow(1 + m, n)) / (Math.pow(1 + m, n) - 1);
    const total = emi * n;
    return { P, emi, interest: total - P, total, downAmt: price - P };
  }, [price, down, rate, years]);

  const principalPct = Math.round((r.P / r.total) * 100);

  return (
    <div className="grid gap-[clamp(20px,3vw,40px)] border border-olive/20 bg-paper p-[clamp(20px,3vw,36px)] md:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-7">
        <Slider label="Property price" value={price} min={3000000} max={150000000} step={100000} onChange={setPrice} display={inrShort(price)} />
        <Slider label="Down payment" value={down} min={10} max={80} step={5} onChange={setDown} display={`${down}% · ${inrShort(r.downAmt)}`} />
        <Slider label="Interest rate (p.a.)" value={rate} min={6} max={13} step={0.05} onChange={setRate} display={`${rate.toFixed(2)}%`} />
        <Slider label="Loan tenure" value={years} min={5} max={30} step={1} onChange={setYears} display={`${years} years`} />
      </div>
      <div className="flex flex-col justify-between gap-6 bg-olive p-[clamp(20px,3vw,32px)] text-paper">
        <div className="flex flex-col gap-2" aria-live="polite">
          <span className="text-[10px] uppercase tracking-label text-paper/75">Monthly EMI</span>
          <output className="font-serif text-[clamp(44px,5vw,64px)] font-light leading-none">{inr(r.emi)}</output>
        </div>
        <div className="flex h-2 w-full overflow-hidden bg-paper/20" aria-hidden="true">
          <span className="block h-full bg-paper" style={{ width: `${principalPct}%` }} />
        </div>
        <dl className="m-0 grid grid-cols-2 gap-4 text-sm">
          <div><dt className="text-[10px] uppercase tracking-label text-paper/75">Loan amount</dt><dd className="m-0 mt-1 text-lg">{inrShort(r.P)}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-label text-paper/75">Total interest</dt><dd className="m-0 mt-1 text-lg">{inrShort(r.interest)}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-label text-paper/75">Total payable</dt><dd className="m-0 mt-1 text-lg">{inrShort(r.total)}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-label text-paper/75">Principal share</dt><dd className="m-0 mt-1 text-lg">{principalPct}%</dd></div>
        </dl>
        <EnquireButton target={{ name: project, meta: `EMI ${inr(r.emi)} / month on ${inrShort(price)}`, source: "EMI Calculator" }} className="btn-light self-start">
          Get loan &amp; price assistance
        </EnquireButton>
      </div>
    </div>
  );
}
