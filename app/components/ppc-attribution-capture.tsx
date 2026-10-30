"use client";

import { useEffect } from "react";
import { capturePpcAttribution } from "@/app/lib/ppc-attribution";

/** Runs on every page load to persist gclid / UTM from the landing URL. */
export function PpcAttributionCapture() {
  useEffect(() => {
    capturePpcAttribution();
  }, []);

  return null;
}
