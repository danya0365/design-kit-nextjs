import { DashboardView } from "@/src/presentation/components/dashboard/DashboardView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Design Kit",
  description: "Manage your components and earnings.",
};

export default function DashboardPage() {
  return <DashboardView />;
}
