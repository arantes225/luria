# LURIA · Lote 13 · Apostila 259
## Sistemas de Informação em Saúde e qualidade dos dados
**Área:** Saúde Coletiva | **Módulo:** Vigilância, epidemiologia aplicada, gestão da informação e saúde digital.  
**Data de redação:** 15/10/2026. **Situação:** MANUSCRITO PARCIAL ORIGINAL, NÃO PUBLICAR. Meta de 60 mil caracteres instrutivos únicos e auditoria clínica/editorial ainda pendentes.  
**Fronteiras:** a #257 aprofunda planejamento e gestão; a #258, avaliação econômica; a #259 explica geração, confiabilidade, interpretação e uso dos dados em sistemas assistenciais e de vigilância.

## Etapa zero — material realmente consultado
Foram abertos e examinados no Drive do projeto os PDFs "Vigilância epidemiológica" (traz quadro resumido de SIM, SINASC, SIH, SIA, SINAN, SI-PNI, SIAB; registro de notificação e declaração de óbito), "SUS" (princípios, descentralização e controle social) e "Estudos Epidemiológicos" (desenhos e medidas). Nenhum traz a atualização suficientemente profunda da transformação digital/Siaps; portanto o benchmark é **parcial**, não é atribuído à editora não confirmada e não aprova encerramento. Foi também analisado o HTML de referência LURIA da apostila de crescimento fetal, para manter organização futura da interface. O texto deste arquivo é original, sem transcrever material do Drive.
**Fontes oficiais de checagem:** DataSUS/Ministério da Saúde, sistemas da MAC, Siaps/e-SUS APS (notas 2025), notificação compulsória (portaria de 2026), legislação de proteção de dados. Não usar tabelas ou imagens de terceiros sem licença e aprovação.

## Objetivos de aprendizagem
- Distinguir **dado, informação, indicador e decisão** e explicar como erros de registro transformam-se em erro de política pública.
- Selecionar fonte adequada para **nascido vivo, óbito, notificação, produção hospitalar, produção ambulatorial, imunização, rede de estabelecimentos e acompanhamento na APS**.
- Entender por que SINAN mede registros notificados e não necessariamente a incidência completa na população.
- Aplicar qualidade de dados: completude, consistência, oportunidade, duplicidade, validade, cobertura e acurácia.
- Distinguir denominador, numerador, subregistro, viés de seleção e inferência causal indevida.
- Identificar instrumentos de interoperabilidade e desafios de saúde digital sem confundir sistemas distintos.
- Reconhecer limites éticos e de privacidade do uso de dados clínicos.
- Resolver casos sobre investigação epidemiológica, mortalidade, cobertura vacinal, internações, APS e base inadequada.

## 1. Por que sistemas de informação são instrumentos clínicos?
Um atendimento gera achados, decisões e registros; milhões desses registros alimentam bases que descrevem adoecimento, nascimento, morte, vacinação e utilização de recursos. O sistema de informação em saúde (SIS) reúne **pessoas, processos, documentos, padrões, infraestrutura e mecanismos de análise**: não é apenas um software. Se a ficha clínica registra diagnóstico errado ou chega atrasada, o problema pode aparecer adiante como falsa tendência epidemiológica, meta não cumprida ou escolha indevida de investimento.

Um **dado** é valor observado (idade, diagnóstico, data). Torna-se **informação** quando recebe definição, verificação e contexto (número de casos novos em determinado território e período). Um **indicador** combina informação com regra reprodutível (taxa de mortalidade infantil por mil nascidos vivos), permitindo monitoramento. Por fim, a **decisão** combina indicador, necessidade e viabilidade: uma taxa alta pode direcionar investigação, mas não demonstra por si só qual intervenção será eficaz.

**Pulo do Gato:** boa decisão não nasce do maior banco, mas da definição correta de variável, população de referência, tempo, cobertura, consistência e método analítico.

## 2. Arquitetura dos sistemas: quem registra e para quê?
### SIM — Sistema de Informações sobre Mortalidade
Baseado em dados da Declaração de Óbito (DO), alimenta estatísticas de mortalidade por causa, idade, território e período. Serve a análises de mortalidade infantil, materna, doenças crônicas, causas externas e desigualdades regionais. É preciso distinguir **local de ocorrência**, **local de residência**, **causa básica** e causas associadas. O município com hospital de referência pode registrar muitos óbitos de não residentes: analisar apenas local de ocorrência distorce risco da população municipal.

