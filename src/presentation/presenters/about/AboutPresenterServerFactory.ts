import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { AboutPresenter } from "./AboutPresenter";

export async function createServerAboutPresenter(): Promise<AboutPresenter> {
  const supabase = await createServerSupabaseClient();
  return new AboutPresenter(supabase);
}
