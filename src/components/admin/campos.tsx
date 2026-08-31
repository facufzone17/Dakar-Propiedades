"use client";

import type { ReactNode } from "react";

const inputCls =
  "mt-1.5 min-h-[44px] w-full rounded-brand border border-line bg-white px-3.5 text-[15px] focus-visible:outline-offset-2";

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
