# Study Rats — revisão do cabeçalho em telas estreitas

Branch: codex/social-reference-composition. Checkpoint anterior: 9311536a.

Corrigidos três problemas reais observados a 320 px: prévia do cabeçalho deslocada verticalmente, controles empilhados com altura excessiva e textos de status/modalidade truncados. O conjunto ratinho+acessórios agora é centralizado com uma transformação única. As coordenadas internas e os assets não foram alterados. Controles mobile reorganizados em duas linhas ao lado da prévia; resumo permite quebra de linha. Halo continua somente nas aparências escuras.

Arquivos: assets/css/social-rats.css; versões em amigos.html, amigos/index.html, service-worker.js e tests/social-pwa.test.cjs.

Validação: teste PWA passou, build de homologação concluído e diff sem erros de espaços. Interface real nos quatro temas em 320×800. Centro da composição alinhado ao centro da prévia (diferença medida de 0 px nos dois eixos). Cabeçalho passou de 245 para aproximadamente 221 px. Status, modalidade, prazo e participantes sem corte horizontal, com white-space normal. Pista e classificação conferidas visualmente sem alteração de suas regras. Não trocada seleção nem criados dados de teste.

Evidências: browser-results/rat-layout/mobile-{blue,pink}-{light,dark}.png, mobile-track.png e measurements.json. Não representa validação de todos os acessórios desbloqueáveis ou de aparelhos físicos/PWA instalado.

Homologação: bc8017b4-a7da-4a1c-ae66-1ec8c7fef360. Produção preservada.
