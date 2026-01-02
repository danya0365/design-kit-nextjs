/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Component {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  price: number;
  is_free: boolean;
  preview_url: string;
  rating: number;
  download_count: number;
  view_count: number;
  created_at: string;
  category?: { id: string; name: string; icon: string } | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Creator {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  total_sales?: number;
}

export interface ExploreViewModel {
  trendingComponents: Component[];
  newComponents: Component[];
  categories: Category[];
  topCreators: Creator[];
}

/**
 * Presenter for Explore page
 */
export class ExplorePresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(): Promise<ExploreViewModel> {
    const [trendingComponents, newComponents, categories, topCreators] = await Promise.all([
      this.getTrendingComponents(),
      this.getNewComponents(),
      this.getCategories(),
      this.getTopCreators(),
    ]);

    return { trendingComponents, newComponents, categories, topCreators };
  }

  async getTrendingComponents(): Promise<Component[]> {
    const { data } = await this.supabase
      .from("components")
      .select("*, category:categories(id, name, icon)")
      .order("view_count", { ascending: false })
      .limit(8);
    return data || [];
  }

  async getNewComponents(): Promise<Component[]> {
    const { data } = await this.supabase
      .from("components")
      .select("*, category:categories(id, name, icon)")
      .order("created_at", { ascending: false })
      .limit(8);
    return data || [];
  }

  async getCategories(): Promise<Category[]> {
    const { data } = await this.supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });
    return data || [];
  }

  async getTopCreators(): Promise<Creator[]> {
    const { data } = await this.supabase
      .from("profiles")
      .select("id, full_name, username, avatar_url, total_sales")
      .eq("role", "creator")
      .order("total_sales", { ascending: false })
      .limit(4);
    return data || [];
  }

  generateMetadata() {
    return {
      title: "Explore | Design Kit",
      description: "Explore trending components, new additions, and top creators.",
    };
  }
}
