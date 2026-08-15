"use client";

import { useState } from "react";
import { SITIO, whatsappUrl } from "@/config/site";
import { ArrowRightIcon, ChevronDownIcon, WhatsappIcon } from "./icons";

/**
 * El formulario arma un mensaje de WhatsApp con los datos cargados y abre el chat.
 *
 * Por qué así y no un POST a un backend: funciona de verdad hoy, sin servicio de
 * mail ni API key, y deja la consulta en el canal que el brief §1 define como
 * principal. Cuando haya acuerdo con Dakar se puede cambiar por un envío a
 * Supabase o a un mail sin tocar el resto del sitio.
 */

const TIPOS = ["Departamento", "Casa", "PH", "Local", "Galpón", "Terreno", "Otro"];
const OPERACIONES = ["Vender", "Alquilar", "Todavía no sé"];

export function FormTasacion() {
  const [enviado, setEnviado] = useState(false);
  const [datos, setDatos] = useState({
    nombre: "",
    telefono: "",
    tipo: "",
    direccion: "",
    operacion: "",
    comentario: "",
  });

  const set = (k: keyof typeof datos) => (v: string) =>
    setDatos((d) => ({ ...d, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lineas = [
      `Hola ${SITIO.nombre}, quiero pedir una tasación.`,
      "",
      `Nombre: ${datos.nombre}`,
      `Teléfono: ${datos.telefono}`,
      `Tipo de propiedad: ${datos.tipo}`,
      `Ubicación: ${datos.direccion}`,
      `Quiero: ${datos.operacion}`,
      datos.comentario ? `Comentario: ${datos.comentario}` : null,
    ].filter(Boolean);
    window.open(whatsappUrl(lineas.join("\n")), "_blank", "noopener,noreferrer");
    setEnviado(true);
  };

  return (
    <form onSubmit={onSubmit} className="rounded-brand bg-bg-subtle p-6 lg:p-9">
      <div className="grid gap-6 sm:grid-cols-2">
        <Texto id="t-nombre" label="Nombre" value={datos.nombre} onChange={set("nombre")} requerido autoComplete="name" />
        <Texto id="t-telefono" label="Teléfono" value={datos.telefono} onChange={set("telefono")} requerido type="tel" autoComplete="tel" />

        <Select id="t-tipo" label="Tipo de propiedad" value={datos.tipo} onChange={set("tipo")} opciones={TIPOS} vacio="Elegí una opción" requerido />
        <Select id="t-operacion" label="Querés" value={datos.operacion} onChange={set("operacion")} opciones={OPERACIONES} vacio="Elegí una opción" requerido />

        <div className="sm:col-span-2">
          <Texto id="t-direccion" label="Dirección o barrio" value={datos.direccion} onChange={set("direccion")} requerido placeholder="Ej: Av. Francisco Beiró 4200, Villa Devoto" />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="t-comentario" className="block text-sm font-semibold uppercase tracking-wide text-muted">
            Algo más que quieras contarnos <span className="normal-case tracking-normal">(opcional)</span>
          </label>
          <textarea
            id="t-comentario"
            rows={4}
            value={datos.comentario}
            onChange={(e) => set("comentario")(e.target.value)}
            className="mt-2 w-full rounded-brand border border-line bg-bg p-4 text-lg focus-visible:outline-offset-2"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-brand bg-ink px-8 text-lg font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
      >
        <WhatsappIcon className="size-5" />
        Enviar por WhatsApp
        <ArrowRightIcon className="size-[18px]" />
      </button>

      <p aria-live="polite" className="mt-4 text-[15px] text-muted">
        {enviado
          ? "Se abrió WhatsApp con tu consulta cargada. Si no se abrió, revisá que el navegador no haya bloqueado la ventana."
          : "Al enviar se abre WhatsApp con todos los datos ya escritos. Revisalos y mandá el mensaje."}
      </p>
    </form>
  );
}

function Texto({
  id, label, value, onChange, requerido, type = "text", placeholder, autoComplete,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  requerido?: boolean; type?: string; placeholder?: string; autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold uppercase tracking-wide text-muted">
        {label} {requerido && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={requerido}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 min-h-[56px] w-full rounded-brand border border-line bg-bg px-4 text-lg focus-visible:outline-offset-2"
      />
    </div>
  );
}

function Select({
  id, label, value, onChange, opciones, vacio, requerido,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  opciones: string[]; vacio: string; requerido?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold uppercase tracking-wide text-muted">
        {label} {requerido && <span aria-hidden="true">*</span>}
      </label>
      <div className="relative mt-2">
        <select
          id={id}
          required={requerido}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-h-[56px] w-full appearance-none rounded-brand border border-line bg-bg px-4 pr-10 text-lg focus-visible:outline-offset-2 ${value ? "text-ink" : "text-muted"}`}
        >
          <option value="">{vacio}</option>
          {opciones.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}
