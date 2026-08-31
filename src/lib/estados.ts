import type { EstadoPropiedad } from "@/data/propiedades";

export const ETIQUETA_ESTADO: Record<EstadoPropiedad, string> = {
  activa: "Activa",
  pausada: "Pausada",
  vendida: "Cerrada",
};

export const TONO_ESTADO: Record<EstadoPropiedad, "verde" | "ambar" | "gris"> = {
  activa: "verde",
  pausada: "ambar",
  vendida: "gris",
};
