import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

/**
 * Cliente de Supabase para Server Components / Route Handlers / Server Actions.
 * Lee y refresca la sesión desde las cookies.
 */
export async function crearClienteServidor() {
  const store = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return store.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            store.set(name, value, options);
          }
        } catch {
          // Llamado desde un Server Component: lo maneja el middleware.
        }
      },
    },
  });
}
