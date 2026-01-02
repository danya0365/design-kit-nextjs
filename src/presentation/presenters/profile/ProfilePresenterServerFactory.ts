import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { ProfilePresenter } from "./ProfilePresenter";
export async function createServerProfilePresenter(): Promise<ProfilePresenter> {
  const supabase = await createServerSupabaseClient();
  return new ProfilePresenter(supabase);
}
