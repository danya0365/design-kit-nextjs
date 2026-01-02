import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { ContactPresenter } from "./ContactPresenter";

export async function createServerContactPresenter(): Promise<ContactPresenter> {
  const supabase = await createServerSupabaseClient();
  return new ContactPresenter(supabase);
}
