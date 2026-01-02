import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { BlogPresenter } from "./BlogPresenter";

export async function createServerBlogPresenter(): Promise<BlogPresenter> {
  const supabase = await createServerSupabaseClient();
  return new BlogPresenter(supabase);
}
