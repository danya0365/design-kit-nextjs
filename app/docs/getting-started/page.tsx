import { DocsGettingStartedView } from "@/src/presentation/components/docs/DocsGettingStartedView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Getting Started | Design Kit Docs",
  description: "Get started with Design Kit - Installation and setup guide",
};

export default function DocsGettingStartedPage() {
  return <DocsGettingStartedView />;
}
