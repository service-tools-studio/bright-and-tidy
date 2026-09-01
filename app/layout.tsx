import type { Metadata } from "next";
import { Allura, Fraunces, Nunito_Sans } from "next/font/google";
import { CallNowBar } from "@/app/components/call-now-bar";
import { site } from "@/app/lib/site";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Life feels brighter in a clean home.`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${nunito.variable} ${fraunces.variable} ${allura.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans pb-24">
        {children}
        <CallNowBar />
      </body>
    </html>
  );
}
