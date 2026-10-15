-- LURIA/Bulário — lote 06: registros 251–300
-- Triagem documental e segurança estrutural apenas.
-- A execução NÃO muda posologias, status clínico, bulas ou dosagens.
-- Não substituir etiquetas quality_audit previamente existentes.
WITH targets(id,priority,clinical_area,action_required,prescription_copy_blocked) AS (
 VALUES
(459,'P0','Neurologia/Psiquiatria','Lamotrigina: revisar titulação lenta, reintrodução após pausas, risco de rash grave e interação com valproato.',false),
(550,'P1','Neurologia','Topiramato: separar comprimidos e cápsulas; revisar função renal, acidose, gestação e doses por indicação.',false),
(456,'P0','Neurologia/Pediatria','Carbamazepina: distinguir comprimidos convencionais, CR e suspensão 20 mg/mL; conferir interações e riscos hematológicos.',false),
(739,'P0','Psiquiatria','Clonazepam: comprimidos/gotas agrupados e cinco campos de segurança ausentes; revisar gotas/mg, dependência, retirada e depressão respiratória.',true),
(750,'P0','Psiquiatria','Alprazolam: múltiplas forças sem fonte individual nem cinco campos de segurança; revisar liberação, interações CYP3A4 e dependência.',true),
(751,'P0','Psiquiatria','Zolpidem: liberação imediata e prolongada agrupadas e cinco campos de segurança ausentes; revisar comportamentos complexos do sono e população.',true),
(527,'P0','Neurologia/Psiquiatria','Divalproato: cinco formas DR/ER distintas; confirmar equivalência e frequência sem trocar inadvertidamente liberação prolongada e retardada.',false),
(461,'P0','Neurologia/Psiquiatria','Ácido valproico/valproato: quatro formas e diferentes sais; rever dose expressa em ácido valproico, gestação e monitorização.',false),
(186,'P0','Psiquiatria','Clozapina: confirmar protocolos de neutrófilos/hemograma, risco de agranulocitose, miocardite e íleo antes da titulação.',false),
(142,'P1','Psiquiatria','Paliperidona: formulação oral LP não é substituta dos injetáveis depot; revisar função renal e doses por produto.',false),
(734,'P0','Psiquiatria/Pediatria','Metilfenidato: apresentações IR, LA e OROS agrupadas sem fonte individual; separar sistema de liberação e contraindicações, especialmente cardiovascular e abuso.',true),
(668,'P1','Psiquiatria/Pediatria','Atomoxetina: forças 10–100 mg agrupadas e fonte da apresentação ausente; revisar titulação por peso, contraindicações, interações CYP2D6 e monitorização.',false),
(655,'P1','Neurologia/Geriatria','Donepezila: registrar formas 5/10 mg com fonte específica, confirmação de forças disponíveis e risco de bradicardia/síncope.',false),
(333,'P1','Neurologia/Geriatria','Rivastigmina: separar cápsulas/solução oral e possível adesivo; verificar interrupção/reinício e efeitos gastrointestinais.',false),
(617,'P1','Neurologia/Geriatria','Galantamina: formas IR/ER e solução oral agrupadas sem fonte; verificar titulação e função renal/hepática.',false),
(33,'P1','Neurologia','Baclofeno: duas apresentações orais 10 mg; conferir retirada gradual, função renal e cautelas de sedação.',false),
(606,'P1','Neurologia','Pramipexol: separar IR/ER e indicação Parkinson/pernas inquietas; validar titulação renal e risco de comportamento compulsivo.',false),
(640,'P1','Neurologia','Ropinirol: separar IR/ER, Parkinson/pernas inquietas, ajustes e risco de sonolência e hipotensão.',false),
(666,'P1','Pediatria/Alergia','Levocetirizina: formas oral comprimidos/solução sem fonte individual; confirmar dose etária, função renal e dois campos de segurança.',false),
(593,'P1','Pediatria/Alergia','Fexofenadina: comprimidos 60/120/180 mg e suspensão agrupados sem fonte; conferir uso pediátrico, dose e interações.',false),
(474,'P0','Pediatria/Pneumologia','Montelucaste: quatro apresentações por faixa etária; revisar alertas neuropsiquiátricos, indicações e não uso em crise aguda.',false),
(496,'P1','Pediatria/Gastroenterologia','Lactulose 667 mg/mL: diferenciar constipação de encefalopatia, titulação, desidratação e eletrólitos.',false),
(615,'P1','Pediatria/Nutrição','Colecalciferol: múltiplas forças sem bula específica; converter UI/gota/mL somente por produto, avaliar risco de hipervitaminose.',false),
(619,'P1','Pediatria/Nutrição','Ergocalciferol D2 sem fonte individual; confirmar produto brasileiro, dose em UI e risco de hipercalcemia.',false),
(719,'P1','Clínica/Nutrição','Cianocobalamina: formas VO/IM misturadas e dois campos de segurança ausentes; separar concentração, via e indicação.',false),
(368,'P1','Pediatria/Infectologia','Cefadroxila: somente cápsula 500 mg adulto; verificar suspensão pediátrica, função renal e hipersensibilidade.',false),
(777,'P1','Pediatria/Infectologia','Cefpodoxima proxetila: apresentação genérica sem fonte nem cinco campos; confirmar formas brasileiras, suspensão e dose por peso.',false),
(508,'P1','Urologia','Tansulosina LP 0,4 mg: revisar condições de administração, hipotensão ortostática e interações.',false),
(36,'P0','Infectologia/Hospitalar','Oxacilina sódica injetável 500 mg: conferir diluente, concentração, IM vs IV, alergia e monitorização.',false),
(509,'P1','Urologia/Dermatologia','Finasterida 1/5 mg: distinguir indicação alopecia/HPB, PSA e riscos reprodutivos; não tratar doses como intercambiáveis.',false),
(365,'P1','Pediatria/Infectologia','Ampicilina só em cápsula 500 mg; investigar apresentações pediátricas/IV e doses conforme idade, foco e função renal.',false),
(366,'P0','Infectologia/Hospitalar','Ampicilina+sulbactam frasco 2 g+1 g: conferir dose por componente, reconstituição, infusão e ajuste renal.',false),
(373,'P0','Infectologia/Hospitalar','Cefotaxima 1 g injetável: validar diluente, via, doses neonatais e pediátricas e ajuste renal.',false),
(1015,'P1','Infectologia/Dermatologia','Minociclina: ficha genérica sem fonte nem cinco campos; verificar apresentação, idade, gestação e riscos hepáticos.',false),
(677,'P0','Infectologia/UTI','Tigeciclina IV 50 mg sem fonte individual e dois campos ausentes; rever preparo, alertas de segurança, indicações e função hepática.',false),
(17,'P1','Pediatria/Parasitologia','Mebendazol comprimido 500 mg e suspensão 20 mg/mL: dose por helminto/idade e cautelas por apresentação.',false),
(392,'P1','Infectologia/Pediatria','Nistatina tem rótulos repetidos na suspensão oral; separar indicações, modo de uso e outras apresentações tópicas/vaginais.',false),
(566,'P0','Infectologia/UTI','Caspofungina IV 50/70 mg sem fonte por forma; conferir dose de ataque/manutenção, peso, fígado e diluição.',false),
(552,'P0','Infectologia/UTI','Voriconazol comprimidos/solução/IV agrupados sem fonte; revisar biodisponibilidade, interações, dose de ataque e fígado.',false),
(61,'P0','Infectologia/Transplante','Ganciclovir IV: conferir dose mg/kg, ajuste renal, reconstituição, citotoxicidade e mielossupressão.',false),
(658,'P0','Infectologia/Transplante','Valganciclovir comprimido/solução agrupados sem fonte; conferir doses pediátricas/renais e não equiparar mg com ganciclovir IV.',false),
(938,'P1','GO/Endometriose','Dienogeste sem produto/fonte e sem cinco campos; validar apresentações e contraindicações.',false),
(814,'P0','GO/Endocrinologia/Oncologia','Leuprorrelina depósito com diferentes períodos de ação; ficha genérica sem fonte e cinco campos, não intercambiar formulações.',true),
(1062,'P1','GO/Infectologia','Clindamicina vaginal sem bula específica nem cinco campos; separar da via oral e conferir concentração/duração.',false),
(837,'P1','Cardiorrenal','Bumetanida genérica sem fonte nem cinco campos; validar VO/IV, monitorização renal/eletrólitos e indicação.',false),
(674,'P1','Cardiorrenal','Amilorida sem fonte e dois campos; rever potássio, função renal e interação com IECA/BRA.',false),
(141,'P1','Cardiorrenal','Indapamida LP 1,5 mg: distinguir imediata/LP e monitorar sódio/potássio.',false),
(314,'P1','Cardiorrenal','Clortalidona 12,5/25/50 mg: conferir doses por indicação, sódio/potássio, função renal e urato.',false),
(647,'P1','Urologia','Mirabegrona LP 25/50 mg sem fonte; verificar hipertensão, função renal/hepática e interações CYP2D6.',false),
(883,'P1','Cardiologia','Felodipino genérico sem fonte nem cinco campos; confirmar liberação prolongada, contraindicações e interações CYP3A4.',false)
), marked AS (
 UPDATE public.bulario_drugs d
 SET data=jsonb_set(d.data,'{quality_audit}',jsonb_build_object(
   'batch','bul-06-251-300',
   'screened_at','2026-10-15',
   'scope','presentation_source_safety_fields_and_targeted_medical_review',
   'scientifically_validated',false,
   'priority',t.priority,
   'clinical_area',t.clinical_area,
   'action_required',t.action_required,
   'prescription_copy_blocked',t.prescription_copy_blocked,
   'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
   'formulation_count',jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
   'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE COALESCE(f->>'source_url','') NOT LIKE 'http%'),
   'generic_placeholder_forms',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE COALESCE(f->>'label','') ILIKE '%conforme produto%' OR COALESCE(f->>'label','') ILIKE '%conforme registro%' OR COALESCE(f->>'label','') ILIKE '%conforme mercado%'),
   'repeated_formulation_label_groups',(SELECT count(*) FROM(SELECT lower(coalesce(f->>'label','')) name FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f GROUP BY 1 HAVING count(*)>1) g),
   'missing_core_safety_fields',to_jsonb(array_remove(ARRAY[
     CASE WHEN NOT d.data?'renal_adjustment' THEN 'renal_adjustment' END,
     CASE WHEN NOT d.data?'hepatic_adjustment' THEN 'hepatic_adjustment' END,
     CASE WHEN NOT d.data?'contraindications' THEN 'contraindications' END,
     CASE WHEN NOT d.data?'drug_interactions' THEN 'drug_interactions' END,
     CASE WHEN NOT d.data?'adverse_reactions' THEN 'adverse_reactions' END
   ],NULL))
 ),true)
 FROM targets t
 WHERE d.id=t.id AND NOT(d.data?'quality_audit')
 RETURNING d.id
)
SELECT count(*) newly_tagged,(SELECT count(*) FROM targets) expected FROM marked;