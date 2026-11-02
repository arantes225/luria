-- Painel "Agência TRAUBE" (página /editorial/): posts, atividade e configuração.
-- Acesso somente para administradores (public.is_admin()).

CREATE TABLE IF NOT EXISTS public.agencia_posts (
  id text PRIMARY KEY,
  titulo text NOT NULL,
  rede text NOT NULL CHECK (rede IN ('instagram','tiktok')),
  formato text NOT NULL CHECK (formato IN ('reel','carrossel','feed','video')),
  coluna text NOT NULL DEFAULT 'ideia' CHECK (coluna IN ('ideia','redacao','revisao','aprovado','agendado','descartado')),
  data date,
  pilar text,
  gancho text,
  legenda text,
  slides jsonb NOT NULL DEFAULT '[]'::jsonb,
  roteiro text,
  referencias jsonb NOT NULL DEFAULT '[]'::jsonb,
  medico text NOT NULL DEFAULT 'nao-se-aplica',
  marca text NOT NULL DEFAULT 'pendente' CHECK (marca IN ('pendente','aprovada','ajustes')),
  notas_marca text,
  notas_medico text,
  notas_ajuste text,
  criado_por text,
  teste boolean NOT NULL DEFAULT false,
  aprovado_em timestamptz,
  agendado_em timestamptz,
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.agencia_atividade (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  quem text NOT NULL,
  acao text NOT NULL,
  titulo text,
  em timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.agencia_config (
  id text PRIMARY KEY,
  ultima_rodada timestamptz,
  observacao text
);

ALTER TABLE public.agencia_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencia_atividade ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agencia_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam agencia_posts" ON public.agencia_posts
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins gerenciam agencia_atividade" ON public.agencia_atividade
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins gerenciam agencia_config" ON public.agencia_config
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

REVOKE ALL ON public.agencia_posts, public.agencia_atividade, public.agencia_config FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agencia_posts, public.agencia_atividade, public.agencia_config TO authenticated;
