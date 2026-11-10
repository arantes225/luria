-- Migration: harden_agencia_instagram_search_path
-- Remove public/pg_temp from search_path on SECURITY DEFINER functions to prevent search path hijacking (CVE-2018-1058).

ALTER FUNCTION public.agencia_instagram_desconectar() SET search_path = '';
ALTER FUNCTION public.agencia_instagram_iniciar() SET search_path = '';
ALTER FUNCTION public.agencia_instagram_status() SET search_path = '';
