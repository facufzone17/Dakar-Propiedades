"use client";

import Lenis from "lenis";
import { useEffect } from "react";

/** Instancia activa (una sola por pestaña); la usa `lockScroll` para pausarla. */
let instancia: Lenis | null = null;

export function getLenis() {
  return instancia;
}

/**
 * Scroll con inercia (momentum): al usar la rueda del mouse la página no salta
 * de a pasos sino que desacelera de forma progresiva, como en iOS.
 *
 * - Easing exponencial (ease-out) + 1.2 s de duración para un "drift" marcado.
 * - Corre sobre `requestAnimationFrame` propio (el sitio no usa GSAP).
 * - No se activa con `prefers-reduced-motion`: ahí queda el scroll nativo.
 * - En touch no interviene (`syncTouch` apagado): el scroll nativo de iOS /
 *   Android ya tiene su propia inercia.
 */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Si el usuario hace click en un link en pleno deslizamiento, frenar la
      // inercia para que no pelee con el scroll a tope de la página nueva.
      stopInertiaOnNavigate: true,
    });
    instancia = lenis;

    let raf = requestAnimationFrame(function frame(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      if (instancia === lenis) instancia = null;
    };
  }, []);
}
