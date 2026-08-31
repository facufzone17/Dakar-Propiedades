"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { guardarPropiedad } from "@/app/admin/actions";
import { TIPOS_PROPIEDAD, type Propiedad } from "@/data/propiedades";
import { AreaTexto, Campo, Numero, Selector, Texto } from "./campos";
import { FotoUploader } from "./foto-uploader";
import { IconMas } from "./icons";
import { BotonPrimario, Card, TituloSeccion } from "./ui";

const AMENITIES_SUGERIDOS = [
  "Balcón", "Cochera", "Patio", "Terraza", "Parrilla", "Pileta", "SUM", "Gimnasio",
  "Ascensor", "Seguridad", "Lavadero", "Suite", "Vestidor", "Aire acondicionado",
  "Gas natural", "Apto crédito", "A estrenar", "Apto profesional", "Frente", "Contrafrente",
];

export function PropiedadForm({ propiedad }: { propiedad?: Propiedad }) {
  const [estado, accion, pendiente] = useActionState(guardarPropiedad, null);
  const [fotos, setFotos] = useState<string[]>(propiedad?.fotos ?? []);
  const [amenities, setAmenities] = useState<string[]>(propiedad?.amenities ?? []);
  const [nuevoAmenity, setNuevoAmenity] = useState("");

  const agregarAmenity = (a: string) => {
    const v = a.trim();
    if (v && !amenities.includes(v)) setAmenities([...amenities, v]);
    setNuevoAmenity("");
  };

  const carpeta = propiedad?.id ?? "nuevas";

  return (
    <form action={accion} className="space-y-4">
      {propiedad && <input type="hidden" name="id" value={propiedad.id} />}
      <input type="hidden" name="fotos" value={JSON.stringify(fotos)} />
      <input type="hidden" name="amenities" value={JSON.stringify(amenities)} />

      <Card>
        <TituloSeccion titulo="Operación y tipo" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Campo label="Operación">
            <Selector
              name="operacion"
              defaultValue={propiedad?.operacion ?? "venta"}
              opciones={[
                { valor: "venta", label: "Venta" },
                { valor: "alquiler", label: "Alquiler" },
              ]}
            />
          </Campo>
          <Campo label="Tipo de propiedad">
            <Selector
              name="tipo"
              defaultValue={propiedad?.tipo ?? "Departamento"}
              opciones={TIPOS_PROPIEDAD.map((t) => ({ valor: t, label: t }))}
            />
          </Campo>
        </div>
      </Card>

      <Card>
        <TituloSeccion titulo="Ubicación" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Campo label="Dirección" className="sm:col-span-2" ayuda="Como se muestra en el aviso (podés incluir piso).">
            <Texto name="direccion" defaultValue={propiedad?.direccion} required placeholder="Terrada 1800, piso 5" />
          </Campo>
          <Campo label="Barrio">
            <Texto name="barrio" defaultValue={propiedad?.barrio} required placeholder="Villa del Parque" />
          </Campo>
          <Campo label="Zona / Partido" ayuda="CABA, o el partido y provincia.">
            <Texto name="zona" defaultValue={propiedad?.zona ?? "CABA"} placeholder="CABA" />
          </Campo>
        </div>
      </Card>

      <Card>
        <TituloSeccion titulo="Precio" />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Campo label="Precio">
            <Numero name="precio" defaultValue={propiedad?.precio} step="1" />
          </Campo>
          <Campo label="Moneda">
            <Selector
              name="moneda"
              defaultValue={propiedad?.moneda ?? "USD"}
              opciones={[
                { valor: "USD", label: "USD" },
                { valor: "ARS", label: "$ ARS" },
              ]}
            />
          </Campo>
          <Campo label="Expensas (opcional)">
            <Numero name="expensas" defaultValue={propiedad?.expensas} step="1" />
          </Campo>
        </div>
      </Card>

      <Card>
        <TituloSeccion titulo="Ambientes y superficie" descripcion="Dejá en blanco lo que no aplique." />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Campo label="Ambientes">
            <Numero name="ambientes" defaultValue={propiedad?.ambientes} step="0.5" />
          </Campo>
          <Campo label="Dormitorios">
            <Numero name="dormitorios" defaultValue={propiedad?.dormitorios} step="1" />
          </Campo>
          <Campo label="Baños">
            <Numero name="banos" defaultValue={propiedad?.banos} step="1" />
          </Campo>
          <Campo label="Cocheras">
            <Numero name="cocheras" defaultValue={propiedad?.cocheras} step="1" />
          </Campo>
          <Campo label="m² cubiertos">
            <Numero name="m2Cubiertos" defaultValue={propiedad?.m2Cubiertos} step="1" />
          </Campo>
          <Campo label="m² de terreno">
            <Numero name="m2Terreno" defaultValue={propiedad?.m2Terreno} step="1" />
          </Campo>
          <Campo label="Antigüedad (años)">
            <Numero name="antiguedad" defaultValue={propiedad?.antiguedad} step="1" />
          </Campo>
        </div>
      </Card>

      <Card>
        <TituloSeccion titulo="Servicios y ambientes" />
        <div className="mt-4 flex flex-wrap gap-2">
          {amenities.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmenities(amenities.filter((x) => x !== a))}
              className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-sm font-medium text-white"
            >
              {a} <span aria-hidden>×</span>
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <input
            value={nuevoAmenity}
            onChange={(e) => setNuevoAmenity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                agregarAmenity(nuevoAmenity);
              }
            }}
            placeholder="Agregar y Enter"
            className="min-h-[40px] flex-1 rounded-full border border-line bg-white px-3.5 text-sm focus-visible:outline-offset-2"
          />
          <button
            type="button"
            onClick={() => agregarAmenity(nuevoAmenity)}
            className="rounded-full border border-line px-3 text-sm font-semibold hover:bg-bg-subtle"
          >
            <IconMas className="size-4" />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {AMENITIES_SUGERIDOS.filter((a) => !amenities.includes(a)).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => agregarAmenity(a)}
              className="rounded-full bg-bg-subtle px-2.5 py-1 text-xs text-muted hover:text-ink"
            >
              + {a}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <TituloSeccion titulo="Descripción" descripcion="El texto tal cual querés que aparezca en la ficha." />
        <div className="mt-4">
          <AreaTexto name="descripcion" defaultValue={propiedad?.descripcion} rows={6} />
        </div>
      </Card>

      <Card>
        <TituloSeccion titulo="Fotos" descripcion="La primera es la portada. Arrastrá con las flechas para reordenar." />
        <div className="mt-4">
          <FotoUploader fotos={fotos} setFotos={setFotos} carpeta={carpeta} />
        </div>
      </Card>

      <Card>
        <TituloSeccion titulo="Publicación" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Campo label="Estado">
            <Selector
              name="estado"
              defaultValue={propiedad?.estado ?? "activa"}
              opciones={[
                { valor: "activa", label: "Activa (visible en el sitio)" },
                { valor: "pausada", label: "Pausada (fuera del sitio)" },
                { valor: "vendida", label: "Cerrada (vendida / alquilada)" },
              ]}
            />
          </Campo>
          <Campo label="Aviso de origen (opcional)">
            <Texto name="fuenteUrl" defaultValue={propiedad?.fuenteUrl} placeholder="https://…" />
          </Campo>
          <label className="flex items-center gap-2.5 text-sm font-medium">
            <input
              type="checkbox"
              name="destacada"
              defaultChecked={propiedad?.destacada}
              className="size-4 rounded border-line"
            />
            Destacar en la página de inicio
          </label>
        </div>
      </Card>

      {estado?.error && (
        <p className="rounded-brand bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-inset ring-red-600/20">
          {estado.error}
        </p>
      )}

      <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3 rounded-full border border-black/[0.04] bg-white/90 p-2 pl-5 shadow-[0_8px_32px_-12px_rgba(23,23,23,0.25)] backdrop-blur">
        <Link href="/admin/propiedades" className="text-sm font-semibold text-muted hover:text-ink">
          Cancelar
        </Link>
        <BotonPrimario type="submit" disabled={pendiente}>
          {pendiente ? "Guardando…" : propiedad ? "Guardar cambios" : "Crear propiedad"}
        </BotonPrimario>
      </div>
    </form>
  );
}