A DO é documento médico-legal e epidemiológico; emissão, investigação de causa, codificação CID e circunstâncias de óbitos suspeitos seguem regras específicas. Não presumir que causa imediata ("parada cardiorrespiratória") equivale à causa básica útil para estatística. Investigação de morte materna/infantil pode corrigir classificação e ampliar completude.

### SINASC — Sistema de Informações sobre Nascidos Vivos
Usa informações da Declaração de Nascido Vivo (DNV), incluindo características maternas, pré-natal, parto e recém-nascido. É denominador importante de indicadores como mortalidade infantil e avaliação de prematuridade e baixo peso ao nascer, com limites de cobertura e qualidade. "Nascido vivo" é definição epidemiológica baseada em sinais de vida após completa expulsão/extração, independentemente de duração gestacional; não confundir com óbito fetal.

### SINAN — Sistema de Informação de Agravos de Notificação
Reúne notificações e investigações de doenças, agravos e eventos incluídos nas listas e rotinas aplicáveis. A **notificação de suspeita** pode ser obrigatória antes da confirmação; a investigação atualiza classificação final, local provável de infecção, encerramento e vínculos epidemiológicos. Normas definem periodicidade (imediata/semanal), responsável e fluxo. A lista de notificação é dinâmica: não memorizar relação antiga de PDF como se fosse lei permanente. Em janeiro/2026, a Portaria GM/MS nº 10.175 atualizou a lista nacional; confirmar versão consolidada e normas estaduais/municipais específicas.

**O número de casos no SINAN não é automaticamente incidência real:** dependem de procura por serviço, suspeição, testagem, notificação, processamento, duplicidade e encerramento. Queda abrupta após falta de testes pode ser queda de **detecção**, não de transmissão. Um surto pode ser perceptível inicialmente por sinais indiretos e exige investigação mesmo antes do fechamento de todas as fichas.

### SIH/SUS — Sistema de Informações Hospitalares
Registra hospitalizações processadas no âmbito do SUS com base em Autorizações de Internação Hospitalar (AIH) e informações administrativas/assistenciais associadas. Útil para descrever internações, procedimentos, permanência, valores e diagnósticos nos estabelecimentos cobertos. **Uma AIH não equivale sempre a uma pessoa única**; reinternações, AIHs de continuidade, mudanças de faturamento e regras administrativas exigem análise cautelosa. Não estimar diretamente incidência de doença na população a partir de número bruto de AIHs sem discutir acesso, cobertura e outras fontes.

### SIA/SUS — Sistema de Informações Ambulatoriais
Registra produção ambulatorial do SUS; instrumentos incluem BPA (Boletim de Produção Ambulatorial) e APAC (Autorização de Procedimentos Ambulatoriais) em contextos específicos. Pode informar volume de consultas/procedimentos aprovados, não necessariamente pessoas únicas atendidas ou necessidade populacional atendida. Mudanças em regras de registro podem gerar "crescimento de produção" sem aumento real de atendimentos.

### CNES — Cadastro Nacional de Estabelecimentos de Saúde
Identifica estabelecimentos, equipes, serviços e informações cadastrais, conforme periodicidade e critérios definidos. Útil para mapear capacidade instalada, oferta e composição de rede. Porém cadastro atualizado não equivale a plantão realmente disponível hoje: equipamentos quebrados, profissionais afastados ou agendas fechadas demandam validação local. **CNES descreve estrutura cadastrada**, não garante acesso efetivo.

### SI-PNI e sistemas de imunização
Sistemas de registro de imunização sustentam análise de doses aplicadas, esquemas, cobertura e vigilância, com fluxos que evoluem com plataformas digitais. **Dose aplicada não é sinônimo de pessoa plenamente imunizada**; coberturas precisam definir população-alvo, ano, produto e esquema, com deduplicação e atualizações. Uma cobertura acima de 100% pode decorrer de população estimada menor que real, atendimento de não residentes, migração ou duplicidade — não significa que "mais de 100% da população foi imunizada".

### APS: SIAB histórico, SISAB e Siaps
O **SIAB** pertence a contexto histórico da Atenção Básica e não deve ser ensinado como se fosse a única infraestrutura atual. A estratégia **e-SUS APS**, com registros clínicos/territoriais, modificou captação, interoperabilidade e monitoramento; é necessário diferenciar aplicativos de entrada (por exemplo prontuário eletrônico e coleta) do sistema federal de consolidação e validação.

