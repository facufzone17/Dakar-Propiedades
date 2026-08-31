# Panel de administración — puesta en marcha

El panel vive en `/admin`. Acceso discreto desde el sitio: link **"Acceso panel"** en el pie de página.

Mientras Supabase no esté configurado, el sitio público sigue andando con el
catálogo estático (`src/data/propiedades.ts`) y el panel muestra un aviso.

## 1. Crear el proyecto en Supabase

En la cuenta `facufernandezzone@gmail.com` → **New project** → nombre `dakar-propiedades`,
región `South America (São Paulo)`.

## 2. Crear el schema

Supabase → **SQL Editor** → New query → pegar y correr, en orden:

1. `supabase/migrations/0001_init.sql` (tablas, RLS, bucket de Storage)
2. `supabase/seed.sql` (las 18 propiedades actuales)

## 3. Crear el usuario del panel

Supabase → **Authentication → Users → Add user**:

- Email: `facufernandezzone@gmail.com`
- Password: `zamponidevoto`
- ✅ **Auto Confirm User**

(En el login del panel se escribe `desarrollos mf` como usuario; el sistema lo
traduce a ese email.)

## 4. Variables de entorno

Supabase → **Project Settings → API**. Copiar a `.env.local` (local) y a
**Vercel → Project → Settings → Environment Variables** (producción):

| Variable | Valor |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://<ref>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon / publishable key |
| `ADMIN_EMAIL` | `facufernandezzone@gmail.com` |

`SUPABASE_SERVICE_ROLE_KEY` no es necesaria en runtime (solo la pediría un seed
por script; acá el seed se hace con SQL).

## 5. Redeploy en Vercel

Con las variables cargadas, **Redeploy**. El sitio pasa a leer el catálogo desde
Supabase y el panel queda operativo.

## Qué puede hacer el panel

- **Resumen**: propiedades activas, consultas de los últimos 30 días (con
  variación), cerradas en 90 días, días promedio en cartera, ranking de más
  consultadas y lista de avisos sin consultas.
- **Propiedades**: alta / edición / baja con todas las specs (precio, moneda,
  expensas, ubicación, ambientes, superficies, amenities, descripción, fotos).
  Fotos nuevas se suben a Supabase Storage. Estados: **Activa** (en el sitio),
  **Pausada** (fuera del sitio), **Cerrada** (vendida/alquilada, cuenta para
  métricas).
- Las consultas se registran cuando un visitante toca "Consultar por WhatsApp",
  "Llamar" o envía el formulario de tasación.

## Handoff (liberar el cupo al vender el sitio)

Plan Free de Supabase = 2 proyectos por organización. Al entregar el sitio:
**Supabase → Project Settings → General → Transfer project** a la organización de
Dakar (se llevan datos y Storage). Ídem en Vercel. Todo el schema está en
`supabase/` para poder recrearlo en otra cuenta si hiciera falta.
