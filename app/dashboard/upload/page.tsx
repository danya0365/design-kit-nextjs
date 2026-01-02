import { DashboardUploadView } from "@/src/presentation/components/dashboard/DashboardUploadView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Component | Design Kit",
  description: "Upload a new component to the marketplace.",
};

export default function DashboardUploadPage() {
  return <DashboardUploadView />;
}
