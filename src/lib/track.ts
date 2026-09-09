export type TipoConsulta = "whatsapp" | "llamada" | "email" | "tasacion";

/**
 * Registra una consulta sin bloquear la navegación. Usa `sendBeacon` si está
 * disponible (sobrevive al cambio de pestaña que abre WhatsApp).
 */
export function registrarConsulta(tipo: TipoConsulta, propiedadId?: string | null) {
  if (typeof window === "undefined") return;
  const payload = JSON.stringify({
    tipo,
    propiedadId: propiedadId ?? null,
    path: window.location.pathname,
  });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      return;
    }
  } catch {
    /* cae al fetch */
  }
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {});
}
