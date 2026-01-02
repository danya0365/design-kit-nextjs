import { PrivacyView } from "@/src/presentation/components/privacy/PrivacyView";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | Design Kit", description: "Our privacy policy." };
export default function PrivacyPage() { return <PrivacyView />; }
