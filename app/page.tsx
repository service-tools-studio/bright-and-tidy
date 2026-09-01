import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/app/components/footer";
import { Header } from "@/app/components/header";
import {
  BuildingIcon,
  CheckIcon,
  HardHatIcon,
  HouseIcon,
  KeysIcon,
  PhoneIcon,
  ShieldIcon,
  SparkleIcon,
} from "@/app/components/icons";
import { site } from "@/app/lib/site";

const highlights = [
  "Trusted & dependable",
  "Detail-oriented",
  "Satisfaction guaranteed",
];

const services = [
  {
    title: "Residential Cleaning",
    description: "Recurring, deep, move-in & move-out",
    icon: HouseIcon,
  },
  {
    title: "Commercial Cleaning",
    description: "Offices, common areas & more",
    icon: BuildingIcon,
  },
  {
    title: "Post-Construction Cleaning",
    description: "We handle the dust so you can move forward",
    icon: HardHatIcon,
  },
  {
    title: "Property Management Partnerships",
    description: "Turnover cleanings for rental units",
    icon: KeysIcon,
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-cream text-ink">
      <section className="relative isolate">
        <Header />

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-4 sm:px-8 lg:px-12 lg:pb-24">
          <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(7.5rem,0.9fr)] items-start gap-x-4 gap-y-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] sm:gap-x-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-8">
            <h1 className="relative z-10 col-span-2 font-serif text-[2.55rem] leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:text-[3.6rem]">
              Life feels{" "}
              <em className="font-serif text-gold not-italic">brighter</em>
              <span className="mt-1 block">in a clean home.</span>
            </h1>

            <div className="relative z-10 col-start-1 min-w-0 lg:row-start-2">
              <p className="max-w-md text-lg leading-7 text-muted sm:text-xl">
                {site.tagline}
              </p>

              <ul className="mt-6 space-y-3">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-[1.05rem] font-medium"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sun text-white">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/quote"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-3.5 text-base font-semibold text-ink shadow-[0_8px_20px_rgba(229,184,46,0.35)] transition-transform hover:-translate-y-0.5 hover:bg-sun-deep sm:px-7 sm:text-lg"
              >
                <SparkleIcon className="h-4 w-4" />
                Get a Free Quote
              </Link>

              <p className="mt-5 flex items-center gap-2 text-sm text-muted">
                <ShieldIcon className="h-5 w-5 shrink-0 text-gold" />
                Insured. Background-checked. Professional.
              </p>
            </div>

            <div className="relative col-start-2 row-start-2 h-[16.5rem] overflow-hidden rounded-l-[999px] sm:h-[22rem] lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:h-[34rem]">
              <Image
                src="/hero-living-room.jpg"
                alt="A bright, freshly cleaned living room"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 50vw"
                className="object-cover object-[center_35%]"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-32 bg-[#fffdf8] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <SparkleIcon className="mx-auto mb-3 h-6 w-6 text-sun-deep" />
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Cleaning services that fit your life.
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-[1.6rem] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5"
              >
                <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-sun/80 text-ink">
                  <service.icon className="h-7 w-7" />
                </span>
                <h3 className="font-serif text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-6 text-muted">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-32 bg-[#fffdf8] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] bg-mint px-7 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-14 lg:py-14">
          <div>
            <SparkleIcon className="mb-4 h-6 w-6 text-sun-deep" />
            <h2 className="font-serif text-3xl leading-tight font-semibold sm:text-4xl">
              A local cleaning company you can count on.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-muted">
              Bright & Tidy Cleaning is a locally owned Portland cleaning
              company built around a simple idea: getting your home
              professionally cleaned should be easy, dependable, and leave you
              feeling great about your space.
            </p>
            <p className="script-underline font-script mt-5 inline-block pb-2 text-[2rem] leading-none text-ink">
              Let us do the dirty work.
            </p>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-32 bg-[#fffdf8] px-5 pb-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <SparkleIcon className="mx-auto mb-3 h-6 w-6 text-sun-deep" />
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              A clean home in three easy steps.
            </h2>
          </div>

          <ol className="grid gap-5 md:grid-cols-3">
            {[
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
            ].map((item) => (
              <li
                key={item.step}
                className="rounded-[1.6rem] bg-white px-6 py-7 shadow-[0_10px_30px_rgba(47,47,47,0.06)] ring-1 ring-ink/5"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-sun font-serif text-xl font-semibold text-ink">
                  {item.step}
                </span>
                <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
                  {item.title}
                  {item.sparkle ? <SparkleIcon className="h-5 w-5 text-gold" /> : null}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-6 text-muted">
                  {item.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sparkle-field px-5 py-16 text-center sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Ready for a brighter space?
          </h2>
          <Link
            href="/quote"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-lg font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            <SparkleIcon className="h-4 w-4 text-sun" />
            Get Your Free Quote
          </Link>
          <a
            href={site.phoneHref}
            className="mt-6 flex items-center justify-center gap-2 text-base font-medium text-ink/80 hover:text-ink"
          >
            <PhoneIcon className="h-5 w-5" />
            Call or text {site.phoneDisplay}
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
}
