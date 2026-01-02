import { DownloadsView } from "@/src/presentation/components/downloads/DownloadsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads | Design Kit",
  description: "View and re-download your purchased components.",
};

export default function DownloadsPage() {
  return <DownloadsView />;
}
