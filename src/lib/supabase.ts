// src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
console.log(" Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(" Supabase KEY:", process.env.NEXT_PUBLIC_SUPABASE_KEY);

export const supabase = createClient(supabaseUrl, supabaseKey);
