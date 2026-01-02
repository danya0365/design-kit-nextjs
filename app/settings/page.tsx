import { SettingsView } from "@/src/presentation/components/settings/SettingsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | Design Kit",
  description: "Manage your account settings.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
