import { PricingView } from "@/src/presentation/components/pricing/PricingView";
import { createServerPricingPresenter } from "@/src/presentation/presenters/pricing/PricingPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerPricingPresenter();
  return presenter.generateMetadata();
}

export default async function PricingPage() {
  const presenter = await createServerPricingPresenter();
  try {
    const viewModel = await presenter.getViewModel();
    return <PricingView initialViewModel={viewModel} />;
  } catch {
    return <PricingView />;
  }
}
