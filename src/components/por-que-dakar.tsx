/**
 * Bloque "Por qué Dakar" — versión adaptada de los 3 pasos de Realtab, con el
 * mensaje real del brief §1 (rápido, buen precio, conoce la zona) en vez del
 * genérico "conectá con expertos".
 *
 * TODO (copy de marca): estos tres textos son la lectura del posicionamiento que
 * hicimos nosotros, no palabras de Dakar. Son los primeros candidatos a
 * reemplazar cuando haya charla con ellos.
 *
 * La reseña del final SÍ es real y pública (Google Maps, 5★). No tocar el texto.
 */
const MOTIVOS = [
  {
    n: "01",
    titulo: "Cerramos rápido",
    texto:
      "Se opera con quien toma las decisiones. Menos intermediarios en el medio, menos tiempo perdido entre la primera visita y la firma.",
  },
  {
    n: "02",
    titulo: "A buen precio",
    texto:
      "La tasación sale de lo que se está vendiendo hoy en la zona, no de una expectativa. Un precio realista es lo que hace que la operación se cierre.",
  },
  {
    n: "03",
    titulo: "Conocemos el barrio",
    texto:
      "Oficina sobre Av. Francisco Beiró, en Villa Devoto, y cartera repartida por toda la Capital. Sabemos qué vale cada cuadra.",
  },
];

export function PorQueDakar() {
  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <h2 className="max-w-[14ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
          Por qué Dakar
        </h2>

        <ol className="mt-10 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-12">
          {MOTIVOS.map((m) => (
            <li key={m.n} className="border-t border-white/20 pt-6">
              <span className="block text-lg font-semibold text-white/50">{m.n}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight lg:text-3xl">
                {m.titulo}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-white/75">{m.texto}</p>
            </li>
          ))}
        </ol>

        <figure className="mt-14 max-w-[62ch] border-t border-white/20 pt-10 lg:mt-20">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight lg:text-3xl">
            “Vendió mi casa rápido, a buen precio, nunca tuve un problema. Y cada persona
            que lo recomiendo cierra con éxito alquileres. Para mi es el mejor de la zona.”
          </blockquote>
          <figcaption className="mt-5 text-lg text-white/75">
            Camila Gelos — reseña de 5 estrellas en Google
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
