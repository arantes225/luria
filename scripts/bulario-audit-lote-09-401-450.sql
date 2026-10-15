-- LURIA: Bulário lote 09, medicamentos 401–450.
-- Triagem de fontes, riscos e apresentações; NÃO valida as doses, nem altera formulações/status.
-- Idempotente: não sobrescreve quality_audit pré-existente.
WITH items(id,priority,clinical_area,action_required,prescription_copy_blocked) AS (
 VALUES
(3,'P1','Infectologia/Hepatologia','Entecavir 0,5 mg oral: validar indicação e dose para hepatite B conforme exposição prévia a nucleosídeos, estado de resistência, ajuste renal e acompanhamento virológico.',false),
(6,'P0','Infectologia/HIV/Hepatite','Lamivudina Epivir 150 mg: não extrapolar esquemas do HIV para monoterapia de hepatite B; conferir indicação, combinações antirretrovirais, formulação pediátrica, função renal e risco de resistência.',true),
(11,'P0','Oncologia','Doxorrubicina convencional: a ficha mistura via intravesical e IV em cinco regimes; conferir indicações por via, concentração, limite cumulativo cardiotóxico, extravasamento e não confundir com formulação lipossomal.',true),
(12,'P0','Oncologia/Imunossupressão','Everolimo 2,5/5/10 mg: confirmar especificamente produto Afinitor e regime por indicação oncológica; não transportar posologia para apresentações de transplante, verificar interações CYP3A4 e efeitos hematológicos.',true),
(14,'P0','Oncologia','Oxaliplatina 5 mg/mL 50/100 mg: validar protocolos oncológicos, superfície corporal, preparo/compatibilidade, neuropatia, hipersensibilidade e função renal.',true),
(24,'P0','Oncologia','Pemetrexede 100/500 mg: os rótulos mencionam marca descontinuada no Brasil; confirmar apresentações registradas e atuais, suplementação de folato/B12, corticoterapia, função renal e dose por ciclo.',true),
(25,'P0','Hematologia/Oncologia','Citarabina possui formas IV/SC e uma entrada intratecal: separar soluções sem conservantes, via/diluente, dose por protocolo, risco neurotóxico e monitorização; não disponibilizar cópia indiscriminada.',true),
(26,'P1','Clínica/Dor','Nimesulida cápsula retard 200 mg: conferir se a dose, liberação e indicação da apresentação estão atualizadas no Brasil; validar limites de duração, função hepática, idade e riscos gastrintestinais.',false),
(27,'P0','Infectologia/UTI','Cloranfenicol succinato IV 1 g: revisar indicações restritas, preparo, dose em neonatos/crianças e risco hematológico/síndrome do bebê cinzento; considerar alternativas conforme protocolo.',true),
(28,'P1','Gastroenterologia','Mesalazina está cadastrada só em enema 3 g e supositório 250 mg; não extrapolar para mesalazina oral de liberação modificada, conferir doses por localização da DII e monitorização renal.',false),
(37,'P1','Cardiologia/APS','Irbesartana + hidroclorotiazida 150/12,5 e 300/12,5 mg: conferir indicação, contraindicação na gestação, função renal, potássio/sódio e titulação.',false),
(40,'P1','Pneumologia/APS','Dextrometorfano xarope 15 mg/5 mL: conferir população pediátrica, indicação de tosse, sedação, interações serotoninérgicas e contraindicações conforme bula.',false),
(42,'P1','Dermatologia','Benzoato de benzila em sabonete 100 mg/g e loções 10/25%: diferenciar concentração, modo e tempo de contato conforme escabiose/pediculose, faixa etária e irritação cutânea.',false),
(44,'P0','Clínica/Dor','Carisoprodol + diclofenaco + paracetamol + cafeína: fórmula com quatro ativos exige revisão de dose cumulativa de paracetamol/AINE, sedação, dependência e contraindicações gastro-renais antes de gerar receita.',true),
(45,'P1','Clínica/Endocrinologia','Betametasona elixir oral 0,1 mg/mL: distinguir corticoterapia sistêmica de apresentações tópicas/injetáveis, confirmar conversão mg/mL, idade, indicação, duração e desmame.',false),
(51,'P1','Alergia/APS','Loratadina + pseudoefedrina com drágea, xarope e comprimido 24 h: conferir concentrações e duração por forma, faixa etária, hipertensão e interações de simpaticomiméticos.',false),
(54,'P1','Cardiologia/APS','Enalapril + hidroclorotiazida em proporções 20/12,5 e 10/25 mg: validar titulação e impossibilidade de tratar como equivalentes, função renal, potássio e contraindicação gestacional.',false),
(66,'P1','Dermatologia/Queimaduras','Sulfadiazina de prata creme 1%: cinco tamanhos de embalagem; conferir superfície e profundidade de queimadura, contraindicações por idade/gestação, alergias e cicatrização.',false),
(68,'P0','Endocrinologia/Diabetes','Clorpropamida 250 mg (sulfonilureia de longa duração): revisar hipoglicemia prolongada, função renal, população idosa e se é apropriada frente a alternativas atuais.',true),
(72,'P1','Dermatologia','Betametasona dipropionato + ácido salicílico em pomada 30 mg/g e solução 20 mg/mL de queratolítico: diferenciar potência, local, extensão, duração e risco de absorção sistêmica.',false),
(84,'P0','Procedimentos/Vascular','Oleato de monoetanolamina injetável esclerosante: validar concentração 50 mg/mL, via estritamente técnica, dose por veia/sessão, risco trombótico/necrose e ambiente habilitado.',true),
(91,'P1','GO/Hormonoterapia','Estradiol + didrogesterona 1/5 mg: confirmar indicação para climatério, esquema contínuo ou cíclico por produto e contraindicações de terapia hormonal.',false),
(92,'P1','GO/Dermatologia','Fenticonazol reúne creme/spray cutâneo e creme/óvulo vaginal; distinguir via, quantidade/duração por indicação, idade e gestação sem reutilizar instruções entre formas.',false),
(93,'P1','GO/Infectologia','Metronidazol + nistatina creme vaginal: validar diagnóstico, proporção em mg/UI, duração e indicação; não equivaler a terapias por via oral.',false),
(96,'P1','Otorrinolaringologia','Benzidamina pastilha 3 mg: confirmar indicação sintomática, frequência/dose máxima, restrições por idade e duração curta.',false),
(98,'P1','Infectologia/APS','Norfloxacino 400 mg aparece com três registros de mesmo rótulo; verificar duplicidade de conteúdo, indicações e restrições de fluoroquinolonas, função renal e resistência local.',false),
(104,'P0','Radiologia','Gadobutrol contraste IV para RM: confirmar concentração e dose em mmol/kg versus mL/kg, função renal, risco de fibrose sistêmica nefrogênica e registro de uso hospitalar.',true),
(105,'P0','Oncologia','Gencitabina IV cadastrada em regime genérico por tumor: separar esquemas de câncer de pâncreas, bexiga e outros, doses por m², cronograma, toxicidade hematológica e função hepática/renal.',true),
(107,'P1','GO/Infectologia','Tinidazol + miconazol creme vaginal: validar concentração e via intravaginal, duração, restrições reprodutivas e diagnóstico correto antes da terapia.',false),
(112,'P0','APS/Diabetes','Metformina + glibenclamida 500/2,5 e 500/5 mg: conferir cálculo dos dois componentes, função renal, risco de hipoglicemia prolongada, lactato e dose conforme refeição.',true),
(117,'P1','Gastroenterologia','Picossulfato gotas 7,5 mg/mL: verificar mg por gota do produto, restrições pediátricas, desidratação/eletrólitos e contraindicação em obstrução.',false),
(137,'P1','Cardiologia/Nefrologia','Hidroclorotiazida + triantereno 50/50 mg: verificar proporção, contraindicação por hipercalemia/insuficiência renal, interações e monitorização de eletrólitos.',false),
(144,'P0','Emergência/UTI','Fosfato de potássio concentrado IV: exigir cálculo em mmol de fósforo e mEq de potássio, concentração/diluente, taxa de infusão, função renal e dupla checagem; proibido copiar dose sem validação.',true),
(149,'P1','APS/Diabetes','Vildagliptina + metformina 50/500, 50/850 e 50/1000 mg: revisar dose por componente, ingestão com alimentos, TFGe, função hepática e interações.',false),
(150,'P1','APS/Diabetes','Sitagliptina + metformina XR: distinguir apresentação de liberação prolongada e forças, dose por TFGe e limites de metformina; não extrapolar para combinação IR.',false),
(168,'P1','Dermatologia/Infectologia','Neomicina + bacitracina tópica: verificar indicação, sensibilização por neomicina, resistência bacteriana, áreas extensas e contraindicações.',false),
(187,'P1','Cardiologia/Dislipidemia','Fluvastatina LP 80 mg: confirmar liberação prolongada, horário, função hepática, interações e disponibilidade da formulação.',false),
(192,'P1','APS/Dislipidemia','Fenofibrato cápsula 250 mg: confirmar produto e dose por formulação, função renal, risco muscular ao combinar estatina e contraindicações.',false),
(197,'P1','Oftalmologia','Bimatoprosta em 0,03% e 0,01%: revisar apresentação/disponibilidade, instilação, efeitos oculares e evitar equiparar concentrações.',false),
(198,'P1','Gastroenterologia','Antiácido hidróxido alumínio + magnésio + simeticona possui suspensão e mastigáveis; concentração de duas formas inespecífica, conferir unidades por produto, função renal e interações por absorção.',false),
(201,'P0','Oncologia/Clínica','Megestrol 160 mg oral: revisar indicações aprovadas por apresentação versus uso para apetite/cachexia, risco tromboembólico, insuficiência adrenal e contexto oncológico.',false),
(203,'P1','Dermatologia/Antissepsia','Clorexidina digliconato spray 10 mg/mL: distinguir antissepsia cutânea de enxaguatórios e preparações alcoólicas; checar local de aplicação, concentração, alergia e mucosas.',false),
(207,'P1','Cardiologia/Nefrologia','Hidroclorotiazida + amilorida em duas proporções: revisar potássio, função renal e interação com IECA/BRA e poupadores de potássio.',false),
(213,'P1','Oftalmologia','Tropicamida colírio 1%: validar indicação para midríase/cicloplegia, dose por exame, idade, contraindicação ocular e absorção sistêmica.',false),
(225,'P0','Oncologia/GO','Tamoxifeno 20 mg: revisar indicação e duração por estágio de câncer de mama, risco tromboembólico/endometrial, interações com inibidores CYP2D6 e gestação.',false),
(228,'P1','APS/Diabetes','Repaglinida 0,5/1/2 mg: conferir administração relacionada à refeição, risco de hipoglicemia, função hepática e interações CYP2C8.',false),
(229,'P1','Dermatologia','Ureia em creme/loção 10%: diferenciar uso em barreira cutânea e concentrações queratolíticas mais elevadas, aplicação por idade/local e risco de irritação.',false),
(245,'P0','GO/Reprodução','Alfacoriogonadotropina caneta 250 mcg/0,5 mL: dose deve ser vinculada ao monitoramento folicular e protocolos de reprodução; rever hiperestimulação ovariana, gestação múltipla, via SC e orientação de uso.',true),
(273,'P1','Gastroenterologia/Dislipidemia','Colestiramina tem seis linhas por indicação, incluindo dose por peso; revisar equivalência de envelopes, interferência em absorção de medicamentos e vitaminas lipossolúveis.',false),
(291,'P1','Urologia','Alfuzosina LP 10 mg menciona apresentação histórica descontinuada; confirmar produto brasileiro vigente, risco de hipotensão e orientação de não triturar comprimido LP.',false)
), marked AS (
 UPDATE public.bulario_drugs d
 SET data=jsonb_set(d.data,'{quality_audit}',jsonb_build_object(
  'batch','bul-09-401-450',
  'screened_at','2026-10-15',
  'scope','formulation_route_risk_source_provenance_and_clinical_review_targets',
  'scientifically_validated',false,
  'priority',i.priority,
  'clinical_area',i.clinical_area,
  'action_required',i.action_required,
  'prescription_copy_blocked',i.prescription_copy_blocked,
  'source_review_status','URL_PRESENT_NOT_SCIENTIFICALLY_VERIFIED',
  'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
  'formulation_count',jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
  'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE COALESCE(f->>'source_url','') NOT LIKE 'http%'),
  'retailer_or_aggregator_hosted_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE lower(coalesce(f->>'source_url','')) ~ '(consultaremedios[.]com[.]br|saudedireta[.]com[.]br|remediobarato[.]com|bula[.]com[.]br|drogasil[.]com[.]br|vteximg[.]com[.]br|onepharma[.]com[.]br|oncoexpress[.]com[.]br)'),
  'generic_placeholder_forms',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE coalesce(f->>'label','') ILIKE '%conforme produto%' OR coalesce(f->>'label','') ILIKE '%conforme registro%' OR coalesce(f->>'label','') ILIKE '%conforme mercado%'),
  'repeated_formulation_label_groups',(SELECT count(*) FROM(SELECT lower(coalesce(f->>'label','')) label FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f GROUP BY 1 HAVING count(*)>1) g),
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
SELECT COUNT(*) tagged_now,(SELECT COUNT(*) FROM items) expected FROM marked;
-- Reconciliação idempotente da métrica de proveniência em execuções anteriores.
-- Não modifica dose, fonte, status nem o restante do audit.
WITH reconciled AS (
 UPDATE public.bulario_drugs d
 SET data=jsonb_set(d.data,'{quality_audit,retailer_or_aggregator_hosted_formulations}',
 to_jsonb((SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f
 WHERE lower(coalesce(f->>'source_url','')) ~ '(consultaremedios[.]com[.]br|saudedireta[.]com[.]br|remediobarato[.]com|bula[.]com[.]br|drogasil[.]com[.]br|vteximg[.]com[.]br|onepharma[.]com[.]br|oncoexpress[.]com[.]br)')),true)
 WHERE d.data->'quality_audit'->>'batch'='bul-09-401-450'
 RETURNING d.id
)
SELECT count(*) AS source_provenance_reconciled FROM reconciled;
