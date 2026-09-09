import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { SITIO } from "@/config/site";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITIO.nombre} — ${SITIO.zonaFrase}`,
  description: `Venta, alquiler, tasación y administración de propiedades. ${SITIO.direccion}, ${SITIO.localidad}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`no-js ${urbanist.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Flag de JS: el scroll-reveal solo oculta contenido cuando hay JS para
            volverlo a mostrar. Sin esto, sin-JS = secciones invisibles. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
