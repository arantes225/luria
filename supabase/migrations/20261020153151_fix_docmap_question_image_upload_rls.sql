-- Fix question-PDF image imports failing with 42501 on storage.objects.
-- Storage may INSERT an object before image-size metadata is populated.
-- The docmap bucket now enforces the same 80 KiB ceiling at the Storage API.
update storage.buckets
set file_size_limit = 81920
where id = 'docmap';

drop policy if exists luria_image_size_cap_insert on storage.objects;
create policy luria_image_size_cap_insert on storage.objects as restrictive
for insert to authenticated
with check (
  bucket_id = 'docmap'
  or bucket_id not in ('apostila-media','docmap','docmap-assets','flashcard-media','study-room-attachments')
  or (
    coalesce(metadata->>'mimetype','') not like 'image/%'
    and lower(name) !~ '\.(avif|gif|jpe?g|png|svg|webp|bmp|tiff?)$'
  )
  or (
    coalesce(metadata->>'size','') ~ '^[0-9]+$'
    and (metadata->>'size')::bigint <= 81920
  )
);

drop policy if exists luria_image_size_cap_update on storage.objects;
create policy luria_image_size_cap_update on storage.objects as restrictive
for update to authenticated
using (
  bucket_id = 'docmap'
  or bucket_id not in ('apostila-media','docmap','docmap-assets','flashcard-media','study-room-attachments')
  or (
    coalesce(metadata->>'mimetype','') not like 'image/%'
    and lower(name) !~ '\.(avif|gif|jpe?g|png|svg|webp|bmp|tiff?)$'
  )
  or (
    coalesce(metadata->>'size','') ~ '^[0-9]+$'
    and (metadata->>'size')::bigint <= 81920
  )
)
with check (
  bucket_id = 'docmap'
  or bucket_id not in ('apostila-media','docmap','docmap-assets','flashcard-media','study-room-attachments')
  or (
    coalesce(metadata->>'mimetype','') not like 'image/%'
    and lower(name) !~ '\.(avif|gif|jpe?g|png|svg|webp|bmp|tiff?)$'
  )
  or (
    coalesce(metadata->>'size','') ~ '^[0-9]+$'
    and (metadata->>'size')::bigint <= 81920
  )
);
