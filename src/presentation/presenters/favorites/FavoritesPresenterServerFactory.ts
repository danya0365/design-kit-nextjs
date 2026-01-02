import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { FavoritesPresenter } from "./FavoritesPresenter";

export async function createServerFavoritesPresenter(): Promise<FavoritesPresenter> {
  const supabase = await createServerSupabaseClient();
  return new FavoritesPresenter(supabase);
}
