import Link from "next/link";
import { site } from "@/app/lib/site";

export function PpcFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream-deep px-5 py-8 text-center sm:px-8">
      <p className="text-sm text-muted">
        <Link href="/" className="font-semibold text-ink hover:text-ink/80">
          {site.name}
        </Link>
        {" · "}
        Portland, Oregon
      </p>
      <a
        href={site.phoneHref}
        className="mt-2 inline-block text-sm font-semibold text-ink underline decoration-sun underline-offset-2"
      >
        {site.phoneDisplay}
      </a>
      <p className="mt-4 text-xs text-muted">
        © {year} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
