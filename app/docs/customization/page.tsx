import { DocsCustomizationView } from "@/src/presentation/components/docs/DocsCustomizationView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customization | Design Kit Docs",
  description: "Learn how to customize Design Kit themes and styles",
};

export default function DocsCustomizationPage() {
  return <DocsCustomizationView />;
}
