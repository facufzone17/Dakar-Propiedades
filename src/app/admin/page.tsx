import Link from "next/link";
import { Badge, Card } from "@/components/admin/ui";
import { IconFlechaArribaDerecha } from "@/components/admin/icons";
import { supabaseConfigurado } from "@/lib/supabase/config";
import { obtenerMetricas } from "@/lib/metricas";

export const dynamic = "force-dynamic";

const nf = new Intl.NumberFormat("es-AR");

export default async function DashboardPage() {
  if (!supabaseConfigurado) return <AvisoSinSupabase />;

  const m = await obtenerMetricas();

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Resumen</h1>
        <p className="mt-1 text-muted">Cómo viene la cartera y las consultas de esta semana.</p>
      </header>

      {!m.hayDatos && (
        <Card className="mb-6">
          <p className="text-sm text-muted">
            Todavía no hay propiedades cargadas. Andá a{" "}
            <Link href="/admin/propiedades/nueva" className="font-semibold text-ink underline">
              cargar la primera
            </Link>
            .
          </p>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Propiedades activas"
          valor={nf.format(m.activas.total)}
          pie={`${m.activas.venta} en venta · ${m.activas.alquiler} en alquiler`}
        />
        <Stat
          label="Consultas (30 días)"
          valor={nf.format(m.consultas30.total)}
          delta={m.consultas30.variacionPct}
          pie="WhatsApp + llamadas"
        />
        <Stat
          label="Cerradas (90 días)"
          valor={nf.format(m.cerradas90.total)}
          pie={`${m.cerradas90.venta} vendidas · ${m.cerradas90.alquiler} alquiladas`}
        />
        <Stat
          label="Días promedio en cartera"
          valor={m.diasPromedioEnCartera === null ? "—" : nf.format(m.diasPromedioEnCartera)}
          pie="Antigüedad media de las activas"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="text-base font-semibold tracking-tight">Más consultadas (30 días)</h2>
          <p className="mt-1 text-sm text-muted">Qué avisos están traccionando interés.</p>
          <BarList
            items={m.topConsultadas.map((t) => ({
              label: t.titulo,
              href: `/admin/propiedades/${t.id}`,
              valor: t.consultas,
            }))}
            vacio="Sin consultas registradas todavía."
            sufijo="consultas"
          />
        </Card>

        <Card>
          <h2 className="text-base font-semibold tracking-tight">Sin consultas en 30 días</h2>
          <p className="mt-1 text-sm text-muted">Candidatas a revisar precio, fotos o texto.</p>
          <ul className="mt-4 divide-y divide-line">
            {m.sinConsultas.length === 0 && (
              <li className="py-2 text-sm text-muted">Todas las activas tuvieron consultas.</li>
            )}
            {m.sinConsultas.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 py-2.5">
                <Link href={`/admin/propiedades/${s.id}`} className="truncate text-sm hover:underline">
                  {s.titulo}
                </Link>
                <span className="shrink-0 text-xs text-muted">{s.dias} días</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-base font-semibold tracking-tight">Cartera activa por zona</h2>
          <BarList
            items={m.porZona.map((z) => ({ label: z.label, valor: z.valor }))}
            vacio="Sin propiedades activas."
            sufijo="propiedades"
          />
        </Card>

        <Card>
          <h2 className="text-base font-semibold tracking-tight">Precio promedio (activas)</h2>
          <ul className="mt-4 space-y-3">
            {m.precioPromedio.length === 0 && (
              <li className="text-sm text-muted">Sin datos.</li>
            )}
            {m.precioPromedio.map((p) => (
              <li key={`${p.operacion}-${p.moneda}`} className="flex items-baseline justify-between">
                <span className="text-sm capitalize text-muted">{p.operacion}</span>
                <span className="text-lg font-semibold tracking-tight">
                  {p.moneda === "USD" ? "USD " : "$ "}
                  {nf.format(p.valor)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Stat({
  label,
  valor,
  pie,
  delta,
}: {
  label: string;
  valor: string;
  pie?: string;
  delta?: number | null;
}) {
  return (
    <Card className="p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{valor}</p>
      {delta !== undefined && delta !== null && (
        <p
          className={`mt-1.5 flex items-center gap-1 text-sm font-medium ${
            delta >= 0 ? "text-emerald-600" : "text-red-600"
          }`}
        >
          <IconFlechaArribaDerecha
            className={`size-3.5 ${delta >= 0 ? "" : "rotate-90"}`}
          />
          {delta >= 0 ? "+" : ""}
          {delta}% vs. 30 días previos
        </p>
      )}
      {pie && <p className="mt-1.5 text-xs text-muted">{pie}</p>}
    </Card>
  );
}

function BarList({
  items,
  vacio,
  sufijo,
}: {
  items: { label: string; valor: number; href?: string }[];
  vacio: string;
  sufijo: string;
}) {
  if (items.length === 0) return <p className="mt-4 text-sm text-muted">{vacio}</p>;
  const max = Math.max(...items.map((i) => i.valor), 1);

  return (
    <ul className="mt-4 space-y-3">
      {items.map((i, idx) => (
        <li key={i.label + idx}>
          <div className="flex items-center justify-between gap-3 text-sm">
            {i.href ? (
              <Link href={i.href} className="truncate hover:underline">
                {i.label}
              </Link>
            ) : (
              <span className="truncate">{i.label}</span>
            )}
            <span className="shrink-0 text-xs text-muted">
              {i.valor} {sufijo}
            </span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-black/[0.05]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-300 to-amber-400"
              style={{ width: `${(i.valor / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

function AvisoSinSupabase() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Resumen</h1>
      <Card className="mt-6">
        <Badge tono="ambar">Pendiente</Badge>
        <p className="mt-3 text-sm text-muted">
          Conectá Supabase (variables de entorno) para ver las métricas y gestionar el catálogo.
        </p>
      </Card>
    </div>
  );
}