Em dezembro/2025, o Ministério da Saúde publicou orientações sobre atualização do e-SUS APS e critérios de validação de dados no **Sistema de Informação em Saúde para a Atenção Primária (Siaps)**, encerrando suporte de versões antigas. No período de transição, identificar qual indicador usa qual plataforma, versão, competência e regra de validação antes de comparar séries históricas. **Não dizer que SIAB, SISAB e Siaps são idênticos ou que seus valores são automaticamente comparáveis.**

### RNDS e interoperabilidade
A Rede Nacional de Dados em Saúde busca conectar informações entre sistemas e pontos assistenciais com regras de interoperabilidade e segurança. **Interoperar não significa disponibilizar qualquer prontuário a qualquer profissional**. Exige identificação, autorização, governança, terminologias, rastreabilidade e finalidade assistencial/legal. A interoperabilidade sem padronização pode apenas propagar um erro mais rapidamente.

## 3. Quadro rápido: pergunta certa → fonte inicial
| Pergunta | Fonte preferencial inicial | Limite principal |
| --- | --- | --- |
| Quantas mortes por causa básica e residência? | SIM | atraso/investigação, qualidade de causa básica |
| Quantos nascidos vivos e características do parto? | SINASC | completude da DNV, variação geográfica |
| Quantas notificações de dengue e casos encerrados? | SINAN + fontes específicas do agravo | subnotificação, definição de caso, encerramento |
| Quantas internações SUS por doença? | SIH/SUS | autorizações não são pessoas; não cobre todos os hospitais |
| Quantos procedimentos ambulatoriais registrados no SUS? | SIA/SUS | produção faturada não é necessidade atendida |
| Que serviços/equipes estão cadastrados? | CNES | cadastro não demonstra funcionamento em tempo real |
| Como evoluiu a vacinação por faixa etária? | Bases de imunização vigentes | duplicidade, denominador, doses vs esquema |
| Como estão cadastros/atividades da APS? | e-SUS APS/Siaps conforme competência | atualização, validação, mudanças de versão |
| Onde buscar informações para integrar sistemas? | DataSUS/RNDS conforme acesso autorizado | padrões, proteção e interoperabilidade |

## 4. Da ficha ao indicador: o ciclo de qualidade
**Passo 1 — Definir finalidade e variável.** "Morte evitável" exige classificação e recorte; não basta contar todos os óbitos.  
**Passo 2 — Registrar com precisão.** Identificador, data, endereço, diagnóstico, serviço e desfecho em campos corretos.  
**Passo 3 — Validar.** Regras de preenchimento, intervalos impossíveis, códigos válidos, consistência entre campos.  
**Passo 4 — Deduplicar e vincular.** Um paciente pode aparecer em várias unidades; duplicidade não é repetição clínica legítima.  
**Passo 5 — Consolidar e proteger.** Transferência, acesso mínimo necessário, registro de operações e segurança.  
**Passo 6 — Produzir indicador com denominador adequado.** Sempre declarar população, período, inclusão/exclusão.  
**Passo 7 — Interpretar e agir.** Investigar mudança de cobertura ou regra antes de concluir tendência.  
**Passo 8 — Devolver resultados aos serviços.** Qualificação de dados é cíclica: quem preenche precisa saber para que serve.

### Dimensões da qualidade
- **Completude:** proporção de campos obrigatórios/relevantes preenchidos de forma útil; campo com "ignorado" não significa informação clínica válida.
- **Consistência:** coerência lógica entre campos (por exemplo, data do desfecho não pode anteceder nascimento; estado gestacional não pode ser registrado arbitrariamente).
- **Validade:** valor pertence à categoria/faixa possível; data inválida ou CID incompatível é problema.
- **Oportunidade:** tempo entre evento, notificação, digitação, investigação e disponibilidade; atraso pode inutilizar resposta a surto.
- **Cobertura:** parcela do universo real atingida pelo sistema; excluir hospitais privados de indicador SIH SUS e afirmar incidência nacional é erro.
- **Duplicidade:** repetição do mesmo evento/pessoa sem regra de consolidação.
- **Acurácia:** proximidade entre valor registrado e realidade verificada; uma data formalmente válida pode estar factualmente errada.
- **Confiabilidade/reprodutibilidade:** definição documentada gera resultados consistentes em diferentes análises.

