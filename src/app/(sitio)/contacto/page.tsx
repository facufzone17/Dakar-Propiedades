import { ClockIcon, PhoneIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { SITIO, whatsappUrl } from "@/config/site";
import { obtenerTextos } from "@/lib/textos";

export const revalidate = 60;

export const metadata = {
  title: `Contacto — ${SITIO.nombre}`,
  description: `${SITIO.direccion}, ${SITIO.localidad}. Teléfono ${SITIO.telefono}. Horario: ${SITIO.horario}.`,
};

const DIRECCION_COMPLETA = `${SITIO.direccion}, ${SITIO.localidad}`;
const MAPA_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(DIRECCION_COMPLETA)}&z=16&output=embed`;
const MAPA_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DIRECCION_COMPLETA)}`;

export default async function ContactoPage() {
  const textos = await obtenerTextos();

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
      <h1 className="max-w-[14ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
        {textos.contacto_titulo}
      </h1>
      <p className="mt-5 max-w-[48ch] text-lg text-muted lg:text-xl">
        La vía más rápida es WhatsApp. También podés pasar por la oficina en el horario
        de atención.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <div>
          <a
            href={whatsappUrl(`Hola ${SITIO.nombre}, quería hacerles una consulta.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white transition-opacity hover:opacity-90"
          >
            <WhatsappIcon className="size-5" />
            Escribinos por WhatsApp
          </a>

          <dl className="mt-9 divide-y divide-line border-y border-line">
            <Dato icono={<PinIcon className="size-5" />} termino="Dirección">
              <a
                href={MAPA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center underline underline-offset-4"
              >
                {SITIO.direccion}, {SITIO.localidad}
              </a>
            </Dato>
            <Dato icono={<PhoneIcon className="size-5" />} termino="Teléfono">
              <a
                href={SITIO.telefonoHref}
                className="inline-flex min-h-[44px] items-center underline underline-offset-4"
              >
                {SITIO.telefono}
              </a>
            </Dato>
            <Dato icono={<ClockIcon className="size-5" />} termino="Horario">
              {SITIO.horario}
            </Dato>
          </dl>
        </div>

        <div className="overflow-hidden rounded-brand bg-bg-subtle">
          <iframe
            src={MAPA_EMBED}
            title={`Mapa de ${DIRECCION_COMPLETA}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full border-0 lg:h-full lg:min-h-[460px]"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Ojo con la estructura: dentro de un <dl>, un <div> solo puede contener <dt> y
 * <dd>. Meter un <span> o un <div> intermedio rompe la semántica de la lista de
 * definiciones, así que el ícono va adentro del propio <dt>.
 */
function Dato({
  icono,
  termino,
  children,
}: {
  icono: React.ReactNode;
  termino: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-5">
      <dt className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
        <span className="shrink-0">{icono}</span>
        {termino}
      </dt>
      <dd className="mt-1.5 pl-7 text-lg">{children}</dd>
    </div>
  );
}
