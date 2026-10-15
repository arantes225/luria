# Continuação obrigatória — LURIA, lotes 11, 12 e 13

**Data:** 15/10/2026. **Branch:** `audit/enamed-7areas-lotes-finais-20261015` — PR #41 rascunho. **Não foi feito merge nem deploy.**

## INSTRUÇÕES PARA O PRÓXIMO CHAT / CODEX

Prosseguir lotes 11 → 12 → 13. O lote 10 só deve ser retomado se o usuário confirmar que está incompleto. Os 260 temas originais devem ser preservados. A matriz inclui todas as 401 aulas MedCof (Alta 179, Média 63, Baixa 46 e Diamante 113). **Aulas Diamante de um assunto são complementares, não exigem novas apostilas separadas.**

As **16 novas apostilas** (IDs 261–276) foram reservadas apenas nos lotes finais. As **4 apostilas já produzidas** (IDs 277–280) foram indexadas nos mesmos lotes: conferir e complementar, NUNCA recriar. As incorporações em temas anteriores estão visíveis como **COMPLEMENTAR NA PRÓXIMA REVISÃO · SE AUSENTE**, com a aula correspondente e a página do PDF.

**Fontes para continuar:** `docs/apostilas/medcof-401-correspondencia.json` (aula → card), `assets/js/apostilas-editorial-enamed-2026.js` (anotação por card), `assets/js/apostilas-medcof-401.js` (aulas mostradas no card) e `docs/apostilas/lotes-11-13-controle-revisao.json` (checklist editável de status).

### O que significam os status?
- **NOVA APOSTILA · PRODUZIR NOS LOTES FINAIS**: verificar sobreposição antes de escrever; criar apenas o que não existe.
- **JÁ PUBLICADA · CONFERIR/COMPLETAR SEM DUPLICAR**: reutilizar o conteúdo real, sem sobrescrever.
- **COMPLEMENTAR NA PRÓXIMA REVISÃO · SE AUSENTE**: conferir material já escrito e adicionar capítulos ausentes.
- **REFERÊNCIA CRUZADA**: assunto associado a outro card, sem duplicar texto. **VERIFICAR/CORRIGIR**: destino principal da aula.
- **Produção não verificada** não significa inexistência; somente que não houve certificação nesta auditoria.

### Checklist obrigatório de conclusão
1. Conferir apostilas em Supabase, páginas HTML e eventuais `content.json`; verificar estrutura real antes de redigir.
2. Conferir cobertura de fisiopatologia, diagnóstico, diferenciais, exames, condutas, contraindicações, complicações, seguimento e referências, de acordo com a relevância clínica.
3. Registrar no JSON de controle: capítulo verificado, acréscimo realizado, referências atualizadas e data. Não declarar aula concluída somente pela associação no índice.
4. Preservar todos os itens de Baixa incidência; não retirar BLS/ACLS, gasometria, Sjögren, hiperaldosteronismo, diarreia aguda e C. difficile.
5. Evitar duplicações: meningites/encefalites de adulto na #133 (transversal), câncer de mama rastreamento+CDIS+invasivo na #169, malformações müllerianas no núcleo #129.
6. Conservar sete áreas ENAMED e produzir os temas novos somente nos lotes 11–13.

## Distribuição
- **Lote 11:** 12 originais + 5 novas + 1 existente indexada = 18 cards.
- **Lote 12:** 12 originais + 5 novas + 1 existente indexada = 18 cards.
- **Lote 13:** 11 originais + 6 novas + 2 existentes indexadas = 19 cards.


## LOTE 11


### Apostila 226 — Demências e comprometimento cognitivo

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Demências (Diamante), delirium no idoso (Alta) e avaliação cognitiva estruturada.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.25] Insuficiência Cognitiva: Delirium no Idoso; [Diamante; principal; PDF p.26] Insuficiência Cognitiva: Demências


### Apostila 227 — Doença de Parkinson e distúrbios do movimento

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.17] Doenças Neuromusculares e Parkinson


### Apostila 228 — Neuropatias periféricas e doenças neuromusculares

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** [Alta; referencia_cruzada; PDF p.17] Doenças Neuromusculares e Parkinson


