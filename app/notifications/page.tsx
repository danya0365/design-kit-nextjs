import { NotificationsView } from "@/src/presentation/components/notifications/NotificationsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notifications | Design Kit",
  description: "View your notifications.",
};

export default function NotificationsPage() {
  return <NotificationsView />;
}
