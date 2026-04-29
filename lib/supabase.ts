import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.NEXT_PUBLIC_DB_ANON_KEY!
  );
}

export function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_DB_URL!,
    process.env.DB_SERVICE_KEY!
  );
}
