-- Fix Search Path Hijacking (CVE-2018-1058) by setting explicit search_path
CREATE OR REPLACE FUNCTION public.register_marketing_lead(
  p_name TEXT,
  p_email TEXT,
  p_study_stage TEXT,
  p_interest TEXT DEFAULT NULL,
  p_utm_source TEXT DEFAULT NULL,
  p_utm_medium TEXT DEFAULT NULL,
  p_utm_campaign TEXT DEFAULT NULL,
  p_utm_content TEXT DEFAULT NULL
) RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
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
$$;
