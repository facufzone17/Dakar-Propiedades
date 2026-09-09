import { SITIO, whatsappUrl } from "@/config/site";
import { WhatsappIcon } from "./icons";

/**
 * WhatsApp fijo y siempre visible (brief §1).
 * Solo en mobile: en desktop el CTA vive fijo en el header, y repetirlo sería
 * una segunda acción primaria compitiendo en la misma pantalla (brief regla 3).
 */
export function WhatsappFab() {
  return (
    <a
      href={whatsappUrl(`Hola ${SITIO.nombre}, quería hacerles una consulta.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="lift fab-in fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-ink text-white shadow-[0_6px_24px_rgba(23,23,23,0.28)] hover:opacity-95 lg:hidden"
    >
      <WhatsappIcon className="size-7" />
    </a>
  );
}
