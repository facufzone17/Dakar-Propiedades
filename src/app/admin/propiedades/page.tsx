import { PropiedadesTabla } from "@/components/admin/propiedades-tabla";
import { Card, LinkPrimario } from "@/components/admin/ui";
import { IconMas } from "@/components/admin/icons";
import { listarTodasLasPropiedades } from "@/lib/admin-data";
import { supabaseConfigurado } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function PropiedadesAdminPage() {
  if (!supabaseConfigurado) {
    return (
      <Card>
        <p className="text-sm text-muted">Conectá Supabase para gestionar el catálogo.</p>
      </Card>
    );
  }

  const propiedades = await listarTodasLasPropiedades();

  return (
    <div>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Propiedades</h1>
          <p className="mt-1 text-muted">
            {propiedades.length} en total · {propiedades.filter((p) => p.estado === "activa").length}{" "}
            publicadas
          </p>
        </div>
        <LinkPrimario href="/admin/propiedades/nueva">
          <IconMas className="size-4" />
          Nueva propiedad
        </LinkPrimario>
      </header>

      <PropiedadesTabla propiedades={propiedades} />
    </div>
  );
}
