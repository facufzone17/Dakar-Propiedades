import Link from "next/link";
import { NAV_LINKS, SITIO, whatsappUrl } from "@/config/site";
import { ClockIcon, PhoneIcon, PinIcon, WhatsappIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-3">
          <div>
            <p className="flex items-baseline gap-1.5 text-[1.375rem] leading-none">
              <span className="font-semibold tracking-tight">Dakar</span>
              <span className="font-normal text-white/70">Propiedades</span>
            </p>
            <p className="mt-5 max-w-[34ch] text-lg text-white/75">
              Venta, alquiler, tasación y administración de propiedades.
            </p>
            <a
              href={whatsappUrl(`Hola ${SITIO.nombre}, quería hacerles una consulta.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex min-h-[56px] items-center gap-2.5 rounded-brand bg-white px-7 text-lg font-semibold text-ink transition-opacity hover:opacity-85"
            >
              <WhatsappIcon className="size-5" />
              Escribinos por WhatsApp
            </a>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Contacto</h2>
            <ul className="mt-5 space-y-4 text-lg text-white/75">
              <li className="flex gap-3">
                <PinIcon className="mt-0.5 size-5 shrink-0" />
                <span>
                  {SITIO.direccion}
                  <br />
                  {SITIO.localidad}
                </span>
              </li>
              <li className="flex gap-3">
                <PhoneIcon className="mt-0.5 size-5 shrink-0" />
                <a
                  href={SITIO.telefonoHref}
                  className="-my-2 inline-flex min-h-[44px] items-center py-2 hover:text-white"
                >
                  {SITIO.telefono}
                </a>
              </li>
              <li className="flex gap-3">
                <ClockIcon className="mt-0.5 size-5 shrink-0" />
                <span>{SITIO.horario}</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Secciones</h2>
            <ul className="mt-5 space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex min-h-[44px] items-center text-lg text-white/75 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/20 pt-8">
          <p className="text-white/60">
            © {new Date().getFullYear()} {SITIO.nombre}
          </p>
          {/* TODO: si Dakar tiene matrícula CUCICBA, va acá — es lo que muestra la
              competencia de la zona y da confianza legal (brief §5). */}
        </div>
      </div>
    </footer>
  );
}