### Denominadores, taxas e proporções
Taxa de mortalidade infantil: óbitos de menores de 1 ano em período/território *divididos por* nascidos vivos do mesmo recorte, multiplicados por 1.000, com ajustes quando protocolo exige. A comparação entre anos depende de estabilidade de capturas, população pequena e investigação de óbitos.

**Taxa de incidência (ou coeficiente de incidência)** aproxima casos novos em população sob risco por tempo; sua forma exata pode ser casos novos/população inicial ou pessoa-tempo, dependendo do desenho. **Prevalência** inclui casos existentes num ponto/período. Contagens de notificações não são sinônimo de casos incidentes confirmados, e internação por doença pode representar doença prevalente ou readmissão.

Em vigilância territorial, taxas com poucos eventos variam muito por acaso; usar períodos agregados, intervalos de confiança e eventualmente suavização geográfica quando adequado, evitando ranking sensacionalista de municípios com denominadores mínimos.

## 5. Viés e confundimento no uso de bancos administrativos
**Subnotificação:** profissionais deixam de notificar, serviços ficam sem insumos ou certas populações têm dificuldade de acesso.  
**Viés de detecção:** teste melhora ou cresce oferta de serviços; casos notificados aumentam sem incremento proporcional da transmissão.  
**Viés de seleção:** SIH representa principalmente internações SUS, não amostra aleatória de todos os doentes.  
**Mudança de definição:** um novo critério de caso transforma série histórica.  
**Confundimento:** município com mais exames registra mais casos e também pode ter piores indicadores socioeconômicos; correlação não define causalidade.

Evitar usar indicador de procedimento para afirmar eficácia terapêutica individual. A maior taxa de colonoscopias pode significar expansão de rastreamento, demanda reprimida, mudança de faturamento ou excesso de indicação. Para inferir desfecho, relacionar exposição e resultado em desenho adequado com variáveis e janela temporal explícitas.

## 6. Vinculação de bancos: possibilidades e riscos
Vincular SIM e SINASC permite estudar mortalidade neonatal associada a características de nascimento, desde que correspondência de identidade/tempo seja válida. Vincular SIH e SIM pode investigar mortalidade após internações, mas faltas de linkage produzem viés. **Record linkage** pode ser determinístico (identificador unívoco confiável) ou probabilístico (nome, data, filiação e outros campos com controles); quanto maior a complexidade, maior a necessidade de governança, autorização, segurança e avaliação de falso pareamento.

**Falso positivo de pareamento:** une pessoas distintas e pode imputar óbito ao indivíduo errado.  
**Falso negativo:** não liga registros verdadeiros e subestima eventos.  
**Qualidade longitudinal:** mudanças de CPF/CNS, transcrição e homônimos requerem regras de limpeza auditáveis.  
**Risco ético:** combinar bancos aumenta capacidade de reidentificação; anonimização tem limites, especialmente em doenças raras e municípios pequenos.

## 7. Privacidade, LGPD e segurança
Informações de saúde são **dados pessoais sensíveis** e demandam hipótese legal, finalidade específica, minimização, adequação, segurança, retenção e transparência. A execução de políticas públicas, tutela da saúde e outras bases previstas na LGPD podem autorizar tratamento em condições definidas; **não é verdade que todo uso em saúde exige consentimento expresso**, nem que a finalidade assistencial permite acesso indiscriminado.

Separar **dado identificado** (uso assistencial autorizado), **pseudonimizado** (identificador substituído, ainda potencialmente reversível), **anonimizado** adequadamente (risco de identificação razoavelmente mitigado) e **agregado** (resumo estatístico, cuja privacidade ainda requer atenção para células pequenas). Controles de acesso por papel, logs, criptografia e plano de incidentes são camadas complementares; nenhuma garante segurança sozinha.

**Exemplo:** gestor apresenta "apenas dois casos" de doença estigmatizante numa aldeia pequena com idade e data exatas. Mesmo sem nomes, pode haver reidentificação; publicar agregados maiores ou suprimir células pequenas conforme política de divulgação.

## 8. Painéis e indicadores: como ler sem cair em armadilhas
Um painel de controle deve mostrar definição, fonte, competência, última atualização, numerador, denominador, desagregações relevantes e eventuais rupturas de série. Variação percentual sem base absoluta pode exagerar relevância: subir de 1 para 2 eventos é 100% de aumento, mas com grande incerteza. Taxa ajustada por idade difere da taxa bruta e pode inverter comparação entre regiões com pirâmides etárias diferentes.

