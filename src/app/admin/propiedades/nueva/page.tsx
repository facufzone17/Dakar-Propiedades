import Link from "next/link";
import { PropiedadForm } from "@/components/admin/propiedad-form";
import { SITIO } from "@/config/site";

export const metadata = { title: `Nueva propiedad — Panel ${SITIO.nombre}` };

export default function NuevaPropiedadPage() {
  return (
    <div className="max-w-3xl">
      <header className="mb-6">
        <Link href="/admin/propiedades" className="text-sm text-muted hover:text-ink">
          ← Propiedades
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Nueva propiedad</h1>
      </header>
      <PropiedadForm />
    </div>
  );
}
