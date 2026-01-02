"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { FavoritesPresenter } from "./FavoritesPresenter";

export function createClientFavoritesPresenter(): FavoritesPresenter {
  const supabase = createClientSupabaseClient();
  return new FavoritesPresenter(supabase);
}
