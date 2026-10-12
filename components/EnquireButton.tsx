"use client";
import { useEnquiry, EnquiryTarget } from "./EnquiryProvider";

export default function EnquireButton({
  target, className = "btn-olive", children, ariaLabel,
}: { target?: EnquiryTarget; className?: string; children: React.ReactNode; ariaLabel?: string }) {
  const { openEnquiry } = useEnquiry();
  return (
    <button type="button" aria-label={ariaLabel} onClick={() => openEnquiry(target)} className={className}>
      {children}
    </button>
  );
}
