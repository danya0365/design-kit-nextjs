import { DocsComponentsView } from "@/src/presentation/components/docs/DocsComponentsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components | Design Kit Docs",
  description: "Browse the Design Kit component library",
};

export default function DocsComponentsPage() {
  return <DocsComponentsView />;
}
