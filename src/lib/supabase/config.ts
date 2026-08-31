/**
 * Config central de Supabase.
 *
 * `supabaseConfigurado` deja al sitio funcionar sin base: mientras no estén las
 * variables de entorno, el catálogo público cae al array de `@/data/propiedades`
 * y el panel muestra un aviso. Cuando Dakar (o nosotros) carga las claves del
 * proyecto, todo pasa a leer/escribir en Supabase sin tocar código.
 */
const URL_ENV = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** El `ref` del proyecto va firmado dentro de la anon key: es la fuente de verdad. */
function refDeLaKey(): string | null {
  try {
    const { ref } = JSON.parse(
      Buffer.from(SUPABASE_ANON_KEY.split(".")[1], "base64").toString(),
    ) as { ref?: string };
    return ref ?? null;
  } catch {
    return null; // key con otro formato (p. ej. publishable): no se puede leer
  }
}

/**
 * La URL se deriva del `ref` firmado en la key cuando no coinciden.
 *
 * Un carácter de más o de menos en NEXT_PUBLIC_SUPABASE_URL rompe todo de forma
 * silenciosa: el catálogo cae al fallback estático y el login responde
 * "credenciales incorrectas". Como el `ref` de la key no se puede tipear mal,
 * mandamos ese y avisamos por consola.
 */
function resolverUrl(): string {
  const ref = refDeLaKey();
  if (!URL_ENV || !ref) return URL_ENV;
  try {
    if (new URL(URL_ENV).host.startsWith(`${ref}.`)) return URL_ENV;
  } catch {
    /* URL malformada: la reemplazamos igual */
  }
  const corregida = `https://${ref}.supabase.co`;
  console.warn(
    `[supabase] NEXT_PUBLIC_SUPABASE_URL ("${URL_ENV}") no coincide con el proyecto de la anon key. Uso ${corregida}.`,
  );
  return corregida;
}

export const SUPABASE_URL = resolverUrl();

export const supabaseConfigurado = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabaseAdminConfigurado = Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);

/** Bucket público donde van las fotos subidas desde el panel. */
export const BUCKET_FOTOS = "propiedades";
