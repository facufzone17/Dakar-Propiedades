"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { EstadoPropiedad, Operacion, TipoPropiedad } from "@/data/propiedades";
import { TIPOS_PROPIEDAD } from "@/data/propiedades";
import {
  COOKIE_PANEL,
  credencialesValidas,
  crearTokenDeSesion,
  opcionesCookie,
} from "@/lib/panel-auth";
import { BUCKET_FOTOS } from "@/lib/supabase/config";
import { crearClientePanel, panelSoloLectura } from "@/lib/supabase/panel";
import { CAMPOS_TEXTO, MAX_LARGO_TITULO, TEXTOS_SITIO } from "@/lib/textos";

/* ------------------------------------------------------------------ auth --- */

export async function iniciarSesion(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const usuario = String(formData.get("usuario") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!credencialesValidas(usuario, password)) {
    return { error: "Usuario o contraseña incorrectos." };
  }

  // `secure` solo si la request vino por https, si no el navegador descarta el
  // cookie en http://localhost y el login parece no hacer nada.
  const proto = (await headers()).get("x-forwarded-proto") ?? "http";
  const store = await cookies();
  store.set(COOKIE_PANEL, await crearTokenDeSesion(), opcionesCookie(proto === "https"));

  redirect(next.startsWith("/admin") && next !== "/admin/login" ? next : "/admin");
}

export async function cerrarSesion() {
  (await cookies()).delete(COOKIE_PANEL);
  redirect("/admin/login");
}

/* ----------------------------------------------------------------- fotos --- */

/**
 * Sube una foto al bucket público y devuelve su URL. Va por el servidor
 * porque el navegador ya no tiene sesión de Supabase con la que escribir.
 */
