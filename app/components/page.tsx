import { ComponentsView } from "@/src/presentation/components/components/ComponentsView";
import { createServerComponentsPresenter } from "@/src/presentation/presenters/components/ComponentsPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface ComponentsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  searchParams,
}: ComponentsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const presenter = await createServerComponentsPresenter();

  try {
    return presenter.generateMetadata({
      category: params?.category as string,
      search: params?.search as string,
    });
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Browse Components | Design Kit",
      description: "Discover beautiful UI components for your next project.",
    };
  }
}

/**
 * Components listing page - Server Component for SEO optimization
 */
export default async function ComponentsPage({ searchParams }: ComponentsPageProps) {
  const params = await searchParams;
  const presenter = await createServerComponentsPresenter();

  try {
    const page = parseInt(params?.page as string) || 1;
    const filters = {
      category: params?.category as string,
      search: params?.search as string,
      priceRange: params?.price as "free" | "paid" | "all",
      sortBy: params?.sort as "newest" | "popular" | "price-low" | "price-high" | "rating",
    };

    const viewModel = await presenter.getViewModel(page, 12, filters);

    return <ComponentsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching components:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลด Components ได้
          </p>
          <Link
            href="/components"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            ลองใหม่อีกครั้ง
          </Link>
        </div>
      </div>
    );
  }
}
