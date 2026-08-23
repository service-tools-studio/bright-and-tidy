export const quoteServices = [
  "Residential Cleaning",
  "Commercial Cleaning",
  "Post-Construction Cleaning",
  "Property Management Partnerships",
] as const;

export type QuoteService = (typeof quoteServices)[number];

export type QuoteRequest = {
  name: string;
  phone: string;
  email: string;
  service: QuoteService;
  details: string;
};

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function parseQuoteRequest(input: unknown): QuoteRequest | null {
  if (!input || typeof input !== "object") return null;

  const data = input as Record<string, unknown>;
  const name = asText(data.name, 120);
  const phone = asText(data.phone, 40);
  const email = asText(data.email, 160);
  const service = asText(data.service, 80);
  const details = asText(data.details, 2000);

  if (!name || !phone || !email || !quoteServices.includes(service as QuoteService)) {
    return null;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  return {
    name,
    phone,
    email,
    service: service as QuoteService,
    details,
  };
}
