import type { EstadoPropiedad, Operacion, Propiedad, TipoPropiedad } from "@/data/propiedades";

/** Fila cruda de la tabla `propiedades` de Supabase (snake_case). */
export type FilaPropiedad = {
  id: string;
  operacion: Operacion;
  tipo: TipoPropiedad;
  direccion: string;
  barrio: string;
  zona: string;
  precio: number | string;
  moneda: "USD" | "ARS";
  expensas: number | string | null;
  ambientes: number | string | null;
  dormitorios: number | null;
  banos: number | null;
  cocheras: number | null;
  m2_cubiertos: number | null;
  m2_terreno: number | null;
  antiguedad: number | null;
  descripcion: string;
  amenities: string[] | null;
  fotos: string[] | null;
  fuente_url: string | null;
  destacada: boolean;
  estado: EstadoPropiedad;
  created_at: string;
  cerrada_at: string | null;
};

const num = (v: number | string | null | undefined): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

export function filaAPropiedad(f: FilaPropiedad): Propiedad {
  return {
    id: f.id,
    operacion: f.operacion,
    tipo: f.tipo,
    direccion: f.direccion,
    barrio: f.barrio,
    zona: f.zona,
    precio: Number(f.precio),
    moneda: f.moneda,
    expensas: num(f.expensas),
    ambientes: num(f.ambientes),
    dormitorios: f.dormitorios,
    banos: f.banos,
    cocheras: f.cocheras,
    m2Cubiertos: f.m2_cubiertos,
    m2Terreno: f.m2_terreno,
    antiguedad: f.antiguedad,
    descripcion: f.descripcion,
    amenities: f.amenities ?? [],
    fotos: f.fotos ?? [],
    fuenteUrl: f.fuente_url ?? "",
    destacada: f.destacada,
    estado: f.estado,
    creadaEn: f.created_at,
    cerradaEn: f.cerrada_at,
  };
}

/** Payload para insertar/actualizar (sin `id`, `created_at`, `cerrada_at`). */
export function propiedadAFila(p: Omit<Propiedad, "id" | "estado" | "creadaEn" | "cerradaEn">) {
  return {
    operacion: p.operacion,
    tipo: p.tipo,
    direccion: p.direccion.trim(),
    barrio: p.barrio.trim(),
    zona: p.zona.trim(),
    precio: p.precio,
    moneda: p.moneda,
    expensas: p.expensas,
    ambientes: p.ambientes,
    dormitorios: p.dormitorios,
    banos: p.banos,
    cocheras: p.cocheras,
    m2_cubiertos: p.m2Cubiertos,
    m2_terreno: p.m2Terreno,
    antiguedad: p.antiguedad,
    descripcion: p.descripcion.trim(),
    amenities: p.amenities,
    fotos: p.fotos,
    fuente_url: p.fuenteUrl || null,
    destacada: p.destacada,
  };
}