export async function subirFoto(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file");
  const carpeta = String(formData.get("carpeta") ?? "nuevas");
  if (!(file instanceof File) || file.size === 0) return { error: "Archivo vacío." };

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${carpeta}/${crypto.randomUUID()}.${ext}`;

  const sb = await crearClientePanel();
  const { error } = await sb.storage.from(BUCKET_FOTOS).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) return { error: error.message };

  return { url: sb.storage.from(BUCKET_FOTOS).getPublicUrl(path).data.publicUrl };
}

/* ------------------------------------------------------------- propiedades --- */

function revalidarCatalogo(id?: string) {
  revalidatePath("/");
  revalidatePath("/propiedades");
  if (id) revalidatePath(`/propiedades/${id}`);
  revalidatePath("/admin/propiedades");
  revalidatePath("/admin");
}

const nOrNull = (v: FormDataEntryValue | null): number | null => {
  const s = String(v ?? "").trim().replace(",", ".");
  if (s === "") return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
};

export async function guardarPropiedad(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const sb = await crearClientePanel();

  const id = String(formData.get("id") ?? "").trim();
  const operacion = String(formData.get("operacion") ?? "") as Operacion;
  const tipo = String(formData.get("tipo") ?? "") as TipoPropiedad;
  const direccion = String(formData.get("direccion") ?? "").trim();
  const barrio = String(formData.get("barrio") ?? "").trim();
  const precio = nOrNull(formData.get("precio"));

  if (!["venta", "alquiler"].includes(operacion)) return { error: "Elegí la operación." };
  if (!TIPOS_PROPIEDAD.includes(tipo)) return { error: "Elegí el tipo de propiedad." };
  if (!direccion) return { error: "La dirección es obligatoria." };
  if (!barrio) return { error: "El barrio es obligatorio." };
  if (precio === null || precio < 0) return { error: "Cargá un precio válido." };

  const fotos = JSON.parse(String(formData.get("fotos") ?? "[]")) as string[];
  const amenities = JSON.parse(String(formData.get("amenities") ?? "[]")) as string[];

  const payload = {
    operacion,
    tipo,
    direccion,
    barrio,
    zona: String(formData.get("zona") ?? "CABA").trim() || "CABA",
    precio,
    moneda: String(formData.get("moneda") ?? "USD") === "ARS" ? "ARS" : "USD",
    expensas: nOrNull(formData.get("expensas")),
    ambientes: nOrNull(formData.get("ambientes")),
    dormitorios: nOrNull(formData.get("dormitorios")),
    banos: nOrNull(formData.get("banos")),
    cocheras: nOrNull(formData.get("cocheras")),
    m2_cubiertos: nOrNull(formData.get("m2Cubiertos")),
    m2_terreno: nOrNull(formData.get("m2Terreno")),
    antiguedad: nOrNull(formData.get("antiguedad")),
    descripcion: String(formData.get("descripcion") ?? "").trim(),
    amenities,
    fotos,
    fuente_url: String(formData.get("fuenteUrl") ?? "").trim() || null,
    destacada: formData.get("destacada") === "on",
    estado: (String(formData.get("estado") ?? "activa") as EstadoPropiedad) || "activa",
  };

  let nuevoId = id;
  if (id) {
    const { error } = await sb.from("propiedades").update(payload).eq("id", id);
    if (error) return { error: error.message };
  } else {
    const { data, error } = await sb.from("propiedades").insert(payload).select("id").single();
    if (error) return { error: error.message };
    nuevoId = data.id as string;
  }

  revalidarCatalogo(nuevoId);
  redirect("/admin/propiedades");
}

export async function cambiarEstadoPropiedad(id: string, estado: EstadoPropiedad) {
  const sb = await crearClientePanel();
  const { error } = await sb.from("propiedades").update({ estado }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidarCatalogo(id);
}

export async function eliminarPropiedad(id: string) {
  const sb = await crearClientePanel();
  const { error } = await sb.from("propiedades").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidarCatalogo(id);
  redirect("/admin/propiedades");
}

/* ----------------------------------------------------------------- textos --- */

/**
 * Guarda los títulos editables del sitio (/admin/textos).
 *
 * Solo se persiste lo que difiere del texto por defecto: si el campo se vacía o
 * se vuelve a escribir el original, se borra la fila y el título vuelve a salir
 * del código. Así la tabla nunca guarda ruido y "restaurar" es gratis.
 */
export async function guardarTextos(
  _prev: { error?: string; ok?: boolean } | null,
  formData: FormData,
): Promise<{ error?: string; ok?: boolean }> {
  if (panelSoloLectura) {
    return { error: "El panel está en modo lectura: falta SUPABASE_SERVICE_ROLE_KEY." };
  }

  const aGuardar: { clave: string; valor: string }[] = [];
  const aBorrar: string[] = [];

  for (const campo of CAMPOS_TEXTO) {
    // Un campo ausente del form (no se envió) no se toca.
    if (!formData.has(campo.clave)) continue;
    const valor = String(formData.get(campo.clave) ?? "").trim().replace(/\s+/g, " ");

    if (valor.length > MAX_LARGO_TITULO) {
      return {
        error: `“${campo.label}” tiene ${valor.length} caracteres; el máximo es ${MAX_LARGO_TITULO}.`,
      };
    }
    if (!valor || valor === campo.porDefecto) aBorrar.push(campo.clave);
    else aGuardar.push({ clave: campo.clave, valor });
  }

  const sb = await crearClientePanel();

  if (aGuardar.length) {
    const { error } = await sb.from("textos_sitio").upsert(aGuardar, { onConflict: "clave" });
    if (error) return { error: error.message };
  }
  if (aBorrar.length) {
    const { error } = await sb.from("textos_sitio").delete().in("clave", aBorrar);
    if (error) return { error: error.message };
  }

  // Las páginas del sitio son ISR: sin esto el cambio tardaría hasta un minuto.
  for (const grupo of TEXTOS_SITIO) revalidatePath(grupo.ruta);
  revalidatePath("/admin/textos");

  return { ok: true };
}
