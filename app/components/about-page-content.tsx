import type { ReactNode } from "react";
import Link from "next/link";
import { CheckIcon, SparkleIcon } from "@/app/components/icons";

const PROCESS_BULLETS = [
  "Easy online booking and quote requests",
  "Clear communication about pricing and expectations",
  "Carefully selected cleaning professionals",
  "Deep cleaning, move-in/out cleaning, and recurring services",
  "A friendly, local team you can reach when you need us",
] as const;

function ProseSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`px-5 py-12 sm:px-8 lg:px-12 ${className}`.trim()}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-[1.05rem] leading-8 text-muted">
          {children}
        </div>
      </div>
    </section>
  );
}

export function AboutPageContent() {
  return (
    <>
      <section className="bg-[#fffdf8] px-5 pt-10 pb-12 sm:px-8 lg:px-12 lg:pt-14 lg:pb-16">
        <div className="mx-auto max-w-3xl">
          <SparkleIcon className="mb-4 h-6 w-6 text-sun-deep" />
          <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem]">
            A cleaner home. A little more peace of mind.
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-8 text-muted">
            <p>
              We're Bright & Tidy Cleaning, a locally owned, women-owned
              cleaning company serving Portland, Oregon and the surrounding
              communities.
            </p>
            <p>
              We believe a clean home is about more than appearances.
              It&apos;s about walking through your front door and feeling like
              you can finally relax. It&apos;s about having one less thing on
              your to-do list and more time for the people, pets, and experiences
              you love.
            </p>
            <p>
              And we believe getting your home professionally cleaned should be
              just as refreshing as the results.
            </p>
          </div>
          <p className="mt-6 text-base font-medium text-ink/85">
            Vetted professionals. Women-owned. Local.
          </p>
        </div>
      </section>

      <ProseSection title="A little about us" className="border-t border-ink/10 bg-cream">
        <p>
          Bright & Tidy was created with a simple goal: to make professional
          house cleaning easier, more dependable, and more accessible for busy
          households.
        </p>
        <p>
          We know that inviting someone into your home is personal. You deserve
          to feel comfortable with the people caring for your space, confident in
          the quality of their work, and informed about what to expect.
        </p>
        <p>
          That&apos;s why we focus on thoughtful communication, clear
          expectations, and working with cleaning professionals who take pride in
          what they do.
        </p>
        <p>
          Whether your home needs a thorough deep clean, a fresh start before
          moving, or a little ongoing help keeping things tidy, we&apos;re here
          to make life easier.
        </p>
      </ProseSection>

      <ProseSection title="The little things matter to us" className="bg-[#fffdf8]">
        <p>
          We believe a great cleaning experience goes beyond sparkling
          countertops and freshly cleaned floors.
        </p>
        <p>
          It&apos;s showing up when we say we will. It&apos;s treating your home
          and belongings with respect. It&apos;s paying attention to the
          details. And it&apos;s making the entire experience feel easy, from
          your first inquiry to the finishing touches.
        </p>
        <p>
          We also know that every home is different. Real homes are lived in.
          They have pets, busy kitchens, well-loved furniture, and sometimes a
          little more buildup than we&apos;d like to admit.
        </p>
        <p>There&apos;s no judgment here. Just a team ready to help you enjoy your space again.</p>
      </ProseSection>

      <ProseSection
        title="Professional cleaning, without the hassle"
        className="border-t border-ink/10 bg-cream"
      >
        <p>
          We&apos;ve designed our process around convenience, transparency, and
          dependable service.
        </p>
        <ul className="!mt-4 space-y-3 !text-ink">
          {PROCESS_BULLETS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun text-white">
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              <span className="text-[1.05rem] leading-7 text-muted">{item}</span>
            </li>
          ))}
        </ul>
        <p className="!mt-6">
          Our goal is simple: to make getting your home cleaned one of the
          easiest things on your calendar.
        </p>
      </ProseSection>
    </>
  );
}

export function AboutPageClosing() {
  return (
    <section className="border-t border-ink/10 bg-[#fffdf8] px-5 py-14 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="script-underline font-script inline-block pb-2 text-[2.25rem] leading-none text-ink sm:text-[2.5rem]">
          Let us do the dirty work.
        </p>
        <p className="mt-6 text-lg leading-8 text-muted">
          Life is busy enough. Let us take cleaning off your plate so you can
          spend more time doing whatever makes your life feel a little
          brighter.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3.5 text-base font-semibold text-ink shadow-[0_8px_20px_rgba(229,184,46,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-sun-deep"
          >
            <SparkleIcon className="h-4 w-4" />
            Get a Free Quote
          </Link>
          <Link
            href="/book-online"
            className="text-base font-semibold text-ink underline decoration-sun underline-offset-4 hover:text-ink/80"
          >
            Book your cleaning
          </Link>
        </div>
      </div>
    </section>
  );
}
