"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { ComponentsPresenter } from "./ComponentsPresenter";

export class ComponentsPresenterClientFactory {
  static create(): ComponentsPresenter {
    const supabase = createClientSupabaseClient();
    return new ComponentsPresenter(supabase);
  }
}

export function createClientComponentsPresenter(): ComponentsPresenter {
  return ComponentsPresenterClientFactory.create();
}
