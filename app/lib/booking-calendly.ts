import {
  fullNameFromLead,
  type CleaningLeadAttribution,
  type CleaningLeadFormState,
  type LeadPath,
} from "@/app/lib/quote";
import { site } from "@/app/lib/site";

const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;

function compactCondition(condition: string): string {
  const head = condition.split("—")[0]?.trim();
  return head || condition;
}

function compactUtmValue(value: string): string {
  return value
    .trim()
    .replace(/~/g, " ")
    .replace(/=/g, "-")
    .replace(/\s+/g, " ");
}

export function buildBookingCalendlyUrl({
  form,
  leadPath,
  baseUrl = site.bookingUrl,
  attribution = null,
}: {
  form: CleaningLeadFormState;
  leadPath: LeadPath;
  baseUrl?: string;
  attribution?: CleaningLeadAttribution | null;
}): string {
  let url: URL;
  try {
    url = new URL(baseUrl);
  } catch {
    return baseUrl;
  }

  const params = url.searchParams;
  const firstName = form.firstName.trim();
  const lastName = form.lastName.trim();
  const name = fullNameFromLead(form);
  const email = form.email.trim();
  const phone = form.mobilePhone.trim();
  const address = form.address.trim();
  const notes = form.notes.trim();
  const bedrooms = form.bedrooms.trim();
  const bathrooms = form.bathrooms.trim();
  const squareFootage = form.homeSize.trim().replace(/,/g, "");

  if (name) params.set("name", name);
  if (firstName) params.set("first_name", firstName);
  if (lastName) params.set("last_name", lastName);
  if (email) params.set("email", email);
  if (phone) params.set("a1", phone);
  if (address) params.set("a2", address);
  if (bedrooms) params.set("a3", bedrooms);
  if (bathrooms) params.set("a4", bathrooms);
  if (squareFootage) params.set("a5", squareFootage);
  if (notes) params.set("a6", notes);

  const attrs =
    attribution && typeof attribution === "object" ? attribution : {};

  const isBooking = leadPath === "Book Online";
  params.set(
    "utm_source",
    attrs.utm_source || (isBooking ? "book_online" : "request_a_quote"),
  );
  params.set("utm_medium", attrs.utm_medium || "website");
  params.set(
    "utm_campaign",
    attrs.utm_campaign ||
      (isBooking ? "online_booking" : "personalized_quote"),
  );
  if (attrs.utm_term) params.set("utm_term", attrs.utm_term);

  const contentParts = [
    `lead=${isBooking ? "book_online" : "personalized_quote"}`,
    `type=${form.cleaningType || ""}`,
    `bed=${bedrooms}`,
    `ba=${bathrooms}`,
    `sf=${squareFootage}`,
    `cond=${compactCondition(form.condition)}`,
    address ? `addr=${compactUtmValue(address)}` : "",
    attrs.landing_path
      ? `lp=${attrs.landing_path.replace(/^\//, "")}`
      : "",
  ]
    .filter(Boolean)
    .join("~");

  params.set("utm_content", contentParts);

  for (const key of CLICK_ID_KEYS) {
    const value = attrs[key];
    if (value) params.set(key, value);
  }

  return url.toString();
}
