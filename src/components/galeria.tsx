"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CloseIcon } from "./icons";

export function Galeria({ fotos, alt }: { fotos: string[]; alt: string }) {
  const [activa, setActiva] = useState(0);
  const [ampliada, setAmpliada] = useState(false);
  const cerrarRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ampliada) return;
    cerrarRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAmpliada(false);
      if (e.key === "ArrowRight") setActiva((i) => (i + 1) % fotos.length);
      if (e.key === "ArrowLeft") setActiva((i) => (i - 1 + fotos.length) % fotos.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [ampliada, fotos.length]);

  return (
    <>
      <div className="overflow-hidden rounded-brand">
        <button
          type="button"
          onClick={() => setAmpliada(true)}
          className="group relative block aspect-4/3 w-full overflow-hidden sm:aspect-16/9"
          aria-label="Ampliar foto"
        >
          <Image
            key={activa}
            src={fotos[activa]}
            alt={`${alt} — foto ${activa + 1} de ${fotos.length}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover animate-[fade_0.4s_ease] transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </button>
      </div>

      {fotos.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
          {fotos.map((f, i) => (
            <li key={f}>
              <button
                type="button"
                onClick={() => setActiva(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === activa}
                className={`relative block aspect-square w-full overflow-hidden rounded-brand transition-opacity ${
                  i === activa ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image src={f} alt="" fill sizes="120px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {ampliada && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Galería de fotos"
          className="fixed inset-0 z-[60] flex flex-col bg-ink/95"
          onClick={(e) => {
            if (e.target === e.currentTarget) setAmpliada(false);
          }}
        >
          <div className="on-dark flex justify-between p-4 text-white">
            <p className="self-center text-lg font-medium">
              {activa + 1} / {fotos.length}
            </p>
            <button
              ref={cerrarRef}
              type="button"
              onClick={() => setAmpliada(false)}
              aria-label="Cerrar galería"
              className="grid size-12 place-items-center rounded-brand text-white"
            >
              <CloseIcon className="size-7" />
            </button>
          </div>

          <div className="relative flex-1">
            <Image
              src={fotos[activa]}
              alt={`${alt} — foto ${activa + 1} de ${fotos.length}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>

          {fotos.length > 1 && (
            <div className="on-dark flex justify-center gap-4 p-5">
              <button
                type="button"
                onClick={() => setActiva((i) => (i - 1 + fotos.length) % fotos.length)}
                aria-label="Foto anterior"
                className="grid size-14 place-items-center rounded-brand bg-white/15 text-white hover:bg-white/25"
              >
                <ArrowRightIcon className="size-6 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setActiva((i) => (i + 1) % fotos.length)}
                aria-label="Foto siguiente"
                className="grid size-14 place-items-center rounded-brand bg-white/15 text-white hover:bg-white/25"
              >
                <ArrowRightIcon className="size-6" />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
