import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { ExplorePresenter } from "./ExplorePresenter";

export async function createServerExplorePresenter(): Promise<ExplorePresenter> {
  const supabase = await createServerSupabaseClient();
  return new ExplorePresenter(supabase);
}
