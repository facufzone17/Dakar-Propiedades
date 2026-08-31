import { createClient } from "@supabase/supabase-js";
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "./config";

/**
 * Cliente con service_role: se salta RLS. SOLO en el servidor y solo detrás de
 * rutas ya protegidas por el middleware del panel (o para el seed inicial).
 */
export function crearClienteAdmin() {
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
