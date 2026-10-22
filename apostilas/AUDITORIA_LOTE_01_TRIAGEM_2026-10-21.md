# Lote 01 — auditoria inicial de estrutura e experiência de leitura

Data: 21/10/2026. Lote 1: 28 caminhos (27 catalogados + 1 HTML extra). **Triagem estrutural do texto realizada em 27 caminhos**, com leitura direcionada de capítulos de três temas; revisão médica integral, benchmark de todos os temas e QA visual ainda pendentes. Nenhuma apostila aprovada pela auditoria.

## Critérios de medição

- Para 26 apostilas com `content.json`, o número abaixo é estimativa de caracteres visíveis de parágrafos, listas e tabelas, descontados cabeçalhos e seção de referências. Não é verificador oficial de 60K, nem garante texto não repetido.
- Uma apostila tem HTML completo diretamente no `index.html`, sem `content.json`, e a medida dela é texto extraído do HTML (estimativa não comparável diretamente).
- **Sinal de densidade textual:** acima de 120 parágrafos brutos; é um gatilho de inspeção, não defeito comprovado. **Sinal de 60K:** estimativa inferior a 60.000 requer auditoria detalhada.
- Não houve teste visual de dispositivos reais/navegador nem verificação científica linha a linha das 28 apostilas nesta etapa.

## Triagem dos 28 caminhos

| Nº | Apostila | Caracteres estimados | Seções | Tabelas | Parágrafos | Prioridade inicial |
|---:|---|---:|---:|---:|---:|---|
| 1 | Perfuração de Víscera Oca e Peritonite Aguda | 60.738 | 14 | 7 | 67 | DOI incorreto corrigido na branch; rever cronologia da peritonite |
| 2 | Doenças Prostáticas e Avaliação Inicial de Neoplasias Urológicas | 86.360 | 13 | 4 | 91 | Sem alerta automático de extensão |
| 3 | Tumores renais e vesicais | 87.156 | 8 | 6 | 87 | Título cadastrado como slug; melhorar apresentação |
| 4 | Queimaduras | 63.162 | 15 | 8 | 84 | Próxima do piso; conferir caracteres úteis |
| 5 | Arritmias e Fibrilação Atrial | 105.707 | 15 | 14 | 145 | Fragmentar blocos extensos; revisar medicamentos/ECG |
| 6 | Cirrose e suas Complicações | 86.549 | 23 | 6 | 172 | Muitos parágrafos; explorar quadros de complicações e conduta |
| 7 | Diarreia Aguda na Infância | 56.718 | 23 | 3 | 107 | Possível abaixo de 60K; checar hidratação por plano e sinais de gravidade |
| 8 | Doenças Anorretais: Cirurgia e Coloproctologia Essencial | 76.728 | 8 | 7 | 93 | Revisar imagens reais e algoritmos |
| 9 | Hepatites Virais | 64.468 | 34 | 6 | 132 | Densidade textual; conferir esquemas sorológicos e fontes |
| 10 | Neuropatias periféricas e doenças neuromusculares | 71.674 | 28 | 3 | 135 | Densidade textual; propor diagramas de localização |
| 11 | Placenta Prévia e Descolamento Prematuro de Placenta | 62.110 | 16 | 5 | 83 | Próxima do piso; checar tabelas e fluxos de urgência |
| 12 | Resposta Metabólica ao Trauma | 60.920 | 15 | 12 | 82 | Próxima do piso; conferir fisiologia sem redundância |
| 13 | Trauma Pélvico e Geniturinário | 55.464 | 25 | 7 | 99 | Possível abaixo de 60K; avaliar algoritmos por estabilidade |
| 14 | Vigilância Sanitária | 64.416 | 75 | 5 | 134 | Muitos capítulos/parágrafos; priorizar navegação por perguntas |
| 15 | Lesão Renal Aguda | 60.157 | 9 | 6 | 72 | Margem mínima no piso; conferir critérios KDIGO |
| 16 | Câncer de Endométrio | 57.435 | 29 | 9 | 97 | Possível abaixo de 60K; conferir estratificação e condutas |
| 17 | Infecções Sexualmente Transmissíveis (IST) | 60.180 | 25 | 17 | 179 | Margem mínima; densidade textual; conferir PCDT e imagens |
| 18 | Infecções na gestação e transmissão vertical | 63.203 | — | 8 | — | HTML completo sem content.json; estimativa por texto HTML |
| 19 | Hanseníase: Diagnóstico, Tratamento e Prevenção de Incapacidades | 72.856 | 8 | 7 | 82 | Classificação de área no banco incorreta; padronizar título |
| 20 | Medicina Baseada em Evidências | 61.793 | 17 | 12 | 113 | Próxima do piso; explicação original de interpretação de estudos |
| 21 | Abordagem do Tabagismo, Álcool e Outras Drogas | 61.064 | 24 | 6 | 133 | Densidade textual; quadros motivacionais e fluxos |
| 22 | Notificação Compulsória de Doenças e Agravos | 60.425 | 13 | 6 | 83 | Margem mínima; validar lista e prazos vigentes |
| 23 | Alergias Alimentares e Anafilaxia Pediátrica | 171.941 | 11 | 5 | 86 | Muito extensa; sinalizar redundâncias e algoritmos de epinefrina |
| 24 | Malformações congênitas e síndromes genéticas | 71.427 | 8 | 6 | 98 | Título cadastrado como slug; imagens esquemáticas |
| 25 | Vasculites Pediátricas e Doença de Kawasaki | 60.314 | 16 | 4 | 155 | Margem mínima + densidade textual; algoritmo Kawasaki |
| 26 | Segurança do Paciente e Prevenção de Eventos Adversos | 92.572 | 9 | 5 | 83 | Quadros de barreiras, incidentes e análise causal |
| 27 | Transtornos Ansiosos, TOC e Transtornos Relacionados ao Trauma | 93.664 | 21 | 6 | 234 | Grande densidade textual; algoritmos e comparações diagnósticas |
| 28 | Assistência ao Parto, Vigilância Intraparto e Partograma | Pendente | — | — | — | Página fora do catálogo; HTML localizado, auditoria de capítulos pendente |

