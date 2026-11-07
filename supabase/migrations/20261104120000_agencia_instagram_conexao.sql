-- Conexão do Instagram da Agência TRAUBE (login do Instagram, sem copiar token).
-- O token fica só em agencia_instagram_conexao: RLS ligada, sem nenhuma policy e sem GRANT para anon/authenticated.
-- Só as Edge Functions (service_role) leem e gravam. O painel enxerga apenas o status, por função com checagem de admin.

CREATE TABLE IF NOT EXISTS public.agencia_instagram_conexao (
  id text PRIMARY KEY DEFAULT 'principal' CHECK (id = 'principal'),
  ig_user_id text NOT NULL,
  username text,
  access_token text NOT NULL,
  expira_em timestamptz NOT NULL,
  escopos text,
  conectado_em timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.agencia_instagram_conexao ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.agencia_instagram_conexao FROM PUBLIC, anon, authenticated;

-- "state" do login: criado só por admin, vale 10 minutos e uma única vez (consumido pela Edge Function).
CREATE TABLE IF NOT EXISTS public.agencia_instagram_estado (
  state text PRIMARY KEY,
  criado_em timestamptz NOT NULL DEFAULT now(),
  usado boolean NOT NULL DEFAULT false
);
ALTER TABLE public.agencia_instagram_estado ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.agencia_instagram_estado FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.agencia_instagram_iniciar()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE v text;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso restrito a administradores' USING ERRCODE = '42501';
  END IF;
  DELETE FROM public.agencia_instagram_estado WHERE criado_em < now() - interval '1 day';
  v := replace(gen_random_uuid()::text, '-', '') || replace(gen_random_uuid()::text, '-', '');
  INSERT INTO public.agencia_instagram_estado (state) VALUES (v);
  RETURN v;
END;
$$;

CREATE OR REPLACE FUNCTION public.agencia_instagram_status()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE c public.agencia_instagram_conexao;
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso restrito a administradores' USING ERRCODE = '42501';
  END IF;
  SELECT * INTO c FROM public.agencia_instagram_conexao WHERE id = 'principal';
  IF NOT FOUND THEN
    RETURN jsonb_build_object('conectado', false);
  END IF;
  RETURN jsonb_build_object('conectado', c.expira_em > now(), 'expirado', c.expira_em <= now(),
                            'username', c.username, 'expira_em', c.expira_em, 'conectado_em', c.conectado_em);
END;
$$;

CREATE OR REPLACE FUNCTION public.agencia_instagram_desconectar()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'Acesso restrito a administradores' USING ERRCODE = '42501';
  END IF;
  DELETE FROM public.agencia_instagram_conexao WHERE id = 'principal';
END;
$$;

REVOKE ALL ON FUNCTION public.agencia_instagram_iniciar() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.agencia_instagram_status() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.agencia_instagram_desconectar() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.agencia_instagram_iniciar() TO authenticated;
GRANT EXECUTE ON FUNCTION public.agencia_instagram_status() TO authenticated;
GRANT EXECUTE ON FUNCTION public.agencia_instagram_desconectar() TO authenticated;
-- As três funções recusam quem não é admin (is_admin()), mesmo que um usuário comum consiga chamá-las.

-- ROLLBACK:
--   drop function if exists public.agencia_instagram_iniciar(), public.agencia_instagram_status(), public.agencia_instagram_desconectar();
--   drop table if exists public.agencia_instagram_estado, public.agencia_instagram_conexao;
