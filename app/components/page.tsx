import { ComponentsView } from "@/src/presentation/components/components/ComponentsView";
import { createServerComponentsPresenter } from "@/src/presentation/presenters/components/ComponentsPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";

// Dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerComponentsPresenter();
  return presenter.generateMetadata();
}

export default async function ComponentsPage() {
  const presenter = createServerComponentsPresenter();

  try {
    const viewModel = await presenter.getViewModel();
    return <ComponentsView initialViewModel={viewModel} />;
  } catch (error) {
    console.error("Error fetching components:", error);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            เกิดข้อผิดพลาด
          </h1>
          <p className="text-muted mb-4">ไม่สามารถโหลดข้อมูล Components ได้</p>
          <Link
            href="/"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}
