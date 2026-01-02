
// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Component {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  price: number;
  is_free: boolean;
  is_featured: boolean;
  preview_url: string;
  rating: number;
  download_count: number;
  view_count: number;
  tags: string[];
  category?: Category | null;
}

export interface HomeViewModel {
  featuredComponents: Component[];
  latestComponents: Component[];
  categories: Category[];
  stats: {
    totalComponents: number;
    totalCreators: number;
    totalDownloads: number;
  };
}

/**
 * Presenter for Home page
 * Follows Clean Architecture with proper separation of concerns
 */
export class HomePresenter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly supabase: any) {}

  /**
   * Get view model for the home page
   */
  async getViewModel(): Promise<HomeViewModel> {
    const [featuredComponents, latestComponents, categories, stats] =
      await Promise.all([
        this.getFeaturedComponents(6),
        this.getLatestComponents(8),
        this.getCategories(),
        this.getStats(),
      ]);

    return {
      featuredComponents,
      latestComponents,
      categories,
      stats,
    };
  }

  /**
   * Get featured components
   */
  async getFeaturedComponents(limit: number = 6): Promise<Component[]> {
    const { data, error } = await this.supabase
      .from("components")
      .select("*, category:categories(id, name, slug, icon)")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching featured components:", error);
      return [];
    }

    return (data as Component[]) || [];
  }

  /**
   * Get latest components
   */
  async getLatestComponents(limit: number = 8): Promise<Component[]> {
    const { data, error } = await this.supabase
      .from("components")
      .select("*, category:categories(id, name, slug, icon)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error("Error fetching latest components:", error);
      return [];
    }

    return (data as Component[]) || [];
  }

  /**
   * Get categories
   */
  async getCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching categories:", error);
      return [];
    }

    return (data as Category[]) || [];
  }

  /**
   * Get stats
   */
  async getStats(): Promise<HomeViewModel["stats"]> {
    const [componentsResult, creatorsResult] = await Promise.all([
      this.supabase.from("components").select("*", { count: "exact" }),
      this.supabase.from("profiles").select("*", { count: "exact" }).eq("role", "creator"),
    ]);

    const totalDownloads = componentsResult.data?.reduce(
      (sum: number, c: Component) => sum + (c.download_count || 0),
      0
    ) || 0;

    return {
      totalComponents: componentsResult.count || 0,
      totalCreators: creatorsResult.count || 0,
      totalDownloads,
    };
  }

  /**
   * Generate metadata for SEO
   */
  generateMetadata() {
    return {
      title: "Design Kit - Premium UI Component Marketplace",
      description: "Discover and export beautiful UI components for HTML, React, and Next.js. Design once, export anywhere.",
    };
  }
}
