import { RoadmapView } from "@/src/presentation/components/roadmap/RoadmapView";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Roadmap | Design Kit", description: "See what's coming next." };
export default function RoadmapPage() { return <RoadmapView />; }
