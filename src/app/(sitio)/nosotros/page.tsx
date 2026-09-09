import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { SITIO } from "@/config/site";
import { PROPIEDADES } from "@/data/propiedades";
import { obtenerTextos } from "@/lib/textos";

export const revalidate = 60;

export const metadata = {
  title: `Nosotros — ${SITIO.nombre}`,
  description:
    "Inmobiliaria de la zona oeste. Venta, alquiler, tasación y administración de propiedades.",
};

/**
 * Sin página de "equipo" ni bios: no se inventan personas. Texto simple y fácil
 * de reemplazar cuando el cliente pase el suyo. El primer párrafo evita a
 * propósito hablar de trayectoria en años (dato propio de cada inmobiliaria).
 */
export default async function NosotrosPage() {
  const textos = await obtenerTextos();
  const barriosCaba = new Set(
    PROPIEDADES.filter((p) => p.zona === "CABA").map((p) => p.barrio),
  ).size;

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
      <h1 className="max-w-[16ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
        {textos.nosotros_titulo}
      </h1>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-[60ch] space-y-5 text-lg leading-relaxed text-muted">
          <p>
            {SITIO.nombre} trabaja desde {SITIO.direccion}, en {SITIO.localidad}. Es una
            inmobiliaria de barrio: se atiende en el mostrador de siempre, y la operación
            se define con quien toma las decisiones.
          </p>
          <p>
            Hacemos venta, alquiler, tasación y administración de propiedades. La cartera
            está repartida en {barriosCaba} barrios de la Capital, más Gran Buenos Aires —
            no solo la zona de la oficina.
          </p>
          <p>
            La forma más rápida de contactarnos es WhatsApp. Escribinos y te
            respondemos con lo que necesites saber de cualquier propiedad de la cartera,
            o para coordinar una tasación.
          </p>
        </div>

        <div className="rounded-brand bg-bg-subtle p-7 lg:p-9">
          <h2 className="text-2xl font-semibold tracking-tight">{textos.nosotros_que_hacemos}</h2>
          <ul className="mt-6 divide-y divide-line">
            {[
              ["Venta", "Publicamos, mostramos y cerramos la operación."],
              ["Alquiler", "Desde la búsqueda de inquilino hasta la firma."],
              ["Tasación", "Un precio realista, con lo que se opera hoy en la zona."],
              ["Administración", "Gestión de propiedades alquiladas para terceros."],
            ].map(([titulo, texto]) => (
              <li key={titulo} className="py-5 first:pt-0 last:pb-0">
                <h3 className="text-xl font-semibold tracking-tight">{titulo}</h3>
                <p className="mt-1 text-lg text-muted">{texto}</p>
              </li>
            ))}
          </ul>

          <Link
            href="/tasacion"
            className="mt-8 inline-flex min-h-[56px] items-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            Pedir tasación
            <ArrowRightIcon className="size-[18px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
