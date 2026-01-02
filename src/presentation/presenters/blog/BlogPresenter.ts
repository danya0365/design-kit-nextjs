/* eslint-disable @typescript-eslint/no-explicit-any */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author_id: string;
  published_at: string;
  read_time: string;
  is_featured: boolean;
}

export interface BlogViewModel {
  posts: BlogPost[];
  featuredPost: BlogPost | null;
  categories: string[];
}

export class BlogPresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(category?: string): Promise<BlogViewModel> {
    const { data } = await this.supabase
      .from("blog_posts")
      .select("*")
      .order("published_at", { ascending: false });

    let posts = (data || []) as BlogPost[];
    const featuredPost = posts.find((p) => p.is_featured) || null;
    const categories = ["all", ...new Set(posts.map((p) => p.category))];

    if (category && category !== "all") {
      posts = posts.filter((p) => p.category === category);
    }

    return { posts, featuredPost, categories };
  }

  generateMetadata() {
    return {
      title: "Blog | Design Kit",
      description: "Read the latest news, tutorials, and updates from Design Kit.",
    };
  }
}
