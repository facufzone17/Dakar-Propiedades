import { Card } from "@/components/admin/ui";
import { refDesparejo, supabaseConfigurado } from "@/lib/supabase/config";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Ingresar — Panel Dakar",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const desparejo = refDesparejo();

  return (
    <div className="w-full">
      <div className="mb-6 flex items-baseline gap-1.5">
        <span className="text-xl font-semibold tracking-tight">Dakar</span>
        <span className="text-muted">Panel</span>
      </div>
      <Card>
        <h1 className="text-lg font-semibold tracking-tight">Ingresar al panel</h1>
        <p className="mt-1 text-sm text-muted">
          Gestión de propiedades y métricas de Dakar Propiedades.
        </p>

        {desparejo && (
          <p className="mt-6 rounded-brand bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-inset ring-amber-600/20">
            {desparejo}
          </p>
        )}

        {supabaseConfigurado ? (
          <LoginForm next={next ?? "/admin"} />
        ) : (
          <p className="mt-6 rounded-brand bg-amber-50 p-4 text-sm text-amber-800 ring-1 ring-inset ring-amber-600/20">
            Falta conectar Supabase. Cargá <code>NEXT_PUBLIC_SUPABASE_URL</code> y{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> en las variables de entorno.
          </p>
        )}
      </Card>
    </div>
  );
}
