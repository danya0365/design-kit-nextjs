import { SupportView } from "@/src/presentation/components/support";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | Design Kit",
  description: "Get help and support for Design Kit",
};

export default function SupportPage() {
  return <SupportView />;
}
