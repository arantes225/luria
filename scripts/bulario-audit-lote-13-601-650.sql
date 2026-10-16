-- LURIA / Bulário lote 13 (medicamentos 601–650), 2026-10-16.
-- Triagem documental e de riscos, NAO valida dose científica, não altera os dados clínicos.
-- Idempotente e seguro para execução em paralelo: não sobrescreve data.quality_audit preexistente.
WITH items(id,priority,clinical_area,action_required,prescription_copy_blocked) AS (
 VALUES
(9,'P1','Oftalmologia/Infectologia','Ofloxacino apresenta três registros de colírio 0,3% (3 mg/mL) de fabricantes distintos: conferir se formulações são equivalentes em bula, indicação, técnica oftálmica e idade; não extrapolar para uso sistêmico.',false),
(21,'P0','Dermatologia','Betametasona valerato + gentamicina + tolnaftato + clioquinol tem dez formas com dois grupos de rótulo repetidos: conferir proporções de quatro ativos, creme versus pomada, indicação e limite de uso em áreas extensas.',true),
(22,'P1','GO/Climatério','Estradiol + acetato de noretisterona 1 mg/0,5 mg: confirmar regime de terapia hormonal e contraindicações tromboembólicas, neoplásicas e uterinas por produto.',false),
(29,'P1','Pediatria/Infectologia','Levamisol 80/150 mg: confirmar registro/disponibilidade no Brasil, uso anti-helmíntico, dose por peso/idade, toxicidade hematológica e contraindicações.',false),
(38,'P0','Oncologia/UTI','Carmustina pó 100 mg + diluente específico: confirmar esquema oncológico, reconstituição, infusão, toxicidade pulmonar e mielossupressão, sem transportar doses para implantes locais.',true),
(55,'P0','Pediatria/Nutrição','Cobamamida + ciproeptadina 1+4 mg em microcomprimidos rotulados para 2–6 anos, maiores e adultos: verificar indicação pediátrica, dose etária, sedação, risco anticolinérgico e pertinência clínica.',true),
(62,'P0','Oncologia','Dacarbazina IV 200 mg contém duplicata literal de apresentação e protocolo pediátrico: revisar dose por área corporal e diagnóstico, preparo fotossensível, via e profilaxia de náusea.',true),
(63,'P0','Oncologia/Hematologia','Daunorrubicina IV 20 mg possui rótulo duplicado e posologias distintas: conferir diluição, dose por protocolo LMA/LLA, limite de antraciclina cumulativo e prevenção de extravasamento.',true),
(71,'P1','Dermatologia','Betametasona dipropionato + gentamicina em creme/pomada 0,5+1 mg/g: revisar área, potência do corticoide, duração, idade e risco de resistência à gentamicina.',false),
(81,'P1','Dermatologia/Pediatria','Deltametrina em loção e xampu 0,2 mg/mL: confirmar indicação escabiose/pediculose, contato e modo de aplicação por forma, faixa etária e riscos de irritação.',false),
(89,'P0','Oncologia','Epirrubicina tem dois registros idênticos de pó 10 mg: revisar protocolização por via/indicação, dose cumulativa, cardiotoxicidade e extravasamento; resolver duplicidade sem perder conteúdo.',true),
(97,'P1','Oftalmologia','Fluormetolona acetato 1 mg/mL suspensão oftálmica: confirmar necessidade de agitação, indicação e tempo de uso, contraindicações infecciosas e monitoramento de pressão intraocular.',false),
(99,'P0','Hematologia/Oncologia','Fludarabina aparece em pó IV 50 mg e comprimidos orais 10 mg históricos; não extrapolar posologia mg/m² entre vias, confirmar registro e ajuste renal/toxicidade imunológica.',true),
(102,'P0','Infectologia/Pediatria','Lincomicina injetável em entradas adulto e criança sem concentração explícita: confirmar solução mg/mL, via IV/IM, dose por peso, infusão, função renal/hepática e colite associada.',true),
(111,'P1','Infectologia','Tianfenicol combina cápsulas 500 mg e granulado 2,5 g por envelope no mesmo rótulo: confirmar princípio ativo/potência, indicação e dose por forma, registro brasileiro.',false),
(128,'P0','Hematologia/Endocrinologia','Oximetolona 50 mg é esteroide anabolizante com riscos hepáticos/endócrinos e restrições legais: validar indicação hematológica específica, contraindicações e monitorização.',true),
(131,'P0','Oncologia','Topotecana IV 4 mg: conferir protocolos por tumor, dose por superfície corporal, dias de ciclo, função renal, preparo e neutropenia.',true),
(138,'P0','Reumatologia/Imunologia','Canaquinumabe 150 mg/mL e forma em pó são mencionados no mesmo registro: conferir apresentações realmente disponíveis, dose por indicação/peso/idade, infecção e necessidade de refrigeração.',true),
(147,'P0','Hematologia/Oncologia','Ruxolitinibe 5/10/15/20 mg: revisar indicação por doença, ajuste hematológico, interação CYP3A4, infecções e suspensão gradual; não validar a partir da simples existência da bula.',true),
(152,'P0','Oncologia','Vinflunina solução 25 mg/mL em frascos de 2 e 10 mL: revisar via intravenosa, diluição, indicação, função hepática e medidas preventivas em extravasamento.',true),
(153,'P0','Oncologia/Imunoterapia','Dostarlimabe 500 mg/10 mL IV: confirmar protocolo oncológico e biomarcadores, ciclo/cadência, toxicidades imuno-mediadas e manejo de infusão.',true),
(155,'P0','Oncologia','Cabazitaxel 60 mg/1,5 mL com diluente 4,5 mL: risco elevado de confundir concentração antes e depois da pré-diluição, revisar preparo específico e dose por m².',true),
(164,'P0','Oncologia','Trastuzumabe entansina (T-DM1) 100/160 mg IV: não confundir com trastuzumabe simples; conferir dose por kg, segurança hepática/plaquetária, via, intervalos e preparo.',true),
(181,'P1','Pediatria/Alergia','Dexclorfeniramina + betametasona tem três rótulos idênticos do mesmo xarope 2+0,25 mg/5 mL: confirmar doses por idade, indicação e cautelas de corticoterapia/anti-histamínico.',false),
(189,'P1','Urologia','Vardenafila 5/10/20 mg: conferir contraindicação com nitratos, interações CYP3A4, QT, indicações e titulação por idade/função hepática.',false),
(193,'P1','Cardiologia/Dislipidemia','Genfibrozila comprimidos 600/900 mg: reconciliar grafia com gemfibrozila ID 878, confirmar formulação, dose/horário e interações musculares com estatinas.',false),
(199,'P0','Pneumologia/Clínica','Hidroxizina + efedrina + teofilina em comprimido e xarope sem proporções descritas no rótulo: revisar dose por três componentes, cardiotoxicidade, sedação, disponibilidade e não confundir com teofilina isolada.',true),
(220,'P0','Psiquiatria/Paliativos','Levomepromazina comprimidos 25/100 mg e gotas 4% (registro com mg/gota): conferir conversão de concentração da solução e dose por via/idade, QT, sedação e hipotensão.',true),
(226,'P1','Neurologia','Piracetam com forças e vias indefinidas no rótulo genérico: confirmar indicação reconhecida, apresentações no Brasil, função renal e posologia específica.',false),
(237,'P0','Pneumologia/DPOC','Indacaterol em cápsula para INALAÇÃO 150/300 mcg: prevenir engolir cápsula, confirmar dispositivo, indicação DPOC e dose por apresentação; não usar como resgate.',true),
(249,'P1','Endocrinologia/GO','Bromocriptina 2,5 mg: revisar indicações por hiperprolactinemia/Parkinson, titulação com alimentação, risco de hipotensão e contraindicações.',false),
(250,'P0','Oftalmologia','Pilocarpina colírios 1%, 2% e 4% em 10 mL: confirmar indicação e concentrações não intercambiáveis, técnica de instilação, efeitos sistêmicos e idade.',true),
(270,'P0','Infectologia','Cloranfenicol sistêmico adulto/criança tem outra ficha para succinato sódico injetável (ID 27): reconciliar sal/via/apresentação, risco de aplasia e síndrome cinzenta em neonatos.',true),
(289,'P0','Clínica/Endocrinologia','Iodeto de potássio em xaropes: confirmar mg/mL e formulação comercial, indicações de expectorante ou outras e NÃO extrapolar para profilaxia de exposição radioativa.',true),
(293,'P0','Oncologia','Capecitabina contém quatro linhas terapêuticas com frequência por regime: confirmar mg/m² e calendário por câncer/protocolo, função renal, DPD/DPYD e interação com anticoagulantes.',true),
(294,'P0','Neurologia/Procedimentos','Toxina botulínica A Xeomin 100/200 U: unidades não são automaticamente equivalentes entre marcas, conferir diluição, músculos-alvo, indicação e precauções neuromusculares.',true),
(353,'P1','Endocrinologia/Diabetes','Sitagliptina 25/50/100 mg: confirmar ajustes por TFGe, indicação no DM2, risco pancreático e diferenças em associação com metformina.',false),
(358,'P1','Endocrinologia/Diabetes','Saxagliptina 5 mg e 2,5 mg por função renal ou inibidor CYP3A4/5: revisar individualização, risco de insuficiência cardíaca e interações.',false),
(360,'P1','Endocrinologia/Obesidade','Orlistate 120 mg: revisar indicação, administração com refeições contendo gordura, alterações gastrointestinais e vitaminas lipossolúveis.',false),
(418,'P0','Cardiologia','Ficha chamada ''isossorbida'' lista mononitrato 20/40 mg; reconciliar com mononitrato ID 208 e dinitrato ID 540, pois trocar mononitrato por dinitrato ou sublingual pode causar erro.',true),
(444,'P1','Psiquiatria/Clínica','Lorazepam oral 1/2 mg: revisar dose por contexto, idosos, insuficiência respiratória, interações sedativas e retirada gradual; verificar exigências legais de prescrição.',false),
(607,'P0','Cardiologia/Dislipidemia','Bezafibrato 200 mg imediato e SR 400 mg sem fonte individual: diferenciar liberação e frequência; conferir função renal, contraindicações hepáticas e risco muscular.',true),
(610,'P1','Endocrinologia/Diabetes','Nateglinida comprimidos 60/120 mg sem fonte: checar administração pré-refeição, hipoglicemia, função hepática e indicação.',false),
(612,'P1','Clínica/Dor','Metocarbamol 500/750 mg e registro de injetável em certos mercados sem fonte: confirmar autorização brasileira, apresentação e sedação/interações.',false),
(616,'P0','Neurologia/Enxaqueca','Zolmitriptana 2,5/5 mg e menção a formulação nasal de outros produtos sem fonte; separar vias e dose, contraindicações cardiovasculares e interações.',true),
(628,'P1','Psiquiatria','Agomelatina 25 mg sem fonte por produto: revisar indicação de depressão, requisitos de testes hepáticos, contraindicações e interações.',false),
(629,'P1','Cardiologia/Dislipidemia','Alirocumabe caneta/seringa SC 75/150 mg sem fonte: conferir dose por dispositivo, intervalo, titulação e possíveis reações de hipersensibilidade.',false),
(631,'P0','Gastroenterologia/Reumatologia','Infliximabe IV 100 mg e biossimilares sem fonte por produto: revisar mg/kg, indicação, esquemas de indução/manutenção, infusão, triagem de tuberculose/hepatite e reações.',true),
(637,'P1','Infectologia/Pediatria','Cefprozil comprimidos 250/500 mg e suspensão oral sem fonte específica: conferir concentrações pediátricas em mg/mL, dose por idade/peso, rim e alergia beta-lactâmica.',false),
(651,'P0','Endocrinologia/Metabolismo ósseo','Alendronato 10/70 mg sem fonte individual: distinguir esquemas diários/semanais, instruções de tomada, contraindicação esofágica e função renal.',true)
), tagged AS (
 UPDATE public.bulario_drugs d
 SET data=jsonb_set(d.data,'{quality_audit}',jsonb_build_object(
  'batch','bul-13-601-650',
  'screened_at','2026-10-16',
  'scope','source_provenance_formulation_duplicates_route_and_medical_review_triage',
  'scientifically_validated',false,
  'priority',i.priority,
  'clinical_area',i.clinical_area,
  'action_required',i.action_required,
  'prescription_copy_blocked',i.prescription_copy_blocked,
  'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
  'formulation_count',jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
  'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE coalesce(f->>'source_url','') NOT LIKE 'http%'),
  'retailer_or_aggregator_hosted_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE lower(coalesce(f->>'source_url','')) ~ '(consultaremedios[.]com[.]br|saudedireta[.]com[.]br|remediobarato[.]com|bula[.]com[.]br|drogasil[.]com[.]br|vteximg[.]com[.]br|onepharma[.]com[.]br|oncoexpress[.]com[.]br)'),
  'generic_placeholder_forms',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE coalesce(f->>'label','') ILIKE '%conforme produto%' OR coalesce(f->>'label','') ILIKE '%conforme registro%' OR coalesce(f->>'label','') ILIKE '%conforme mercado%'),
  'repeated_formulation_label_groups',(SELECT count(*) FROM (SELECT lower(coalesce(f->>'label','')) label FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f GROUP BY 1 HAVING count(*)>1) g),
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
SELECT count(*) tagged_now,(SELECT count(*) FROM items) expected FROM tagged;