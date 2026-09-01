"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HashLink } from "@/app/components/hash-link";
import { CloseIcon, MenuIcon } from "@/app/components/icons";
import { Logo } from "@/app/components/logo";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#process", label: "Our Process" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
  { href: "/quote", label: "Get a Quote" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-30 flex items-start justify-between px-5 pt-5 sm:px-8 lg:px-12">
      <Link
        href="/"
        aria-label="Bright & Tidy Cleaning home"
        className="fixed top-5 left-5 z-40 inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink sm:left-8 lg:left-12"
        onClick={() => {
          if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
      >
        <Logo className="h-28 w-28 sm:h-32 sm:w-32" />
      </Link>
      <div className="h-28 w-28 sm:h-32 sm:w-32" aria-hidden />

      <nav className="fixed top-8 right-5 z-40 hidden items-center gap-5 sm:right-8 md:flex lg:right-12 lg:gap-8">
        {links.map((link) => (
          <HashLink
            key={link.href}
            href={link.href}
            className="text-sm font-semibold tracking-wide text-ink/80 transition-colors hover:text-ink"
          >
            {link.label}
          </HashLink>
        ))}
      </nav>

      <button
        type="button"
        className="fixed top-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-sun text-ink shadow-sm transition-colors hover:bg-sun-deep sm:right-8 md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed right-5 top-20 z-40 w-[min(18rem,calc(100vw-2.5rem))] rounded-3xl bg-white p-5 shadow-xl ring-1 ring-ink/5 sm:right-8 md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <HashLink
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-ink hover:bg-cream"
              >
                {link.label}
              </HashLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
