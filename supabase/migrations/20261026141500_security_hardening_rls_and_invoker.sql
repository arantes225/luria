-- Security Hardening Migration (2026-10-26)
-- 1. Switch list_approved_apostila_images to SECURITY INVOKER to eliminate definer privilege escalation
--    (Resolves Supabase Security Advisor lint 0028_anon_security_definer_function_executable)
ALTER FUNCTION public.list_approved_apostila_images(p_apostila_path text) SECURITY INVOKER;

-- 2. Add authenticated SELECT policies on taxonomy and source metadata catalog tables
--    (Fixes missing RLS policies preventing authenticated question resolution references)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'question_sources' AND policyname = 'Allow authenticated read question_sources'
  ) THEN
    CREATE POLICY "Allow authenticated read question_sources" ON public.question_sources FOR SELECT TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'question_areas' AND policyname = 'Allow authenticated read question_areas'
  ) THEN
    CREATE POLICY "Allow authenticated read question_areas" ON public.question_areas FOR SELECT TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'question_themes' AND policyname = 'Allow authenticated read question_themes'
  ) THEN
    CREATE POLICY "Allow authenticated read question_themes" ON public.question_themes FOR SELECT TO authenticated USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'question_subthemes' AND policyname = 'Allow authenticated read question_subthemes'
  ) THEN
    CREATE POLICY "Allow authenticated read question_subthemes" ON public.question_subthemes FOR SELECT TO authenticated USING (true);
  END IF;
END $$;
