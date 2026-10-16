-- LURIA/Bulário: lote 05 (medicamentos 201 a 250).
-- Documenta pendências individualizadas. NÃO altera dose, forma, status principal ou fonte.
-- Idempotente: nunca sobrescrever um quality_audit existente.
WITH items(id,priority,clinical_area,action_required,prescription_copy_blocked) AS (
 VALUES
(424,'P1','APS/Cardiologia','Sinvastatina 20/40 mg: conferir outras forças, contraindicações/interações CYP3A4, doença hepática, sintomas musculares e critérios de escolha de intensidade estatínica.',false),
(489,'P1','APS/Diabetes','Sitagliptina 25/50/100 mg: validar escolha por função renal, dose por indicação, cautelas pancreáticas e diferenças entre apresentação e posologia.',false),
(194,'P1','Cardiologia','Metoprolol tartarato cadastrado só como comprimido 100 mg; verificar formas de outras forças e separar tartarato IR do succinato de liberação prolongada; cautelas bradicardia/bloqueio.',false),
(121,'P1','Cardiologia','Bisoprolol (hipertensão/angina/IC) em duas fichas: conferir titulação na IC, estabilidade clínica antes da titulação, doses máximas e contraindicações cardíacas.',false),
(744,'P0','Anestesia/UTI','Dexmedetomidina 100 mcg/mL: faltam os cinco campos básicos de segurança; revisar concentração final após diluição, indicação, velocidade de infusão, bradicardia/hipotensão e monitorização.',false),
(553,'P0','Cardiologia/IC','Sacubitril/valsartana: três forças agrupadas e sem fonte por apresentação; conferir intervalo de transição após IECA, contraindicação de angioedema, potássio, rim, gestação e titulação.',false),
(425,'P1','APS/Cardiologia','Valsartana 80/160/320 mg: verificar indicações de hipertensão/IC, contraindicações na gestação e monitorização de creatinina e potássio; individualizar dose.',false),
(318,'P1','APS/Cardiologia','Telmisartana 40/80 mg: dois regimes, um com texto genérico; conferir bula, contraindicações gestacionais, interações e função renal.',false),
(978,'P0','Emergência/Endocrinologia','Glucagon está como apresentação genérica sem URL específica e sem campos básicos de segurança; identificar produto (kit injetável ou nasal), via, concentração, reconstituição e resposta à hipoglicemia.',false),
(583,'P1','APS/Diabetes','Linagliptina 5 mg sem fonte da apresentação; confirmar bula do produto, interações relevantes e uso por função renal sem assumir ajustes universais.',false),
(348,'P1','APS/Diabetes','Vildagliptina 50 mg em duas marcas: revisar diferenças por indicação/associação, ajuste renal e função hepática; conferir monitorização de transaminases.',false),
(484,'P0','APS/Diabetes/Obesidade','Semaglutida: duas apresentações de caneta com titulações distintas; verificar indicações específicas, apresentações autorizadas, doses semanais, rotulagem da caneta e contraindicações antes de copiar esquema.',false),
(485,'P0','APS/Diabetes','Liraglutida 6 mg/mL em caneta: conferir escalonamento por indicação e produto, dose por aplicação, náuseas, pancreatite e risco de confusão de canetas.',false),
(482,'P0','Diabetes/Insulina','Insulina glargina com quatro regimes e transições entre glargina U-300/NPH e U-100; exigir conversão documentada por concentração e titulação monitorizada, nunca permutação automática.',false),
(483,'P0','Diabetes/Insulina','Insulina lispro inclui prandial, IV monitorizada e caneta U-100: distinguir via e produto, unidades UI/mL, hipoglicemia e mecanismo de ajuste individual.',false),
(591,'P0','Diabetes/Insulina','Insulina asparte tem única apresentação genérica U-100 agrupando Fiasp e NovoRapid sem fonte individual; dividir por produto e confirmar diferenças na administração e tempo prandial.',false),
(585,'P1','Endocrinologia','Tiamazol comprimidos 5/10 mg sem fonte por forma: verificar indicação, exames tireoidianos, risco de agranulocitose/hepatotoxicidade, gestação e duração por protocolo.',false),
(515,'P1','Reumatologia','Alopurinol 100/300 mg: confirmar titulação orientada por urato e ajuste renal, reação cutânea grave, interações com azatioprina/mercaptopurina e cautelas antes de início.',false),
(514,'P1','Reumatologia','Colchicina em dois cenários, gota e Peyronie: revisar doses por indicação e função renal/hepática, interações CYP3A4/P-gp e estreita margem terapêutica; checar indicação aprovada.',false),
(1041,'P1','Reumatologia','Febuxostate cadastrado em apresentação genérica, sem fonte e sem os cinco campos de segurança; verificar registro, dose por produto, risco cardiovascular e contraindicações/interações.',false),
(558,'P0','Cardiologia/Anticoagulação','Dabigatrana agrupa cápsulas 75/110/150 mg e não possui fonte por apresentação; separar por indicação/idade/função renal, proibir abrir cápsulas sem orientação de bula e revisar sangramento.',false),
(597,'P0','Cardiologia/Antiplaquetários','Ticagrelor comprimidos 60/90 mg sem fonte específica; conferir indicação de 60 versus 90 mg, associação com AAS, risco hemorrágico, bradicardia e interações.',false),
(429,'P0','Anticoagulação/UTI','Heparina sódica traz 5.000 UI/mL intravenosa em hemodiálise e 5.000 UI/0,25 mL SC; não intercambiar concentração, via ou indicação; validar protocolo de monitorização e HIT.',false),
(1077,'P0','Cardiologia/Anticoagulação','Edoxabana 15/30/60 mg agrupadas sem fonte por forma e quatro campos básicos ausentes; validar indicação, função renal/peso/interações e restrições de dose.',false),
(600,'P1','Angiologia/APS','Cilostazol 50/100 mg sem fonte específica; revisar contraindicação em insuficiência cardíaca, interações, efeitos vasodilatadores e critério de uso em claudicação.',false),
(767,'P0','Anestesia/UTI','Remifentanila injetável sem fonte individual nem cinco campos de segurança; validar diluição, mcg/kg/min, monitorização respiratória e uso exclusivo em ambiente habilitado.',false),
(73,'P1','Endocrinologia/GO','Cabergolina 0,5 mg tem três regimes com rótulos repetidos; separar indicações, contraindicações, interações, efeitos ortostáticos e monitorização quando uso prolongado.',false),
(649,'P1','Endocrinologia/GO','Bromocriptina 2,5 mg/cápsulas 5 mg agrupadas sem fonte por formulação; conferir indicação e titulação, efeitos dopaminérgicos e contraindicações.',false),
(993,'P0','GO/Obstetrícia','Atosibana com apresentação genérica, sem URL de bula e cinco campos básicos ausentes; confirmar disponibilidade, solução/ampola, bolus e manutenção por protocolo hospitalar, segurança materno-fetal.',false),
(357,'P1','Gastroenterologia','Esomeprazol 20/40 mg em duas indicações: conferir formulação gastrorresistente, idade, duração, interações e alternativas de administração sem fracionar indevidamente.',false),
(254,'P1','Gastroenterologia','Lansoprazol com cinco regimes por indicação: revisar duração, concentrações e limites pediátricos, interações e ajustes por hepatopatia.',false),
(248,'P1','Gastroenterologia','Rabeprazol 10/20 mg: verificar indicações, duração, população pediátrica e condições que exigem endoscopia/erradicação H. pylori.',false),
(88,'P1','Gastroenterologia','Famotidina 20 mg possui dois registros com mesmo rótulo, além de 40 mg; conferir se representam indicações distintas, ajustes renais e dose máxima por cenário.',false),
(564,'P1','Gastroenterologia','Sucralfato comprimido 1 g e suspensão 1 g/10 mL aparecem agrupados sem fonte da apresentação; dividir forma/dose, interações por adsorção e separação de administração.',false),
(841,'P0','Gastroenterologia/Anestesia','Escopolamina está genérica sem fonte e sem cinco campos básicos; distinguir escopolamina (hioscina) de butilbrometo de escopolamina, que são entidades diferentes, e validar forma/indicação.',false),
(39,'P1','Gastroenterologia','Butilbrometo de escopolamina só cadastrado no comprimido 10 mg; conferir solução oral/injetável conforme registro e cuidados anticolinérgicos por via.',false),
(113,'P0','Emergência/Gastroenterologia','Terlipressina (pó 1 mg e solução 0,12 mg/mL): conferir equivalência de sal/base, indicação em hemorragia varicosa/HRS, intervalos, monitorização isquêmica e respiratória.',false),
(601,'P0','Emergência/Cardiologia','Milrinona IV 1 mg/mL sem fonte individual; revisar diluição, titulação, função renal, hipotensão/arrítmias e monitorização intensiva.',false),
(440,'P0','Anestesia/Psiquiatria','Escetamina injetável 50 mg/mL e spray nasal 28 mg reunidos na mesma ficha, nasal sem fonte por apresentação. Separar rigidamente vias/indicações e exigências de administração em estabelecimento com monitorização; bloquear cópia de prescrição até a revisão específica.',true),
(384,'P1','Infectologia/APS','Fosfomicina oral 3 g: confirmar sal/trometamol da apresentação, indicação de cistite, idade, gravidez, contraindicações e diferenciar formulações IV não intercambiáveis.',false),
(556,'P0','Infectologia/Tuberculose','Rifampicina com cápsulas/comprimidos/suspensão agrupados sem bula individual; revisar doses do esquema nacional RHZE por peso, interações por indução enzimática e hepatotoxicidade.',false),
(589,'P0','Infectologia/Tuberculose','Isoniazida 100/300 mg sem fonte individual; vincular protocolo nacional, dose por peso, risco hepatotóxico/neuropatia e necessidade de piridoxina conforme risco.',false),
(530,'P0','Infectologia/Tuberculose','Pirazinamida 500 mg sem fonte individual; revisar esquema de combinação RHZE por faixa de peso, eventos hepáticos/articulares e monitorização laboratorial.',false),
(536,'P0','Infectologia/Tuberculose','Etambutol 400 mg sem fonte individual; revisar dose por peso, ajuste renal, visão de cores/neurite óptica e associação em esquemas nacionais.',false),
(747,'P1','Infectologia/Parasitologia','Praziquantel 600 mg sem cinco campos de segurança; revisar dose por helminto, contraindicações/interações e administração por indicação.',false),
(741,'P1','Infectologia/Parasitologia','Nitazoxanida comprimido 500 mg/suspensão 20 mg/mL agrupados sem fonte e cinco campos de segurança; separar pediatria/adulto, duração e contraindicações.',false),
(754,'P1','Infectologia/GO','Secnidazol comprimidos/granulado sem fonte individual e campos básicos de segurança; conferir indicação e esquemas por parasitose/vaginose, interações e orientação na gestação.',false),
(252,'P1','Infectologia/GO','Tinidazol comprimido 500 mg: validar dose por indicação, interações/reações, restrições em gestação/lactação e atenção ao tratamento de parceiros quando aplicável.',false),
(278,'P0','Infectologia/Reumatologia','Cloroquina 150 mg tem esquema com texto genérico; confirmar forma de sal versus base, indicações e monitorização de QT/retina conforme uso; evitar confusão com hidroxicloroquina.',false),
(537,'P1','Infectologia','Itraconazol cápsula 100 mg e solução oral 10 mg/mL agrupadas sem fonte individual; NÃO presumir bioequivalência/troca por mesma dose, revisar interações CYP3A4 e hepatotoxicidade.',false)
), annotated AS (
 UPDATE public.bulario_drugs d
 SET data=jsonb_set(d.data,'{quality_audit}',jsonb_build_object(
    'batch','bul-05-201-250',
    'screened_at','2026-10-15',
    'scope','individual_formulation_source_and_safety_gap_triage',
    'scientifically_validated',false,
    'priority',i.priority,
    'clinical_area',i.clinical_area,
    'action_required',i.action_required,
    'prescription_copy_blocked',i.prescription_copy_blocked,
    'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
    'formulation_count',jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
    'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE COALESCE(f->>'source_url','') NOT LIKE 'http%'),
    'generic_placeholder_forms',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE COALESCE(f->>'label','') ILIKE '%conforme produto%' OR COALESCE(f->>'label','') ILIKE '%conforme registro%' OR COALESCE(f->>'label','') ILIKE '%conforme mercado%'),
    'missing_core_safety_fields',to_jsonb(array_remove(ARRAY[
      CASE WHEN NOT d.data?'renal_adjustment' THEN 'renal_adjustment' END,
      CASE WHEN NOT d.data?'hepatic_adjustment' THEN 'hepatic_adjustment' END,
      CASE WHEN NOT d.data?'contraindications' THEN 'contraindications' END,
      CASE WHEN NOT d.data?'drug_interactions' THEN 'drug_interactions' END,
      CASE WHEN NOT d.data?'adverse_reactions' THEN 'adverse_reactions' END
    ],NULL))
  ),true)
 FROM items i
 WHERE d.id=i.id AND NOT(d.data?'quality_audit')
 RETURNING d.id
)
SELECT count(*) AS tagged_now,(SELECT count(*) FROM items) AS expected FROM annotated;