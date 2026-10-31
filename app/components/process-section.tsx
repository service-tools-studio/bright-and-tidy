import { SparkleIcon } from "@/app/components/icons";

const STEPS = [
  {
    step: "1",
    title: "Tell us about your space",
    description: "Request a free quote online or call/text us.",
  },
  {
    step: "2",
    title: "Choose your cleaning time",
    description: "We'll confirm your price and availability.",
  },
  {
    step: "3",
    title: "Come home to clean",
    description: "We'll take care of the dirty work.",
    sparkle: true,
  },
] as const;

type ProcessSectionProps = {
  asPage?: boolean;
};

export function ProcessSection({ asPage = false }: ProcessSectionProps) {
  return (
    <section
      id={asPage ? undefined : "process"}
      className={
        asPage
          ? "border-t border-ink/10 bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
          : "scroll-mt-32 bg-[#fffdf8] px-5 pb-16 sm:px-8 lg:px-12"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <SparkleIcon className="mx-auto mb-3 h-6 w-6 text-sun-deep" />
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            A clean home in three easy steps.
          </h2>
        </div>

        <ol className="grid gap-5 md:grid-cols-3">
          {STEPS.map((item) => (
            <li
              key={item.step}
              className="rounded-[1.6rem] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sun font-serif text-xl font-semibold text-ink">
                {item.step}
              </span>
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
                {item.title}
                {"sparkle" in item && item.sparkle ? (
                  <SparkleIcon className="h-5 w-5 text-gold-text" />
                ) : null}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-6 text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
