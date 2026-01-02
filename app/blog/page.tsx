import { BlogView } from "@/src/presentation/components/blog/BlogView";
import { createServerBlogPresenter } from "@/src/presentation/presenters/blog/BlogPresenterServerFactory";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = await createServerBlogPresenter();
  return presenter.generateMetadata();
}

export default async function BlogPage() {
  const presenter = await createServerBlogPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <BlogView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return <BlogView />;
  }
}
