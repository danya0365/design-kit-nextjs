import { createServerSupabaseClient } from "@/src/infrastructure/config/supabase-server-client";
import { ComponentsPresenter } from "./ComponentsPresenter";

export class ComponentsPresenterServerFactory {
  static async create(): Promise<ComponentsPresenter> {
    const supabase = await createServerSupabaseClient();
    return new ComponentsPresenter(supabase);
  }
}

export async function createServerComponentsPresenter(): Promise<ComponentsPresenter> {
  return ComponentsPresenterServerFactory.create();
}
