-- Pré-lista da landing (resibulando.online).
-- Visitante anônimo só consegue ENTRAR na lista pela função join_landing_prelista();
-- não lê, não altera e não descobre se um e-mail já existe.
-- Somente administradores (public.is_admin()) leem e removem inscrições (pedido LGPD).
-- NÃO APLICAR sem autorização explícita do Luiz (regra 6 do CLAUDE.md).

do $guard$
begin
  if to_regprocedure('public.is_admin()') is null then
    raise exception 'public.is_admin() precisa existir antes desta migração';
  end if;
end
$guard$;

create table if not exists public.landing_prelista (
  id           bigint generated always as identity primary key,
  nome         text        not null check (char_length(btrim(nome)) between 2 and 120),
  email        text        not null check (char_length(email) between 6 and 254),
  email_norm   text        generated always as (lower(btrim(email))) stored,
  fase         text        check (fase is null or fase in ('ciclo_basico', 'ciclo_clinico', 'internato', 'formado')),
  origem       text        not null default 'landing' check (char_length(origem) between 1 and 40),
  consentimento boolean    not null check (consentimento),
  created_at   timestamptz not null default now(),
  constraint landing_prelista_email_formato check (email_norm ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint landing_prelista_email_unico unique (email_norm)
);

comment on table public.landing_prelista is 'Inscrições da pré-lista da landing. Dados pessoais (nome, e-mail): acesso só de administradores.';

create index if not exists landing_prelista_created_at_idx on public.landing_prelista (created_at desc);

alter table public.landing_prelista enable row level security;

-- Ninguém acessa a tabela diretamente, exceto o que as políticas abaixo liberam.
revoke all on public.landing_prelista from anon, authenticated;
grant select, delete on public.landing_prelista to authenticated;

-- A sequência da identity também não fica acessível a anon/authenticated.
do $seq$
declare v_seq text := pg_get_serial_sequence('public.landing_prelista', 'id');
begin
  if v_seq is not null then
    execute format('revoke all on sequence %s from anon, authenticated', v_seq);
  end if;
end
$seq$;

drop policy if exists landing_prelista_admin_select on public.landing_prelista;
create policy landing_prelista_admin_select on public.landing_prelista
  for select to authenticated
  using (public.is_admin());

drop policy if exists landing_prelista_admin_delete on public.landing_prelista;
create policy landing_prelista_admin_delete on public.landing_prelista
  for delete to authenticated
  using (public.is_admin());

-- Entrada pública na pré-lista. Sempre responde a mesma coisa para e-mail novo ou repetido
-- (sem enumeração). Valida tudo no servidor e tem um freio simples contra robôs.
create or replace function public.join_landing_prelista(
  p_nome text,
  p_email text,
  p_fase text default null,
  p_origem text default 'landing',
  p_consentimento boolean default false
)
returns jsonb
language plpgsql
security definer
set search_path to ''
as $function$
declare
  v_nome   text := btrim(coalesce(p_nome, ''));
  v_email  text := lower(btrim(coalesce(p_email, '')));
  v_fase   text := nullif(btrim(coalesce(p_fase, '')), '');
  v_origem text := left(coalesce(nullif(btrim(coalesce(p_origem, '')), ''), 'landing'), 40);
  v_recent integer;
begin
  if coalesce(p_consentimento, false) is not true then
    raise exception 'consentimento_obrigatorio' using errcode = '22023';
  end if;

  if char_length(v_nome) < 2 or char_length(v_nome) > 120 then
    raise exception 'nome_invalido' using errcode = '22023';
  end if;

  if char_length(v_email) < 6 or char_length(v_email) > 254
     or v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'email_invalido' using errcode = '22023';
  end if;

  if v_fase is not null and v_fase not in ('ciclo_basico', 'ciclo_clinico', 'internato', 'formado') then
    v_fase := null;
  end if;

  -- Freio global contra envio em massa: no máximo 30 inscrições por minuto.
  -- (Limite por IP ficaria numa Edge Function/Turnstile na frente da RPC; não incluído aqui.)
  select count(*) into v_recent
    from public.landing_prelista
   where created_at > now() - interval '1 minute';
  if v_recent >= 30 then
    raise exception 'muitas_tentativas' using errcode = '53400';
  end if;

  insert into public.landing_prelista (nome, email, fase, origem, consentimento)
  values (v_nome, v_email, v_fase, v_origem, true)
  on conflict (email_norm) do nothing;

  return jsonb_build_object('ok', true);
end;
$function$;

revoke all on function public.join_landing_prelista(text, text, text, text, boolean) from public;
grant execute on function public.join_landing_prelista(text, text, text, text, boolean) to anon, authenticated;
