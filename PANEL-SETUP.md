# Panel de administración — puesta en marcha

El panel vive en `/admin`. Acceso discreto desde el sitio: link **"Acceso panel"** en el
pie de página.

Mientras Supabase no esté configurado, el sitio público sigue andando con el catálogo
estático (`src/data/propiedades.ts`) y el panel muestra un aviso.

## 1. Crear el proyecto en Supabase

**New project** → nombre a elección, región `South America (São Paulo)`.

## 2. Crear el schema

Supabase → **SQL Editor** → New query → pegar y correr, en orden:

1. `supabase/migrations/0001_init.sql` (tablas, RLS, bucket de Storage)
2. `supabase/migrations/0002_textos_sitio.sql` (títulos editables del sitio)
3. `supabase/migrations/0003_tipo_propiedad_libre.sql` (tipo de propiedad de texto libre)
4. `supabase/seed.sql` (opcional: las 18 propiedades de demo)

## 3. Acceso al panel

El panel **no usa Supabase Auth**. Entra con usuario y contraseña propios, validados
contra un cookie firmado (HMAC): anda aunque la base esté caída o mal configurada.

Credenciales por defecto (demo): `admin` / `demo1234` (ver `src/lib/panel-auth.ts`).
Se cambian sin tocar código con las variables `PANEL_USUARIO` y `PANEL_PASSWORD` en
Vercel. Para cada cliente real: cargar `PANEL_USUARIO`, `PANEL_PASSWORD` y `PANEL_SECRET`
(cadena larga al azar) como variables de entorno.

## 4. Variables de entorno

Supabase → **Project Settings → API**. Copiar a `.env.local` (local) y a
**Vercel → Project → Settings → Environment Variables** (producción):

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `PANEL_USUARIO` | usuario del panel (por defecto `admin`) |
| `PANEL_PASSWORD` | contraseña del panel (por defecto `demo1234`) |
| `PANEL_SECRET` | cadena larga al azar para firmar el cookie de sesión |

`SUPABASE_SERVICE_ROLE_KEY` **sí** hace falta en runtime: como el panel ya no inicia
sesión en Supabase, la RLS lo trata como anónimo y sin ese rol solo podría leer las
propiedades activas. El panel avisa con un cartel amarillo cuando falta. Es una clave de
servidor: nunca lleva el prefijo `NEXT_PUBLIC_`.

## 5. Redeploy en Vercel

Con las variables cargadas, **Redeploy**. El sitio pasa a leer el catálogo desde Supabase
y el panel queda operativo.

## Qué puede hacer el panel

- **Resumen**: propiedades activas, consultas de los últimos 30 días (con variación),
  cerradas en 90 días, días promedio en cartera, ranking de más consultadas y lista de
  avisos sin consultas.
- **Propiedades**: alta / edición / baja con todas las specs (precio, moneda, expensas,
  ubicación, ambientes, superficies, amenities, descripción, fotos). Fotos nuevas se
  suben a Supabase Storage. Estados: **Activa** (en el sitio), **Pausada** (fuera del
  sitio), **Cerrada** (vendida/alquilada, cuenta para métricas).
- **Títulos del sitio**: los títulos de cada página se editan desde `/admin/textos`.
  Solo títulos: el resto del copy y el diseño no se tocan. Un campo vacío vuelve al
  título original.
- Las consultas se registran cuando un visitante toca "Consultar por WhatsApp", "Llamar"
  o envía el formulario de tasación.

## Cargar el catálogo de un cliente

Si el cliente ya tiene sus propiedades en algún lado, se puede regenerar `supabase/seed.sql`
a partir de un `src/data/propiedades.ts` actualizado y correrlo en el SQL Editor. Es
idempotente (`on conflict do nothing`): no duplica, pero tampoco actualiza filas que ya
existen — para editar una propiedad ya cargada, se hace desde el panel.

## Handoff (entregar el sitio al cliente)

Plan Free de Supabase = 2 proyectos por organización. Al entregar:
**Supabase → Project Settings → General → Transfer project** a la organización del cliente
(se llevan datos y Storage). Ídem en Vercel. Todo el schema está en `supabase/` para
recrearlo en otra cuenta si hiciera falta.
