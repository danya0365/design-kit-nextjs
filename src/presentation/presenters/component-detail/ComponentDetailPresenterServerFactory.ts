import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { ComponentDetailPresenter } from "./ComponentDetailPresenter";

export class ComponentDetailPresenterServerFactory {
  static async create(): Promise<ComponentDetailPresenter> {
    const supabase = await createServerSupabaseClient();
    return new ComponentDetailPresenter(supabase);
  }
}

export async function createServerComponentDetailPresenter(): Promise<ComponentDetailPresenter> {
  return ComponentDetailPresenterServerFactory.create();
}
