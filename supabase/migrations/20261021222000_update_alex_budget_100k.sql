-- Atualização da cota diária do Professor Alex para 100.000 tokens
update private.professor_alex_token_settings
set daily_token_budget = 100000,
    updated_at = now()
where id = true;