## Achados científicos — investigação iniciada

1. **Perfuração de víscera oca — erro confirmado de rastreabilidade:** a referência identificada como diretriz WSES para úlcera perfurada era um artigo de trauma (DOI `10.1186/s13017-020-00325-0`). Na branch de auditoria, seu URL foi substituído pelo DOI `10.1186/s13017-019-0283-9` após verificação. A correção ainda não entrou na `main`.
2. **Perfuração — precisão didática pendente:** subtítulos apresentam peritonite química como asséptica nas primeiras 6 a 12 horas e fase bacteriana apenas após 12 a 24 horas. A própria apostila admite contaminação colônica imediata. Reescrever os parágrafos para destacar dependência da fonte, microbiota e tempo, e evitar falsa tranquilização ou atraso de antibióticos e controle do foco.
3. **FA:** a apostila contém referência à Diretriz Brasileira 2025 e ao CHA₂DS₂-VA, e reconhece anticoagulação após cardioversão e diferenças de limiar segundo diretrizes; positivo na triagem, **sem certificação** de doses/condutas. Checagem aprofundada de energia, anticoagulação e contraindicações ainda requerida.
4. **IST:** texto aborda o PCDT e a incorporação da DoxiPEP no SUS em 2026. Precisam ser checadas elegibilidade, doses e definição de população, além da posição e licença das oito imagens presentes no HTML. Material externo do Drive foi usado apenas como referência pedagógica.

## Achado objetivo de legibilidade no CSS

O renderer compartilhado usa fonte de **13,2 px** em parágrafos/listas, **12 px** em tabelas e **9,6 px** nos links da navegação lateral. A apostila compactada de Perfuração reduz a navegação para **8,7 px** e o subtítulo para **7 px**. Esses tamanhos são candidatos prioritários a melhoria porque obrigam maior esforço de leitura, especialmente em notebooks e dispositivos móveis. Proposta para teste responsivo (não aplicada ao CSS global ainda): corpo 15–16 px com comprimento de linha controlado, tabelas a partir de 13–14 px e sumário legível com agrupamentos/recolhimento para evitar scroll excessivo. Validar impacto no PWA e no menu lateral antes de publicar.

## Diretrizes de reescrita para uma leitura prazerosa (sem reduzir rigor)

- Em abertura de capítulo, estabelecer uma pergunta clínica concreta seguida de explicação causal, evitando longa enumeração antes de dar contexto.
- Agrupar termos em **tabelas comparativas** apenas quando comparação é o objetivo; usar quadros de decisão para exames e terapêuticas.
- Nos capítulos de fisiopatologia, criar **esquemas autorais** das relações causa → mecanismo → achado → conduta, com rótulos claros e versão mobile.
- Nos capítulos de diagnóstico e tratamento, criar **fluxogramas de decisão** com critérios de entrada, exclusão, red flags e exceções. Citar fonte/ano no rodapé do fluxo.
- Intercalar explicações em parágrafos de fôlego moderado, subtítulos objetivos, 'Pulo do Gato' em pontos de alto rendimento, casos curtos com escolhas e retorno comentado.
- Preservar imagens clínicas já aprovadas; novas imagens para Admin com crédito/licença verificável, legenda interpretativa e propósito didático. Meta de 20 candidatas por nova apostila não significa 20 imagens decorativas.
- Evitar codificar **informações clínicas essenciais apenas por cor**; gráficos acessíveis e legíveis em tela pequena.
- Após cada revisão: leitura de ponta a ponta, teste com questões clínicas, deduplicação, verificar referências realmente correspondentes e QA responsivo.

## Comparadores lidos, sem reprodução editorial

- Material sobre abdome agudo perfurativo; utilizado para observar cobertura cirúrgica e estrutura de urgências.
- Material de taquiarritmia; utilizado para comparar abordagem ECG e ensino de mecanismo.
- Material de úlceras genitais; utilizado para comparar escopo sindrômico da IST.

## Fontes públicas iniciais

