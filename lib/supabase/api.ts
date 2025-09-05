// lib/supabase/api.ts
import { createClient } from "@supabase/supabase-js";

// Note: Pour les API Routes, il est plus sûr d'utiliser la clé de service (service role key)
// car elle est utilisée côté serveur. Cependant, pour cet exemple,
// nous utiliserons la clé anon pour la simplicité, comme dans votre code existant.
// Pour la production, utilisez une clé de service.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const createApiClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};
