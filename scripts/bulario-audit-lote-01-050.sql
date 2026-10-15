-- LURIA / Bulário / lote prioritário 01 (50 medicamentos)
-- Triagem estrutural; não certifica posologia nem altera dose, fontes ou status principal.
-- Idempotente: insere data.quality_audit apenas quando a chave não existe.
WITH items(id,priority,area,action_required) AS (
VALUES
(738,'P0','Antieméticos','Bromoprida: ficha pediátrica sem dose específica validada e sem campos de segurança; conferir bula e incluir formas adultas, IM/IV e orais somente quando documentadas.'),
(359,'P0','Antieméticos','Metoclopramida: somente comprimido com posologia; conferir fonte das formas injetável, gotas e solução oral, doses distintas e cautelas pediátricas/renais.'),
(742,'P0','Antieméticos','Dimenidrinato: completar campos de contraindicações, interações, reações, ajustes e dose específica por faixa etária/concentração.'),
(356,'P1','Antieméticos','Domperidona: verificar risco de prolongamento QT, interações CYP3A4, grupos com contraindicações e restrições de duração.'),
(493,'P0','Antieméticos','Ondansetrona: duas fichas da mesma apresentação ODT, com orientação pediátrica divergente; conciliar fonte e manter indicações específicas.'),
(94,'P2','Gastroenterologia','Simeticona: conferir dose por concentração e equivalência entre gotas, emulsão e comprimido.'),
(355,'P1','Gastroenterologia','Omeprazol: checar outras apresentações usuais e orientação sobre formulações gastrorresistentes.'),
(491,'P1','Gastroenterologia','Pantoprazol: individualizar rótulos repetidos 40 mg por população e conferir limites pediátricos da bula.'),
(848,'P1','Gastroenterologia','Bisacodil: apresentação genérica sem fonte específica; obter bula de comprimidos/supositórios e confirmar contraindicações e posologia.'),
(599,'P1','Gastroenterologia','Polietilenoglicol/macrogol: confirmar produto com/sem eletrólitos e concentração/sachês; evitar dosagem de fórmula genérica.'),
(665,'P1','Analgesia','Cetoprofeno: ficha agrupa cápsulas, injetável e gel sem fonte da forma; dividir por via e dose antes de liberar.'),
(342,'P0','Analgesia','Dipirona: gotas 500 mg/mL e solução infantil 50 mg/mL sem link próprio de bula; revisar risco de confusão 10x e mg por gota.'),
(510,'P1','Analgesia','Ibuprofeno: revisar apresentações pediátricas 50/100 mg/mL e duplicação de cápsulas 400 mg; checar limites por peso.'),
(434,'P1','Analgesia','Paracetamol: verificar todas as concentrações, teto diário e riscos de hepatotoxicidade em faixas pediátricas.'),
(95,'P1','Analgesia','Diclofenaco sódico: ficha contempla apenas LP 150 mg; separar formulações comuns e risco gastrointestinal/renal.'),
(437,'P0','Analgesia','Tramadol: checar gotas por mL e posologia pediátrica/injetável, contraindicações por idade e interações serotoninérgicas.'),
(435,'P0','Analgesia','Morfina: revisar dose por via e formulação, ausência de injetável no registro e segurança respiratória.'),
(464,'P0','Anestesia','Lidocaína: ficha concentra-se em pomadas/cremes; incluir anestésico local injetável e formulações específicas após fontes.'),
(415,'P1','Cardiorrenal','Furosemida: distinguir doses VO e IV e parâmetros para monitorar função renal/eletrólitos.'),
(573,'P0','Cardiorrenal','Nifedipino: apresentação genérica sem fonte; separar formulação LP e evitar recomendar liberação imediata para redução rápida de PA.'),
(594,'P1','Cardiometabólico','Atorvastatina: falta fonte específica da formulação/dose; completar fichas de 10/20/40/80 mg e interações.'),
(419,'P1','Cardiorrenal','Losartana: conferir disponibilidade de 25/50/100 mg, contraindicações na gestação e ajuste renal/eletrolítico.'),
(407,'P1','Cardiorrenal','Captopril: repetição por quatro indicações; conferir intervalos e risco de rotular como uso sublingual.'),
(350,'P1','Cardiometabólico','Metformina: conferir diferenciação imediata/XR e ajustes por TFGe, contraindicações e duplicidade.'),
(481,'P0','Diabetes','Insulina regular: distinguir concentração, caneta, via IV restrita e protocolos de prescrição monitorizada.'),
(480,'P0','Diabetes','Insulina NPH: diferenciar dose total diária e componente basal; evitar tratar limite da caneta como teto clínico.'),
(363,'P1','Antimicrobianos','Amoxicilina: revisar apresentações pediátricas 250/500 mg por 5 mL, cálculo mg/kg e função renal.'),
(367,'P1','Antimicrobianos','Azitromicina: conferir suspensão 40 mg/mL e peso/idade, duração por indicação e interações.'),
(376,'P0','Antimicrobianos','Ceftriaxona: separar IV e IM; impedir uso IV de diluente com lidocaína; dose/intervalo por peso e indicação.'),
(369,'P1','Antimicrobianos','Cefalexina: uma forma sem fonte por apresentação; completar fonte da suspensão 250 mg/5 mL e ajuste renal.'),
(987,'P1','Alergia','Loratadina: cadastro genérico com contraindicações/interações/reações não preenchidas; conferir apresentações adultas/pediátricas.'),
(586,'P1','Alergia','Cetirizina: formulação genérica sem fonte; conferir comprimidos/solução e ajuste por função renal.'),
(467,'P1','Pneumologia','Salbutamol: manter distinção entre spray 100 mcg/jato e solução nebulização 5 mg/mL; revisar erros de conversão.'),
(500,'P1','Imunologia','Prednisolona: diferenciar gotas 11 mg/mL e solução 3 mg/mL; atenção às faixas e indicação.'),
(654,'P1','Hematologia','Sulfato ferroso: documentar sal e teor de ferro elementar por apresentação antes de posologia adulta/infantil.'),
(544,'P0','Hemostasia','Ácido tranexâmico: separar oral e IV; conferir velocidade de infusão, contraindicações e ajustes renais.'),
(559,'P0','Emergência','Sulfato de magnésio: separar solução 10/20/50%, concentração em g/mL e equivalentes em mEq; restrição por via e protocolo.'),
(1004,'P0','Emergência','Gluconato de cálcio: faltam informações básicas de segurança e apresentação específica; checar cálcio elementar e vias.'),
(587,'P0','Emergência','Cloreto de potássio: separar apresentações VO e concentradas IV, proibir bolus IV e exigir diluição/taxa monitorizada.'),
(557,'P0','Emergência','Bicarbonato de sódio: formular apresentação 8,4% vs outras concentrações, indicação e risco de erros mEq/mL.'),
(675,'P0','Anestesia','Etomidato: ficha sem fonte própria da ampola 2 mg/mL; checar restrições de uso, via e monitorização.'),
(644,'P0','Anestesia','Succinilcolina: apresentação sem fonte; checar contraindicações (hipercalemia/hipertermia maligna), necessidade de via aérea monitorada.'),
(402,'P0','Emergência','Noradrenalina: verificar apresentação base/sal, diluições e velocidades específicas; uso só em ambiente monitorado.'),
(401,'P0','Emergência','Adrenalina: distinguir 1 mg/mL em ampola do autoinjetor; evitar conversão de doses/routes sem indicação.'),
(442,'P0','Anestesia','Midazolam: revisar sal, oito apresentações clínicas com diferentes contextos e mistura de via oral/IV/IM; checar monitorização.'),
(729,'P0','GO/Emergência','Labetalol: confirmar disponibilidade nacional e formulação IV vs VO, especialmente protocolos obstétricos.'),
(832,'P1','GO','Metildopa: ficha genérica sem campos de segurança; completar contraindicacões e doses conforme apresentação.'),
(560,'P0','GO','Metilergometrina: ficha combina VO/IV/IM, conferir concentração e contraindicação em hipertensão/pré-eclâmpsia.'),
(505,'P0','GO','Misoprostol: dose depende da indicação obstétrica; preservar uso hospitalar, via correta e protocolos de restrição.'),
(506,'P0','GO','Ocitocina: checar diluição, titulação na indução e doses no pós-parto, monitorização fetal/uterina; evitar confusão UI/mL.')
), revised AS (
  UPDATE public.bulario_drugs d
  SET data = jsonb_set(d.data, '{quality_audit}', jsonb_build_object(
    'batch','bul-01-050',
    'screened_at','2026-10-15',
    'scope','structural_presence_source_and_safety_field_review',
    'scientifically_validated',false,
    'priority',i.priority,
    'clinical_area',i.area,
    'action_required',i.action_required,
    'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f WHERE coalesce(f->>'source_url','') NOT LIKE 'http%'),
    'missing_core_safety_fields',to_jsonb(array_remove(ARRAY[
      CASE WHEN NOT d.data ? 'renal_adjustment' THEN 'renal_adjustment' ELSE NULL END,
      CASE WHEN NOT d.data ? 'hepatic_adjustment' THEN 'hepatic_adjustment' ELSE NULL END,
      CASE WHEN NOT d.data ? 'contraindications' THEN 'contraindications' ELSE NULL END,
      CASE WHEN NOT d.data ? 'drug_interactions' THEN 'drug_interactions' ELSE NULL END,
      CASE WHEN NOT d.data ? 'adverse_reactions' THEN 'adverse_reactions' ELSE NULL END
    ],NULL)),
    'review_status','PENDING_CLINICAL_SOURCE_REVIEW'
  ),true)
  FROM items i
  WHERE d.id=i.id AND NOT (d.data ? 'quality_audit')
  RETURNING d.id
)
SELECT count(*) AS reviewed_now,(SELECT count(*) FROM items) AS expected FROM revised;