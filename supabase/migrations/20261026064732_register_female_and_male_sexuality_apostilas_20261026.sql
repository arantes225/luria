-- Applied in TRAUBE production as migration 20261026064732.
-- The Apostilas hub reads public.apostilas at runtime; these two existing
-- independent public books had not been registered in that catalog.
INSERT INTO public.apostilas (area,materia,tema,titulo,cover_key,content_url,is_published)
SELECT v.area,v.materia,v.tema,v.titulo,v.cover_key,v.content_url,true
FROM (VALUES
 ('Ginecologia e Obstetrícia','Ginecologia','Medicina Sexual · Sexualidade Feminina',
  'Sexualidade Feminina','ginecologia_obstetricia','/apostilas/sexualidade/'),
 ('Cirurgia Geral','Urologia','Medicina Sexual · Sexualidade Masculina',
  'Sexualidade Masculina','cirurgia_geral','/apostilas/sexualidade-masculina/')
) AS v(area,materia,tema,titulo,cover_key,content_url)
WHERE NOT EXISTS (
 SELECT 1 FROM public.apostilas a WHERE a.content_url=v.content_url
);
