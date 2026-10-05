import { getLenis } from "@/hooks/use-lenis";

/**
 * Bloquea el scroll del fondo (menú mobile, galería ampliada). Devuelve la
 * función para liberarlo, pensada para usar como cleanup de un `useEffect`.
 *
 * `overflow: hidden` solo no alcanza: Lenis scrollea por JS, así que además hay
 * que pausarlo o el fondo seguiría moviéndose detrás del modal.
 */
export function lockScroll() {
  document.body.style.overflow = "hidden";
  getLenis()?.stop();
  return () => {
    document.body.style.overflow = "";
    getLenis()?.start();
  };
}
