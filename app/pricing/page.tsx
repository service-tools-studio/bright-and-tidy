import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { PricingSection } from "@/app/components/pricing-section";
import { SparkleIcon } from "@/app/components/icons";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Starting prices for standard, deep, and move-in/move-out house cleaning in Portland from ${site.name}. Request a free personalized quote for your home.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <Header />
      <main className="flex-1">
        <PricingSection asPage />
        <section className="border-t border-ink/10 bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="text-lg text-muted">
              Every home is different — get a quote tailored to yours.
            </p>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-base font-semibold text-ink shadow-[0_8px_20px_rgba(229,184,46,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-sun-deep"
            >
              <SparkleIcon className="h-4 w-4" />
              Get a Free Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
