import "server-only";
import type { Operacion } from "@/data/propiedades";
import { crearClientePanel } from "./supabase/panel";

const DIA = 86_400_000;

export type Metricas = {
  activas: { total: number; venta: number; alquiler: number };
  consultas30: { total: number; previo: number; variacionPct: number | null };
  cerradas90: { total: number; venta: number; alquiler: number };
  diasPromedioEnCartera: number | null;
  topConsultadas: { id: string; titulo: string; consultas: number }[];
  sinConsultas: { id: string; titulo: string; dias: number }[];
  porZona: { label: string; valor: number }[];
  precioPromedio: { operacion: Operacion; moneda: string; valor: number }[];
  hayDatos: boolean;
};

type FilaMin = {
  id: string;
  operacion: Operacion;
  tipo: string;
  barrio: string;
  zona: string;
  ambientes: number | null;
  dormitorios: number | null;
  precio: number | string;
  moneda: string;
  estado: string;
  created_at: string;
  cerrada_at: string | null;
};

type Evento = { propiedad_id: string | null; tipo: string; created_at: string };

export async function obtenerMetricas(): Promise<Metricas> {
  const sb = await crearClientePanel();
  const ahora = Date.now();

  const [{ data: props }, { data: eventos }] = await Promise.all([
    sb
      .from("propiedades")
      .select(
        "id,operacion,tipo,barrio,zona,ambientes,dormitorios,precio,moneda,estado,created_at,cerrada_at",
      ),
    sb
      .from("eventos_lead")
      .select("propiedad_id,tipo,created_at")
      .gte("created_at", new Date(ahora - 60 * DIA).toISOString()),
  ]);

  const filas = (props ?? []) as FilaMin[];
  const evs = (eventos ?? []) as Evento[];
  const consultaEvs = evs.filter(
    (e) => e.tipo === "whatsapp" || e.tipo === "llamada" || e.tipo === "email",
  );

  const activas = filas.filter((f) => f.estado === "activa");
  const titulo = (f: FilaMin) => {
    if (f.ambientes === 1) return `${f.tipo} monoambiente en ${f.barrio}`;
    if (f.ambientes) return `${f.tipo} ${f.ambientes} amb. en ${f.barrio}`;
    if (f.dormitorios) return `${f.tipo} ${f.dormitorios} dorm. en ${f.barrio}`;
    return `${f.tipo} en ${f.barrio}`;
  };

  // Consultas 30d vs 30d previos
  const en = (e: Evento, desde: number, hasta: number) => {
    const t = Date.parse(e.created_at);
    return t >= desde && t < hasta;
  };
  const consultas30 = consultaEvs.filter((e) => en(e, ahora - 30 * DIA, ahora)).length;
  const previo = consultaEvs.filter((e) => en(e, ahora - 60 * DIA, ahora - 30 * DIA)).length;

  // Cerradas 90d
  const cerradas = filas.filter(
    (f) => f.estado === "vendida" && f.cerrada_at && Date.parse(f.cerrada_at) >= ahora - 90 * DIA,
  );

  // Días promedio en cartera (activas)
  const dias = activas.map((f) => (ahora - Date.parse(f.created_at)) / DIA);
  const diasProm = dias.length ? Math.round(dias.reduce((a, b) => a + b, 0) / dias.length) : null;

  // Consultas por propiedad (últimos 30d)
  const porProp = new Map<string, number>();
  for (const e of consultaEvs) {
    if (!e.propiedad_id || !en(e, ahora - 30 * DIA, ahora)) continue;
    porProp.set(e.propiedad_id, (porProp.get(e.propiedad_id) ?? 0) + 1);
  }
  const idToFila = new Map(filas.map((f) => [f.id, f]));
  const topConsultadas = [...porProp.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id, consultas]) => ({
      id,
      titulo: idToFila.has(id) ? titulo(idToFila.get(id)!) : id,
      consultas,
    }));

  const sinConsultas = activas
    .filter((f) => !porProp.has(f.id))
    .map((f) => ({ id: f.id, titulo: titulo(f), dias: Math.round((ahora - Date.parse(f.created_at)) / DIA) }))
    .sort((a, b) => b.dias - a.dias)
    .slice(0, 6);

  // Cartera por zona
  const zonas = new Map<string, number>();
  for (const f of activas) zonas.set(f.zona, (zonas.get(f.zona) ?? 0) + 1);
  const porZona = [...zonas.entries()]
    .map(([label, valor]) => ({ label, valor }))
    .sort((a, b) => b.valor - a.valor);

  // Precio promedio por operación + moneda
  const grupos = new Map<string, { operacion: Operacion; moneda: string; suma: number; n: number }>();
  for (const f of activas) {
    const k = `${f.operacion}-${f.moneda}`;
    const g = grupos.get(k) ?? { operacion: f.operacion, moneda: f.moneda, suma: 0, n: 0 };
    g.suma += Number(f.precio);
    g.n += 1;
    grupos.set(k, g);
  }
  const precioPromedio = [...grupos.values()].map((g) => ({
    operacion: g.operacion,
    moneda: g.moneda,
    valor: Math.round(g.suma / g.n),
  }));

  return {
    activas: {
      total: activas.length,
      venta: activas.filter((f) => f.operacion === "venta").length,
      alquiler: activas.filter((f) => f.operacion === "alquiler").length,
    },
    consultas30: {
      total: consultas30,
      previo,
      variacionPct: previo === 0 ? null : Math.round(((consultas30 - previo) / previo) * 100),
    },
    cerradas90: {
      total: cerradas.length,
      venta: cerradas.filter((f) => f.operacion === "venta").length,
      alquiler: cerradas.filter((f) => f.operacion === "alquiler").length,
    },
    diasPromedioEnCartera: diasProm,
    topConsultadas,
    sinConsultas,
    porZona,
    precioPromedio,
    hayDatos: filas.length > 0,
  };
}
