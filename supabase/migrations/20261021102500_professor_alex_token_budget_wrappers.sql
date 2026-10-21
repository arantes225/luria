create or replace function public.professor_alex_token_usage(p_user_id uuid)
returns jsonb
language sql
set search_path = ''
as $function$
  select private.professor_alex_token_usage($1);
$function$;

revoke all on function public.professor_alex_token_usage(uuid) from public, anon, authenticated;
grant execute on function public.professor_alex_token_usage(uuid) to service_role;

create or replace function public.record_professor_alex_token_usage(
  p_user_id uuid,
  p_channel text,
  p_input_tokens bigint,
  p_output_tokens bigint,
  p_total_tokens bigint
)
returns jsonb
language sql
set search_path = ''
as $function$
  select private.record_professor_alex_token_usage($1, $2, $3, $4, $5);
$function$;

revoke all on function public.record_professor_alex_token_usage(uuid, text, bigint, bigint, bigint) from public, anon, authenticated;
grant execute on function public.record_professor_alex_token_usage(uuid, text, bigint, bigint, bigint) to service_role;
