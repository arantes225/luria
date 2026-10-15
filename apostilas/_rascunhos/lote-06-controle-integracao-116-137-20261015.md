# LURIA — Lote 6 · continuidade e conciliação de produção (15/10/2026)

**Estado:** CONTROLE EDITORIAL PRELIMINAR · NÃO PUBLICAR · SEM MERGE/DEPLOY.

## Escopo confirmado
O plano vigente `assets/js/apostilas-lotes-225.js` possui **260 temas em 13 lotes**. Seu lote 6 compreende **116–137**, total de 22 posições. A referência `assets/js/cronograma-base-data.js` confirma os títulos. Não confundir esta partição com o **arquivo legado nomeado “lote-07”** que usa agrupamento anterior e cobre parte dos mesmos números; o identificador de tema é a referência estável.

## Inventário de existência (sem certificação)
| Nº | Tema vigente | Localização/atitude de continuidade |
|---|---|---|
| 116 | Síndromes glomerulares | Rascunho, controle, input/preview em `editorial/lote-06-auditoria-20261014`; continuar auditoria, não recriar |
| 117 | Isquemia mesentérica | Rascunho e controle naquela ramificação; revisar |
| 118 | Anemias na infância | Rascunho e controle naquela ramificação; revisar |
| 119 | Planejamento reprodutivo e contracepção | Prévia/controle naquela ramificação; comparar com conteúdo LURIA já existente antes de integrar |
| 120 | Medicina baseada em evidências | Rascunho e controle naquela ramificação; revisar |
| 121 | Infecção urinária e pielonefrite | Rascunhos paralelos em `main` (arquivo legado lote-07) e na ramificação lote-06; **reconciliar**, não escolher cegamente uma versão |
| 122 | Perfuração de víscera oca | Rascunhos paralelos; reconciliar lacunas |
| 123 | Febre sem sinais localizatórios | Rascunhos paralelos; reconciliar |
| 124 | Sangramento uterino anormal | Apostila HTML existente preservada; complementos/controle separados em ambos os fluxos; integração apenas aditiva auditada |
| 125 | Rastreamento e prevenção quaternária | Rascunhos paralelos; reconciliar |
| 126 | Cirrose e suas complicações | Rascunhos paralelos; não repetir manejo geral de HDA |
| 127 | Hemorragia digestiva alta | Rascunhos paralelos; demarcar fronteiras com 132 e 136 |
| 128 | Sepse e choque séptico pediátrico | Rascunhos paralelos; conferir fluidos, antibióticos, doses e diretrizes 2026 |
| 129 | Amenorreia | Apostila HTML existente preservada; prévia/controle e questões complementares; não substituir |
| 130 | Níveis de prevenção e história natural da doença | Rascunhos paralelos; complementar 125 sem repetição |
| 131 | Hepatites virais | Rascunhos paralelos; prevalece checagem por PCDTs atuais, não nome do lote |
| 132 | Hemorragia digestiva baixa | Arquivo `apostilas/_rascunhos/lote-07-aula-132-hemorragia-digestiva-baixa.md` em `main`; **revisado nesta ramificação** |
| 133 | Meningites e encefalites | Rascunho existente em `main` com arquivo legado lote-07; aprofundar e validar farmacologia por faixa etária |
| 134 | Síndrome dos ovários policísticos | Apostila HTML existente preservada + complemento de auditoria; sem duplicação |
| 135 | Imunização e PNI | Rascunho existente em `main`; checar calendário vigente antes de finalização |
| 136 | Hemorragia digestiva (abordagem integrada) | **Revisão focal realizada nesta ramificação**: GBS calculável e preparo de EDA com pró-cinético IV selecionado (ESGE 2026); continua rascunho, sem imagens/aprovação clínica |
| 137 | Doença do refluxo e hérnia hiatal | **Revisão focal realizada nesta ramificação**: AGA Barrett 2025, tabela de vigilância, questão autoral 9A; continua rascunho, sem imagens/aprovação clínica |

**Leitura do inventário:** há material prévio em todas as 22 posições; isso **não** equivale a 22 apostilas completas, certificadas ou publicadas. Os rascunhos da ramificação lote-06 (116–131) não devem ser tratados como automaticamente integrados à `main`. Os rascunhos de 132–137 estão na `main`, mas permanecem sem certificação clínica/visual.

