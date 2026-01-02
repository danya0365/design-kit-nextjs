/* eslint-disable @typescript-eslint/no-explicit-any */

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

export interface ComponentsFilters {
  category?: string;
  search?: string;
  priceRange?: "free" | "paid" | "all";
  sortBy?: "newest" | "popular" | "price-low" | "price-high" | "rating";
}

export interface ComponentsViewModel {
  components: Component[];
  categories: Category[];
  totalCount: number;
  page: number;
  perPage: number;
  filters: ComponentsFilters;
}

/**
 * Presenter for Components listing page
 * Follows Clean Architecture with proper separation of concerns
 */
export class ComponentsPresenter {
  constructor(private readonly supabase: any) {}

  /**
   * Get view model for the components page
   */
  async getViewModel(
    page: number = 1,
    perPage: number = 12,
    filters: ComponentsFilters = {}
  ): Promise<ComponentsViewModel> {
    const [result, categories] = await Promise.all([
      this.getComponents(page, perPage, filters),
      this.getCategories(),
    ]);

    return {
      components: result.components,
      categories,
      totalCount: result.totalCount,
      page,
      perPage,
      filters,
    };
  }

  /**
   * Get paginated components with filters
   */
  async getComponents(
    page: number = 1,
    perPage: number = 12,
    filters: ComponentsFilters = {}
  ): Promise<{ components: Component[]; totalCount: number }> {
    let query = this.supabase
      .from("components")
      .select("*, category:categories(id, name, slug, icon)", { count: "exact" });

    // Apply filters
    if (filters.category) {
      query = query.eq("category_id", filters.category);
    }

    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    if (filters.priceRange === "free") {
      query = query.eq("is_free", true);
    } else if (filters.priceRange === "paid") {
      query = query.eq("is_free", false);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "popular":
        query = query.order("download_count", { ascending: false });
        break;
      case "price-low":
        query = query.order("price", { ascending: true });
        break;
      case "price-high":
        query = query.order("price", { ascending: false });
        break;
      case "rating":
        query = query.order("rating", { ascending: false });
        break;
      case "newest":
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }

    // Apply pagination
    const start = (page - 1) * perPage;
    query = query.range(start, start + perPage - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching components:", error);
      return { components: [], totalCount: 0 };
    }

    return {
      components: (data as Component[]) || [],
      totalCount: count || 0,
    };
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
   * Generate metadata for SEO
   */
  generateMetadata(filters: ComponentsFilters = {}) {
    let title = "Browse Components";
    if (filters.search) {
      title = `Search: ${filters.search}`;
    }
    if (filters.category) {
      title = `${filters.category} Components`;
    }

    return {
      title: `${title} | Design Kit`,
      description: "Browse and discover beautiful UI components for your next project.",
    };
  }
}