### Apostila 229 — Obesidade e síndrome metabólica no adulto

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Obesidade no adulto (Alta), síndrome metabólica e cirurgia bariátrica (Alta): critérios e acompanhamento.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.14] Síndrome Metabólica e Obesidade; [Alta; principal; PDF p.15] Cirurgia Bariátrica


### Apostila 230 — Osteoporose, sarcopenia e fragilidade

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Osteoporose (Alta), sarcopenia e fragilidade, prevenção de fraturas.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.20] Osteoporose


### Apostila 231 — Hemoglobinopatias e anemias hereditárias

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Anemia falciforme (Alta em pediatria) e talassemias (Diamante), hemólise e complicações.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.11] Anemia Falciforme


### Apostila 232 — Coagulopatias, trombofilias e hemoterapia

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Coagulação e hemostasia (Alta), hemoterapia (Baixa), distúrbios hemorrágicos pediátricos (Média).

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.10] Coagulação e Hemostasia; [Baixa; principal; PDF p.11] Hemoterapia


### Apostila 233 — Oncologia clínica e emergências oncológicas

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Emergências oncológicas e cuidados paliativos (Alta); não substituir os temas próprios de neoplasias cirúrgicas.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.9] Oncologia: emergências e cuidados paliativos


### Apostila 234 — Doença de Chagas

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Doenças negligenciadas (Alta), icterícias febris/febre maculosa (Alta) e Doença de Chagas; articular com hanseníase #235 e arboviroses #186.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.16] Doenças Negligenciadas; [Alta; principal; PDF p.27] Icterícias febris e Febre Maculosa


### Apostila 235 — Hanseníase: diagnóstico, tratamento e prevenção de incapacidades

**Área:** Clínica Médica | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Hanseníase e tuberculose na APS (Diamante): prevenção, diagnóstico, tratamento, vigilância.

**Aulas MedCof vinculadas:** [Alta; referencia_cruzada; PDF p.16] Doenças Negligenciadas; [Diamante; principal; PDF p.25] Tuberculose e Hanseníase na APS


### Apostila 236 — Tumores renais e vesicais

**Área:** Cirurgia Geral | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** [Média; referencia_cruzada; PDF p.15] Uro-Oncologia


### Apostila 237 — Síndrome compartimental e lesões musculotendíneas

**Área:** Cirurgia Geral | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 261 — Doenças pulmonares intersticiais: diagnóstico e manejo

**Área:** Clínica Médica | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Padrões clínico-radiológicos, investigação funcional, causas, fibrose e encaminhamento

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.23] Doença Pulmonar Intersticial (DPI)


### Apostila 262 — Esclerose múltipla e doenças desmielinizantes

**Área:** Clínica Médica | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** EM, neuromielite óptica, surtos, diagnósticos diferenciais, RNM e tratamento

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.22] Esclerose Múltipla (EM) e Neuromielite óptica


### Apostila 263 — Intoxicações exógenas no adulto e toxicologia de emergência

**Área:** Clínica Médica | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Abordagem inicial, toxíndromes, antídotos, descontaminação e casos de urgência

**Aulas MedCof vinculadas:** [Diamante; principal; PDF p.21] Intoxicações Exógenas


### Apostila 264 — Tumores hepatobiliares e pancreáticos

**Área:** Cirurgia Geral | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Além das neoplasias hepatobiliares, incluir NÓDULOS HEPÁTICOS BENIGNOS (Alta), 'fígado para perdidos' (Diamante) e abscesso hepático (Baixa). Não restringir todo conteúdo à oncologia.

**Aulas MedCof vinculadas:** [Baixa; principal; PDF p.10] Abscesso Hepático; [Alta; principal; PDF p.18] Nódulos hepáticos benignos; [Diamante; principal; PDF p.19] Fígado para perdidos; [Alta; principal; PDF p.20] Carcinoma hepatocelular; [Média; referencia_cruzada; PDF p.21] Metástases hepáticas de câncer colorretal; [Alta; principal; PDF p.21] Adenocarcinoma de pâncreas e tumores periampulares; [Média; principal; PDF p.24] Neoplasias Císticas Pancreáticas; [Alta; principal; PDF p.27] Pâncreas e vias biliares: Tumores Neuroendócrinos


### Apostila 265 — Câncer de pulmão e tumores mediastinais

