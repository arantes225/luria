-- O mesmo vídeo serve para Instagram (Reel) e TikTok: um post de vídeo pode ter rede = 'ambas'.
ALTER TABLE public.agencia_posts DROP CONSTRAINT IF EXISTS agencia_posts_rede_check;
ALTER TABLE public.agencia_posts
  ADD CONSTRAINT agencia_posts_rede_check CHECK (rede IN ('instagram','tiktok','ambas'));

-- Vídeos ativos (não exemplos) passam a valer para as duas redes.
UPDATE public.agencia_posts
   SET rede = 'ambas', formato = 'video', atualizado_em = now()
 WHERE formato IN ('video','reel')
   AND teste = false
   AND coluna <> 'descartado'
   AND rede <> 'ambas';