- WSES perforated and bleeding peptic ulcer: https://pmc.ncbi.nlm.nih.gov/articles/PMC6947898/
- Diretriz Brasileira de FA 2025: https://www.scielo.br/j/abc/a/jWrKHyPRYYh7dXZR94nJcGp/?lang=pt
- PCDT-IST Ministério da Saúde: https://www.gov.br/saude/pt-br/assuntos/pcdt/a/atencao-integral-as-pessoas-com-infeccoes-sexualmente-transmissiveis/view
- Ministério da Saúde DoxiPEP 2026: https://www.gov.br/aids/pt-br/assuntos/noticias/2026/marco/ministerio-da-saude-oferece-nova-estrategia-para-a-prevencao-de-clamidia-e-sifilis

## Execução clínica e editorial — primeira rodada (21/10/2026)

**Apostila trabalhada:** Perfuração de Víscera Oca e Peritonite Aguda (`/apostilas/perfuracao-de-viscera-oca/`). Comparador `13 - ABDOME AGUDO PERFURATIVO.pdf` do Drive efetivamente reaberto e lido; utilizado para inventário de tópicos (sem reprodução). Fonte LURIA conferida diretamente no `content.json`, que alimenta a página.

### Mudanças gravadas na branch de auditoria

- Reorganizadas explicações sobre irritação química e contaminação bacteriana, retirando limites temporais rígidos e reforçando que não se deve postergar antibiótico ou controle do foco à espera de 12–24 horas.
- Acrescentado quadro visual autoral, acessível como tabela no renderer, **Situação clínica × Mecanismo × Decisão prática**, integrando quatro cenários clínicos.
- Atualizada ressuscitação conforme SSC 2026 (cristaloide em hipoperfusão séptica, recomendação condicional e reavaliação de volume); antibióticos precoces e controle do foco em paralelo. Evitou-se confundir tratamento de úlcera perfurada e esquema de infusão de IBP para úlcera sangrante.
- Removida recomendação de antifúngico empírico **mandatório** em toda peritonite terciária com choque; seleção conforme risco de candidíase invasiva e contexto.
- Corrigida a classificação de suturas: Vicryl (poliglactina 910) é absorvível, seda é não absorvível.
- Manejo não operatório revisado: exceção para pacientes selecionados, sem peritonite/sepse, vazamento selado documentado, monitorização e prontidão operatória; piora clínica leva à reavaliação imediata, não a espera fixa.
- Corrigidas formulações absolutas sobre biópsia gástrica, alinhando investigação da neoplasia à viabilidade clínica, amostragem intraoperatória ou endoscopia de seguimento.
- Seis questões com atribuições não comprovadas a bancas passaram a ser identificadas como **simuladas**; o rótulo de gabarito foi alterado para **resposta comentada**. Ainda requer revisão de originalidade e consistência de enunciados.
- Treze seções principais renumeradas em ordem lógica e suas âncoras preservadas. Referências de WSES e SSC 2026 e SIS 2024 atualizadas/acrescentadas.
- CSS **local desta apostila** modificado como piloto: texto de 15 px, tabela 13,6 px e navegação 12,2 px, com adaptações para telas menores. CSS global não foi modificado.

### Status de verificação

- `content.json` reimportado e analisado com parse de JSON válido; preservadas 14 seções do esquema, âncoras e 13 itens de navegação principais. HTML de entrada preservado fora do `<style>` local.
- GitHub confirmou gravação e releitura dos arquivos na branch; nenhum merge em `main`.
- **Pendências bloqueantes:** validação médica integral das outras subseções e casos, conferência de todos os números e técnicas operatórias, testes automatizados do renderer, análise visual com navegador desktop/PWA, validação de todas as referências e imagens. A apostila não está certificada como aprovada.

### Referências oficiais usadas nesta rodada

- WSES 2020 (Perfuração e sangramento de úlcera péptica): https://pmc.ncbi.nlm.nih.gov/articles/PMC6947898/ 
- Surviving Sepsis Campaign 2026: https://sccm.org/clinical-resources/guidelines/guidelines/surviving-sepsis-campaign-international-guidelines-for-management-of-sepsis-and-septic-shock-2026
- Surgical Infection Society 2024: https://journals.sagepub.com/doi/full/10.1089/sur.2024.137

## Execução científica e editorial — Diarreia Aguda na Infância (21/10/2026)

**Arquivo realmente auditado e alterado:** `apostilas/diarreia-aguda/content.json` e piloto de tipografia em `apostilas/diarreia-aguda/index.html`. Benchmark do Google Drive efetivamente aberto: `01 - GASTRO - DIARREIA AGUDA + CLOSTRIDIUM.pdf`. **Limitação:** apostila de gastroenterologia adulta, com condutas de `C. difficile` antigas; não foi usada como fonte de prescrição pediátrica, nem copiada. Um comparador pediátrico especificamente equivalente não foi encontrado no Drive nesta rodada.

### Achados científicos e correções aplicadas

