"use client";

import { registrarConsulta } from "@/lib/track";
import { WhatsappIcon } from "./icons";

/**
 * Botones de contacto de la ficha. Son un client component solo para registrar
 * la consulta (WhatsApp / llamada) antes de que el navegador cambie de contexto.
 */
export function PropiedadCta({
  propiedadId,
  whatsappHref,
  telefono,
  telefonoHref,
}: {
  propiedadId: string;
  whatsappHref: string;
  telefono: string;
  telefonoHref: string;
}) {
  return (
    <>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => registrarConsulta("whatsapp", propiedadId)}
        className="mt-7 flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand bg-ink px-6 text-lg font-semibold text-white transition-opacity hover:opacity-90"
      >
        <WhatsappIcon className="size-5" />
        Consultar por WhatsApp
      </a>

      <a
        href={telefonoHref}
        onClick={() => registrarConsulta("llamada", propiedadId)}
        className="mt-3 flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand border border-line px-6 text-lg font-semibold transition-colors hover:bg-bg"
      >
        Llamar al {telefono}
      </a>
    </>
  );
}