Mapas podem evidenciar vazios assistenciais, mas densidade de postos CNES não mede automaticamente acesso físico (estradas, transporte, horários), qualidade e produção. Não atribuir desempenho de equipe exclusivamente a "número de consultas" sem considerar população, complexidade, qualidade do registro e resultados.

### Alertas para prova
1. **SIM** = mortalidade; **SINASC** = nascidos vivos; **SINAN** = notificação; **SIH/SIA** = produção hospitalar/ambulatorial; **CNES** = estrutura cadastrada.
2. SIAB é **histórico**; e-SUS APS/Siaps requerem regras contemporâneas de validação e comparação de competência.
3. Notificação não espera sempre confirmação laboratorial; prazo varia com evento e portaria.
4. AIH ≠ indivíduo único e procedimento ≠ pessoa beneficiada.
5. Óbitos por local de ocorrência não são iguais a risco do município de residência.
6. "100% cobertura vacinal" depende de denominador e doses/esquema — checar população-alvo.
7. Melhorar qualidade é **corrigir a cadeia inteira**, não apenas limpar planilha no final.

## 9. Fluxogramas autorais
### A. Investigar aumento inesperado de doença notificada
Sinal no painel → conferir definição de caso e período → comparar capacidade de testagem e acesso → auditar duplicidades e datas → estratificar por local de residência/ocorrência, idade e severidade → investigar contexto epidemiológico em campo → comparar indicadores independentes (internação/óbito/laboratório) → comunicar achados e implementar ações proporcionais → monitorar evolução.

### B. Escolher sistema para responder pergunta de gestão
Definir evento (nascimento/óbito/notificação/internação/ambulatória/APS) → identificar universo coberto → selecionar SIS → verificar dicionário de dados e competência → limpar/integrar de forma autorizada → calcular indicador/intervalo de confiança → testar sensibilidade a mudanças de regra → apresentar limitação junto ao resultado → definir ação e reavaliação.

### C. Corrigir ficha incompleta
Erro detectado → verificar gravidade/urgência epidemiológica → retornar à fonte primária documentada com segurança → corrigir campo, preservar trilha de auditoria → revisar se alteração muda classificação/denominador → atualizar painel e serviços → orientar prevenção de recorrência (treinamento, interface, alertas e checagem).

## 10. Casos clínico-epidemiológicos comentados
### Caso 1 — Morte infantil e denominador
Município registrou 12 óbitos de menores de um ano de residentes em um ano e 2.000 nascidos vivos residentes. Pergunta: que indicador calcular?  
**Hipótese/objetivo:** coeficiente de mortalidade infantil. **Raciocínio:** usar numerador e denominador por residência e período comparáveis. **Cálculo:** 12/2.000 × 1.000 = **6 óbitos por mil nascidos vivos**. **Exames/fontes:** SIM e SINASC, após verificar investigação, cobertura e consistência. **Conduta de gestão:** monitorar causas evitáveis, estratificar por componentes neonatal/pós-neonatal e território; não concluir causalidade por um ano de pequena contagem. **Por que importa:** associar fontes corretas e denominador coerente.

### Caso 2 — "Surto" que era mais testagem
Unidade relata aumento de 90 para 150 notificações mensais após ampliar testes rápidos; hospitalizações e positividade diminuíram.  
**Hipótese:** aumento de detecção, mas surto real não está excluído. **Raciocínio:** contagem absoluta aumentou com oferta de teste; acompanhar taxa de positividade, gravidade e distribuição temporal/geográfica antes de concluir transmissão. **Exames/fontes:** SINAN, laboratório, SIH e inquérito de campo conforme necessidade. **Conduta:** validar dados, investigar conglomerados, manter vigilância e comunicação proporcional. **Por que importa:** uma tendência de notificação não é tendência causal automática.

### Caso 3 — Produção SIH versus indivíduos
Gestor afirma que 1.500 AIHs significam 1.500 pacientes distintos com insuficiência cardíaca, usando isso como incidência anual.  
**Problema:** mistura unidade administrativa com pessoa e doença nova. **Raciocínio:** reinternações e continuidade de AIH alteram contagem; nem todos os cuidados ocorrem no SIH, e o CID pode ser secundário. **Exame:** definições AIH, identificadores e regras de deduplicação sob acesso autorizado. **Conduta:** relatar internações por 100 mil habitantes SUS-dependentes com limitações, ou construir estudo de indivíduos/incidência real com método próprio. **Por que importa:** denominador errado leva a planejamento errado.

