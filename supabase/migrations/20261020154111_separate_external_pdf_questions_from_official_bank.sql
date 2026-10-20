-- Keep personal PDF imports fully independent from the official question bank.
-- The prior trigger looked up every inserted stem in question_bank with the
-- caller's privileges. This caused 42501 and could auto-link external questions.
-- Official list creation already supplies IDs and taxonomy through its RPC.
create or replace function public.question_items_fill_taxonomy()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.question_bank_id is not null and exists (
    select 1
    from public.question_sets as s
    where s.id = new.set_id
      and s.source_file_name is not null
  ) then
    new.question_bank_id := null;
  end if;

  -- No text-based linking to question_bank. Preserve independent imported tags.
  return new;
end;
$$;

comment on function public.question_items_fill_taxonomy() is
  'Preserves independent external PDF imports; only explicitly linked official lists retain question_bank_id. Never links by stem.';
