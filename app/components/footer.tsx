import { site } from "@/app/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink/10 bg-cream-deep px-5 py-3.5">
      <p className="text-center text-sm text-ink/80">
        © {year} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