1. **Contradição interna entre capítulos:** texto principal tratava probióticos como uso não rotineiro conforme OMS 2024, enquanto seção adicionada dizia que LGG e `Saccharomyces` eram obrigatórios/nível 1A; a seção extra foi reescrita distinguindo a diretriz OMS e recomendações condicionais por cepa.
2. **Zinco:** conflito entre OMS 2024 (sugestão condicional 5 mg/dia, evidência de baixa certeza) e cartaz MS 2026 (10 mg/dia até 6 meses, 20 mg/dia acima de 6 meses até menores de 5 anos, 10–14 dias). Foram explicitados origem, aplicabilidade e proibição de misturar doses; conferir formulação em zinco elementar.
3. **Planos A/B/C:** distinção pela classificação clínica; Plano B realizado na unidade, com referência inicial de 50–100 mL/kg de SRO em 4–6 horas, sem dispensar reavaliação; Plano C quando desidratação grave, não somente choque; atenção a condições especiais.
4. **Antibióticos pediátricos:** questão antes atribuída à UNICAMP e orientada ao ciprofloxacino passou a **questão autoral simulada**, com alternativa correta de azitromicina nas condições indicadas pelo cartaz MS 2026 e ressalva de STEC, resistência e necessidade de avaliação individual.
5. **STEC/SHU:** removidos multiplicador universal não rastreado de risco (17 vezes), conclusão causal sem sustentação de que um betalactâmico causou a SHU em caso clínico e regra de restrição hídrica rígida em toda criança oligúrica; priorizados perfusão, função renal e suporte individualizado. A indicação de diálise não é automática.
6. **Preparo da SRO:** removida a afirmação de que qualquer sachê deve ser diluído em exatos 1.000 mL; cada apresentação deve ser preparada conforme volume do fabricante.
7. **Nutrição e diarreia persistente:** reforço de que não se suspende aleitamento nem se introduz dieta sem lactose/hipoalergênica indiscriminadamente; retenção de sinais de referência.
8. **Vacinação:** conferida a janela de rotavírus 2026 (1ª dose de 1 mês e 15 dias até 11 meses e 29 dias; 2ª dose de 3 meses e 15 dias até 23 meses e 29 dias) contra calendário público e instrução normativa. Detalhes de grupos especiais continuam pendentes.
9. **Inconsistência estrutural relevante:** a seção intitulada “12 questões originais” tinha **somente 12 títulos**. Foram escritas e inseridas **12 questões efetivas com enunciados, quatro alternativas e resposta comentada**, incluindo prova de decisão nos planos A/B/C, SRO, SHU, antibióticos, zinco, probióticos e rotavírus.
10. **Legibilidade e gráfico:** criados dois quadros nativos legíveis pelo renderer (Plano A/B/C × sinais × ação × reavaliação; decisões de revisão), substituído o pseudofluxograma HTML denso por lista ordenada e tabela. Piloto CSS exclusivamente nesta página aumenta corpo a 15 px, tabelas a 13,6 px e sumário a 12,2 px; nenhuma imagem de terceiro inserida sem aprovação.

### Validação efetuada

- Releitura após gravação com JSON válido; 23 seções com 23 entradas de navegação, âncoras sem duplicatas; 5 tabelas com número de células consistente, 19 listas, 130 parágrafos; 12 enunciados efetivos de questões, 12 blocos de alternativas.
- Checado que o renderer do repositório reconhece nativamente os blocos `t` (tabela), `u` (lista), `o` (lista ordenada); não houve alteração do JS comum.
- Estimativa instrumental aproximada: **66.850 caracteres educacionais** somando conteúdo estruturado extraído, **não equivalente à prova rigorosa do mínimo editorial de 60.000 caracteres úteis** (ainda depende do script de auditoria, revisão humana e deduplicação). A triagem anterior assinalou aprox. 56.718 antes destas inserções.
- O HTML da página foi modificado **somente** dentro do bloco de CSS local do sumário; nenhuma mudança em `main` ou nas imagens aprovadas.

### Pendências / bloqueio de aprovação

- Revisar doses, microbiologia e decisões em todas as tabelas/casos com pediatra; confirmar antibióticos locais e diagnósticos específicos.
- Testar visualmente desktop, celular e PWA, inclusive acessibilidade do sumário, rolagem de tabelas e responsividade; validar pipeline de build.
- Conferir originalidade e todas as alternativas das 14 questões agora apresentadas nas duas seções do livro; distinguir banco de questões independente do material didático.
- Completar revisão bibliográfica das seções históricas e não inferir eficácia clínica de medicamentos de um único estudo. Inserir imagens educacionais apenas mediante direitos verificados e fila Admin aprovada.

### Fontes públicas verificadas

- Ministério da Saúde, cartaz de julho de 2026: https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/doencas-diarreicas-agudas/manejo-do-paciente-com-diarreia-avaliacao-do-estado-do-paciente/view
- OMS, diarreia infantil (2024): https://www.who.int/publications/i/item/9789240103412
- Ministério da Saúde, calendário 2026: https://www.gov.br/saude/pt-br/vacinacao/calendario
- MS, instrução normativa 2026: https://www.gov.br/saude/pt-br/vacinacao/publicacoes/instrucao-normativa-que-instrui-o-calendario-nacional-de-vacinacao-2026.pdf/view
- IDSA, diretriz diarreias infecciosas: https://www.idsociety.org/practice-guideline/infectious-diarrhea

**Status: EM REVISÃO — atualizações técnicas gravadas, pendente validação clínica integral e visual; não pronto para merge.**


## Correção de hierarquia entre fontes — 22/10/2026

