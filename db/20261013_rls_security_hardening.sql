-- LURIA / Studyos — RLS and RPC security hardening
-- 2026-10-13
-- Records changes already applied and verified against the production Supabase project.
-- All operations are idempotent. Review on staging before running in a new environment.
--
-- 1) Anonymous users must not invoke administrative image-review procedures.
REVOKE EXECUTE ON FUNCTION public.admin_review_apostila_image(bigint, text) FROM PUBLIC, anon;

-- 2) Remove the temporary anonymous audio-upload exception.
DROP POLICY IF EXISTS "temp_exact_ambientacao_audio_upload" ON storage.objects;

-- 3) Use an empty function search_path for this qualified SECURITY DEFINER RPC.
ALTER FUNCTION public.list_approved_apostila_images(text) SET search_path = '';

-- 4) Apply existing subscription entitlements to the question-bank catalog RPC.
-- Maintains the existing response contract for plans where questions are enabled.
CREATE OR REPLACE FUNCTION public.user_question_bank_list_catalog()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  result jsonb;
  batches text[];
  max_count integer;
  theme_counts jsonb;
begin
  if auth.uid() is null then
    raise exception 'authentication required' using errcode='42501';
  end if;
  if not (select public.has_feature('questions')) then
    raise exception 'question access not permitted for this plan' using errcode='42501';
  end if;
  select c.batch_codes,c.max_questions,c.theme_distribution
    into batches,max_count,theme_counts
  from public.question_list_distribution_config c where c.singleton;
  batches := coalesce(batches,array['L001','L002']::text[]);
  max_count := coalesce(max_count,50);
  theme_counts := coalesce(theme_counts,'{}'::jsonb);

  select jsonb_build_object(
    'max_questions',max_count,
    'batch_codes',to_jsonb(batches),
    'theme_distribution',theme_counts,
    'items',coalesce(jsonb_agg(jsonb_build_object(
      'question_id',b.id,'batch_code',b.batch_code,'question_code',b.question_code,
      'enunciado',b.enunciado,'alternativa_a',b.alternativa_a,'alternativa_b',b.alternativa_b,
      'alternativa_c',b.alternativa_c,'alternativa_d',b.alternativa_d,'gabarito',b.gabarito,
      'explicacao_a',b.explicacao_a,'explicacao_b',b.explicacao_b,'explicacao_c',b.explicacao_c,'explicacao_d',b.explicacao_d,
      'mensagem_chave',b.mensagem_chave,'area',a.name,'area_id',a.id,'materia',t.name,'tema',t.name,
      'theme_id',t.id,'subtema',st.name,
      'source_label',concat_ws(' · ',nullif(s.institution,''),nullif(s.document,''),nullif(s.source_year,'')),
      'source_id',b.source_id
    ) order by b.batch_code,b.sequence_no),'[]'::jsonb)
  ) into result
  from public.question_bank b
  left join public.question_subthemes st on st.id=b.subtheme_id
  left join public.question_themes t on t.id=st.theme_id
  left join public.question_areas a on a.id=t.area_id
  left join public.question_sources s on s.id=b.source_id
  where b.batch_code=any(batches) and b.gabarito is not null and b.enunciado is not null;
  return result;
end;
$function$;


-- 5) Redact administrative/editorial metadata from the public approved-image RPC.
-- The return type stays unchanged to preserve existing reader integrations.
-- This intentionally remains callable by anon for public apostila images.
CREATE OR REPLACE FUNCTION public.list_approved_apostila_images(p_apostila_path text)
RETURNS SETOF public.apostila_image_review_queue
LANGUAGE sql
SECURITY DEFINER
SET search_path TO ''
AS $function$
  SELECT
    q.id,
    q.apostila_path,
    q.apostila_title,
    q.candidate_key,
    q.target_section,
    q.target_selector,
    q.placement,
    (q.proposed_asset - 'editorial_note' - 'replacement_note') AS proposed_asset,
    q.source_url,
    q.source_name,
    q.source_license,
    NULL::text AS source_trust,
    q.review_status,
    NULL::uuid AS reviewed_by,
    q.reviewed_at,
    q.created_at,
    q.updated_at
  FROM public.apostila_image_review_queue AS q
  WHERE q.apostila_path = p_apostila_path
    AND q.review_status = 'approved'
  ORDER BY q.reviewed_at NULLS LAST, q.created_at ASC;
$function$;
