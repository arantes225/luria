-- Applied to LURIA production by Supabase migration 20261026043517.
-- Marketing asset read access stays public; mutations require the existing
-- server-checked administrator function instead of any authenticated session.

ALTER POLICY "Admins can upload to marketing_videos_temp"
  ON storage.objects TO authenticated
  WITH CHECK (bucket_id = 'marketing_videos_temp' AND public.is_admin());

ALTER POLICY "Admins can update marketing_videos_temp"
  ON storage.objects TO authenticated
  USING (bucket_id = 'marketing_videos_temp' AND public.is_admin())
  WITH CHECK (bucket_id = 'marketing_videos_temp' AND public.is_admin());

ALTER POLICY "Admins can delete from marketing_videos_temp"
  ON storage.objects TO authenticated
  USING (bucket_id = 'marketing_videos_temp' AND public.is_admin());
