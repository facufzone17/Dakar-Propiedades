/**
 * Datos del sitio — punto único de rebranding.
 *
 * Este es un template genérico de inmobiliaria. Todo lo específico de un cliente
 * (nombre, dirección, teléfono, WhatsApp, matrícula) vive acá y se puede pisar
 * por variables de entorno en Vercel sin tocar código. Los valores por defecto
 * son placeholders de demo: no corresponden a ninguna inmobiliaria real.
 */
export const SITIO = {
  /** Nombre completo, para títulos y textos. Env: NEXT_PUBLIC_SITIO_NOMBRE */
  nombre: process.env.NEXT_PUBLIC_SITIO_NOMBRE || "Distrito Propiedades",
  /** Primera palabra del nombre, para el wordmark de dos tonos del header/footer. */
  nombreCorto: process.env.NEXT_PUBLIC_SITIO_NOMBRE_CORTO || "Distrito",
  /** Dirección de la oficina. Env: NEXT_PUBLIC_SITIO_DIRECCION */
  direccion: process.env.NEXT_PUBLIC_SITIO_DIRECCION || "Av. Rivadavia 15000",
  /** Localidad / partido. Env: NEXT_PUBLIC_SITIO_LOCALIDAD */
  localidad: process.env.NEXT_PUBLIC_SITIO_LOCALIDAD || "Ramos Mejía, Buenos Aires",
  /** Teléfono, como se muestra. Env: NEXT_PUBLIC_SITIO_TELEFONO */
  telefono: process.env.NEXT_PUBLIC_SITIO_TELEFONO || "11 2272-8576",
  /** Mismo teléfono en formato tel:. Env: NEXT_PUBLIC_SITIO_TELEFONO_HREF */
  telefonoHref: process.env.NEXT_PUBLIC_SITIO_TELEFONO_HREF || "tel:+541122728576",
  /** Mail de contacto. Env: NEXT_PUBLIC_SITIO_EMAIL */
  email: process.env.NEXT_PUBLIC_SITIO_EMAIL || "trevoo.proyectos@gmail.com",
  /** Horario de atención. Env: NEXT_PUBLIC_SITIO_HORARIO */
  horario: process.env.NEXT_PUBLIC_SITIO_HORARIO || "9 a 13 h y 15 a 19 h",
  /** Frase corta de posicionamiento para el hero y subtítulos. */
  zonaFrase:
    process.env.NEXT_PUBLIC_SITIO_ZONA_FRASE || "Inmobiliaria en la zona oeste",
  /** Matrícula (CUCICBA / colegio provincial). Se muestra en el footer solo si está. */
  matricula: process.env.NEXT_PUBLIC_SITIO_MATRICULA || "",
} as const;

/**
 * Wordmark de dos tonos: primera palabra en negrita, el resto atenuado.
 * Se deriva del nombre para que un solo env alcance para rebrandear.
 */
export const MARCA = {
  principal: SITIO.nombreCorto,
  resto: SITIO.nombre.startsWith(SITIO.nombreCorto)
    ? SITIO.nombre.slice(SITIO.nombreCorto.length).trim()
    : "",
} as const;

/**
 * Número de WhatsApp del cliente, formato wa.me: 54 + 9 + característica sin 0 +
 * número sin 15. El default es un placeholder que no corresponde a nadie.
 * Env: NEXT_PUBLIC_WHATSAPP_NUMERO
 */
export const WHATSAPP_NUMERO =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "5491122728576";

/** Arma el link de WhatsApp con un mensaje precargado. */
export function whatsappUrl(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

/** Arma un mailto: con asunto y cuerpo precargados. */
export function mailtoUrl(asunto: string, cuerpo?: string): string {
  const qs = `subject=${encodeURIComponent(asunto)}${
    cuerpo ? `&body=${encodeURIComponent(cuerpo)}` : ""
  }`;
  return `mailto:${SITIO.email}?${qs}`;
}

export const NAV_LINKS = [
  { href: "/propiedades", label: "Propiedades" },
  { href: "/tasacion", label: "Tasá tu propiedad" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;
