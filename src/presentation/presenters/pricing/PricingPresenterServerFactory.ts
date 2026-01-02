import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { PricingPresenter } from "./PricingPresenter";
export async function createServerPricingPresenter(): Promise<PricingPresenter> {
  const supabase = await createServerSupabaseClient();
  return new PricingPresenter(supabase);
}
