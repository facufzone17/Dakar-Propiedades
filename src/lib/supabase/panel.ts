import "server-only";
import { crearClienteAdmin } from "./admin";
import { supabaseAdminConfigurado } from "./config";
import { crearClienteServidor } from "./server";

/**
 * Cliente que usa el panel para leer y escribir.
 *
 * El panel ya no inicia sesión en Supabase, así que la RLS lo trata como
 * anónimo: solo vería las propiedades activas y no podría guardar nada. Con
 * `SUPABASE_SERVICE_ROLE_KEY` cargada usa el cliente de servicio, que se salta
 * la RLS. Es seguro porque solo corre en el servidor y detrás del middleware
 * que exige el cookie del panel.
 *
 * Sin esa variable el panel sigue abriendo, pero en modo lectura del catálogo
 * activo (ver `panelSoloLectura`).
 */
export async function crearClientePanel() {
  return supabaseAdminConfigurado ? crearClienteAdmin() : await crearClienteServidor();
}

/** true cuando falta la service_role key: el panel no puede escribir. */
export const panelSoloLectura = !supabaseAdminConfigurado;