## Tema 132 — registro comparativo obrigatório, feito antes da edição
- **LURIA examinado:** o rascunho integral de HDB em `main` (64.495 caracteres brutos antes da intervenção), com capítulos 0–29, 10 casos clínicos, 14 questões e matriz final. Foi inspecionada também a estrutura editorial do HTML LURIA de Amenorreia, sem editá-lo.
- **Drive consultado em 15/10/2026:** `14 - ABDOME AGUDO VASCULAR.pdf` (~5,9 mil caracteres extraídos; contém colite isquêmica e enterorragia como síndrome abdominal) e `PÓLIPOS INTESTINAIS E POLIPOSES.pdf` (~2,4 mil caracteres extraídos; contém pólipos, tumores e sangramento crônico). **Nenhum é apostila integral de HDB** e nenhuma instituição Estratégia MED pôde ser comprovada. A busca temática por “hemorragia digestiva baixa”, “hemorragia digestiva”, “enterorragia”, “colonoscopia” e “diverticular” não encontrou comparativo equivalente. Os identificadores/links particulares do Drive não são reproduzidos no repositório público.
- **Comparação:** o rascunho LURIA já cobre diferenciais, anatomia, choque, endoscopia, CTA/embolização, antitrombóticos, pediatria e decisões por cenário. O PDF vascular exemplifica colite isquêmica como diagnóstico diferencial, mas não fornece algoritmo completo de HDB. O PDF de pólipos não ensina reanimação/embolização. **Lacunas concretas identificadas:** o Oakland era apenas descrito, sem faixas/pontos/cálculos; faltava ensino tabular específico de extravasamento na CTA e ações por cenário de resultado.
- **Fontes primárias independentes:** ESGE, `Diagnosis and management of acute lower gastrointestinal bleeding`, *Endoscopy* 2021, DOI 10.1055/a-1496-8969; ACG, Sengupta et al., `Management of Patients With Acute Lower Gastrointestinal Bleeding`, *Am J Gastroenterol* 2023, DOI 10.14309/ajg.0000000000002130; `External Validation of the Oakland Score...`, *JAMA Network Open* 2020, tabela de sete parâmetros em https://pmc.ncbi.nlm.nih.gov/articles/PMC7341175/.
- **Criação original:** seção **19.4** (tabela do Oakland em g/dL, exemplos aritméticos e limites) e seção **20.5** (tabela de leitura CTA por fases, falsos-negativos intermitentes, ponte para embolização e avaliação cirúrgica), sem cópia de texto, gráfico ou figura de apostila alheia.
- **Alteração auditável:** arquivo acima atualizado somente em `editorial/lote-06-continuacao-132-137-20261015`, de **64.495** para **70.023 caracteres brutos**; não afirmar que passou o piso de 60 mil *didáticos úteis* sem medição/análise específica.

## Gate de saída e próximas decisões
- [x] O tema e seus vizinhos no plano de 260 foram conciliados com o acervo existente.
- [x] Comparação efetiva de dois PDFs correlatos do Drive (limitação: sem um comparativo HDB integral).
- [x] Referências oficiais ACG/ESGE e validação externa do Oakland conferidas para a ampliação focal.
- [x] As seções 19.4 e 20.5 foram inseridas sem substituir os 29 capítulos e exercícios existentes.
- [ ] Benchmark exato de HDB ou referência institucional extensa; não certificar enquanto ausente.
- [ ] Revisão científica independente de fármacos, reversão de anticoagulantes, hemostasia endoscópica, transfusão, riscos de isquemia e populações especiais.
- [ ] Auditoria qualitativa de redundância, contagem de 60 mil caracteres **úteis**, teste real de autossuficiência e itens por questão.
- [ ] Pesquisa/curadoria de 10+ imagens com origem e licença verificadas; aprovação via Admin antes de qualquer publicação.
- [ ] Gerador dry-run, `audit-apostilas-60k.mjs`, `audit-apostilas-batch.cjs`, `check-syntax.cjs`, QA desktop/PWA e parecer clínico.
- [ ] Revisar 133–137 individualmente por lacunas e diretrizes atuais; guardar front-matter “legado lote07” até resolver referências cruzadas e renomear com segurança.

**Não integrar, não sobrescrever HTML aprovado, não fazer merge, não fazer deploy.**

## Continuação de 15/10/2026 — auditoria dos dois últimos temas

- Tema **136**: `lote-07-aula-136-hemorragia-digestiva-integrada.md` alterado de 67.474 para 74.466 caracteres brutos; 9 casos, 14 questões; seções 7.1 e 18.7 novas; sem certificação do número de caracteres úteis.
- Tema **137**: `lote-07-aula-137-drge-hernia-hiatal.md` alterado de 80.228 para 86.693 caracteres brutos; 8 casos, 15 questões; seção 20.6 e questão 9A novas; sem certificação do número de caracteres úteis.
- **Registro científico detalhado:** `apostilas/_rascunhos/lote-06-136-137-controle-editorial-cientifico-20261015.md`.
- **Condição para continuar lote 6:** harmonizar conteúdo de **116–131** (ramificação editorial anterior e rascunhos paralelos na `main`), sem publicar nenhuma versão apenas porque atingiu extensão bruta. Nenhum merge/deploy nesta rodada.
