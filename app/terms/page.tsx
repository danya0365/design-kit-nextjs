import { TermsView } from "@/src/presentation/components/terms/TermsView";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service | Design Kit", description: "Our terms of service." };
export default function TermsPage() { return <TermsView />; }
