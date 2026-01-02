/* eslint-disable @typescript-eslint/no-explicit-any */

// Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface Creator {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  bio?: string;
}

export interface Review {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  helpful_count: number;
  created_at: string;
  user?: {
    full_name: string;
    avatar_url: string;
  };
}

export interface ComponentDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  category_id: string;
  creator_id: string;
  price: number;
  is_free: boolean;
  is_featured: boolean;
  preview_url: string;
  code_html?: string;
  code_react?: string;
  rating: number;
  download_count: number;
  view_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
  category?: Category | null;
  creator?: Creator | null;
}

export interface ComponentDetailViewModel {
  component: ComponentDetail | null;
  reviews: Review[];
  relatedComponents: ComponentDetail[];
}

/**
 * Presenter for Component Detail page
 */
export class ComponentDetailPresenter {
  constructor(private readonly supabase: any) {}

  /**
   * Get view model for the component detail page
   */
  async getViewModel(componentId: string): Promise<ComponentDetailViewModel> {
    const component = await this.getComponentById(componentId);

    if (!component) {
      return {
        component: null,
        reviews: [],
        relatedComponents: [],
      };
    }

    const [reviews, relatedComponents] = await Promise.all([
      this.getReviews(componentId),
      this.getRelatedComponents(component.category_id, componentId),
    ]);

    return {
      component,
      reviews,
      relatedComponents,
    };
  }

  /**
   * Get component by ID
   */
  async getComponentById(id: string): Promise<ComponentDetail | null> {
    const { data, error } = await this.supabase
      .from("components")
      .select("*, category:categories(id, name, slug, icon)")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching component:", error);
      return null;
    }

    // Get creator info
    if (data?.creator_id) {
      const { data: creator } = await this.supabase
        .from("profiles")
        .select("id, full_name, username, avatar_url, bio")
        .eq("id", data.creator_id)
        .single();

      data.creator = creator;
    }

    return data as ComponentDetail;
  }

  /**
   * Get reviews for component
   */
  async getReviews(componentId: string): Promise<Review[]> {
    const { data, error } = await this.supabase
      .from("reviews")
      .select("*")
      .eq("component_id", componentId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }

    return (data as Review[]) || [];
  }

  /**
   * Get related components
   */
  async getRelatedComponents(categoryId: string, excludeId: string): Promise<ComponentDetail[]> {
    const { data, error } = await this.supabase
      .from("components")
      .select("*, category:categories(id, name, slug, icon)")
      .eq("category_id", categoryId)
      .neq("id", excludeId)
      .limit(4);

    if (error) {
      console.error("Error fetching related components:", error);
      return [];
    }

    return (data as ComponentDetail[]) || [];
  }

  /**
   * Generate metadata for SEO
   */
  async generateMetadata(componentId: string) {
    const component = await this.getComponentById(componentId);

    if (!component) {
      return {
        title: "Component Not Found | Design Kit",
        description: "The requested component could not be found.",
      };
    }

    return {
      title: `${component.name} | Design Kit`,
      description: component.description,
    };
  }
}
