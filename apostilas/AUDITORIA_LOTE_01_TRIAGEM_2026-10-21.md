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
