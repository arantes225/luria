-- ==============================================================================
-- TRAUBE: EXPANSÃO DO BULÁRIO CLÍNICO (RENAME & EMERGÊNCIA / MEDICINA INTENSIVA)
-- Data: 2026-10-26
-- Instruções: Aplicar via Supabase (execute_sql) sob revisão farmacêutica/médica.
-- Status padrão: 'verified' (conferido, sem motor automatizado de dosagem pediátrica)
-- ==============================================================================

INSERT INTO public.bulario_catalog (
  id,
  name,
  active_ingredient,
  therapeutic_class,
  pharmacological_class,
  data
) VALUES
-- 1. ADRENALINA (EPINEFRINA)
(
  gen_random_uuid(),
  'Adrenalina (Epinefrina)',
  'Epinefrina',
  'Emergência / Agonista Adrenérgico',
  'Simpaticomimético alfa e beta adrenérgico',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Emergência / Choque / Anafilaxia',
    'indication', 'Anafilaxia grave, parada cardiorrespiratória (PCR), choque cardiogênico refratário, broncoespasmo grave e estridor laríngeo pós-extubação.',
    'presentation', 'Ampola 1 mg/mL (1:1.000) 1 mL injetável.',
    'diseases', jsonb_build_array('Anafilaxia', 'PCR', 'Choque Anafilático', 'Choque Cardiogênico', 'Laringite / Crupe'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Anafilaxia (Adulto)',
        'dose_text', '0,3 a 0,5 mg (0,3 a 0,5 mL da solução 1:1.000) por via Intramuscular (IM) no vasto lateral da coxa. Repetir a cada 5-15 min se má resposta.',
        'route', 'IM',
        'population', 'Adulto',
        'cautions', 'Nunca administrar a apresentação 1:1.000 em bolus intravenoso (risco de arritmia fatal e hemorragia intracraniana).'
      ),
      jsonb_build_object(
        'label', 'Anafilaxia (Pediatria)',
        'dose_text', '0,01 mg/kg (0,01 mL/kg da ampola 1:1.000 pura) IM, máximo de 0,3 mg por dose em crianças.',
        'route', 'IM',
        'population', 'Pediatria',
        'cautions', 'Preferir sempre o terço médio anterolateral da coxa.'
      ),
      jsonb_build_object(
        'label', 'Parada Cardiorrespiratória (PCR)',
        'dose_text', '1 mg (1 ampola) IV/IO em bolus rápido + 20 mL de flush de SF 0,9% com elevação de membro, a cada 3 a 5 minutos conforme protocolo ACLS.',
        'route', 'IV/IO',
        'population', 'Adulto'
      )
    ),
    'contraindications', 'Sem contraindicações absolutas em PCR e anafilaxia grave.',
    'adverse_reactions', 'Taquicardia, palpitações, ansiedade, cefaleia, tremores, hipertensão grave, isquemia miocárdica e arritmias ventriculares.',
    'drug_interactions', 'Betabloqueadores podem induzir vasoconstrição desimpedida grave e hipertensão com bradicardia reflexa.',
    'pregnancy_category', 'C',
    'pregnancy_text', 'Uso justificável em emergências com risco de vida (PCR e anafilaxia).',
    'reviewed_at', '2026-10-26'
  )
),
-- 2. NORADRENALINA (NOREPINEFRINA)
(
  gen_random_uuid(),
  'Noradrenalina (Hemitartarato de Norepinefrina)',
  'Norepinefrina',
  'Vasopressor / Agonista Alfa-Adrenérgico',
  'Vasopressor Simpaticomimético',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Emergência / CTI / Choque',
    'indication', 'Vasopressor de primeira linha no choque séptico, choque distributivo e hipotensão refratária.',
    'presentation', 'Ampola 4 mg/4 mL (1 mg/mL base).',
    'diseases', jsonb_build_array('Choque Séptico', 'Choque Distributivo', 'Hipotensão Refratária'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Infusão Contínua (Solução Padrão 4 ampolas)',
        'dose_text', 'Diluir 4 ampolas (16 mg / 16 mL) em 234 mL de SG 5% (total 250 mL; concentração 64 mcg/mL). Iniciar em 0,05 a 0,1 mcg/kg/min e titular a cada 2-5 min até atingir PAM >= 65 mmHg.',
        'route', 'IV (Bomba de Infusão)',
        'population', 'Adulto',
        'cautions', 'Infusão obrigatória em acesso venoso central (preferencial) ou periférico calibroso temporário em emergência.'
      )
    ),
    'compatible_diluents', 'Soro Glicosado 5% (SG 5%) preferencial para prevenir oxidação; compatível com SF 0,9% por períodos curtos.',
    'contraindications', 'Hipovolemia não corrigida (exceto como medida de emergência temporária para manter perfusão coronariana).',
    'adverse_reactions', 'Isquemia periférica/digital, necrose por extravasamento tecidual, taquiarritmias e bradicardia reflexa.',
    'antidote', 'Fentolamina 5-10 mg diluída e infiltrada no local do extravasamento para prevenir necrose.',
    'reviewed_at', '2026-10-26'
  )
),
-- 3. NALOXONA
(
  gen_random_uuid(),
  'Naloxona',
  'Cloridrato de Naloxona',
  'Antídoto / Emergência',
  'Antagonista Puro dos Receptores Opioides',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Toxicologia / Emergência',
    'indication', 'Reversão total ou parcial da depressão respiratória induzida por opioides naturais ou sintéticos.',
    'presentation', 'Ampola 0,4 mg/1 mL injetável.',
    'diseases', jsonb_build_array('Intoxicação por Opioides', 'Depressão Respiratória Pós-Operatória'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Intoxicação Aguda por Opioides',
        'dose_text', '0,04 a 0,4 mg IV, IM ou SC a cada 2-3 minutos até reversão da depressão respiratória. Pode ser titulada até 2 mg (doses maiores até 10 mg para opioides sintéticos como fentanil/metadona).',
        'route', 'IV/IM/SC/Intranasal',
        'population', 'Adulto',
        'cautions', 'A meia-vida da naloxona (30-90 min) costuma ser menor que a do opioide causador; monitorar por risco de recorrência da apneia.'
      )
    ),
    'adverse_reactions', 'Síndrome de abstinência aguda em dependentes químicos (agitação, taquicardia, sudorese, náuseas, piloereção, cólica abdominal).',
    'reviewed_at', '2026-10-26'
  )
),
-- 4. FLUMAZENIL
(
  gen_random_uuid(),
  'Flumazenil',
  'Flumazenil',
  'Antídoto / Emergência',
  'Antagonista de Receptores Benzodiazepínicos',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Toxicologia / Anestesiologia',
    'indication', 'Reversão dos efeitos sedativos centrais de benzodiazepínicos em procedimentos diagnósticos ou anestésicos.',
    'presentation', 'Ampola 0,5 mg/5 mL (0,1 mg/mL).',
    'diseases', jsonb_build_array('Sedação por Benzodiazepínico', 'Intoxicação Acidental'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Reversão de Sedação',
        'dose_text', '0,2 mg IV em 15-30 segundos. Se não houver resposta após 60 segundos, administrar 0,1 mg a cada 60 segundos até dose máxima total de 1 mg.',
        'route', 'IV',
        'population', 'Adulto',
        'cautions', 'Contraindicado em usuários crônicos de benzodiazepínicos ou suspeita de co-ingestão de antidepressivos tricíclicos (risco altíssimo de convulsões refratárias e arritmias).'
      )
    ),
    'contraindications', 'Uso crônico de BZD com risco de abstinência convulsiva; suspeita de intoxicação por tricíclicos ou pró-convulsivantes.',
    'reviewed_at', '2026-10-26'
  )
),
-- 5. ATROPINA
(
  gen_random_uuid(),
  'Atropina (Sulfato de Atropina)',
  'Sulfato de Atropina',
  'Anticolinérgico / Parassimpatolítico',
  'Antagonista Muscarínico',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Cardiologia / Toxicologia',
    'indication', 'Bradicardia sinusal sintomática, bloqueios AV nodais, intoxicação por organofosforados / carbamatos.',
    'presentation', 'Ampola 0,25 mg/1 mL e 0,5 mg/1 mL.',
    'diseases', jsonb_build_array('Bradicardia Sintomática', 'Intoxicação por Organofosforados'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Bradicardia Sintomática (ACLS)',
        'dose_text', '1 mg IV em bolus rápido a cada 3 a 5 minutos, até dose máxima cumulativa de 3 mg.',
        'route', 'IV',
        'population', 'Adulto',
        'cautions', 'Doses menores que 0,5 mg podem causar bradicardia paradoxal central.'
      ),
      jsonb_build_object(
        'label', 'Intoxicação por Organofosforados',
        'dose_text', '2 a 4 mg IV a cada 5-10 minutos, dobrando a dose se necessário até atingir atropinização (secreções brônquicas secas, melhora da broncorreia e broncoespasmo).',
        'route', 'IV',
        'population', 'Adulto'
      )
    ),
    'adverse_reactions', 'Boca seca, midríase, visão turva, retenção urinária, taquicardia, delírio anticolinérgico.',
    'reviewed_at', '2026-10-26'
  )
),
-- 6. SULFATO DE MAGNÉSIO
(
  gen_random_uuid(),
  'Sulfato de Magnésio',
  'Sulfato de Magnésio Heptaidratado',
  'Eletrólito / Anticonvulsivante Obstétrico',
  'Sal Mineral de Magnésio',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Obstetrícia / Cardiologia / Pneumologia',
    'indication', 'Prevenção e tratamento de convulsões na pré-eclâmpsia grave e eclâmpsia; Torsades de Pointes; crise de asma grave refratária.',
    'presentation', 'Ampola 10% (1 g/10 mL) e 50% (5 g/10 mL).',
    'diseases', jsonb_build_array('Pré-Eclâmpsia Grave', 'Eclâmpsia', 'Torsades de Pointes', 'Crise de Asma Grave'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Pré-eclâmpsia / Eclâmpsia (Esquema de Zuspan)',
        'dose_text', 'Ataque: 4 g IV em 15-20 minutos (ex.: 8 mL de MgSO4 50% + 12 mL SG 5%). Manutenção: 1 a 2 g/h em bomba de infusão contínua.',
        'route', 'IV',
        'population', 'Obstetrícia',
        'cautions', 'Monitorar a cada hora: reflexo patelar (presente), diurese (>= 25 mL/h) e frequência respiratória (>= 12 a 16 irpm).'
      ),
      jsonb_build_object(
        'label', 'Torsades de Pointes',
        'dose_text', '1 a 2 g IV diluídos em 50 a 100 mL de SG 5% infundidos em 10 a 15 minutos.',
        'route', 'IV',
        'population', 'Adulto'
      )
    ),
    'antidote', 'Gluconato de Cálcio 10% 10 mL IV lento em 3-5 minutos se intoxicação por magnésio (depressão respiratória / perda de reflexos).',
    'reviewed_at', '2026-10-26'
  )
),
-- 7. CETAMINA (QUETAMINA)
(
  gen_random_uuid(),
  'Cetamina',
  'Cloridrato de Cetamina',
  'Anestésico Geral / Analgésico Dissociativo',
  'Antagonista NMDA',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Anestesiologia / Emergência / SRI',
    'indication', 'Indução anestésica em Sequência Rápida de Intubação (SRI) - especialmente em choque ou broncoespasmo; sedoanalgesia procedimental.',
    'presentation', 'Frasco-ampola 50 mg/mL (10 mL).',
    'diseases', jsonb_build_array('Sequência Rápida de Intubação', 'Broncoespasmo Grave', 'Sedoanalgesia'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Indução em SRI',
        'dose_text', '1,5 a 2 mg/kg IV em bolus lento (ou 4-5 mg/kg IM se sem acesso venoso). Mantém tônus simpático e drive respiratório com broncodilatação.',
        'route', 'IV',
        'population', 'Adulto e Pediatria'
      )
    ),
    'adverse_reactions', 'Reações de emergência (pesadelos e delírio dissociativo), sialorreia, aumento discreto de FC/PA.',
    'reviewed_at', '2026-10-26'
  )
),
-- 8. SUCCINILCOLINA
(
  gen_random_uuid(),
  'Succinilcolina (Suxametônio)',
  'Cloreto de Suxametônio',
  'Bloqueador Neuromuscular Despolarizante',
  'Bloqueador Neuromuscular de Ação Ultrarrápida',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Anestesiologia / SRI',
    'indication', 'Paralisia neuromuscular rápida para intubação traqueal em sequência rápida (SRI).',
    'presentation', 'Frasco-ampola pó liofilizado 100 mg ou 500 mg.',
    'diseases', jsonb_build_array('Sequência Rápida de Intubação'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Dose de SRI (Adulto e Pediátrico)',
        'dose_text', '1 a 1,5 mg/kg IV em bolus rápido (em lactentes até 2 mg/kg). Início de ação em 45-60 segundos; duração de 6-10 minutos.',
        'route', 'IV',
        'population', 'Geral'
      )
    ),
    'contraindications', 'Hipercalemia prévia, queimaduras ou traumas graves extensos com > 48-72h, denervação muscular/lesão medular crônica, histórico familiar de Hipertermia Maligna, miopatias congênitas.',
    'adverse_reactions', 'Fasciculações musculares, hipercalemia potencialmente fatal em grupos de risco, mialgia pós-operatória.',
    'reviewed_at', '2026-10-26'
  )
),
-- 9. ROCURÔNIO
(
  gen_random_uuid(),
  'Brometo de Rocurônio',
  'Brometo de Rocurônio',
  'Bloqueador Neuromuscular Não-Despolarizante',
  'Aminosteroide Bloqueador Neuromuscular',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Anestesiologia / SRI',
    'indication', 'Bloqueio neuromuscular para intubação orotraqueal e manutenção de relaxamento muscular em UTI/cirurgias.',
    'presentation', 'Frasco-ampola 50 mg/5 mL (10 mg/mL).',
    'diseases', jsonb_build_array('Sequência Rápida de Intubação', 'Ventilação Mecânica Protetora'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Sequência Rápida de Intubação (SRI)',
        'dose_text', '1,2 mg/kg IV em bolus para atingir paralisia em 60 segundos (ou 0,6 mg/kg em intubação eletiva convencional).',
        'route', 'IV',
        'population', 'Adulto'
      )
    ),
    'antidote', 'Sugamadex (2 a 16 mg/kg conforme profundidade do bloqueio) ou Neostigmina + Atropina.',
    'reviewed_at', '2026-10-26'
  )
),
-- 10. NITROPRUSSIATO DE SÓDIO
(
  gen_random_uuid(),
  'Nitroprussiato de Sódio',
  'Nitroprussiato de Sódio Dihidratado',
  'Anti-hipertensivo / Vasodilatador Direto',
  'Vasodilatador Misto Arteriolar e Venoso (Doador de Óxido Nítrico)',
  jsonb_build_object(
    'status', 'verified',
    'therapeutic_class', 'Cardiologia / Emergência Hipertensiva',
    'indication', 'Emergências hipertensivas (edema agudo de pulmão hipertensivo, dissecção aórtica aguda associado a betabloqueador, encefalopatia hipertensiva).',
    'presentation', 'Ampola 50 mg/2 mL.',
    'diseases', jsonb_build_array('Emergência Hipertensiva', 'Dissecção Aguda de Aorta', 'Edema Agudo de Pulmão'),
    'formulations', jsonb_build_array(
      jsonb_build_object(
        'label', 'Infusão Contínua em Emergência Hipertensiva',
        'dose_text', 'Diluir 1 ampola (50 mg) em 250 mL SG 5% (concentração 200 mcg/mL). Iniciar em 0,25 a 0,5 mcg/kg/min e titular a cada 3-5 minutos até alvo de PA (máximo habitual 5 mcg/kg/min; teto absoluto 8-10 mcg/kg/min por curto tempo).',
        'route', 'IV (Bomba de Infusão - Equipo Fotoprotetor)',
        'population', 'Adulto',
        'cautions', 'Solução fotossensível (requer capa protetora). Monitorizar acidose lática e toxicidade por cianeto/tiocianato em infusões prolongadas (> 24-48h) ou insuficiência renal.'
      )
    ),
    'contraindications', 'Co-administração com inibidores de fosfodiesterase-5 (sildenafil, tadalafil).',
    'reviewed_at', '2026-10-26'
  )
)
ON CONFLICT (id) DO NOTHING;
