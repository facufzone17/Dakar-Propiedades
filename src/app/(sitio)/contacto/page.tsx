import { ClockIcon, MailIcon, PhoneIcon, PinIcon, WhatsappIcon } from "@/components/icons";
import { Reveal } from "@/components/anim/reveal";
import { SITIO, mailtoUrl, whatsappUrl } from "@/config/site";
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
        La vía más rápida es WhatsApp. También podés escribirnos por mail o pasar por la
        oficina en el horario de atención.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        <Reveal>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl(`Hola ${SITIO.nombre}, quería hacerles una consulta.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="lift group flex min-h-[56px] flex-1 items-center justify-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white hover:opacity-95"
            >
              <WhatsappIcon className="size-5" />
              Por WhatsApp
            </a>
            <a
              href={mailtoUrl(`Consulta — ${SITIO.nombre}`)}
              className="lift flex min-h-[56px] flex-1 items-center justify-center gap-2.5 rounded-brand border border-line px-8 text-lg font-semibold hover:bg-bg-subtle"
            >
              <MailIcon className="size-5" />
              Por mail
            </a>
          </div>

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
            <Dato icono={<MailIcon className="size-5" />} termino="Mail">
              <a
                href={mailtoUrl(`Consulta — ${SITIO.nombre}`)}
                className="inline-flex min-h-[44px] items-center break-all underline underline-offset-4"
              >
                {SITIO.email}
              </a>
            </Dato>
            <Dato icono={<ClockIcon className="size-5" />} termino="Horario">
              {SITIO.horario}
            </Dato>
          </dl>
        </Reveal>

        <Reveal delay={120} className="overflow-hidden rounded-brand bg-bg-subtle">
          <iframe
            src={MAPA_EMBED}
            title={`Mapa de ${DIRECCION_COMPLETA}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full border-0 lg:h-full lg:min-h-[460px]"
          />
        </Reveal>
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
