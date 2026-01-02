import { DocsView } from "@/src/presentation/components/docs/DocsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation | Design Kit",
  description: "Learn how to use Design Kit components.",
};

export default function DocsPage() {
  return <DocsView />;
}
