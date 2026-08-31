import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* Primitivas visuales del panel. Estilo: tarjetas blancas redondeadas, sombras
   suaves, botones pill negros, badges pastel (ref. dashboard "Mycogen"). */

export function Card({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-black/[0.04] bg-white p-6 shadow-[0_1px_2px_rgba(23,23,23,0.04),0_12px_32px_-16px_rgba(23,23,23,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

export function BotonPrimario({
  className = "",
  children,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function LinkPrimario({
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
    </Link>
  );
}

export function BotonSecundario({
  className = "",
  children,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-[40px] items-center justify-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold transition-colors hover:bg-bg-subtle disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

const ESTILOS_BADGE = {
  verde: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  ambar: "bg-amber-50 text-amber-700 ring-amber-600/20",
  gris: "bg-black/[0.04] text-muted ring-black/10",
} as const;

export function Badge({
  tono = "gris",
  children,
}: {
  tono?: keyof typeof ESTILOS_BADGE;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${ESTILOS_BADGE[tono]}`}
    >
      {children}
    </span>
  );
}

export function TituloSeccion({
  titulo,
  descripcion,
}: {
  titulo: string;
  descripcion?: string;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold tracking-tight">{titulo}</h2>
      {descripcion && <p className="mt-1 text-sm text-muted">{descripcion}</p>}
    </div>
  );
}
