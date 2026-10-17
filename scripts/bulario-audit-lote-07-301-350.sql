-- LURIA / Bulário / Lote 07 (301–350)
-- Triagem documental e de riscos, NAO certifica dosagem científica.
-- Idempotência: quality_audit nunca é sobrescrito.
WITH targets(id,priority,clinical_area,action_required,prescription_copy_blocked) AS (
 VALUES
(923,'P1','Psiquiatria','Amisulprida: apresentação genérica sem fonte nem cinco campos de segurança; confirmar doses por indicação/idade, função renal, QT e hiperprolactinemia.',false),
(257,'P0','Neurologia','Levodopa + benserazida possui cinco formas convencional, dispersível, BD, DR e HBS; revisar liberação e equivalências por produto, flutuação motora, hipotensão e interações.',true),
(608,'P0','Emergência/Toxicologia','Azul de metileno injetável 1% sem fonte por produto; confirmar indicação e dose da meta-hemoglobinemia, cautelas em deficiência de G6PD e risco serotoninérgico, além de formulação.',true),
(933,'P0','Emergência/Psiquiatria','Clordiazepóxido: ficha genérica sem bula nem cinco campos de segurança; revisar abstinência alcoólica, hepatopatia, risco respiratório, sedação e retirada.',true),
(1082,'P1','Cardiologia','Propranolol + hidroclorotiazida sem concentração dos dois componentes nem fonte, faltando cinco campos; separar associação de monofármacos e revisar broncoespasmo, eletrólitos e bloqueio AV.',false),
(862,'P1','Infectologia','Cloxacilina: forma genérica sem fonte e cinco campos de segurança; verificar comercialização brasileira, forma oral/IV, dose por infecção e alergia a penicilinas.',false),
(863,'P1','Infectologia','Dicloxacilina sem bula ou cinco campos; confirmar produto/registo vigente no Brasil, apresentação oral e diferenças perante cloxacilina/oxacilina.',false),
(951,'P1','Dermatologia','Eritromicina + peróxido de benzoíla: sem apresentação/fonte individual e sem cinco campos; confirmar proporção, indicação em acne, irritação e duração recomendada.',false),
(760,'P1','Oftalmologia/Infectologia','Tobramicina oftálmica: colírio e pomada agrupados sem fonte da apresentação e sem campos de segurança; separar concentração, via exclusiva oftálmica, idade e duração.',false),
(758,'P1','Oftalmologia/Infectologia','Moxifloxacino oftálmico: sem fonte individual nem cinco campos de segurança; confirmar concentração colírio, indicação, posologia e restrições pediátricas, sem confundir com moxifloxacino sistêmico.',false),
(942,'P1','GO/Contracepção','Etinilestradiol + gestodeno: associação genérica sem quantidades dos hormônios, bula ou cinco campos; validar apresentações, contraindicação tromboembólica, interações e esquecimento.',false),
(540,'P0','Cardiologia','Dinitrato de isossorbida lista comprimidos e via sublingual na mesma forma sem fonte; verificar diferenças de formulação, dose por via e contraindicação com inibidores PDE5.',true),
(208,'P1','Cardiologia','Mononitrato de isossorbida comprimidos 20/40 mg: conferir liberação, prevenção de tolerância, horários e contraindicação com inibidores PDE5.',false),
(886,'P1','Cardiologia/Urologia','Prazosina em forma genérica sem fonte e cinco campos; validar dose inicial, hipotensão da primeira dose, interação com anti-hipertensivos e indicação.',false),
(727,'P1','Urologia/Cardiologia','Terazosina 1/2/5/10 mg agrupadas sem fonte, dois campos básicos ausentes; conferir hipotensão postural, administração inicial e titulação por HPB/hipertensão.',false),
(588,'P1','Urologia','Dutasterida 0,5 mg sem fonte específica; revisar contraindicações reprodutivas, interpretação do PSA e risco de exposição na gestação.',false),
(1027,'P1','Urologia','Silodosina: ficha genérica sem fonte, cinco campos de segurança ausentes; confirmar concentração, função renal, interações CYP3A4 e efeitos ejaculatórios.',false),
(1029,'P1','Urologia','Tolterodina: forma genérica sem bula e cinco campos de segurança; diferenciar IR/ER, efeitos anticolinérgicos, glaucoma e retenção urinária.',false),
(884,'P1','Cardiologia','Lercanidipino: apresentação genérica sem fonte/campos de segurança; revisar contraindicações, titulação e interações CYP3A4.',false),
(652,'P0','Anestesia/UTI','Atracúrio 10 mg/mL sem fonte por produto; validar dose de intubação/bloqueio, monitorização neuromuscular, via IV e necessidade de sedação/ventilação.',true),
(1014,'P0','Emergência','Glicose 10%: ficha genérica sem concentração/volume por embalagem e sem cinco campos; validar solução, via e correção/monitorização glicêmica para evitar confusão com G25/G50.',true),
(1013,'P0','Emergência','Glicose 25%: ficha genérica sem fonte nem cinco campos; confirmar apresentação, concentração, volume, via IV, extravasamento e risco de confundir com glicose 10/50%.',true),
(771,'P0','Anestesia','Alfentanila injetável sem fonte individual nem cinco campos de segurança; validar concentração, dose por indicação, analgesia/anestesia, depressão respiratória e monitorização.',true),
(769,'P0','Cardiologia/UTI','Levosimendana concentrado IV sem fonte individual e cinco campos de segurança; confirmar diluição, taxa de infusão, monitorização e contraindicações hemodinâmicas.',true),
(1,'P0','Infectologia/UTI','Anfotericina B lipossomal 50 mg por frasco: não intercambiar mg/kg com anfotericina B desoxicolato; validar reconstituição, diluente, função renal e reações infusionais.',false),
(295,'P0','Anestesia/Procedimentos','Lidocaína + epinefrina 1% e 2% com razão 1:200.000: conferir mg/mL de ambos, dose máxima por local/técnica, via e risco cardiovascular.',false),
(100,'P0','Pneumologia','Budesonida + formoterol: três apresentações, uma concentração de 12+200 mcg aparece duas vezes; revisar indicação de manutenção/alívio, dispositivo, técnica e dose total por idade/protocolo.',false),
(743,'P0','Pneumologia','Fluticasona + salmeterol tem diferentes doses agrupadas e não tem bula da forma nem cinco campos de segurança; confirmar dispositivo e restrição de LABA isolado em asma.',false),
(236,'P1','Otorrinolaringologia','Ciclesonida cadastrada apenas como spray nasal 50 mcg/jato; diferenciar de eventuais formulações para inalação pulmonar, idade e doses por rinite.',false),
(991,'P1','Otorrinolaringologia','Fluticasona nasal com apresentação genérica, sem bula específica e cinco campos de segurança; confirmar sal/produto, microgramas por jato e idade.',false),
(990,'P1','Otorrinolaringologia','Beclometasona nasal: ficha genérica sem fonte nem cinco campos de segurança; validar dispositivo e concentração por dose, contraindicações e uso pediátrico.',false),
(281,'P1','Oftalmologia','Latanoprosta + timolol colírio: conferir 50 mcg/mL + 5 mg/mL e cautelas sistêmicas de betabloqueador (asma, bradicardia), lente e intervalos.',false),
(282,'P1','Oftalmologia','Latanoprosta isolada 0,005%: revisar via oftálmica, técnica de instilação, armazenamento/contaminação e efeitos pigmentares.',false),
(520,'P0','Transplante/Imunossupressão','Tacrolimo ficha em cápsulas 1/5 mg: confirmar liberação e formulações orais versus tópicas distintas, janela terapêutica, níveis séricos e interações CYP3A4.',false),
(76,'P1','Dermatologia','Pimecrolimo creme 1%, bisnagas 15 e 30 g: revisar faixa etária, indicação de dermatite atópica e recomendações de uso tópico.',false),
(1067,'P0','Dermatologia','Tretinoína + hidroquinona + fluocinolona: ficha genérica sem fonte nem cinco campos; confirmar proporções, duração, fotoproteção e contraindicações na gestação.',true),
(770,'P1','Dermatologia','Calcipotriol tópico sem fonte e cinco campos de segurança; confirmar concentração, limite de área/dose, contraindicações e interação com UV.',false),
(998,'P1','Dermatologia','Ácido salicílico: apresentação genérica sem fonte nem cinco campos; separar concentração, local, indicação e risco de toxicidade quando usado em grandes áreas.',false),
(304,'P0','Cardiologia/Intervenção','Tirofibana em dois cenários SCA/ICP: confirmar bolus versus infusão, dose em mcg/kg/min, função renal, risco hemorrágico e monitorização de plaquetas.',false),
(82,'P1','Dermatologia','Desoximetasona + neomicina pomada 2,5+7,145 mg/g: verificar indicação tópica, resistência/sensibilização por antibiótico e duração curta.',false),
(85,'P0','Oncologia','Flutamida 250 mg: revisar contraindicações/alertas de hepatotoxicidade, função hepática, indicações oncológicas e interações.',false),
(499,'P1','Clínica/Reumatologia','Prednisona oral 5/20 mg: confirmar doses por indicação, duração/desmame e alertas de hiperglicemia, infecção e supressão adrenal.',false),
(575,'P0','Emergência/Clínica','Metilprednisolona: ficha agrupa comprimidos VO e succinato injetável em diferentes doses sem fonte individual; separar rigorosamente vias, ester, equivalências e infusão.',true),
(547,'P0','Endocrinologia','Insulina detemir U-100 em caneta/refil sem fonte individual; confirmar produto disponível, via SC, dose em unidades, indicação e titulação monitorizada.',false),
(584,'P0','Endocrinologia','Insulina degludeca U-100 e U-200 agrupadas numa apresentação sem fonte individual; não converter unidades para volume entre concentrações sem validar dispositivo/rotulagem.',true),
(708,'P0','Emergência/Toxicologia','Fragmentos Fab anti-digoxina com conteúdo variável por frasco, sem fonte individual e dois campos ausentes; dose depende de intoxicação, produto e monitorização.',true),
(517,'P0','Hematologia/Reumatologia','Azatioprina 50 mg: validar função de TPMT/NUDT15 quando pertinente, imunossupressão, mielotoxicidade, monitorização e interações com alopurinol/febuxostato.',false),
(518,'P0','Transplante/Imunossupressão','Micofenolato mofetila 500 mg: confirmar teratogenicidade, hemograma, infecções e distinção de formas de micofenolato sódico; não intercambiar doses.',false),
(519,'P0','Oncologia/Reumatologia','Ciclofosfamida em comprimidos 50 mg; falta conferir formas intravenosas e diferenciação de protocolos oncológicos/imunossupressores, urotoxicidade, infecção e fertilidade.',false),
(626,'P1','Infectologia/HIV','Dolutegravir 10/25/50 mg agrupadas sem fonte individual; conferir interações com cátions, tuberculostáticos, idade/peso e prescrição combinada segundo protocolo brasileiro.',false)
), marked AS (
 UPDATE public.bulario_drugs d
 SET data=jsonb_set(d.data,'{quality_audit}',jsonb_build_object(
   'batch','bul-07-301-350',
   'screened_at','2026-10-15',
   'scope','presentation_source_safety_fields_and_medical_review_triage',
   'scientifically_validated',false,
   'priority',t.priority,
   'clinical_area',t.clinical_area,
   'action_required',t.action_required,
   'prescription_copy_blocked',t.prescription_copy_blocked,
   'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
   'formulation_count',jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
   'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE COALESCE(f->>'source_url','') NOT LIKE 'http%'),
   'generic_placeholder_forms',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE coalesce(f->>'label','') ILIKE '%conforme produto%' OR coalesce(f->>'label','') ILIKE '%conforme registro%' OR coalesce(f->>'label','') ILIKE '%conforme mercado%'),
   'repeated_formulation_label_groups',(SELECT count(*) FROM(SELECT lower(coalesce(f->>'label','')) label FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f GROUP BY 1 HAVING count(*)>1) u),
   'missing_core_safety_fields',to_jsonb(array_remove(ARRAY[
     CASE WHEN NOT d.data?'renal_adjustment' THEN 'renal_adjustment' END,
     CASE WHEN NOT d.data?'hepatic_adjustment' THEN 'hepatic_adjustment' END,
     CASE WHEN NOT d.data?'contraindications' THEN 'contraindications' END,
     CASE WHEN NOT d.data?'drug_interactions' THEN 'drug_interactions' END,
     CASE WHEN NOT d.data?'adverse_reactions' THEN 'adverse_reactions' END
   ],NULL))
 ),true)
 FROM targets t WHERE d.id=t.id AND NOT(d.data?'quality_audit')
 RETURNING d.id
)
SELECT count(*) newly_tagged,(SELECT count(*) FROM targets) expected FROM marked;