"use client";
import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { PricingPresenter } from "./PricingPresenter";
export function createClientPricingPresenter(): PricingPresenter {
  const supabase = createClientSupabaseClient();
  return new PricingPresenter(supabase);
}
