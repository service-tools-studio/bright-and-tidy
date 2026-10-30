import type { CleaningLeadAttribution } from "@/app/lib/quote";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function conversionEventParams(
  cleaningType?: string,
  attribution?: CleaningLeadAttribution,
) {
  return {
    method: "quote_wizard",
    cleaning_type: cleaningType?.trim() || undefined,
    gclid: attribution?.gclid?.trim() || undefined,
    gbraid: attribution?.gbraid?.trim() || undefined,
    wbraid: attribution?.wbraid?.trim() || undefined,
    campaign: attribution?.utm_campaign?.trim() || undefined,
    source: attribution?.utm_source?.trim() || undefined,
    medium: attribution?.utm_medium?.trim() || undefined,
    landing_page: attribution?.landing_path?.trim() || undefined,
  };
}

/** Fires when a personalized quote wizard submission succeeds (GA4 + Ads). */
export function trackQuoteFormConversion(
  cleaningType?: string,
  attribution?: CleaningLeadAttribution,
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const params = conversionEventParams(cleaningType, attribution);

  window.gtag("event", "generate_lead", params);

  // Explicit name for GA4 “Mark as conversion” (Admin → Events).
  window.gtag("event", "quote_request_submitted", params);
}
