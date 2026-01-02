import { ChangelogView } from "@/src/presentation/components/changelog/ChangelogView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Changelog | Design Kit", description: "See what's new in Design Kit." };

export default function ChangelogPage() { return <ChangelogView />; }
