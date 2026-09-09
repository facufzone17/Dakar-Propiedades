# Inmobiliaria — template

Sitio institucional + catálogo de propiedades para inmobiliarias de barrio (pensado
para la zona oeste de CABA y GBA oeste). Es un **template genérico**: el contenido de
demo — nombre, datos de contacto y las propiedades — son placeholders y se reemplazan
por los del cliente sin tocar el diseño.

> **Estado:** demo para mostrar/pitchear. Todo el branding sale de un solo archivo
> (`src/config/site.ts`) o de variables de entorno.

## Correr el proyecto

```bash
npm install
npm run dev
```

Queda en http://localhost:3000. Para el build de producción: `npm run build && npm start`.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** — design tokens en [`src/app/globals.css`](src/app/globals.css)
- **Urbanist** vía `next/font` (self-hosted, sin request a Google en runtime)
- **Supabase** (opcional) para el panel de administración y el catálogo dinámico.
  Sin Supabase, el sitio funciona con el catálogo estático de
  [`src/data/propiedades.ts`](src/data/propiedades.ts).

## Estructura

```
src/
├── app/
│   ├── (sitio)/                 Sitio público
│   │   ├── page.tsx             Home: hero + franja + destacadas + por qué + CTA
│   │   ├── propiedades/         Catálogo con filtros + ficha individual
│   │   ├── tasacion/            Formulario (conversión principal)
│   │   └── nosotros/ · contacto/
│   ├── admin/                   Panel: resumen, propiedades, títulos del sitio
│   └── globals.css              Design tokens
├── components/                  Componentes de UI
├── config/site.ts              Branding + datos de contacto + WhatsApp  ← rebranding acá
└── data/propiedades.ts          Catálogo de demo (18 propiedades ficticias)
```

## Rebrandear para un cliente

Editar [`src/config/site.ts`](src/config/site.ts) (o cargar las variables
`NEXT_PUBLIC_SITIO_*` y `NEXT_PUBLIC_WHATSAPP_NUMERO` en Vercel). Cambiar el ícono en
[`src/app/icon.svg`](src/app/icon.svg). Cargar las propiedades reales por el panel
(ver [PANEL-SETUP.md](PANEL-SETUP.md)) o editar `src/data/propiedades.ts`.

## Los datos de demo

18 propiedades **ficticias** con direcciones inventadas y descripciones genéricas.
`Propiedad` (en `src/data/propiedades.ts`) tiene la misma forma que la tabla de
Supabase: migrar es cambiar de dónde sale `PROPIEDADES`, nada más.

Las fotos de demo son de stock libre (Unsplash / Pexels, uso comercial sin atribución).
Cada cliente las reemplaza por las propias.

## Cómo funciona el contacto

No hay backend. El formulario de tasación y los botones de WhatsApp arman un mensaje
con los datos cargados y abren el chat. Funciona sin API keys.

## Chequeos

Lighthouse mobile sobre el build de producción: accesibilidad, buenas prácticas y SEO en
100 en las seis páginas; performance 93–99; CLS 0.
