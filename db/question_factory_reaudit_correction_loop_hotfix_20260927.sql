-- Etapa 6 concluída com falhas deve voltar para Etapa 5.
-- Corrige o caso em que a existência de qualquer perplexity_reaudit mantinha
-- o bloco preso em perplexity_reaudit mesmo depois de toda a cobertura atual
-- ter sido concluída com needs_revision/rejected.
--
-- Ordem correta:
-- 1) se versões corrigidas ainda aguardam reauditoria, permanecer na etapa 6;
-- 2) se a reauditoria atual terminou com falhas sem julgamento, voltar para adjudicação;
-- 3) se já há patch autorizado, aplicar correção;
-- 4) só então permanecer/avançar a partir da reauditoria.

do $$
declare
  fn text;
  old_chunk text;
  new_chunk text;
begin
  select pg_get_functiondef(p.oid)
    into fn
  from pg_proc p
  join pg_namespace n on n.oid = p.pronamespace
  where n.nspname='public'
    and p.proname='admin_question_factory_block_tracker'
    and pg_get_function_identity_arguments(p.oid)='';

  if fn is null then
    raise exception 'admin_question_factory_block_tracker() not found';
  end if;

  old_chunk := $old$
        -- Once a reauditoria has started, never regress the workflow to adjudication.
        -- This is important for resumed/imported runs: the reaudit is evidence that
        -- stages 5/6 already progressed even if an older adjudication receipt is absent.
        when coalesce(s.valid_reaudit_count,0)>0
             and coalesce(s.machine_approved_count,0)>=coalesce(bb.target_size,200)
             and bb.human_review_status='approved' then 'block_complete'
        when coalesce(s.valid_reaudit_count,0)>0
             and coalesce(s.machine_approved_count,0)>=coalesce(bb.target_size,200) then 'human_review'
        when coalesce(s.valid_reaudit_count,0)>0 then 'perplexity_reaudit'
        when coalesce(s.adjudication_pending_count,0)>0 then 'chatgpt_adjudication'
        when coalesce(s.correction_pending_count,0)>0 then 'chatgpt_correction'
        when coalesce(s.corrected_waiting_reaudit_count,0)>0 then 'perplexity_reaudit'
$old$;

  new_chunk := $new$
        -- A reaudit can loop back to stage 5. While corrected current versions are
        -- still waiting for their blind confirmation, remain in stage 6. Once that
        -- queue is drained, any failed reaudit without adjudication must return to
        -- ChatGPT for a new adjudication/correction cycle.
        when coalesce(s.valid_reaudit_count,0)>0
             and coalesce(s.machine_approved_count,0)>=coalesce(bb.target_size,200)
             and bb.human_review_status='approved' then 'block_complete'
        when coalesce(s.valid_reaudit_count,0)>0
             and coalesce(s.machine_approved_count,0)>=coalesce(bb.target_size,200) then 'human_review'
        when coalesce(s.corrected_waiting_reaudit_count,0)>0 then 'perplexity_reaudit'
        when coalesce(s.adjudication_pending_count,0)>0 then 'chatgpt_adjudication'
        when coalesce(s.correction_pending_count,0)>0 then 'chatgpt_correction'
        when coalesce(s.valid_reaudit_count,0)>0 then 'perplexity_reaudit'
$new$;

  if position(old_chunk in fn)=0 then
    raise exception 'expected tracker flow chunk not found; migration aborted';
  end if;

  fn := replace(fn, old_chunk, new_chunk);
  execute fn;
end $$;
