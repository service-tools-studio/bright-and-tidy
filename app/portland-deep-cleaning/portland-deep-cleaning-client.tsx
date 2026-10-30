"use client";

import { type ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PpcFooter } from "@/app/components/ppc/ppc-footer";
import { PpcHeader } from "@/app/components/ppc/ppc-header";
import { PricingTierLabel } from "@/app/components/ppc/pricing-tier-label";
import {
  CheckIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
} from "@/app/components/icons";
import { QuoteForm } from "@/app/quote/quote-form";
import { formatPricingAmount, pricingListings } from "@/app/lib/pricing";
import { scrollToId } from "@/app/lib/scroll-to-id";
import { site } from "@/app/lib/site";

const deepPricing =
  pricingListings.find((item) => item.title === "Deep Cleaning") ??
  pricingListings[1];

const deepIncluded = [
  "Baseboards and edges",
  "Detailed bathrooms",
  "Kitchen detail and appliance exteriors",
  "Doors and door frames",
  "Light switches and outlets",
  "Fan dusting",
  "Spot wall wipe",
];

const faqs = [
  {
    question: "How much does deep cleaning cost in Portland?",
    answerId: "pricing-deep" as const,
  },
  {
    question: "When is my final price confirmed?",
    answer:
      "We confirm your final price with you before cleaning begins — usually during a quick walkthrough when we arrive. Starting rates on this page assume a home in light condition; heavier buildup or extra scope can affect the total.",
  },
  {
    question: "Can I reserve a cleaning before I get my estimate?",
    answer:
      "Yes. You can reserve an arrival window online anytime. We'll still review your home details and confirm pricing with you before we start cleaning.",
  },
  {
    question: "What is included in a deep clean?",
    answerId: "deep-included" as const,
  },
  {
    question: "Do you bring your own cleaning supplies and equipment?",
    answer:
      "Yes. We bring the supplies and equipment needed for your cleaning. If you prefer a specific product in your home, you're welcome to provide it.",
  },
];

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-sun px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-ink transition hover:brightness-95 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink";
const btnSecondary =
  "inline-flex min-h-11 items-center justify-center rounded-full border border-ink/20 bg-white px-6 py-2.5 text-sm font-extrabold uppercase tracking-wide text-ink transition hover:bg-cream focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink";

function TrustBadge({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <div className="flex min-h-16 items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm font-medium text-ink">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun/50 text-ink">
        {icon}
      </span>
      {label}
    </div>
  );
}

