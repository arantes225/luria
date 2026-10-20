-- Remove legacy auto-matched associations while keeping all question content.
-- External imported question sets have a source_file_name; official sets do not.
update public.question_items as item
set question_bank_id = null
from public.question_sets as set_record
where set_record.id = item.set_id
  and set_record.source_file_name is not null
  and item.question_bank_id is not null;
