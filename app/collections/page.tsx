import { CollectionsView } from "@/src/presentation/components/collections/CollectionsView";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Collections | Design Kit", description: "Curated component collections." };
export default function CollectionsPage() { return <CollectionsView />; }
