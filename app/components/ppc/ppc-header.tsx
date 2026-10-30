import Link from "next/link";
import { Logo } from "@/app/components/logo";

export function PpcHeader() {
  return (
    <header className="border-b border-ink/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Bright & Tidy Cleaning home">
          <Logo className="h-20 w-20 sm:h-24 sm:w-24" />
        </Link>
      </div>
    </header>
  );
}
