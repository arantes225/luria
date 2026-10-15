-- LURIA / Bulário / lote 03: registros 101 a 150.
-- Somente triagem documental e alvos de revisão. NÃO valida doses nem modifica
-- posologia, status da ficha, produto, fonte ou apresentação.
-- Idempotência: nunca sobrescrever quality_audit existente.
WITH items(id, priority, clinical_area, action_required) AS (
 VALUES
(746,'P1','Pediatria/Gastro','Validar racecadotrila em granulado 10/30 mg: idade/peso, indicação em diarreia aguda, duração e critérios de reidratação; preencher campos básicos de segurança ausentes.'),
(831,'P1','Pediatria/Gastro','Saccharomyces boulardii: ficha genérica sem bula específica e sem cinco campos de segurança; checar cepa, UFC/mg, formulação por produto, risco em cateter venoso/imunossupressão e indicação real.'),
(301,'P0','Pediatria/Pneumologia/Toxicologia','Acetilcisteína: cinco formulações, separar uso mucolítico VO/nebulização do antídoto na intoxicação por paracetamol; conferir concentração, via e protocolo hospitalar sem extrapolação.'),
(826,'P1','Pediatria/Pneumologia','Ambroxol: ficha genérica sem apresentação/fonte e sem campos básicos de segurança; selecionar xarope/gotas/comprimido reais e validar indicação e restrições etárias.'),
(827,'P1','Pediatria/Pneumologia','Bromexina: sem bula específica e sem campos básicos de segurança; confirmar apresentações, concentrações pediátricas, indicação e uso por faixa etária.'),
(828,'P1','Pediatria/Pneumologia','Guaifenesina: ficha genérica sem fonte e segurança; revisar xarope mg/mL, associações e idade indicada; não assumir eficácia/posologia universal.'),
(920,'P1','Pediatria/Pneumologia','Acebrofilina: sem bula própria e campos de segurança; conferir concentração e restrições por idade, indicações e contraindicações.'),
(469,'P0','Pneumologia','Formoterol: validar inalador 12 mcg e apresentações associadas; evitar que monoterapia de LABA seja apresentada como tratamento adequado da asma sem anti-inflamatório inalatório.'),
(470,'P0','Pneumologia','Salmeterol: conferir 50 mcg/dose, dispositivo, indicação e associação com corticosteroide inalatório quando necessário; não recomendar LABA isolado para asma.'),
(529,'P1','Pneumologia','Tiotrópio: ficha agrupa Respimat e HandiHaler com doses/dispositivos distintos sem fonte por forma; desmembrar antes de prescrição e revisar idade/indicação.'),
(364,'P0','Pediatria/Infectologia','Amoxicilina/clavulanato: conferir quatro apresentações, proporção de clavulanato, dose expressa em amoxicilina, peso/idade, função renal e duração por indicação.'),
(377,'P1','Infectologia/Cirurgia','Cefuroxima: ficha apenas pó injetável; verificar apresentações orais e diferença de sal/forma, biodisponibilidade e ajustes renais sem extrapolar doses.'),
(379,'P1','Infectologia','Claritromicina: verificar quatro apresentações (LP, IV, duas suspensões), interação medicamentosa, QT, função renal e diferenças entre formulações.'),
(372,'P1','Pediatria/Infectologia','Cefixima: rotulagem genérica ''oral'' sem concentração ou idade; detalhar apresentação, doses pediátricas e ajuste renal segundo bula do produto.'),
(775,'P1','Pediatria/Infectologia','Cefaclor: diferentes forças listadas na mesma formulação e cinco campos de segurança ausentes; separar suspensão/cápsula e validar mg/kg, alergia e função renal.'),
(391,'P1','APS/Infectologia','Nitrofurantoína: apenas cápsula 100 mg; revisar indicação exclusivamente urinária, restrições por função renal, idade/gestação e outras apresentações vigentes.'),
(865,'P1','APS/Infectologia','Fosfomicina trometamol: ficha genérica, sem fonte e campos básicos; validar sachê, composição, indicação de cistite e eventuais limitações em gestação/idade.'),
(381,'P1','APS/Infectologia','Doxiciclina: checar forma solúvel 100 mg, contraindicações/interações, faixa etária, duração e instruções de administração.'),
(378,'P1','Infectologia','Ciprofloxacino: três formas oral e IV; ajustar por indicação/função renal, garantir concentração correta e revisão de riscos de fluoroquinolona.'),
(546,'P1','Infectologia','Valaciclovir: 500 mg/1 g agrupados sem fonte específica; validar forma, esquemas por doença, indicação renal e idade.'),
(524,'P1','Dermatologia/Infectologia','Terbinafina: cinco regimes tópicos; conferir indicação e duração por sítio e incluir comprimido oral para onicomicose se apresentação brasileira validada.'),
(523,'P0','Dermatologia/Infectologia','Cetoconazol: evitar uso presumido de comprimidos orais históricos a partir da bula de creme/shampoo; separar formas tópicas e verificar status regulatório/risco hepático da via sistêmica.'),
(521,'P1','Dermatologia/GO','Clotrimazol: apenas apresentações dermatológicas na ficha; verificar apresentações vaginais por bula específica, contraindicações e modo de uso.'),
(450,'P1','Psiquiatria','Fluoxetina: somente cápsula 20 mg; revisar outras forças/formas, dose de início, escalonamento e risco de interação com outros serotoninérgicos.'),
(449,'P1','Psiquiatria','Sertralina: comprimidos 50/100 mg agrupados; verificar escalonamento, faixa pediátrica por indicação e interações/monitorização.'),
(451,'P1','Psiquiatria','Escitalopram: somente solução 20 mg/mL (1 mg/gota); conferir equivalência gotas/mg, comprimidos e distinguir de citalopram, que não é sinônimo.'),
(580,'P1','Psiquiatria','Paroxetina: forma comum e CR agrupadas sem bula específica; dividir por liberação/força, retirada gradual e contraindicações/interações.'),
(452,'P1','Psiquiatria','Venlafaxina: cápsulas LP 37,5/75/150 mg; checar titulação, pressão arterial, função renal/hepática e descontinuação.'),
(570,'P1','Psiquiatria','Duloxetina: cápsulas gastrorresistentes 30/60 mg sem fonte individual; conferir bula, indicações, função hepática/renal e administração.'),
(454,'P1','Psiquiatria','Bupropiona: apenas liberação prolongada 12 h 150 mg; diferenciar outras formulações e conferir epilepsia, transtornos alimentares e risco convulsivo.'),
(563,'P1','Psiquiatria','Mirtazapina: comprimidos e orodispersível agrupados sem fonte; validar posologias e restrições por produto, sedação e interações.'),
(562,'P1','Psiquiatria','Trazodona: formas imediata/prolongada agrupadas sem fonte específica; separar concentrações, contraindicações, sedação, hipotensão e risco de priapismo.'),
(453,'P0','Psiquiatria/Pediatria','Amitriptilina: cinco regimes e rótulo de apresentação duplicado; conferir uso pediátrico por indicação, contraindicações cardíacas, anticolinérgicas e intoxicação.'),
(446,'P0','Psiquiatria','Quetiapina: 90 entradas de formulações em uma só ficha, 14 grupos de rótulos duplicados; revisar excesso/duplicações por via, concentração, liberação IR/XR, população, titulação e indicação antes de disponibilizar seleção.'),
(447,'P1','Psiquiatria','Risperidona: duas indicações em comprimidos 1/2/3 mg; verificar solução oral e injetáveis com fontes separadas e segurança metabólica/extrapiramidal.'),
(448,'P1','Psiquiatria','Olanzapina: quatro regimes orais; verificar formulações orodispersível/injetável separadas por indicação, população e cautelas metabólicas.'),
(445,'P0','Psiquiatria/Emergência','Haloperidol: apenas esquemas orais; verificar apresentação injetável, diferenciação VO/IM, distonia aguda, QT e limites de segurança antes de sugerir agitação.'),
(578,'P1','Psiquiatria','Aripiprazol: várias formas citadas numa apresentação genérica sem fonte por forma; separar comprimidos, solução e injetáveis conforme produto.'),
(328,'P0','Psiquiatria','Lítio: duas apresentações de carbonato IR/CR; revisar níveis séricos e janela terapêutica, gestação, função renal/tireoide e interações com diuréticos/AINEs.'),
(426,'P0','Cardiologia/APS','AAS: cinco cenários, diferenciar dose antiagregante e analgésica; confirmar síndrome coronariana, contraindicações/hemorragia e apresentações.'),
(427,'P1','Cardiologia','Clopidogrel: comprimido 75 mg; verificar indicação e dose de ataque versus manutenção, CYP/interações, cirurgia e risco hemorrágico.'),
(305,'P0','Cardiologia/Anticoagulação','Varfarina: duas entradas com titulação por RNI; não gerar dose fixa automática; conferir interações, gestação, reversão e indicação.'),
(432,'P0','Cardiologia/Anticoagulação','Apixabana: sete cenários por indicação e função renal; validar redução da dose apenas quando critérios reais satisfeitos e impedir generalização para todos os casos.'),
(430,'P0','Cardiologia/Anticoagulação','Rivaroxabana: oito cenários por indicação; verificar dose dependente de função renal, necessidade de alimento, idade e condições hemorrágicas.'),
(428,'P0','Emergência/Anticoagulação','Enoxaparina: apenas profilaxia e tratamento genéricos; checar dose por peso, função renal, população gestante e apresentação em seringas; risco de confundir unidades.'),
(436,'P0','Emergência/Toxicologia','Naloxona: seis esquemas por situação e idade; conferir apresentações IV/IM/IN, via, titulação clínica e monitorização de recorrência de depressão respiratória.'),
(185,'P0','Emergência/Toxicologia','Flumazenil: bula da solução 0,1 mg/mL; verificar contraindicações em intoxicação mista, convulsões, dependência de benzodiazepínicos e observação.'),
(441,'P0','Anestesia/UTI','Propofol: seis esquemas; revisar concentração, unidade mg vs mL e contextos de sedação/anestesia, profissionais habilitados e monitorização.'),
(439,'P0','Anestesia/UTI','Fentanila: cinco formulações em diferentes concentrações/embalagens; revisar via, mcg vs mg, bolus/infusão, riscos de apneia e monitorização.'),
(1006,'P0','Emergência','Glicose 50%: ficha genérica sem fonte específica nem cinco campos básicos; verificar concentração, volume por ampola, via, riscos de extravasamento e protocolo de hipoglicemia.')
), annotated AS (
 UPDATE public.bulario_drugs d
 SET data = jsonb_set(d.data,'{quality_audit}',
 jsonb_build_object(
   'batch','bul-03-101-150',
   'screened_at','2026-10-15',
   'scope','formulation_coverage_sources_safety_and_clinical_review_targets',
   'scientifically_validated',false,
   'priority',i.priority,
   'clinical_area',i.clinical_area,
   'action_required',i.action_required,
   'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
   'formulation_count',jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
   'missing_source_formulations',(
     SELECT count(*) FROM jsonb_array_elements(
       CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END
     ) f WHERE COALESCE(f->>'source_url','') NOT LIKE 'http%'
   ),
   'generic_placeholder_forms',(
     SELECT count(*) FROM jsonb_array_elements(
       CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END
     ) f WHERE f->>'label' ILIKE '%conforme produto%' OR f->>'label' ILIKE '%conforme registro%'
   ),
   'repeated_formulation_label_groups',(
     SELECT count(*) FROM (
       SELECT COALESCE(f->>'label','') label FROM jsonb_array_elements(
         CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END
       ) f GROUP BY COALESCE(f->>'label','') HAVING count(*)>1
     ) duplicated
   ),
   'missing_core_safety_fields',to_jsonb(array_remove(ARRAY[
      CASE WHEN NOT d.data ? 'renal_adjustment' THEN 'renal_adjustment' END,
      CASE WHEN NOT d.data ? 'hepatic_adjustment' THEN 'hepatic_adjustment' END,
      CASE WHEN NOT d.data ? 'contraindications' THEN 'contraindications' END,
      CASE WHEN NOT d.data ? 'drug_interactions' THEN 'drug_interactions' END,
      CASE WHEN NOT d.data ? 'adverse_reactions' THEN 'adverse_reactions' END
   ],NULL))
 ),true)
 FROM items i
 WHERE d.id=i.id AND NOT(d.data ? 'quality_audit')
 RETURNING d.id
)
SELECT count(*) updated_count,(SELECT count(*) FROM items) expected FROM annotated;