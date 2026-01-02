import { ComponentDetailView } from "@/src/presentation/components/component-detail/ComponentDetailView";
import { createServerComponentDetailPresenter } from "@/src/presentation/presenters/component-detail/ComponentDetailPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface ComponentDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  params,
}: ComponentDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const presenter = await createServerComponentDetailPresenter();

  try {
    return presenter.generateMetadata(resolvedParams.id);
  } catch (error) {
    console.error("Error generating metadata:", error);

    return {
      title: "Component | Design Kit",
      description: "View component details",
    };
  }
}

/**
 * Component Detail page - Server Component for SEO optimization
 */
export default async function ComponentDetailPage({ params }: ComponentDetailPageProps) {
  const resolvedParams = await params;
  const presenter = await createServerComponentDetailPresenter();

  try {
    const viewModel = await presenter.getViewModel(resolvedParams.id);

    return <ComponentDetailView componentId={resolvedParams.id} initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching component:", error);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            ไม่สามารถโหลด Component ได้
          </p>
          <Link
            href="/components"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            กลับไปหน้า Components
          </Link>
        </div>
      </div>
    );
  }
}
