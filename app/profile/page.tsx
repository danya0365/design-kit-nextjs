import { ProfileView } from "@/src/presentation/components/profile/ProfileView";
import { createServerProfilePresenter } from "@/src/presentation/presenters/profile/ProfilePresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerProfilePresenter();
  return presenter.generateMetadata();
}

export default async function ProfilePage() {
  const presenter = await createServerProfilePresenter();
  try {
    const viewModel = await presenter.getViewModel();
    return <ProfileView initialViewModel={viewModel} />;
  } catch { return <ProfileView />; }
}
