/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Creator {
  id: string;
  full_name: string;
  username: string;
  avatar_url: string;
  bio?: string;
  website?: string;
  total_sales?: number;
  total_earnings?: number;
  role: string;
}

export interface CreatorsViewModel {
  creators: Creator[];
  featuredCreators: Creator[];
}

export class CreatorsPresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(): Promise<CreatorsViewModel> {
    const { data } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("role", "creator")
      .order("total_sales", { ascending: false });

    const creators = (data || []) as Creator[];
    const featuredCreators = creators.slice(0, 3);

    return { creators, featuredCreators };
  }

  generateMetadata() {
    return {
      title: "Creators | Design Kit",
      description: "Meet our talented creators and browse their work.",
    };
  }
}
