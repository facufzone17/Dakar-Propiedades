-- ============================================================================
-- Dakar Propiedades — el tipo de propiedad pasa a ser texto libre
-- Pegar y ejecutar en Supabase → SQL Editor, después de 0001_init.sql.
-- ============================================================================
--
-- 0001 fijaba `tipo` a una lista cerrada
-- (Departamento / PH / Local / Galpón / Quinta). El panel ahora deja que el
-- dueño cargue un tipo que no esté en esa lista (por ej. "Casa"), así que se
-- reemplaza el CHECK de valores por uno que solo cuida el largo.

alter table public.propiedades
  drop constraint if exists propiedades_tipo_check;

alter table public.propiedades
  add constraint propiedades_tipo_check
  check (char_length(btrim(tipo)) between 1 and 40);
