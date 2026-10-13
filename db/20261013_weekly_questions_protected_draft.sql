-- LURIA: staging-only backend for authorized weekly question delivery.
-- Do NOT apply until the frontend consumes the RPC and public JSON packs are retired.
-- The weekly group mapping exactly matches assets/js/weekly-content.js (FNV-1a of UUID text).
BEGIN;
CREATE SCHEMA IF NOT EXISTS private;
CREATE TABLE IF NOT EXISTS private.weekly_question_assignments (
  week text NOT NULL,
  group_index integer NOT NULL CHECK (group_index >= 0 AND group_index <= 2),
  position integer NOT NULL CHECK (position BETWEEN 1 AND 50),
  question_code text NOT NULL,
  PRIMARY KEY (week, group_index, position),
  UNIQUE (week, group_index, question_code)
);
REVOKE ALL ON private.weekly_question_assignments FROM PUBLIC, anon, authenticated;
ALTER TABLE private.weekly_question_assignments ENABLE ROW LEVEL SECURITY;

INSERT INTO private.weekly_question_assignments (week,group_index,position,question_code)
VALUES
  ('2026-W40', 0, 1, 'ENAMED-L001-B04-Q736'),
  ('2026-W40', 0, 2, 'ENAMED-L001-B02-Q111'),
  ('2026-W40', 0, 3, 'ENAMED-L001-B01-Q188'),
  ('2026-W40', 0, 4, 'ENAMED-L001-B03-Q174'),
  ('2026-W40', 0, 5, 'ENAMED-L001-B01-Q137'),
  ('2026-W40', 0, 6, 'ENAMED-L001-B03-Q182'),
  ('2026-W40', 0, 7, 'ENAMED-L001-B03-Q140'),
  ('2026-W40', 0, 8, 'ENAMED-L001-B04-Q708'),
  ('2026-W40', 0, 9, 'ENAMED-L001-B03-Q089'),
  ('2026-W40', 0, 10, 'ENAMED-L001-B04-Q606'),
  ('2026-W40', 0, 11, 'ENAMED-L001-B04-Q628'),
  ('2026-W40', 0, 12, 'ENAMED-L001-B03-Q056'),
  ('2026-W40', 0, 13, 'ENAMED-L001-B04-Q603'),
  ('2026-W40', 0, 14, 'ENAMED-L001-B03-Q045'),
  ('2026-W40', 0, 15, 'ENAMED-L001-B03-Q061'),
  ('2026-W40', 0, 16, 'ENAMED-L001-B03-Q185'),
  ('2026-W40', 0, 17, 'ENAMED-L001-B03-Q072'),
  ('2026-W40', 0, 18, 'ENAMED-L001-B04-Q682'),
  ('2026-W40', 0, 19, 'ENAMED-L001-B03-Q094'),
  ('2026-W40', 0, 20, 'ENAMED-L001-B03-Q110'),
  ('2026-W40', 0, 21, 'ENAMED-L001-B04-Q753'),
  ('2026-W40', 0, 22, 'ENAMED-L001-B04-Q724'),
  ('2026-W40', 0, 23, 'ENAMED-L001-B03-Q085'),
  ('2026-W40', 0, 24, 'ENAMED-L001-B03-Q073'),
  ('2026-W40', 0, 25, 'ENAMED-L001-B01-Q057'),
  ('2026-W40', 0, 26, 'ENAMED-L001-B03-Q037'),
  ('2026-W40', 0, 27, 'ENAMED-L001-B01-Q097'),
  ('2026-W40', 0, 28, 'ENAMED-L001-B01-Q049'),
  ('2026-W40', 0, 29, 'ENAMED-L001-B01-Q114'),
  ('2026-W40', 0, 30, 'ENAMED-L001-B04-Q652'),
  ('2026-W40', 0, 31, 'ENAMED-L001-B03-Q046'),
  ('2026-W40', 0, 32, 'ENAMED-L001-B03-Q160'),
  ('2026-W40', 0, 33, 'ENAMED-L001-B03-Q125'),
  ('2026-W40', 0, 34, 'ENAMED-L001-B01-Q044'),
  ('2026-W40', 0, 35, 'ENAMED-L001-B01-Q084'),
  ('2026-W40', 0, 36, 'ENAMED-L001-B04-Q729'),
  ('2026-W40', 0, 37, 'ENAMED-L001-B04-Q755'),
  ('2026-W40', 0, 38, 'ENAMED-L001-B01-Q107'),
  ('2026-W40', 0, 39, 'ENAMED-L001-B01-Q187'),
  ('2026-W40', 0, 40, 'ENAMED-L001-B03-Q074'),
  ('2026-W40', 0, 41, 'ENAMED-L001-B01-Q014'),
  ('2026-W40', 0, 42, 'ENAMED-L001-B01-Q007'),
  ('2026-W40', 0, 43, 'ENAMED-L001-B01-Q003'),
  ('2026-W40', 0, 44, 'ENAMED-L001-B01-Q059'),
  ('2026-W40', 0, 45, 'ENAMED-L001-B03-Q162'),
  ('2026-W40', 0, 46, 'ENAMED-L001-B01-Q093'),
  ('2026-W40', 0, 47, 'ENAMED-L001-B01-Q015'),
  ('2026-W40', 0, 48, 'ENAMED-L001-B03-Q164'),
  ('2026-W40', 0, 49, 'ENAMED-L001-B04-Q800'),
  ('2026-W40', 0, 50, 'ENAMED-L001-B01-Q004'),
  ('2026-W40', 1, 1, 'ENAMED-L001-B03-Q173'),
  ('2026-W40', 1, 2, 'ENAMED-L001-B04-Q694'),
  ('2026-W40', 1, 3, 'ENAMED-L001-B01-Q023'),
  ('2026-W40', 1, 4, 'ENAMED-L001-B03-Q098'),
  ('2026-W40', 1, 5, 'ENAMED-L001-B04-Q728'),
  ('2026-W40', 1, 6, 'ENAMED-L001-B02-Q032'),
  ('2026-W40', 1, 7, 'ENAMED-L001-B03-Q015'),
  ('2026-W40', 1, 8, 'ENAMED-L001-B04-Q670'),
  ('2026-W40', 1, 9, 'ENAMED-L001-B01-Q069'),
  ('2026-W40', 1, 10, 'ENAMED-L001-B03-Q087'),
  ('2026-W40', 1, 11, 'ENAMED-L001-B04-Q631'),
  ('2026-W40', 1, 12, 'ENAMED-L001-B03-Q121'),
  ('2026-W40', 1, 13, 'ENAMED-L001-B03-Q101'),
  ('2026-W40', 1, 14, 'ENAMED-L001-B03-Q077'),
  ('2026-W40', 1, 15, 'ENAMED-L001-B04-Q766'),
  ('2026-W40', 1, 16, 'ENAMED-L001-B01-Q050'),
  ('2026-W40', 1, 17, 'ENAMED-L001-B01-Q178'),
  ('2026-W40', 1, 18, 'ENAMED-L001-B04-Q633'),
  ('2026-W40', 1, 19, 'ENAMED-L001-B04-Q727'),
  ('2026-W40', 1, 20, 'ENAMED-L001-B01-Q016'),
  ('2026-W40', 1, 21, 'ENAMED-L001-B01-Q008'),
  ('2026-W40', 1, 22, 'ENAMED-L001-B04-Q713'),
  ('2026-W40', 1, 23, 'ENAMED-L001-B03-Q084'),
  ('2026-W40', 1, 24, 'ENAMED-L001-B04-Q618'),
  ('2026-W40', 1, 25, 'ENAMED-L001-B03-Q053'),
  ('2026-W40', 1, 26, 'ENAMED-L001-B01-Q052'),
  ('2026-W40', 1, 27, 'ENAMED-L001-B03-Q131'),
  ('2026-W40', 1, 28, 'ENAMED-L001-B03-Q112'),
  ('2026-W40', 1, 29, 'ENAMED-L001-B04-Q604'),
  ('2026-W40', 1, 30, 'ENAMED-L001-B04-Q673'),
  ('2026-W40', 1, 31, 'ENAMED-L001-B03-Q168'),
  ('2026-W40', 1, 32, 'ENAMED-L001-B04-Q778'),
  ('2026-W40', 1, 33, 'ENAMED-L001-B04-Q726'),
  ('2026-W40', 1, 34, 'ENAMED-L001-B03-Q080'),
  ('2026-W40', 1, 35, 'ENAMED-L001-B04-Q624'),
  ('2026-W40', 1, 36, 'ENAMED-L001-B04-Q715'),
  ('2026-W40', 1, 37, 'ENAMED-L001-B04-Q722'),
  ('2026-W40', 1, 38, 'ENAMED-L001-B01-Q147'),
  ('2026-W40', 1, 39, 'ENAMED-L001-B04-Q730'),
  ('2026-W40', 1, 40, 'ENAMED-L001-B03-Q070'),
  ('2026-W40', 1, 41, 'ENAMED-L001-B01-Q146'),
  ('2026-W40', 1, 42, 'ENAMED-L001-B03-Q055'),
  ('2026-W40', 1, 43, 'ENAMED-L001-B01-Q046'),
  ('2026-W40', 1, 44, 'ENAMED-L001-B04-Q745'),
  ('2026-W40', 1, 45, 'ENAMED-L001-B01-Q141'),
  ('2026-W40', 1, 46, 'ENAMED-L001-B03-Q026'),
  ('2026-W40', 1, 47, 'ENAMED-L001-B01-Q106'),
  ('2026-W40', 1, 48, 'ENAMED-L001-B02-Q051'),
  ('2026-W40', 1, 49, 'ENAMED-L001-B04-Q677'),
  ('2026-W40', 1, 50, 'ENAMED-L001-B04-Q719'),
  ('2026-W40', 2, 1, 'ENAMED-L001-B01-Q193'),
  ('2026-W40', 2, 2, 'ENAMED-L001-B01-Q020'),
  ('2026-W40', 2, 3, 'ENAMED-L001-B04-Q781'),
  ('2026-W40', 2, 4, 'ENAMED-L001-B04-Q660'),
  ('2026-W40', 2, 5, 'ENAMED-L001-B01-Q058'),
  ('2026-W40', 2, 6, 'ENAMED-L001-B01-Q045'),
  ('2026-W40', 2, 7, 'ENAMED-L001-B04-Q754'),
  ('2026-W40', 2, 8, 'ENAMED-L001-B03-Q114'),
  ('2026-W40', 2, 9, 'ENAMED-L001-B03-Q021'),
  ('2026-W40', 2, 10, 'ENAMED-L001-B04-Q617'),
  ('2026-W40', 2, 11, 'ENAMED-L001-B02-Q056'),
  ('2026-W40', 2, 12, 'ENAMED-L001-B04-Q709'),
  ('2026-W40', 2, 13, 'ENAMED-L001-B03-Q008'),
  ('2026-W40', 2, 14, 'ENAMED-L001-B03-Q030'),
  ('2026-W40', 2, 15, 'ENAMED-L001-B03-Q042'),
  ('2026-W40', 2, 16, 'ENAMED-L001-B03-Q154'),
  ('2026-W40', 2, 17, 'ENAMED-L001-B03-Q051'),
  ('2026-W40', 2, 18, 'ENAMED-L001-B03-Q003'),
  ('2026-W40', 2, 19, 'ENAMED-L001-B04-Q706'),
  ('2026-W40', 2, 20, 'ENAMED-L001-B04-Q693'),
  ('2026-W40', 2, 21, 'ENAMED-L001-B03-Q126'),
  ('2026-W40', 2, 22, 'ENAMED-L001-B04-Q759'),
  ('2026-W40', 2, 23, 'ENAMED-L001-B01-Q086'),
  ('2026-W40', 2, 24, 'ENAMED-L001-B04-Q702'),
  ('2026-W40', 2, 25, 'ENAMED-L001-B03-Q099'),
  ('2026-W40', 2, 26, 'ENAMED-L001-B04-Q740'),
  ('2026-W40', 2, 27, 'ENAMED-L001-B04-Q656'),
  ('2026-W40', 2, 28, 'ENAMED-L001-B03-Q116'),
  ('2026-W40', 2, 29, 'ENAMED-L001-B01-Q005'),
  ('2026-W40', 2, 30, 'ENAMED-L001-B01-Q167'),
  ('2026-W40', 2, 31, 'ENAMED-L001-B04-Q686'),
  ('2026-W40', 2, 32, 'ENAMED-L001-B03-Q041'),
  ('2026-W40', 2, 33, 'ENAMED-L001-B01-Q152'),
  ('2026-W40', 2, 34, 'ENAMED-L001-B01-Q070'),
  ('2026-W40', 2, 35, 'ENAMED-L001-B03-Q016'),
  ('2026-W40', 2, 36, 'ENAMED-L001-B03-Q063'),
  ('2026-W40', 2, 37, 'ENAMED-L001-B03-Q157'),
  ('2026-W40', 2, 38, 'ENAMED-L001-B03-Q149'),
  ('2026-W40', 2, 39, 'ENAMED-L001-B03-Q141'),
  ('2026-W40', 2, 40, 'ENAMED-L001-B03-Q062'),
  ('2026-W40', 2, 41, 'ENAMED-L001-B03-Q029'),
  ('2026-W40', 2, 42, 'ENAMED-L001-B04-Q640'),
  ('2026-W40', 2, 43, 'ENAMED-L001-B04-Q765'),
  ('2026-W40', 2, 44, 'ENAMED-L001-B03-Q057'),
  ('2026-W40', 2, 45, 'ENAMED-L001-B03-Q189'),
  ('2026-W40', 2, 46, 'ENAMED-L001-B01-Q150'),
  ('2026-W40', 2, 47, 'ENAMED-L001-B04-Q761'),
  ('2026-W40', 2, 48, 'ENAMED-L001-B04-Q609'),
  ('2026-W40', 2, 49, 'ENAMED-L001-B03-Q019'),
  ('2026-W40', 2, 50, 'ENAMED-L001-B03-Q088')
