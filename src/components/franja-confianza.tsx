import { PROPIEDADES } from "@/data/propiedades";
import { SITIO } from "@/config/site";

/**
 * Franja de confianza (brief §4): datos reales, no logos de "empresas que confían"
 * — eso no aplica a una inmobiliaria de barrio.
 *
 * Los números salen de la cartera, así que no se desactualizan solos.
 *
 * TODO: falta el dato de años de trayectoria en Villa Devoto. No está en la
 * investigación y no se puede inventar. Cuando Dakar lo confirme, entra acá.
 */
export function FranjaConfianza() {
  const total = PROPIEDADES.length;
  const barriosCaba = new Set(
    PROPIEDADES.filter((p) => p.zona === "CABA").map((p) => p.barrio),
  ).size;

  const datos = [
    { valor: `${total}`, label: "propiedades en cartera" },
    { valor: `${barriosCaba}`, label: "barrios de CABA, más GBA y San Luis" },
    { valor: "4", label: "servicios: venta, alquiler, tasación y administración" },
  ];

  return (
    <section aria-label="Dakar en números" className="bg-bg-subtle">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
        <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {datos.map((d) => (
            <div key={d.label}>
              <dt className="sr-only">{d.label}</dt>
              <dd>
                <span className="block text-5xl font-semibold tracking-[-0.02em] lg:text-6xl">
                  {d.valor}
                </span>
                <span className="mt-2 block max-w-[24ch] text-lg text-muted">{d.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-10 text-lg text-muted">
          Oficina en {SITIO.direccion}, {SITIO.localidad}.
        </p>
      </div>
    </section>
  );
}