export function PortlandDeepCleaningClient() {
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  function scrollToPricing() {
    scrollToId("#quote", 100, { focus: true });
  }

  function scrollToRequestQuote() {
    scrollToId("#request-quote", 100, { focus: true });
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <PpcHeader />

      <main>
        <section
          id="hero"
          className="border-b border-ink/10 bg-[#fffdf8]"
        >
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 py-10 sm:px-8 md:grid-cols-2 md:py-16 lg:gap-12 lg:py-20">
            <div>
              <h1 className="text-center font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-left lg:text-[2.35rem]">
                Home deep cleaning services in Portland
              </h1>
              <p className="mt-4 text-center text-base leading-relaxed text-muted md:text-left">
                A comprehensive, detail-focused clean designed to refresh your
                home from top to bottom.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-start">
                <a href={site.phoneHref} className={`${btnPrimary} w-full sm:w-auto`}>
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  Call {site.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={scrollToPricing}
                  className={`${btnSecondary} w-full sm:w-auto`}
                >
                  See pricing
                </button>
              </div>
              <p className="mt-3 text-center text-sm text-muted md:text-left">
                Prefer to book online?{" "}
                <Link
                  href="/book-online"
                  className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
                >
                  Reserve your deep clean →
                </Link>
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <TrustBadge
                  icon={<ShieldIcon className="h-4 w-4" />}
                  label="Vetted professionals"
                />
                <TrustBadge
                  icon={<CheckIcon className="h-3.5 w-3.5" />}
                  label="Satisfaction guaranteed"
                />
                <TrustBadge
                  icon={<SparkleIcon className="h-3.5 w-3.5" />}
                  label="Women-owned & local"
                />
                <div className="flex min-h-16 items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm font-medium leading-snug text-ink">
                  <span className="text-sun">★★★★★</span>
                  <span>Trusted Portland cleaners</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-sm">
              <Image
                src="/hero-living-room.jpg"
                alt="A bright, freshly cleaned Portland living room"
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </div>
        </section>

        <section
          id="quote"
          tabIndex={-1}
          className="scroll-mt-28 bg-cream px-5 pb-12 pt-10 outline-none sm:px-8 md:pb-16 md:pt-12"
        >
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Deep cleaning pricing
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
                Starting rates by home size. Need a tailored number? Request a
                personalized quote below — then reserve when you&apos;re ready.
              </p>
            </header>

            <article
              id="pricing-deep"
              tabIndex={-1}
              className="mt-10 scroll-mt-28 rounded-[1.6rem] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5 outline-none sm:px-8"
            >
              <h3 className="font-serif text-xl font-semibold">
                {deepPricing.title}
              </h3>
              <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-cream/40">
                {deepPricing.tiers.map((tier, index) => (
                  <div
                    key={tier.sqftLabel}
                    className={`flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 ${
                      index > 0 ? "border-t border-ink/10" : ""
                    }`}
                  >
                    <PricingTierLabel label={tier.sqftLabel} />
                    <div className="flex flex-col sm:items-end">
                      <span className="text-xs font-medium text-muted">
                        Starting at
                      </span>
                      <span className="font-serif text-xl font-semibold text-ink">
                        {formatPricingAmount(tier.startingAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                <span className="font-semibold text-ink">
                  {deepPricing.largeHomePrompt}
                </span>{" "}
                <button
                  type="button"
                  onClick={scrollToRequestQuote}
                  className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
                >
                  Request a personalized quote →
                </button>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Starting rates shown are for homes in light condition. Final
                pricing depends on home size, condition, scope, and cleaning
                needs.
              </p>

              <div
                id="deep-included"
                tabIndex={-1}
                className="mt-8 border-t border-ink/10 pt-6 outline-none"
              >
                <h4 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  What&apos;s included
                </h4>
                <ul className="mt-3 space-y-2">
                  {deepIncluded.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-ink"
                    >
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-sun" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={scrollToRequestQuote}
                className={`${btnPrimary} w-full sm:w-auto`}
              >
                Request a personalized quote
              </button>
              <p className="text-center text-sm text-muted">
                Or call{" "}
                <a
                  href={site.phoneHref}
                  className="font-semibold text-ink underline decoration-sun underline-offset-2"
                >
                  {site.phoneDisplay}
                </a>
                {" · "}
                <Link
                  href="/book-online"
                  className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
                >
                  Reserve your deep clean →
                </Link>
              </p>
            </div>
          </div>

          <div
            id="request-quote"
            tabIndex={-1}
            className="mx-auto mt-14 max-w-2xl scroll-mt-28 outline-none"
          >
            {!quoteSubmitted ? (
              <header className="text-center">
                <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                  Request a personalized quote
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">
                  Share a few details about your Portland home and we&apos;ll
                  help you find the right deep clean and price. After you
                  submit, you can reserve an available cleaning time online.
                </p>
              </header>
            ) : null}

            <div className={quoteSubmitted ? undefined : "mt-8"}>
              <QuoteForm
                mode="quote"
                initialCleaningType="Deep Cleaning"
                onSuccess={() => setQuoteSubmitted(true)}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight">
            FAQ
          </h2>
          <div className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-[1.6rem] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5"
              >
                <summary className="cursor-pointer list-none font-serif text-lg font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {faq.question}
                    <span className="mt-0.5 shrink-0 font-sans text-lg text-gold-text transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <div className="mt-3 text-[0.95rem] leading-7 text-muted">
                  {faq.answerId === "pricing-deep" ? (
                    <>
                      You can review{" "}
                      <button
                        type="button"
                        className="font-semibold text-ink underline decoration-sun underline-offset-2"
                        onClick={() =>
                          scrollToId("#pricing-deep", 100, { focus: true })
                        }
                      >
                        starting prices
                      </button>{" "}
                      by home size on this page, then request a personalized
                      quote based on bedrooms, bathrooms, square footage, and
                      home condition. We confirm your final price with you
                      before cleaning begins.
                    </>
                  ) : faq.answerId === "deep-included" ? (
                    <>
                      A deep clean goes beyond routine maintenance to tackle
                      built-up dirt, dust, and grime throughout your home,
                      including{" "}
                      {deepIncluded.slice(0, 3).join(", ").toLowerCase()}, and
                      more.{" "}
                      <button
                        type="button"
                        className="font-semibold text-ink underline decoration-sun underline-offset-2"
                        onClick={() =>
                          scrollToId("#deep-included", 100, { focus: true })
                        }
                      >
                        See the full checklist →
                      </button>
                    </>
                  ) : (
                    faq.answer
                  )}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a href={site.phoneHref} className={`${btnPrimary} w-full sm:w-auto`}>
              <PhoneIcon className="h-4 w-4 shrink-0" />
              Call {site.phoneDisplay}
            </a>
            <button
              type="button"
              onClick={scrollToPricing}
              className={`${btnSecondary} w-full sm:w-auto`}
            >
              See pricing
            </button>
          </div>
          <p className="mt-3 text-center text-sm text-muted">
            Ready to schedule?{" "}
            <Link
              href="/book-online"
              className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
            >
              Reserve your deep clean →
            </Link>
          </p>
        </section>

        <PpcFooter />
      </main>
    </div>
  );
}
