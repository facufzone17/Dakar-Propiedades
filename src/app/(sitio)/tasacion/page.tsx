import { FormTasacion } from "@/components/form-tasacion";
import { CheckIcon, WhatsappIcon } from "@/components/icons";
import { SITIO, whatsappUrl } from "@/config/site";
import { obtenerTextos } from "@/lib/textos";

export const revalidate = 60;

export const metadata = {
  title: `Tasá tu propiedad — ${SITIO.nombre}`,
  description:
    "Pedí la tasación de tu propiedad en la zona oeste. Te decimos cuánto vale y en cuánto se puede vender o alquilar hoy.",
};

const PASOS = [
  "Nos contás qué propiedad tenés y dónde.",
  "La vemos y la comparamos con lo que se está operando hoy en esa zona.",
  "Te pasamos un precio realista para vender o alquilar, sin compromiso.",
];

export default async function TasacionPage() {
  const textos = await obtenerTextos();

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <h1 className="max-w-[14ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
            {textos.tasacion_titulo}
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg text-muted lg:text-xl">
            Un precio realista es lo que hace que la operación se cierre. Contanos qué
            tenés y te decimos cuánto vale hoy.
          </p>

          <ol className="mt-10 space-y-5">
            {PASOS.map((paso, i) => (
              <li key={paso} className="flex gap-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <span className="max-w-[42ch] text-lg text-muted">{paso}</span>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-brand border border-line p-6">
            <p className="flex items-center gap-2.5 text-lg font-semibold">
              <CheckIcon className="size-5" />
              ¿Preferís escribir directo?
            </p>
            <a
              href={whatsappUrl(
                `Hola ${SITIO.nombre}, quería pedir una tasación de mi propiedad.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-[56px] items-center gap-2.5 rounded-brand border border-line px-7 text-lg font-semibold transition-colors hover:bg-bg-subtle"
            >
              <WhatsappIcon className="size-5" />
              Abrir WhatsApp
            </a>
          </div>
        </div>

        <FormTasacion />
      </div>
    </div>
  );
}
