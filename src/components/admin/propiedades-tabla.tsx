"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { cambiarEstadoPropiedad, eliminarPropiedad } from "@/app/admin/actions";
import { formatearPrecio, type EstadoPropiedad, type Propiedad } from "@/data/propiedades";
import { ETIQUETA_ESTADO, TONO_ESTADO } from "@/lib/estados";
import { IconBasura, IconBuscar, IconPausa, IconPlay } from "./icons";
import { Badge, BotonSecundario, Card } from "./ui";

type FiltroEstado = "todas" | EstadoPropiedad;

export function PropiedadesTabla({ propiedades }: { propiedades: Propiedad[] }) {
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState<FiltroEstado>("todas");
  const [pendiente, startTransition] = useTransition();

  const filtradas = useMemo(() => {
    const t = q.trim().toLowerCase();
    return propiedades.filter((p) => {
      if (estado !== "todas" && p.estado !== estado) return false;
      if (!t) return true;
      return (
        p.direccion.toLowerCase().includes(t) ||
        p.barrio.toLowerCase().includes(t) ||
        p.zona.toLowerCase().includes(t) ||
        p.id.includes(t)
      );
    });
  }, [propiedades, q, estado]);

  return (
    <Card className="p-0">
      <div className="flex flex-wrap items-center gap-3 border-b border-line p-4">
        <div className="relative flex-1 min-w-[200px]">
          <IconBuscar className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por dirección, barrio o ID"
            className="min-h-[40px] w-full rounded-full border border-line bg-bg-subtle pl-9 pr-3 text-sm focus-visible:outline-offset-2"
          />
        </div>
        <div className="flex gap-1.5">
          {(["todas", "activa", "pausada", "vendida"] as FiltroEstado[]).map((e) => (
            <button
              key={e}
              onClick={() => setEstado(e)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                estado === e ? "bg-ink text-white" : "bg-bg-subtle text-muted hover:text-ink"
              }`}
            >
              {e === "todas" ? "Todas" : ETIQUETA_ESTADO[e]}
            </button>
          ))}
        </div>
      </div>

      {filtradas.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted">No hay propiedades con ese criterio.</p>
      ) : (
        <ul className="divide-y divide-line">
          {filtradas.map((p) => (
            <li
              key={p.id}
              className={`flex flex-wrap items-center gap-4 p-4 ${pendiente ? "opacity-60" : ""}`}
            >
              <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-bg-subtle">
                {p.fotos[0] && (
                  <Image src={p.fotos[0]} alt="" fill sizes="56px" className="object-cover" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/admin/propiedades/${p.id}`}
                  className="block truncate font-semibold hover:underline"
                >
                  {p.tipo} · {p.direccion}
                </Link>
                <p className="truncate text-sm text-muted">
                  {p.barrio}, {p.zona} · {p.operacion}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold tracking-tight">{formatearPrecio(p)}</p>
                <span className="mt-0.5 inline-block">
                  <Badge tono={p.estado ? TONO_ESTADO[p.estado] : "gris"}>
                    {p.estado ? ETIQUETA_ESTADO[p.estado] : "—"}
                  </Badge>
                </span>
              </div>

              <div className="flex w-full justify-end gap-2 sm:w-auto">
                {p.estado === "activa" ? (
                  <BotonSecundario
                    onClick={() =>
                      startTransition(() => cambiarEstadoPropiedad(p.id, "pausada"))
                    }
                    title="Pausar (sacar del sitio)"
                  >
                    <IconPausa className="size-3.5" /> Pausar
                  </BotonSecundario>
                ) : (
                  <BotonSecundario
                    onClick={() => startTransition(() => cambiarEstadoPropiedad(p.id, "activa"))}
                    title="Publicar en el sitio"
                  >
                    <IconPlay className="size-3.5" /> Activar
                  </BotonSecundario>
                )}

                {p.estado !== "vendida" && (
                  <BotonSecundario
                    onClick={() => startTransition(() => cambiarEstadoPropiedad(p.id, "vendida"))}
                    title="Marcar como vendida/alquilada"
                  >
                    Cerrar
                  </BotonSecundario>
                )}

                <BotonSecundario
                  onClick={() => {
                    if (confirm(`¿Eliminar definitivamente ${p.direccion}? No se puede deshacer.`)) {
                      startTransition(() => eliminarPropiedad(p.id));
                    }
                  }}
                  className="text-red-600 hover:bg-red-50"
                  title="Eliminar"
                >
                  <IconBasura className="size-3.5" />
                </BotonSecundario>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
