/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PricingTier {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  isPopular: boolean;
  cta: string;
}

export interface PricingViewModel {
  tiers: PricingTier[];
}

export class PricingPresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(): Promise<PricingViewModel> {
    return {
      tiers: [
        {
          name: "Free",
          price: 0,
          period: "forever",
          description: "Perfect for trying out Design Kit",
          features: ["Access to free components", "HTML & React export", "Community support"],
          isPopular: false,
          cta: "Get Started",
        },
        {
          name: "Pro",
          price: 19,
          period: "month",
          description: "Best for individual developers",
          features: ["All free features", "Unlimited component purchases", "Priority support", "Commercial license"],
          isPopular: true,
          cta: "Start Pro",
        },
        {
          name: "Team",
          price: 49,
          period: "month",
          description: "For teams and agencies",
          features: ["All Pro features", "Team collaboration", "Shared library", "Dedicated support", "Custom components"],
          isPopular: false,
          cta: "Contact Sales",
        },
      ],
    };
  }

  generateMetadata() {
    return {
      title: "Pricing | Design Kit",
      description: "Simple, transparent pricing for everyone.",
    };
  }
}
