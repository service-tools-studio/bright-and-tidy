import Image from "next/image";

export function Logo({ className = "h-20 w-20" }: { className?: string }) {
  return (
    <Image
      src="/Bright & Tidy - transparent (1).png"
      alt="Bright & Tidy Cleaning"
      width={160}
      height={160}
      priority
      className={className}
    />
  );
}
