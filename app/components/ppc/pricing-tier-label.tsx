export function PricingTierLabel({ label }: { label: string }) {
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
