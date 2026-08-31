import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";
import { PANEL_ABIERTO, supabaseConfigurado } from "@/lib/supabase/config";
import { crearClienteServidor } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Panel — Dakar Propiedades",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let email: string | null = null;
  if (supabaseConfigurado) {
    const sb = await crearClienteServidor();
    const {
      data: { user },
    } = await sb.auth.getUser();
    email = user?.email ?? null;
  }

  // Sin sesión (o sin Supabase) solo llega acá /admin/login: se muestra suelto.
  if (!email && !PANEL_ABIERTO) {
    return (
      <div className="min-h-screen bg-[#f6f6f4] text-ink">
        <main className="mx-auto flex min-h-screen max-w-md items-center px-5">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-ink">
      {!email && (
        <p className="bg-amber-100 px-5 py-2 text-center text-sm text-amber-900">
          Modo demo: el panel está abierto sin login. Sin sesión se puede mirar, pero no
          guardar cambios.
        </p>
      )}
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 lg:px-6">
        <AdminSidebar email={email ?? "Sin sesión — modo demo"} />
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
