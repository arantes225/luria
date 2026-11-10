-- Migration: harden_register_marketing_lead_search_path
-- Prevent Search Path Hijacking (CVE-2018-1058) by setting an explicit search_path on public.register_marketing_lead.

ALTER FUNCTION public.register_marketing_lead(
  text,
  text,
  text,
  text,
  text,
  text,
  text,
  text
) SET search_path = public, pg_temp;
