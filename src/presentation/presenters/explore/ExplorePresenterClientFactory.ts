"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { ExplorePresenter } from "./ExplorePresenter";

export function createClientExplorePresenter(): ExplorePresenter {
  const supabase = createClientSupabaseClient();
  return new ExplorePresenter(supabase);
}
