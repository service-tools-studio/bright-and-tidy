import { SparkleIcon } from "@/app/components/icons";

type AboutSectionProps = {
  /** Use on the dedicated /about page (semantic h1, no homepage anchor id). */
  asPage?: boolean;
};

export function AboutSection({ asPage = false }: AboutSectionProps) {
  const Heading = asPage ? "h1" : "h2";

  return (
    <section
      id={asPage ? undefined : "about"}
      className={
        asPage
          ? "bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
          : "scroll-mt-32 bg-[#fffdf8] px-5 pb-16 sm:px-8 lg:px-12"
      }
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] bg-mint px-7 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-14">
        <div>
          <SparkleIcon className="mb-4 h-6 w-6 text-sun-deep" />
          <Heading className="font-serif text-3xl leading-tight font-semibold sm:text-4xl">
            A local cleaning company you can count on.
          </Heading>
        </div>
        <div>
          <p className="text-lg leading-8 text-muted">
            Bright & Tidy Cleaning is a women-owned, locally owned Portland
            cleaning company built around a simple idea: getting your home
            professionally cleaned should be easy, dependable, and leave you
            feeling great about your space.
          </p>
          <p className="mt-4 text-base font-medium text-ink/85">
            Vetted professionals. Women-owned. Local.
          </p>
          <p className="script-underline font-script mt-5 inline-block pb-2 text-[2rem] leading-none text-ink">
            Let us do the dirty work.
          </p>
        </div>
      </div>
    </section>
  );
}