**Área:** Cirurgia Geral | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Oncologia torácica: câncer de pulmão (Alta), nódulo pulmonar (Média), mediastino (Média); hemoptise/brônquios quando pertinente, com capítulo clínico #71.

**Aulas MedCof vinculadas:** [Média; principal; PDF p.23] Nódulo Pulmonar; [Alta; principal; PDF p.25] Cancer de Pulmão; [Média; principal; PDF p.28] Mediastino


### Apostila 277 — Infertilidade conjugal e reprodução assistida

**Área:** Ginecologia e Obstetrícia | **Tipo:** apostila_ja_publicada_indexada | **Situação:** já publicada; revisão não validada

**PRÓXIMA REVISÃO:** Apostila JÁ PUBLICADA. Conferir aulas Infertilidade (Alta) e Técnicas de Reprodução Assistida (Alta), com investigação do casal, FIV, ICSI e complicações. Não criar outra página.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.14] Infertilidade; [Alta; principal; PDF p.27] Técnicas de Reprodução Assistida


## LOTE 12


### Apostila 238 — Trauma raquimedular e avaliação neurológica inicial

**Área:** Cirurgia Geral | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Trauma raquimedular (Alta), sinais de gravidade e imobilização.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.5] Trauma Raquimedular


### Apostila 239 — Catarata, glaucoma crônico e retinopatias

**Área:** Cirurgia Geral | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Oftalmopediatria (Alta), catarata, glaucoma e retinopatias; integrar com #195.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.28] Oftalmologia para o Generalista - parte II; [Alta; principal; PDF p.29] Oftalmopediatria


### Apostila 240 — Aneurisma da aorta e emergências vasculares

**Área:** Cirurgia Geral | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Aneurisma de aorta (Alta), indicação de emergência e cirurgia cardiovascular; articulação com tema novo.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.22] Aneurisma de Aorta


### Apostila 241 — Malformações congênitas e síndromes genéticas

**Área:** Pediatria | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Malformações do SNC (Alta), outras malformações e genética (Alta), sinais de alarme. Malformações do SNC, genética pediátrica e diferenças do desenvolvimento sexual (Baixa): garantir classificação, avaliação e encaminhamento responsável.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.11] Genética; [Alta; principal; PDF p.17] Malformações do Sistema Nervoso; [Baixa; principal; PDF p.20] Diferenças no Desenvolvimento Sexual; [Alta; principal; PDF p.26] Malformações Congênitas


### Apostila 242 — Doença celíaca e síndromes de má absorção

**Área:** Pediatria | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.4] Diarreia Crônica e Doenças Funcionais


### Apostila 243 — Oncologia pediátrica: leucemias, linfomas e tumores sólidos

**Área:** Pediatria | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** [Diamante; principal; PDF p.24] Neoplasias Pediátricas


### Apostila 244 — Púrpuras, coagulopatias e hemoglobinopatias pediátricas

**Área:** Pediatria | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Hematologia pediátrica (Média/Diamante), hemostasia e anemia falciforme.

**Aulas MedCof vinculadas:** [Média; principal; PDF p.11] Hemostasia e Distúrbios Hemorrágicos


### Apostila 245 — Puberdade precoce e atrasada

**Área:** Pediatria | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Puberdade normal e patológica (Alta), hiperplasia adrenal congênita (Alta) e hipotireoidismo pediátrico (Média); vincular apostila nova de endocrinologia.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 246 — Afogamento e emergências ambientais na infância

**Área:** Pediatria | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Afogamento (Baixa) e emergências ambientais: manter resgate, suporte inicial e prevenção.

**Aulas MedCof vinculadas:** [Baixa; principal; PDF p.6] Politrauma, Afogamento


### Apostila 247 — Hiperêmese gravídica

**Área:** Ginecologia e Obstetrícia | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 248 — Colestase intra-hepática da gestação

**Área:** Ginecologia e Obstetrícia | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 249 — Violência sexual e direitos reprodutivos na assistência

**Área:** Ginecologia e Obstetrícia | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Violência sexual (Alta), interrupção legal da gestação (Média), acolhimento e direitos reprodutivos.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.9] Violência Sexual; [Média; principal; PDF p.9] Interrupção Legal da Gestação


### Apostila 266 — Oncologia de cabeça e pescoço

