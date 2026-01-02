/* eslint-disable @typescript-eslint/no-explicit-any */

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface AboutStats {
  components: number;
  creators: number;
  downloads: number;
  countries: number;
}

export interface AboutViewModel {
  teamMembers: TeamMember[];
  stats: AboutStats;
  mission: string;
  story: string;
}

/**
 * Presenter for About page
 */
export class AboutPresenter {
  constructor(private readonly supabase: any) {}

  /**
   * Get view model for the about page
   */
  async getViewModel(): Promise<AboutViewModel> {
    const stats = await this.getStats();

    return {
      teamMembers: [
        { name: "Alex Chen", role: "Founder & CEO", avatar: "https://i.pravatar.cc/200?u=alex", bio: "10+ years in UI/UX design" },
        { name: "Sarah Kim", role: "Lead Designer", avatar: "https://i.pravatar.cc/200?u=sarah", bio: "Former design lead at Figma" },
        { name: "Mike Johnson", role: "CTO", avatar: "https://i.pravatar.cc/200?u=mike", bio: "Full-stack developer" },
        { name: "Emily Davis", role: "Community Lead", avatar: "https://i.pravatar.cc/200?u=emily", bio: "Building the creator community" },
      ],
      stats,
      mission: "Empowering developers and designers to build beautiful products faster.",
      story: "Design Kit started in 2024 with a simple idea: make premium UI components accessible to everyone. Today, we're a growing marketplace connecting talented creators with developers worldwide.",
    };
  }

  /**
   * Get stats from database
   */
  async getStats(): Promise<AboutStats> {
    const [componentsResult, creatorsResult] = await Promise.all([
      this.supabase.from("components").select("*", { count: "exact" }),
      this.supabase.from("profiles").select("*", { count: "exact" }).eq("role", "creator"),
    ]);

    const totalDownloads = componentsResult.data?.reduce(
      (sum: number, c: any) => sum + (c.download_count || 0),
      0
    ) || 0;

    return {
      components: componentsResult.count || 10,
      creators: creatorsResult.count || 3,
      downloads: totalDownloads || 10000,
      countries: 50,
    };
  }

  generateMetadata() {
    return {
      title: "About Us | Design Kit",
      description: "Learn about Design Kit, our mission, and the team behind the platform.",
    };
  }
}