**Pedido do responsável:** não inverter prioridade entre protocolos oficiais brasileiros e diretrizes internacionais ao atualizar as apostilas. Aplicar em todos os dez lotes. Regra registrada também em `apostilas/EDITORIAL_STANDARD.md` (seção de hierarquia clínico-científica).

**Verificação documental específica na diarreia pediátrica:** aberto e examinado o PDF oficial de uma página do MS, `Manejo do Paciente com Diarreia`, atualizado em 10/07/2026. Checados MS/PNI 2026 e tabelas de recomendação OMS 2024 com força e certeza; exceção STEC conferida pela IDSA. Materiais de Drive são comparadores de didática, não fonte prescricional.

### Hierarquia clínica aplicada
1. **MS/SUS vigente, específico, com data**: dose/fluxo no SUS, elegibilidade, vacinação PNI e fármacos segundo cenário; citar documento primário e não portal genérico quando existir cartaz detalhado.
2. **Sociedades brasileiras especializadas:** complementação fundamentada conforme público, metodologia e data, sem revogar automaticamente a regra oficial.
3. **OMS/internacionais:** análise de evidências, alternativas de outros contextos e divergências explícitas; não migrar esquema estrangeiro sem processo de incorporação ou justificativa robusta.
4. **Estudos/revisões científicas:** apoiar explicações e alertas de segurança; avaliar certeza e aplicabilidade.
5. **Google Drive/curso:** comparação editorial, nunca fundamento isolado para dose/algoritmo.

### Alterações efetivamente gravadas na apostila Diarreia Aguda na Infância
- Acrescentada referência nacional visível já na abertura da apostila; a OMS não aparece mais como primeira fonte operacional para condutas no SUS.
- Reordenadas as explicações de disenteria, antibiótico, probióticos e zinco em capítulos, casos e questões, distinguindo **MS 2026** de **OMS 2024** e incluindo exceção **STEC/SHU**.
- Confirmado esquema nacional de zinco: <6 meses ou até 6 meses, conforme cartaz, **10 mg/dia**; maiores de 6 meses a menores de 5 anos, **20 mg/dia**, por 10–14 dias. A sugestão OMS **5 mg/dia** é condicional e não substitui a regra do SUS automaticamente. O material usa literalmente o corte do cartaz “até 6 meses”.
- Conferido Plano B com SRO 50–100 mL/kg em 4–6 h como orientação inicial, mantendo supervisão e reavaliações, e esquema pediátrico para disenteria com comprometimento do estado geral.
- Retirada **seção de pendências de produção** da leitura do estudante, substituída por **quadro didático de mecanismos**; checklist interno foi substituído por **tabela de divergências clínico-científicas**. Bibliografia final ordenada por contexto e autoridade com URLs específicas.
- 23 capítulos estruturais e 12 questões comentadas principais foram preservados; imagens existentes e fila Admin não alteradas.

### Riscos residuais e revisão necessária
- Apesar de diretrizes citadas, ainda falta auditoria de originalidade das questões, revisão clínica especializada de todos os casos e testes visuais desktop/PWA.
- Fonte SBP brasileira específica e comparável não foi aberta para cada subtópico desta apostila; **não atribuir validação integral à SBP**. As doses da discussão foram verificadas diretamente no documento MS vigente.
- O padrão editorial exige que a mesma fonte, versão e ressalva de segurança sejam mantidas no texto principal, tabelas, casos, questões e resumo; a conferência integral continua necessária antes do merge.
- **A atualização não equivale à aprovação final, nem autorizou merge em `main`.**

**Documentos primários:** 
- https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/doencas-diarreicas-agudas/manejo-do-paciente-com-diarreia-avaliacao-do-estado-do-paciente/view
- https://www.gov.br/saude/pt-br/vacinacao/calendario
- https://www.who.int/publications/i/item/9789240103412
- https://www.idsociety.org/practice-guideline/infectious-diarrhea


### Checagem estrutural adicional (22/10/2026)

- Releitura da versão corrigida: JSON válido, **23 seções**, **23 âncoras únicas**, 7 tabelas com largura consistente, 12 blocos de questões e 12 respostas comentadas na seção principal; bibliografia permanece como último capítulo.
- Estimativa instrumental atual de ~**65.920 caracteres textuais**, incluindo títulos, tabelas e referências; **não satisfaz por si só a contagem oficial >=60.000 caracteres úteis**, que exclui referências, título e redundância.
- Após novos commits em `main`, a branch de revisão ficou **16 commits atrás**; duas páginas `index.html` (diarreia e perfuração) também foram alteradas em `main`. **Não fazer merge automático sem reconciliar os dois HTML e testar o PWA**. O repositório de produção e a `main` não foram alterados por esta auditoria.


## Execução científica e editorial — Arritmias e Fibrilação Atrial (22/10/2026)

**Alvo:** `apostilas/arritmias-fibrilacao-atrial/content.json` e piloto local `index.html`. Material de comparação realmente reaberto no Drive: **02 - TAQUIARRITMIA .pdf**; traz taxonomia de QRS/ECG e exemplos de circuitos de reentrada, mas não foi usado como fonte de doses, anticoagulação ou energia atual. O texto LURIA foi confrontado com documentos primários por tema.

