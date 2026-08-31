/**
 * Acceso al panel — usuario y contraseña propios, sin Supabase Auth.
 *
 * El login pasaba por `signInWithPassword` de Supabase: dependía de que el
 * proyecto estuviera bien apuntado, de que el usuario existiera en
 * Authentication y de que el mail estuviera confirmado. Cualquiera de esas tres
 * cosas rompía el ingreso con un "usuario o contraseña incorrectos" que no
 * decía nada. Ahora la puerta del panel es un cookie firmado (HMAC-SHA256):
 * anda siempre, aunque la base esté caída o mal configurada.
 *
 * Se usa Web Crypto (`crypto.subtle`) porque esto corre también en el
 * middleware, que va en el runtime Edge y no tiene el `crypto` de Node.
 */

/**
 * Credenciales del panel. Los valores de acá son el default; se pisan por
 * entorno (`PANEL_USUARIO` / `PANEL_PASSWORD`) sin tocar código. El repo es
 * privado, pero cuando el sitio se entregue conviene mover la contraseña y el
 * secreto a variables de entorno en Vercel y dejar estos en blanco.
 */
const USUARIO = process.env.PANEL_USUARIO ?? "dakarpropiedades";
const PASSWORD = process.env.PANEL_PASSWORD ?? "dakarpropiedades*";

/** Clave con la que se firma el cookie de sesión. Cambiarla cierra las sesiones. */
const SECRETO = process.env.PANEL_SECRET ?? "DdKFBCfKRHk0TYqxDprgQW_jKOtz9vIVV4Bw4L2LK3k";

export const COOKIE_PANEL = "dakar_panel";

/** Cuánto dura la sesión sin volver a pedir la contraseña: 30 días. */
const DURACION_MS = 30 * 24 * 60 * 60 * 1000;

/** El usuario esperado, tal cual se escribe (para mostrarlo en el panel). */
export const PANEL_USUARIO = USUARIO;

const bytes = (s: string) => new TextEncoder().encode(s);

async function firmar(valor: string): Promise<string> {
  const clave = await crypto.subtle.importKey(
    "raw",
    bytes(SECRETO),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const firma = await crypto.subtle.sign("HMAC", clave, bytes(valor));
  return btoa(String.fromCharCode(...new Uint8Array(firma)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

/** Compara sin filtrar por tiempo cuántos caracteres coincidieron. */
function igualdadConstante(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

/** El usuario no distingue mayúsculas ni espacios de sobra; la clave sí. */
export function credencialesValidas(usuario: string, password: string): boolean {
  return usuario.trim().toLowerCase() === USUARIO.toLowerCase() && password === PASSWORD;
}

export async function crearTokenDeSesion(): Promise<string> {
  const cuerpo = `${USUARIO}|${Date.now()}`;
  return `${cuerpo}|${await firmar(cuerpo)}`;
}

/**
 * Devuelve el usuario del cookie si la firma es válida y no venció; si no, null.
 */
export async function usuarioDeSesion(token: string | undefined): Promise<string | null> {
  if (!token) return null;
  const corte = token.lastIndexOf("|");
  if (corte < 0) return null;

  const cuerpo = token.slice(0, corte);
  if (!igualdadConstante(token.slice(corte + 1), await firmar(cuerpo))) return null;

  const sep = cuerpo.lastIndexOf("|");
  const emitido = Number(cuerpo.slice(sep + 1));
  if (!Number.isFinite(emitido) || Date.now() - emitido > DURACION_MS) return null;

  return cuerpo.slice(0, sep);
}

/** Opciones del cookie. `secure` solo en https, para que ande en localhost. */
export function opcionesCookie(seguro: boolean) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: seguro,
    path: "/",
    maxAge: DURACION_MS / 1000,
  };
}
