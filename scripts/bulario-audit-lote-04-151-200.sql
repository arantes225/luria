-- LURIA / Bulário / lote 04, medicamentos 151-200.
-- Auditoria estrutural somente; NAO altera formulas, doses, fontes ou status clínico.
-- A chave quality_audit existente nunca e substituída.
WITH items(id, priority, clinical_area, action_required) AS (
VALUES
(159,'P1','GO/Contracepção','Conferir desogestrel 75 mcg e orientações de esquecimento, contraindicações, interações enzimáticas, início/troca de método e amamentação; validar bula do produto.'),
(705,'P1','GO/Contracepção','Drospirenona isolada 4 mg com fonte individual ausente e dois campos de segurança em falta; confirmar esquema de 24+4, interações, função renal/suprarrenal e risco de hipercalemia por bula.'),
(232,'P1','GO/Hormonoterapia','Estradiol inclui gel transdérmico e comprimido vaginal; uma apresentação não tem fonte individual. Separar vias, doses, população e contraindicações de estrogênio.'),
(244,'P1','GO/Hormonoterapia','Estriol registrado em comprimidos 1 e 2 mg; verificar indicação, disponibilidade de apresentações vaginais, contraindicações e regimes específicos em mulheres com útero.'),
(844,'P1','GO/Contracepção','Noretisterona com apresentação genérica e sem fonte profissional nem cinco campos básicos de segurança; validar forma, concentração, indicações e contraindicações antes de liberar posologia.'),
(995,'P1','GO/Contracepção','Associação levonorgestrel + etinilestradiol genérica, sem fonte individual e cinco campos de segurança; confirmar concentração dos dois hormônios, regime e risco tromboembólico.'),
(52,'P1','GO/Reprodução','Clomifeno 50 mg: revisar indicação, contraindicação em gestação, monitorização de resposta ovariana e limites de ciclos segundo protocolo/bula específica.'),
(994,'P0','GO/Oncologia/Reprodução','Letrozol com formulário genérico, sem fonte e cinco campos básicos; distinguir indicações aprovadas e usos em indução da ovulação conforme protocolo, gestação e população elegível.'),
(516,'P0','GO/Oncologia/Reumatologia','Metotrexato possui duas apresentações injetáveis. Conferir risco fatal de administração diária acidental em usos semanais, diferenças oncológicas, mg versus mL, via e resgate com folinato.'),
(736,'P1','APS/Cardiologia','Amlodipino 5/10 mg apresenta cinco campos básicos de segurança ausentes; conferir contraindicações, interações, efeitos adversos e critérios de ajustes em bula.'),
(413,'P1','APS/Cardiologia','Enalapril: revisar concentrações 5/10/20 mg, titulação, contraindicação em gestação, função renal, potássio e interação com outros bloqueadores do SRAA.'),
(417,'P1','APS/Cardiologia','Hidroclorotiazida 25/50 mg: validar doses frequentes por indicação, hiponatremia/hipocalemia, função renal e contraindicações.'),
(406,'P1','APS/Cardiologia','Atenolol cadastrado apenas em 25 mg; verificar concentrações adicionais, bradicardia, asma/DPOC conforme contexto e função renal.'),
(316,'P1','APS/Cardiologia','Propranolol em três forças. Confirmar esquema por indicação, risco de bradicardia/broncoespasmo, contraindicações e uso pediátrico somente com fonte específica.'),
(596,'P0','Cardiologia/Emergência','Diltiazem mistura cápsulas/comprimidos de liberação imediata/prolongada e solução IV na mesma formulação sem fonte específica; separar por via e cinética, risco de bloqueio AV.'),
(70,'P1','Cardiologia','Verapamil tem dois registros com mesmo rótulo 80 mg; examinar por que diferem, validar formas IV e LP conforme produto e interações/risco de bloqueio cardíaco.'),
(409,'P0','Cardiologia/Anestesia','Clonidina traz apenas solução 150 mcg/mL para pré-anestesia/epidural; avaliar via correta e inclusão de formas orais sem extrapolar doses. Atenção às unidades mcg/mL.'),
(423,'P1','APS/Dislipidemia','Rosuvastatina lista forças 5/10/20 mg juntas; conferir 40 mg se comercializada, monitorização, ajustes renais, interações e restrições reprodutivas.'),
(313,'P1','APS/Dislipidemia','Ezetimiba 10 mg: revisar indicações de associação, função hepática, interações e distinção entre monoterapia e combinação.'),
(488,'P1','APS/Endocrinologia','Dapagliflozina 5/10 mg: revisar elegibilidade por TFGe e indicação, prevenção de cetoacidose e suspensão em jejum/procedimento segundo protocolo vigente.'),
(479,'P1','APS/Endocrinologia','Gliclazida MR 30/60 mg: distinguir liberação modificada de formulação imediata, risco de hipoglicemia, ajuste por alimentação e uso renal.'),
(466,'P0','Anestesia','Bupivacaína 0,25%, 0,5%, 0,75% e hiperbárica 0,5%: confirmar concentrações, doses máximas por técnica e população; evitar confusão de solução hiperbárica com infiltração.'),
(332,'P0','Anestesia/Intubação','Rocurônio 10 mg/mL com três contextos: intubação rotina, sequência rápida e manutenção. Verificar condições de ventilação, dose por peso e incompatibilidade com sedação isolada.'),
(648,'P0','Anestesia/UTI','Cisatracúrio 2 mg/mL/outras concentrações agrupadas sem bula individual; validar dose e diluição por indicação, monitorização do bloqueio e função orgânica.'),
(650,'P0','Anestesia/UTI','Sugamadex 100 mg/mL sem bula específica por apresentação; validar reversão por profundidade do bloqueio, peso real/ajustado quando aplicável, interações e função renal.'),
(639,'P0','Anestesia/UTI','Neostigmina injetável 0,5–1 mg/mL em ficha genérica sem fonte; separar indicações, atropina/glicopirrolato associados quando indicado, contraindicações e monitorização.'),
(538,'P0','Emergência/Neurologia','Manitol IV 20% sem fonte específica; confirmar osmolaridade, dose/volume, contraindicações, função renal e monitorização de osmolaridade/estado volêmico.'),
(581,'P0','Emergência/UTI','Albumina 5%, 20% e 25% agrupadas sem bula específica: dividir concentração, quantidade de albumina e indicação; evitar equiparar soluções hipo e hiperoncóticas.'),
(704,'P0','Emergência/Toxicologia','Carvão ativado sem apresentação concreta ou fonte específica e dois campos de segurança faltantes; checar dose por produto, contraindicação em via aérea desprotegida e intoxicações sem benefício.'),
(851,'P0','Emergência/Neurologia','Tiamina com apresentação genérica sem fonte e cinco campos de segurança; confirmar apresentações VO/IV/IM e protocolos de deficiência/encefalopatia conforme indicação.'),
(158,'P0','Emergência/Fluidos','Cloreto de sódio cadastrado com apresentação 0,9% em bolsas; verificar soluções hipertônicas e ampolas separadas, velocidade de infusão, vias e evitar confusão de concentrações.'),
(4,'P0','Infectologia/APS','Benzilpenicilina benzatina 1.200.000 UI/4 mL: verificar indicações, administração IM exclusiva, alergia e necessidade de não confundir com penicilina cristalina IV.'),
(395,'P0','Infectologia/Emergência','Penicilina G cristalina/potássica: revisar unidades UI, concentrações pós-reconstituição, via IV, dose por indicação e eletrólitos do sal.'),
(361,'P1','Infectologia','Aciclovir contém comprimido 200 mg, mas não IV ou tópico; validar apresentações adicionais, doses por doença e ajuste renal, sobretudo em encefalite/neonatos.'),
(362,'P1','Infectologia/Pediatria','Albendazol mastigável 400 mg apresenta embalagens diversas agrupadas; revisar dose por helminto, faixa etária, contraindicações e seguimento por indicação.'),
(740,'P1','Infectologia','Ivermectina 6 mg tem cinco campos de segurança ausentes; confirmar indicações aprovadas, posologia por peso/idade, contraindicações e interações.'),
(526,'P1','Infectologia/Dermatologia','Permetrina 1% para pediculose e 5% para escabiose devem ficar claramente separadas; 1 de 2 formulações sem fonte individual e tempos de aplicação distintos.'),
(525,'P1','Dermatologia/Infectologia','Mupirocina pomada 2%: verificar indicação, modo de aplicação, duração, uso nasal versus cutâneo com produtos distintos e resistência bacteriana.'),
(577,'P0','Infectologia/UTI','Micafungina 50/100 mg por frasco agrupadas sem bula da apresentação; validar reconstituição, dose por foco, população pediátrica e monitorização hepática.'),
(462,'P1','Neurologia/APS','Gabapentina com cápsulas 300/400 mg e comprimido 600 mg na mesma ficha; revisar titulação, função renal e risco de sedação com opioides.'),
(463,'P1','Neurologia/APS','Pregabalina 75/150 mg: revisar indicação, ajuste por TFGe, retirada gradual, interações depressoras do SNC e riscos de abuso.'),
(561,'P1','Pediatria/Alergia','Desloratadina 5 mg comprimido e 0,5 mg/mL solução oral agrupados sem fonte por forma; separar critérios por idade e dose pediátrica.'),
(823,'P1','Pediatria/Alergia','Dexclorfeniramina sem bula profissional nem cinco campos de segurança; confirmar apresentações orais, sedação e faixa etária/contraindicações.'),
(260,'P1','Pediatria/Alergia','Hidroxizina comprimido 25 mg e solução 2 mg/mL: revisar limites pediátricos, sedação, QT e interações, sem extrapolar entre indicação dermatológica e ansiolítica.'),
(772,'P1','Pediatria/Nutrição','Sulfato de zinco tem cinco campos de segurança ausentes; validar mg de zinco elementar versus mg do sal e concentração de xarope/mastigável.'),
(145,'P0','Dermatologia','Isotretinoína está cadastrada só como creme/gel tópico Isotrex 0,05%. Não equivale à isotretinoína oral para acne grave; verificar registro das cápsulas e riscos teratogênicos e monitorização.'),
(762,'P1','Dermatologia','Adapaleno em gel/creme 0,1% e outras forças agrupadas sem fonte, com cinco campos de segurança em falta; separar forma, concentração, idade e gestação.'),
(765,'P1','Dermatologia','Peróxido de benzoíla gel 2,5–10% sem bula individual e cinco campos básicos; conferir irritação, concentração, frequência e interações tópicas.'),
(261,'P1','Dermatologia','Clobetasol creme/pomada 0,5 mg/g: validar tempo máximo, área, populações, contraindicações e risco de absorção sistêmica.'),
(761,'P1','Dermatologia','Ácido azelaico gel/creme sem concentração ou fonte específica, cinco campos básicos ausentes; validar apresentação e esquema por indicação.')
), updated AS (
 UPDATE public.bulario_drugs d SET data = jsonb_set(d.data,'{quality_audit}',
  jsonb_build_object(
    'batch','bul-04-151-200',
    'screened_at','2026-10-15',
    'scope','individual_formulation_source_and_safety_gap_triage',
    'scientifically_validated',false,
    'priority',i.priority,
    'clinical_area',i.clinical_area,
    'action_required',i.action_required,
    'review_status','PENDING_CLINICAL_SOURCE_REVIEW',
    'formulation_count',jsonb_array_length(
      CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END),
    'missing_source_formulations',(SELECT count(*) FROM jsonb_array_elements(
      CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f
      WHERE coalesce(f->>'source_url','') NOT LIKE 'http%'),
    'generic_placeholder_forms',(SELECT count(*) FROM jsonb_array_elements(
      CASE WHEN jsonb_typeof(d.data->'formulations')='array' THEN d.data->'formulations' ELSE '[]'::jsonb END) f
      WHERE coalesce(f->>'label','') ILIKE '%conforme produto%'
        OR coalesce(f->>'label','') ILIKE '%conforme registro%'
        OR coalesce(f->>'label','') ILIKE '%conforme mercado%'),
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
SELECT count(*) AS tagged_now,(SELECT count(*) FROM items) AS expected FROM updated;