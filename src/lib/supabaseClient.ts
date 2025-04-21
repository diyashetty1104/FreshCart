
import { createClient } from "@supabase/supabase-js";
import { supabase as configuredSupabase } from "@/integrations/supabase/client";

// Use the properly configured supabase client from the integrations directory
export const supabase = configuredSupabase;
