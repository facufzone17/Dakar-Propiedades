import Image from "next/image";
import Link from "next/link";
import {
  formatearExpensas,
  formatearPrecio,
  tituloDe,
  type Propiedad,
} from "@/data/propiedades";
import { AreaIcon, BathIcon, BedIcon, CarIcon } from "./icons";

export function PropiedadCard({
  propiedad: p,
  prioridad = false,
}: {
  propiedad: Propiedad;
  prioridad?: boolean;
}) {
  const expensas = formatearExpensas(p);
  const specs = [
    p.dormitorios ? { Icono: BedIcon, valor: `${p.dormitorios}`, label: `${p.dormitorios} dormitorios` } : null,
    p.banos ? { Icono: BathIcon, valor: `${p.banos}`, label: `${p.banos} baños` } : null,
    p.cocheras ? { Icono: CarIcon, valor: `${p.cocheras}`, label: `${p.cocheras} cocheras` } : null,
    p.m2Cubiertos ? { Icono: AreaIcon, valor: `${p.m2Cubiertos} m²`, label: `${p.m2Cubiertos} metros cuadrados` } : null,
  ].filter(Boolean) as { Icono: typeof BedIcon; valor: string; label: string }[];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-brand bg-bg-subtle transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_18px_40px_-16px_rgba(23,23,23,0.22)]">
      <div className="relative aspect-4/3 overflow-hidden">
        <Image
          src={p.fotos[0]}
          alt={`${tituloDe(p)} — ${p.direccion}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={prioridad}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <span className="absolute left-3 top-3 rounded-brand bg-bg px-3 py-1.5 text-sm font-semibold">
          {p.tipo}
        </span>
        <span className="absolute right-3 top-3 rounded-brand bg-ink px-3 py-1.5 text-sm font-semibold text-white">
          {p.operacion === "venta" ? "Venta" : "Alquiler"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-sm text-muted">
          {p.direccion} · {p.barrio}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight">
          {/* El link se estira sobre toda la card: el target táctil es la card entera */}
          <Link href={`/propiedades/${p.id}`} className="after:absolute after:inset-0 after:content-['']">
            {tituloDe(p)}
          </Link>
        </h3>

        <div className="mt-auto pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <ul className="flex flex-wrap items-center gap-4 text-muted">
              {specs.map((s) => (
                <li key={s.label} className="flex items-center gap-1.5">
                  <s.Icono className="size-[18px]" />
                  <span className="text-[15px] font-medium">
                    <span className="sr-only">{s.label}</span>
                    <span aria-hidden="true">{s.valor}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-right">
              <span className="block text-lg font-semibold tracking-tight">
                {formatearPrecio(p)}
              </span>
              {expensas && <span className="block text-sm text-muted">{expensas}</span>}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
