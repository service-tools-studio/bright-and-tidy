export const CLEANING_TYPES = [
  "Standard Cleaning",
  "Deep Cleaning",
  "Move-In / Move-Out Cleaning",
  "Commercial Cleaning",
  "Post-Construction Cleaning",
  "Property Management Partnerships",
  "Other / Not sure",
] as const;

export const BEDROOM_OPTIONS = [
  "Studio",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6+",
] as const;

export const BATHROOM_OPTIONS = [
  "1",
  "1.5",
  "2",
  "2.5",
  "3",
  "3.5",
  "4",
  "4.5",
  "5+",
] as const;

export const CONDITION_OPTIONS = [
  "Light — regularly maintained, mostly needs detailing",
  "Moderate — some noticeable buildup or areas needing extra attention",
  "Heavy — significant buildup or hasn't been thoroughly cleaned recently",
  "Not sure",
] as const;

export const TIMING_OPTIONS = [
  "As soon as possible",
  "Within the next week",
  "Within the next 2 weeks",
  "I'm flexible",
  "Specific date",
] as const;

export const CONTACT_OPTIONS = ["Text", "Phone call", "Email"] as const;

export type CleaningLeadFormState = {
  firstName: string;
  lastName: string;
  mobilePhone: string;
  email: string;
  address: string;
  contactPreference: string;
  cleaningType: string;
  homeSize: string;
  bedrooms: string;
  bathrooms: string;
  condition: string;
  timing: string;
  specificDate: string;
  notes: string;
};

export const EMPTY_CLEANING_LEAD_FORM: CleaningLeadFormState = {
  firstName: "",
  lastName: "",
  mobilePhone: "",
  email: "",
  address: "",
  contactPreference: "",
  cleaningType: "",
  homeSize: "",
  bedrooms: "",
  bathrooms: "",
  condition: "",
  timing: "",
  specificDate: "",
  notes: "",
};

function asText(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function parseCleaningLeadPayload(
  input: unknown,
): CleaningLeadPayload | null {
  if (!input || typeof input !== "object") return null;
  const data = input as Record<string, unknown>;

  const form: CleaningLeadFormState = {
    firstName: asText(data.firstName, 80),
    lastName: asText(data.lastName, 80),
    mobilePhone: asText(data.mobilePhone, 40),
    email: asText(data.email, 160),
    address: asText(data.address, 200),
    contactPreference: asText(data.contactPreference, 40),
    cleaningType: asText(data.cleaningType, 80),
    homeSize: asText(data.homeSize, 20),
    bedrooms: asText(data.bedrooms, 20),
    bathrooms: asText(data.bathrooms, 20),
    condition: asText(data.condition, 200),
    timing: asText(data.timing, 80),
    specificDate: asText(data.specificDate, 40),
    notes: asText(data.notes, 2000),
  };

  if (Object.keys(validateCleaningLeadForm(form)).length > 0) return null;

  const formLoadedAt =
    typeof data.formLoadedAt === "number" ? data.formLoadedAt : undefined;

  return { ...form, formLoadedAt };
}

export type CleaningLeadPayload = CleaningLeadFormState & {
  formLoadedAt?: number;
};

export type FieldErrors = Partial<Record<keyof CleaningLeadFormState, string>>;

const SET = {
  contact: new Set<string>(CONTACT_OPTIONS),
  cleaning: new Set<string>(CLEANING_TYPES),
  bedrooms: new Set<string>(BEDROOM_OPTIONS),
  bathrooms: new Set<string>(BATHROOM_OPTIONS),
  condition: new Set<string>(CONDITION_OPTIONS),
  timing: new Set<string>(TIMING_OPTIONS),
};

function parseHomeSize(raw: string): number {
  return Number(String(raw ?? "").trim().replace(/,/g, ""));
}

export function fullNameFromLead(
  data: Pick<CleaningLeadFormState, "firstName" | "lastName">,
): string {
  return [data.firstName, data.lastName]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
}

export function validateCleaningLeadForm(
  form: CleaningLeadFormState,
): FieldErrors {
  const errors: FieldErrors = {};
  const homeSize = parseHomeSize(form.homeSize);

  if (!form.firstName.trim()) errors.firstName = "Enter your first name.";
  if (!form.lastName.trim()) errors.lastName = "Enter your last name.";
  if (!form.mobilePhone.trim()) errors.mobilePhone = "Enter your mobile phone.";
  if (!form.email.trim()) errors.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!form.contactPreference || !SET.contact.has(form.contactPreference)) {
    errors.contactPreference = "Choose how you'd like us to contact you.";
  }

  if (!form.address.trim()) errors.address = "Enter the service address.";

  if (!form.cleaningType || !SET.cleaning.has(form.cleaningType)) {
    errors.cleaningType = "Select a cleaning type.";
  }
  if (!Number.isFinite(homeSize) || homeSize <= 0) {
    errors.homeSize = "Enter an approximate home size.";
  }
  if (!form.bedrooms || !SET.bedrooms.has(form.bedrooms)) {
    errors.bedrooms = "Select bedrooms.";
  }
  if (!form.bathrooms || !SET.bathrooms.has(form.bathrooms)) {
    errors.bathrooms = "Select bathrooms.";
  }
  if (!form.condition || !SET.condition.has(form.condition)) {
    errors.condition = "Select the current condition.";
  }

  if (!form.timing || !SET.timing.has(form.timing)) {
    errors.timing = "Select a timeframe.";
  } else if (form.timing === "Specific date" && !form.specificDate.trim()) {
    errors.specificDate = "Enter the date you're hoping for.";
  }

  return errors;
}

