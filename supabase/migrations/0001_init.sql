-- ============================================================================
-- Dakar Propiedades — schema inicial del panel de administración
-- Pegar y ejecutar en Supabase → SQL Editor (o vía CLI `supabase db push`).
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- Tabla: propiedades
-- ----------------------------------------------------------------------------
create table if not exists public.propiedades (
  id            text primary key default (floor(random() * 90000000) + 10000000)::text,
  operacion     text not null check (operacion in ('venta', 'alquiler')),
  tipo          text not null check (tipo in ('Departamento', 'PH', 'Local', 'Galpón', 'Quinta')),
  direccion     text not null,
  barrio        text not null,
  zona          text not null default 'CABA',
  precio        numeric not null check (precio >= 0),
  moneda        text not null default 'USD' check (moneda in ('USD', 'ARS')),
  expensas      numeric,
  ambientes     numeric,
  dormitorios   integer,
  banos         integer,
  cocheras      integer,
  m2_cubiertos  integer,
  m2_terreno    integer,
  antiguedad    integer,
  descripcion   text not null default '',
  amenities     text[] not null default '{}',
  fotos         text[] not null default '{}',
  fuente_url    text,
  destacada     boolean not null default false,
  estado        text not null default 'activa' check (estado in ('activa', 'pausada', 'vendida')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  cerrada_at    timestamptz
);

create index if not exists propiedades_estado_idx on public.propiedades (estado);
create index if not exists propiedades_operacion_idx on public.propiedades (operacion);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  -- marca/limpia cerrada_at al cambiar el estado
  if new.estado = 'vendida' and (old.estado is distinct from 'vendida') then
    new.cerrada_at := now();
  elsif new.estado <> 'vendida' then
    new.cerrada_at := null;
  end if;
  return new;
end;
$$;

drop trigger if exists propiedades_updated_at on public.propiedades;
create trigger propiedades_updated_at
  before update on public.propiedades
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- Tabla: eventos_lead  (consultas / clicks de contacto)
-- ----------------------------------------------------------------------------
create table if not exists public.eventos_lead (
  id           uuid primary key default gen_random_uuid(),
  propiedad_id text references public.propiedades (id) on delete set null,
  tipo         text not null check (tipo in ('whatsapp', 'llamada', 'tasacion')),
  path         text,
  created_at   timestamptz not null default now()
);

create index if not exists eventos_lead_created_idx on public.eventos_lead (created_at);
create index if not exists eventos_lead_propiedad_idx on public.eventos_lead (propiedad_id);

-- ----------------------------------------------------------------------------
-- RLS
-- ----------------------------------------------------------------------------
alter table public.propiedades enable row level security;
alter table public.eventos_lead enable row level security;

-- propiedades: el público solo ve las activas; el usuario logueado, todo.
drop policy if exists "propiedades_select_publico" on public.propiedades;
create policy "propiedades_select_publico" on public.propiedades
  for select using (estado = 'activa');

drop policy if exists "propiedades_all_autenticado" on public.propiedades;
create policy "propiedades_all_autenticado" on public.propiedades
  for all to authenticated using (true) with check (true);

-- eventos_lead: cualquiera puede registrar un evento; solo el panel los lee.
drop policy if exists "eventos_insert_publico" on public.eventos_lead;
create policy "eventos_insert_publico" on public.eventos_lead
  for insert with check (true);

drop policy if exists "eventos_select_autenticado" on public.eventos_lead;
create policy "eventos_select_autenticado" on public.eventos_lead
  for select to authenticated using (true);

-- ----------------------------------------------------------------------------
-- Storage: bucket público para las fotos subidas desde el panel
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('propiedades', 'propiedades', true)
on conflict (id) do nothing;

drop policy if exists "fotos_lectura_publica" on storage.objects;
create policy "fotos_lectura_publica" on storage.objects
  for select using (bucket_id = 'propiedades');

drop policy if exists "fotos_escritura_autenticada" on storage.objects;
create policy "fotos_escritura_autenticada" on storage.objects
  for all to authenticated
  using (bucket_id = 'propiedades') with check (bucket_id = 'propiedades');
