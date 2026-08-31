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
export const supabaseAdminConfigurado = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

/** Bucket público donde van las fotos subidas desde el panel. */
export const BUCKET_FOTOS = "propiedades";
