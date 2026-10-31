"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { HashLink } from "@/app/components/hash-link";
import { SparkleIcon } from "@/app/components/icons";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export const cleaningFaqs: FaqItem[] = [
  {
    question: "How much does house cleaning cost?",
    answer: (
      <>
        Every home is a little different, so your price will depend on the size
        of your home, the type of cleaning you need, and its current condition.{" "}
        <HashLink
          href="/#pricing"
          className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
        >
          View our pricing
        </HashLink>{" "}
        for starting prices and typical cleaning costs, or{" "}
        <Link
          href="/quote"
          className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
        >
          request a personalized quote
        </Link>{" "}
        for your home.
      </>
    ),
  },
  {
    question: "What's included in a standard cleaning?",
    answer:
      "Our standard cleaning covers the everyday essentials that keep your home feeling fresh and tidy, including dusting, wiping surfaces, cleaning kitchens and bathrooms, vacuuming, and mopping. If you have something specific you'd like us to focus on, just let us know!",
  },
  {
    question: "What's included in a deep cleaning?",
    answer:
      "A deep clean goes beyond routine maintenance to tackle built-up dirt, dust, and grime throughout your home. We spend extra time on detailed areas like baseboards, fixtures, cabinet exteriors, and other spots that don't typically need attention during every cleaning.",
  },
  {
    question: "Do you bring your own cleaning supplies and equipment?",
    answer:
      "Yes! We bring the cleaning supplies and equipment needed to complete your cleaning. If you have a particular product you'd prefer us to use in your home, you're welcome to provide it.",
  },
  {
    question: "Do I need to be home during the cleaning?",
    answer:
      "Not at all. You're welcome to be home, head out, or arrange a way for us to access your home while you're away. We'll work with whatever is most comfortable and convenient for you.",
  },
  {
    question: "Who will be in my home?",
    answer:
      "Bright & Tidy Cleaning is a women-owned company, and we send vetted professionals into your home so you can feel comfortable having our team there.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve Portland and communities throughout the surrounding metro area. Not sure if you're within our service area? Send us your ZIP code and we'll be happy to let you know.",
  },
  {
    question: "What if I'm not satisfied with my cleaning?",
    answer:
      "We want you to feel great when you walk into your freshly cleaned space. If something doesn't meet your expectations, let us know within 24 hours and we'll work with you to make it right.",
  },
];

type FaqSectionProps = {
  asPage?: boolean;
};

export function FaqSection({ asPage = false }: FaqSectionProps) {
  const Heading = asPage ? "h1" : "h2";

  return (
    <section
      id={asPage ? undefined : "faq"}
      className={
        asPage
          ? "bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
          : "scroll-mt-32 bg-[#fffdf8] px-5 pb-16 sm:px-8 lg:px-12"
      }
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <SparkleIcon className="mx-auto mb-3 h-6 w-6 text-sun-deep" />
          <Heading className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </Heading>
        </div>

        <div className="space-y-4">
          {cleaningFaqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-[1.6rem] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5"
            >
              <summary className="cursor-pointer list-none font-serif text-xl font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="flex items-start justify-between gap-4">
                  {faq.question}
                  <span className="mt-1 shrink-0 text-lg font-sans font-semibold text-gold-text transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <div className="mt-3 text-[0.95rem] leading-7 text-muted">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
