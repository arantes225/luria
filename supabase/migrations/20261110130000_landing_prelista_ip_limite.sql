-- Pré-lista: 1 inscrição por rede (IP) e validação mais rígida contra abuso/injeção.
-- O IP NÃO é guardado: só um código pseudonimizado (SHA-256 de sal secreto + IP; o sal
-- fica no schema private, fora da API). Aplicada com autorização do Luiz (2026-11-10).

-- Segredo para o código do IP (gerado no banco; não aparece no repositório).
create table if not exists private.landing_prelista_segredo (
  id   smallint primary key default 1 check (id = 1),
  sal  text not null
);
alter table private.landing_prelista_segredo enable row level security;
revoke all on private.landing_prelista_segredo from public, anon, authenticated;
insert into private.landing_prelista_segredo (id, sal)
values (1, replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''))
on conflict (id) do nothing;

alter table public.landing_prelista add column if not exists ip_hash text;
create unique index if not exists landing_prelista_ip_hash_unico
  on public.landing_prelista (ip_hash) where ip_hash is not null;
comment on column public.landing_prelista.ip_hash is 'Código pseudonimizado da rede de origem (SHA-256 de sal secreto + IP). Usado só para limitar 1 inscrição por rede.';

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
  v_nome    text := regexp_replace(btrim(coalesce(p_nome, '')), '\s+', ' ', 'g');
  v_email   text := lower(btrim(coalesce(p_email, '')));
  v_fase    text := nullif(btrim(coalesce(p_fase, '')), '');
  v_origem  text := lower(btrim(coalesce(p_origem, '')));
  v_headers json;
  v_ip      text;
  v_ip_hash text;
  v_sal     text;
  v_recent  integer;
begin
  if coalesce(p_consentimento, false) is not true then
    raise exception 'consentimento_obrigatorio' using errcode = '22023';
  end if;

  -- Nome: 2 a 120 caracteres, só letras (com acento), espaço, ponto, apóstrofo e hífen.
  if char_length(v_nome) < 2 or char_length(v_nome) > 120
     or v_nome !~ '^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ .''-]*$' then
    raise exception 'nome_invalido' using errcode = '22023';
  end if;

  -- E-mail: formato simples, sem espaços nem caracteres de controle/marcação.
  if char_length(v_email) < 6 or char_length(v_email) > 254
     or v_email !~ '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,24}$' then
    raise exception 'email_invalido' using errcode = '22023';
  end if;

  if v_fase is not null and v_fase not in ('ciclo_basico', 'ciclo_clinico', 'internato', 'formado') then
    v_fase := null;
  end if;

  if v_origem !~ '^[a-z0-9-]{1,40}$' then
    v_origem := 'landing';
  end if;

  -- IP do visitante. Só cabeçalhos definidos pela borda (Cloudflare/Supabase);
  -- x-forwarded-for é ignorado porque o cliente consegue forjar o primeiro item.
  begin
    v_headers := nullif(current_setting('request.headers', true), '')::json;
  exception when others then
    v_headers := null;
  end;
  v_ip := btrim(coalesce(
    v_headers ->> 'cf-connecting-ip',
    v_headers ->> 'x-real-ip',
    ''
  ));
  if v_ip = '' or char_length(v_ip) > 45 or v_ip !~ '^[0-9a-fA-F:.]+$' then
    v_ip := null;
  end if;

  if v_ip is not null then
    select sal into v_sal from private.landing_prelista_segredo where id = 1;
    v_ip_hash := encode(sha256(convert_to(v_sal || '|' || lower(v_ip), 'UTF8')), 'hex');
    -- Rede já usada: mesma resposta para qualquer e-mail (não revela quem está na lista).
    if exists (select 1 from public.landing_prelista where ip_hash = v_ip_hash) then
      raise exception 'ip_ja_inscrito' using errcode = '23505';
    end if;
  end if;

  -- E-mail já inscrito (de outra rede): responde ok sem gravar de novo.
  if exists (select 1 from public.landing_prelista where email_norm = v_email) then
    return jsonb_build_object('ok', true);
  end if;

  -- Freio global contra envio em massa: no máximo 30 inscrições por minuto.
  select count(*) into v_recent
    from public.landing_prelista
   where created_at > now() - interval '1 minute';
  if v_recent >= 30 then
    raise exception 'muitas_tentativas' using errcode = '53400';
  end if;

  begin
    insert into public.landing_prelista (nome, email, fase, origem, consentimento, ip_hash)
    values (v_nome, v_email, v_fase, v_origem, true, v_ip_hash);
  exception when unique_violation then
    -- Corrida entre dois envios: e-mail já gravado => ok; rede já usada => recusa.
    if exists (select 1 from public.landing_prelista where email_norm = v_email) then
      return jsonb_build_object('ok', true);
    end if;
    raise exception 'ip_ja_inscrito' using errcode = '23505';
  end;

  return jsonb_build_object('ok', true);
end;
$function$;

revoke all on function public.join_landing_prelista(text, text, text, text, boolean) from public;
grant execute on function public.join_landing_prelista(text, text, text, text, boolean) to anon, authenticated;