### Hierarquia de fontes adotada nesta apostila

- **Referência principal brasileira da FA:** Sociedade Brasileira de Cardiologia / Sociedade Brasileira de Arritmias Cardíacas, **Diretriz Brasileira de Fibrilação Atrial — 2025**, especialmente Quadro 5 (risco/anticoagulação), Tabela 8 (doses ACOD) e Quadro 7 (anticoagulação na cardioversão). https://www.scielo.br/j/abc/a/jWrKHyPRYYh7dXZR94nJcGp/?lang=pt ; DOI 10.36660/abc.20250618.
- **Bradiarritmias e estimulação:** Diretriz Brasileira de Dispositivos Cardíacos Eletrônicos Implantáveis — 2023. https://abccardiol.org/article/diretriz-brasileira-de-dispositivos-cardiacos-eletronicos-implantaveis-2023/
- **Ressuscitação e choques:** quando se necessita algoritmo de urgência e energia, protocolo do serviço + **AHA ACLS 2025**, cuja especificidade é ressuscitação e não decisões de anticoagulação crônica. https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/algorithms
- **Complemento/comparação:** ESC/EACTS 2024 https://academic.oup.com/eurheartj/article/45/36/3314/7738779 e ACC/AHA/ACCP/HRS 2023 https://pmc.ncbi.nlm.nih.gov/articles/PMC11095842/ . Os intervalos temporais de cardioversão exigem distinguir fontes, não fundir 24h e 48h.

### Modificações gravadas na branch de revisão

1. **Ponto de entrada:** incluído “Em 30 segundos” e a explicação da fonte principal brasileira, AHA 2025 para emergências e documentos internacionais só para complementação/diferenças.
2. **Anticoagulação:** reescrita a aplicação brasileira do **CHA₂DS₂-VA = 0/1/≥2**, indicando classe I/IIa, exceções e que HAS-BLED não proíbe automaticamente anticoagular.
3. **DOACs/ACOD:** doses de apixabana, rivaroxabana, edoxabana e dabigatrana e seus critérios confrontados com a **Tabela 8 SBC/SOBRAC 2025**; retificada a distinção de que dabigatrana 110 mg 2x/dia foi uma **dose reduzida estudada**, não um ajuste compulsório igual ao gatilho “dois de três critérios” da apixabana. Tabela didática alinhada à explicação.
4. **Cardioversão:** destacado primeiro o **Quadro 7 brasileiro**: na FA estável de duração >24h/início incerto, ≥3 semanas de anticoagulação OU ETE com proteção periprocedimento; **≥4 semanas após cardioversão** em todos conforme diretriz SBC/SOBRAC, mantendo cronicamente conforme escore. Exceção: instabilidade atribuível à arritmia, sem aguardar três semanas. ESC 2024 e ACC/AHA 2023 aparecem como fontes comparativas identificadas, não esquemas intercambiáveis.
5. **ACLS:** energia de choque por ritmo em adulto atribuída ao **AHA 2025** (FA/flutter 200 J, regular estreita/TV monomórfica 100 J; TV polimórfica não sincronizada). Não atribuir esta dose ao documento brasileiro de anticoagulação; verificar equipamento, protocolo e sinais de instabilidade.
6. **Quadro visual novo:** **“Mapa de decisões — primeiro perfusão, depois morfologia”**, cinco cenários (sem pulso, com instabilidade, QRS estreito regular, QRS largo regular e QRS largo irregular/preexcitação). A tabela é elemento de leitura nativo compatível com o renderer, sem imagens privadas.
7. **Questões:** antes havia 24 perguntas compactadas numa única lista densa. Agora há **24 enunciados, 96 alternativas, 24 respostas comentadas**, em blocos com subtítulos e “Pulo do Gato”; nenhuma atribuição a provas reais. O conjunto segue em validação de qualidade e originalidade humana.
8. **Referências:** ordenadas por prioridade: SBC/SOBRAC, diretriz nacional de dispositivos, síntese SOCESP, AHA específica de ressuscitação, ESC e ACC/AHA para comparações. Removidas do corpo estudantil observações editoriais sobre benchmarks.
9. **Acessibilidade e leitura:** piloto CSS **apenas** no `index.html` desta apostila: fonte corpo 15px, navegação 12,2px, tabela 13,6px, respiros e rolagem horizontal de tabela em telas pequenas; não alterado CSS global.

### Verificações realizadas

- JSON serializado, gravado e relido pelo conector GitHub; **15 seções com 15 âncoras de índice**, **15 tabelas** com número de colunas consistente, 24 perguntas, 96 alternativas e 24 respostas comentadas. Renderer global verificado com suporte aos tipos de bloco `t`, `o`, `u`.
- Triagem de caracteres didáticos por extração aproximada nesta rodada: **~109.633 no corpo de conteúdo**, sem contabilizar títulos e lista de referências, mas com listas/tabelas; não substitui auditoria oficial de 60.000 caracteres únicos.
- **Não se executou renderização visual desktop/PWA, teste de acessibilidade assistiva, execução da auditoria oficial de 60k, conferência de TODAS as doses/indicações ou aprovação de imagens**. O conteúdo ainda não está clinicamente liberado.
- **Não foi feito merge para `main`**. Manter branch/PR #77 em rascunho. A `main` prossegue recebendo alterações independentes; conciliar qualquer conflito antes da publicação.

