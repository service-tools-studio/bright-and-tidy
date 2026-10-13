export type PricingTier = {
  maxSqft: number;
  startingAt: number;
  sqftLabel: string;
};

export type PricingListing = {
  title: string;
  subtitle?: string;
  largeHomePrompt: string;
  tiers: PricingTier[];
};

function formatStartingAt(amount: number): string {
  return `$${Math.round(amount).toLocaleString("en-US")}`;
}

export const pricingListings: PricingListing[] = [
  {
    title: "Standard Cleaning",
    subtitle: "Weekly or bi-weekly",
    largeHomePrompt: "Home over 3,000 sq ft?",
    tiers: [
      {
        maxSqft: 1500,
        startingAt: 150,
        sqftLabel: "Homes up to 1,500 sq ft",
      },
      {
        maxSqft: 2000,
        startingAt: 222,
        sqftLabel: "Homes up to 2,000 sq ft",
      },
      {
        maxSqft: 3000,
        startingAt: 292,
        sqftLabel: "Homes up to 3,000 sq ft",
      },
    ],
  },
  {
    title: "Deep Cleaning",
    largeHomePrompt: "Home over 2,000 sq ft?",
    tiers: [
      {
        maxSqft: 1000,
        startingAt: 250,
        sqftLabel: "Homes up to 1,000 sq ft",
      },
      {
        maxSqft: 1500,
        startingAt: 300,
        sqftLabel: "Homes up to 1,500 sq ft",
      },
      {
        maxSqft: 2000,
        startingAt: 429,
        sqftLabel: "Homes up to 2,000 sq ft",
      },
    ],
  },
  {
    title: "Move-In / Move-Out Cleaning",
    largeHomePrompt: "Home over 2,000 sq ft?",
    tiers: [
      {
        maxSqft: 1000,
        startingAt: 350,
        sqftLabel: "Homes up to 1,000 sq ft",
      },
      {
        maxSqft: 1500,
        startingAt: 460,
        sqftLabel: "Homes up to 1,500 sq ft",
      },
      {
        maxSqft: 2000,
        startingAt: 660,
        sqftLabel: "Homes up to 2,000 sq ft",
      },
    ],
  },
];

export function formatPricingAmount(amount: number): string {
  return formatStartingAt(amount);
}
