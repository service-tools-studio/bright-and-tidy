import type { Metadata } from "next";
import Link from "next/link";
import { AboutSection } from "@/app/components/about-section";
import { ProcessSection } from "@/app/components/process-section";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { SparkleIcon } from "@/app/components/icons";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.name} is a locally owned, women-owned Portland cleaning company. Reliable, detail-oriented house cleaning you can count on.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <Header />
      <main className="flex-1">
        <AboutSection asPage />
        <ProcessSection asPage />
        <section className="border-t border-ink/10 bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg text-muted">
              Ready to see what a brighter home feels like?
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
