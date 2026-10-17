# LURIA — Auditoria científica incisiva de protocolos | 17/10/2026

> **Estado: trabalho editorial em andamento, NÃO aprovação médica, NÃO deploy/merge.**
> As edições de dados descritas abaixo foram feitas diretamente no banco `Studyos/public.clinical_protocols` e podem estar visíveis no site. O código/documentos de auditoria ficam na branch `editorial/protocolos-auditoria-20261016` do GitHub.

## Resultado desta execução

- Base: **420 protocolos**; 189 previamente marcados `verified` e **231 com `review_needed`**.
- **42 protocolos originalmente pendentes tiveram revisão editorial substantiva e atualização persistida**: fluxos de decisão/condutas reconstruídos com critérios de risco, contraindicações, doses e monitorização quando apropriado.
- **189 protocolos da fila original ainda NÃO receberam este aprofundamento** (231 menos 42).
- Os **42 editados permanecem como `review_needed`**: revisão por profissional habilitado e checagem final de fonte/medicamento ainda necessárias. Nenhum dos 231 foi aprovado por conveniência.
- SQL aplicado com condição `status='review_needed'` e `updated_at` antigo para impedir sobrescritas concorrentes, com `RETURNING` e consultas pós-escrita.

### IDs efetivamente atualizados — 42
`58, 59, 60, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 170, 171, 172, 176, 180, 186, 187`

### 1. Distúrbios hidroeletrolíticos e acidobásicos (3)
- **58 Hiponatremia**: convulsão/coma e bolus NaCl 3% com alvo parcial e prevenção de desmielinização; distinguir posologia adulta/pediátrica.
- **59 Hipernatremia**: prioridade à ressuscitação de choque, água livre, monitorização de correção e ressalvas sobre estudos apenas observacionais.
- **60 Distúrbios ácido-base**: Winter/AG/albumina, distúrbios mistos, tratamento da causa e ensaio BICARICU-2 (JAMA 2025: sem ganho de mortalidade, com menor uso de TSR).

### 2. Pediatria geral, emergência e neonatologia (32)
- **129–132**: criança grave; PCR pediátrica (adrenalina IV/IO 0,01 mg/kg de 0,1 mg/mL, energias do choque 2/4/≥4 J/kg, máximo 10 J/kg e técnica de compressão infantil AHA 2025); febre sem foco; lactente febril estratificado por idade e critérios do algoritmo AAP 8–60 dias.
- **133–138**: sepse/choque pediátricos com distinção do ambiente com/sem UTI e da presença de hipotensão; Planos A/B/C de desidratação/diarreia/gastroenterite, divergência entre zinco OMS 2024 e prática tradicional MS Brasil; bronquiolite com oxigênio e alto fluxo por necessidade clínica.
- **139–145**: pneumonia, asma, crupe, coqueluche, otite, sinusite e faringoamigdalite; diferenciação viral/bacteriana, indicação e duração de antimicrobianos e critérios de observação/internação.
- **146–156**: ITU (qualidade da urina e possível resistência), meningite, convulsão febril, estado de mal, anafilaxia (IM 1 mg/mL, 0,01 mg/kg máximo 0,5 mg conforme ASCIA), hipoglicemia, CAD (insulina após fluidos e potássio, sem bolus), intoxicações, FBAO infantil vs criança, invaginação e apendicite pediátrica.
- **157–160**: icterícia neonatal (curvas AAP por idade em horas e IG ≥35 semanas; não descontar bilirrubina direta), sepse neonatal (NICE 2026 e condições estritas para suspender antimicrobianos às 36/48h), hipoglicemia neonatal (gel 40% ou glicose IV por gravidade), reanimação neonatal (ventilação eficaz antes de compressões; adrenalina IV neonatal 0,01–0,03 mg/kg após 60 s de compressões/ventilação adequadas).

