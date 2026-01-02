import { DashboardAnalyticsView } from "@/src/presentation/components/dashboard/DashboardAnalyticsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | Design Kit",
  description: "View detailed analytics for your components.",
};

export default function DashboardAnalyticsPage() {
  return <DashboardAnalyticsView />;
}
