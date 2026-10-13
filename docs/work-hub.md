# Modo Trabalho — central de ferramentas

A página /trabalho/ passa a ser uma central única, com dez ferramentas em três categorias e acesso destacado à PCR. Os resumos estáticos sem dados e as variantes antigas de apresentação foram substituídos; nenhuma rotina de ferramenta foi reconstruída. Preferências antigas de apresentação do painel não interferem na central, sem mudanças na persistência.

## Categorias e rotas

| Categoria | Ferramenta | Rota existente |
| --- | --- | --- |
| Consulta e prescrição | Bulário | /trabalho/bulario/ |
| Consulta e prescrição | Prescrição | /trabalho/prescricao/ |
| Consulta e prescrição | Cola rápida | /trabalho/prontuario-rapido/ |
| Avaliação e apoio clínico | Calculadoras | /trabalho/calculadora/ |
| Avaliação e apoio clínico | Scores | /trabalho/scores/ |
| Avaliação e apoio clínico | Diagnóstico por Sintomas | /trabalho/diagnostico/ |
| Avaliação e apoio clínico | Fluidos e Eletrólitos | /trabalho/fluidos-eletrólitos/ |
| Rotina e acompanhamento | Passômetro | /trabalho/passometro/ |
| Rotina e acompanhamento | Gestor de Plantões | /trabalho/gestor-plantoes/ |
| Rotina e acompanhamento | Histórico de PCR | /trabalho/pcr/historico/ |
| Destaque prioritário | Parada Cardiorrespiratória | /trabalho/pcr/ |

## Navegação e preservação

- As 22 páginas autenticadas do Trabalho optam explicitamente pelo shell sem sidebar. A sidebar permanece oculta e inerte como origem dos links concedidos pelo app existente. Logo, temas, perfil, notificações e troca de ambiente continuam no cabeçalho global. Não há margem lateral reservada.
- Nas ferramentas, o link Central do Trabalho retorna a /trabalho/. A logo também leva à central. Links nativos preservam o histórico do navegador.
- Abrir PCR usa o destino do acesso original. No mobile, retorno e PCR ocupam uma segunda linha do mesmo cabeçalho, com altura reservada no conteúdo e alvos de 44 px; não há botão flutuante sobre formulários.
- Admin e Beta Testers ficam no perfil somente quando seus links originais existem. Nenhuma autorização nova foi implementada.
- O acesso público temporário /trabalho/prontuario/ permanece fora do shell autenticado.
- Não foram alterados conteúdo/dados clínicos, JS das ferramentas, autenticação, Supabase, CSP, Service Worker ou arquivos dos Estudos. A única adaptação compartilhada é condicional no controlador de navegação.

## Arquivos

Modificados:

- assets/js/ui-navigation-v2.js
- assets/js/work-dashboard.js
- assets/css/work-dashboard.css
- trabalho/antimicrobianos/index.html
- trabalho/bulario/index.html
- trabalho/calculadora/index.html
- trabalho/diagnostico/index.html
- trabalho/divisor-plantao/index.html
- trabalho/ecg/index.html
- trabalho/exames/index.html
- trabalho/financeiro/index.html
- trabalho/fluidos-eletrólitos/index.html
- trabalho/gestor-plantoes/index.html
- trabalho/index.html
- trabalho/laboratorio/index.html
- trabalho/passometro/index.html
- trabalho/pcr/executar/index.html
- trabalho/pcr/historico/index.html
- trabalho/pcr/index.html
- trabalho/plantoes/index.html
- trabalho/prescricao/index.html
- trabalho/prontuario-rapido/index.html
- trabalho/protocolos/index.html
- trabalho/receitas/index.html
- trabalho/scores/index.html

Criados:

- assets/css/work-navigation.css
- tests/work-hub.test.cjs
- docs/work-hub.md
- docs/screenshots/work-hub-desktop.png
- docs/screenshots/work-hub-mobile.png

As alterações nos HTML das ferramentas se limitam à carga do CSS de navegação, opt-in do shell e versão do controlador compartilhado. Na Dashboard também foram ajustados título, descrição e versões dos assets específicos.

## Verificações

- 8 testes aprovados: tests/work-hub.test.cjs e tests/ui-final-refinement.test.cjs, com node --test --test-isolation=none. Cobrem rotas reais, navegação desktop/mobile, PCR, perfil com/sem Admin, revogação do link, ausência de duplicação/loop de observer, retomada via pageshow, preferência antiga e navegação de Estudos incluindo o rail instalado.
- node --check nos dois scripts modificados; git diff --check e revisão do diff.
- Comparação das 22 páginas com HEAD: nenhuma alteração na meta CSP ou em scripts inline.
- Chromium local: Dashboard em 1440 × 900, 820 × 1000 e 390 × 844, grades de três/duas/uma coluna, quatro temas, sem overflow horizontal. Cards mobile com 104 px de altura. Foco visível e abertura por Enter conferidos.
- Os dez cards foram clicados e retornaram à central pelo link. Todas essas páginas mostraram sidebar oculta, main sem margem lateral e acesso à PCR no mobile.
- Acesso à PCR pela Dashboard e pela Cola rápida, recarregamento da Cola rápida, botão Voltar, Bulário desktop e troca para Estudos conferidos. A sidebar de Estudos permaneceu visível e seu deslocamento de 264 px foi preservado.
- Console sem erros ou avisos nas navegações verificadas. Evidências de desktop/mobile anexadas.

## Limitações

O navegador utilizou o harness local existente com usuário e respostas Supabase sintéticos, sem registro de Service Worker. Isto não valida autenticação, permissões remotas, persistência real, dados clínicos ou sessões PCR em produção. Não foram iniciados atendimentos, gravados dados reais nem executados testes clínicos. Reduced motion foi implementado em CSS; a preferência do sistema operacional não foi alternada durante a conferência visual.

Sem commit, push, merge ou deploy.
