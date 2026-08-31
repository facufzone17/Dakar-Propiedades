import { TextosForm, type GrupoEditable } from "@/components/admin/textos-form";
import { Card } from "@/components/admin/ui";
import { supabaseConfigurado } from "@/lib/supabase/config";
import { panelSoloLectura } from "@/lib/supabase/panel";
import { MAX_LARGO_TITULO, TEXTOS_SITIO, obtenerTextos } from "@/lib/textos";

export const dynamic = "force-dynamic";

export const metadata = { title: "Títulos del sitio — Panel Dakar" };

export default async function TextosPage() {
  if (!supabaseConfigurado) {
    return (
      <Card>
        <p className="text-sm text-muted">
          Conectá Supabase para poder editar los títulos. Mientras tanto el sitio muestra
          los originales.
        </p>
      </Card>
    );
  }

  // Quién entra ya lo resolvió el middleware. Lo único que puede faltar para
  // guardar es la service_role key: sin ella el panel es de solo lectura y el
  // layout ya muestra el cartel, así que acá alcanza con deshabilitar el form.
  const textos = await obtenerTextos();
  const grupos: GrupoEditable[] = TEXTOS_SITIO.map((g) => ({
    pagina: g.pagina,
    ruta: g.ruta,
    campos: g.campos.map((c) => ({ ...c, valor: textos[c.clave] })),
  }));

  return (
    <div className="max-w-3xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Títulos del sitio</h1>
        <p className="mt-1 text-muted">
          Cambiá los títulos que se ven en cada página. El resto de los textos y el
          diseño no se tocan. Dejá un campo vacío para volver al título original.
        </p>
      </header>

      <TextosForm
        grupos={grupos}
        maxLargo={MAX_LARGO_TITULO}
        editable={!panelSoloLectura}
      />
    </div>
  );
}
