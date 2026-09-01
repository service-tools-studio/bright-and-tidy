"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

export function scrollToHash(href: string) {
  const hash = href.includes("#") ? href.slice(href.indexOf("#") + 1) : "";
  if (!hash) return;

  requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
  });
}

export function HashLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (typeof href !== "string" || !href.includes("#")) return;

        const onHome =
          window.location.pathname === "/" || window.location.pathname === "";
        if (!onHome) return;

        event.preventDefault();
        scrollToHash(href);
        const hash = href.slice(href.indexOf("#"));
        window.history.pushState(null, "", hash);
      }}
      {...props}
    />
  );
}
