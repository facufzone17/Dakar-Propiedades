# Dakar Propiedades

Sitio institucional + catálogo para [Dakar Propiedades](https://www.argenprop.com/dakar-propiedades/inmuebles-anunciante-132149),
inmobiliaria de Av. Francisco Beiró 4227, Villa Devoto, CABA.

La ley del proyecto está en [brief-dakar.md](brief-dakar.md); la investigación previa,
en [investigacion-dakar.md](investigacion-dakar.md).

> **Estado:** v1 para mostrar/pitchear. Todavía no hay acuerdo con Dakar, así que los
> textos de marca son reemplazables y el sitio no usa dominio propio.

## Correr el proyecto

```bash
npm install
npm run dev
```

Queda en http://localhost:3000. Para el build de producción: `npm run build && npm start`.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** — los tokens del brief §3 están en [`src/app/globals.css`](src/app/globals.css)
- **Urbanist** vía `next/font` (self-hosted, sin request a Google en runtime)
- Sin base de datos: los datos salen de [`src/data/propiedades.ts`](src/data/propiedades.ts)

## Estructura

```
src/
├── app/
│   ├── page.tsx                 Home: hero + franja + destacadas + por qué + CTA
│   ├── propiedades/page.tsx     Catálogo con filtros
│   ├── propiedades/[id]/        Ficha: galería, specs, descripción, contacto
│   ├── tasacion/                Formulario (conversión principal)
│   ├── nosotros/ · contacto/
│   └── globals.css              Design tokens
├── components/                  Componentes de UI
├── config/site.ts               Datos de contacto + número de WhatsApp
└── data/propiedades.ts          Las 18 propiedades
```

## Los datos

18 propiedades reales tomadas de la página de anunciante de Dakar en Argenprop, con sus
fotos (98, en `public/propiedades/`), precios, metros y descripciones tal cual las
escribieron ellos.

**Son 18 y no 20**: Dakar tiene 20 avisos publicados, pero dos son republicaciones del
mismo inmueble con otro barrio y el mismo precio — se confirmó porque comparten la carpeta
de fotos en el servidor de Argenprop (Cabello 3900 como "Palermo"/"Palermo Chico", y
La Pampa 700 como "Belgrano"/"Belgrano Chico").

Las fotos están descargadas y recomprimidas a 1400px, no linkeadas al CDN de Argenprop,
para que el sitio no dependa de ellos.

`Propiedad` tiene la misma forma que la futura tabla de Supabase: migrar es cambiar de
dónde sale `PROPIEDADES`, nada más.

## Cómo funciona el contacto

No hay backend. El formulario de tasación y todos los botones de WhatsApp arman un mensaje
con los datos cargados y abren el chat. Funciona de verdad, sin API keys.

## Pendiente

- [ ] **Número de WhatsApp real** — hoy hay un placeholder en [`src/config/site.ts`](src/config/site.ts);
      hasta que se cambie, todos los CTA apuntan a un número inventado
- [ ] **Años de trayectoria** en Villa Devoto (para la franja de confianza)
- [ ] **Matrícula CUCICBA**, si la tienen (la competencia de la zona la muestra)
- [ ] Fotos propias, si Dakar tiene mejores que las del portal
- [ ] Revisar el copy de "Por qué Dakar" con ellos — es lectura del posicionamiento, no
      palabras suyas
- [ ] Panel `/admin` con Supabase Auth para que carguen y den de baja propiedades solos

## Chequeos

Lighthouse mobile sobre el build de producción: accesibilidad, buenas prácticas y SEO en
100 en las seis páginas; performance entre 93 y 99; CLS 0.
