-- Applied to TRAUBE production in migration 20261026045644.
-- Before: any authenticated user could read, create, alter or delete marketing campaign records.
-- After: only administrators can manage marketing_post_assets (role AND is_admin()).
ALTER POLICY "Authenticated users can manage marketing_post_assets"
  ON public.marketing_post_assets
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());
