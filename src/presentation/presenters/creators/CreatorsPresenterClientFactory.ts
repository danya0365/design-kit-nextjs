"use client";

import { createClientSupabaseClient } from "@/src/infrastructure/config/supabase-client-client";
import { CreatorsPresenter } from "./CreatorsPresenter";

export function createClientCreatorsPresenter(): CreatorsPresenter {
  const supabase = createClientSupabaseClient();
  return new CreatorsPresenter(supabase);
}
