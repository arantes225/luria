create schema if not exists private;

create or replace function private.traube_topic_matches(p_topic text, p_haystack text)
returns boolean
language plpgsql
immutable
set search_path = ''
as $function$
declare
  v_topic text := trim(translate(lower(coalesce(p_topic, '')), 'áàâãäéèêëíìîïóòôõöúùûüç', 'aaaaaeeeeiiiiooooouuuuc'));
  v_haystack text := trim(translate(lower(coalesce(p_haystack, '')), 'áàâãäéèêëíìîïóòôõöúùûüç', 'aaaaaeeeeiiiiooooouuuuc'));
begin
  if length(v_topic) < 2 then return false; end if;
  if v_topic in ('go', 'g o', 'gineco', 'obst', 'ginecologia e obstetricia') then
    return v_haystack like '%ginecolog%' or v_haystack like '%obstetric%';
  elsif v_topic in ('cm', 'clinica', 'clinica medica') then
    return v_haystack like '%clinica medica%';
  elsif v_topic in ('ped', 'pedi', 'pediatria') then
    return v_haystack like '%pediatr%';
  elsif v_topic in ('cg', 'cirurgia', 'cirurgia geral') then
    return v_haystack like '%cirurgia geral%';
  elsif v_topic in ('prev', 'preventiva', 'medicina preventiva') then
    return v_haystack like '%preventiv%' or v_haystack like '%saude coletiva%';
  end if;
  return v_haystack like '%' || v_topic || '%';
end;
$function$;

revoke all on function private.traube_topic_matches(text, text) from public, anon, authenticated;

create or replace function public.build_topic_study_session_v1(
  p_topic text,
  p_question_count integer default 10,
  p_flashcard_count integer default 15
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user uuid := auth.uid();
  v_topic text := left(trim(coalesce(p_topic, '')), 180);
  v_question_count integer := greatest(0, least(coalesce(p_question_count, 10), 50));
  v_flashcard_count integer := greatest(0, least(coalesce(p_flashcard_count, 15), 80));
  v_set_id uuid;
  v_actual_questions integer := 0;
  v_flashcards jsonb := '[]'::jsonb;
  v_apostila jsonb;
begin
  if v_user is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;
  if length(v_topic) < 2 then
    raise exception 'Informe um assunto com pelo menos 2 caracteres';
  end if;

  if v_question_count > 0 and (select public.has_feature('questions')) then
    insert into public.question_sets (user_id, title, total_questions, status, source_file_name)
    values (v_user, left('Estudo focado: ' || v_topic, 160), 0, 'processing', null)
    returning id into v_set_id;

    with selected as (
      select
        b.*, a.name as area_name, t.name as theme_name, st.name as subtheme_name,
        concat_ws(' · ', nullif(s.institution, ''), nullif(s.document, ''), nullif(s.source_year, '')) as source_label
      from public.question_bank b
      left join public.question_subthemes st on st.id = b.subtheme_id
      left join public.question_themes t on t.id = st.theme_id
      left join public.question_areas a on a.id = t.area_id
      left join public.question_sources s on s.id = b.source_id
      where b.gabarito is not null
        and b.enunciado is not null
        and private.traube_topic_matches(v_topic, concat_ws(' ', a.name, t.name, st.name))
      order by random()
      limit v_question_count
    ), numbered as (
      select selected.*, row_number() over ()::integer as ordinal
      from selected
    )
    insert into public.question_items (
      user_id, set_id, question_number, order_index, question_bank_id, source_label,
      stem, raw_text, alternatives, official_answer, answer_explanations,
      pulo_do_gato, area, materia, topic, subtopic, difficulty
    )
    select
      v_user, v_set_id, ordinal, ordinal, id, coalesce(nullif(source_label, ''), 'Banco TRAUBE'),
      enunciado, enunciado,
      jsonb_build_object('A', alternativa_a, 'B', alternativa_b, 'C', alternativa_c, 'D', alternativa_d),
      gabarito,
      jsonb_build_object('A', explicacao_a, 'B', explicacao_b, 'C', explicacao_c, 'D', explicacao_d),
      mensagem_chave, area_name, theme_name, theme_name, subtheme_name, dificuldade
    from numbered;

    get diagnostics v_actual_questions = row_count;
    if v_actual_questions = 0 then
      delete from public.question_sets where id = v_set_id and user_id = v_user;
      v_set_id := null;
    else
      update public.question_sets
      set total_questions = v_actual_questions, status = 'ready', updated_at = now()
      where id = v_set_id and user_id = v_user;
    end if;
  end if;

  if v_flashcard_count > 0 and (select public.has_feature('flashcards')) then
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', picked.id,
      'area', picked.area,
      'materia', picked.materia,
      'theme', picked.theme
    )), '[]'::jsonb)
    into v_flashcards
    from (
      select f.id, f.area, f.materia, f.theme
      from public.flashcards f
      where f.active
        and (f.library_scope = 'system' or f.user_id = v_user)
        and private.traube_topic_matches(v_topic, concat_ws(' ', f.area, f.materia, f.theme))
      order by random()
      limit v_flashcard_count
    ) picked;
  end if;

  select jsonb_build_object(
    'id', a.id,
    'title', a.titulo,
    'area', a.area,
    'subject', a.materia,
    'theme', a.tema,
    'url', a.content_url
  )
  into v_apostila
  from public.apostilas a
  where a.is_published
    and private.traube_topic_matches(v_topic, concat_ws(' ', a.area, a.materia, a.tema, a.titulo))
  order by
    case when private.traube_topic_matches(v_topic, a.tema) then 0 else 1 end,
    a.titulo
  limit 1;

  return jsonb_build_object(
    'topic', v_topic,
    'question_set_id', v_set_id,
    'question_count', v_actual_questions,
    'flashcards', v_flashcards,
    'flashcard_count', jsonb_array_length(v_flashcards),
    'apostila', v_apostila
  );
