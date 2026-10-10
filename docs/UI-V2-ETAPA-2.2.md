# Etapa 2.2 — registro de implementação

## Resultado
- Corrigida a camada de marca antiga em .app-shell::before que aparecia sob os cantos da área principal.
- Rolagem passou aos contêineres do documento nas páginas opt-in v2; mantidos os bloqueios explícitos de menus e diálogos.
- Aprender e Consolidar: retirados os estilos inline antigos e substituídos por layouts naturais, sem sobreposições ou linhas vazias artificiais.
- Cronograma: controles legíveis, resumo compacto e painéis responsivos. A grade mensal usa rolagem horizontal própria no celular para preservar a leitura das atividades.
- Estatísticas: métricas e abas reorganizadas; fontes dos gráficos ampliadas. Trocar o tema repinta os gráficos existentes sem recalcular métricas ou repetir consultas.
- Editais: cabeçalho único, métricas, filtros e formulário reorganizados.
- Amigos: nova hierarquia de comunidade, navegação por âncoras, amigos e materiais recebidos visíveis; controles de StudyRats preservados.
- Simulador: apresentação isolada, biblioteca e controles móveis migrados; restaurado no HTML o estado vazio que o controlador já procurava.

## Arquivos
Novos:
- assets/css/education-pages-v2.css
- assets/css/community-ui-v2.css
- assets/css/plantao-ui-v2.css
- tests/ui-stage22.test.cjs
- docs/UI-V2-ETAPA-2.2.md

Alterados:
- assets/css/education-ui-v2.css
- assets/css/ui-navigation-v2.css
- assets/js/ui-navigation-v2.js
- assets/js/estatisticas.js (apresentação dos gráficos)
- aprender/index.html
- consolidar/index.html
- cronograma/index.html
- estatisticas/index.html e estatisticas.html
- editais/index.html e editais.html
- amigos/index.html e amigos.html
- plantao/sala-emergencia/index.html

## Verificação
- Inspeção no navegador a 1440×900 e 390×844 das sete páginas migradas e do Dashboard de Trabalho.
- Quatro combinações no Simulador; botões principais com contraste medido de 4,66:1 (claro azul), 4,61:1 (claro rosa), 7,21:1 (escuro azul) e 7,72:1 (escuro rosa).
- Estatísticas: abas e gráficos verificados; troca para escuro rosa preservou a aba e repintou os gráficos, sem erros no console observado.
- Verificados mês/semana, formulário de atividade, criação de prova, personalização/desafio/sala e abertura do painel de exames em fixture local.
- Fixture com classe pwa-standalone: rolagem do Cronograma e biblioteca/menu clínico móveis conferidos. Não equivale a teste de instalação real.
- Seis testes existentes direcionados de temas, navegação móvel, diálogos e pontuação clínica passaram.
- Três novos testes passaram: amizade e controles da comunidade, biblioteca vazia e repintura de gráficos sem mudança de dados/novas consultas.
- Sintaxe dos dois JavaScripts alterados e git diff --check sem erros.
- Nenhum ID anterior removido em Amigos (44 na página canônica, 34 no espelho) ou Simulador (137).
- Diff vazio para index.html, Mini-OSCE, LuriaZap, motor/controladores clínicos, casos e cliente Supabase. As páginas protegidas não importam os arquivos v2 modificados.

## Limites e pendências
- Integrações testadas com dados locais simulados; não houve validação de backend real ou de todos os casos clínicos em execução.
- Amigos: convites demonstrativos, sugestões, participação em grupos/salas e materiais de exemplo já não possuíam implementação funcional. Foram preservados como prévias, sem criar integrações ou inventar dados reais. Sua implementação continua pendente.
- Não declarada conformidade integral WCAG. Testes manuais complementares, instalação real e browsers adicionais continuam recomendados.
- Não foi executada a suíte completa nem realizado redesign das ferramentas profissionais.
- Sem commit, push, deploy ou alteração em banco, autenticação, permissões, persistência ou regras clínicas nesta etapa.
