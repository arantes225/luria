-- PREPARADO, NAO APLICADO. Revisar antes de rodar em producao (Studyos).
-- Objetivo: leitura de protocolos clinicos, midia clinica e receitas somente com login.
-- Decisao do Luiz em 2026-11-01. Cadastro hoje e por link ate conectar o Asaas.

begin;

-- clinical_protocols e recipe_bank ja possuem politica separada para 'authenticated' (qual = true).
drop policy if exists clinical_protocols_anon_read on public.clinical_protocols;
drop policy if exists recipe_bank_anon_read on public.recipe_bank;

-- clinical_media tem uma unica politica para {anon, authenticated}: restringir ao papel authenticated.
alter policy clinical_media_public_read on public.clinical_media to authenticated;

commit;

-- ROLLBACK (se algo quebrar):
-- create policy clinical_protocols_anon_read on public.clinical_protocols for select to anon using (true);
-- create policy recipe_bank_anon_read on public.recipe_bank for select to anon using (true);
-- alter policy clinical_media_public_read on public.clinical_media to anon, authenticated;
--
-- VERIFICACAO apos aplicar (rodar como anon, deve voltar 0 linhas):
-- select count(*) from public.clinical_protocols;
-- select count(*) from public.recipe_bank;
-- select count(*) from public.clinical_media;
