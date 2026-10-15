-- Additive competitive-group option; legacy history remains unchanged.
-- Generated with Supabase CLI migration new; review source guards before application.
-- Existing groups have no group-scoped race association; keep them noncompetitive
-- until an administrator opts in. Legacy challenges and rat profiles are untouched.
begin;
alter table public.study_groups add column if not exists competitive boolean not null default false;

-- Extend only the two existing group commands; preserve all room and voice logic.
-- Abort on source drift rather than replacing an unknown deployed implementation.
do $migration$
declare
 source text := pg_get_functiondef('private.social_command(text,jsonb)'::regprocedure);
 old_insert text := $old$insert into public.study_groups(owner_id,name,description,area,objective) values(uid,trim(p_payload->>'name'),coalesce(p_payload->>'description',''),coalesce(p_payload->>'area',''),coalesce(p_payload->>'objective','')) returning id into g;$old$;
 new_insert text := $new$if p_payload ? 'competitive' and jsonb_typeof(p_payload->'competitive') <> 'boolean' then raise exception 'Tipo de grupo inválido'; end if;
   insert into public.study_groups(owner_id,name,description,area,objective,competitive) values(uid,trim(p_payload->>'name'),coalesce(p_payload->>'description',''),coalesce(p_payload->>'area',''),coalesce(p_payload->>'objective',''),coalesce((p_payload->>'competitive')::boolean,false)) returning id into g;$new$;
 old_update text := $old$if p_action='group_update' then update public.study_groups set objective=coalesce(p_payload->>'objective',objective),description=coalesce(p_payload->>'description',description) where id=g; return '{}'; end if;$old$;
 new_update text := $new$if p_action='group_update' then
    if p_payload ? 'competitive' and jsonb_typeof(p_payload->'competitive') <> 'boolean' then raise exception 'Tipo de grupo inválido'; end if;
    update public.study_groups set objective=coalesce(p_payload->>'objective',objective),description=coalesce(p_payload->>'description',description),competitive=coalesce((p_payload->>'competitive')::boolean,competitive) where id=g; return '{}'; end if;$new$;
begin
 if position(new_insert in source)>0 and position(new_update in source)>0 then return; end if;
 if position(old_insert in source)=0 or position(old_update in source)=0 then
  raise exception 'social_command mudou: revise os comandos de grupo antes de aplicar';
 end if;
 execute replace(replace(source,old_insert,new_insert),old_update,new_update);
end
$migration$;
-- No table grants or policies are expanded. Existing member reads and admin-only
-- group_update authorization continue to govern this property.
do $capability$
declare source text := pg_get_functiondef('private.social_snapshot(uuid)'::regprocedure);
begin
 if position('group_competition_available' in source)>0 then return; end if;
 if position($needle$'groups',(select$needle$ in source)=0 then raise exception 'social_snapshot mudou: revise a capacidade de grupos'; end if;
 execute replace(source,$needle$'groups',(select$needle$,$replacement$'group_competition_available',true,'groups',(select$replacement$);
end
$capability$;
commit;
