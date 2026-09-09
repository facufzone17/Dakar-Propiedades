"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cerrarSesion } from "@/app/admin/actions";
import { MARCA } from "@/config/site";
import { IconPropiedades, IconResumen, IconSalir, IconTextos } from "./icons";

const LINKS = [
  { href: "/admin", label: "Resumen", Icon: IconResumen, exacto: true },
  { href: "/admin/propiedades", label: "Propiedades", Icon: IconPropiedades, exacto: false },
  { href: "/admin/textos", label: "Títulos del sitio", Icon: IconTextos, exacto: false },
];

export function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-60 shrink-0 flex-col rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_1px_2px_rgba(23,23,23,0.04),0_12px_32px_-16px_rgba(23,23,23,0.18)] lg:flex">
      <Link href="/admin" className="flex items-baseline gap-1.5 px-2 py-1.5">
        <span className="text-lg font-semibold tracking-tight">{MARCA.principal}</span>
        <span className="text-sm text-muted">Panel</span>
      </Link>

      <nav className="mt-6 flex flex-1 flex-col gap-1">
        {LINKS.map(({ href, label, Icon, exacto }) => {
          const activo = exacto ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium transition-colors ${
                activo ? "bg-ink text-white" : "text-muted hover:bg-bg-subtle hover:text-ink"
              }`}
            >
              <Icon className="size-[18px]" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-line pt-4">
        <p className="truncate px-3 text-xs text-muted" title={email}>
          {email}
        </p>
        <form action={cerrarSesion}>
          <button
            type="submit"
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-muted transition-colors hover:bg-bg-subtle hover:text-ink"
          >
            <IconSalir className="size-[18px]" />
            Salir
          </button>
        </form>
      </div>
    </aside>
  );
}
