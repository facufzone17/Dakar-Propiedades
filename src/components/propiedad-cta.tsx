"use client";

import { registrarConsulta } from "@/lib/track";
import { MailIcon, WhatsappIcon } from "./icons";

/**
 * Botones de contacto de la ficha. Son un client component solo para registrar
 * la consulta (WhatsApp / llamada / mail) antes de que el navegador cambie de
 * contexto.
 */
export function PropiedadCta({
  propiedadId,
  whatsappHref,
  telefono,
  telefonoHref,
  mailHref,
}: {
  propiedadId: string;
  whatsappHref: string;
  telefono: string;
  telefonoHref: string;
  mailHref: string;
}) {
  return (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => registrarConsulta("whatsapp", propiedadId)}
        className="lift mt-7 flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand bg-ink px-6 text-lg font-semibold text-white hover:opacity-95"
      >
        <WhatsappIcon className="size-5" />
        Consultar por WhatsApp
      </a>

      <a
        href={telefonoHref}
        onClick={() => registrarConsulta("llamada", propiedadId)}
        className="lift mt-3 flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand border border-line px-6 text-lg font-semibold hover:bg-bg"
      >
        Llamar al {telefono}
      </a>

      <a
        href={mailHref}
        onClick={() => registrarConsulta("email", propiedadId)}
        className="mt-3 flex min-h-[48px] items-center justify-center gap-2 text-[15px] font-medium text-muted underline underline-offset-4 transition-colors hover:text-ink"
      >
        <MailIcon className="size-4" />
        Consultar por mail
      </a>
    </>
  );
}