**Área:** Cirurgia Geral | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** CEC cabeça/pescoço, massas cervicais, diagnóstico, estadiamento e tratamento

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.28] CEC de Cabeça e Pescoço; [Média; principal; PDF p.28] Diagnósticos diferenciais das massas cervicais; [Baixa; principal; PDF p.28] Anomalias Congênitas em cabeça e pescoço


### Apostila 267 — Endoscopia digestiva e urgências endoscópicas

**Área:** Cirurgia Geral | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Indicações, hemorragia digestiva, corpo estranho, complicações e intervenções

**Aulas MedCof vinculadas:** [Diamante; principal; PDF p.14] Urgências endoscópicas; [Alta; principal; PDF p.29] Endoscopia


### Apostila 268 — Cirurgia cardiovascular para o generalista

**Área:** Cirurgia Geral | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Cirurgia coronariana, valvar e aórtica; indicações, complicações, encaminhamento

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.31] Cirurgia Cardíaca: Doença da Aorta; [Alta; principal; PDF p.31] Cirurgia Cardíaca: Doença Coronariana; [Alta; principal; PDF p.31] Cirurgia Cardíaca: Doenças Valvares


### Apostila 269 — Ultrassonografia obstétrica e medicina fetal

**Área:** Ginecologia e Obstetrícia | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** US gestacional, rastreio malformativo, avaliação fetal, Doppler e medicina fetal; sem repetir #89

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.2] Ultrassonografia em Obstetrícia; [Alta; principal; PDF p.29] Medicina Fetal


### Apostila 270 — Intercorrências clínicas na gestação

**Área:** Ginecologia e Obstetrícia | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Cardiopatias na gravidez (Alta), outras intercorrências (Média), trombofilias na gestação e puerpério (Baixa): organizar por agravo; preservar manejo materno-fetal.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.17] Cardiopatias na Gravidez; [Média; principal; PDF p.26] Outras Intercorrências Clínicas na Gestação; [Baixa; principal; PDF p.30] Trombofilias na Gestação e Puerpério


### Apostila 278 — Ciclo menstrual e eixo hipotálamo–hipófise–ovário

**Área:** Ginecologia e Obstetrícia | **Tipo:** apostila_ja_publicada_indexada | **Situação:** já publicada; revisão não validada

**PRÓXIMA REVISÃO:** Apostila JÁ PUBLICADA. Conferir Fisiologia Menstrual (Alta) e Esteroidogênese (Alta), capítulos hormonal/foliculogênese; não duplicar em amenorreia.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.6] Fisiologia Menstrual; [Alta; principal; PDF p.7] Esteroidogênese


## LOTE 13


### Apostila 250 — Transtornos alimentares

**Área:** Saúde Mental | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Transtornos alimentares e diferenciais psiquiátricos em adultos e adolescentes.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 251 — Transtornos de personalidade e autolesão

**Área:** Saúde Mental | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 252 — Saúde mental no ciclo gravídico-puerperal

**Área:** Saúde Mental | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.28] Transtornos Psiquiátricos na Gestação e Pós parto


### Apostila 253 — Luto, crises e transtornos de adaptação

**Área:** Saúde Mental | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 254 — Saúde mental do adolescente: avaliação e manejo inicial

**Área:** Saúde Mental | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Psiquiatria da infância e adolescência (Média): avaliação, risco e manejo.

**Aulas MedCof vinculadas:** [Média; principal; PDF p.28] Psiquiatria da Infância e Adolescência


### Apostila 255 — Longitudinalidade, coordenação do cuidado e matriciamento

**Área:** Medicina de Família e Comunidade | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 256 — Reabilitação comunitária e cuidado de pessoas com deficiência

**Área:** Medicina de Família e Comunidade | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 257 — Planejamento, avaliação e gestão de serviços de saúde

**Área:** Saúde Coletiva | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Planejamento, avaliação e gestão; saúde suplementar e judicialização (Diamante); adicionar competências do SUS.

**Aulas MedCof vinculadas:** [Diamante; principal; PDF p.29] Saúde Privada, Suplementar e Judicialização em Saúde


### Apostila 258 — Avaliação de tecnologias em saúde e custo-efetividade

**Área:** Saúde Coletiva | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 259 — Sistemas de Informação em Saúde e qualidade dos dados

