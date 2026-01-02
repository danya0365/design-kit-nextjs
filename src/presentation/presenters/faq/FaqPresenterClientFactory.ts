"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { FaqPresenter } from "./FaqPresenter";

export function createClientFaqPresenter(): FaqPresenter {
  const supabase = createClientSupabaseClient();
  return new FaqPresenter(supabase);
}
