-- Security Hardening Migration (2026-10-30)
-- 1. Explicitly revoke EXECUTE from anon on administrative RPC endpoints
--    (Eliminates unauthorized public exposure of administrative definer routines)
REVOKE EXECUTE ON FUNCTION public.admin_save_question_bank_distribution(integer, text[], jsonb) FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_question_bank_distribution_snapshot() FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_queue_low_resolution_image(text, text, integer, integer, bigint, text) FROM anon;
REVOKE EXECUTE ON FUNCTION public.beta_feedback_snapshot() FROM anon;

-- 2. Ensure explicit search_path is locked to empty string on all security-critical definer functions
ALTER FUNCTION public.admin_save_question_bank_distribution(integer, text[], jsonb) SET search_path TO '';
ALTER FUNCTION public.admin_question_bank_distribution_snapshot() SET search_path TO '';
ALTER FUNCTION public.admin_queue_low_resolution_image(text, text, integer, integer, bigint, text) SET search_path TO '';
ALTER FUNCTION public.beta_feedback_snapshot() SET search_path TO '';
ALTER FUNCTION public.queue_low_resolution_image(text, text, integer, integer, bigint, text) SET search_path TO '';
ALTER FUNCTION public.user_question_bank_list_catalog() SET search_path TO '';
ALTER FUNCTION public.user_question_bank_list_catalog_v2() SET search_path TO '';
