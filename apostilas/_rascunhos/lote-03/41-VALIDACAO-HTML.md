# Aula 41 — validação estática preliminar do HTML (14/10/2026)

**Branch:** `editorial/lote-03-auditoria-20261014`  
**HTML editorial:** `apostilas/choque-circulatorio/index.html`  
**Manuscrito de origem:** `apostilas/_rascunhos/lote-03/41-choque-circulatorio.md`  
**Situação:** VISUAL_HTML_PREVIEW / revisão clínica e visual ainda pendentes.

## Auditoria automática desta etapa

| Controle | Resultado |
|---|---|
| HTML criado na branch isolada | Sim |
| HTML recuperado novamente do GitHub | Sim |
| Caracteres do HTML | 115420 |
| Seções principais com identificador `cap-*` | 22 |
| Links internos contabilizados (desktop + mobile) | 46 |
| Âncoras de destino inexistentes | 0 |
| Desequilíbrio de tags estruturais testadas | 0 |
| Casos clínicos no HTML | 8 |
| Questões comentadas no HTML | 12 |
| Tabelas comparativas | 3 |
| `<img>` de fontes clínicas adicionadas | 0 |
| Ferramentas Grifar/Post-it integradas | Sim |
| CSS responsivo para índices e tabelas | Presente |
| Sinalização de material não homologado / noindex | Sim |

**Limitação da conferência:** inspeção sintática/estática não equivale a renderização funcional. Ainda **não foram executados** testes reais em navegador desktop, PWA Android/iOS, tema escuro, ferramentas Grifar/Post-it, navegação assistiva, painel administrativo ou avaliação clínica das doses e condutas.

## Conteúdo preservado e recursos editoriais

- Manuscrito original de ~87 mil caracteres foi convertido integralmente para capítulos e material de referência; a nota de status inicial foi consolidada na apresentação editorial, sem reproduzir falsa informação de conclusão.
- Página com identidade azul LURIA, índice lateral desktop, índice compacto mobile, fórmulas e esquema original de cinco passos, classificação visual de quatro mecanismos de choque.
- Casos mantêm raciocínio, exames, interpretação, condutas e perguntas de discussão.
- Questões permitem revelar gabarito/explicação com `details/summary`, sem dependência de JavaScript externo para essa interação.
- Script original `/assets/js/apostila-tools.js` de anotações/grifos incorporado para manter ferramentas comuns do acervo.
- Nenhuma nova imagem clínica foi inserida no HTML. Os candidatos ainda dependem de fonte/licença, revisão e fila `apostila_image_review_queue` no Admin, sem pré-aprovação automática.

## Pendências antes de publicação/homologação

1. Revisão médico-científica especializada das recomendações SSC 2026, ESICM 2025, ACC/AHA 2025/2026 e doses conforme protocolos brasileiros vigentes.
2. Analisar possíveis inconsistências ou simplificações em cálculos, indicações farmacológicas, rotinas de choque hemorrágico e critérios de reperfusão.
3. Achar dez imagens candidatas reais com licença comercial comprovada quando forem necessárias; aprovar apenas as melhores pelo Admin, gerar WebP e inserir legenda com fonte.
4. Testes visuais com navegador na aplicação real: tema claro/escuro/rosa, viewport desktop/mobile, rolagem lateral de tabelas, sidebar, grifos, post-its e cabeçalho.
5. Verificar carregamento local/offline do PWA e eventuais conflitos entre os scripts do tema e `apostila-tools.js`.
6. Revisão humana da matriz de autossuficiência e gabaritos; só depois alterar status para `HOMOLOGADA`, inserir no catálogo e considerar merge/deploy.

**NÃO houve publicação, merge, deploy, atualização da biblioteca principal ou aceitação de imagens.**