export const QUOTE_FORM_STEPS = [
  { id: "name", title: "Your name", fields: ["firstName", "lastName"] },
  { id: "contact", title: "Contact details", fields: ["mobilePhone", "email"] },
  {
    id: "preference",
    title: "Contact preference",
    fields: ["contactPreference"],
  },
  { id: "address", title: "Service address", fields: ["address"] },
  { id: "service", title: "Cleaning type", fields: ["cleaningType"] },
  {
    id: "home",
    title: "About your home",
    fields: ["homeSize", "bedrooms", "bathrooms"],
  },
  { id: "condition", title: "Home condition", fields: ["condition"] },
  { id: "timing", title: "Preferred timing", fields: ["timing", "specificDate"] },
  { id: "notes", title: "Anything else?", fields: ["notes"] },
] as const;

export function validateCleaningLeadStep(
  form: CleaningLeadFormState,
  stepIndex: number,
): FieldErrors {
  const step = QUOTE_FORM_STEPS[stepIndex];
  if (!step) return {};
  const all = validateCleaningLeadForm(form);
  const errors: FieldErrors = {};
  for (const key of step.fields) {
    const field = key as keyof CleaningLeadFormState;
    if (all[field]) errors[field] = all[field];
  }
  return errors;
}

export function firstStepErrorField(
  errors: FieldErrors,
  stepIndex: number,
): keyof CleaningLeadFormState | null {
  const step = QUOTE_FORM_STEPS[stepIndex];
  if (!step) return null;
  for (const key of step.fields) {
    const field = key as keyof CleaningLeadFormState;
    if (errors[field]) return field;
  }
  return null;
}

export function fieldDomId(key: keyof CleaningLeadFormState): string {
  return `cl-${key}`;
}

export function formatHomeSizeLabel(raw: string | number): string {
  const n = typeof raw === "number" ? raw : parseHomeSize(String(raw));
  if (!Number.isFinite(n) || n <= 0) return String(raw ?? "");
  return Math.round(n).toLocaleString("en-US");
}

export function formatPhoneInput(value: string): string {
  const digits = String(value || "")
    .replace(/\D/g, "")
    .replace(/^1(?=\d{10})/, "")
    .slice(0, 10);

  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function buildCleaningLeadEmailSubject(
  data: Pick<CleaningLeadFormState, "firstName" | "lastName" | "cleaningType" | "homeSize">,
): string {
  const size = formatHomeSizeLabel(data.homeSize);
  const name = fullNameFromLead(data) || data.firstName;
  return `New quote request — ${name} — ${data.cleaningType} — ${size} sq ft`;
}

export function buildCleaningLeadEmailBody(data: CleaningLeadFormState): string {
  const timingLine =
    data.timing === "Specific date"
      ? `Desired timeframe: Specific date — ${data.specificDate?.trim() || "(not provided)"}`
      : `Desired timeframe: ${data.timing}`;

  return [
    "NEW PERSONALIZED QUOTE REQUEST",
    "",
    "CONTACT",
    `Name: ${fullNameFromLead(data)}`,
    `Phone: ${data.mobilePhone}`,
    `Email: ${data.email}`,
    `Preferred contact: ${data.contactPreference}`,
    `Address: ${data.address.trim()}`,
    "",
    "CLEANING DETAILS",
    `Service: ${data.cleaningType}`,
    `Home size: ${formatHomeSizeLabel(data.homeSize)} sq ft`,
    `Bedrooms: ${data.bedrooms}`,
    `Bathrooms: ${data.bathrooms}`,
    `Condition: ${data.condition}`,
    timingLine,
    "",
    "CUSTOMER NOTES",
    data.notes?.trim() || "(none)",
  ].join("\n");
}
