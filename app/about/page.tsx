import { AboutView } from "@/src/presentation/components/about/AboutView";
import { createServerAboutPresenter } from "@/src/presentation/presenters/about/AboutPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerAboutPresenter();
  return presenter.generateMetadata();
}

export default async function AboutPage() {
  const presenter = await createServerAboutPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <AboutView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching about data:", error);
    return <AboutView />;
  }
}