ON CONFLICT (week,group_index,position) DO UPDATE
SET question_code = EXCLUDED.question_code;

CREATE OR REPLACE FUNCTION public.user_weekly_question_pack(p_week text DEFAULT '2026-W40')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_uid uuid := auth.uid();
  v_hash bigint := 2166136261;
  v_char integer;
  v_text text;
  v_idx integer;
  v_group integer;
  v_result jsonb;
BEGIN
  IF v_uid IS NULL THEN
    RAISE EXCEPTION 'Authentication required' USING ERRCODE = '42501';
  END IF;
  IF NOT (SELECT public.has_feature('questions')) THEN
    RAISE EXCEPTION 'Question access not permitted for this plan' USING ERRCODE = '42501';
  END IF;
  IF p_week <> '2026-W40' THEN
    RAISE EXCEPTION 'Weekly pack unavailable' USING ERRCODE = '22023';
  END IF;
  v_text := v_uid::text;
  FOR v_idx IN 1..length(v_text) LOOP
    v_char := ascii(substr(v_text,v_idx,1));
    v_hash := (((v_hash # v_char::bigint) * 16777619) % 4294967296);
  END LOOP;
  v_group := (v_hash % 3)::integer;
  SELECT jsonb_build_object(
    'schema_version', 1,
    'type', 'questions',
    'week', p_week,
    'group', v_group,
    'count', count(q.id),
    'items', COALESCE(jsonb_agg(
      jsonb_build_object(
        'id',q.id,'question_code',q.question_code,'enunciado',q.enunciado,
        'alternativa_a',q.alternativa_a,'alternativa_b',q.alternativa_b,
        'alternativa_c',q.alternativa_c,'alternativa_d',q.alternativa_d,
        'dificuldade',q.dificuldade,'image_src',q.image_src,
        'image_alt',q.image_alt,'image_caption',q.image_caption
      ) ORDER BY w.position
    ),'[]'::jsonb)
  ) INTO v_result
  FROM private.weekly_question_assignments AS w
  JOIN public.question_bank AS q ON q.question_code=w.question_code
  WHERE w.week=p_week AND w.group_index=v_group;
  RETURN v_result;
END;
$function$;
REVOKE ALL ON FUNCTION public.user_weekly_question_pack(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.user_weekly_question_pack(text) TO authenticated;
COMMIT;
