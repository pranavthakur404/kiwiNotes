import { createClient } from "@supabase/supabase-js";
const supabaseurl = import.meta.env.VITE_SUPABASE_URL;
const anonkey = import.meta.env.VITE_ANONE_KEY;

export const supabase = createClient(supabaseurl, anonkey);
