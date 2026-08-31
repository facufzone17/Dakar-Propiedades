import "server-only";
import {
  PROPIEDADES,
  type Filtros,
  type Operacion,
  type Propiedad,
  type TipoPropiedad,
} from "@/data/propiedades";
import { filaAPropiedad, type FilaPropiedad } from "./propiedades-map";
import { supabaseConfigurado } from "./supabase/config";
import { crearClientePublico } from "./supabase/publico";

/**
 * Capa de datos del catálogo.
 *
 * Si Supabase está configurado, lee de la tabla `propiedades` (RLS deja ver solo
 * las `activa` a visitantes anónimos). Si no, cae al array estático de
 * `@/data/propiedades` para que el sitio siga funcionando sin base.
 */

const COLS =
  "id,operacion,tipo,direccion,barrio,zona,precio,moneda,expensas,ambientes,dormitorios,banos,cocheras,m2_cubiertos,m2_terreno,antiguedad,descripcion,amenities,fotos,fuente_url,destacada,estado,created_at,cerrada_at";

function aplicarFiltros(lista: Propiedad[], f: Filtros): Propiedad[] {
  return lista.filter((p) => {
    if (f.operacion && p.operacion !== f.operacion) return false;
    if (f.tipo && p.tipo !== f.tipo) return false;
    if (f.barrio && p.barrio !== f.barrio) return false;
    if (f.ambientes) {
      const min = Number(f.ambientes);
      if (!p.ambientes || p.ambientes < min) return false;
    }
    if (f.precioMax) {
      const max = Number(f.precioMax);
      if (Number.isFinite(max) && p.precio > max) return false;
    }
    return true;
  });
}

/**
 * Si Supabase todavía no está listo (sin variables, o la tabla no existe aún),
 * el sitio no se cae: usa el catálogo estático de `@/data/propiedades`.
 */
function conFallback<T>(intento: () => Promise<T>, fallback: () => T): Promise<T> {
  if (!supabaseConfigurado) return Promise.resolve(fallback());
  return intento().catch((e) => {
    console.warn("[propiedades] Supabase no disponible, uso catálogo estático:", e?.message);
    return fallback();
  });
}

export async function listarPropiedadesPublicas(f: Filtros = {}): Promise<Propiedad[]> {
  return conFallback(
    async () => {
      const sb = await crearClientePublico();
      let q = sb.from("propiedades").select(COLS).eq("estado", "activa");
      if (f.operacion) q = q.eq("operacion", f.operacion);
      if (f.tipo) q = q.eq("tipo", f.tipo);
      if (f.barrio) q = q.eq("barrio", f.barrio);
      if (f.ambientes) q = q.gte("ambientes", Number(f.ambientes));
      if (f.precioMax && Number.isFinite(Number(f.precioMax))) {
        q = q.lte("precio", Number(f.precioMax));
      }
      const { data, error } = await q
        .order("destacada", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data as unknown as FilaPropiedad[]).map(filaAPropiedad);
    },
    () => aplicarFiltros(PROPIEDADES, f),
  );
}

export async function propiedadPublicaPorId(id: string): Promise<Propiedad | null> {
  return conFallback(
    async () => {
      const sb = await crearClientePublico();
      const { data, error } = await sb
        .from("propiedades")
        .select(COLS)
        .eq("id", id)
        .eq("estado", "activa")
        .maybeSingle();
      if (error) throw new Error(error.message);
      return data ? filaAPropiedad(data as unknown as FilaPropiedad) : null;
    },
    () => PROPIEDADES.find((p) => p.id === id) ?? null,
  );
}

export async function destacadasPublicas(): Promise<Propiedad[]> {
  return conFallback(
    async () => {
      const sb = await crearClientePublico();
      const { data, error } = await sb
        .from("propiedades")
        .select(COLS)
        .eq("estado", "activa")
        .eq("destacada", true)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return (data as unknown as FilaPropiedad[]).map(filaAPropiedad);
    },
    () => PROPIEDADES.filter((p) => p.destacada),
  );
}

export async function similaresA(p: Propiedad, limite = 3): Promise<Propiedad[]> {
  const todas = await listarPropiedadesPublicas({ operacion: p.operacion, tipo: p.tipo });
  return todas.filter((o) => o.id !== p.id).slice(0, limite);
}

/** Opciones reales de tipo y zona para los filtros, según la operación elegida. */
export async function facetasPorOperacion(
  operacion?: string,
): Promise<{ tipos: TipoPropiedad[]; barrios: string[] }> {
  const todas = await listarPropiedadesPublicas(
    operacion ? { operacion: operacion as Operacion } : {},
  );
  const tipos = [...new Set(todas.map((p) => p.tipo))].sort((a, b) =>
    a.localeCompare(b, "es"),
  ) as TipoPropiedad[];
  const barrios = [...new Set(todas.map((p) => p.barrio))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
  return { tipos, barrios };
}
