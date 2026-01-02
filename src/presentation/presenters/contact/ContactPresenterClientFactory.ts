"use client";
import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { ContactPresenter } from "./ContactPresenter";
export function createClientContactPresenter(): ContactPresenter {
  const supabase = createClientSupabaseClient();
  return new ContactPresenter(supabase);
}
