"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { subirFoto } from "@/app/admin/actions";
import { IconAbajo, IconArriba, IconBasura, IconMas } from "./icons";

/**
 * Sube al bucket público `propiedades` de Storage a través de una server action:
 * el navegador ya no tiene sesión de Supabase con la que escribir. Devuelve las
 * URLs públicas ordenadas; la primera es la portada.
 */
export function FotoUploader({
  fotos,
  setFotos,
  carpeta,
}: {
  fotos: string[];
  setFotos: (f: string[]) => void;
  carpeta: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    setSubiendo(true);
    setError(null);
    const nuevas: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      fd.set("carpeta", carpeta);
      const { url, error: e } = await subirFoto(fd);
      if (e || !url) {
        setError(e ?? "No se pudo subir la foto.");
        break;
      }
      nuevas.push(url);
    }
    setFotos([...fotos, ...nuevas]);
    setSubiendo(false);
    if (input.current) input.current.value = "";
  }

  const mover = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= fotos.length) return;
    const copia = [...fotos];
    [copia[i], copia[j]] = [copia[j], copia[i]];
    setFotos(copia);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {fotos.map((url, i) => (
          <div key={url} className="group relative aspect-4/3 overflow-hidden rounded-brand bg-bg-subtle">
            <Image src={url} alt="" fill sizes="200px" className="object-cover" />
            {i === 0 && (
              <span className="absolute left-1.5 top-1.5 rounded-full bg-ink px-2 py-0.5 text-[10px] font-semibold text-white">
                Portada
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 bg-gradient-to-t from-black/60 to-transparent p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
              <button
                type="button"
                onClick={() => mover(i, -1)}
                className="rounded bg-white/90 p-1 text-ink disabled:opacity-30"
                disabled={i === 0}
                aria-label="Mover antes"
              >
                <IconArriba className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => mover(i, 1)}
                className="rounded bg-white/90 p-1 text-ink disabled:opacity-30"
                disabled={i === fotos.length - 1}
                aria-label="Mover después"
              >
                <IconAbajo className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setFotos(fotos.filter((f) => f !== url))}
                className="rounded bg-white/90 p-1 text-red-600"
                aria-label="Quitar"
              >
                <IconBasura className="size-3.5" />
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={subiendo}
          className="flex aspect-4/3 flex-col items-center justify-center gap-1 rounded-brand border border-dashed border-line text-sm text-muted transition-colors hover:bg-bg-subtle disabled:opacity-50"
        >
          <IconMas className="size-5" />
          {subiendo ? "Subiendo…" : "Agregar fotos"}
        </button>
      </div>

      <input
        ref={input}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => onFiles(e.target.files)}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
