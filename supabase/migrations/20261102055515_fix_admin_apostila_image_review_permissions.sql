-- Restore the intended privileged boundary for the two admin-only image-review RPCs.
-- Both routines validate public.is_admin() before touching the review queue.

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
  end if;

  raise exception 'Decisão inválida';
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

REVOKE ALL ON FUNCTION public.admin_review_apostila_image(bigint, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_update_apostila_image_asset(bigint, jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_review_apostila_image(bigint, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_apostila_image_asset(bigint, jsonb) TO authenticated;
