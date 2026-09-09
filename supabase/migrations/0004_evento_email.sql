-- ============================================================================
-- Inmobiliaria (template) — sumar 'email' a los tipos de evento de contacto
-- Pegar y ejecutar en Supabase → SQL Editor, después de 0001_init.sql.
-- ============================================================================
--
-- El sitio ahora ofrece contacto por mail además de WhatsApp y llamada. Se
-- amplía el CHECK de `eventos_lead.tipo` para aceptar 'email'.

alter table public.eventos_lead
  drop constraint if exists eventos_lead_tipo_check;

alter table public.eventos_lead
  add constraint eventos_lead_tipo_check
  check (tipo in ('whatsapp', 'llamada', 'email', 'tasacion'));
