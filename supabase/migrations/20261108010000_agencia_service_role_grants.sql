-- As Edge Functions da Agência (publicador e callback do Instagram) usam service_role,
-- que estava sem nenhum privilégio nas tabelas: o bypass de RLS não dispensa o GRANT.
-- Sintoma: o callback devolvia "estado-invalido" porque não conseguia marcar o state como usado.
-- Privilégios mínimos, só para o que as funções realmente fazem.
GRANT SELECT, INSERT, UPDATE ON public.agencia_instagram_estado TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.agencia_instagram_conexao TO service_role;
GRANT SELECT, UPDATE ON public.agencia_posts TO service_role;
GRANT INSERT ON public.agencia_publicacao_log TO service_role;
GRANT INSERT ON public.agencia_atividade TO service_role;

-- ROLLBACK:
--   REVOKE ALL ON public.agencia_instagram_estado, public.agencia_instagram_conexao, public.agencia_posts,
--     public.agencia_publicacao_log, public.agencia_atividade FROM service_role;
