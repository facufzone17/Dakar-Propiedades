import { NextResponse } from "next/server";
import { supabaseConfigurado } from "@/lib/supabase/config";
import { crearClienteServidor } from "@/lib/supabase/server";

const TIPOS = new Set(["whatsapp", "llamada", "tasacion"]);

/**
 * Registra una consulta (click en WhatsApp / Llamar / envío de tasación).
 * Fire-and-forget desde el cliente: nunca bloquea la acción del usuario.
 */
export async function POST(req: Request) {
  if (!supabaseConfigurado) return NextResponse.json({ ok: false }, { status: 204 });

  let body: { tipo?: string; propiedadId?: string | null; path?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!body.tipo || !TIPOS.has(body.tipo)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const sb = await crearClienteServidor();
  const { error } = await sb.from("eventos_lead").insert({
    tipo: body.tipo,
    propiedad_id: body.propiedadId ?? null,
    path: body.path?.slice(0, 300) ?? null,
  });

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
