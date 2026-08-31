import "server-only";
import type { Propiedad } from "@/data/propiedades";
import { filaAPropiedad, type FilaPropiedad } from "./propiedades-map";
import { crearClienteServidor } from "./supabase/server";

/**
 * Lecturas del panel. Usan el cliente con la sesión del usuario logueado: la RLS
 * le da acceso total a la tabla (a diferencia del visitante anónimo, que solo ve
 * las `activa`).
 */

const COLS =
  "id,operacion,tipo,direccion,barrio,zona,precio,moneda,expensas,ambientes,dormitorios,banos,cocheras,m2_cubiertos,m2_terreno,antiguedad,descripcion,amenities,fotos,fuente_url,destacada,estado,created_at,cerrada_at";

export async function listarTodasLasPropiedades(): Promise<Propiedad[]> {
  const sb = await crearClienteServidor();
  const { data, error } = await sb
    .from("propiedades")
    .select(COLS)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as unknown as FilaPropiedad[]).map(filaAPropiedad);
}

export async function propiedadDelPanel(id: string): Promise<Propiedad | null> {
  const sb = await crearClienteServidor();
  const { data, error } = await sb.from("propiedades").select(COLS).eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? filaAPropiedad(data as unknown as FilaPropiedad) : null;
}
