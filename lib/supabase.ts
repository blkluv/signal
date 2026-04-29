import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
  process.env.NEXT_PUBLIC_DB_URL!,
  process.env.NEXT_PUBLIC_DB_ANON_KEY!
);
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_DB_URL!,
  process.env.DB_SERVICE_KEY!
);
