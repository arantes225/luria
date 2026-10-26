-- Migration 20261026140000_security_harden_search_path_and_usage_bola.sql
-- Security Hardening: Enforce explicit search_path and BOLA authorization guardrails on SECURITY DEFINER functions.

CREATE OR REPLACE FUNCTION public.get_professor_alex_daily_usage(
  p_user_id uuid DEFAULT NULL,
  p_limit integer DEFAULT 15
)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_caller uuid := auth.uid();
  v_target uuid := coalesce(p_user_id, v_caller);
  v_used integer := 0;
begin
  if v_caller is null then
    raise exception 'authentication required' using errcode = '42501';
  end if;

  if v_target <> v_caller and not public.is_admin() then
    raise exception 'access denied' using errcode = '42501';
  end if;

  select coalesce(request_count, 0)
    into v_used
  from public.professor_alex_daily_usage
  where user_id = v_target
    and usage_date = (timezone('America/Sao_Paulo', now()))::date;

  return jsonb_build_object(
    'used', coalesce(v_used, 0),
    'remaining', greatest(p_limit - coalesce(v_used, 0), 0),
    'limit', p_limit,
    'renews_at', (((timezone('America/Sao_Paulo', now()))::date + 1)::timestamp at time zone 'America/Sao_Paulo')
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.admin_list_apostila_images(p_apostila_path text DEFAULT NULL::text)
RETURNS SETOF public.apostila_image_review_queue
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
begin
  if not public.is_admin() then
    raise exception 'Acesso administrativo necessário';
  end if;

  return query
  select q.*
  from public.apostila_image_review_queue q
  where (p_apostila_path is null or q.apostila_path = p_apostila_path)
  order by q.created_at asc;
end;
$function$;

CREATE OR REPLACE FUNCTION public.admin_review_apostila_image(p_id bigint, p_decision text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_row public.apostila_image_review_queue%rowtype;
  v_size bigint;
begin
  if not public.is_admin() then
    raise exception 'Acesso administrativo necessário';
  end if;

  if p_decision = 'approved' then
    select * into v_row
    from public.apostila_image_review_queue
    where id = p_id;

    if v_row.id is null then
      raise exception 'Imagem candidata não encontrada';
    end if;

    begin
      v_size := nullif(v_row.proposed_asset->>'size_bytes','')::bigint;
    exception when others then
      v_size := null;
    end;

    if v_size is null then
      raise exception 'Imagem ainda não foi auditada quanto ao tamanho máximo de 110 KB';
    end if;

    if v_size > 112640 then
      raise exception 'Imagem excede o limite de 110 KB (% KB)', round(v_size::numeric/1024,1);
    end if;

    update public.apostila_image_review_queue
       set review_status = 'approved',
           reviewed_by = auth.uid(),
           reviewed_at = now(),
           updated_at = now()
     where id = p_id
     returning * into v_row;

    return jsonb_build_object('id', v_row.id, 'status', 'approved', 'size_bytes', v_size);

  elsif p_decision = 'rejected' then
    delete from public.apostila_image_review_queue
     where id = p_id
     returning * into v_row;

    if v_row.id is null then
      raise exception 'Imagem candidata não encontrada';
    end if;

    return jsonb_build_object('id', v_row.id, 'status', 'deleted');
  else
    raise exception 'Decisão inválida';
  end if;
end;
$function$;

CREATE OR REPLACE FUNCTION public.admin_update_apostila_image_asset(p_id bigint, p_proposed_asset jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_row public.apostila_image_review_queue%rowtype;
begin
  if auth.uid() is null or not public.is_admin() then
    raise exception 'Acesso administrativo necessário';
  end if;

  update public.apostila_image_review_queue
     set proposed_asset = p_proposed_asset,
         updated_at = now()
   where id = p_id
   returning * into v_row;

  if v_row.id is null then
    raise exception 'Imagem candidata não encontrada';
  end if;

  return jsonb_build_object(
    'id', v_row.id,
    'size_bytes', v_row.proposed_asset->>'size_bytes',
    'src', v_row.proposed_asset->>'src'
  );
end;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_name text;
begin
  v_name :=
    coalesce(
      nullif(new.raw_user_meta_data ->> 'display_name', ''),
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(split_part(new.email, '@', 1), ''),
      'Usuário'
    );

  insert into public.profiles (
    user_id,
    display_name
  )
  values (
    new.id,
    v_name
  )
  on conflict (user_id) do nothing;

  insert into public.user_settings (
    user_id
  )
  values (
    new.id
  )
  on conflict (user_id) do nothing;

  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.notify_friendship_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_sender_name text;
begin
  select coalesce(nullif(trim(display_name), ''), 'Um usuário LURIA')
    into v_sender_name
  from public.profiles
  where user_id = new.user_id;

  insert into public.notifications(
    user_id,
    type,
    title,
    body,
    href,
    metadata
  )
  values(
    new.friend_user_id,
    'friend_added',
    'Novo amigo no LURIA',
    coalesce(v_sender_name, 'Um usuário LURIA') || ' adicionou você aos amigos.',
    '/amigos/',
    jsonb_build_object(
      'friendship_id', new.id,
      'friend_user_id', new.user_id
    )
  );

  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.notify_direct_share_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_sender_name text;
  v_resource_label text;
begin
  select coalesce(nullif(trim(display_name), ''), 'Um amigo')
    into v_sender_name
  from public.profiles
  where user_id = new.sender_user_id;

  v_resource_label :=
    case new.resource_type
      when 'flashcard_deck' then 'um deck de Flashcards'
      when 'study_note_bundle' then 'um caderno'
      else 'um conteúdo'
    end;

  insert into public.notifications(
    user_id,
    type,
    title,
    body,
    href,
    metadata
  )
  values(
    new.recipient_user_id,
    'direct_share',
    coalesce(nullif(trim(new.title), ''), 'Novo conteúdo recebido'),
    coalesce(v_sender_name, 'Um amigo') || ' enviou ' || v_resource_label || ' para você.',
    '/amigos/',
    jsonb_build_object(
      'direct_share_id', new.id,
      'sender_user_id', new.sender_user_id,
      'resource_type', new.resource_type,
      'share_token', new.share_token
    )
  );

  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.my_studyrats_challenges()
RETURNS TABLE(
  challenge_id uuid,
  creator_user_id uuid,
  challenge_type text,
  goal numeric,
  deadline date,
  created_at timestamp with time zone,
  status text,
  participant_user_id uuid,
  participant_name text,
  studyrat_variant text,
  studyrat_accessory text,
  progress numeric
)
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
      c.challenge_type,
      c.goal,
      c.deadline,
      c.created_at,
      case when c.deadline < CURRENT_DATE then 'finished' else c.status end::text status,
      sp.user_id participant_user_id,
      coalesce(p.display_name,'Usuário LURIA') participant_name,
      coalesce(p.studyrat_variant,'brown')::text studyrat_variant,
      coalesce(p.studyrat_accessory,'none')::text studyrat_accessory,
      case c.challenge_type
        when 'flashcards' then (
          select count(*)::numeric
          from public.flashcard_reviews fr
          where fr.user_id = sp.user_id
            and fr.reviewed_at >= c.created_at
            and fr.reviewed_at < (c.deadline + 1)::timestamptz
        )
        when 'study_days' then (
          select count(distinct ss.started_at::date)::numeric
          from public.study_sessions ss
          where ss.user_id = sp.user_id
            and ss.started_at >= c.created_at
            and ss.started_at < (c.deadline + 1)::timestamptz
            and coalesce(ss.duration_seconds,0) > 0
        )
        when 'retention' then (
          select coalesce(
            round(100.0 * sum(case when fr.was_correct then 1 else 0 end) / nullif(count(*),0),1),
            0
          )::numeric
          from public.flashcard_reviews fr
          where fr.user_id = sp.user_id
            and fr.reviewed_at >= c.created_at
            and fr.reviewed_at < (c.deadline + 1)::timestamptz
        )
        when 'classes' then (
          select count(*)::numeric
          from public.study_topics st
          where st.user_id = sp.user_id
            and st.status = 'completed'
            and st.completed_at >= c.created_at
            and st.completed_at < (c.deadline + 1)::timestamptz
        )
        when 'ccqs' then (
          select count(*)::numeric
          from public.question_attempts qa
          where qa.user_id = sp.user_id
            and qa.answered_at >= c.created_at
            and qa.answered_at < (c.deadline + 1)::timestamptz
        )
        else 0::numeric
      end progress
    from mine c
    join public.studyrats_participants sp on sp.challenge_id = c.id
    left join public.profiles p on p.user_id = sp.user_id
  )
  select * from rows
  order by created_at desc, challenge_id, progress desc, participant_name;
$function$;

CREATE OR REPLACE FUNCTION public.admin_queue_low_resolution_image(
  p_bucket_id text,
  p_object_name text,
  p_width integer,
  p_height integer,
  p_size_bytes bigint,
  p_source_page text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_object storage.objects%rowtype;
begin
  if not public.is_admin() then raise exception 'Acesso administrativo necessário'; end if;
  if p_bucket_id not in ('apostila-media','docmap','docmap-assets','flashcard-media','study-room-attachments')
     or p_width is null or p_height is null or least(p_width,p_height) >= 600
     or p_size_bytes is null or p_size_bytes <= 0 or p_size_bytes > 81920 then
    raise exception 'Dados de imagem inválidos';
  end if;
  select * into v_object from storage.objects
   where bucket_id = p_bucket_id and name = p_object_name;
  if not found or coalesce(v_object.metadata->>'mimetype','') not like 'image/%'
     or coalesce(nullif(v_object.metadata->>'size','')::bigint,0) <> p_size_bytes then
    raise exception 'Objeto ou metadados da imagem não conferem';
  end if;
  insert into public.low_resolution_image_review_queue
    (bucket_id, object_name, owner_id, source_page, width, height, size_bytes, review_status, reviewed_at, reviewed_by)
  values
    (p_bucket_id, p_object_name, coalesce(v_object.owner_id::uuid, auth.uid()),
     left(coalesce(p_source_page,'/admin/image-cap-backfill'),160),
     p_width,p_height,p_size_bytes,'pending',null,null)
  on conflict (bucket_id,object_name) do update
    set width=excluded.width,height=excluded.height,size_bytes=excluded.size_bytes,
        review_status='pending',created_at=now(),reviewed_at=null,reviewed_by=null;
  return jsonb_build_object('queued',true,'review_status','pending');
end;
$function$;

CREATE OR REPLACE FUNCTION public.queue_low_resolution_image(
  p_bucket_id text,
  p_object_name text,
  p_width integer,
  p_height integer,
  p_size_bytes bigint,
  p_source_page text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO ''
AS $function$
declare
  v_object storage.objects%rowtype;
begin
  if auth.uid() is null then raise exception 'Sessão necessária'; end if;
  if p_bucket_id not in ('apostila-media','docmap','docmap-assets','flashcard-media','study-room-attachments') then
    raise exception 'Bucket não permitido';
  end if;
  if p_width is null or p_height is null or least(p_width,p_height) >= 600 then
    raise exception 'Imagem não se enquadra na fila de baixa resolução';
  end if;
  if p_size_bytes is null or p_size_bytes <= 0 or p_size_bytes > 81920 then
    raise exception 'Tamanho de imagem inválido';
  end if;

  select * into v_object from storage.objects
   where bucket_id = p_bucket_id and name = p_object_name;
  if not found or v_object.owner_id::text <> auth.uid()::text then
    raise exception 'Imagem não pertence ao usuário autenticado';
  end if;
  if coalesce(v_object.metadata->>'mimetype','') not like 'image/%'
     or coalesce(nullif(v_object.metadata->>'size','')::bigint, p_size_bytes) <> p_size_bytes then
    raise exception 'Metadados da imagem não conferem';
  end if;

  insert into public.low_resolution_image_review_queue
    (bucket_id, object_name, owner_id, source_page, width, height, size_bytes, review_status, reviewed_at, reviewed_by)
  values
    (p_bucket_id, p_object_name, auth.uid(), left(coalesce(p_source_page,'/'),160),
     p_width, p_height, p_size_bytes, 'pending', null, null)
  on conflict (bucket_id, object_name) do update
    set owner_id = excluded.owner_id, source_page = excluded.source_page,
        width = excluded.width, height = excluded.height, size_bytes = excluded.size_bytes,
        review_status = 'pending', created_at = now(), reviewed_at = null, reviewed_by = null;
  return jsonb_build_object('queued', true, 'review_status', 'pending');
end;
$function$;
