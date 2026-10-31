import Link from "next/link";
import { SparkleIcon } from "@/app/components/icons";
import { formatPricingAmount, pricingListings } from "@/app/lib/pricing";

type PricingSectionProps = {
  asPage?: boolean;
};

function SqftTierLabel({ label }: { label: string }) {
  const match = label.match(/^(.*?)(\d[\d,]*)\s*(sq\s*ft)$/i);
  if (!match) {
    return <span className="text-sm text-muted">{label}</span>;
  }

  const [, prefix, amount, unit] = match;
  return (
    <span className="text-sm text-muted">
      {prefix}
      <span className="text-base font-semibold text-ink sm:text-lg">
        {amount} {unit}
      </span>
    </span>
  );
}

export function PricingSection({ asPage = false }: PricingSectionProps) {
  const Heading = asPage ? "h1" : "h2";

  return (
    <section
      id={asPage ? undefined : "pricing"}
      className={
        asPage
          ? "bg-[#fffdf8] px-5 py-12 sm:px-8 lg:px-12 lg:py-16"
          : "scroll-mt-32 bg-[#fffdf8] px-5 pb-16 sm:px-8 lg:px-12"
      }
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <SparkleIcon className="mx-auto mb-3 h-6 w-6 text-sun-deep" />
          <Heading className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, upfront pricing.
          </Heading>
        </div>

        <div className="mx-auto grid max-w-3xl gap-5">
          {pricingListings.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.6rem] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5 sm:px-8"
            >
              <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
              {item.subtitle ? (
                <p className="mt-0.5 text-sm font-medium text-muted">
                  {item.subtitle}
                </p>
              ) : null}

              <div className="mt-5 overflow-hidden rounded-2xl border border-ink/10 bg-cream/40">
                {item.tiers.map((tier, index) => (
                  <div
                    key={tier.sqftLabel}
                    className={`flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 ${
                      index > 0 ? "border-t border-ink/10" : ""
                    }`}
                  >
                    <SqftTierLabel label={tier.sqftLabel} />
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
                  {item.largeHomePrompt}
                </span>{" "}
                <Link
                  href="/quote"
                  className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
                >
                  Request a personalized quote →
                </Link>
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-[0.95rem] leading-7 text-muted">
          Starting rates shown are for homes in light condition. Final pricing
          depends on home size, condition, scope, and cleaning needs.{" "}
          <Link
            href="/quote"
            className="font-semibold text-ink underline decoration-sun underline-offset-2 hover:text-ink/80"
          >
            Get a free personalized quote
          </Link>{" "}
          — no obligation.
        </p>
      </div>
    </section>
  );
}
