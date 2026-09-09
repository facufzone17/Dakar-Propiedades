"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
} from "react";

/**
 * Efecto máquina de escribir: teclea el texto cuando entra en viewport.
 *
 * - SSR / sin-JS / `prefers-reduced-motion`: muestra el texto completo, sin cursor.
 * - El texto no tecleado ocupa lugar (opacidad 0) para que no haya reflow.
 * - `speed` es milisegundos por caracter; `startDelay` demora el arranque para
 *   encadenar varios (título → párrafo, ítem tras ítem).
 */
export function Typewriter({
  text,
  as: Tag = "span",
  className = "",
  speed = 24,
  startDelay = 0,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  speed?: number;
  startDelay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [count, setCount] = useState(text.length);

  // Decidir en el cliente: teclear o mostrar entero.
  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || document.hidden || !el || typeof IntersectionObserver === "undefined") {
      setCount(text.length);
      setReady(true);
      return;
    }
    setCount(0);
    setReady(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );
    io.observe(el);
    const fb = window.setTimeout(() => setAnimate(true), 2000);
    return () => {
      io.disconnect();
      window.clearTimeout(fb);
    };
  }, [text]);

  // Tecleo con requestAnimationFrame (suave y tolerante a throttling).
  useEffect(() => {
    if (!animate) return;
    let raf = 0;
    let t0 = 0;
    const arranque = window.setTimeout(() => {
      const paso = (t: number) => {
        if (!t0) t0 = t;
        const objetivo = Math.min(text.length, Math.floor((t - t0) / speed));
        setCount(objetivo);
        if (objetivo < text.length) raf = requestAnimationFrame(paso);
      };
      raf = requestAnimationFrame(paso);
    }, startDelay);
    return () => {
      window.clearTimeout(arranque);
      cancelAnimationFrame(raf);
    };
  }, [animate, text, speed, startDelay]);

  const typed = ready ? text.slice(0, count) : text;
  const rest = ready ? text.slice(count) : "";
  const tecleando = ready && count < text.length;

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{typed}</span>
      {tecleando && <span className="tw-caret" aria-hidden="true" />}
      <span aria-hidden="true" className="tw-rest">
        {rest}
      </span>
    </Tag>
  );
}
