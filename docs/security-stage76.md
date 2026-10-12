# Etapa 7.6 — Simulador de Emergência

## Diagnóstico e correções

- **FA instável:** reproduzida nota 0 após a cardioversão correta. O caso registra `cardioversion`, enquanto a janela crítica procura `sync_cardioversion`. Declarada essa equivalência no JSON local usando o contrato existente `equivalent_to`. O controle compartilhado sincronizado resolve para a ação cadastrada, preservando efeitos, variantes, requisitos e duração de 0,5 minuto. Ações não sincronizadas continuam distintas. Prazo de 2 minutos e condição fatal `elapsed >= deadline` preservados.
- **FV:** nenhum cadastro, requisito, efeito ou fluxo clínico alterado. O teste antigo tentava selecionar `pads`, `ivio` e `rosc`, ausentes do catálogo renderizado, e pressupunha 100. O controle real `defibrillate` tenta o próximo choque; no contrato local, `shock1` continua bloqueado por `pads`. O fluxo reproduzido registra somente RCP, causas reversíveis, diagnóstico e destino: 35 + 15 + 15 + 2 de crédito, menos cinco bloqueios de sequência de 2 pontos = 57. O teste verifica catálogo, ações registradas, bloqueios, bônus, ausência de ROSC e composição da nota; não apenas o número. Outro fluxo encerra sem seleções artificiais e sem esses bloqueios, com crédito parcial. Isso caracteriza o comportamento existente, sem afirmar que um protocolo incompleto seja clinicamente ideal ou validar novos requisitos.
- **Diagnóstico:** bônus excedentes eram descontados junto às penalidades antes do teto, apagando o erro. Agora `raw = min(100, earned) - penalties`, com o arredondamento existente. Preservados créditos de 70/15/15, bônus de 2 por evento benéfico, penalidade diagnóstica de 4 do catálogo, magnitudes cadastradas, penalidade temporal, morte e limites 0–100. Não há segunda cobrança do mesmo erro. O fluxo que erra e depois corrige o diagnóstico termina em 96. Reconhecimento de hipóteses aceitas e exigência existente de diagnóstico para finalizar não foram modificados; não foi inventada uma lista de alternativas aceitas.
- **Sepse:** a lista fixa da janela não reconhecia `antibiotic`/`amp_sulbactam` e incluía vancomicina, não equivalente no caso local. Quando o caso declara `antibiotic`, a janela consulta esse identificador pelo mecanismo de equivalências já existente. Nenhum fármaco, dose ou equivalência foi acrescentado. Casos sem esse contrato conservam os identificadores anteriores. A duração cadastrada de 1 minuto e a janela crítica existente de 10 minutos foram preservadas: conclusão em 9,5 é aceita; em 10 ou 10,25, `>=` torna o atraso fatal antes de registrar a ação. Eventos registram o tempo de conclusão em minutos, e a sessão mantém segundos e minutos inteiros como antes. A deterioração posterior cadastrada em 15 minutos não foi confundida com o prazo crítico nem alterada.

## Verificações

- Linha de base: FA 0, FV 57 frente à expectativa antiga de 100 e diagnóstico errado compensado até 100; sepse exigiu testes adicionais cruzando o prazo.
- `node --test --test-isolation=none --test-reporter=tap tests/plantao-flow.test.cjs tests/plantao.test.cjs`: 27 testes/subtestes aprovados, nenhuma falha restante.
- Cobertura: quatro casos, contratos dos 213 IDs, grupos de ações, drawer e encerramento, persistência sintética inteira, duas entradas para cardioversão sem crédito duplicado, choques inadequados, prazo da FA, dois antibióticos equivalentes antes/no limite/depois do prazo, evento cronológico, intervenção não equivalente, ausência de antibiótico, penalidades com muitos bônus, diagnóstico aceito/ausente e morte.
- HTML e scripts reais do simulador executados em jsdom com RPC/sessões sintéticos; erros de execução/console capturados e ausentes nos fluxos testados. Snapshots de persistência são copiados, evitando que ações posteriores alterem evidências anteriores do fixture. Não houve validação em Chromium ou backend real nesta etapa; monitor gráfico e shell completo não são exercitados pelo fixture.
- `node --check` nos cinco arquivos JS/CJS alterados; JSON carregado pelos testes; `git diff --check` e revisão do diff. Nenhuma suíte fora do simulador executada.

## Arquivos

- `assets/js/plantao-engine.js`
- `assets/js/plantao.js`
- `data/plantao-cases-v2.json`
- `tests/plantao.test.cjs`
- `tests/plantao-flow.test.cjs`
- `tests/fixtures/plantao.cjs`
- `docs/security-stage76.md`

## Casos publicados e limites

O frontend carrega metadados por `list_active_clinical_case_summaries` e ações completas por `get_active_clinical_case` (ou leitura direta quando aplicável); não busca este JSON como atualização dos casos publicados. Não foi consultado nem modificado o backend real. A equivalência da cardioversão precisa estar presente no JSON de ações publicado para obter o mesmo resultado; o novo campo reutiliza contrato existente, sem mudança de schema. A presença de `antibiotic` e de suas equivalências também precisa ser conferida nos casos publicados. Definições diferentes conservam suas próprias condições e não foram generalizadas a partir destes quatro casos.

Não houve publicação, migração, commit, push, merge ou deploy. Nenhuma nova decisão clínica foi necessária para estas correções locais; medicamentos, doses, fronteiras temporais e severidades não foram inventados. A divergência entre requisitos locais de FV e o catálogo fica documentada, preservada conforme a orientação de não remodelar o cenário para obter 100. Histórico concluído não foi regravado. Etapa 7.7 não iniciada.
