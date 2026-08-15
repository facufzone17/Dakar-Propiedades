import Link from "next/link";
import { SITIO, whatsappUrl } from "@/config/site";
import { ArrowRightIcon, WhatsappIcon } from "./icons";

/** CTA final de la home. Es la conversión principal del sitio (brief §1). */
export function CtaTasacion() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="rounded-brand bg-bg-subtle px-6 py-14 lg:px-16 lg:py-20">
          <h2 className="max-w-[18ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
            ¿Cuánto vale tu propiedad?
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg text-muted lg:text-xl">
            Decinos qué tenés y te damos un precio realista para vender o alquilar, con
            lo que se está operando hoy en la zona.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/tasacion"
              className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            >
              Pedir tasación
              <ArrowRightIcon className="size-[18px]" />
            </Link>
            <a
              href={whatsappUrl(
                `Hola ${SITIO.nombre}, quería pedir una tasación de mi propiedad.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand border border-line px-8 text-lg font-semibold transition-colors hover:bg-bg"
            >
              <WhatsappIcon className="size-5" />
              Escribinos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
