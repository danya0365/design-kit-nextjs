import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { CreatorsPresenter } from "./CreatorsPresenter";

export async function createServerCreatorsPresenter(): Promise<CreatorsPresenter> {
  const supabase = await createServerSupabaseClient();
  return new CreatorsPresenter(supabase);
}
