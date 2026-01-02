"use client";
import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { ProfilePresenter } from "./ProfilePresenter";
export function createClientProfilePresenter(): ProfilePresenter {
  return new ProfilePresenter(createClientSupabaseClient());
}
