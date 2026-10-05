"use client";

import { useLenis } from "@/hooks/use-lenis";

/** Monta el scroll con inercia en el sitio público (el admin queda con scroll nativo). */
export function SmoothScroll() {
  useLenis();
  return null;
}
