/* eslint-disable @typescript-eslint/no-explicit-any */

export interface FavoriteComponent {
  id: string;
  name: string;
  description: string;
  preview_url: string;
  price: number;
  is_free: boolean;
  rating: number;
  category?: { id: string; name: string; icon: string } | null;
}

export interface FavoritesViewModel {
  favorites: FavoriteComponent[];
}

export class FavoritesPresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(favoriteIds: string[]): Promise<FavoritesViewModel> {
    if (favoriteIds.length === 0) {
      return { favorites: [] };
    }

    const { data } = await this.supabase
      .from("components")
      .select("*, category:categories(id, name, icon)")
      .in("id", favoriteIds);

    return { favorites: (data || []) as FavoriteComponent[] };
  }

  generateMetadata() {
    return {
      title: "Favorites | Design Kit",
      description: "Your favorited components.",
    };
  }
}
