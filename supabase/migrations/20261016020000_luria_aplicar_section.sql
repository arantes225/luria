-- ==============================================================================
-- Migração TRAUBE: Seção Aplicar (Vocação & Radar de Provas)
-- Arquivo: supabase/migrations/20261016020000_luria_aplicar_section.sql
-- ==============================================================================

BEGIN;

-- 1. TABELA DE PERFIS VOCACIONAIS (VOCAÇÃO)
-- Armazena as respostas, especialidades compatíveis e traços de perfil do estudante.
CREATE TABLE IF NOT EXISTS public.luria_vocational_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  top_specialties jsonb NOT NULL DEFAULT '[]'::jsonb,
  profile_traits jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  updated_at timestamptz NOT NULL DEFAULT clock_timestamp(),
  CONSTRAINT uq_luria_vocational_user UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_luria_vocational_user_id 
  ON public.luria_vocational_profiles(user_id);

-- RLS para Perfis Vocacionais (privacidade estrita: somente o próprio usuário acessa seus dados)
ALTER TABLE public.luria_vocational_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "vocational_profiles_owner_select" ON public.luria_vocational_profiles;
CREATE POLICY "vocational_profiles_owner_select"
  ON public.luria_vocational_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "vocational_profiles_owner_insert" ON public.luria_vocational_profiles;
CREATE POLICY "vocational_profiles_owner_insert"
  ON public.luria_vocational_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "vocational_profiles_owner_update" ON public.luria_vocational_profiles;
CREATE POLICY "vocational_profiles_owner_update"
  ON public.luria_vocational_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "vocational_profiles_owner_delete" ON public.luria_vocational_profiles;
CREATE POLICY "vocational_profiles_owner_delete"
  ON public.luria_vocational_profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);


-- 2. TABELA DE INCIDÊNCIA DE TEMAS EM PROVAS (RADAR DE PROVAS)
-- Armazena dados estatísticos agregados e auditáveis da incidência de temas por banca/instituição e ano.
CREATE TABLE IF NOT EXISTS public.luria_exam_topic_incidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  exam_name text NOT NULL,
  year integer NOT NULL CHECK (year >= 2000 AND year <= 2100),
  area text NOT NULL,
  materia text NOT NULL,
  tema text NOT NULL,
  question_count integer NOT NULL CHECK (question_count >= 0),
  total_exam_questions integer NOT NULL CHECK (total_exam_questions > 0),
  incidence_rate numeric(5,2) NOT NULL CHECK (incidence_rate >= 0 AND incidence_rate <= 100),
  validation_status text NOT NULL DEFAULT 'verified' CHECK (validation_status IN ('verified', 'provisional', 'audited')),
  source_reference text,
  created_at timestamptz NOT NULL DEFAULT clock_timestamp()
);

CREATE INDEX IF NOT EXISTS idx_exam_incidence_inst_year 
  ON public.luria_exam_topic_incidence(institution, year);

CREATE INDEX IF NOT EXISTS idx_exam_incidence_area 
  ON public.luria_exam_topic_incidence(area);

CREATE INDEX IF NOT EXISTS idx_exam_incidence_tema 
  ON public.luria_exam_topic_incidence(tema);

-- RLS para Incidência de Provas: Leitura pública e transparente, escrita restrita
ALTER TABLE public.luria_exam_topic_incidence ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "exam_incidence_public_select" ON public.luria_exam_topic_incidence;
CREATE POLICY "exam_incidence_public_select"
  ON public.luria_exam_topic_incidence
  FOR SELECT
  TO public
  USING (true);

-- Gatilho de atualização automática de timestamp para luria_vocational_profiles
CREATE OR REPLACE FUNCTION public.handle_luria_vocational_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = clock_timestamp();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_luria_vocational_updated_at ON public.luria_vocational_profiles;
CREATE TRIGGER trg_luria_vocational_updated_at
  BEFORE UPDATE ON public.luria_vocational_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_luria_vocational_updated_at();

COMMIT;
