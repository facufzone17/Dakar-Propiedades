"use client";

import { useTransition } from "react";
import { eliminarPropiedad } from "@/app/admin/actions";
import { IconBasura } from "./icons";
import { BotonSecundario } from "./ui";

export function EliminarPropiedadBoton({ id, direccion }: { id: string; direccion: string }) {
  const [pendiente, start] = useTransition();
  return (
    <BotonSecundario
      className="text-red-600 hover:bg-red-50"
      disabled={pendiente}
      onClick={() => {
        if (confirm(`¿Eliminar definitivamente ${direccion}? No se puede deshacer.`)) {
          start(() => eliminarPropiedad(id));
        }
      }}
    >
      <IconBasura className="size-3.5" />
      {pendiente ? "Eliminando…" : "Eliminar"}
    </BotonSecundario>
  );
}
