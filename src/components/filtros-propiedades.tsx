"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
  PROPIEDADES,
  rangosPrecio,
  type Filtros,
  type Operacion,
  type TipoPropiedad,
} from "@/data/propiedades";
import { ChevronDownIcon } from "./icons";

const AMBIENTES = [
  { valor: "1", label: "1 o más" },
  { valor: "2", label: "2 o más" },
  { valor: "3", label: "3 o más" },
  { valor: "4", label: "4 o más" },
];

/**
 * Los valores actuales llegan por props desde el server component, que ya los
 * parseó. Usar `useSearchParams()` acá obligaría a envolver todo en <Suspense> y
 * a que Next difiera el bloque al cliente: el filtro quedaba colgado en el
 * fallback y nunca se renderizaba. Con props se renderiza en el server y el
 * cliente solo se encarga de navegar.
 */
export function FiltrosPropiedades({
  filtros,
  resultados,
}: {
  filtros: Filtros;
  resultados: number;
}) {
  const router = useRouter();

  const operacion = filtros.operacion ?? "";
  const tipo = filtros.tipo ?? "";
  const barrio = filtros.barrio ?? "";
  const precioMax = filtros.precioMax ?? "";
  const ambientes = filtros.ambientes ?? "";

  const actualizar = useCallback(
    (clave: string, valor: string) => {
      const p = new URLSearchParams();
      const actuales: Record<string, string> = {
        operacion,
        tipo,
        barrio,
        precioMax,
        ambientes,
      };
      actuales[clave] = valor;
      // Cambiar de operación invalida el precio: cambia la moneda
      if (clave === "operacion") actuales.precioMax = "";
      for (const [k, v] of Object.entries(actuales)) if (v) p.set(k, v);
      router.replace(p.toString() ? `/propiedades?${p}` : "/propiedades", {
        scroll: false,
      });
    },
    [router, operacion, tipo, barrio, precioMax, ambientes],
  );

  // Las opciones salen de la cartera, filtradas por lo que ya se eligió:
  // nunca se ofrece un filtro que devuelva cero resultados.
  const universo = PROPIEDADES.filter(
    (p) => !operacion || p.operacion === (operacion as Operacion),
  );
  const tipos = [...new Set(universo.map((p) => p.tipo))].sort((a, b) =>
    a.localeCompare(b, "es"),
  ) as TipoPropiedad[];
  const barrios = [
    ...new Set(universo.filter((p) => !tipo || p.tipo === tipo).map((p) => p.barrio)),
  ].sort((a, b) => a.localeCompare(b, "es"));

  const hayFiltros = Boolean(operacion || tipo || barrio || precioMax || ambientes);

  return (
    <div className="rounded-brand bg-bg-subtle p-5 lg:p-7">
      <div className="grid gap-5 lg:grid-cols-5 lg:gap-6">
        <Campo id="f-operacion" label="Operación">
          <select
            id="f-operacion"
            value={operacion}
            onChange={(e) => actualizar("operacion", e.target.value)}
            className={selectCls(operacion)}
          >
            <option value="">Venta y alquiler</option>
            <option value="venta">Venta</option>
            <option value="alquiler">Alquiler</option>
          </select>
        </Campo>

        <Campo id="f-tipo" label="Tipo">
          <select
            id="f-tipo"
            value={tipo}
            onChange={(e) => actualizar("tipo", e.target.value)}
            className={selectCls(tipo)}
          >
            <option value="">Todos los tipos</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Campo>

        <Campo id="f-barrio" label="Zona">
          <select
            id="f-barrio"
            value={barrio}
            onChange={(e) => actualizar("barrio", e.target.value)}
            className={selectCls(barrio)}
          >
            <option value="">Todas las zonas</option>
            {barrios.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Campo>

        <Campo
          id="f-precio"
          label="Precio"
          ayuda={!operacion ? "Elegí venta o alquiler" : undefined}
        >
          <select
            id="f-precio"
            value={precioMax}
            disabled={!operacion}
            onChange={(e) => actualizar("precioMax", e.target.value)}
            className={`${selectCls(precioMax)} disabled:cursor-not-allowed disabled:text-line`}
          >
            <option value="">Sin tope</option>
            {operacion &&
              rangosPrecio(operacion as Operacion).map((r) => (
                <option key={r.valor} value={r.valor}>
                  {r.label}
                </option>
              ))}
          </select>
        </Campo>

        <Campo id="f-ambientes" label="Ambientes">
          <select
            id="f-ambientes"
            value={ambientes}
            onChange={(e) => actualizar("ambientes", e.target.value)}
            className={selectCls(ambientes)}
          >
            <option value="">Cualquiera</option>
            {AMBIENTES.map((a) => (
              <option key={a.valor} value={a.valor}>
                {a.label}
              </option>
            ))}
          </select>
        </Campo>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
        <p aria-live="polite" className="text-lg font-medium">
          {resultados === 0
            ? "No hay propiedades con esos filtros"
            : `${resultados} ${resultados === 1 ? "propiedad" : "propiedades"}`}
        </p>
        {hayFiltros && (
          <button
            type="button"
            onClick={() => router.replace("/propiedades", { scroll: false })}
            className="inline-flex min-h-[44px] items-center rounded-brand px-4 text-lg font-semibold underline underline-offset-4 hover:bg-bg"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}

function Campo({
  id,
  label,
  ayuda,
  children,
}: {
  id: string;
  label: string;
  ayuda?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold uppercase tracking-wide text-muted">
        {label}
      </label>
      <div className="relative mt-1 border-b border-line">
        {children}
        <ChevronDownIcon className="pointer-events-none absolute right-1 top-1/2 size-5 -translate-y-1/2 text-muted" />
      </div>
      {ayuda && <p className="mt-1.5 text-sm text-muted">{ayuda}</p>}
    </div>
  );
}

const selectCls = (valor: string) =>
  `min-h-[48px] w-full appearance-none bg-transparent pr-8 text-lg font-medium focus-visible:outline-offset-4 ${
    valor ? "text-ink" : "text-muted"
  }`;