### Caso 4 — Cobertura vacinal acima de 100%
Cidade informa 108% de cobertura de dose de vacina em menores de um ano.  
**Hipóteses:** migração, atendimento de não residentes, população-alvo estimada defasada, duplicidade ou registro tardio. **Raciocínio:** a porcentagem acima de 100 indica incompatibilidade entre numerador e denominador, não a "imunização de pessoas extras". **Exames/fontes:** registros nominais/doses por residência, população-alvo, competência e regras de deduplicação. **Conduta:** qualificar base e explicar numerador/denominador. **Por que importa:** indicadores administrativos não são fotografia perfeita da população.

### Caso 5 — Mudança de versão na APS
Município observou queda abrupta de cadastros válidos após atualização do sistema de transmissão e novas regras Siaps, sem mudanças visíveis nas equipes.  
**Hipóteses:** falha de envio, incompatibilidade de versão, invalidação por regra nova, problema de cadastro ou queda real. **Raciocínio:** série foi afetada por processo informacional. **Exames:** logs de validação, competências, versões e registros rejeitados, com suporte autorizado. **Conduta:** corrigir fluxo técnico e realizar reconciliação antes de punir equipes por "queda de atendimento". **Por que importa:** mudança tecnológica pode aparentar mudança epidemiológica.

## 11. Questões autorais, com comentário por alternativa
**1.** Para estudar mortalidade infantil por município de residência, a combinação principal é:
A) SINAN + SIA; B) SIM + SINASC; C) SIH + CNES; D) SI-PNI + SIAB; E) APAC + BPA.  
**Gabarito B.** SIM dá óbitos, SINASC nascidos vivos; A registra notificação/produção; C hospitalização/estrutura; D imunização/APS histórica; E produção ambulatorial. **Mini-revisão:** alinhar ano/território por residência.

**2.** Município registrou crescimento de casos notificados após expandir testes. Qual inferência correta?
A) Transmissão necessariamente dobrou. B) Incidência real necessariamente caiu. C) Aumento de detecção pode explicar parte da variação; verificar positividade, gravidade e definição. D) Dados notificados são sempre o universo completo. E) Não se deve investigar.  
**Gabarito C.** A/B não consideram testagem; D assume cobertura integral; E ignora risco; C exige triangulação. **Mini-revisão:** notificação ≠ incidência real.

**3.** Sobre SIH/SUS, assinale a adequada:
A) Cada AIH equivale a caso incidente novo. B) Cobre toda internação privada no país. C) Registra autorizações/produção hospitalar do SUS e não garante pessoas únicas. D) Informa vacinação individual. E) Substitui a DO no registro de morte.  
**Gabarito C.** A ignora reinternação; B excede cobertura; D é imunização; E confunde sistemas. **Mini-revisão:** unidade da base determina inferência possível.

**4.** Cobertura vacinal de 105% pode indicar:
A) Imunidade biológica acima de 100%. B) Denominador inadequado, duplicidade ou vacinação de não residentes. C) Falha obrigatória da vacina. D) Erro ético em vacinar. E) Diagnóstico de epidemia.  
**Gabarito B.** A é impossibilidade interpretativa; C/D/E não são decorrência; B reconhece problema de numerador/denominador. **Mini-revisão:** conferir unidade dose/pessoa, população-alvo e residência.

**5.** Sobre qualidade de dados, a *oportunidade* mede:
A) Percentual de campos vazios. B) Proporção de registros duplicados. C) Tempo entre evento, notificação e disponibilidade da informação. D) Comparação com padrão de verdade. E) Acesso sem autenticação.  
**Gabarito C.** A é completude, B duplicidade, D acurácia, E falha de segurança; C corresponde à oportunidade. **Mini-revisão:** dado correto que chega tarde também pode falhar em vigilância.

**6.** Em 2026, um manual diz que o SIAB é o único sistema de informação da APS. Melhor interpretação:
A) Correto; nenhum sistema novo existe. B) Histórico incompleto: considerar e-SUS APS/Siaps e competência de validação. C) SIAB é o mesmo que SIM. D) Substituir tudo por SINAN. E) Interpretar todas as séries como idênticas.  
**Gabarito B.** A está desatualizada; C/D confundem objetos; E ignora ruptura de séries; B aplica mudanças institucionais. **Mini-revisão:** distinguir estratégia de prontuário/entrada do ambiente de consolidação.

