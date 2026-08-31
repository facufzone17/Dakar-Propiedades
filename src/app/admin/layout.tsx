import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminSidebar } from "@/components/admin/sidebar";
import { COOKIE_PANEL, usuarioDeSesion } from "@/lib/panel-auth";
import { panelSoloLectura } from "@/lib/supabase/panel";

export const metadata: Metadata = {
  title: "Panel — Dakar Propiedades",
  robots: { index: false, follow: false },
};

/**
 * Nombres (nunca valores) de las variables de Supabase/panel que el servidor
 * tiene cargadas. Sirve para ver de un vistazo si una variable de Vercel quedó
 * mal escrita o cargada en el entorno equivocado. Solo se muestra detrás del
 * login y solo cuando falta la service_role key.
 */
function variablesVisibles(): string {
  return Object.keys(process.env)
    .filter((k) => k.startsWith("SUPABASE_") || k.startsWith("PANEL_") || k.includes("SERVICE_ROLE"))
    .sort()
    .join(", ");
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const usuario = await usuarioDeSesion((await cookies()).get(COOKIE_PANEL)?.value);

  // Sin sesión el middleware ya mandó al login: se muestra suelto, sin sidebar.
  if (!usuario) {
    return (
      <div className="min-h-screen bg-[#f6f6f4] text-ink">
        <main className="mx-auto flex min-h-screen max-w-md items-center px-5">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-ink">
      {panelSoloLectura && (
        <p className="bg-amber-100 px-5 py-2 text-center text-sm text-amber-900">
          Falta <code>SUPABASE_SERVICE_ROLE_KEY</code>: el panel muestra el catálogo pero no
          puede guardar cambios.
          <br />
          <span className="text-xs opacity-70">
            El servidor ve estas variables: {variablesVisibles() || "ninguna"}
          </span>
        </p>
      )}
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 lg:px-6">
        <AdminSidebar email={usuario} />
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
