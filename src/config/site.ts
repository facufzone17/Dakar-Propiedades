/**
 * Datos de contacto de Dakar Propiedades.
 *
 * Todo lo de acá es público y verificado (Google Maps / Facebook de Dakar),
 * salvo lo que está marcado con TODO.
 */
export const SITIO = {
  nombre: "Dakar Propiedades",
  direccion: "Av. Francisco Beiró 4227",
  localidad: "Villa Devoto, CABA",
  telefono: "011 4504-3435",
  telefonoHref: "tel:+541145043435",
  horario: "10 a 13 h y 16 a 19 h",
} as const;

/**
 * TODO: REEMPLAZAR ANTES DE MOSTRAR EL SITIO.
 *
 * El fijo 011 4504-3435 no tiene WhatsApp, así que este número es un placeholder.
 * Va el número del usuario hasta que Dakar confirme el propio.
 * Formato wa.me: 54 + 9 + característica sin el 0 + número sin el 15.
 */
export const WHATSAPP_NUMERO = "5491100000000";

/** Arma el link de WhatsApp con un mensaje precargado. */
export function whatsappUrl(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

export const NAV_LINKS = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/tasacion", label: "Tasá tu propiedad" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;
