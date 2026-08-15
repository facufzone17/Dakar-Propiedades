"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITIO, whatsappUrl } from "@/config/site";
import { ArrowRightIcon, CloseIcon, MenuIcon, WhatsappIcon } from "./icons";

const MENSAJE_WA = `Hola ${SITIO.nombre}, quería hacerles una consulta.`;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Con el menú abierto: bloquear el scroll del fondo y cerrar con Escape
  useEffect(() => {
    if (!menuAbierto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAbierto(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuAbierto]);

  return (
    <header
      className={`on-dark fixed inset-x-0 top-0 z-50 text-white transition-colors duration-300 ${
        scrolled || menuAbierto ? "bg-ink" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
        <Link
          href="/"
          className="-my-2 flex min-h-[44px] items-center gap-1.5 rounded-brand py-2 text-[1.3125rem] leading-none"
        >
          <span className="font-semibold tracking-tight">Dakar</span>
          <span className="font-normal text-white/70">Propiedades</span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-brand text-lg font-medium text-white/85 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={whatsappUrl(MENSAJE_WA)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2.5 rounded-brand bg-white px-6 py-3.5 text-lg font-semibold text-ink transition-opacity hover:opacity-85 lg:inline-flex"
        >
          <WhatsappIcon className="size-5" />
          WhatsApp
          <ArrowRightIcon className="size-[18px]" />
        </a>

        <button
          type="button"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-expanded={menuAbierto}
          aria-controls="menu-mobile"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          className="-mr-3 grid size-12 place-items-center rounded-brand lg:hidden"
        >
          {menuAbierto ? <CloseIcon className="size-7" /> : <MenuIcon className="size-7" />}
        </button>
      </div>

      {menuAbierto && (
        <div id="menu-mobile" className="bg-ink lg:hidden">
          <nav aria-label="Principal" className="px-5 pb-8">
            <ul className="flex flex-col border-t border-white/15">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="border-b border-white/15">
                  <Link
                    href={link.href}
                    onClick={() => setMenuAbierto(false)}
                    className="flex min-h-[60px] items-center text-xl font-medium text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl(MENSAJE_WA)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuAbierto(false)}
              className="mt-6 flex min-h-[56px] items-center justify-center gap-2.5 rounded-brand bg-white px-6 text-lg font-semibold text-ink"
            >
              <WhatsappIcon className="size-5" />
              Escribinos por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
