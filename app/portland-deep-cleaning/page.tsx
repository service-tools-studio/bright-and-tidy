import type { Metadata } from "next";
import { PortlandDeepCleaningClient } from "@/app/portland-deep-cleaning/portland-deep-cleaning-client";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Portland Deep Cleaning Services",
  description: `Comprehensive deep house cleaning in Portland from ${site.name}. See starting prices, request a personalized quote, or reserve your cleaning online.`,
  alternates: { canonical: "/portland-deep-cleaning" },
};

export default function PortlandDeepCleaningPage() {
  return <PortlandDeepCleaningClient />;
}
