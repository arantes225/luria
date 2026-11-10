create or replace function public.alex_schedule_focus_v1(
  p_focus text,
  p_start_date date,
  p_end_date date,
  p_lessons_per_day integer default 1,
  p_apply boolean default false,
  p_weekdays smallint[] default null
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

  if p_weekdays is not null and array_length(p_weekdays, 1) > 0 then
    select coalesce(array_agg(distinct d order by d), array[1,2,3,4,5,6,7]::smallint[])
    into v_weekdays
    from unnest(p_weekdays) d
    where d between 1 and 7;
  else
    select theory_study_weekdays into v_weekdays
    from public.user_settings where user_id = v_user;
  end if;

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

revoke all on function public.alex_schedule_focus_v1(text, date, date, integer, boolean, smallint[]) from public, anon;
grant execute on function public.alex_schedule_focus_v1(text, date, date, integer, boolean, smallint[]) to authenticated;

comment on function public.alex_schedule_focus_v1(text, date, date, integer, boolean, smallint[]) is
  'Previews or applies a user-owned schedule focus while respecting configured or explicitly requested study weekdays.';

create or replace function public.alex_add_schedule_event_v1(
  p_title text,
  p_event_date date,
  p_event_type text default 'prova',
  p_event_time text default null
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_user uuid := auth.uid();
  v_title text := left(trim(coalesce(p_title, '')), 180);
  v_type text := lower(trim(coalesce(p_event_type, 'prova')));
  v_id uuid;
begin
  if v_user is null then raise exception 'authentication required' using errcode = '42501'; end if;
  if length(v_title) < 2 then raise exception 'Informe o título do evento'; end if;
  if p_event_date is null then raise exception 'Informe a data do evento'; end if;
  if v_type not in ('prova', 'simulado', 'compromisso', 'revisao', 'outro') then
    v_type := 'prova';
  end if;

  insert into public.schedule_events (user_id, title, event_type, event_date, event_time)
  values (v_user, v_title, v_type, p_event_date, nullif(trim(coalesce(p_event_time, '')), ''))
  returning id into v_id;

  return jsonb_build_object(
    'id', v_id,
    'title', v_title,
    'event_type', v_type,
    'event_date', p_event_date,
    'event_time', nullif(trim(coalesce(p_event_time, '')), '')
  );
end;
$function$;

revoke all on function public.alex_add_schedule_event_v1(text, date, text, text) from public, anon;
grant execute on function public.alex_add_schedule_event_v1(text, date, text, text) to authenticated;

comment on function public.alex_add_schedule_event_v1(text, date, text, text) is
  'Creates an authenticated user-owned calendar event directly via Leco.';
