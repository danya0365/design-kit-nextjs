"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { ComponentDetailPresenter } from "./ComponentDetailPresenter";

export class ComponentDetailPresenterClientFactory {
  static create(): ComponentDetailPresenter {
    const supabase = createClientSupabaseClient();
    return new ComponentDetailPresenter(supabase);
  }
}

export function createClientComponentDetailPresenter(): ComponentDetailPresenter {
  return ComponentDetailPresenterClientFactory.create();
}
