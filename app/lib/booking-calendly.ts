import {
  fullNameFromLead,
  type CleaningLeadFormState,
  type LeadPath,
} from "@/app/lib/quote";
import { site } from "@/app/lib/site";

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
}: {
  form: CleaningLeadFormState;
  leadPath: LeadPath;
  baseUrl?: string;
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

  const isBooking = leadPath === "Book Online";
  params.set("utm_source", isBooking ? "book_online" : "request_a_quote");
  params.set("utm_medium", "website");
  params.set(
    "utm_campaign",
    isBooking ? "online_booking" : "personalized_quote",
  );

  const contentParts = [
    `lead=${isBooking ? "book_online" : "personalized_quote"}`,
    `type=${form.cleaningType || ""}`,
    `bed=${bedrooms}`,
    `ba=${bathrooms}`,
    `sf=${squareFootage}`,
    `cond=${compactCondition(form.condition)}`,
    address ? `addr=${compactUtmValue(address)}` : "",
  ]
    .filter(Boolean)
    .join("~");

  params.set("utm_content", contentParts);

  return url.toString();
}
