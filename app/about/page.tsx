import type { Metadata } from "next";
import { AboutPageContent, AboutPageClosing } from "@/app/components/about-page-content";
import { ProcessSection } from "@/app/components/process-section";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import { site } from "@/app/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `${site.name} is a locally owned, women-owned Portland cleaning company. A cleaner home and a little more peace of mind.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-cream text-ink">
      <Header />
      <main className="flex-1">
        <AboutPageContent />
        <ProcessSection asPage />
        <AboutPageClosing />
      </main>
      <Footer />
    </div>
  );
}
