import { ContactView } from "@/src/presentation/components/contact/ContactView";
import { createServerContactPresenter } from "@/src/presentation/presenters/contact/ContactPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerContactPresenter();
  return presenter.generateMetadata();
}

export default async function ContactPage() {
  const presenter = await createServerContactPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <ContactView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return <ContactView />;
  }
}