### 3. Emergências obstétricas (7)
- **170 Pré-eclâmpsia**: PA ≥160 sistólica ou ≥110 diastólica, anti-hipertensivos, MgSO₄ para prevenir convulsão e antihipertensivos para PA, critérios obstétricos de resolução.
- **171 Eclâmpsia**: sulfato de magnésio 4–6g ataque IV e 1–2g/h infusão; resgate e antídoto, estabilização e planejamento de parto.
- **172 HELLP**: suspeita clínica inclusive sem proteinúria, hemólise/plaquetas/transaminases, hemoterapia, lesão hepática e vigilância no puerpério.
- **176 Gravidez ectópica**: instabilidade e ruptura exigem cirurgia; gestação de localização desconhecida não deve receber metotrexato de forma automática; contraindicações e β-hCG no dia 4/7.
- **180 Descolamento prematuro de placenta**: diagnóstico clínico, ultrassom negativo não exclui DPP, coagulopatia e urgência materno-fetal.
- **186 Hemorragia pós-parto**: pacote simultâneo OMS 2025 e 4 Ts; TXA 1g IV em 10min até 3h do nascimento, repetir 1g se persistir após 30min ou reiniciar até 24h; evitar uterotônicos contraindicados (metilergometrina na hipertensão grave, carboprost na asma).
- **187 Distócia de ombro**: McRoberts + pressão suprapúbica, depois manobras internas, **NÃO pressão fúndica**, atenção a lesões neonatais e hemorragia materna.

## QA real pós-escrita
- `public.clinical_protocols`: **420** registros, **231 review_needed**, **189 verified** herdados — nenhuma promoção de status.
- **42/42** registros alvo presentes, com pelo menos 5 etapas decisórias e pelo menos uma seção de tratamento e referência.
- **0** protocolos com `exams`, `treatment`, `decision_flow` ou `source_refs` vazios; alertas `red_flags` preservados.
- **0** links bibliográficos duplicados por URL nos 420 registros.
- Spot check do protocolo 130 confirmou choque inicial **2 J/kg** e técnica atualizada em lactentes; do protocolo 186 confirmou TXA em até 3 h.

## Backups ANTES de cada alteração (GitHub nesta branch)
- `docs/protocolos/auditoria-2026-10-17/backup-pre-edicao-20-protocolos.json` (20 registros completos).
- `docs/protocolos/auditoria-2026-10-17/backup-pre-edicao-10-protocolos-neonatal-e-emergencias.json` (10).
- `docs/protocolos/auditoria-2026-10-17/backup-pre-edicao-06-protocolos-pediatria.json` (6).
- `docs/protocolos/auditoria-2026-10-17/backup-pre-edicao-06-protocolos-obstetricia.json` (6).

## Fontes nucleares e limitações
- American Heart Association — Neonatal Resuscitation 2025: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation
- AHA/AAP Pediatric Basic Life Support 2025: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support
- AHA PALS algorithm 2025: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms/
- NICE NG195 — Neonatal Infection (atualizada 13/05/2026): https://www.nice.org.uk/guidance/ng195/chapter/Antibiotics-for-early-onset-neonatal-infection
- NICE NG217 — Status epilepticus (2025): https://www.nice.org.uk/guidance/ng217/chapter/7-Treating-status-epilepticus-repeated-or-cluster-seizures-and-prolonged-seizures
- ISPAD pediatric DKA: https://www.ispad.org/static/6dd62eae-c8cb-4b4a-84e1efc768505746/Ch11PediatricDiabetes.pdf
- AAP neonatal hyperbilirubinemia (2022): https://publications.aap.org/pediatrics/article/150/3/e2022058859/188726/
- Royal Children's Hospital clinical guidelines: https://www.rch.org.au/clinicalguide/
- ASCIA anaphylaxis: https://www.allergy.org.au/hp/papers/acute-management-of-anaphylaxis-guidelines
- OMS 2025 hemorragia pós-parto: https://www.ncbi.nlm.nih.gov/books/NBK619233/
- ACOG ectopic pregnancy: https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/03/tubal-ectopic-pregnancy
- FEBRASGO eclampsia: https://www.febrasgo.org.br/fluxograma/eclampsia/

**Ressalvas**: As fontes indicam diretrizes/valores de referência, mas cada recomendação exige validação humana, sobretudo dosagens, faixas etárias, concentrações, disponibilidade brasileira, contraindicações, gestação, insuficiência orgânica e atualizações normativas. Não foram feitos ensaios clínicos nem testes autenticados end-to-end da interface. Alterações em produção não foram acompanhadas de deploy do frontend. Não há certificado de revisão médica integral.

## Próxima fila de prioridade
1. Obstetrícia crítica ainda sem revisão profunda: 174, 178, 181, 182, 188, 189, 376, 378.
2. Cirurgia de urgência: 91–128, sobretudo hemorragia, trauma, perfuração, isquemia, fasceíte, queimaduras; alguns receberam **correções parciais na execução anterior**, sem auditoria substantiva completa.
3. Emergência transversal/psiquiátrica: 265, 267, 274–276, 294, 296, 307, 309, 363.
4. Restante das 189 pendências divididas por criticidade e cronologia, sem mudanças cosméticas de status.
