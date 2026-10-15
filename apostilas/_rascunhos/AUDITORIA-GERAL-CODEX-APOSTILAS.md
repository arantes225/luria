# LURIA — Auditoria geral final obrigatória pelo Codex

**Status:** ESPECIFICAÇÃO REGISTRADA / EXECUTAR SOMENTE DEPOIS DA CONCLUSÃO DOS MANUSCRITOS DE TODOS OS LOTES  
**Responsável pela execução final:** Codex, no repositório GitHub \`arantes225/luria\`.  
**Criado:** 15/10/2026. **Escopo:** TODA a biblioteca de apostilas da LURIA, não apenas o Lote 5.

> **Decisão do proprietário da plataforma:** primeiro completar os manuscritos de todos os lotes, preservando o que já existe; ao final, o **Codex deve executar uma auditoria global cruzada**, corrigir achados com evidência verificável e só então preparar integração em revisão. **Não fazer merge, deploy, publicação ou alterar banco de produção automaticamente.**

## 1. Pré-condições de início

1. Ler integralmente o documento \`lead_apostilas\` / **PROMPT MAGNO LURIA — APOSTILAS MÉDICAS** e tratá-lo como requisito editorial central, não apenas inspiração estilística.
2. Descobrir **todos os lotes, IDs do cronograma, apostilas publicadas, rascunhos, manuscritos em branches editoriais, arquivos HTML, content.json, anexos e referências**. Não presumir que "ausente em pasta de mesmo nome" significa ausência do tema.
3. Confirmar que a produção dos lotes foi concluída ou registrar expressamente **lacunas bloqueadoras** com tema, ID e responsável. Caso haja rascunhos em branches divergentes, **não fazer reset de main nem sobrescrever arquivos de outra frente**. Trabalhar em branch de auditoria derivada da base coordenada mais recente, criar PRs pequenos ou plano de cherry-pick revisado.
4. Carregar \`assets/js/cronograma-base-data.js\` e demais fontes de grade usadas pelo site; cruzar com o inventário mestre. O número **401** de temas já discutido é referência histórica e **não é contagem confiável sem verificar a versão atual**.
5. Identificar temas que propositalmente se complementam: por exemplo rastreamento → diagnóstico → tratamento, ou **hemorragia pós-parto 104 / puerpério 109 / infecção puerperal 114**. **Não deduplicar apagando conteúdo pedagogicamente distinto.**

## 2. Entregáveis obrigatórios do Codex

- \`apostilas/_auditoria-geral/MATRIZ-COBERTURA.csv\` ou JSON: cada tema canônico do cronograma, ID, área, lote, arquivo(s), URL interna, estado, duplicações intencionais, lacunas, publicação e versão científica.
- \`apostilas/_auditoria-geral/ACHADOS.md\`: lista de defeitos classificados P0/P1/P2/P3; **cada achado deve citar ID, arquivo, trecho/linha, por que é incorreto e referência verificável**.
- \`apostilas/_auditoria-geral/RELATORIO-FINAL.md\`: cobertura por área e lote, status de 100% dos IDs, tabela de fontes, melhorias, evidência de testes e bloqueadores restantes. Separar "texto produzido", "cientificamente auditado", "imagem autorizada", "integrado" e "publicado".
- \`apostilas/_auditoria-geral/MAPA-IMAGENS.csv\`: origem, titular/licença, função didática, legenda, texto alternativo, peso, formato, URL/arquivo, direitos de uso e estado.
- \`apostilas/_auditoria-geral/PLANO-CORRECOES.md\`: sequência de PRs separados por lote/risco, responsável e critério de aceite.
- **Correções reais em arquivos**, não só relatório; qualquer alteração clínica crítica requer revisão humana especializada antes de homologação. Manter \`CHANGELOG\` resumido com evidências.

## 3. Cobertura curricular e deduplicação com semântica

Para **cada tema**: verificar existência, nomenclatura LURIA, área correta nas sete áreas adotadas, competências do ENAMED, profundidade comparável à proposta da plataforma e ligação com flashcards/questões. Usar grade LURIA como fonte de verdade, não títulos de terceiros. Aceitar títulos equivalentes, mas exigir **mapeamento rastreável**, para não criar duplicatas quando um tema já aparece em outra aula.

Montar grafo de assuntos: doenças, fatores de risco, diagnóstico, rastreio, conduta e prevenção. Quando houver sequência de apostilas complementares, marcar conteúdo compartilhado mínimo necessário à compreensão e conteúdo exclusivo em cada módulo. Detectar **contradições entre diferentes apostilas** (ex.: limiar de PA, indicações de imagem, duração de antibiótico, vacinação, dose de droga, critérios diagnósticos). Corrigir divergência factual; quando sociedades legítimas divergem, registrar ambas com ano e contexto em vez de escolher uma silenciosamente.

Lote 5 — o inventário de trabalho é \`apostilas/_rascunhos/lote-05-inventario.md\` na branch editorial de origem. **Aulas 093–115**: comparar os 23 IDs; verificar principalmente 094 e 099 já existentes no formato HTML/JSON, 100 (ROC), 104 (HPP), 106 (LRA), 107 (hérnias), 108 (ITU infantil), 109 (puerpério), além de 098, 103, 110–115 que podem ter sido escritos depois deste documento. Não inferir que o inventário antigo permanece atualizado.

## 4. Auditoria científica — cada afirmação de alto risco precisa ser conferida

**Verificação mínima por módulo:**
- Definição, epidemiologia e fisiopatologia corretas, sem taxas absolutas sem população/fonte.
- Diagnósticos diferenciais reais; critérios e testes interpretados conforme método e idade; sensibilidade, especificidade e likelihood ratios usados corretamente quando houver.
- Classificações, limiares, estágios, scores, indicações de exames e imagem, encaminhamento, red flags e contraindicações verificadas contra recomendações **vigentes à data efetiva da auditoria**, priorizando Ministério da Saúde, PCDT, ANVISA e sociedades brasileiras. Quando necessário, comparar diretrizes internacionais reconhecidas.
- Doença em populações especiais: recém-nascidos, crianças, gestantes, puérperas, idosos, doença renal/hepática, imunossupressão e emergências.
- Antibioticoterapia: alvo, agente, espectro, dose, unidades (\`mg/kg/dose\` versus \`mg/kg/dia\`), dose máxima, idade mínima, concentração, intervalo, via, duração, diluição/infusão, função renal, alergias, gestação/lactação, contraindicações e resistência; conciliar com **bulário LURIA** em vez de multiplicar esquemas conflitantes.
- Revisar dados numéricos de risco, prazos, fisiologia, rastreamentos e saúde pública; marcar qualquer evidência estrangeira **não generalizável ao Brasil**.
- **Nenhuma diretriz em consulta/draft** deve ser tratada como atualização final; documentos aposentados/revogados exigem alerta ou substituição.
- Em matérias controversas, documentar *qual* sociedade, ano e nível de recomendação fundamentam cada posição.

**P0 crítico e bloqueador:** dose perigosa, contraindicação ignorada, atraso em sepse, indicação de tratamento invasivo errada, confusão entre estável/instável, uso de guideline retirado como atual, diagnóstico que produz dano, omissão de red flags, imagem clínica com identificação de paciente/uso não autorizado.

**P1 bloqueador clínico:** fluxo com conduta ambígua em emergência, dados desatualizados com impacto terapêutico, intervalo/corte incorreto, ausência de condutas em grupos de alto risco.

**P2 relevante:** baixa clareza, redundância, questão ambígua, referência sem suporte, faltas de casos/visuais, erros de formatação e navegação.

**P3 menor:** estilo, terminologia não crítica, ortografia, redundâncias leves.

**Regra de prova:** uma questão não pode ter duas alternativas defensáveis pela mesma diretriz sem explicitar a fonte; cada uma terá cinco alternativas, gabarito e justificativa de todas, com mini-revisão coerente com o corpo da aula.

## 5. Qualidade editorial premium — não usar contagem de caracteres como selo

Usar meta aproximada de **60 mil caracteres úteis** do Prompt Magno **como sinalizador**, com exceções justificadas por escopo estreito; não inflar artificialmente nem reprovar material muito bom apenas por extensão. Avaliar explicação causal, casos, algoritmos, quadros, legibilidade, precisão, progressão do básico ao avançado e aplicabilidade real. Sinalizar apostilas rasas ou repetitivas.

Em cada apostila exigir, quando couber: introdução, epidemiologia, mecanismos, quadro clínico, critérios diagnósticos, diferenciais, gravidade, tratamento por cenário, seguimento, complicações, população especial, pérolas, ≥4 casos detalhados (preferência 8) e ≥6 questões comentadas (preferência 10). **Contar casos/questões automaticamente ajuda, mas não verifica sua qualidade**; revisão semântica manual adicional é obrigatória.

Também checar nomenclatura, capitalização, acentuação, tabelas com unidades, equações, siglas na primeira menção, referências a capítulos, links internos, marcação Markdown/HTML, títulos e acessibilidade.

## 6. Auditoria de imagens e direitos

1. Mapear ao menos dez imagens candidatas por apostila quando há justificativa didática — **candidata não é imagem licenciada nem inserida**.
2. Priorizar exames médicos reais relevantes (ECG, RX, TC, ultrassom, Doppler, histopatologia, dermatologia) quando visual melhora raciocínio; produzir diagramas autorais para fisiopatologia/fluxos.
3. Exigir proveniência, titularidade, licença para **uso comercial** ou permissão documental; materiais "educacionais", PDFs de terceiros, diretrizes e figuras de artigos **não têm licença comercial implícita**. Obter consentimento adequado para imagens identificáveis.
4. Legendas específicas com achado, interpretação, limitações e fonte; alt text real. Não usar legenda “imagem ilustrativa” quando exame mostra achado decisivo.
5. Otimizar para WebP conforme regras de mídia estabelecidas do projeto: **ECG/exames até 120 KB; outras imagens médicas até 100 KB; decorativas até 80 KB**, ressalvando exceções fundamentadas pela legibilidade que exijam aprovação explícita.
6. Verificar renderização responsiva, zoom de imagem, preservação de resolução de escala e contraste e ausência de imagens duplicadas ou de diagnóstico incorreto.
7. Se licença não for verificável, deixar ausente, registrar bloqueio e procurar substituto autorizado; nunca baixar/copiar para produção apenas porque a URL é pública.

## 7. Integração técnica no site sem regressões

- Mapear como cada conteúdo é apresentado: HTML, JSON, Markdown convertido, cards da biblioteca, busca, cronograma, estudos guiados, sistema de questões, PWA.
- Evitar que uma aula criada como rascunho Markdown seja considerada **publicada** por estar no repositório.
- Confrontar títulos, slugs, IDs, categoria, área, matéria, dificuldade, sequência didática e sinônimos. Não gerar slugs colidentes nem apagar URLs antigas de alunos sem redirecionamento.
- Testes de lint/build, schema/JSON parse, links internos, assets, importações, limites de payload, renderizador matemático e tabelas, desktop/mobile/PWA.
- Verificar que imagens abertas no celular mantêm legibilidade, que scroll e layout seguem padrão LURIA e que não há vazamentos de dados pessoais.
- Auditoria de dependências administrativas: permissões de publicação, acesso de usuários por plano, cache/PWA e versionamento de conteúdo (se aplicável). Não assumir que rascunhos devem entrar automaticamente em banco de produção.
- Checar interligações com flashcards, questões e caderno de erros, sem alterar item autoral de outro módulo a menos que haja justificativa e testes.

## 8. Testes automáticos e manuais a construir/rodar

**Matriz determinística:** IDs únicos, coverage por área, arquivos existentes no commit auditado, correspondência de rotas, títulos/links, duplicações, referências válidas, seção de segurança clínica, número de casos e questões, todos os gabaritos consistentes, alternativas A–E presentes, inexistência de placeholders e imagens não licenciadas publicadas.

**Testes clínicos amostrais:** casos de red flags, faixas etárias, grupos de risco e cálculo de dose; testar decisões divergentes por condição (estável vs séptico, grávida vs não, RN vs escolar) e procurar falsos consensos científicos. Não usar LLM sozinho como certificador de doses: propor conferência por especialista/farmacêutico e anexar evidências.

**Teste de interfaces:** desktop, PWA Android/iOS, tema claro/escuro, tabela larga, zoom de figuras, navegação, busca, links da grade, impressão se oferecida, desempenho e tamanho dos assets. Se ferramenta de UI indisponível, marcar **não testado**, nunca “passou”.

**Teste de regressão:** comparar diff por tema com versão anterior, especialmente HTMLs existentes, e garantir que melhoria editorial não removeu conteúdos já aprovados.

## 9. Processo de correção e entrega do Codex

1. Realizar inventário e relatórios iniciais antes de mudanças.
2. Ordenar P0, P1, P2, P3. Resolver P0 imediatamente na branch de auditoria; não publicar enquanto aberto.
3. Corrigir em PRs por lote/assunto, com referências ao achado e teste repetível.
4. Comparar com código principal e branches editoriais **na data real da auditoria**. Se houver conflito, abrir plano de reconciliação e solicitar revisão humana em vez de escolher versão silenciosamente.
5. Revisar com especialistas quando houver riscos clínicos (pediatria, cirurgia, clínica, GO, preventiva/infecto; farmacêutico para doses e forma farmacêutica).
6. Marcar cada achado como **corrigido/testado, bloqueado, não reproduzido ou pendente de validação humana** com prova.
7. Rodar novamente matriz completa após as correções e documentar regressões.
8. **Somente com aprovação explícita para publicação**, preparar integração, homologação e eventual deploy. Não usar main/deploy direto como método de auditoria.

## 10. Critérios para considerar concluída a auditoria geral

- **100% dos temas do cronograma vigente** possuem cobertura mapeada; ausências explícitas não podem ser chamadas de concluídas.
- **0 pendências P0** (defeitos clínicos críticos) e **0 pendências P1** sem aceitação especializada documentada.
- **100% das imagens publicadas** com licença/autorização verificável, legenda, alt text e peso compatível.
- **100% das doses publicáveis** validadas quanto a unidades, máximos e população; tabelas inseguras devem permanecer bloqueadas.
- **100% das questões exibidas** com gabarito coerente, explicação por alternativa e sem ambiguidade crítica.
- **Todos os testes técnicos executáveis passam** ou bloqueios ficam visíveis na homologação.
- Relatório declara **o que foi testado, quando, com qual versão de guideline e o que não foi testado**.
- Conclusão e liberação **não são equivalentes**: nenhuma publicação sem decisão explícita do responsável e controle de versão.

---

### Comando futuro para o Codex

> Leia o Prompt Magno LURIA e o arquivo \`apostilas/_rascunhos/AUDITORIA-GERAL-CODEX-APOSTILAS.md\`. Confirme que todos os lotes de apostilas foram produzidos. Faça auditoria completa das apostilas do cronograma vigente, incluindo conteúdo já publicado e rascunhos em branches editoriais, sem sobrescrever trabalhos paralelos. Entregue matriz de cobertura, achados P0–P3 com fontes verificáveis, mapa/licenças de imagens, correções em PRs por lote, testes de integração e relatório final. Priorize erros clínicos e prescrição; não faça deploy/merge sem minha aprovação.

**FIM DA ESPECIFICAÇÃO. NÃO EXECUTAR A AUDITORIA GLOBAL ANTES DO FECHAMENTO DE TODOS OS LOTES.**
