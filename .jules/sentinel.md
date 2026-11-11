## 2024-11-11 - Search Path Hijacking in migrations
**Vulnerability:** Several SECURITY DEFINER functions in Supabase migrations did not have an empty search_path or included public in the search path.
**Learning:** SECURITY DEFINER functions run with the privileges of the owner. If the search_path is not restricted (e.g. SET search_path = ''), malicious users can create objects (like functions or operators) in schemas like public that are earlier in the search path than pg_catalog, potentially executing arbitrary code with elevated privileges (CVE-2018-1058).
**Prevention:** Always explicitly set search_path = '' for SECURITY DEFINER functions in PostgreSQL migrations.
