import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsappFab } from "@/components/whatsapp-fab";
import { SITIO } from "@/config/site";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${SITIO.nombre} — Inmobiliaria en Villa Devoto`,
  description: `Venta, alquiler, tasación y administración de propiedades. ${SITIO.direccion}, ${SITIO.localidad}.`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={urbanist.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <WhatsappFab />
      </body>
    </html>
  );
}
