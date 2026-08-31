import type { Metadata } from "next";
import { AdminSidebar } from "@/components/admin/sidebar";
import { supabaseConfigurado } from "@/lib/supabase/config";
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
  if (!email) {
    return (
      <div className="min-h-screen bg-[#f6f6f4] text-ink">
        <main className="mx-auto flex min-h-screen max-w-md items-center px-5">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f6f4] text-ink">
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 lg:px-6">
        <AdminSidebar email={email} />
        <main className="min-w-0 flex-1 pb-16">{children}</main>
      </div>
    </div>
  );
}
