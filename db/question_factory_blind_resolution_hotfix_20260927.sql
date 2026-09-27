-- Hotfix applied to production Supabase on 2026-09-27.
-- Keeps blind_resolution immutable while avoiding the PL/pgSQL reviewer name conflict
-- in the generic question-factory importer.

create or replace function public.admin_import_question_factory_blind_resolution(p_payload jsonb)
returns jsonb
language plpgsql
volatile
security definer
set search_path = ''
as $function$
declare
  v_batch_id uuid;
  v_block_id uuid;
  v_item public.question_factory_items%rowtype;
  v_review jsonb;
  v_existing public.question_factory_reviews%rowtype;
  v_reviewer text := coalesce(p_payload->>'reviewer', p_payload->>'auditor');
  v_count int := 0;
begin
  if not public.is_admin_session() then
    raise exception 'admin access required' using errcode='42501';
  end if;

  if coalesce(p_payload->>'schema_version','') not in ('2.0','2.3') then
    raise exception 'Contrato inválido; use 2.0 ou 2.3';
  end if;

  if p_payload->>'review_stage' is distinct from 'blind_resolution' then
    raise exception 'review_stage deve ser blind_resolution';
  end if;

  if v_reviewer is distinct from 'ChatGPT' then
    raise exception 'Revisor incompatível com etapa: blind_resolution exige ChatGPT';
  end if;

  select b.id, bl.id
    into v_batch_id, v_block_id
  from public.question_factory_batches b
  join public.question_factory_blocks bl on bl.batch_id=b.id
  where b.batch_number=(p_payload->>'batch_number')::int
    and bl.block_number=(p_payload->>'block_number')::int
  for update of b, bl;

  if v_block_id is null then
    raise exception 'Lote/bloco não encontrado';
  end if;

  if exists (
    select 1 from public.question_factory_batches
    where id=v_batch_id and status='published'
  ) then
    raise exception 'Lote publicado é imutável neste fluxo';
  end if;

  if jsonb_typeof(p_payload->'reviews') is distinct from 'array'
     or p_payload->'reviews'='[]'::jsonb then
    raise exception 'reviews não pode estar vazio';
  end if;

  if (
    select count(*) <> count(distinct x->>'question_id')
    from jsonb_array_elements(p_payload->'reviews') x
  ) then
    raise exception 'IDs repetidos/ausentes';
  end if;

  for v_review in
    select value from jsonb_array_elements(p_payload->'reviews')
  loop
    select * into v_item
    from public.question_factory_items
    where block_id=v_block_id
      and question_id=v_review->>'question_id'
    for update;

    if v_item.id is null
       or (v_review->>'item_version')::int is distinct from v_item.version then
      raise exception 'Questão/versão divergente: %', v_review->>'question_id';
    end if;

    if not (v_review ? 'independent_answer')
       or (v_review->>'independent_answer' is not null
           and v_review->>'independent_answer' not in ('A','B','C','D'))
       or nullif(btrim(v_review->>'reason'),'') is null then
      raise exception 'Resolução cega incompleta';
    end if;

    select * into v_existing
    from public.question_factory_reviews r0
    where r0.item_id=v_item.id
      and r0.item_version=v_item.version
      and r0.review_stage='blind_resolution'
      and r0.reviewer in ('ChatGPT','Perplexity')
    order by r0.created_at desc, r0.id desc
    limit 1;

    if found then
      if v_existing.independent_answer is distinct from v_review->>'independent_answer'
         or coalesce(v_existing.raw_payload->>'reason','')
            is distinct from coalesce(v_review->>'reason','') then
        raise exception 'Resolução cega já registrada com conteúdo diferente; resposta original é imutável';
      end if;
      v_count := v_count + 1;
      continue;
    end if;

    if exists (
      select 1
      from public.question_factory_reviews r0
      where r0.item_id=v_item.id
        and r0.item_version=v_item.version
        and r0.review_stage in ('perplexity_initial','perplexity_reaudit')
    ) then
      raise exception 'Resolução cega não pode ser criada após auditoria da mesma versão';
    end if;

    if not (
      v_item.latest_review_stage='chatgpt_correction_review'
      or exists (
        select 1
        from public.question_factory_reviews r0
        where r0.item_id=v_item.id
          and r0.item_version=v_item.version
          and r0.review_stage='chatgpt_initial'
          and r0.review_status='approved'
      )
    ) then
      raise exception 'Resolução cega bloqueada: versão atual precisa estar aprovada no ChatGPT inicial ou corrigida pelo ChatGPT para %',
        v_item.question_id;
    end if;

    insert into public.question_factory_reviews(
      item_id, block_id, batch_id, question_id, item_version,
      review_stage, reviewer, review_status, independent_answer, raw_payload
    )
    values(
      v_item.id, v_block_id, v_batch_id, v_item.question_id, v_item.version,
      'blind_resolution', v_reviewer, 'needs_revision',
      v_review->>'independent_answer', v_review
    )
    on conflict do nothing;

    v_count := v_count + 1;
  end loop;

  return jsonb_build_object(
    'imported', v_count,
    'approved', 0,
    'needs_revision', v_count,
    'rejected', 0,
    'stage', 'blind_resolution',
    'immutable', true
  );
end
$function$;
