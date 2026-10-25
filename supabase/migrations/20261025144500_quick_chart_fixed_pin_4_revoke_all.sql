-- Fixed 4-digit access PIN. Old rotating 2-digit codes are never read.
CREATE TABLE IF NOT EXISTS public.quick_chart_pair_security (
  owner_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  pin_hash text NOT NULL,
  pin_salt text NOT NULL,
  authorization_version bigint NOT NULL DEFAULT 1 CHECK (authorization_version > 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.quick_chart_pair_security ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.quick_chart_pair_security FROM PUBLIC,anon,authenticated;
GRANT ALL ON public.quick_chart_pair_security TO service_role;
ALTER TABLE public.quick_chart_pair_requests
 ADD COLUMN IF NOT EXISTS authorization_version bigint NOT NULL DEFAULT 0;
ALTER TABLE public.quick_chart_pair_requests
 ADD COLUMN IF NOT EXISTS client_label text;

-- Changing the code atomically invalidates every old approval.
CREATE OR REPLACE FUNCTION public.quick_chart_set_fixed_pin(
 p_owner uuid, p_hash text, p_salt text
) RETURNS bigint
LANGUAGE plpgsql SECURITY INVOKER SET search_path=''
AS $$
DECLARE result_version bigint;
BEGIN
  IF p_owner IS NULL OR length(p_hash)<>64 OR length(p_salt)<>32 THEN
    RAISE EXCEPTION 'Invalid PIN digest';
  END IF;
  INSERT INTO public.quick_chart_pair_security AS sec
     (owner_id,pin_hash,pin_salt,authorization_version,updated_at)
  VALUES (p_owner,p_hash,p_salt,1,clock_timestamp())
  ON CONFLICT (owner_id) DO UPDATE
    SET pin_hash=EXCLUDED.pin_hash,pin_salt=EXCLUDED.pin_salt,
        authorization_version=sec.authorization_version+1,
        updated_at=clock_timestamp()
  RETURNING authorization_version INTO result_version;
  DELETE FROM public.quick_chart_pair_requests WHERE owner_id=p_owner;
  RETURN result_version;
END;
$$;

-- Revoke every PC access and pending request without signing the owner out.
CREATE OR REPLACE FUNCTION public.quick_chart_revoke_all_access(p_owner uuid)
 RETURNS bigint LANGUAGE plpgsql SECURITY INVOKER SET search_path=''
AS $$
DECLARE result_version bigint;
BEGIN
  UPDATE public.quick_chart_pair_security
    SET authorization_version=authorization_version+1, updated_at=clock_timestamp()
    WHERE owner_id=p_owner
    RETURNING authorization_version INTO result_version;
  IF result_version IS NULL THEN
    RAISE EXCEPTION 'PIN not configured';
  END IF;
  DELETE FROM public.quick_chart_pair_requests WHERE owner_id=p_owner;
  RETURN result_version;
END;
$$;
REVOKE ALL ON FUNCTION public.quick_chart_set_fixed_pin(uuid,text,text) FROM PUBLIC,anon,authenticated;
REVOKE ALL ON FUNCTION public.quick_chart_revoke_all_access(uuid) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.quick_chart_set_fixed_pin(uuid,text,text) TO service_role;
GRANT EXECUTE ON FUNCTION public.quick_chart_revoke_all_access(uuid) TO service_role;
