/**
 * Bloque "Por qué elegirnos" — tres motivos de posicionamiento (rápido, buen
 * precio, conoce la zona).
 *
 * Los tres párrafos son texto de marca genérico del template: son los primeros
 * candidatos a reemplazar cuando el cliente pase su propio mensaje. Los títulos
 * ya se editan desde el panel (/admin/textos); los párrafos viven acá.
 *
 * Entrada con efecto máquina de escribir: al hacer scroll a la sección, se
 * teclean el título, los subtítulos y los párrafos, encadenados.
 */
import { obtenerTextos } from "@/lib/textos";
import { Typewriter } from "./anim/typewriter";

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

const VEL_TITULO = 26; // ms por caracter
const VEL_PARRAFO = 11;

export async function PorQueNosotros() {
  const textos = await obtenerTextos();

  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <Typewriter
          as="h2"
          text={textos.home_porque_titulo}
          speed={VEL_TITULO}
          className="block max-w-[14ch] text-h2 font-semibold tracking-[-0.02em] text-balance"
        />

        <ol className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {MOTIVOS.map((m, i) => {
            const titulo = textos[m.clave];
            const dTitulo = 120 + i * 220;
            const dParrafo = dTitulo + titulo.length * VEL_TITULO + 180;
            return (
              <li key={m.n} className="border-t border-white/20 pt-6">
                <span className="block text-lg font-semibold text-white/50">{m.n}</span>
                <Typewriter
                  as="h3"
                  text={titulo}
                  speed={VEL_TITULO}
                  startDelay={dTitulo}
                  className="mt-3 block text-2xl font-semibold tracking-tight lg:text-3xl"
                />
                <Typewriter
                  as="p"
                  text={m.texto}
                  speed={VEL_PARRAFO}
                  startDelay={dParrafo}
                  className="mt-3 block text-lg leading-relaxed text-white/75"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
