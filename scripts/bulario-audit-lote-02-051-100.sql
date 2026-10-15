-- LURIA / Bulário / lote 02: itens 51 a 100
-- Observações de triagem estrutural, não se presume validação de doses pela mera presença de fonte.
-- Idempotente: não substitui avaliações anteriores nem modifica data.formulations/data.status.
WITH items(id,priority,area,action_required) AS (
 VALUES
(403,'P0','Emergência/Arritmias','Revisar as duas indicações do mesmo frasco de adenosina 3 mg/mL; confirmar bolus IV rápido, flush, via e distinção adulto/pediatria, sem automatizar em ritmo não indicado.'),
(404,'P0','Emergência/Arritmias','Registro contém apenas comprimidos de 100/200 mg; pesquisar e validar apresentação intravenosa para arritmias antes de associar esquemas agudos.'),
(30,'P0','Emergência/Arritmias','Conferir fontes para sulfato de atropina injetável 0,25 e 0,50 mg/mL; separar bradicardia e outras indicações com doses, vias e concentrações próprias.'),
(411,'P0','Emergência/UTI','Validar infusão de dobutamina em adultos e crianças por concentração final, diluição, titulação e monitorização hemodinâmica.'),
(412,'P0','Emergência/UTI','Validar dopamina 5 mg/mL e conversão mcg/kg/min para mL/h; diferenciar ampola de concentração final da infusão.'),
(630,'P0','Emergência/UTI','Vasopressina com apresentação genérica sem fonte individual; fixar unidade UI/mL e doses por indicação em bula antes de habilitar cálculo.'),
(683,'P0','Emergência/UTI','Fenilefrina injetável sem fonte específica; estabelecer concentração de ampola, diluição e rota; completar ajustes renal/hepático.'),
(421,'P0','Emergência/UTI','Nitroprussiato: conferir diluição e dose titulada; manter alerta de proteção da luz, hipotensão, toxicidade por cianeto/tiocianato e monitorização.'),
(223,'P0','Emergência/Cardiologia','Nitroglicerina só possui sistemas transdérmicos; faltam apresentações sublingual e IV comuns, que exigem protocolos distintos de indicação e administração.'),
(416,'P0','Emergência/GO','Hidralazina: revisar duas fichas para ampola 20 mg/mL, bolus versus infusão e uso em hipertensão grave na gestação.'),
(730,'P0','Emergência/UTI','Esmolol IV sem fonte individual e campos de ajuste renal/hepático; confirmar concentração pronta e diluída, via e contraindicações.'),
(410,'P1','Cardiologia','Digoxina representada apenas por elixir 0,05 mg/mL; conferir apresentações em comprimidos e necessidade de função renal, potássio e dosagem sérica.'),
(551,'P0','Emergência/Hemostasia','Protamina com fonte individual ausente; confirmar sal registrado (registro menciona cloridrato, ficha descreve sulfato), concentração e neutralização de heparina sob monitorização.'),
(539,'P0','Emergência/Hemostasia','Fitomenadiona com concentração variável e sem fonte individual; distinguir vias, idade e indicações de reversão anticoagulante versus profilaxia neonatal.'),
(64,'P0','Endócrino/Hemostasia','Desmopressina com seis apresentações: revisar concentração/via por diabetes insipidus, enurese e hemostasia; risco de hiponatremia/restrição hídrica.'),
(457,'P0','Emergência/Neurologia','Fenitoína com seis cenários; revisar dose expressa em mg, velocidade de infusão, interação medicamentosa, hipotensão e risco de arritmia.'),
(722,'P0','Emergência/Neurologia','Fosfenitoína sem bula da apresentação, com dose expressa em equivalentes de fenitoína (PE); impedir conversão 1:1 com concentração do sal.'),
(460,'P1','Neurologia','Levetiracetam: conferir apresentações VO e IV, equivalência de concentração 100 mg/mL, ajustes por função renal e titulação pediátrica.'),
(458,'P0','Emergência/Neurologia','Fenobarbital registra só formas orais; localizar fonte e apresentação injetável antes de prescrever estado de mal epiléptico.'),
(443,'P0','Emergência/Neurologia','Diazepam registra apenas comprimidos 5 e 10 mg; faltam apresentações injetável e retal/bucal quando disponíveis, com alertas de depressão respiratória.'),
(864,'P0','Infectologia/UTI','Meropenem sem fonte de apresentação e sem cinco campos de segurança; obter bula de injetável específico, infusão, ajustes renal e neurotoxicidade.'),
(396,'P0','Infectologia/UTI','Piperacilina+tazobactam: verificar oito fichas separadas por indicação, pediatria, mg/kg do componente piperacilina, renal e tempo de infusão.'),
(400,'P0','Infectologia/UTI','Vancomicina sistêmica: confirmar infusão, ajuste renal, monitorização farmacocinética quando disponível e indicação separada de vias oral/IV.'),
(388,'P0','Infectologia/UTI','Linezolida: revisar seis fichas, IV/oral, trombocitopenia, interações serotoninérgicas e duração por foco, sem doses pediátricas extrapoladas.'),
(385,'P0','Infectologia/UTI','Gentamicina: checar concentrações das cinco apresentações, intervalo estendido versus convencional, nefro/ototoxicidade e monitorização de níveis.'),
(543,'P0','Infectologia/UTI','Amicacina 50–250 mg/mL genérica sem bula por produto; separar concentrações, ajustar por peso/função renal e sinalizar ototoxicidade.'),
(390,'P1','Infectologia','Metronidazol apenas oral na ficha; procurar fontes separadas para IV e vaginal, doses por indicação e risco de confusão de vias.'),
(380,'P0','Infectologia/Pediatria','Clindamicina: duas apresentações sem fonte individual (vaginal e solução oral pediátrica); confirmar concentração e separar dose por via; monitorar risco de C. difficile.'),
(387,'P1','Infectologia','Levofloxacino: revisar oral e IV 750 mg, interações, tendinopatia, QT e ajuste em insuficiência renal.'),
(398,'P0','Infectologia/Pediatria','SMX+TMP: 19 apresentações/regimes; normalizar unidades conforme trimetoprima, doses mg/kg, prevenção versus tratamento e alertas de sulfonamidas.'),
(371,'P0','Infectologia/UTI','Cefepima 1/2 g IV: validar função renal, infusão pediátrica e risco de neurotoxicidade por acúmulo.'),
(370,'P1','Infectologia/Cirurgia','Cefazolina: única apresentação de 1 g injetável; verificar profilaxia cirúrgica por peso, redose intraoperatória e ajustes renais.'),
(375,'P1','Infectologia/Pediatria','Ceftazidima: conferir adulto/pediatria, diluição e infusão, ajuste por função renal e indicação hospitalar.'),
(383,'P1','Infectologia','Fluconazol só contém cápsula de 150 mg; verificar cápsulas de outras forças, solução oral e IV por indicações sistêmicas e ajuste renal.'),
(555,'P0','Infectologia/Pediatria','Oseltamivir registra cápsulas/suspensão agrupadas sem fonte individual; validar formulação pediátrica em mg/mL, peso, idade e ajuste renal.'),
(748,'P0','Pediatria/APS','Sais de reidratação oral: cinco campos de segurança ausentes; fixar composição/concentração do sachê, volume para reconstituição e orientação de sinais de desidratação grave.'),
(471,'P1','Pediatria/Pneumologia','Budesonida: duas apresentações nebulizadas com fonte e forma oral sem fonte; diferenciar indicação respiratória de formulações gastrointestinais, não intercambiáveis.'),
(468,'P1','Pediatria/Pneumologia','Ipratrópio: solução nebulização 0,25 mg/mL; conferir número de gotas por mL, uso como adjuvante na crise e apresentações em spray dosimetrado.'),
(498,'P1','Pediatria/Clínica','Dexametasona com quatro esquemas orais; verificar vias parenterais e indicação pediátrica, evitando confundir elixires 0,1 mg/mL e 0,5 mg/5 mL.'),
(501,'P0','Emergência/Endócrino','Hidrocortisona 100/500 mg: validar volume de reconstituição e concentração final; diferenciar crise adrenal, alergia e outros protocolos de urgência.'),
(502,'P0','Ginecologia/Contracepção','Levonorgestrel tem dois itens duplicados de DIU 52 mg; falta contracepção de emergência oral com apresentações e orientações próprias.'),
(504,'P1','Ginecologia/Contracepção','Medroxiprogesterona com duas fichas da apresentação IM 150 mg/mL; conferir formas oral e subcutânea quando registradas, intervalos e contraindicações.'),
(162,'P1','Ginecologia/Obstetrícia','Progesterona: conferir cápsulas VO/vaginais e gel 8%; indicação, idade gestacional, dose e via não devem ser extrapoladas entre produtos.'),
(542,'P0','Ginecologia/Obstetrícia','Dinoprostona sem fonte individual; separar dispositivo vaginal e gel conforme registro; considerar taquissistolia, monitorização fetal e cicatriz uterina.'),
(90,'P1','Ginecologia/APS','Ácido fólico registra duas entradas de comprimido 5 mg; revisar duplicidade e disponibilidade de 0,4/1 mg para profilaxia gestacional.'),
(408,'P1','Cardiologia','Carvedilol com comprimidos 3,125/6,25/12,5/25 mg: conferir titulação, bradicardia, hipotensão e insuficiência cardíaca descompensada.'),
(414,'P1','Cardiologia','Espironolactona: validar 25/50 mg, doses por indicação e monitorização do potássio/função renal.'),
(487,'P1','Endocrinologia','Empagliflozina 10/25 mg: revisar limiares de função renal por indicação, risco de cetoacidose e suspensão perioperatória segundo protocolo atualizado.'),
(298,'P1','Endocrinologia','Levotiroxina com 14 forças; conferir identidade em microgramas, população e titulação, interações com ferro/cálcio e duplicidade por força.'),
(478,'P1','Endocrinologia','Glibenclamida 5 mg: confirmar risco de hipoglicemia prolongada, contraindicações em disfunção renal e situação gestacional.')
), annotated AS (
 UPDATE public.bulario_drugs d
 SET data=jsonb_set(d.data,'{quality_audit}',jsonb_build_object(
    'batch','bul-02-051-100',
    'screened_at','2026-10-15',
    'scope','presence_formulation_source_safety_fields_and_clinical_review_targets',
    'scientifically_validated',false,
    'priority',i.priority,
    'clinical_area',i.area,
    'action_required',i.action_required,
    'missing_source_formulations',(
      SELECT count(*) FROM jsonb_array_elements(
        CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END
      ) f WHERE COALESCE(f->>'source_url','') NOT LIKE 'http%'
    ),
    'missing_core_safety_fields',to_jsonb(array_remove(ARRAY[
      CASE WHEN NOT d.data?'renal_adjustment' THEN 'renal_adjustment' ELSE NULL END,
      CASE WHEN NOT d.data?'hepatic_adjustment' THEN 'hepatic_adjustment' ELSE NULL END,
      CASE WHEN NOT d.data?'contraindications' THEN 'contraindications' ELSE NULL END,
      CASE WHEN NOT d.data?'drug_interactions' THEN 'drug_interactions' ELSE NULL END,
      CASE WHEN NOT d.data?'adverse_reactions' THEN 'adverse_reactions' ELSE NULL END
    ],NULL)),
    'review_status','PENDING_CLINICAL_SOURCE_REVIEW'
  ),true)
 FROM items i
 WHERE d.id=i.id AND NOT(d.data?'quality_audit')
 RETURNING d.id
)
SELECT count(*) AS tagged_now,(SELECT count(*) FROM items) AS expected FROM annotated;