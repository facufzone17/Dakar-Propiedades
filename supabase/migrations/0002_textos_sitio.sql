-- ============================================================================
-- Dakar Propiedades — textos editables del sitio
-- Pegar y ejecutar en Supabase → SQL Editor, después de 0001_init.sql.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Tabla: textos_sitio
--
-- Guarda SOLO los títulos que el panel deja editar (/admin/textos). El catálogo
-- de claves vive en `src/lib/textos.ts`: acá se guarda el que se cambió y nada
-- más. Una clave sin fila usa el texto por defecto del código, así que la tabla
-- vacía = sitio tal como se diseñó.
-- ----------------------------------------------------------------------------
create table if not exists public.textos_sitio (
  clave      text primary key,
  valor      text not null,
  updated_at timestamptz not null default now()
);

-- Trigger propio: el `set_updated_at()` de 0001 toca `estado`/`cerrada_at`,
-- columnas que esta tabla no tiene.
create or replace function public.set_updated_at_simple()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists textos_sitio_updated_at on public.textos_sitio;
create trigger textos_sitio_updated_at
  before update on public.textos_sitio
  for each row execute function public.set_updated_at_simple();

-- ----------------------------------------------------------------------------
-- RLS: los títulos son públicos (se muestran en el sitio); solo el panel escribe.
-- ----------------------------------------------------------------------------
alter table public.textos_sitio enable row level security;

drop policy if exists "textos_select_publico" on public.textos_sitio;
create policy "textos_select_publico" on public.textos_sitio
  for select using (true);

drop policy if exists "textos_all_autenticado" on public.textos_sitio;
create policy "textos_all_autenticado" on public.textos_sitio
  for all to authenticated using (true) with check (true);
