import { CreatorsView } from "@/src/presentation/components/creators/CreatorsView";
import { createServerCreatorsPresenter } from "@/src/presentation/presenters/creators/CreatorsPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerCreatorsPresenter();
  return presenter.generateMetadata();
}

export default async function CreatorsPage() {
  const presenter = await createServerCreatorsPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <CreatorsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching creators data:", error);
    return <CreatorsView />;
  }
}
