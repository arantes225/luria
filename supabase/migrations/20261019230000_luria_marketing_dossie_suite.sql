-- ==============================================================================
-- LURIA MARKETING & GROWTH SUITE - DOSSIE BLACK NOVEMBER 2026
-- Tabelas: Campanhas, Conteúdos, Leads, Consentimentos, Eventos e Métricas
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.marketing_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  objective TEXT NOT NULL,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  budget_cents BIGINT DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.marketing_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES public.marketing_campaigns(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  format TEXT NOT NULL, -- Carrossel, Reel, Motion, Stories
  channel TEXT DEFAULT 'Instagram',
  topic TEXT,
  pillar TEXT, -- Questões e resumos, Funcionalidades, Estudo e carreira, Interação, Oferta
  goal TEXT,
  funnel TEXT, -- Topo de Funil, Meio de Funil, Fundo de Funil
  status TEXT DEFAULT 'ideia', -- ideia, pauta, ciencia, design, revisao, aprovado, agendado, publicado
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  drive_url TEXT,
  rationale TEXT,
  action_plan TEXT,
  briefing_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.marketing_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email_normalized TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  study_stage TEXT NOT NULL, -- basico_clinico, internato, formado_residente
  interest TEXT,
  origin TEXT DEFAULT 'organic',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  confirmed_at TIMESTAMPTZ,
  trial_eligible BOOLEAN DEFAULT true,
  trial_activated_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.marketing_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.marketing_leads(id) ON DELETE CASCADE,
  purpose TEXT NOT NULL, -- marketing_email, terms_and_privacy
  granted BOOLEAN NOT NULL DEFAULT true,
  text_version TEXT NOT NULL,
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.marketing_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT NOT NULL, -- landing_view, signup_started, lead_created, first_questions_completed, etc.
  lead_id UUID REFERENCES public.marketing_leads(id) ON DELETE SET NULL,
  user_id UUID,
  metadata_json JSONB DEFAULT '{}'::jsonb,
  event_at TIMESTAMPTZ DEFAULT now()
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.marketing_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_consents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_events ENABLE ROW LEVEL SECURITY;

-- Políticas: Apenas administradores confirmados podem ler e gerenciar
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins podem gerenciar marketing_campaigns" ON public.marketing_campaigns;
  CREATE POLICY "Admins podem gerenciar marketing_campaigns" ON public.marketing_campaigns
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.is_admin = true OR profiles.role = 'admin')));

  DROP POLICY IF EXISTS "Admins podem gerenciar marketing_content" ON public.marketing_content;
  CREATE POLICY "Admins podem gerenciar marketing_content" ON public.marketing_content
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.is_admin = true OR profiles.role = 'admin')));

  DROP POLICY IF EXISTS "Admins podem gerenciar marketing_leads" ON public.marketing_leads;
  CREATE POLICY "Admins podem gerenciar marketing_leads" ON public.marketing_leads
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.is_admin = true OR profiles.role = 'admin')));

  DROP POLICY IF EXISTS "Admins podem gerenciar marketing_consents" ON public.marketing_consents;
  CREATE POLICY "Admins podem gerenciar marketing_consents" ON public.marketing_consents
    FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.is_admin = true OR profiles.role = 'admin')));

  DROP POLICY IF EXISTS "Admins podem gerenciar marketing_events" ON public.marketing_events;
  CREATE POLICY "Admins podem gerenciar marketing_events" ON public.marketing_events
    FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND (profiles.is_admin = true OR profiles.role = 'admin')));
END $$;

-- Função segura para registrar Lead da Landing Page (RPC público sem expor leitura)
CREATE OR REPLACE FUNCTION public.register_marketing_lead(
  p_name TEXT,
  p_email TEXT,
  p_study_stage TEXT,
  p_interest TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL,
  p_utm_content TEXT DEFAULT NULL
) RETURNS JSONB AS $$
DECLARE
  v_normalized_email TEXT;
  v_lead_id UUID;
BEGIN
  v_normalized_email := LOWER(TRIM(p_email));
  IF v_normalized_email = '' OR p_name = '' THEN
    RETURN jsonb_build_object('ok', false, 'message', 'Preencha todos os campos obrigatórios.');
  END IF;

  INSERT INTO public.marketing_leads (
    email_normalized, name, study_stage, interest, origin,
    utm_source, utm_medium, utm_campaign, utm_content, confirmed_at
  ) VALUES (
    v_normalized_email, p_name, p_study_stage, p_interest, 'landing_black_november',
    p_utm_source, p_utm_medium, p_utm_campaign, p_utm_content, now()
  )
  ON CONFLICT (email_normalized) DO UPDATE SET
    name = EXCLUDED.name,
    study_stage = EXCLUDED.study_stage,
    interest = COALESCE(EXCLUDED.interest, marketing_leads.interest)
  RETURNING id INTO v_lead_id;

  INSERT INTO public.marketing_consents (lead_id, purpose, text_version)
  VALUES (v_lead_id, 'terms_and_marketing', 'v1.0_black_november_2026');

  INSERT INTO public.marketing_events (event_name, lead_id, metadata_json)
  VALUES ('lead_created', v_lead_id, jsonb_build_object('source', 'landing_page'));

  RETURN jsonb_build_object('ok', true, 'lead_id', v_lead_id, 'message', 'Inscrição na pré-lista VIP confirmada com sucesso!');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
