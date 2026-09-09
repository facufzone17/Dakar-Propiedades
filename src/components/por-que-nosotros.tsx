/**
 * Bloque "Por qué elegirnos" — tres motivos de posicionamiento (rápido, buen
 * precio, conoce la zona).
 *
 * Los tres párrafos son texto de marca genérico del template: son los primeros
 * candidatos a reemplazar cuando el cliente pase su propio mensaje. Los títulos
 * ya se editan desde el panel (/admin/textos); los párrafos viven acá.
 *
 * No hay testimonios: un template no puede traer reseñas reales de nadie y no se
 * inventan. Cada inmobiliaria suma las suyas cuando adopta el sitio.
 */
import { obtenerTextos } from "@/lib/textos";

const MOTIVOS = [
  {
    n: "01",
    clave: "home_porque_1",
    texto:
      "Se opera con quien toma las decisiones. Menos intermediarios en el medio, menos tiempo perdido entre la primera visita y la firma.",
  },
  {
    n: "02",
    clave: "home_porque_2",
    texto:
      "La tasación sale de lo que se está vendiendo hoy en la zona, no de una expectativa. Un precio realista es lo que hace que la operación se cierre.",
  },
  {
    n: "03",
    clave: "home_porque_3",
    texto:
      "Trabajamos la zona oeste todos los días y tenemos cartera repartida por toda la Capital. Sabemos qué vale cada cuadra.",
  },
] as const;

export async function PorQueNosotros() {
  const textos = await obtenerTextos();

  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <h2 className="max-w-[14ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
          {textos.home_porque_titulo}
        </h2>

        <ol className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {MOTIVOS.map((m) => (
            <li key={m.n} className="border-t border-white/20 pt-6">
              <span className="block text-lg font-semibold text-white/50">{m.n}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
                {textos[m.clave]}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-white/75">{m.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
