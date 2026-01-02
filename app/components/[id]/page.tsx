import { ComponentDetailView } from "@/src/presentation/components/component-detail/ComponentDetailView";
import { createServerComponentDetailPresenter } from "@/src/presentation/presenters/component-detail/ComponentDetailPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

interface ComponentDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ComponentDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const presenter = createServerComponentDetailPresenter();
  const viewModel = await presenter.getViewModel(resolvedParams.id);
  return presenter.generateMetadata(viewModel.component);
}

export default async function ComponentDetailPage({
  params,
}: ComponentDetailPageProps) {
  const resolvedParams = await params;
  const presenter = createServerComponentDetailPresenter();

  try {
    const viewModel = await presenter.getViewModel(resolvedParams.id);
    return <ComponentDetailView viewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching component:", error);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูล Component ได้</p>
          <Link
            href="/components"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            กลับไปหน้า Components
          </Link>
        </div>
      </div>
    );
  }
}
