import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { FaqPresenter } from "./FaqPresenter";

export async function createServerFaqPresenter(): Promise<FaqPresenter> {
  const supabase = await createServerSupabaseClient();
  return new FaqPresenter(supabase);
}
