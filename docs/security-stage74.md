# Etapa 7.4 — CORS e endurecimento da verificação de fontes

Data: 2026-10-11. **CORS corrigido no código disponível; S03 parcialmente mitigado, pendente de proteção do IP efetivamente conectado.** Nenhuma implantação ou configuração remota foi realizada.

## Inventário direcionado

| Função disponível | Uso e acesso observados | Métodos / saída HTTP | Resultado |
| --- | --- | --- | --- |
| `question-factory-perplexity-audit` | Legado Perplexity, apto a chamadas de navegador; nenhum invocador direto atual encontrado no frontend. Exige Authorization e usa cliente publishable com o token do chamador; acesso delegado a RPC administrativa. | POST / OPTIONS; API Perplexity fixa e URLs de fontes dinâmicas. | Helper CORS e verificador compartilhados. |
| `question-factory-perplexity-initial-batch` | Mesmo fluxo legado e vínculo ao token do chamador; execução de jobs administrativos via RPC. | POST / OPTIONS; API Perplexity fixa e URLs de fontes dinâmicas. | Mesmos helpers. |
| `qf-chatgpt-bridge` | Bridge administrativo sem permissão CORS; compatível com cliente de servidor. Exige Bearer e `is_admin_session` antes de criar o cliente service-role. | GET / POST; OPTIONS continua 405. Sem fetch de URLs variáveis. | Sem alteração; exceção testada. |

Há três implementações no diretório. Nenhuma é um endpoint público intencional ou webhook demonstrado pelo código. Não foi confirmado quais funções estão implantadas ou quais clientes externos as invocam. Os documentos Perplexity existentes indicam pipeline legado/desativado; isso não comprova desativação remota.

Autorização preservada: a definição local de `admin_question_factory_next_perplexity_item`, em `db/question_factory_perplexity_auto_audit.sql`, verifica `is_admin_session`. A definição de `admin_start_perplexity_initial_job` não está no SQL disponível: sua autorização implantada e a configuração do gateway/JWT permanecem sem validação. Não foram modificados RPCs, tokens, chaves, autenticação ou permissões.

## CORS

