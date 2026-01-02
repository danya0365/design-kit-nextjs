"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { AboutPresenter } from "./AboutPresenter";

export function createClientAboutPresenter(): AboutPresenter {
  const supabase = createClientSupabaseClient();
  return new AboutPresenter(supabase);
}
