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
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pt-8 pb-16 sm:px-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Get a free quote
        </h1>
        <p className="mt-3 text-lg text-muted">
          Tell us a little about your space and we&apos;ll follow up with
          pricing and availability.
        </p>
        <div className="mt-8">
          <QuoteForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
