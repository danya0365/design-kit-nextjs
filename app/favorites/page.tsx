import { FavoritesView } from "@/src/presentation/components/favorites/FavoritesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites | Design Kit",
  description: "Your favorited components.",
};

export default function FavoritesPage() {
  return <FavoritesView />;
}
