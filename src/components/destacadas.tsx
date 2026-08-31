import Link from "next/link";
import { destacadasPublicas } from "@/lib/propiedades";
import { PropiedadCard } from "./propiedad-card";
import { ArrowRightIcon } from "./icons";

export async function Destacadas() {
  const props = await destacadasPublicas();

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-[16ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
              Propiedades destacadas
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg text-muted">
              Una selección de la cartera. Venta y alquiler en CABA y alrededores.
            </p>
          </div>
          <Link
            href="/propiedades"
            className="inline-flex min-h-[56px] w-fit shrink-0 items-center gap-2.5 rounded-brand border border-line px-7 text-lg font-semibold transition-colors hover:bg-bg-subtle"
          >
            Ver todas
            <ArrowRightIcon className="size-[18px]" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {/* Sin `prioridad`: estas cards están bajo el fold, el LCP es la foto del hero */}
          {props.map((p) => (
            <PropiedadCard key={p.id} propiedad={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
