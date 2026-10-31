-- ==============================================================================
-- TRAUBE MARKETING VIDEO STAGING & AUTO-CLEANUP (0 MB STORAGE FOOTPRINT)
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'marketing_videos_temp',
  'marketing_videos_temp',
  true,
  104857600,
  ARRAY['video/mp4', 'video/webm', 'video/quicktime', 'image/png', 'image/jpeg']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 104857600;

CREATE TABLE IF NOT EXISTS public.marketing_post_assets (
  post_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  scheduled_date TEXT,
  video_prompt TEXT,
  audio_prompt TEXT,
  caption_prompt TEXT,
  video_storage_path TEXT,
  video_public_url TEXT,
  video_filename TEXT,
  video_uploaded_at TIMESTAMPTZ,
  meta_ads_status TEXT DEFAULT 'aguardando_video',
  meta_campaign_id TEXT,
  published_at TIMESTAMPTZ,
  cleaned_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.marketing_post_assets ENABLE ROW LEVEL SECURITY;
