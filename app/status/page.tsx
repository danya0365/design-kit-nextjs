import { StatusView } from "@/src/presentation/components/status/StatusView";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Status | Design Kit", description: "System status and uptime." };
export default function StatusPage() { return <StatusView />; }
