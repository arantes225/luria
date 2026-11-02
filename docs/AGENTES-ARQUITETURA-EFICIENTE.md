# Times de agentes Traube — arquitetura enxuta (2026-11-02)

## Evidência e limites
O inventário de **21 especialistas** foi informado pelo proprietário. As definições que vivem no Claude Cloud não foram acessadas nesta revisão. A branch `main` consultada não tinha `.claude/` nem `CLAUDE.md`. Estes arquivos adicionam *orientação versionada ao Claude Code quando carregada*, mas não alteram automaticamente agentes criados somente no painel da Anthropic. Validar compatibilidade e nomes no ambiente de execução.

## Hierarquia operacional
- Coordenador já existente: recebe a solicitação, classifica risco e complexidade e aloca UM executor primário.
- Gerentes consultivos (Medicina, Engenharia, Visual, Segurança): acionados somente quando cruzam responsabilidades ou há risco especial. Não lançam subagentes nem escrevem código; devolvem plano resumido.
- Especialistas atuais: executam tarefas delimitadas. Revisores independentes aprovam quando aplicável.
- Integração: QA, CI, revisão, autorização e deploy. Nenhum agente isolado pode comprovar sua própria entrega de ponta a ponta.

## Inventário e eliminação de sobreposições
| Time | Especialistas informados | Regra |
| --- | --- | --- |
| Segurança (4) | Banco/RLS; auth/abuso; frontend/supply chain; LGPD/conteúdo | Ativar por superfície de risco; check automático de secrets/deps antes de revisão humana |
| Medicina (6) | Questões; apostilas; flashcards; bulário/protocolos; calculadoras/scores; Leco | Revisão clínica separada da engenharia de Leco; evitar revisão duplicada de conteúdo entre módulos |
| Visual (aprox. 8) | Design educação; design trabalho; visual apostilas; visual jogos; aplicação/teste vocacional; mobile/PWA; acessibilidade; UX/performance | Um proprietário do componente; mobile/acessibilidade/performance fazem revisão transversal **apenas quando impactados** |
| Engenharia (3) | QA/testes; marca/repositório; release/deploy | Não confundir auditoria com implementação; backend/dados/integrações são lacunas a confirmar antes de criar mais agentes |

## Roteamento
1. **Simples**: um especialista ou sessão principal; teste focal. Zero gerentes.
2. **Moderada**: um executor + revisor se necessário. Um gerente somente se houver decisões arquiteturais.
3. **Complexa**: coordenador consulta um ou dois gerentes relevantes, depois delega diretamente aos executores; 1–3 ativos simultâneos preferencialmente.
4. **Crítica**: revisão independente pertinente (medicina/segurança), autorização humana para produção sensível, rollback e evidência. Até 4–5 ativos somente se tarefas forem independentes.

## Economia de tokens
- Não iniciar os 21 especialistas como equipe permanente; definições ficam disponíveis, execução sob demanda.
- Resumos dos agentes: até ~160–180 palavras, incluindo arquivos, evidência, riscos e pendência.
- Modelos dos gerentes: Haiku para triagem visual; Sonnet para engenharia, medicina e segurança. Escalar para modelo mais caro somente se complexidade demonstrar necessidade.
- Limite de iterações sem evidência nova; não repetir análise de todo o site.
- Skills/hooks/scripts para hora, CSS, sintaxe, acessibilidade verificável, cálculos e checks repetitivos.
- Fazer buscas por diretório/arquivo afetado antes de explorar repositório todo.
- Medir consumo real de sessões e subagentes com `/usage` e recalibrar a cada ~20 tarefas. Limites em prompts são orientativos, não teto rígido de faturamento.

## Fluxo mínimo de entrega
Solicitação -> escopo -> branch isolada -> implementação -> testes focais -> revisão por risco -> PR/CI -> aprovação necessária -> deploy -> confirmação de produção.

### Critérios de bloqueio
Sem fontes para mudança clínica de risco; alteração de RLS sem testes de isolamento; CI falhando; incompatibilidade de schema; alteração de dados ou produção sem autorização; ausência de evidência para declarar publicação.

### Política de arquitetura
O coordenador mantém a visão geral. Os gerentes são uma ferramenta de **consulta especializada**, não uma camada obrigatória. Especialistas podem permanecer no Claude Cloud; antes de duplicá-los no repositório, exportar os prompts para uma revisão única e consolidar nomes, ferramentas e permissões.
