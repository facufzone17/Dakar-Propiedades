import Link from "next/link";
import { notFound } from "next/navigation";
import { PropiedadForm } from "@/components/admin/propiedad-form";
import { EliminarPropiedadBoton } from "@/components/admin/eliminar-boton";
import { propiedadDelPanel } from "@/lib/admin-data";
import { formatearPrecio } from "@/data/propiedades";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar propiedad — Panel Dakar" };

export default async function EditarPropiedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const propiedad = await propiedadDelPanel(id);
  if (!propiedad) notFound();

  return (
    <div className="max-w-3xl">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/admin/propiedades" className="text-sm text-muted hover:text-ink">
            ← Propiedades
          </Link>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            {propiedad.tipo} · {propiedad.direccion}
          </h1>
          <p className="mt-1 text-muted">
            {formatearPrecio(propiedad)} · ID {propiedad.id}
            {" · "}
            <Link
              href={`/propiedades/${propiedad.id}`}
              target="_blank"
              className="underline hover:text-ink"
            >
              ver en el sitio
            </Link>
          </p>
        </div>
        <EliminarPropiedadBoton id={propiedad.id} direccion={propiedad.direccion} />
      </header>

      <PropiedadForm propiedad={propiedad} />
    </div>
  );
}
