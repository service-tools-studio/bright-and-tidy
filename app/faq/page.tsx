import type { Metadata } from "next";
import Link from "next/link";
import { FaqSection } from "@/app/components/faq-section";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { SparkleIcon } from "@/app/components/icons";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Common questions about house cleaning with ${site.name} — pricing, what's included, service area, supplies, and satisfaction guarantee.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <Header />
      <main className="flex-1">
        <FaqSection asPage />
        <section className="border-t border-ink/10 bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <p className="text-lg text-muted">
              Still have questions? We&apos;re happy to help.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-base font-semibold text-ink shadow-[0_8px_20px_rgba(229,184,46,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-sun-deep"
              >
                <SparkleIcon className="h-4 w-4" />
                Get a Free Quote
              </Link>
              <a
                href={site.phoneHref}
                className="text-base font-semibold text-ink underline decoration-sun underline-offset-4 hover:text-ink/80"
              >
                Call or text {site.phoneDisplay}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
