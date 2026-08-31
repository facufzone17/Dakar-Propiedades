import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { PANEL_ABIERTO } from "@/lib/supabase/config";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Protege /admin/**. Refresca la sesión de Supabase en cada request y manda al
 * login si no hay usuario. /admin/login queda libre.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const esLogin = pathname === "/admin/login";

  let response = NextResponse.next({ request });

  // TEMPORAL: panel abierto para poder mostrarlo (ver PANEL_ABIERTO en
  // src/lib/supabase/config.ts). La RLS sigue impidiendo escribir sin sesión.
  if (PANEL_ABIERTO) return response;

  if (!URL || !KEY) {
    // Sin Supabase configurado no se puede autenticar: dejamos ver el login,
    // que muestra el aviso correspondiente.
    return response;
  }

  const supabase = createServerClient(URL, KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && !esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (user && esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