### Revisão restante desta apostila

- Validar farmacoterapia com cardiologista/eletrofisiologista, sobretudo antiarrítmicos, FA pré-excitada, DRC avançada, gestação e anticoagulação com múltiplas comorbidades;
- Avaliar repetição em capítulos extensos, redação e correção alternativa por alternativa das questões;
- Conferir imagens realmente aprovadas e renders em desktop/celular/PWA; não importar automaticamente imagens do Drive;
- Verificar se a orientação oficial institucional de atendimento diverge dos algoritmos internacionais de emergência e anotar a diferença com versão e data.

**Status: revisão substantiva iniciada, não aprovada.**



## Execução científica e editorial — Câncer de Endométrio (22/10/2026)

**Arquivos alterados:** `apostilas/cancer-de-endometrio/content.json` e `apostilas/cancer-de-endometrio/index.html`, exclusivamente na branch de auditoria. Material de comparação aberto e efetivamente lido no Drive: **02 - CANCER DE ENDOMETRIO.pdf**. O resumo apresenta condutas históricas (p.ex. linfadenectomia sistemática e classificação tipo I/II) e uma ordenação equivocada de prognóstico molecular; **nenhum texto, diagrama, tabela ou imagem do PDF foi reutilizado**. Material comparativo ≠ autoridade clínica.

### Hierarquia das fontes realmente aplicada

1. **INCA/MS**: câncer do corpo do útero (rastreamento populacional não recomendado; diagnóstico do sangramento sintomático), Manual de Atenção às Mulheres na Transição Menopausal e Menopausa (MS, 2026).
2. **FEBRASGO, Protocolo 31, Femina 2025;53(6):841–847**: diagnóstico/histologia de hiperplasia; reconhecida **divergência interna** entre corpo do artigo (valorização de biópsia quando há suspeita) e recomendações finais (episódio único de baixo risco, endométrio regular menor que 4 mm, biópsia na recorrência).
3. **Sociedade Brasileira de Patologia, manual 2026**: classificação anatomopatológica, biomarcadores e FIGO 2023.
4. **Sociedade Brasileira de Oncologia Clínica (SBOC), diretrizes de 2026 — Endométrio**: tratamento oncológico no Brasil, critérios de evidência e realidade de acesso. **As linhas/doses oncológicas específicas ainda exigem conferência da diretriz integral e liberação especializada antes de prescrição.**
5. **FIGO 2023, ESGO–ESTRO–ESP 2025, ACOG 2026 e consenso Lynch ESGO 2026 / GeneReviews**: estadiamento, aprofundamento terapêutico, atualização de sangramento e genética; apresentados como comparadores ou fontes de especialidade quando não há norma brasileira equivalente, sem incorporação automática.

### Achados clínicos relevantes e correções gravadas

- **Sangramento pós-menopausa:** o documento anterior colocava ACOG 2026 no título e primeiro plano da prática brasileira. Reordenado para INCA/MS/FEBRASGO, com distinção explícita do limiar ultrassonográfico de 4 mm, necessidade de histologia em sangramento recorrente, lesão focal, amostragem insuficiente ou risco elevado, e exceção ACOG 2026 para seleção estrita.
- **FIGO 2023:** reexplicados IA1–IA3, IB/IC, II e III, a separação **IVB (peritônio extrapélvico) versus IVC (sítios distantes)**, critérios de POLE patogênico / p53abn e a diferença entre estádio e tratamento. Removida ideia de que todo p53abn eleva automaticamente a estádio avançado e obriga quimiorradioterapia.
- **Estadiamento e linfonodo sentinela:** retirada afirmação de que todo câncer exige estadiamento “estritamente cirúrgico” com avaliação pélvica e para-aórtica extensiva. Técnica sentinela com ICG apresentada como opção orientada por risco, mapeamento, protocolo e experiência, não padrão universal de sobrevida idêntica.
- **Fertilidade:** critérios de histologia/endometrioide de baixo grau, ausência de invasão e monitorização destacados; retiradas exigências uniformes de PET-CT, RP 50–80%, prazo rígido de falha e ooforectomia bilateral inevitável para todas as jovens.
- **Sistêmico:** corrigido erro de classificação dos estudos KEYNOTE-158 / GARNET como ensaios fase III; combinações e imunoterapia inseridas em cenários apropriados por MMR/linhas, sem prometer disponibilidade ou dose uniforme. Destacada separação entre marcador prognóstico e preditivo.
- **Radioterapia:** substituídas indicações obrigatórias por estádio e percentuais universais por discussão de risco clínico-molecular, radioterapia vaginal/pélvica e tratamento sistêmico conforme benefício e toxicidade.
- **Lynch:** MMR IHQ em amostra diagnóstica quando disponível; investigar metilação MLH1 em padrão de perda correspondente; risco por gene, aconselhamento e testagem em cascata. Retirada recomendação rígida de **US transvaginal + CA-125 anual** como rastreamento eficaz. Biópsia endometrial periódica é opção discutida, sem evidência robusta de benefício em mortalidade. Cirurgia redutora e ooforectomia individualizadas.
- **Rastreio populacional:** explicitada distinção entre não rastrear assintomáticas de risco habitual e investigar sinais/sintomas.

