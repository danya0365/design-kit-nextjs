"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { BlogPresenter } from "./BlogPresenter";

export function createClientBlogPresenter(): BlogPresenter {
  const supabase = createClientSupabaseClient();
  return new BlogPresenter(supabase);
}
