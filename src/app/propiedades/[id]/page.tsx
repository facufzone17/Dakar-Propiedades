import Link from "next/link";
import { notFound } from "next/navigation";
import { Galeria } from "@/components/galeria";
import {
  AreaIcon,
  ArrowRightIcon,
  BathIcon,
  BedIcon,
  CarIcon,
  CheckIcon,
  ClockIcon,
  PinIcon,
  WhatsappIcon,
} from "@/components/icons";
import { PropiedadCard } from "@/components/propiedad-card";
import { SITIO, whatsappUrl } from "@/config/site";
import {
  PROPIEDADES,
  formatearExpensas,
  formatearPrecio,
  propiedadPorId,
  tituloDe,
} from "@/data/propiedades";

export function generateStaticParams() {
  return PROPIEDADES.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = propiedadPorId(id);
  if (!p) return { title: "Propiedad no encontrada — Dakar Propiedades" };
  return {
    title: `${tituloDe(p)} — ${formatearPrecio(p)} — Dakar Propiedades`,
    description: p.descripcion.slice(0, 155),
  };
}

export default async function FichaPropiedad({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const p = propiedadPorId(id);
  if (!p) notFound();

  const titulo = tituloDe(p);
  const expensas = formatearExpensas(p);
  const direccionCompleta = `${p.direccion}, ${p.barrio}, ${p.zona}`;
  const mapaUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionCompleta)}`;

  const specs = [
    p.ambientes ? { Icono: AreaIcon, valor: p.ambientes === 1 ? "Monoambiente" : `${p.ambientes} ambientes`, label: "Ambientes" } : null,
    p.dormitorios ? { Icono: BedIcon, valor: `${p.dormitorios}`, label: p.dormitorios === 1 ? "Dormitorio" : "Dormitorios" } : null,
    p.banos ? { Icono: BathIcon, valor: `${p.banos}`, label: p.banos === 1 ? "Baño" : "Baños" } : null,
    p.cocheras ? { Icono: CarIcon, valor: `${p.cocheras}`, label: p.cocheras === 1 ? "Cochera" : "Cocheras" } : null,
    p.m2Cubiertos ? { Icono: AreaIcon, valor: `${p.m2Cubiertos} m²`, label: "Cubiertos" } : null,
    p.m2Terreno ? { Icono: AreaIcon, valor: `${p.m2Terreno} m²`, label: "Terreno" } : null,
    p.antiguedad ? { Icono: ClockIcon, valor: `${p.antiguedad} ${p.antiguedad === 1 ? "año" : "años"}`, label: "Antigüedad" } : null,
  ].filter(Boolean) as { Icono: typeof BedIcon; valor: string; label: string }[];

  const mensajeWa = `Hola ${SITIO.nombre}, me interesa la propiedad de ${p.direccion}, ${p.barrio} (${formatearPrecio(p)}). ¿Sigue disponible?`;

  const similares = PROPIEDADES.filter(
    (o) => o.id !== p.id && o.operacion === p.operacion && o.tipo === p.tipo,
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-28 lg:px-10 lg:pb-28 lg:pt-36">
      <nav aria-label="Migas de pan" className="text-muted">
        <Link
          href="/propiedades"
          className="-my-2 inline-flex min-h-[44px] items-center py-2 text-lg hover:text-ink"
        >
          ← Volver a propiedades
        </Link>
      </nav>

      <div className="mt-6 flex flex-wrap items-center gap-2.5">
        <span className="rounded-brand bg-ink px-3 py-1.5 text-sm font-semibold text-white">
          {p.operacion === "venta" ? "Venta" : "Alquiler"}
        </span>
        <span className="rounded-brand bg-surface px-3 py-1.5 text-sm font-semibold">
          {p.tipo}
        </span>
      </div>

      <h1 className="mt-4 max-w-[20ch] text-h2 font-semibold tracking-[-0.02em] text-balance">
        {titulo}
      </h1>
      <p className="mt-3 flex items-center gap-2 text-lg text-muted">
        <PinIcon className="size-5 shrink-0" />
        {direccionCompleta}
      </p>

      <div className="mt-9 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
        <div>
          <Galeria fotos={p.fotos} alt={titulo} />

          <h2 className="mt-12 text-2xl font-semibold tracking-tight">Características</h2>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label} className="border-t border-line pt-4">
                <dt className="flex items-center gap-2 text-muted">
                  <s.Icono className="size-[18px]" />
                  <span className="text-[15px]">{s.label}</span>
                </dt>
                <dd className="mt-1 text-xl font-semibold tracking-tight">{s.valor}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-2xl font-semibold tracking-tight">Descripción</h2>
          {/* Texto tal cual lo publicó Dakar */}
          <p className="mt-4 max-w-[68ch] text-lg leading-relaxed text-muted">
            {p.descripcion}
          </p>

          {p.amenities.length > 0 && (
            <>
              <h2 className="mt-12 text-2xl font-semibold tracking-tight">
                Servicios y ambientes
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {p.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2.5 text-lg text-muted">
                    <CheckIcon className="size-5 shrink-0 text-ink" />
                    {a}
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-12 text-2xl font-semibold tracking-tight">Ubicación</h2>
          <p className="mt-4 text-lg text-muted">{direccionCompleta}</p>
          <a
            href={mapaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-[56px] items-center gap-2.5 rounded-brand border border-line px-7 text-lg font-semibold transition-colors hover:bg-bg-subtle"
          >
            <PinIcon className="size-5" />
            Ver en Google Maps
          </a>
        </div>

        {/* Panel de contacto: la acción dominante de esta pantalla */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-brand bg-bg-subtle p-6 lg:p-7">
            <p className="text-3xl font-semibold tracking-[-0.02em]">
              {formatearPrecio(p)}
            </p>
            {expensas && <p className="mt-1 text-lg text-muted">{expensas}</p>}

            <a
              href={whatsappUrl(mensajeWa)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand bg-ink px-6 text-lg font-semibold text-white transition-opacity hover:opacity-90"
            >
              <WhatsappIcon className="size-5" />
              Consultar por WhatsApp
            </a>

            <a
              href={SITIO.telefonoHref}
              className="mt-3 flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand border border-line px-6 text-lg font-semibold transition-colors hover:bg-bg"
            >
              Llamar al {SITIO.telefono}
            </a>

            <p className="mt-6 border-t border-line pt-5 text-[15px] text-muted">
              {SITIO.direccion}, {SITIO.localidad}
              <br />
              Horario de atención: {SITIO.horario}
            </p>
          </div>

          <div className="mt-6 rounded-brand border border-line p-6">
            <p className="text-lg font-semibold">¿Tenés una propiedad para vender?</p>
            <p className="mt-2 text-[15px] text-muted">
              Te decimos cuánto vale y en cuánto se puede vender hoy.
            </p>
            <Link
              href="/tasacion"
              className="mt-5 inline-flex min-h-[48px] items-center gap-2 text-lg font-semibold underline underline-offset-4"
            >
              Pedir tasación
              <ArrowRightIcon className="size-[18px]" />
            </Link>
          </div>
        </aside>
      </div>

      {similares.length > 0 && (
        <section className="mt-20 border-t border-line pt-14">
          <h2 className="text-h2 font-semibold tracking-[-0.02em]">Similares</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similares.map((s) => (
              <PropiedadCard key={s.id} propiedad={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
