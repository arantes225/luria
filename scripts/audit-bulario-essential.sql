-- LURIA | Auditoria P0 de medicamentos essenciais
-- READ ONLY. Rodar no SQL Editor da PRODUÇÃO como diagnóstico (não modifica dados).
-- Lista curada como verificação inicial de cobertura, NÃO é a Rename integral.
-- Forma farmacêutica e registro sanitário precisam de auditoria separada.
-- Evita confundir cetamina com escetamina e apresentação isolada com associação.
-- IMPORTANTÍSSIMO: a presença no catálogo NÃO significa dose verificada.
WITH expected(area, drug) AS (
VALUES
  ('APS | Analgesia','dipirona'),
  ('APS | Analgesia','paracetamol'),
  ('APS | Analgesia','ibuprofeno'),
  ('APS | Analgesia','naproxeno'),
  ('APS | Analgesia','diclofenaco'),
  ('APS | Analgesia','cetoprofeno'),
  ('APS | Analgesia','tramadol'),
  ('APS | Analgesia','morfina'),
  ('APS | Analgesia','lidocaína'),
  ('APS | Gastroenterologia','metoclopramida'),
  ('APS | Gastroenterologia','ondansetrona'),
  ('APS | Gastroenterologia','bromoprida'),
  ('APS | Gastroenterologia','domperidona'),
  ('APS | Gastroenterologia','dimenidrinato'),
  ('APS | Gastroenterologia','omeprazol'),
  ('APS | Gastroenterologia','pantoprazol'),
  ('APS | Gastroenterologia','famotidina'),
  ('APS | Gastroenterologia','simeticona'),
  ('APS | Gastroenterologia','loperamida'),
  ('APS | Gastroenterologia','lactulose'),
  ('APS | Gastroenterologia','bisacodil'),
  ('APS | Gastroenterologia','polietilenoglicol'),
  ('APS | Gastroenterologia','macrogol'),
  ('APS | Cardiometabólico','captopril'),
  ('APS | Cardiometabólico','enalapril'),
  ('APS | Cardiometabólico','losartana'),
  ('APS | Cardiometabólico','anlodipino'),
  ('APS | Cardiometabólico','amlodipino'),
  ('APS | Cardiometabólico','atenolol'),
  ('APS | Cardiometabólico','metoprolol'),
  ('APS | Cardiometabólico','carvedilol'),
  ('APS | Cardiometabólico','furosemida'),
  ('APS | Cardiometabólico','espironolactona'),
  ('APS | Cardiometabólico','hidroclorotiazida'),
  ('APS | Cardiometabólico','nifedipino'),
  ('APS | Cardiometabólico','sinvastatina'),
  ('APS | Cardiometabólico','atorvastatina'),
  ('APS | Cardiometabólico','metformina'),
  ('APS | Cardiometabólico','gliclazida'),
  ('APS | Cardiometabólico','insulina'),
  ('APS | Cardiometabólico','levotiroxina'),
  ('APS | Infecções','amoxicilina'),
  ('APS | Infecções','azitromicina'),
  ('APS | Infecções','cefalexina'),
  ('APS | Infecções','ceftriaxona'),
  ('APS | Infecções','ciprofloxacino'),
  ('APS | Infecções','nitrofurantoína'),
  ('APS | Infecções','fosfomicina'),
  ('APS | Infecções','metronidazol'),
  ('APS | Infecções','doxiciclina'),
  ('APS | Infecções','clindamicina'),
  ('APS | Infecções','fluconazol'),
  ('APS | Infecções','aciclovir'),
  ('APS | Infecções','albendazol'),
  ('APS | Infecções','ivermectina'),
  ('APS | Infecções','mupirocina'),
  ('APS | Infecções','permetrina'),
  ('Pediatria | Respiratório e alergias','salbutamol'),
  ('Pediatria | Respiratório e alergias','ipratrópio'),
  ('Pediatria | Respiratório e alergias','budesonida'),
  ('Pediatria | Respiratório e alergias','beclometasona'),
  ('Pediatria | Respiratório e alergias','montelucaste'),
  ('Pediatria | Respiratório e alergias','loratadina'),
  ('Pediatria | Respiratório e alergias','cetirizina'),
  ('Pediatria | Respiratório e alergias','prednisolona'),
  ('Pediatria | Respiratório e alergias','dexametasona'),
  ('Pediatria | Respiratório e alergias','fenoterol'),
  ('Emergência | Suporte e sedação','adrenalina'),
  ('Emergência | Suporte e sedação','noradrenalina'),
  ('Emergência | Suporte e sedação','norepinefrina'),
  ('Emergência | Suporte e sedação','atropina'),
  ('Emergência | Suporte e sedação','amiodarona'),
  ('Emergência | Suporte e sedação','adenosina'),
  ('Emergência | Suporte e sedação','dobutamina'),
  ('Emergência | Suporte e sedação','dopamina'),
  ('Emergência | Suporte e sedação','propofol'),
  ('Emergência | Suporte e sedação','etomidato'),
  ('Emergência | Suporte e sedação','midazolam'),
  ('Emergência | Suporte e sedação','diazepam'),
  ('Emergência | Suporte e sedação','fentanila'),
  ('Emergência | Suporte e sedação','cetamina'),
  ('Emergência | Suporte e sedação','escetamina'),
  ('Emergência | Suporte e sedação','droperidol'),
  ('Emergência | Suporte e sedação','tiopental'),
  ('Emergência | Suporte e sedação','rocurônio'),
  ('Emergência | Suporte e sedação','succinilcolina'),
  ('Emergência | Suporte e sedação','naloxona'),
  ('Emergência | Suporte e sedação','flumazenil'),
  ('Emergência | Suporte e sedação','bupivacaína'),
  ('Emergência | Fluidos e coagulação','cloreto de sódio'),
  ('Emergência | Fluidos e coagulação','soro fisiológico'),
  ('Emergência | Fluidos e coagulação','gluconato de cálcio'),
  ('Emergência | Fluidos e coagulação','sulfato de magnésio'),
  ('Emergência | Fluidos e coagulação','cloreto de potássio'),
  ('Emergência | Fluidos e coagulação','bicarbonato de sódio'),
  ('Emergência | Fluidos e coagulação','ácido tranexâmico'),
  ('Emergência | Fluidos e coagulação','heparina'),
  ('Emergência | Fluidos e coagulação','enoxaparina'),
  ('Emergência | Fluidos e coagulação','rivaroxabana'),
  ('Emergência | Fluidos e coagulação','apixabana'),
  ('GO | Rotina e urgências','ácido fólico'),
  ('GO | Rotina e urgências','sulfato ferroso'),
  ('GO | Rotina e urgências','metildopa'),
  ('GO | Rotina e urgências','labetalol'),
  ('GO | Rotina e urgências','misoprostol'),
  ('GO | Rotina e urgências','ocitocina'),
  ('GO | Rotina e urgências','metilergometrina'),
  ('GO | Rotina e urgências','carboprost'),
  ('GO | Rotina e urgências','levonorgestrel'),
  ('GO | Rotina e urgências','clotrimazol'),
  ('GO | Rotina e urgências','miconazol')
), matched AS (
  SELECT e.area,e.drug,d.id,d.name,d.data,
    (
      SELECT COUNT(*)
      FROM jsonb_array_elements(
        CASE WHEN jsonb_typeof(d.data->'formulations')='array'
          THEN d.data->'formulations' ELSE '[]'::jsonb END
      ) f
      WHERE d.data->>'status' IN ('posology_verified','verified','source_reviewed')
        AND COALESCE(f->>'label','') NOT ILIKE '%apresentação conforme produto%'
        AND COALESCE(f->>'dose_text','')<>'' AND COALESCE(f->>'interval_text','')<>''
        AND COALESCE(f->>'route','')<>'' AND COALESCE(f->>'duration_text','')<>''
        AND COALESCE(f->>'max_daily_text','')<>'' AND COALESCE(f->>'administration','')<>''
        AND COALESCE(f->>'cautions','')<>'' AND COALESCE(f->>'prescription_type','')<>''
        AND (
          COALESCE(f->>'source_url','') LIKE 'https://%'
          OR (
            jsonb_array_length(CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END)=1
            AND COALESCE(d.data->>'leaflet_url','') LIKE 'https://%'
          )
        )
    ) AS documentation_ready_forms
  FROM expected e
  LEFT JOIN public.bulario_drugs d
    ON POSITION('+' IN d.name)=0
    AND (
      d.name ~* ('(^|[^[:alnum:]])'||e.drug||'([^[:alnum:]]|$)')
      OR d.active_ingredient ~* ('(^|[^[:alnum:]])'||e.drug||'([^[:alnum:]]|$)')
      OR EXISTS (
        SELECT 1 FROM jsonb_array_elements_text(
          CASE WHEN jsonb_typeof(d.data->'synonyms')='array' THEN d.data->'synonyms' ELSE '[]'::jsonb END
        ) s(value) WHERE LOWER(s.value)=LOWER(e.drug)
      )
    )
), grouped AS (
  SELECT area,drug,COUNT(id) AS matching_records,COALESCE(SUM(documentation_ready_forms),0)::integer AS source_tied_forms,
    STRING_AGG(name,'; ' ORDER BY name) AS matched_names
  FROM matched GROUP BY area,drug
)
SELECT area,drug,
  CASE WHEN matching_records=0 THEN 'AUSENTE' WHEN source_tied_forms=0 THEN 'FICHA SEM POSOLOGIA LIBERÁVEL' ELSE 'PRESENTE (REVISAR FORMAS)' END AS situation,
  matching_records,source_tied_forms,matched_names
FROM grouped
ORDER BY CASE WHEN matching_records=0 THEN 0 WHEN source_tied_forms=0 THEN 1 ELSE 2 END,area,drug;
