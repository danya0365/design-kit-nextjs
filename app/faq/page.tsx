import { FaqView } from "@/src/presentation/components/faq/FaqView";
import { createServerFaqPresenter } from "@/src/presentation/presenters/faq/FaqPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerFaqPresenter();
  return presenter.generateMetadata();
}

export default async function FaqPage() {
  const presenter = await createServerFaqPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <FaqView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return <FaqView />;
  }
}
