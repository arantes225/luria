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