-- Amplia o catálogo já autorizado sem publicar lotes adicionais.
-- A função original continua controlando autenticação, assinatura, lotes e limite.
create or replace function public.user_question_bank_list_catalog_v2()
returns jsonb
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_catalog jsonb;
begin
  v_catalog := public.user_question_bank_list_catalog();

  return jsonb_set(
    v_catalog,
    '{items}',
    coalesce(
      (
        select jsonb_agg(
          entry.item || jsonb_build_object(
            'dificuldade', bank.dificuldade,
            'subtheme_id', bank.subtheme_id
          )
          order by entry.position
        )
        from jsonb_array_elements(coalesce(v_catalog -> 'items', '[]'::jsonb))
          with ordinality as entry(item, position)
        join public.question_bank as bank
          on bank.id = (entry.item ->> 'question_id')::uuid
      ),
      '[]'::jsonb
    )
  );
end;
$function$;

revoke all on function public.user_question_bank_list_catalog_v2() from public, anon, authenticated;
grant execute on function public.user_question_bank_list_catalog_v2() to authenticated;

comment on function public.user_question_bank_list_catalog_v2() is
  'Catálogo de listas LURIA: mantém os lotes autorizados e acrescenta dificuldade e ID do subtema.';

-- Quando o criador informa a chave e a taxonomia da questão oficial, não
-- sobrescrever esses campos com NULL: o banco fonte é protegido por RLS.
-- Importações sem essa classificação preservam o comportamento anterior.
create or replace function public.question_items_fill_taxonomy()
returns trigger
language plpgsql
set search_path = 'public'
as $function$
begin
  if new.stem is null or btrim(new.stem) = '' then
    return new;
  end if;

  if new.question_bank_id is not null
     and nullif(btrim(coalesce(new.area, '')), '') is not null
     and nullif(btrim(coalesce(new.topic, '')), '') is not null
  then
    return new;
  end if;

  select qb.id,
         qa.name,
         qt.name,
         qb.dificuldade,
         qt.name,
         qs.name
    into new.question_bank_id,
         new.area,
         new.materia,
         new.difficulty,
         new.topic,
         new.subtopic
  from public.question_bank qb
  left join public.question_subthemes qs on qs.id = qb.subtheme_id
  left join public.question_themes qt on qt.id = qs.theme_id
  left join public.question_areas qa on qa.id = qt.area_id
  where qb.enunciado = new.stem
  order by qb.created_at desc, qb.id
  limit 1;

  return new;
end;
$function$;
