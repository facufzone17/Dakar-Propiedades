# Dakar — Build Brief

Proyecto: Dakar · Tipo de sitio: Sitio institucional (inmobiliaria)
Borrador generado a partir de investigación real (ver [investigacion-dakar.md](investigacion-dakar.md)). Lo marcado con ⚠️ todavía lo tenés que confirmar/definir vos.

---

## 0. Volcado libre

- Dakar Propiedades = "Dakar Inmobiliaria" (Facebook) = "Dakar" (Google Maps). Av. Francisco Beiró 4227, Villa Devoto, CABA. Tel 011 4504-3435. Horario 10-13 y 16-19.
- Hoy: sin sitio propio, Google Business sin reclamar, Facebook parado desde 19/08/2020 (104 seguidores), sin Instagram activo. 20 avisos activos en Argenprop.
- Servicios reales (no solo intermediación): Venta, Alquiler, **Tasación** y **Administración de propiedades**.
- El link de Zonaprop que se había juntado al principio (`colacchio-co.-inmobiliaria`) es de **otra** agencia de Devoto que ya tiene sitio propio (colacchio.ar) — no confundir como referencia.
- En Facebook figura un dominio `dakarinmobiliaria.com.ar` que hoy no resuelve — capaz vale la pena chequear si sigue siendo de ellos o quedó libre, antes de salir a comprar uno nuevo.
- Reseña positiva real (Google, 5★, Camila Gelos): *"Vendió mi casa rápido, a buen precio, nunca tuve un problema (...) Para mi es el mejor de la zona."*
- Reseña negativa real (Google, 1★, Rubi Lugo): *"Mal trato con el público (...) el dueño es super grosero. Llamé un par de veces y siempre me colgaba el teléfono."*
- Competencia directa en la misma cuadra (Google Maps "también se buscó"): AKPROP (5.0★/31), Century 21 D'Adam Suc. Devoto (4.7★/39) — Dakar hoy 3.9★/9. La vara de reputación online del barrio ya está puesta por otros.
- Vínculo del usuario con el negocio: **todavía no habló con Dakar** — este brief es para construir algo mostrable primero, no un encargo confirmado. Implica: no asumir acceso a fotos profesionales, logo real ni textos oficiales; usar lo que es público (fotos de portal, datos de contacto públicos) y dejar textos "de marca" fáciles de reemplazar después.

---

## 1. Objetivo y posicionamiento

**Qué es:** sitio institucional + catálogo de propiedades para una inmobiliaria de barrio real que hoy no existe online.

**Para quién** (dos públicos, en este orden):
1. Propietarios de Villa Devoto y barrios cercanos que quieren vender/alquilar/tasar — son el público más valioso porque ahí es donde Dakar gana algo que Zonaprop/Argenprop no le dan (contacto directo, sin pagar por lead).
2. Compradores/inquilinos que ya llegaron a Dakar por otro canal (boca en boca, cartel en Beiró, un aviso de portal) y quieren ver el resto de la cartera sin tener que llamar primero.

**Qué tiene que LOGRAR (acción primaria):** pedido de tasación (form o WhatsApp) como conversión principal; consulta por una propiedad puntual (WhatsApp) como conversión secundaria.

**Métrica de éxito v1:** clics a WhatsApp + envíos del formulario de tasación. No perseguir tráfico orgánico/SEO genérico — con 20 propiedades no le va a ganar posicionamiento a los portales en búsquedas tipo "depto alquiler Belgrano", y no hace falta: el tráfico va a venir de gente que ya busca "Dakar" puntualmente o llega por el boca en boca.

**Contexto de uso:** mobile-first, sin discusión. WhatsApp visible/fijo en todo momento.

**Posicionamiento** (esto sale de reseñas reales, no es una apuesta estética — ver investigación):
Dakar no es una marca boutique ni premium. Es una inmobiliaria de barrio, con trayectoria, que **cierra operaciones rápido y a buen precio** — así la describen sus propios clientes conformes. Su debilidad documentada es la atención telefónica. Consecuencia directa para el sitio: **no prometer una calidez que el negocio no sostiene al teléfono**. Mejor construir la propuesta sobre trayectoria y resultados concretos (rapidez, buen precio, conocimiento real de la zona) y ofrecer WhatsApp/formulario como vía principal de contacto, para sacarle presión al teléfono y evitar que el punto débil real quede expuesto en el primer contacto.

⚠️ A confirmar: si además de tasación/consulta querés sumar un tercer objetivo (ej. captar gente para administración de propiedades en alquiler, que hoy no se menciona en ningún lado y es un servicio real que ofrecen).

---

## 2. Requisitos de la auditoría

