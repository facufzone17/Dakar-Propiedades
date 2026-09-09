import Link from "next/link";
import { destacadasPublicas } from "@/lib/propiedades";
import { obtenerTextos } from "@/lib/textos";
import { PropiedadCard } from "./propiedad-card";
import { ArrowRightIcon } from "./icons";
import { Reveal } from "./anim/reveal";

export async function Destacadas() {
  const [props, textos] = await Promise.all([destacadasPublicas(), obtenerTextos()]);

  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="max-w-[16ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
              {textos.home_destacadas_titulo}
            </h2>
            <p className="mt-4 max-w-[46ch] text-lg text-muted">
              Una selección de la cartera. Venta y alquiler en CABA y alrededores.
            </p>
          </div>
          <Link
            href="/propiedades"
            className="lift group inline-flex min-h-[56px] w-fit shrink-0 items-center gap-2.5 rounded-brand border border-line px-7 text-lg font-semibold hover:bg-bg-subtle"
          >
            Ver todas
            <ArrowRightIcon className="nudge size-[18px]" />
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {/* Sin `prioridad`: estas cards están bajo el fold, el LCP es la foto del hero */}
          {props.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className="h-full">
              <PropiedadCard propiedad={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
