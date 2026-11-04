-- Agendador do painel Agência TRAUBE (etapa 1: modo simulação, sem chamar a Meta).
-- Acesso: o painel (admin) agenda; só a Edge Function agencia-publicar, com service_role, reserva e publica.

ALTER TABLE public.agencia_posts
  ADD COLUMN IF NOT EXISTS publicar_em timestamptz,
  ADD COLUMN IF NOT EXISTS status_publicacao text NOT NULL DEFAULT 'nao_agendado',
  ADD COLUMN IF NOT EXISTS midia jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS publicacao_id text,
  ADD COLUMN IF NOT EXISTS publicacao_url text,
  ADD COLUMN IF NOT EXISTS publicacao_erro text,
  ADD COLUMN IF NOT EXISTS publicado_em timestamptz;

ALTER TABLE public.agencia_posts DROP CONSTRAINT IF EXISTS agencia_posts_status_publicacao_check;
ALTER TABLE public.agencia_posts ADD CONSTRAINT agencia_posts_status_publicacao_check
  CHECK (status_publicacao IN ('nao_agendado','agendado','publicando','publicado','simulado','erro'));

-- Um post só pode estar "agendado" para publicar se tiver data, marca aprovada e estiver na coluna Agendado.
ALTER TABLE public.agencia_posts DROP CONSTRAINT IF EXISTS agencia_posts_agendamento_valido;
ALTER TABLE public.agencia_posts ADD CONSTRAINT agencia_posts_agendamento_valido
  CHECK (status_publicacao <> 'agendado' OR (publicar_em IS NOT NULL AND marca = 'aprovada' AND coluna = 'agendado'));

CREATE TABLE IF NOT EXISTS public.agencia_publicacao_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  post_id text NOT NULL,
  em timestamptz NOT NULL DEFAULT now(),
  nivel text NOT NULL DEFAULT 'info' CHECK (nivel IN ('info','erro')),
  msg text NOT NULL
);
CREATE INDEX IF NOT EXISTS agencia_publicacao_log_post_idx ON public.agencia_publicacao_log (post_id, em DESC);

ALTER TABLE public.agencia_publicacao_log ENABLE ROW LEVEL SECURITY;
-- Admin só lê. Quem grava é a função (service_role ignora RLS).
CREATE POLICY "Admins leem agencia_publicacao_log" ON public.agencia_publicacao_log
  FOR SELECT TO authenticated USING (public.is_admin());
REVOKE ALL ON public.agencia_publicacao_log FROM anon, authenticated;
GRANT SELECT ON public.agencia_publicacao_log TO authenticated;

-- Reserva atômica dos posts vencidos: nunca entrega o mesmo post duas vezes.
-- Posts "publicando" há mais de 30 min viram "erro" (sem nova tentativa automática).
CREATE OR REPLACE FUNCTION public.agencia_reservar_publicacoes(p_limite integer DEFAULT 5)
RETURNS SETOF public.agencia_posts
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  UPDATE public.agencia_posts
     SET status_publicacao = 'erro',
         publicacao_erro = 'A publicação ficou presa por mais de 30 minutos e não foi repetida. Confira no Instagram antes de agendar de novo.',
         atualizado_em = now()
   WHERE status_publicacao = 'publicando' AND atualizado_em < now() - interval '30 minutes';

  RETURN QUERY
  WITH vencidos AS (
    SELECT id FROM public.agencia_posts
     WHERE status_publicacao = 'agendado'
       AND coluna = 'agendado'
       AND marca = 'aprovada'
       AND teste = false
       AND publicar_em <= now()
     ORDER BY publicar_em
     LIMIT greatest(1, least(coalesce(p_limite, 5), 10))
     FOR UPDATE SKIP LOCKED
  )
  UPDATE public.agencia_posts p
     SET status_publicacao = 'publicando', atualizado_em = now()
    FROM vencidos v
   WHERE p.id = v.id
  RETURNING p.*;
END;
$$;
REVOKE ALL ON FUNCTION public.agencia_reservar_publicacoes(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.agencia_reservar_publicacoes(integer) TO service_role;

-- AGENDAMENTO A CADA 5 MINUTOS (NÃO executado por esta migração; fazer só na etapa de ativação):
--   1) Guardar o segredo no Vault do Supabase:  select vault.create_secret('<AGENCIA_CRON_SECRET>', 'agencia_cron_secret');
--   2) select cron.schedule('agencia-publicar', '*/5 * * * *', $$
--        select net.http_post(
--          url := 'https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/agencia-publicar',
--          headers := jsonb_build_object('x-agencia-secret', (select decrypted_secret from vault.decrypted_secrets where name='agencia_cron_secret')),
--          body := '{}'::jsonb) $$);
--   Para desligar:  select cron.unschedule('agencia-publicar');
-- ROLLBACK desta migração:
--   drop function if exists public.agencia_reservar_publicacoes(integer);
--   drop table if exists public.agencia_publicacao_log;
--   alter table public.agencia_posts drop constraint if exists agencia_posts_agendamento_valido, drop constraint if exists agencia_posts_status_publicacao_check,
--     drop column if exists publicar_em, drop column if exists status_publicacao, drop column if exists midia, drop column if exists publicacao_id,
--     drop column if exists publicacao_url, drop column if exists publicacao_erro, drop column if exists publicado_em;
