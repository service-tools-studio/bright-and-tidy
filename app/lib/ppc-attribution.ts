"use client";

import type { CleaningLeadAttribution } from "@/app/lib/quote";

const STORAGE_KEY = "bt_ppc_attribution";

const ATTRIBUTION_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
] as const;

export type PpcAttribution = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_id?: string;
  landing_path?: string;
  captured_at?: string;
};

function hasAttributionTouch(value: PpcAttribution) {
  return ATTRIBUTION_KEYS.some((key) => Boolean(value[key]));
}

function readStored(): PpcAttribution {
  if (typeof window === "undefined") return {};
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) ?? sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as PpcAttribution;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeStored(value: PpcAttribution) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore quota / private-mode failures.
  }
}

/** Capture Ads/UTM params from the URL and persist for later form submits. */
export function capturePpcAttribution(): PpcAttribution {
  if (typeof window === "undefined") return {};

  const stored = readStored();
  const params = new URLSearchParams(window.location.search);
  const fromUrl: PpcAttribution = {};

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  const hasNewAttribution = Object.keys(fromUrl).length > 0;

  const merged: PpcAttribution = {
    ...stored,
    ...fromUrl,
    landing_path: hasNewAttribution
      ? window.location.pathname
      : stored.landing_path || window.location.pathname,
  };

  if (hasNewAttribution) {
    merged.captured_at = new Date().toISOString();
  } else if (stored.captured_at) {
    merged.captured_at = stored.captured_at;
  } else if (hasAttributionTouch(merged)) {
    merged.captured_at = new Date().toISOString();
  }

  if (
    hasNewAttribution ||
    !stored.landing_path ||
    (hasAttributionTouch(merged) && !stored.captured_at)
  ) {
    writeStored(merged);
  }

  return merged;
}

export function getPpcAttribution(): PpcAttribution {
  return capturePpcAttribution();
}

/** Shape stored attribution for the quote API / lead email. */
export function leadAttributionFromPpc(
  attrs: PpcAttribution,
): CleaningLeadAttribution | undefined {
  const out: CleaningLeadAttribution = {};
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
    "landing_path",
  ] as const;

  for (const key of keys) {
    const value = attrs[key]?.trim();
    if (value) out[key] = value;
  }

  return Object.keys(out).length > 0 ? out : undefined;
}
