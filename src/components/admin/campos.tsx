"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { IconCheck, IconChevron, IconMas } from "./icons";

const inputBase =
  "min-h-[44px] w-full rounded-brand border border-line bg-white px-3.5 text-[15px] focus-visible:outline-offset-2";
const inputCls = `mt-1.5 ${inputBase}`;

export function Campo({
  label,
  children,
  ayuda,
  className = "",
}: {
  label: string;
  children: ReactNode;
  ayuda?: string;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold text-muted">{label}</span>
      {children}
      {ayuda && <span className="mt-1 block text-xs text-muted">{ayuda}</span>}
    </label>
  );
}

export function Texto({
  name,
  defaultValue,
  required,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <input
      name={name}
      defaultValue={defaultValue}
      required={required}
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

export function Numero({
  name,
  defaultValue,
  step,
  min = 0,
  placeholder,
}: {
  name: string;
  defaultValue?: number | null;
  step?: string;
  min?: number;
  placeholder?: string;
}) {
  return (
    <input
      type="number"
      name={name}
      defaultValue={defaultValue ?? ""}
      step={step}
      min={min}
      inputMode="decimal"
      placeholder={placeholder}
      className={inputCls}
    />
  );
}

export function Selector({
  name,
  defaultValue,
  opciones,
}: {
  name: string;
  defaultValue?: string;
  opciones: { valor: string; label: string }[];
}) {
  return (
    <select name={name} defaultValue={defaultValue} className={`${inputCls} appearance-none`}>
      {opciones.map((o) => (
        <option key={o.valor} value={o.valor}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/**
 * Selector editable: sugiere una lista pero deja escribir un valor propio. El
 * `<input>` es el que se envía, así que lo que se tipea se guarda tal cual
 * (por ej. un tipo "Casa" que no está entre las sugerencias). Reemplaza al
 * `<select>` nativo, cuyo resaltado azul no se puede estilar.
 */
export function SelectorLibre({
  name,
  defaultValue = "",
  opciones,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  opciones: string[];
  placeholder?: string;
}) {
  const [valor, setValor] = useState(defaultValue);
  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(-1);
  // `true` mientras el usuario tipea: recién ahí la lista se filtra. Con un
  // valor ya elegido se muestran todas las sugerencias, no solo la que coincide.
  const [filtrando, setFiltrando] = useState(false);
  const cajaRef = useRef<HTMLDivElement>(null);

  const q = filtrando ? valor.trim().toLowerCase() : "";
  const coincideExacto = opciones.some((o) => o.toLowerCase() === q);
  const filtradas = q ? opciones.filter((o) => o.toLowerCase().includes(q)) : opciones;
  const items: { valor: string; nuevo: boolean }[] = [
    ...filtradas.map((o) => ({ valor: o, nuevo: false })),
    ...(q && !coincideExacto ? [{ valor: valor.trim(), nuevo: true }] : []),
  ];

  const cerrar = () => {
    setAbierto(false);
    setActivo(-1);
    setFiltrando(false);
  };

  useEffect(() => {
    if (!abierto) return;
    const alTocarFuera = (e: PointerEvent) => {
      if (!cajaRef.current?.contains(e.target as Node)) cerrar();
    };
    document.addEventListener("pointerdown", alTocarFuera);
    return () => document.removeEventListener("pointerdown", alTocarFuera);
  }, [abierto]);

  const elegir = (v: string) => {
    setValor(v);
    cerrar();
  };

  return (
    <div ref={cajaRef} className="relative mt-1.5">
      <input
        type="text"
        name={name}
        value={valor}
        placeholder={placeholder}
        autoComplete="off"
        role="combobox"
        aria-expanded={abierto}
        aria-controls={`${name}-opciones`}
        aria-autocomplete="list"
        onChange={(e) => {
          setValor(e.target.value);
          setAbierto(true);
          setFiltrando(true);
          setActivo(-1);
        }}
        onFocus={() => setAbierto(true)}
        onClick={() => setAbierto(true)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setAbierto(true);
            setActivo((i) => (items.length ? (i + 1) % items.length : -1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActivo((i) => (items.length ? (i <= 0 ? items.length - 1 : i - 1) : -1));
          } else if (e.key === "Enter" && abierto && items[activo]) {
            e.preventDefault();
            elegir(items[activo].valor);
          } else if (e.key === "Escape") {
            cerrar();
          }
        }}
        className={`${inputBase} pr-10`}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label={abierto ? "Ocultar opciones" : "Ver opciones"}
        onClick={() => (abierto ? cerrar() : setAbierto(true))}
        className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted"
      >
        <IconChevron
          className={`size-4 transition-transform ${abierto ? "rotate-180" : ""}`}
        />
      </button>

      {abierto && items.length > 0 && (
        <ul
          id={`${name}-opciones`}
          role="listbox"
          onMouseDown={(e) => e.preventDefault()}
          className="absolute left-0 top-full z-20 mt-1.5 max-h-56 w-full overflow-auto rounded-brand border border-line bg-white p-1 shadow-[0_12px_32px_-12px_rgba(23,23,23,0.25)]"
        >
          {items.map((it, i) => (
            <li
              key={it.nuevo ? "__nuevo__" : it.valor}
              role="option"
              aria-selected={!it.nuevo && it.valor === valor}
              onClick={(e) => {
                e.stopPropagation();
                elegir(it.valor);
              }}
              onMouseEnter={() => setActivo(i)}
              className={`flex cursor-pointer items-center gap-2 rounded-[6px] px-3 py-2 text-[15px] transition-colors ${
                i === activo ? "bg-bg-subtle" : ""
              }`}
            >
              {it.nuevo ? (
                <>
                  <IconMas className="size-4 shrink-0 text-muted" />
                  <span>
                    Agregar <span className="font-semibold">“{it.valor}”</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="flex-1">{it.valor}</span>
                  {it.valor === valor && (
                    <IconCheck className="size-4 shrink-0 text-muted" />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AreaTexto({
  name,
  defaultValue,
  rows = 5,
}: {
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <textarea
      name={name}
      defaultValue={defaultValue}
      rows={rows}
      className="mt-1.5 w-full rounded-brand border border-line bg-white p-3.5 text-[15px] leading-relaxed focus-visible:outline-offset-2"
    />
  );
}
