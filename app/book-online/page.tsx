import type { Metadata } from "next";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { QuoteForm } from "@/app/quote/quote-form";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "Book Your Cleaning",
  description: `Reserve a cleaning appointment online with ${site.name}. Tell us about your home, then choose an available time.`,
};

export default function BookOnlinePage() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <a
        href="#book-wizard"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-sun focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      >
        Skip to booking form
      </a>
      <Header />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 pt-8 pb-16 sm:px-8">
        <h1 className="font-serif text-4xl font-semibold tracking-tight">
          Book your cleaning
        </h1>
        <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-muted">
          <span className="text-ink">1</span>
          <span className="mx-1.5 font-normal text-ink/40">·</span>
          Contact
          <span className="mx-1.5 font-normal text-ink/40" aria-hidden>
            →
          </span>
          <span className="text-ink">2</span>
          <span className="mx-1.5 font-normal text-ink/40">·</span>
          Home details
          <span className="mx-1.5 font-normal text-ink/40" aria-hidden>
            →
          </span>
          <span className="text-ink">3</span>
          <span className="mx-1.5 font-normal text-ink/40">·</span>
          Pick a time
        </p>
        <p className="mt-4 text-lg text-muted">
          Tell us a little about your home, then choose a time on our live
          calendar. You&apos;ll reserve an arrival window — we confirm your
          final price before cleaning begins.
        </p>
        <div className="mt-8">
          <QuoteForm mode="booking" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
