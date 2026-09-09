import "server-only";
import { cache } from "react";
import { supabaseConfigurado } from "./supabase/config";
import { crearClientePublico } from "./supabase/publico";

/**
 * Títulos editables del sitio.
 *
 * La idea es acotada a propósito: el dueño puede cambiar los títulos que se ven
 * en cada página, no el resto del copy ni la estructura. Cada campo tiene su
 * texto por defecto acá; la tabla `textos_sitio` de Supabase guarda únicamente
 * los que se hayan cambiado, así que borrar una fila (o vaciar el campo en el
 * panel) devuelve el título original.
 *
 * Para agregar un título editable: sumarlo al grupo de su página con una clave
 * nueva y usar `textos.<clave>` donde antes estaba el string. No hace falta
 * tocar la base ni el panel.
 */

export type CampoTexto = {
  /** Clave en la tabla `textos_sitio`. No se cambia una vez publicada. */
  clave: string;
  /** Cómo se llama el campo en el panel. */
  label: string;
  porDefecto: string;
  ayuda?: string;
};

export type GrupoTextos = {
  pagina: string;
  /** Ruta pública, para el link "Ver en el sitio" del panel. */
  ruta: string;
  campos: readonly CampoTexto[];
};

/** Tope de caracteres: son títulos, y arriba de esto rompen el diseño. */
export const MAX_LARGO_TITULO = 80;

export const TEXTOS_SITIO = [
  {
    pagina: "Inicio",
    ruta: "/",
    campos: [
      {
        clave: "home_hero_titulo",
        label: "Título principal (portada)",
        porDefecto: "Conocemos la zona",
        ayuda: "Lo primero que se lee al entrar, sobre la foto. Corto funciona mejor.",
      },
      {
        clave: "home_destacadas_titulo",
        label: "Sección de propiedades destacadas",
        porDefecto: "Propiedades destacadas",
      },
      {
        clave: "home_porque_titulo",
        label: "Sección “Por qué elegirnos”",
        porDefecto: "Por qué elegirnos",
      },
      {
        clave: "home_porque_1",
        label: "Motivo 1",
        porDefecto: "Cerramos rápido",
      },
      {
        clave: "home_porque_2",
        label: "Motivo 2",
        porDefecto: "A buen precio",
      },
      {
        clave: "home_porque_3",
        label: "Motivo 3",
        porDefecto: "Conocemos el barrio",
      },
      {
        clave: "home_cta_titulo",
        label: "Llamada final a tasación",
        porDefecto: "¿Cuánto vale tu propiedad?",
      },
    ],
  },
  {
    pagina: "Propiedades",
    ruta: "/propiedades",
    campos: [
      {
        clave: "propiedades_titulo",
        label: "Título de la página",
        porDefecto: "Propiedades",
      },
    ],
  },
  {
    pagina: "Tasación",
    ruta: "/tasacion",
    campos: [
      {
        clave: "tasacion_titulo",
        label: "Título de la página",
        porDefecto: "Tasá tu propiedad",
      },
    ],
  },
  {
    pagina: "Nosotros",
    ruta: "/nosotros",
    campos: [
      {
        clave: "nosotros_titulo",
        label: "Título de la página",
        porDefecto: "Una inmobiliaria de barrio",
      },
      {
        clave: "nosotros_que_hacemos",
        label: "Sección de servicios",
        porDefecto: "Qué hacemos",
      },
    ],
  },
  {
    pagina: "Contacto",
    ruta: "/contacto",
    campos: [
      {
        clave: "contacto_titulo",
        label: "Título de la página",
        porDefecto: "Contacto",
      },
    ],
  },
] as const satisfies readonly GrupoTextos[];

export type ClaveTexto = (typeof TEXTOS_SITIO)[number]["campos"][number]["clave"];
export type Textos = Record<ClaveTexto, string>;

export const CAMPOS_TEXTO: readonly CampoTexto[] = (
  TEXTOS_SITIO as readonly GrupoTextos[]
).flatMap((g) => g.campos);

export const TEXTOS_POR_DEFECTO = Object.fromEntries(
  CAMPOS_TEXTO.map((c) => [c.clave, c.porDefecto]),
) as Textos;

export function esClaveTexto(clave: string): clave is ClaveTexto {
  return Object.hasOwn(TEXTOS_POR_DEFECTO, clave);
}

/**
 * Títulos vigentes: los por defecto pisados por lo que haya en `textos_sitio`.
 *
 * `cache` es por request, así que las cuatro secciones de la home comparten una
 * sola consulta. Si Supabase no está configurado o la tabla todavía no existe,
 * devuelve los textos por defecto y el sitio sigue igual que siempre.
 */
export const obtenerTextos = cache(async (): Promise<Textos> => {
  const textos: Textos = { ...TEXTOS_POR_DEFECTO };
  if (!supabaseConfigurado) return textos;

  try {
    const sb = crearClientePublico();
    const { data, error } = await sb.from("textos_sitio").select("clave,valor");
    if (error) throw new Error(error.message);
    for (const fila of (data ?? []) as { clave: string; valor: string | null }[]) {
      const valor = fila.valor?.trim();
      if (valor && esClaveTexto(fila.clave)) textos[fila.clave] = valor;
    }
  } catch (e) {
    console.warn(
      "[textos] No se pudieron leer los títulos de Supabase, uso los por defecto:",
      (e as Error)?.message,
    );
  }

  return textos;
});