end;
$function$;

revoke all on function public.build_topic_study_session_v1(text, integer, integer) from public, anon, authenticated;
grant execute on function public.build_topic_study_session_v1(text, integer, integer) to authenticated;

create or replace function public.alex_schedule_focus_v1(
  p_focus text,
  p_start_date date,
  p_end_date date,
  p_lessons_per_day integer default 1,
  p_apply boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user uuid := auth.uid();
  v_focus text := left(trim(coalesce(p_focus, '')), 180);
  v_lessons integer := greatest(1, least(coalesce(p_lessons_per_day, 1), 5));
  v_weekdays smallint[];
  v_plan jsonb := '[]'::jsonb;
  v_item jsonb;
  v_displaced integer := 0;
  v_applied integer := 0;
begin
  if v_user is null then raise exception 'authentication required' using errcode = '42501'; end if;
  if length(v_focus) < 2 then raise exception 'Informe a área ou assunto do cronograma'; end if;
  if p_start_date is null or p_end_date is null or p_end_date < p_start_date then
    raise exception 'Intervalo de datas inválido';
  end if;
  if p_end_date - p_start_date > 31 then
    raise exception 'O ajuste pode abranger no máximo 32 dias por vez';
  end if;

  select theory_study_weekdays into v_weekdays
  from public.user_settings where user_id = v_user;
  v_weekdays := coalesce(v_weekdays, array[1,2,3,4,5,6,7]::smallint[]);

  select count(*)::integer into v_displaced
  from public.study_topics t
  where t.user_id = v_user and t.completed_at is null
    and t.scheduled_date between p_start_date and p_end_date
    and not private.traube_topic_matches(v_focus, concat_ws(' ', t.area, t.materia, t.theme));

  with study_dates as (
    select day::date as study_date
    from generate_series(p_start_date::timestamp, p_end_date::timestamp, interval '1 day') day
    where extract(isodow from day)::smallint = any(v_weekdays)
  ), slots as (
    select study_date, slot,
      row_number() over (order by study_date, slot) as ordinal
    from study_dates cross join generate_series(1, v_lessons) slot
  ), candidates as (
    select t.id, t.theme, t.area, t.materia,
      row_number() over (order by
        case when t.scheduled_date between p_start_date and p_end_date then 0 else 1 end,
        t.scheduled_date nulls last, t.deck_order nulls last, t.created_at
      ) as ordinal
    from public.study_topics t
    where t.user_id = v_user and t.completed_at is null
      and private.traube_topic_matches(v_focus, concat_ws(' ', t.area, t.materia, t.theme))
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'topic_id', c.id,
    'title', c.theme,
    'area', c.area,
    'subject', c.materia,
    'date', s.study_date,
    'slot', s.slot
  ) order by s.study_date, s.slot), '[]'::jsonb)
  into v_plan
  from slots s join candidates c on c.ordinal = s.ordinal;

  if p_apply then
    update public.study_topics
    set scheduled_date = null, status = 'deck', updated_at = now()
    where user_id = v_user and completed_at is null
      and scheduled_date between p_start_date and p_end_date;

    for v_item in select value from jsonb_array_elements(v_plan)
    loop
      update public.study_topics
      set scheduled_date = (v_item ->> 'date')::date,
          status = 'scheduled',
          updated_at = now()
      where id = (v_item ->> 'topic_id')::uuid
        and user_id = v_user and completed_at is null;
      if found then v_applied := v_applied + 1; end if;
    end loop;
  end if;

  return jsonb_build_object(
    'focus', v_focus,
    'start_date', p_start_date,
    'end_date', p_end_date,
    'lessons_per_day', v_lessons,
    'study_weekdays', to_jsonb(v_weekdays),
    'planned_count', jsonb_array_length(v_plan),
    'displaced_count', v_displaced,
    'applied_count', v_applied,
    'applied', p_apply,
    'items', v_plan
  );
end;
$function$;

revoke all on function public.alex_schedule_focus_v1(text, date, date, integer, boolean) from public, anon;
grant execute on function public.alex_schedule_focus_v1(text, date, date, integer, boolean) to authenticated;

comment on function public.build_topic_study_session_v1(text, integer, integer) is
  'Builds an authenticated user-owned study bundle from random real TRAUBE questions and flashcards plus a matching published booklet.';
comment on function public.alex_schedule_focus_v1(text, date, date, integer, boolean) is
  'Previews or applies a user-owned schedule focus while preserving configured theory-study weekdays.';
