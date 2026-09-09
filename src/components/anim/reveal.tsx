"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Revela su contenido (fade + slide-up) cuando entra en viewport, una sola vez.
 *
 * El contenido siempre se renderiza en el HTML: el CSS (`.js [data-reveal]`) lo
 * oculta solo cuando hay JS, y este componente le agrega `data-show` al entrar.
 * `delay` escalona ítems de una grilla o lista. `as` cambia el tag (por ej. "li"
 * para no romper la semántica de un <ol>/<ul>).
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Cargado en una pestaña en segundo plano: sin animación de scroll, se
    // muestra directo (cuando el usuario vuelva a la pestaña ya está).
    if (typeof IntersectionObserver === "undefined" || document.hidden) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      // Revela un poco antes de que entre del todo: evita el “pop” tardío.
      { rootMargin: "0px 0px 180px 0px", threshold: 0.01 },
    );
    io.observe(el);

    // Red de seguridad: si el observer no dispara (pestaña en segundo plano,
    // navegadores que lo throttlean), igual mostramos el contenido.
    const fallback = window.setTimeout(() => setShow(true), 700);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-show={show ? "" : undefined}
      className={className}
      style={delay ? { ["--reveal-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