### Mudanças editoriais e visuais

- Removidas da **página de leitura** três seções internas: auditoria/Drive (“etapa zero”), grade de imagens candidatas e checklist de aprovação. Mantidas como tarefas no relatório de auditoria; não confundir conteúdo de aluno com documentação de produção.
- Referências reorganizadas para o **fim do livro**, ordenadas por INCA, MS, FEBRASGO, Patologia brasileira, SBOC e diretrizes internacionais. Índice/âncoras preservados após reordenação de capítulos por assunto.
- Refeitos títulos que não correspondiam ao conteúdo; criado fechamento **“O que não posso esquecer”** com decisões práticas.
- Acrescentados quadros autorais em formato de tabela para: triagem de sangramento pós-menopausa; estádio FIGO 2023; decisão de adjuvância; seleção sistêmica por biomarcadores; aconselhamento Lynch; três fluxos de diagnóstico, carcinoma confirmado e preservação de fertilidade.
- 12 questões antes embutidas em parágrafos foram convertidas para **12 enunciados, 48 alternativas e 12 comentários**, com subtítulos próprios; sem atribuição de provas reais.
- CSS de fonte/nav/tabelas ampliado **somente neste index.html** como piloto de legibilidade, com rolagem horizontal em tabelas no PWA. CSS global não alterado e render real não testado.

### Testes estruturais executados e limitações

- JSON serializado, parse válido e releitura pós-commit. **26 capítulos com 26 âncoras únicas**, **15 tabelas** com colunas consistentes, **12 questões, 48 alternativas e 12 respostas**, bibliografia por último. Ausentes nas seções do estudante as notas de auditoria e fila editorial de imagens.
- Estimativa heurística nesta rodada: **aproximadamente 67.413 caracteres textuais em parágrafos/listas/tabelas, excluídas referências e títulos principais**. É cálculo aproximado com pontuação de serialização residual, **não prova definitiva do limiar de 60.000 caracteres úteis não repetitivos**. Exige script editorial definitivo e revisão humana de redundância.
- **Pendente:** validação oncológica integral (biomarcadores, esquemas, doses e riscos), verificação final de todas as fontes e disponibilidade no Brasil, teste visual desktop/PWA, acessibilidade, revisão de originalidade das 12 questões, licenças e fila de aprovação de figuras, pipeline e compatibilidade com alterações recentes da main.
- **Nenhuma imagem de terceiro inserida ou aprovada; nada publicado, nenhuma modificação na main.**

### Fila de candidatas visuais — planejamento, não imagens aprovadas

Priorização para curadoria com fonte primária, arquivo original, licença, legenda e aprovação no Admin, visando cerca de 20 recursos quando didaticamente adequados:
1. US transvaginal normal com medida de eco;
2. US de endométrio heterogêneo com medida;
3. Pólipo em histerossonografia;
4. Histeroscopia de pólipo;
5. Histeroscopia de lesão endometrial suspeita;
6. HE sem atipias em histologia;
7. EIN/hiperplasia atípica em histologia;
8. Carcinoma endometrioide G1 na patologia;
9. Carcinoma seroso na patologia;
10. IHQ p53 aberrante com controle;
11. IHQ MMR com controles internos;
12. Esquema autoral do fluxo MMR → MLH1/metilação → genética;
13. RM pélvica de invasão superficial;
14. RM pélvica de invasão profunda;
15. Diagrama autoral FIGO 2023 IA/IB/IC;
16. Diagrama autoral FIGO II/III/IV;
17. Esquema de linfonodo sentinela pélvico;
18. Árvore de decisão de adjuvância por perfil;
19. Mapa clínico Lynch gene-específico;
20. Esquema da diferença entre braquiterapia vaginal e teleterapia.

**Nunca usar fotografias clínicas nem imagens de material comparador sem autoria/licença comercial verificadas. Nenhuma candidata acima foi licenciada ou inserida nesta rodada.**

### Referências principais consultadas

- INCA: https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/corpo-do-utero/versao-para-profissionais-de-saude
- FEBRASGO/Femina 2025: https://femina.org.br/article/hiperplasia-endometrial/
- Sociedade Brasileira de Patologia 2026: https://www.sbp.org.br/manual-2026/carcinomas-do-endometrio/
- SBOC Diretrizes 2026: https://imunotox.sboc.org.br/diretrizes-publicas-categorias/2026/
- FIGO 2023: https://pmc.ncbi.nlm.nih.gov/articles/PMC10482588/
- ACOG 2026: https://doi.org/10.1097/AOG.0000000000006275
- ESGO 2025: https://pubmed.ncbi.nlm.nih.gov/40744042/
- Consenso ESGO Lynch 2026: https://doi.org/10.1016/j.ejca.2026.116739
- GeneReviews Lynch: https://www.ncbi.nlm.nih.gov/books/NBK1211/

**Status: EM REVISÃO. Correções substantivas concluídas nesta rodada, aprovação clínica/editorial final e QA visual pendentes.**

