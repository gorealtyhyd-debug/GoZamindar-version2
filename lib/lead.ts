import { SITE } from "./site";

export interface LeadFormData {
  name?: string;
  email?: string;
  phone: string;
  unitType?: string;
  budgetRange?: string;
  message?: string;
  source?: string;
  project?: string;
  location?: string;
  page?: string;
}
export interface LeadSubmitResult {
  success: boolean;
  message: string;
  privyrStatus?: string;
}

// Privyr generic webhook — leads are POSTed straight from the browser (no server script needed).
// "#generic-webhook" is only a URL fragment; browsers never send it, so it is stripped here.
export const DEFAULT_PRIVYR_WEBHOOK_URL = (
  process.env.NEXT_PUBLIC_PRIVYR_WEBHOOK_URL ||
  "https://www.privyr.com/api/v1/incoming-leads/0vZfjMQw/bKY9JFdX#generic-webhook"
).split("#")[0];

export function buildPrivyrPayload(data: LeadFormData) {
  const name = data.name?.trim() || "Anonymous Lead";
  return {
    name,
    display_name: name,
    email: data.email?.trim() || "",
    phone: normalisePhone(data.phone),
    lead_source: data.source || "GoZamindar Website",
    other_fields: {
      Website: "gozamindar.in",
      Project: data.project || "Not decided yet",
      Location: data.location || "West Hyderabad",
      City: "Hyderabad",
      State: "Telangana",
      Message: data.message || "Enquiry from GoZamindar website",
      "Page URL": data.page || (typeof window !== "undefined" ? window.location.href : ""),
    },
  };
}

export function normalisePhone(raw: string) {
  const d = (raw || "").replace(/\D/g, "");
  if (d.length === 10) return `+91${d}`;
  if (d.length === 12 && d.startsWith("91")) return `+${d}`;
  return raw.trim();
}
export const isValidIndianMobile = (raw: string) => /^(?:\+?91)?[6-9]\d{9}$/.test((raw || "").replace(/[\s-]/g, ""));

/**
 * Sends the lead directly to the Privyr CRM webhook (same format as the previous projects).
 */
export async function submitLeadToPrivyr(data: LeadFormData): Promise<LeadSubmitResult> {
  const leadPayload = buildPrivyrPayload(data);
  const body = JSON.stringify(leadPayload);
  let isSuccess = false;

  // 1. Direct POST to the Privyr webhook
  try {
    const directRes = await fetch(DEFAULT_PRIVYR_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    const directText = await directRes.text();
    let directData: { success?: boolean } | null = null;
    try { directData = JSON.parse(directText); } catch { /* non-JSON response */ }
    if (directRes.ok || directData?.success) isSuccess = true;
    else console.error("Privyr rejected the lead:", directRes.status, directText);
  } catch (err) {
    console.warn("Direct Privyr request blocked (network/CORS), retrying as a simple request:", err);
    // 2. Fallback: "simple" no-cors request — the browser cannot read the reply, but Privyr still receives it
    try {
      await fetch(DEFAULT_PRIVYR_WEBHOOK_URL, { method: "POST", mode: "no-cors", body });
      isSuccess = true;
    } catch (directErr) {
      console.error("Direct Privyr submission failed:", directErr);
    }
  }

  if (!isSuccess) {
    return { success: false, message: `Failed to submit enquiry. Please try again or call us on ${SITE.phoneDisplay}.` };
  }

  return { success: true, message: "Thank you! Your enquiry has been received. Our team will contact you shortly.", privyrStatus: "success" };
}
