import Link from "next/link";
import { FiltrosPropiedades } from "@/components/filtros-propiedades";
import { PropiedadCard } from "@/components/propiedad-card";
import { ArrowRightIcon } from "@/components/icons";
import { filtrar, type Filtros } from "@/data/propiedades";

export const metadata = {
  title: "Propiedades en venta y alquiler — Dakar Propiedades",
  description:
    "Departamentos, PH, locales y galpones en venta y alquiler en CABA, GBA y San Luis.",
};

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const filtros: Filtros = {
    operacion: primero(sp.operacion),
    tipo: primero(sp.tipo),
    barrio: primero(sp.barrio),
    precioMax: primero(sp.precioMax),
    ambientes: primero(sp.ambientes),
  };
  const resultados = filtrar(filtros);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
      <h1 className="max-w-[16ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
        Propiedades
      </h1>
      <p className="mt-4 max-w-[52ch] text-lg text-muted">
        Toda la cartera de Dakar, en venta y alquiler.
      </p>

      <h2 className="sr-only">Filtrar propiedades</h2>
      <div className="mt-10">
        <FiltrosPropiedades filtros={filtros} resultados={resultados.length} />
      </div>

      {/* Los títulos de las cards son h3: sin este h2 el orden salta de h1 a h3 */}
      <h2 className="sr-only">Resultados</h2>
      {resultados.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {resultados.map((p) => (
            <PropiedadCard key={p.id} propiedad={p} />
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-brand border border-line px-6 py-16 text-center">
          <p className="text-2xl font-semibold tracking-tight">
            No encontramos propiedades con esos filtros
          </p>
          <p className="mx-auto mt-3 max-w-[46ch] text-lg text-muted">
            Probá sacando alguno, o escribinos y buscamos algo que se ajuste a lo que
            estás necesitando.
          </p>
          <Link
            href="/contacto"
            className="mt-8 inline-flex min-h-[56px] items-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            Contactanos
            <ArrowRightIcon className="size-[18px]" />
          </Link>
        </div>
      )}
    </div>
  );
}

function primero(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}
