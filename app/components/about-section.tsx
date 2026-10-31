import Link from "next/link";
import { SparkleIcon } from "@/app/components/icons";

/** Short about blurb for the homepage — full story lives on /about. */
export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-32 bg-[#fffdf8] px-5 pb-16 sm:px-8 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] bg-mint px-7 py-10 sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-14 lg:py-14">
        <div>
          <SparkleIcon className="mb-4 h-6 w-6 text-sun-deep" />
          <h2 className="font-serif text-3xl leading-tight font-semibold sm:text-4xl">
            A cleaner home. A little more peace of mind.
          </h2>
        </div>
        <div>
          <p className="text-lg leading-8 text-muted">
            We're Bright & Tidy Cleaning, a locally owned, women-owned
            cleaning company serving Portland, Oregon and the surrounding
            communities.
            We believe a clean home should help you relax—not add stress to your
            to-do list.
          </p>
          <p className="mt-4 text-base font-medium text-ink/85">
            Vetted professionals. Women-owned. Local.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex text-base font-semibold text-ink underline decoration-sun underline-offset-4 hover:text-ink/80"
          >
            Learn more about us →
          </Link>
        </div>
      </div>
    </section>
  );
}
