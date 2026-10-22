# Botões e aparência do Alex — 21/10/2026

O padrão de ação principal usa o gradiente dos tokens existentes, texto branco,
raio de 12px e área de toque mínima de 44px. Ações secundárias continuam neutras;
ações destrutivas mantêm sua identificação. Controles de ícone e escolhas clínicas
não foram convertidos indiscriminadamente em botões principais.

## Causas e correções

- Havia um segundo sistema de cores no CSS de revisão, com quatro blocos repetidos
  que forçavam texto e traços de ícones escuros. Removido esse trecho; o padrão
  agora fica na camada `luria-ui-controls` do entrypoint compartilhado.
- Botões de Amigos tinham gradientes azuis literais. Agora usam o mesmo token de
  gradiente das demais ações, inclusive em Grupos, Salas e diálogos.
- O Alex podia priorizar o tema legado sobre as dimensões atuais de aparência e
  identidade. A preferência atual passa a prevalecer; o legado permanece fallback.
  Carcaça, iluminação e painel acompanham claro/escuro e azul/rosa, inclusive após
  minimizar/restaurar. Eventos, integração de IA e persistência não foram alterados.

## Arquivos

| Arquivo | Alteração |
| --- | --- |
| `assets/css/ui-app.css` | Padrão comum de botões, segmentos selecionados, foco e variantes |
| `assets/css/review-fixes-20261020.css` | Remoção dos quatro blocos conflitantes de cores de botões |
| `assets/css/social-friends.css` | Gradientes de Amigos vinculados ao tema |
| `assets/css/social-rooms-design.css` | Gradientes das ações de Salas vinculados ao tema |
| `assets/css/professor-alex-companion.css` | Painel e controles do robô com cores herdadas e áreas de toque consistentes |
| `assets/js/professor-alex-companion.mjs` | Sincronização do painel com a aparência atual e observação da identidade |
| `assets/js/professor-alex-mascot.mjs` | Prioridade correta dos temas e cores da carcaça |
| `tests/alex-mascot-resize.test.cjs` | Regressão dos quatro temas com preferência legada conflitante |
| `tests/alex-companion-theme.test.cjs` | Troca de tema com minimizar/restaurar e limpeza do componente |

## Validação

- **12 testes direcionados aprovados**, abrangendo os dois testes acima e as
  suítes de startup/integração do Alex, UI de atividades da sala, refinamento e
  regressão de interface. Nenhuma suíte clínica completa foi executada.
- JavaScript alterado passou em `node --check`; os quatro CSS menores e a nova
  camada compartilhada passaram no parser CSS disponível. `git diff --check` passou.
- Chromium local: quatro temas, desktop 1440px e mobile 390px. Conferidos botões
  de Amigos, Dashboard, Cronograma, Flashcards, Questões e início de jogo;
  após consolidar os estilos, 40 combinações finais de página/tema/largura em
  Amigos, Cronograma, Flashcards, Questões e Plantão Relâmpago, sem overflow.
- Convite, grupo e sala: abrir/fechar diálogos e cores verificadas. Calculadora:
  abrir, calcular com valores de teste, limpar e fechar; fórmula preservada.
- Robô: quatro ciclos de minimizar/restaurar, um por tema. Canvas e área visual
  permaneceram em 96 × 96 no mobile. Capturas e medidas em
  `.audit-artifacts/ui-controls-themes-20261021/` (artefatos locais ignorados).

Limitação: os fluxos foram conferidos com dados locais sintéticos. O fixture não
fornece o catálogo remoto de questões e registra essa indisponibilidade no console;
não se trata de aprovação do backend ou das integrações reais. Não foi feita
validação visual de todos os estados de todas as páginas do produto.

Sem commit, push, merge, deploy, mudança de CSP, autenticação ou backend.
