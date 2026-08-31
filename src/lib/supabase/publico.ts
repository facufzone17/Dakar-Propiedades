import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Cliente anónimo sin sesión, para lecturas públicas del catálogo. No toca
 * cookies, así que las páginas del sitio pueden seguir siendo estáticas (ISR).
 */
export function crearClientePublico() {
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
