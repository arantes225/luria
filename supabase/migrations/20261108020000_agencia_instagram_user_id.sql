-- O callback (service_role) lê o ID da conta do Instagram configurado como reserva.
GRANT SELECT ON public.agencia_config TO service_role;
INSERT INTO public.agencia_config (id, observacao) VALUES ('instagram_user_id', '17841451074000208')
ON CONFLICT (id) DO UPDATE SET observacao = EXCLUDED.observacao;
-- rollback: REVOKE SELECT ON public.agencia_config FROM service_role; DELETE FROM public.agencia_config WHERE id = 'instagram_user_id';
