import { ExploreView } from "@/src/presentation/components/explore/ExploreView";
import { createServerExplorePresenter } from "@/src/presentation/presenters/explore/ExplorePresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerExplorePresenter();
  return presenter.generateMetadata();
}

export default async function ExplorePage() {
  const presenter = await createServerExplorePresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <ExploreView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching explore data:", error);
    return <ExploreView />;
  }
}
