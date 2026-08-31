/**
 * Config central de Supabase.
 *
 * `supabaseConfigurado` deja al sitio funcionar sin base: mientras no estén las
 * variables de entorno, el catálogo público cae al array de `@/data/propiedades`
 * y el panel muestra un aviso. Cuando Dakar (o nosotros) carga las claves del
 * proyecto, todo pasa a leer/escribir en Supabase sin tocar código.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** El correo real detrás del usuario "desarrollos mf" del login. */
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "facufernandezzone@gmail.com";

/** Alias que se acepta en el campo "Usuario" del login. */
export const ADMIN_USUARIO = "desarrollos mf";

export const supabaseConfigurado = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * La anon key lleva firmado el `ref` del proyecto. Si no coincide con el host de
 * la URL, las llamadas fallan de una forma difícil de leer (el catálogo cae al
 * fallback y el login dice "credenciales incorrectas"). Mejor gritarlo temprano.
 */
export function refDesparejo(): string | null {
  if (!supabaseConfigurado) return null;
  try {
    const { ref } = JSON.parse(
      Buffer.from(SUPABASE_ANON_KEY.split(".")[1], "base64").toString(),
    ) as { ref?: string };
    if (!ref) return null;
    const host = new URL(SUPABASE_URL).host;
    return host.startsWith(`${ref}.`)
      ? null
      : `NEXT_PUBLIC_SUPABASE_URL apunta a "${host}" pero la anon key es del proyecto "${ref}". Corregí la URL a https://${ref}.supabase.co`;
  } catch {
    return null; // key con otro formato (p. ej. publishable): no se puede validar
  }
}
export const supabaseAdminConfigurado = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

/** Bucket público donde van las fotos subidas desde el panel. */
export const BUCKET_FOTOS = "propiedades";
