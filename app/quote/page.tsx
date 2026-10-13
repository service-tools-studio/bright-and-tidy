import type { Metadata } from "next";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { QuoteForm } from "@/app/quote/quote-form";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Request a free cleaning quote from ${site.name}.`,
};

export default function QuotePage() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <a
        href="#quote-wizard"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      >
        Skip to quote form
      </a>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pt-8 pb-16 sm:px-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Get a free quote
        </h1>
        <p className="mt-3 text-lg text-muted">
          Answer a few questions about your home and we&apos;ll follow up with
          pricing and availability within 1–2 business hours.
        </p>
        <div className="mt-8">
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