- Origem oficial: `https://www.traubemedicina.com.br`, fornecida na solicitação.
- Origem adicional: **somente** `https://www.resibulando.online`, ainda configurada no `CNAME` e referenciada como workspace administrativo em `assets/js/question-factory-prompts.js`. Sua retirada exige confirmar a aposentadoria desse domínio.
- Não foram acrescentados domínio sem www, subdomínios, GitHub Pages alternativo, homologação ou localhost por conveniência: não foi encontrado um invocador dessas funções que os exija.
- Comparação exata de origem normalizada. Origem desconhecida, malformada ou `null`: 403 sem permissão CORS, antes de executar o handler. Sem Origin: handler original e autenticação original continuam obrigatórios.
- Preflight exige origem permitida, método POST e headers autorizados. Sucesso mantém 200 / `ok`; inválido recebe 403. Respostas variam por Origin; preflight também por método e headers solicitados.
- Headers: `authorization`, `x-client-info`, `apikey`, `content-type`, `x-retry-count`, `traceparent`, `tracestate`, `baggage`. Os quatro últimos preservam o contrato de retry/telemetria do SDK já importado, 2.110.6, conforme a [documentação oficial de CORS do Supabase](https://supabase.com/docs/guides/functions/cors). Sem wildcard ou permissão de cookies.
- Headers funcionais, JSON e códigos dos handlers preservados. O Bridge continua sem CORS; não foi exposto ao navegador pela aplicação de uma política genérica.

## SSRF: correções implementadas

Causa: as duas funções aceitavam URLs do modelo por regex HTTP(S) e seguiam redirecionamentos automaticamente. Uma URL não é confiável por estar em uma resposta da IA.

- Verificador único, sem lista arbitrária de domínios: as fontes HTTPS continuam dinâmicas, conforme orientação expressa do usuário.
- Parser URL/WHATWG, HTTPS na porta padrão 443, sem credenciais, controles ou barras invertidas na autoridade. HTTP e portas alternativas não são aceitos.
- Rejeita localhost, nomes sem domínio, sufixos internos/reservados e IPs literais privados, loopback, link-local, CGNAT, documentação, multicast/reservados e IP de plataforma Azure. Inclui IPv4 decimal/hex/octal normalizado, IPv6, IPv4 mapeado, NAT64 e 6to4. IPv6 é limitado a unicast global com exclusões especiais conservadoras. Referências: registros [IPv4](https://www.iana.org/assignments/iana-ipv4-special-registry) e [IPv6](https://www.iana.org/assignments/iana-ipv6-special-registry) da IANA.
- Redirect manual: cada destino passa pela mesma validação antes do próximo fetch; no máximo três saltos, limite compartilhado com fallback GET, detecção de ciclos e recusa de Location ausente/inválido. Autoridades absolutas são inspecionadas antes de a resolução URL descartar credenciais vazias.
- HEAD com orçamento de 8 segundos para a cadeia; fallback GET apenas em 405/501, com orçamento de 10 segundos. O timeout também limita cancelamento de corpo que fique pendente.
- Apenas User-Agent e, no GET, Range de 4 KiB. Sem Authorization, apikey, cookies ou referrer; não há logging adicional de URLs. Nenhum corpo é consumido pela aplicação: cancelamento imediato, inclusive quando o servidor ignora Range. Isso não garante um teto de bytes nos buffers de rede do runtime.
- Prompts, schemas, normalização de pareceres, importação, API/modelos de IA e significado dos status de alcance foram preservados. A chamada autenticada à API fixa da Perplexity não foi substituída pelo verificador de fontes.

## Limitação e decisão posterior necessária

**SSRF não foi eliminado.** Um hostname sintaticamente público pode resolver diretamente para um IP interno ou mudar de resposta DNS entre resolução e conexão. Isso também vale para o hostname de um redirect permitido. Os controles acima bloqueiam destinos explícitos proibidos, mas não conseguem inspecionar/fixar o endereço realmente usado por `fetch`.

Não foi implementada uma consulta DNS anterior que aparentasse fechar essa lacuna. As opções documentadas de [Deno.createHttpClient](https://docs.deno.com/api/deno/fetch/) tratam certificados/proxies, sem oferecer nas opções consultadas um binding de DNS validado para este fetch; a versão e as capacidades do runtime implantado não foram verificadas. Portanto não se afirma proteção integral da rede Supabase.

Alternativa proposta, **não implementada**: serviço intermediário de verificação com controle de saída. Ele deve resolver e validar todos os A/AAAA/CNAME relevantes, conectar somente ao IP validado mantendo SNI e validação TLS do hostname, revalidar cada redirect e impedir saídas a redes internas/metadados no nível de rede, com timeout e limite de bytes. A Edge Function chamaria somente o endpoint fixo desse serviço, sem repassar tokens administrativos. Isso exige decisão e autorização de infraestrutura/integração posteriores.

A verificação dinâmica não foi desativada. Até existir controle de conexão/egress comprovado, S03 permanece aberto quanto a DNS e rede; não considerar estas funções seguras para URLs arbitrárias apenas por estes testes.

## Arquivos e verificações

Alterados: `supabase/functions/question-factory-perplexity-audit/index.ts` e `supabase/functions/question-factory-perplexity-initial-batch/index.ts`.

Criados: `supabase/functions/_shared/cors.ts`, `supabase/functions/_shared/source-verifier.ts`, `tests/fixtures/edge-functions.cjs`, `tests/edge-security.test.cjs` e este relatório.

- `node --test --test-isolation=none tests/edge-security.test.cjs`: **118 aprovados, zero falhas/skip**. Código real TypeScript executado após remoção de tipos/imports/exports no fixture; apenas runtime Deno, SDK/Supabase e rede simulados. Inclui respostas CORS efetivas, origens maliciosas/null/ausentes, métodos e headers, autenticação/erros/contratos administrativos, Bridge, API fixa Perplexity, normalização real das fontes, IPs/redirects/fallback/cancelamento/timeouts e demonstração explícita da lacuna DNS.
- Parsing dos cinco arquivos TypeScript disponíveis/compartilhados com `stripTypeScriptTypes` e `vm.SourceTextModule`; imports locais conferidos. Os dois arquivos CJS novos passaram em `node --check`.
- Comparação com HEAD confirmou código de prompts, schemas, normalização, autenticação e RPCs intacto nas duas funções, exceto os pontos de integração dos helpers. `git diff` revisado e `git diff --check` aprovado.
- Sem Deno/tsc instalado: sem checagem semântica TypeScript, resolução real JSR ou teste no Edge Runtime. Sem backend real, fontes externas reais ou metadados/nets privadas acessados. Mocks não validam implantação, DNS, egress, chaves ou autorização remota.
- Sem testes clínicos, mudanças de frontend/CSP/Design System/SQL/service worker, instalação de dependências, commit, merge, push ou deploy.
