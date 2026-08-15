"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  barriosPorOperacion,
  tiposPorOperacion,
  type Operacion,
} from "@/data/propiedades";
import { ArrowRightIcon, ChevronDownIcon } from "./icons";

type TabId = "comprar" | "alquilar" | "vender";

const TABS: { id: TabId; label: string }[] = [
  { id: "comprar", label: "Comprar" },
  { id: "alquilar", label: "Alquilar" },
  { id: "vender", label: "Vender" },
];

/** Comprar/Alquilar filtran el catálogo. Vender no: va derecho a tasación. */
const OPERACION_DE_TAB: Record<Exclude<TabId, "vender">, Operacion> = {
  comprar: "venta",
  alquilar: "alquiler",
};

export function HeroSearch() {
  const [tabActiva, setTabActiva] = useState<TabId>("comprar");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Navegación con flechas dentro del tablist (patrón ARIA)
  const onTabKeyDown = (e: React.KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const siguiente = (i + delta + TABS.length) % TABS.length;
    setTabActiva(TABS[siguiente].id);
    tabRefs.current[siguiente]?.focus();
  };

  return (
    <div className="w-full">
      <div role="tablist" aria-label="Qué querés hacer" className="flex">
        {TABS.map((tab, i) => {
          const activa = tab.id === tabActiva;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={activa}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activa ? 0 : -1}
              onClick={() => setTabActiva(tab.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`min-h-[56px] min-w-[104px] flex-1 rounded-t-brand px-5 text-lg font-semibold transition-colors sm:flex-none sm:px-9 ${
                activa
                  ? "bg-bg text-ink"
                  : "bg-surface text-muted hover:bg-line hover:text-ink"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {TABS.map((tab) => {
        if (tab.id !== tabActiva) return null;

        if (tab.id === "vender") {
          return (
            <div
              key={tab.id}
              role="tabpanel"
              id="panel-vender"
              aria-labelledby="tab-vender"
              className="rounded-b-brand rounded-tr-brand bg-bg p-5 sm:p-7"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <p className="max-w-[46ch] text-lg text-muted">
                  Te decimos cuánto vale tu propiedad y en cuánto se puede vender hoy.
                </p>
                <Link
                  href="/tasacion"
                  className="inline-flex min-h-[56px] shrink-0 items-center justify-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Pedir tasación
                  <ArrowRightIcon className="size-[18px]" />
                </Link>
              </div>
            </div>
          );
        }

        const operacion = OPERACION_DE_TAB[tab.id];
        return (
          <PanelBusqueda
            key={tab.id}
            tabId={tab.id}
            operacion={operacion}
          />
        );
      })}
    </div>
  );
}

function PanelBusqueda({ tabId, operacion }: { tabId: TabId; operacion: Operacion }) {
  const [tipo, setTipo] = useState("");
  const [barrio, setBarrio] = useState("");

  // Solo tipos y barrios que existen de verdad para esta operación
  const tipos = tiposPorOperacion(operacion);
  const barrios = barriosPorOperacion(operacion);

  return (
    <div
      role="tabpanel"
      id={`panel-${tabId}`}
      aria-labelledby={`tab-${tabId}`}
      className="rounded-b-brand rounded-tr-brand bg-bg p-5 sm:p-7"
    >
      {/* GET nativo: funciona aunque falle el JS y deja la búsqueda en la URL */}
      <form
        action="/propiedades"
        method="get"
        className="flex flex-col gap-5 lg:flex-row lg:items-end lg:gap-8"
      >
        <input type="hidden" name="operacion" value={operacion} />

        <CampoSelect
          id={`tipo-${tabId}`}
          name="tipo"
          label="Tipo de propiedad"
          value={tipo}
          onChange={setTipo}
          opciones={tipos}
          textoVacio="Todos los tipos"
        />
        <CampoSelect
          id={`barrio-${tabId}`}
          name="barrio"
          label="Barrio o zona"
          value={barrio}
          onChange={setBarrio}
          opciones={barrios}
          textoVacio="Todas las zonas"
        />

        <button
          type="submit"
          className="inline-flex min-h-[56px] shrink-0 items-center justify-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ver propiedades
          <ArrowRightIcon className="size-[18px]" />
        </button>
      </form>
    </div>
  );
}

function CampoSelect({
  id,
  name,
  label,
  value,
  onChange,
  opciones,
  textoVacio,
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  opciones: string[];
  textoVacio: string;
}) {
  return (
    <div className="flex-1">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative border-b border-line">
        <select
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[52px] w-full appearance-none bg-transparent pr-8 text-lg font-medium focus-visible:outline-offset-4 ${
            value ? "text-ink" : "text-muted"
          }`}
        >
          <option value="">{textoVacio}</option>
          {opciones.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-1 top-1/2 size-5 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}
