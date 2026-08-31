"use client";

import { useActionState, useState } from "react";
import { guardarTextos } from "@/app/admin/actions";
import type { CampoTexto } from "@/lib/textos";
import { BotonPrimario, BotonSecundario, Card, TituloSeccion } from "./ui";
import { IconCheck, IconFlechaArribaDerecha } from "./icons";

export type GrupoEditable = {
  pagina: string;
  ruta: string;
  campos: (CampoTexto & { valor: string })[];
};

const inputCls =
  "mt-1.5 min-h-[44px] w-full rounded-brand border border-line bg-white px-3.5 text-[15px] focus-visible:outline-offset-2";

export function TextosForm({
  grupos,
  maxLargo,
  editable,
}: {
  grupos: GrupoEditable[];
  maxLargo: number;
  editable: boolean;
}) {
  const [estado, accion, pendiente] = useActionState(guardarTextos, null);

  // Un solo estado para todos los campos: hace falta para el contador, el aviso
  // de "modificado" y el botón de restaurar.
  const [valores, setValores] = useState<Record<string, string>>(() =>
    Object.fromEntries(grupos.flatMap((g) => g.campos.map((c) => [c.clave, c.valor]))),
  );

  const set = (clave: string, valor: string) =>
    setValores((v) => ({ ...v, [clave]: valor }));

  return (
    <form action={accion} className="space-y-4">
      {grupos.map((grupo) => (
        <Card key={grupo.pagina}>
          <div className="flex items-start justify-between gap-4">
            <TituloSeccion titulo={grupo.pagina} />
            <a
              href={grupo.ruta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-muted hover:text-ink"
            >
              Ver página
              <IconFlechaArribaDerecha className="size-4" />
            </a>
          </div>

          <div className="mt-4 space-y-4">
            {grupo.campos.map((campo) => {
              const valor = valores[campo.clave] ?? "";
              const modificado = valor.trim() !== campo.porDefecto;
              const pasado = valor.length > maxLargo;

              return (
                <div key={campo.clave}>
                  <label className="block">
                    <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-muted">
                      {campo.label}
                      {modificado && (
                        <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-xs font-semibold text-muted ring-1 ring-inset ring-black/10">
                          Modificado
                        </span>
                      )}
                    </span>
                    <input
                      name={campo.clave}
                      value={valor}
                      onChange={(e) => set(campo.clave, e.target.value)}
                      maxLength={maxLargo}
                      disabled={!editable}
                      placeholder={campo.porDefecto}
                      className={`${inputCls} ${pasado ? "border-red-400" : ""} disabled:bg-bg-subtle disabled:text-muted`}
                    />
                  </label>

                  <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                    <span className="text-xs text-muted">
                      {campo.ayuda ?? `Original: “${campo.porDefecto}”`}
                    </span>
                    <span className="flex items-center gap-3 text-xs text-muted">
                      <span className={pasado ? "text-red-600" : ""}>
                        {valor.length}/{maxLargo}
                      </span>
                      {modificado && editable && (
                        <button
                          type="button"
                          onClick={() => set(campo.clave, campo.porDefecto)}
                          className="font-semibold underline underline-offset-2 hover:text-ink"
                        >
                          Volver al original
                        </button>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      ))}

      {/* Barra de guardado: queda a la vista al hacer scroll por la lista larga. */}
      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-black/[0.04] bg-white/95 p-4 shadow-[0_1px_2px_rgba(23,23,23,0.04),0_12px_32px_-16px_rgba(23,23,23,0.18)] backdrop-blur">
        <BotonPrimario type="submit" disabled={pendiente || !editable}>
          {pendiente ? "Guardando…" : "Guardar títulos"}
        </BotonPrimario>
        <BotonSecundario
          type="button"
          disabled={!editable}
          onClick={() =>
            setValores(
              Object.fromEntries(
                grupos.flatMap((g) => g.campos.map((c) => [c.clave, c.porDefecto])),
              ),
            )
          }
        >
          Restaurar todos
        </BotonSecundario>

        {estado?.ok && (
          <p className="flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
            <IconCheck className="size-4" />
            Títulos guardados. Ya se ven en el sitio.
          </p>
        )}
        {estado?.error && (
          <p className="text-sm font-semibold text-red-600">{estado.error}</p>
        )}
      </div>
    </form>
  );
}
