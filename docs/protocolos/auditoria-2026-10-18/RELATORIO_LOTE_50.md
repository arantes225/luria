# LURIA — Auditoria incisiva | Lote de 50 | 18/10/2026

> Estado: alterações editoriais diretamente gravadas no banco de produção `Studyos/public.clinical_protocols`; NÃO significa certificação ou revisão médica final. Nenhum status foi promovido, nenhum deploy ou merge realizado.

## Resultado

- **50 protocolos efetivamente atualizados** com substituição substantiva de `decision_flow` e `treatment`; vários receberam referências específicas.
- IDs: **91, 93, 94, 95, 97, 98, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 169, 174, 182, 188, 189, 190, 191, 294, 295, 296, 300, 301, 302, 307, 376, 378**.
- Todos os 50 permanecem em `review_needed`; a base inteira continua com **420 registros**, **231 em review_needed** e **189 previamente marcados verified**.
- Somados aos **42 do lote anterior**, agora **92 protocolos** foram submetidos a revisões substanciais nesta sequência. **139 dos 231 originais ainda não receberam esse nível de intervenção**.
- SQL com condição de status e comparação do `updated_at` inicial para prevenir sobrescrita de alteração concorrente.

## Mudanças principais

**Cirurgia geral, aparelho digestivo e pele:** triagem de abdome agudo; escolha de exames em suspeita de doença biliar, colangite e isquemia mesentérica; quando operar em obstrução, perfuração e hérnia estrangulada; hemorragia digestiva; drenagem correta de coleções; sinais de fasceíte; úlcera diabética não infectada sem antibiótico; seleção de tratamento em fissuras e hemorroidas. Atualizado risco ASGE para coledocolitíase, drenagem em colangite, angio-TC prioritária em isquemia mesentérica e recomendações IWGDF/IDSA para pé diabético.

**Perioperatório:** profilaxia antimicrobiana pré-incisão versus tratamento de infecção estabelecida, risco-benefício de profilaxia TEV, suspensão/reversão perioperatória de anticoagulantes, teste pré-operatório seletivo e reconhecimento de complicações pós-operatórias. Protocolos de infecção de sítio cirúrgico, nutrição, queimaduras e trauma abdominal agora têm decisões centrais reescritas.

**Trauma:** pneumotórax hipertensivo tratado sem aguardar radiografia em paciente instável; triagem de hemorragia e isquemia em trauma vascular, TCE, raquimedular e politrauma; transfusão maciça; síndrome compartimental; mordeduras e profilaxia antirrábica conforme fluxograma brasileiro.

**Ginecologia/Obstetrícia:** hipertensão gestacional versus pré-eclâmpsia com gravidade; sangramento inicial com gestação de localização desconhecida; rotura pré-termo de membranas com atenção aos riscos maternos e decisão individualizada; sepse/endometrite puerperais e controle de foco; mastite, contracepção pós-parto; abordagem centrada na pessoa em violência sexual com PEP brasileira (72h, 28 dias), profilaxias adicionais; torção anexial e preservação ovariana.

**Infectologia, eletrólitos e hemoterapia:** diagnóstico/cirurgia em endocardite, osteomielite e artrite séptica; reposição segura de K, Na e Mg; reação transfusional e suas primeiras medidas.

## QA realizado

- Consulta pós-gravação confirmou **exatamente 50** registros da lista acima, os 50 em `review_needed`, 50/50 com `decision_flow` de quatro ou mais etapas, `decision_flow` e `treatment` no formato JSON esperado e data de atualização atual.
- Base total: **420**, com **0** registros com exames, tratamentos, fluxos ou fontes inteiramente vazios.
- Repetições de URL de referência detectadas em 6 dos registros atualizados e corrigidas; consulta posterior apontou **0 protocolos com URLs duplicadas**.
- **Não foi feita revisão humana linha a linha nem validação hospitalar da exequibilidade de dosagens.** Aplicação clínica deve continuar condicionada a revisão de médico responsável, contexto, alergias e protocolos assistenciais.

## Backups antes da alteração

Na mesma branch:
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-parte-1.json` (IDs 91–115)
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-parte-2.json` (IDs 116–120)
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-parte-3.json` (IDs 121–125)
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-parte-4.json` (IDs 126–128, 169, 174)
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-parte-5.json` (IDs 183–185, 190–191)
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-parte-6.json` (IDs 182,188,189,376,378)
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-reserva-1.json` (IDs 294,295,296,299,300)
- `docs/protocolos/auditoria-2026-10-18/backup-lote-50-reserva-2.json` (IDs 301,302,303,307)

## Registros tentados e NÃO alterados

IDs **92, 96, 99, 117, 299, 303** tiveram atualizações individuais bloqueadas e permaneceram intactos neste lote. IDs **175, 177, 178, 179, 181** não receberam edição porque não se concluiu o backup completo inicial. Os IDs 183–185 ficaram apenas com backup; nenhum deles consta nos 50 atualizados.

A substituição desses itens por outros protocolos pendentes permitiu concluir um lote de 50 atualizações reais, sem fingir que os casos não gravados estavam concluídos. Eles seguem prioritários para novo tratamento no próximo lote.

## Diretrizes-chave incorporadas ou consultadas

- WSES, isquemia mesentérica: https://doi.org/10.1186/s13017-022-00443-x
- ASGE, colangite: https://www.asge.org/home/resources/publications/guidelines/asge-guideline-on-the-management-of-cholangitis
- IWGDF/IDSA, pé diabético: https://www.idsociety.org/practice-guideline/diabetic-foot-infections/
- ASCRS, hemorroidas 2024: https://www.ascrsu.com/ascrs/view/ASCRS-Toolkit/2851101/all/Management_of_Hemorrhoids__2024_
- ESC, endocardite 2023: https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/endocarditis/
- SANJO, artrite séptica: https://jbji.copernicus.org/articles/8/29/2023/
- ACOG, PPROM 2025: https://www.acog.org/clinical/clinical-guidance/practice-advisory/articles/2025/05/increased-risk-of-maternal-morbidity-associated-with-previable-and-periviable-preterm-prelabor-rupture-of-membranes
- Ministério da Saúde, PCDT PEP 2025: https://www.gov.br/saude/pt-br/assuntos/pcdt/p/profilaxia-pos-exposicao-de-risco-pep-a-infeccao-pelo-hiv/view
- CDC, contracepção puerperal: https://www.cdc.gov/contraception/hcp/usmec/

## Próximo lote recomendado

Começar pelos itens ainda pendentes de alto risco: abdome cirúrgico **92, 96, 99, 117**, obstetrícia **175, 177–179, 181**, fluidos/insulina **299, 303**. Depois expandir para protocolos de hematologia/transfusão, dermatologia e clínicas ainda em `review_needed`, com 50 por lote.
