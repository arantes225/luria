-- LURIA / Bulário / Lote 14 (medicamentos 651–700), 2026-10-16
-- Triagem estrutural de segurança/formulações, não valida cientificamente doses.
-- Idempotência/concorrrência: preserva fichas que já tenham data.quality_audit.
WITH items(id,priority,clinical_area,action_required,prescription_copy_blocked) AS (
 VALUES
(633,'P0','Clínica/Dor','Dexketoprofeno reúne comprimido oral 25 mg e solução injetável 50 mg/2 mL em uma única formulação sem fonte. Separar vias, posologias, contraindicações hemorrágicas e ajuste renal.',true),
(634,'P1','Endocrinologia/Osteoporose','Risedronato contém forças 5/30/35/75/150 mg sob um único rótulo, sem fonte. Conferir esquemas diários, semanais ou mensais por produto, esôfago e função renal.',false),
(638,'P1','Clínica/Reumatologia','Etoricoxibe 60/90/120 mg sem fonte individual. Validar dose e duração por indicação, riscos cardiovascular/renal/GI e contraindicações.',false),
(641,'P0','Gastroenterologia/Pediatria','Pancreatina reúne cápsulas gastrorresistentes rotuladas por 10.000/25.000/40.000 unidades de lipase sem bula específica. Conferir unidades por cápsula, peso, refeições, substituições e intervalo.',true),
(653,'P0','Infectologia/HIV/Hepatite','Tenofovir alafenamida 25 mg isolado e em combinações fixas; sem fonte específica. Distinguir de TDF (ID 701) e revisar indicações, idade/peso, interações e função renal.',true),
(656,'P1','Clínica/Reumatologia','Celecoxibe 100/200 mg sem fonte. Verificar indicação, dose máxima, duração, perfil cardiovascular, renal e hemorragia digestiva.',false),
(657,'P1','Neurologia/Parkinson','Entacapona 200 mg sem fonte. Checar administração relacionada a levodopa, hipotensão, discinesias e interações, distinguindo combinações fixas.',false),
(661,'P1','Clínica/Reumatologia','Indometacina agrupa cápsulas 25/50 mg, supositórios e outras formas com fonte e dois campos de segurança ausentes. Diferenciar vias, gestação, riscos renal/GI e indicação neonatal especializada.',false),
(663,'P1','Psiquiatria','Vortioxetina 5/10/20 mg sem fonte e com duas chaves de segurança ausentes. Validar faixa etária, titulação, interações serotoninérgicas e descontinuação.',false),
(671,'P0','Oftalmologia/Otorrino','Olopatadina consta como colírios 0,1–0,7% e spray nasal em outros mercados; sem fonte e segurança incompleta. Separar via, concentração, dose e disponibilidade.',true),
(676,'P1','Infectologia/APS','Cefditoreno 200/400 mg sem fonte e segurança incompleta. Confirmar apresentação brasileira, indicações, doses pediátricas quando aplicáveis e função renal.',false),
(678,'P1','Neurologia/Enxaqueca','Naratriptana 2,5 mg sem fonte e com dois campos ausentes. Verificar contraindicações cardiovasculares, dose por crise, intervalo de repetição e interações.',false),
(679,'P1','Urologia','Darifenacina LP 7,5/15 mg sem fonte. Conferir liberação prolongada, constipação/retenção urinária, função hepática e interações CYP.',false),
(680,'P1','Neurologia/Clínica','Tizanidina 2/4 mg sem fonte e segurança incompleta. Validar sedação, hipotensão, função hepática e interações relevantes; evitar equivalência com outros relaxantes.',false),
(684,'P0','Pneumologia/DPOC','Umeclidínio + vilanterol Ellipta 62,5/25 mcg/dose sem bula de produto. Confirmar indicação DPOC, doses reais entregues, técnica inalativa e não usar como medicação de resgate.',true),
(685,'P0','Urologia','Dutasterida + tansulosina com rótulo 0,4 mg + 0,5 mg pode estar em ordem incompatível com os componentes habituais. Confirmar força de CADA princípio ativo, composição do produto e contraindicações antes de copiar.',true),
(688,'P0','Infectologia/HIV','Emtricitabina reúne cápsula 200 mg e solução oral 10 mg/mL; sem fonte e um campo de segurança ausente. Separar dose por produto, peso/idade, função renal e combinação antirretroviral.',true),
(689,'P1','Pneumologia/Alergia','Montelucaste + levocetirizina com forças variáveis por mercado e sem bula; verificar apresentações e indicação/limites pediátricos brasileiros, segurança neuropsiquiátrica e renal.',false),
(690,'P0','Pneumologia/DPOC','Tiotrópio + olodaterol Respimat 2,5/2,5 mcg por jato sem fonte individual. Conferir número de jatos por dose, dispositivo, indicação e contraindicações; não confundir mcg/jato com mcg/dia.',true),
(693,'P0','Cardiologia/Angina','Ranolazina LP 500/1000 mg sem fonte e campos de segurança incompletos. Confirmar intervalo, QT, função renal/hepática, interações CYP e não triturar apresentação ER.',true),
(694,'P1','Clínica/Alergia','Cetirizina + pseudoefedrina LP 5/120 mg sem bula por apresentação. Revisar hipertensão, arritmias, rim, insônia e idade, sem usar dose do anti-histamínico isolado.',false),
(696,'P0','Oftalmologia/Otorrino','Azelastina spray nasal 0,1–0,15% e colírio 0,05% na mesma ficha sem fonte. Separar concentração, via, faixa etária e modo de uso.',true),
(697,'P0','Endocrinologia/Diabetes','Dapagliflozina + metformina XR, proporções múltiplas sem fonte e dois campos de segurança ausentes. Distinguir forças por componente, TFGe, cetoacidose e orientações perioperatórias.',true),
(700,'P0','GO/Contracepção','Etinilestradiol + drospirenona com esquemas 21/7 e 24/4 sem fonte. Reconciliar conteúdo por comprimido, quantidade de placebos, esquecimento, interações e risco trombótico.',true),
(703,'P1','Pneumologia/DPOC','Roflumilaste 500 mcg e 250 mcg para titulação em certos produtos sem fonte. Validar indicação, perda ponderal, efeitos psiquiátricos e função hepática.',false),
(706,'P1','Psiquiatria','Desvenlafaxina LP 50/100 mg sem bula específica e segurança incompleta. Conferir ajuste renal, pressão arterial, retirada gradual e interações.',false),
(712,'P0','Neurologia/Parkinson','Rotigotina adesivos 1–8 mg/24 h sem fonte individual. Distinguir potência liberada por 24h de conteúdo total, indicação, titulação e retirada segura.',true),
(713,'P0','Reumatologia/Gastroenterologia','Adalimumabe inclui canetas 40 mg com volumes 0,4/0,8 mL e doses pediátricas menores sem fonte. Confirmar dispositivo/biossimilar, peso, intervalos, vacinas e triagem de TB/HBV.',true),
(714,'P0','Pediatria/Endocrinologia','Somatropina em canetas e pós dosados em mg ou UI conforme produto, sem fonte e rótulo genérico. Verificar conversão por produto, peso, indicação, método de preparo e dispositivo.',true),
(715,'P0','Gastroenterologia/Imunologia','Vedolizumabe IV 300 mg e forma SC em outros mercados sob um mesmo registro sem fonte. Não intercambiar vias e intervalos; verificar registro brasileiro, indução/manutenção e infecção.',true),
(716,'P1','Pediatria/Gastroenterologia','Lactase em comprimidos/cápsulas/gotas com unidades enzimáticas variáveis sem fonte; definir atividade por produto/porção, indicação e alegações de eficácia.',false),
(717,'P1','Neurologia','Amantadina 100 mg sem fonte e um campo ausente. Verificar uso em Parkinson/discinesias, função renal, alterações neuropsiquiátricas e retirada.',false),
(728,'P0','Pneumologia/DPOC','Glicopirrônio em cápsulas para inalação 50 mcg/dispositivos variáveis, sem fonte. Conferir dose nominal versus liberada, técnica e não administrar cápsula por via oral.',true),
(731,'P0','Cardiologia/Dislipidemia','Evolocumabe em 140 mg SC e sistemas de 420 mg reunidos sem fonte. Separar dispositivos, volumes e esquemas, confirmar indicação e conservação.',true),
(732,'P1','Neurologia/Enxaqueca','Rizatriptana comprimidos/orodispersíveis 5/10 mg sem fonte. Conferir dose e repetição por peso/idade, interação com propranolol e contraindicações cardiovasculares.',false),
(735,'P1','Dermatologia','Ciclopirox esmalte ungueal 80 mg/g tem URL registrada, mas quatro campos de segurança ausentes. Confirmar indicação onicomicose, duração, instruções de remoção e contraindicações.',false),
(753,'P1','Clínica/Otorrino','Meclizina com comprimidos sem força e sem nenhum campo de segurança nem fonte. Identificar produto e dose por idade, sedação/efeitos anticolinérgicos antes de prescrição.',true),
(755,'P1','Oftalmologia','Carboximetilcelulose lubrificante oftálmica sem concentração, fonte e cinco campos. Conferir 0,5/1% ou concentração realmente vendida, conservantes e uso pediátrico.',true),
(756,'P1','Otorrino/Pediatria','Ciprofloxacino + dexametasona otológico sem proporção dos componentes, fonte nem segurança. Validar indicação/idade, integridade timpânica e aplicação por ouvido.',true),
(757,'P1','Otorrino/Pediatria','Ciprofloxacino otológico sem concentração, fonte e cinco campos. Confirmar apresentação específica; distinguir de colírio e formulações sistêmicas.',true),
(759,'P1','Otorrino/APS','Oximetazolina nasal sem concentração, fonte ou cinco campos. Verificar faixa etária, formulações 0,025/0,05% por produto e risco de rinite medicamentosa.',true),
(763,'P1','Dermatologia','Adapaleno + peróxido de benzoíla gel sem forças e sem segurança/fonte. Conferir concentrações, uso na gestação, irritação e modo de aplicação.',true),
(764,'P1','Dermatologia','Clindamicina tópica sem concentração, fonte nem segurança. Verificar forma gel/solução, resistência microbiana, uso combinado com peróxido de benzoíla e contraindicações.',true),
(768,'P0','Oftalmologia/Otorrino','Nafazolina apresenta forma nasal/oftálmica genérica, sem fonte ou campos de segurança; risco de intercambiar vias e intoxicação pediátrica. Exigir apresentação exata.',true),
(780,'P1','Dermatologia/Pediatria','Griseofulvina inclui suspensão 125 mg/5 mL e comprimidos inespecíficos, sem cinco campos. Confirmar suspensão e dose por peso, administração, função hepática e registro.',true),
(781,'P0','Infectologia/Pediatria','Atovaquona + proguanil tem comprimidos pediátricos 62,5/25 mg e adultos 250/100 mg; sem cinco campos. Confirmar dose por peso/indicação e não intercambiar apresentações.',true),
(782,'P1','Alergia/Pediatria','Rupatadina com apresentação genérica sem fonte ou cinco campos. Verificar concentração oral, faixa etária/indicação e interações CYP.',true),
(783,'P1','Alergia/Pediatria','Bilastina sem forma/concentração nem fonte ou cinco campos. Validar apresentação 10/20 mg por produto, idade, alimentos/sucos e função renal.',true),
(784,'P1','Alergia/Pediatria','Ebastina sem apresentação ou fonte e cinco campos. Identificar força líquida/sólida e dose por idade, arritmia/QT e interações.',true),
(785,'P1','Alergia/Pediatria','Cetotifeno sem forma/concentração nem fonte e cinco campos. Diferenciar colírio de solução oral e verificar idade, sedação e indicações.',true)
), updated AS (
 UPDATE public.bulario_drugs d SET data=jsonb_set(d.data,'{quality_audit}',jsonb_build_object(
  'batch','bul-14-651-700',
  'screened_at','2026-10-16',
  'scope','source_and_safety_fields_medical_review_triage',
  'scientifically_validated',false,
  'priority',i.priority,
  'clinical_area',i.clinical_area,
  'action_required',i.action_required,
  'prescription_copy_blocked',i.prescription_copy_blocked,
  'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
  'formulation_count',jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
  'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE COALESCE(f->>'source_url','') NOT LIKE 'http%'),
  'retailer_or_aggregator_hosted_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE lower(COALESCE(f->>'source_url','')) ~ '(consultaremedios[.]com[.]br|saudedireta[.]com[.]br|remediobarato[.]com|bula[.]com[.]br|drogasil[.]com[.]br|vteximg[.]com[.]br|onepharma[.]com[.]br|oncoexpress[.]com[.]br)'),
  'generic_placeholder_forms',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE coalesce(f->>'label','') ILIKE '%conforme produto%' OR coalesce(f->>'label','') ILIKE '%conforme registro%' OR coalesce(f->>'label','') ILIKE '%conforme mercado%'),
  'repeated_formulation_label_groups',(SELECT count(*) FROM (SELECT lower(COALESCE(f->>'label','')) label FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f GROUP BY 1 HAVING count(*)>1) q),
  'missing_core_safety_fields',to_jsonb(array_remove(ARRAY[
   CASE WHEN NOT d.data?'renal_adjustment' THEN 'renal_adjustment' END,
   CASE WHEN NOT d.data?'hepatic_adjustment' THEN 'hepatic_adjustment' END,
   CASE WHEN NOT d.data?'contraindications' THEN 'contraindications' END,
   CASE WHEN NOT d.data?'drug_interactions' THEN 'drug_interactions' END,
   CASE WHEN NOT d.data?'adverse_reactions' THEN 'adverse_reactions' END
  ],NULL))
 ),true)
 FROM items i WHERE d.id=i.id AND NOT(d.data?'quality_audit')
 RETURNING d.id
)
SELECT count(*) tagged_now,(SELECT count(*) FROM items) expected FROM updated;