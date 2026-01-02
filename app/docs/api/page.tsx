import { DocsApiView } from "@/src/presentation/components/docs/DocsApiView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Reference | Design Kit",
  description: "API documentation for Design Kit.",
};

export default function DocsApiPage() {
  return <DocsApiView />;
}