**Área:** Saúde Coletiva | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Verificar a cobertura real do tema e das competências ENAMED; preencher capítulos necessários, sem reproduzir conteúdo já pronto.

**Aulas MedCof vinculadas:** Nenhuma ligação direta: preservar o tema da LURIA/ENAMED.


### Apostila 260 — Biossegurança e prevenção de infecções relacionadas à assistência

**Área:** Saúde Coletiva | **Tipo:** tema_original_preservado | **Situação:** não verificado

**PRÓXIMA REVISÃO:** Biossegurança, infecções nosocomiais (Média) e medidas de prevenção no cuidado.

**Aulas MedCof vinculadas:** [Média; principal; PDF p.18] Infecções Nosocomiais


### Apostila 271 — Endocrinologia pediátrica

**Área:** Pediatria | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Hiperplasia adrenal congênita, tireoide, crescimento, puberdade e urgências endócrinas

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.19] Hiperplasia Adrenal Congênita (HAC); [Média; principal; PDF p.20] Hipotireoidismo


### Apostila 272 — Fibrose cística

**Área:** Pediatria | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Triagem, diagnóstico, manifestações respiratórias/digestivas e seguimento

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.20] Fibrose Cística e Diferenciais


### Apostila 273 — Imunodeficiências na infância

**Área:** Pediatria | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Sinais de suspeita, avaliação inicial, classificação e encaminhamento

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.21] Imunodeficiências para o Pediatra


### Apostila 274 — Ortopedia pediátrica

**Área:** Pediatria | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Ortopedia (Alta), ortopedia pediátrica (Diamante), osteomielite e artrite séptica (Alta), trauma ortopédico; manter avaliação neurovascular.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.19] Osteomielite e Artrite Séptica; [Diamante; principal; PDF p.19] Ortopedia Pediátrica; [Alta; referencia_cruzada; PDF p.22] Ortopedia


### Apostila 275 — Emergências de cirurgia pediátrica

**Área:** Pediatria | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Uropediatria, hérnias, escroto agudo, urgências abdominais e cirurgia pediátrica no PS

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.25] Uropediatria e Hérnias; [Diamante; principal; PDF p.26] Cirurgia Pediátrica no PS


### Apostila 276 — Diarreia aguda no adulto e colite por Clostridioides difficile

**Área:** Clínica Médica | **Tipo:** nova_apostila_proposta | **Situação:** não iniciada (proposta)

**PRÓXIMA REVISÃO:** Diarreias agudas e colite pseudomembranosa (Baixa no MedCof): manter como tema essencial com C. difficile, exames, gravidade, tratamento, recorrência e diferencial com diarreia crônica #146.

**Aulas MedCof vinculadas:** [Baixa; principal; PDF p.20] Diarreia Agudas e Colite Pseudomembranosa


### Apostila 279 — Crescimento fetal reduzido e aumentado

**Área:** Ginecologia e Obstetrícia | **Tipo:** apostila_ja_publicada_indexada | **Situação:** já publicada; revisão não validada

**PRÓXIMA REVISÃO:** Apostila JÁ PUBLICADA. Conferir Restrição do Crescimento Intrauterino (Alta), critérios Doppler e manejo. Articular avaliação de vitalidade fetal, sem duplicação.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.15] Restrição de Crescimento Intrauterino


### Apostila 280 — Alterações fisiológicas da gestação

**Área:** Ginecologia e Obstetrícia | **Tipo:** apostila_ja_publicada_indexada | **Situação:** já publicada; revisão não validada

**PRÓXIMA REVISÃO:** Apostila JÁ PUBLICADA. Conferir Modificações do Organismo Materno (Alta), por sistema e trimestre, e correlação com sinais de risco. Não criar conteúdo repetido.

**Aulas MedCof vinculadas:** [Alta; principal; PDF p.1] Modificações do Organismo Materno


## Fechamento e verificação

O inventário mantém **401 aulas distintas**. O mapeamento para cards é completo, mas **nenhum dos 401 capítulos foi validado cientificamente por esta auditoria**. Só considerar um tópico encerrado depois de revisar seu conteúdo e registrar as evidências. Nunca eliminar as aulas Baixa nem criar páginas repetidas para módulos Diamante complementares.

Nenhuma mudança é automaticamente aplicada à `main` ou ao Supabase: tudo está na proposta de revisão PR #41.
