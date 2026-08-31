import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_PANEL, usuarioDeSesion } from "@/lib/panel-auth";

/**
 * Protege /admin/**: sin el cookie firmado del panel, al login. El chequeo es
 * local (HMAC), no consulta a Supabase, así que no puede fallar por red ni por
 * variables de entorno mal cargadas.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const esLogin = pathname === "/admin/login";
  const usuario = await usuarioDeSesion(request.cookies.get(COOKIE_PANEL)?.value);

  if (!usuario && !esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (usuario && esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
