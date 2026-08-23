import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function SparkleIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 1.2c.35 3.9 2.2 6.55 6.4 7.8-4.2 1.25-6.05 3.9-6.4 7.8-.35-3.9-2.2-6.55-6.4-7.8 4.2-1.25 6.05-3.9 6.4-7.8Z" />
    </svg>
  );
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m6 12.5 4 4 8-9" />
    </svg>
  );
}

export function ShieldIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M12 3.2 19.2 6v6.1c0 4.4-3 7.4-7.2 8.7-4.2-1.3-7.2-4.3-7.2-8.7V6L12 3.2Z" />
      <path d="m8.8 12 2.2 2.2 4.4-4.6" />
    </svg>
  );
}

export function PhoneIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M8.2 4.8h2.1l1.2 3-1.7 1a11 11 0 0 0 5.4 5.4l1-1.7 3 1.2v2.1a1.8 1.8 0 0 1-2 1.8A14.4 14.4 0 0 1 6.4 6.8a1.8 1.8 0 0 1 1.8-2Z" />
    </svg>
  );
}

export function MenuIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 8h14M5 12h14M5 16h14" />
    </svg>
  );
}

export function CloseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m7 7 10 10M17 7 7 17" />
    </svg>
  );
}

export function HouseIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="m4 11 8-7 8 7v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M10 21v-7h4v7" />
    </svg>
  );
}

export function BuildingIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 21V5.8A1.8 1.8 0 0 1 6.8 4h6.4A1.8 1.8 0 0 1 15 5.8V21" />
      <path d="M15 10h3.2A1.8 1.8 0 0 1 20 11.8V21" />
      <path d="M3 21h18M8 8h2M8 12h2M8 16h2" />
    </svg>
  );
}

export function KeysIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <circle cx="8" cy="10" r="3.2" />
      <path d="M11 10h9l-2 2 2 2" />
      <circle cx="15.5" cy="16.2" r="2.4" />
      <path d="M17.6 17.6 21 21" />
    </svg>
  );
}

export function HardHatIcon({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <path d="M5 14.2c0-4.4 3.1-8 7-8s7 3.6 7 8" />
      <path d="M12 6.2V4.4" />
      <path d="M12 6.2v8" />
      <path d="M3.6 16.2h16.8c.6 0 1 .5.9 1.1l-.3 1.4A1.6 1.6 0 0 1 19.5 20H4.5a1.6 1.6 0 0 1-1.5-1.3l-.3-1.4c-.1-.6.3-1.1.9-1.1Z" />
      <path d="M7.2 14.2h9.6" />
    </svg>
  );
}
