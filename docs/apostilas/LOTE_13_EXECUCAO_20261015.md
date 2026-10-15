# LURIA — Lote 13 · Controle de execução real

**Data de início:** 15/10/2026. **Branch isolada:** `editorial/lote-13-preenchimento-20261015`, derivada de `audit/enamed-7areas-lotes-finais-20261015`. **Não houve merge, deploy, publicação no Supabase ou alteração do conteúdo já aprovado.**

## Escopo preservado

O lote contém **19 entradas**: 11 temas originais #250–#260, seis propostas novas #271–#276 e duas apostilas existentes indexadas #279–#280. Elas fazem parte do cruzamento de 401 aulas MedCof com 280 cards editoriais; aulas de mesma doença que se complementam não implicam páginas duplicadas. **Associação de aula no índice NÃO significa conteúdo escrito ou cientificamente revisado.**

## Evidências desta execução

- Criados **quatro manuscritos iniciais**: #260, #271, #274 e #276. Cada um possui 4 casos clínicos comentados, 6 questões originais comentadas, quadros, fluxos e referências para a próxima revisão.
- Foram lidos e comparados materiais reais do Drive: *Infecção de corrente sanguínea* (benchmark PARCIAL para #260), *Ortopedia Pediátrica* (#274) e *Diarreia Aguda + Clostridium* (#276), além de *Crescimento e Baixa Estatura* e *Genética* como benchmarks parciais da #271. A autoria institucional desses PDFs não foi confirmada; seus textos e imagens não foram reutilizados. Leitura interna de #279 e #280 para padrão visual.
- Doses e medidas para CDI foram alinhadas com IDSA/SHEA 2021; a prevenção de IRAS inclui diretrizes ANVISA 2026. Risco de revisão sempre permanece antes da liberação médica final.
- Todos os textos criados são **rascunhos de profundidade inicial, não aprovados**: contagens **brutas**, com Markdown, exemplos e referências, de ~34,3 mil caracteres (#260), ~29,2 mil (#274) e ~33,8 mil (#276) e ~29,1 mil (#271). Nenhuma destas quantidades comprova ≥60 mil caracteres úteis.
- O JSON `lotes-11-13-controle-revisao.json` foi atualizado somente para os itens #260/#274/#276 como **EM_REDACAO_PARCIAL**; os outros 15 permaneceram com estado original.

## Checklist por entrada — não confundir mapa curricular com conclusão

### #250 — Transtornos alimentares
- **Área:** Saúde Mental. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Entrevista e critérios de anorexia nervosa, bulimia, compulsão alimentar, ARFID; triagem de risco, bradicardia, distúrbios eletrolíticos e realimentação; infância/adolescência, equipe multiprofissional, internação e seguimento.
- **Associações MedCof:** Sem aula correlata direta na matriz, preservar competência da LURIA.
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #251 — Transtornos de personalidade e autolesão
- **Área:** Saúde Mental. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Grupos de transtornos de personalidade, diagnóstico longitudinal com cautela, bordeline e impulsividade, autolesão não suicida versus comportamento suicida, avaliação de segurança, plano de crise, psicoterapias e limites do uso farmacológico.
- **Associações MedCof:** Sem aula correlata direta na matriz, preservar competência da LURIA.
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #252 — Saúde mental no ciclo gravídico-puerperal
- **Área:** Saúde Mental. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Depressão e ansiedade perinatal, psicose puerperal como urgência, transtorno bipolar e risco de recorrência, avaliação suicida, puerpério, amamentação e escolhas farmacológicas compartilhadas por risco-benefício.
- **Associações MedCof:** Transtornos Psiquiátricos na Gestação e Pós parto [Alta; principal; PDF p.28]
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #253 — Luto, crises e transtornos de adaptação
- **Área:** Saúde Mental. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Luto normal e prolongado, diferenciar transtorno de adaptação e depressão maior, trauma, reações de crise, risco suicida, apoio familiar e cuidado centrado na pessoa com encaminhamento prudente.
- **Associações MedCof:** Sem aula correlata direta na matriz, preservar competência da LURIA.
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #254 — Saúde mental do adolescente: avaliação e manejo inicial
- **Área:** Saúde Mental. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Entrevista com adolescente, sigilo e suas exceções, rastreio de depressão, suicidabilidade e autolesão, bullying, abuso, uso de substâncias, transtornos de ansiedade e neurodesenvolvimento, intervenção familiar e rede de proteção.
- **Associações MedCof:** Psiquiatria da Infância e Adolescência [Média; principal; PDF p.28]
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #255 — Longitudinalidade, coordenação do cuidado e matriciamento
- **Área:** Medicina de Família e Comunidade. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Atributos APS, longitudinalidade e continuidade informacional, coordenação clínica e linhas de cuidado, referência/contrarreferência, matriciamento e apoio NASF/eMulti conforme arranjo vigente, indicadores e exemplos complexos.
- **Associações MedCof:** Sem aula correlata direta na matriz, preservar competência da LURIA.
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #256 — Reabilitação comunitária e cuidado de pessoas com deficiência
- **Área:** Medicina de Família e Comunidade. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Modelo biopsicossocial, CIF, avaliação funcional e acessibilidade, reabilitação comunitária, tecnologias assistivas, direitos, cuidado domiciliar, comunicação inclusiva e plano compartilhado.
- **Associações MedCof:** Sem aula correlata direta na matriz, preservar competência da LURIA.
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #257 — Planejamento, avaliação e gestão de serviços de saúde
- **Área:** Saúde Coletiva. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** SUS e redes, diagnóstico situacional, planejamento ascendente, programação de serviços, regionalização, avaliação de estrutura-processo-resultado, regulação, saúde suplementar e judicialização sem simplificações.
- **Associações MedCof:** Saúde Privada, Suplementar e Judicialização em Saúde [Diamante; principal; PDF p.29]
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #258 — Avaliação de tecnologias em saúde e custo-efetividade
- **Área:** Saúde Coletiva. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** ATS e CONITEC, avaliação de evidência/risco, efetividade versus eficácia, custo-efetividade incremental, QALY, ICER, limiares e incerteza, impacto orçamentário e decisões no SUS.
- **Associações MedCof:** Sem aula correlata direta na matriz, preservar competência da LURIA.
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #259 — Sistemas de Informação em Saúde e qualidade dos dados
- **Área:** Saúde Coletiva. **Natureza:** tema_original_preservado. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** DATASUS, SIM, SINASC, SINAN, SIH/SUS, SIA/SUS, e-SUS APS, qualidade/cobertura/completude, subnotificação, linkage, privacidade, vigilância e interpretação de indicadores.
- **Associações MedCof:** Sem aula correlata direta na matriz, preservar competência da LURIA.
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #260 — Biossegurança e prevenção de infecções relacionadas à assistência
- **Área:** Saúde Coletiva. **Natureza:** tema_original_preservado. **Estado:** **RASCUNHO PARCIAL**.
- **Conteúdo obrigatório / lacunas a testar:** Precauções padrão, transmissão e EPI; higienização, perfurocortantes/PEP, IPCS/CVC, ITU-CVD, PAV, ISC, reprocessamento, stewardship, indicadores, surtos e regulamentação ANVISA 2026.
- **Associações MedCof:** Infecções Nosocomiais [Média; principal; PDF p.18]
- **Ação:** Concluir e revisar `apostilas/_rascunhos/lote-13-260-biosseguranca-iras.md`; não certificar extensão/qualidade ainda.

### #271 — Endocrinologia pediátrica
- **Área:** Pediatria. **Natureza:** nova_apostila_proposta. **Estado:** **RASCUNHO PARCIAL**.
- **Conteúdo obrigatório / lacunas a testar:** HAC/perda salina e crises adrenal; hipotireoidismo congênito e adquirido; baixa estatura, velocidade de crescimento, TSH/T4, testes de triagem, puberdade precoce/atrasada e decisão de encaminhar.
- **Associações MedCof:** Hiperplasia Adrenal Congênita (HAC) [Alta; principal; PDF p.19]; Hipotireoidismo [Média; principal; PDF p.20]
- **Ação:** Concluir e revisar `apostilas/_rascunhos/lote-13-271-endocrinologia-pediatrica.md`; benchmark específico HAC/tireoide não localizado, NÃO certificar extensão/qualidade.

### #272 — Fibrose cística
- **Área:** Pediatria. **Natureza:** nova_apostila_proposta. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Mutação CFTR, genética e triagem neonatal, teste do suor e genotipagem, doença pulmonar e colonização, insuficiência pancreática, nutrição, exacerbações e moduladores CFTR conforme genótipo e disponibilidade.
- **Associações MedCof:** Fibrose Cística e Diferenciais [Alta; principal; PDF p.20]
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #273 — Imunodeficiências na infância
- **Área:** Pediatria. **Natureza:** nova_apostila_proposta. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Sinais de alerta para erros inatos da imunidade, história familiar, infecções incomuns, imunoglobulinas/linfócitos/complemento, imunodeficiências humorais/celulares/fagocíticas, vacinação e encaminhamento.
- **Associações MedCof:** Imunodeficiências para o Pediatra [Alta; principal; PDF p.21]
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #274 — Ortopedia pediátrica
- **Área:** Pediatria. **Natureza:** nova_apostila_proposta. **Estado:** **RASCUNHO PARCIAL**.
- **Conteúdo obrigatório / lacunas a testar:** DDQ com exame e imagem seletiva, claudicação e dor referida, Perthes, epifisiólise, artrite séptica, osteomielite, Salter–Harris, fratura supracondiliana, pronação dolorosa e neurovascular.
- **Associações MedCof:** Osteomielite e Artrite Séptica [Alta; principal; PDF p.19]; Ortopedia Pediátrica [Diamante; principal; PDF p.19]; Ortopedia [Alta; referencia_cruzada; PDF p.22]
- **Ação:** Concluir e revisar `apostilas/_rascunhos/lote-13-274-ortopedia-pediatrica.md`; não certificar extensão/qualidade ainda.

### #275 — Emergências de cirurgia pediátrica
- **Área:** Pediatria. **Natureza:** nova_apostila_proposta. **Estado:** **PRODUÇÃO/REVISÃO NÃO VALIDADA**.
- **Conteúdo obrigatório / lacunas a testar:** Escroto agudo, hérnias inguinais encarceradas, invaginação, obstrução/volvo, apendicite, estenose hipertrófica do piloro, uropediatria e hérnias, prioridade de ressuscitação/imagem e cirurgia.
- **Associações MedCof:** Uropediatria e Hérnias [Alta; principal; PDF p.25]; Cirurgia Pediátrica no PS [Diamante; principal; PDF p.26]
- **Ação:** Pesquisar/ler comparação da matéria no Drive, inspecionar conteúdo real em Supabase/HTML e só então revisar ou criar no padrão 60K.

### #276 — Diarreia aguda no adulto e colite por Clostridioides difficile
- **Área:** Clínica Médica. **Natureza:** nova_apostila_proposta. **Estado:** **RASCUNHO PARCIAL**.
- **Conteúdo obrigatório / lacunas a testar:** Fisiologia e tipos de diarreia, síndrome invasiva/secretora, gravidade e reposição, decisão de exames, STEC/SHU, CDI e GDH/NAAT/toxina, primeira linha e recorrência, prevenção e isolamento.
- **Associações MedCof:** Diarreia Agudas e Colite Pseudomembranosa [Baixa; principal; PDF p.20]
- **Ação:** Concluir e revisar `apostilas/_rascunhos/lote-13-276-diarreia-aguda-c-difficile.md`; não certificar extensão/qualidade ainda.

### #279 — Crescimento fetal reduzido e aumentado
- **Área:** Ginecologia e Obstetrícia. **Natureza:** apostila_ja_publicada_indexada. **Estado:** **HTML EXISTENTE · PRESERVAR / AUDITAR**.
- **Conteúdo obrigatório / lacunas a testar:** Conservar os capítulos atuais de PIG/RCF, critérios Delphi, Doppler, RCF precoce/tardia, GIG/macrossomia, distocia de ombro. Verificar critérios, momento de parto, precisão de PFE, casos e metas úteis; evitar duplicar #89.
- **Associações MedCof:** Restrição de Crescimento Intrauterino [Alta; principal; PDF p.15]
- **Ação:** Conferir sem sobrescrever `/apostilas/crescimento-intrauterino-reduzido-aumentado/`; registrar mapa de lacunas por seção e referências.

### #280 — Alterações fisiológicas da gestação
- **Área:** Ginecologia e Obstetrícia. **Natureza:** apostila_ja_publicada_indexada. **Estado:** **HTML EXISTENTE · PRESERVAR / AUDITAR**.
- **Conteúdo obrigatório / lacunas a testar:** Preservar as seções por sistemas da gestação, trimestres, interpretação de exames, farmacocinética e emergências. Conferir valores de referência, causas não fisiológicas, provas/casos e conteúdo útil.
- **Associações MedCof:** Modificações do Organismo Materno [Alta; principal; PDF p.1]
- **Ação:** Conferir sem sobrescrever `/apostilas/alteracoes-fisiologicas-da-gestacao/`; registrar mapa de lacunas por seção e referências.

## Observações específicas sobre apostilas já publicadas

**#279:** arquivo HTML de `apostilas/crescimento-intrauterino-reduzido-aumentado/index.html` foi inspecionado. Identificados capítulos sobre critérios de crescimento, Doppler, RCF precoce/tardia, macrossomia e casos. Extração textual **bruta aproximada de 55,9 mil caracteres**, sem descontar navegação, repetição e estrutura; isso sinaliza necessidade de auditoria rigorosa do piso de 60 mil úteis, **não é medição final**.

**#280:** `apostilas/alteracoes-fisiologicas-da-gestacao/index.html` foi inspecionado. Apresenta capítulos por sistema, interpretação laboratorial e autoteste. Extração textual **bruta aproximada de 82,1 mil caracteres**, não certifica conteúdo útil/autossuficiência, atualidade ou correção dos casos/questões.

## Gates antes de qualquer marcação 'concluída'

1. Verificar página/registro real (HTML e Supabase) para prevenir duplicação. Abrir material equivalente no Drive por tema, confirmar proveniência e registrar leitura, além de comparar com LURIA já existente.
2. Construir matriz interna de **todos** os tópicos e respectivas âncoras, sem lacunas de fisiopatologia, exames, interpretação, diferenciais, tratamento, contraindicações, complicações, seguimento e grupos especiais.
3. Pelo menos 4 casos e 6 questões com alternativas plausíveis e comentários; testar se as respostas são integralmente justificadas no texto interno.
4. Contar ≥60.000 **caracteres didáticos úteis**, excluindo Markdown/HTML, navegação, referências e repetição. Não inflar com texto vazio ou reciclagem.
5. Conferir diretrizes atuais (nacionais primeiro), doses, classes de recomendação, controvérsias e disponibilidade brasileira. Solicitar revisão técnica antes de qualquer uso clínico.
6. Selecionar imagens de exames/fotos médicas com fonte, licença comercial, pertinência e qualidade, sem publicar antes da aprovação centralizada no Admin.
7. Validar design responsivo, links, tabelas, auditorias/scripts e ausência de efeitos sobre apostilas prontas; publicar apenas após aprovação editorial explícita e coordenação com trabalhos paralelos.

## Próxima ação priorizada

Aprofundar os rascunhos #260/#271/#274/#276 até o padrão e, em paralelo, obter benchmarking comparável e iniciar os demais temas novos **#272, #273, #275**, sem deixar Saúde Mental, MFC e Saúde Coletiva #250–#259 para trás. Auditar **#279/#280 em lugar de recriá-las**. O status de todos está registrado no JSON de controle, que é a fonte de acompanhamento.