- **Competencia de barrio con sitio propio:** colacchio.ar (mismo modelo de negocio, misma cuadra — es la comparación más justa).
- **Vara de reputación a igualar/superar en percepción:** Century 21 D'Adam (Suc. Devoto) y AKPROP — mejor rankeados que Dakar en Google en las mismas cuadras. Si tienen sitio propio, vale la pena mirar qué comunican.
- **Patrones de UX que el usuario ya conoce y no hay que reinventar:** Argenprop y Zonaprop — filtros de búsqueda, ficha de propiedad, botón de WhatsApp por aviso.
- **Chequeos objetivos antes de dar por terminado:** Lighthouse mobile (performance + accesibilidad básica), que ningún texto/imagen quede en placeholder.

⚠️ A confirmar: si hay algún otro competidor puntual que quieras que sume a la auditoría.

---

## 3. Dirección de diseño

**Referencia elegida:** [Realtab](https://realtab.framer.website/) (template de Framer, por RedDevs — [ficha en el Marketplace](https://www.framer.com/community/marketplace/templates/realtab/)). Reemplaza a Villarobles como referencia principal porque además de la calidad fotográfica, tiene el patrón de "banner + selector de comprador/vendedor" que pediste.

Lo que sigue está sacado directo del sitio publicado (inspeccionado en vivo, no es una suposición sobre cómo se ve):

- **Tipografía — una sola familia para todo: Urbanist** (geométrica, moderna, sans-serif). H1 de hero gigante (120px/600), H2 de sección en 48px/600, labels y botones en 18-20px/600. El texto de cuerpo va en gris medio (#666666) en vez de negro puro, para que no compita con los títulos.
- **Paleta — monocromática a propósito, sin color de marca:** blanco/gris clarísimo de base (#FFFFFF, #F8F8F8), gris claro para tarjetas y secciones alternadas (#ECECEC, #D9D9D9), casi-negro (#171717) para nav, botones y bloques oscuros alternados. Cero azul/verde/dorado corporativo — el color de la página lo ponen las fotos, no la interfaz. Encaja perfecto con el posicionamiento de la sección 1: una interfaz sobria y "de resultados", sin fingir una calidez que Dakar no sostiene por teléfono.
- **Botones con esquina suavizada, no pill ni cuadrada:** 8px de radio.
- **Secciones alternan fondo claro/oscuro** (blanco → casi-negro → blanco) para separar bloques sin líneas ni color.
- **El banner/selector que pediste:** widget en el hero con 3 tabs (Comprar / Alquilar / Vender) + selector de tipo de propiedad (Residencial / Comercial / Industrial) + botón oscuro "Submit". Adaptación necesaria para Dakar: en Realtab el tab "Vender" filtra el mismo catálogo; para Dakar, "Vender" **no** debería mostrar avisos — tiene que llevar directo al formulario de tasación (la conversión principal de la sección 1), separado del buscador de propiedades disponibles.

**Qué NO trasladar** (el template está pensado para una inmobiliaria mucho más grande de lo que es Dakar hoy — hay que bajarlo a escala real, no a escala de marketing):
- Equipo de 4 agentes con foto y cargo (Associate broker, Marketing, Manager, Broker) — Dakar no muestra agentes individuales hoy. Sin fotos/nombres reales, mejor no inventar un equipo que no existe.
- "4.2/5 en Trustpilot (5108 reseñas)" — Dakar tiene 9-11 reseñas reales en Google. Usar la reseña real de Camila Gelos en vez de una cifra inflada que no se sostiene.
- Sección de blog — sin caso de negocio real a esta escala (ver sección 2).
- "We develop quality real estate projects" (desarrollos propios) — Dakar es intermediario, no desarrollador. No aplica.

⚠️ Único punto abierto: si querés mantener el monocromo 100% puro o dejar un acento de color chico (ej. solo en el estado activo de un tab, o en el ícono de WhatsApp). Como Dakar no tiene hoy logo ni color de marca propio, monocromo puro es válido y es lo que yo recomendaría para no inventar una identidad de la nada.

---

## 4. Arquitectura / sitemap

**Hero de Home = el de Realtab**, sin cambios de fondo (ver sección 3 para los valores exactos): tabs Comprar / Alquilar / Vender + selector de tipo de propiedad + Submit, tipografía Urbanist, monocromo. Único ajuste funcional: el tab "Vender" no filtra catálogo, manda directo al formulario de tasación.

**El resto de la arquitectura, decisión propia** — tomé del resto de Realtab solo lo que tiene caso de negocio real a 20 propiedades, y dejé afuera lo que ya habíamos descartado en la sección 3 (equipo de agentes inventado, blog, sección de desarrollos propios):

```
Home
├── Hero (Realtab) con selector Comprar/Alquilar/Vender
├── Franja de confianza — no logos de "empresas que confían" (no aplica a
│   una inmobiliaria de barrio): 2-3 datos reales en su lugar
│   (años en Villa Devoto, cantidad de propiedades, zona que cubren)
├── Propiedades destacadas (4-6 cards)
├── "Por qué Dakar" — versión adaptada del bloque de 3 pasos de Realtab,
│   con el mensaje real (rápido, buen precio, conoce la zona) en vez del
│   genérico "conectá con expertos"
└── CTA final de tasación

Propiedades (catálogo)
├── Filtros: operación (venta/alquiler), tipo, zona, precio, ambientes
└── Grilla de resultados

Ficha de propiedad
├── Galería de fotos
├── Fila de specs (m², ambientes, año, ubicación) — tomo el layout en
│   íconos de la propiedad destacada de Realtab, se ve prolijo y es fácil
│   de tipear con lo que ya sacamos de Argenprop
├── Mapa
└── WhatsApp + formulario de consulta

Tasá tu propiedad
└── Formulario dedicado (no un form perdido al final de la home)

Nosotros
└── Quiénes son, trayectoria, zona que cubren — texto simple, sin página
    de "equipo" con bios inventadas (no hay agentes individuales que mostrar hoy)

Contacto
└── Dirección, mapa, horario, teléfono, WhatsApp, formulario
```

Fuera de v1 (por lo mismo que en la sección 3 — no hay con qué llenarlas de verdad): página de agentes/equipo, blog/novedades, sección de desarrollos propios, carrusel de testimonios con cifras infladas.

---

## 5. Contenido e inventario

**Ya disponible (scrapeado de Argenprop, ver investigación):** 20 propiedades reales con fotos, precios, ubicación y descripción — venta y alquiler, mayormente departamentos, repartidas por CABA (Belgrano, Palermo, Villa del Parque, Villa Urquiza, Flores, Floresta, Balvanera, Microcentro, Paternal, Villa Real, Villa Devoto) más Ramos Mejía y un campo en San Luis.

**Falta / a conseguir:**
- ⚠️ Logo — no existe uno visible hoy en ningún canal. Se puede arrancar con un wordmark tipográfico simple.
- ⚠️ Fotos propias — las que hay son las del portal (calidad variable, algunas con marca de agua). Preguntar si Dakar tiene mejores fotos o si se arranca con las del portal para v1.
- ⚠️ Matrícula CUCICBA del corredor responsable — Colacchio (la competencia de al lado) sí la muestra en cada aviso ("Corredor Responsable... Mat. CUCICBA ####"), da confianza legal. Dakar no la muestra en ningún aviso — confirmar si la tienen para sumarla.
- Testimonio real disponible: la reseña de Camila Gelos (5★, pública en Google) sirve como prueba social citable.

---

## 6. Stack y restricciones

Elegiste **panel simple** para que alguien de Dakar pueda cargar/dar de baja propiedades sin ayuda técnica — eso descarta "carga manual por código" y pide algo con auth + CRUD real, aunque sea chico.

**Propuesta** (este entorno ya tiene conectados Vercel y Supabase, tiene sentido aprovecharlos):
- Frontend: Next.js, desplegado en Vercel
- Datos + panel: Supabase (tabla de propiedades + Supabase Auth para proteger `/admin`) — a esta escala (20-30 registros) no hace falta un CMS headless de terceros, con esto alcanza y sobra
- Contacto: enlaces `wa.me` directos (no hace falta WhatsApp Business API a este volumen)
- Dominio: ⚠️ chequear primero si `dakarinmobiliaria.com.ar` sigue siendo de ellos o está libre, antes de salir a comprar `dakarpropiedades.com.ar` u otra alternativa

**Restricción de fondo:** como todavía no hay acuerdo con Dakar (sección 0), v1 vive en un subdominio/preview de Vercel — no tiene sentido comprar dominio ni reclamar su Google Business Profile hasta que el proyecto esté conversado con ellos.

⚠️ A confirmar: presupuesto pensado para dominio/hosting una vez que avance (son costos bajos pero reales — dominio .com.ar + Supabase/Vercel free tier alcanza para este tamaño).

---

## 7. Plan de construcción

**Fase 1 — MVP mostrable (sin depender de Dakar):**
Home + catálogo con las 20 propiedades reales (cargadas desde lo ya investigado) + ficha de propiedad + formulario de tasación + contacto. Sin login todavía. Objetivo: tener algo concreto para mostrarle al dueño, no una maqueta genérica.

**Fase 2 — si el proyecto avanza con Dakar:**
Panel de administración real (Supabase Auth) probado por alguien de Dakar, dominio propio, WhatsApp real conectado, reclamar y linkear el Google Business Profile.

⚠️ A confirmar: ¿timeline objetivo para tener la Fase 1 lista para mostrar?

---

## 8. Definición de "terminado"

**v1 (para mostrar/pitchear):**
- Funciona bien en mobile y desktop
- Las 20 propiedades reales están cargadas con sus fotos y se ven bien (nada de lorem ipsum ni imágenes placeholder)
- El botón de WhatsApp y el formulario de tasación funcionan de verdad (aunque apunten a un número/mail tuyo hasta que Dakar confirme)
- Lighthouse mobile en verde/aceptable

**v2 (si se formaliza con Dakar):**
- Dominio propio funcionando
- Panel de administración probado por alguien de Dakar sin tu ayuda
- Google Business Profile reclamado y enlazado al sitio
- Datos de contacto y matrícula (si aplica) verificados con ellos, no solo scrapeados de portales
