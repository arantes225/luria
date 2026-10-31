CREATE OR REPLACE FUNCTION private.my_studyrats_challenges_v3()
 RETURNS TABLE(challenge_id uuid, creator_user_id uuid, challenge_title text, challenge_type text, goal numeric, deadline date, created_at timestamp with time zone, status text, participant_user_id uuid, participant_name text, studyrat_variant text, studyrat_accessory text, studyrat_accessory_x numeric, studyrat_accessory_y numeric, progress numeric)
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
  with mine as (
    select c.*
    from public.studyrats_challenges c
    join public.studyrats_participants me on me.challenge_id = c.id
    where me.user_id = auth.uid()
      and c.status <> 'cancelled'
  ),
  rows as (
    select
      c.id challenge_id,
      c.creator_user_id,
      c.title::text challenge_title,
      c.challenge_type,
      c.goal,
      c.deadline,
      c.created_at,
      case when c.deadline < current_date then 'finished' else c.status end::text status,
      sp.user_id participant_user_id,
      coalesce(p.display_name,'Usuário TRAUBE') participant_name,
      coalesce(p.studyrat_variant,'brown')::text studyrat_variant,
      coalesce(p.studyrat_accessory,'none')::text studyrat_accessory,
      case
        when coalesce((p.studyrat_accessory_offsets -> coalesce(p.studyrat_accessory,'none') ->> 'v')::int,1)=2
          then coalesce((p.studyrat_accessory_offsets -> coalesce(p.studyrat_accessory,'none') ->> 'x')::numeric,0)
        else coalesce((p.studyrat_accessory_offsets -> coalesce(p.studyrat_accessory,'none') ->> 'x')::numeric,0)/72.0
      end studyrat_accessory_x,
      case
        when coalesce((p.studyrat_accessory_offsets -> coalesce(p.studyrat_accessory,'none') ->> 'v')::int,1)=2
          then coalesce((p.studyrat_accessory_offsets -> coalesce(p.studyrat_accessory,'none') ->> 'y')::numeric,0)
        else coalesce((p.studyrat_accessory_offsets -> coalesce(p.studyrat_accessory,'none') ->> 'y')::numeric,0)/50.0
      end studyrat_accessory_y,
      case c.challenge_type
        when 'flashcards' then (
          select count(*)::numeric from public.flashcard_reviews fr
          where fr.user_id = sp.user_id and fr.reviewed_at >= c.created_at and fr.reviewed_at < (c.deadline + 1)::timestamptz
        )
        when 'study_days' then (
          select count(distinct ss.started_at::date)::numeric from public.study_sessions ss
          where ss.user_id = sp.user_id and ss.started_at >= c.created_at and ss.started_at < (c.deadline + 1)::timestamptz
            and coalesce(ss.duration_seconds,0) > 0
        )
        when 'retention' then (
          select coalesce(round(100.0 * sum(case when fr.was_correct then 1 else 0 end) / nullif(count(*),0),1),0)::numeric
          from public.flashcard_reviews fr
          where fr.user_id = sp.user_id and fr.reviewed_at >= c.created_at and fr.reviewed_at < (c.deadline + 1)::timestamptz
        )
        when 'classes' then (
          select count(*)::numeric from public.study_topics st
          where st.user_id = sp.user_id and st.status = 'completed'
            and st.completed_at >= c.created_at and st.completed_at < (c.deadline + 1)::timestamptz
        )
        when 'ccqs' then (
          select count(*)::numeric from public.question_attempts qa
          where qa.user_id = sp.user_id and qa.answered_at >= c.created_at and qa.answered_at < (c.deadline + 1)::timestamptz
        )
        else 0::numeric
      end progress
    from mine c
    join public.studyrats_participants sp on sp.challenge_id = c.id
    left join public.profiles p on p.user_id = sp.user_id
  )
  select * from rows
  order by created_at desc, challenge_id, progress desc, participant_name;
$function$
