"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Cuenta de 0 a `value` cuando entra en viewport. Respeta `prefers-reduced-motion`
 * (muestra el número final directo) y funciona sin IntersectionObserver.
 */
export function CountUp({
  value,
  duration = 1200,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const corrio = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const sinMovimiento =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (
      sinMovimiento ||
      typeof IntersectionObserver === "undefined" ||
      document.hidden
    ) {
      setN(value);
      return;
    }

    const animar = () => {
      if (corrio.current) return;
      corrio.current = true;
      io.disconnect();
      window.clearTimeout(fallback);
      const inicio = performance.now();
      const paso = (t: number) => {
        const p = Math.min(1, (t - inicio) / duration);
        setN(Math.round((1 - Math.pow(1 - p, 3)) * value));
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) animar();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    // Red de seguridad si el observer no dispara.
    const fallback = window.setTimeout(animar, 700);

    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  );
}