**7.** Uma tabela pública informa dois casos de doença rara em comunidade de 50 habitantes com idade e data exatas. A principal preocupação é:
A) Nenhuma, se não há nome. B) Reidentificação mesmo sem nome e violação de minimização. C) Impossibilidade de usar dados agregados em saúde. D) Dever de revelar prontuários para todos. E) Exclusão de anonimização de políticas públicas.  
**Gabarito B.** A ignora tamanho de célula; C é excessiva; D viola confidencialidade; E mistura base legal com proteção. **Mini-revisão:** divulgação pública precisa preservar privacidade em pequenas células.

## 12. Imagens didáticas candidatas — apenas pauta para Admin
1. Diagrama autoral "atendimento → registro → SIS → indicador → decisão", na introdução.  
2. Mapa conceitual original SIM/SINASC/SINAN/SIH/SIA/CNES, no quadro de fontes.  
3. Formulário fictício de Declaração de Óbito **sem dados reais**, com campos epidemiológicos destacados.  
4. Formulário fictício DNV, demonstrando denominador de nascimentos.  
5. Gráfico original "casos notificados × volume de testes", no capítulo de viés.  
6. Comparação ilustrativa de cobertura >100% com denominador defasado.  
7. Fluxograma de limpeza e deduplicação de registros fictícios.  
8. Mapa coroplético sintético com população pequena e discussão de instabilidade.  
9. Diagrama histórico "SIAB → e-SUS APS / validação Siaps" com datas verificadas.  
10. Quadro visual autoral de privacidade: identificado / pseudonimizado / agregado / anonimizado.

Não selecionar automaticamente imagens privadas ou capturas de plataformas com pacientes. Licença, utilidade, contraste, otimização WebP e avaliação via Admin obrigatórias antes de publicação.

## 13. Referências oficiais verificadas e controle editorial
1. Ministério da Saúde. DataSUS — competências, sistemas e interoperabilidade: https://www.gov.br/saude/pt-br/composicao/seidigi/datasus/datasus
2. Ministério da Saúde. Sistemas de Informação em Saúde da MAC: https://www.gov.br/saude/pt-br/acesso-a-informacao/gestao-do-sus/programacao-regulacao-controle-e-financiamento-da-mac/sistemas-de-informacao-em-saude
3. Ministério da Saúde. Notificação Compulsória e lista atualizada pela Portaria GM/MS 10.175/2026: https://www.gov.br/saude/pt-br/composicao/svsa/notificacao-compulsoria/notificacao-compulsoria/
4. Ministério da Saúde. Normativas para e-SUS APS e validação Siaps, 23/12/2025: https://www.gov.br/saude/pt-br/assuntos/noticias/2025/dezembro/ministerio-da-saude-publica-normativas-que-orientam-atualizacao-do-e-sus-aps-e-reforcam-qualidade-dos-dados-da-atencao-primaria
5. Lei nº 13.709/2018 — LGPD: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
6. Ministério da Saúde. Boletins epidemiológicos e sistemas oficiais — consultar versões pertinentes ao agravo no Portal da Vigilância: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z

### Auditoria honesta desta versão
- **Produzido:** capítulos originais em sequência lógica, 5 casos completos, 7 questões comentadas, matrizes e fluxos, 10 pautas de imagens e fontes atuais.
- **Cobertura forte:** utilidade de SIM/SINASC/SINAN/SIH/SIA/CNES; normas Siaps; qualidade, viés, denominadores, uso/privacidade.
- **Lacunas para ≥60k úteis e autossuficiência:** dicionários completos de variáveis por sistema; fluxo de notificações compulsórias e prazos específicos da lista 2026 por agravo; linkage e dados federados com exemplos em profundidade; análise de sensibilidade e séries temporais; indicadores adicionais (mortalidade materna, letalidade, internação evitável); interoperabilidade FHIR/terminologias; legislação/instituições e segurança; mais exercícios; verificação de licença das dez imagens; revisão por especialista e teste PWA.
- **Etapa zero:** satisfeita **parcialmente** por material de vigilância do Drive lido, sem equivalente completo de saúde digital.
- **Status técnico:** RASCUNHO_PARCIAL_NAO_PUBLICAR. Não converter em HTML, não certificar meta por contagem de Markdown.
