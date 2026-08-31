"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { EstadoPropiedad, Operacion, TipoPropiedad } from "@/data/propiedades";
import { TIPOS_PROPIEDAD } from "@/data/propiedades";
import { ADMIN_EMAIL, ADMIN_USUARIO, supabaseConfigurado } from "@/lib/supabase/config";
import { crearClienteServidor } from "@/lib/supabase/server";

/* ------------------------------------------------------------------ auth --- */

export async function iniciarSesion(
  _prev: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  if (!supabaseConfigurado) {
    return { error: "Falta configurar Supabase (variables de entorno)." };
  }
  const usuarioRaw = String(formData.get("usuario") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const email =
    usuarioRaw.toLowerCase() === ADMIN_USUARIO || !usuarioRaw.includes("@")
      ? ADMIN_EMAIL
      : usuarioRaw;

  const sb = await crearClienteServidor();
  const { error } = await sb.auth.signInWithPassword({ email, password }).catch((e) => ({
    error: { message: `No se pudo contactar a Supabase: ${e?.message ?? e}`, code: "network" },
  }));

  if (error) {
    // Solo las credenciales mal cargadas son "culpa" de quien entra. Cualquier
    // otra cosa (API key, red, proveedor de email apagado) se muestra tal cual:
    // esconderla detrás de un mensaje genérico hace imposible diagnosticar.
    const credenciales =
      "code" in error && (error.code === "invalid_credentials" || error.code === "email_not_confirmed");
    return {
      error: credenciales
        ? "Usuario o contraseña incorrectos."
        : `No se pudo iniciar sesión: ${error.message}`,
    };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function cerrarSesion() {
  if (supabaseConfigurado) {
    const sb = await crearClienteServidor();
    await sb.auth.signOut();
  }
  redirect("/admin/login");
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
  const sb = await crearClienteServidor();

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
  const sb = await crearClienteServidor();
  const { error } = await sb.from("propiedades").update({ estado }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidarCatalogo(id);
}

export async function eliminarPropiedad(id: string) {
  const sb = await crearClienteServidor();
  const { error } = await sb.from("propiedades").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidarCatalogo(id);
  redirect("/admin/propiedades");
}
