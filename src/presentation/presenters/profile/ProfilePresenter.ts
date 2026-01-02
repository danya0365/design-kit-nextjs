/* eslint-disable @typescript-eslint/no-explicit-any */

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url: string;
  role: string;
  bio?: string;
  website?: string;
  created_at: string;
}

export interface ProfileViewModel {
  user: UserProfile;
  stats: { purchases: number; favorites: number; downloads: number };
}

export class ProfilePresenter {
  constructor(private readonly supabase: any) {}

  async getViewModel(): Promise<ProfileViewModel> {
    const { data } = await this.supabase.auth.getUser();
    const userId = data?.user?.id || "user-001";

    const { data: profile } = await this.supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    return {
      user: profile || {
        id: userId,
        email: data?.user?.email || "demo@designkit.com",
        full_name: "Demo User",
        username: "demouser",
        avatar_url: "https://i.pravatar.cc/200?u=demo",
        role: "user",
        created_at: new Date().toISOString(),
      },
      stats: { purchases: 3, favorites: 5, downloads: 12 },
    };
  }

  generateMetadata() {
    return { title: "Profile | Design Kit", description: "Manage your profile." };
  }
}
