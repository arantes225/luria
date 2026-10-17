# Aplicar / Currículo

Implementação local sobre `arantes225/luria`, base `d7dc563786147a089a71d264247ad899d6e57576`.

## Comportamento

- `/aplicar/` reúne o acesso a Editais e ao novo Currículo, sem substituir `/editais/`.
- `/aplicar/curriculo/` oferece cadastro, edição, exclusão e exportação das atividades.
- XML Lattes é processado no dispositivo, com revisão anterior à inclusão e deduplicação por categoria, título e ano. A importação é parcial e informa as categorias suportadas. Não busca currículos públicos por URL e não substitui comprovantes.
- Os dados ficam no localStorage do navegador, separados pelo ID da conta autenticada. Não há sincronização entre dispositivos nem upload de documentos.
- Os cartões de instituições exibem conversão para 0–10, sem ranking de competitividade. O detalhamento conserva os pontos originais e explica os tetos por item, as fontes e as condições.
- O cadastro registra detalhes conferidos para sugerir partes da pontuação da FMUSP: monitoria, IC, publicações adicionais e suporte à vida. Dados insuficientes ou não revisados não geram sugestões. Outros critérios exigem preenchimento explícito.
- A grade permite selecionar as 15 instituições identificadas na referência texto-em-blocos. Duas rubricas oficiais estão transcritas; as outras 13 estão sinalizadas como pendentes e não exibem notas fictícias.

## Fontes conferidas em 16/10/2026

1. FMUSP/FUVEST 2027, áreas básicas e acesso direto: edital COREME/FM nº 02/2026, item 2.4, páginas 31–36. Inclui retificação de 07/10/2026. Soma por item, faixas exclusivas do corpo docente e fator ENAMED com teto final de 100.
   - https://www.fuvest.br/wp-content/uploads/rm2027-edital-02-2026.pdf
   - https://www.fuvest.br/wp-content/uploads/rm2027-retificacao-2026-10-07.pdf
   - https://www.fuvest.br/residencia-medica/2/
2. PSU-MG/AREMG 2027, entrada direta: Anexo 1, publicado na página oficial de anexos. Escala de 13 pontos, com faixas mutuamente exclusivas quando aplicável. A simulação não determina se documentos, períodos ou exceções de autoria serão aceitos pela banca.
   - https://www.aremg.org.br/detalhes-do-processo/anexos-aos-editais-psu-mg-2027/2348
   - https://www.galaxcms.com.br/up_crud_comum/601/Anexo1-AvaliacaoCurricularPadronizadaEntradaDiretaPSUMG2027-20260924112431.pdf

A inspeção autorizada da interface texto-em-blocos orientou a organização dos cartões e os campos necessários. Nenhuma credencial ou informação pessoal dessa conta foi incluída nos arquivos da implementação. Os números apresentados na conta de referência não foram usados como dados da LURIA.

## Ampliação e atualização

`assets/js/curriculo-rubricas.js` mantém as regras independentes por instituição, edição e modalidade. Cada critério tem subitens, pontos unitários, limites, teto e, quando necessário, exclusividade. Grupos são apenas uma organização visual. Faixas não devem ser somadas como se fossem atividades independentes.

Para ativar outra instituição: localizar o edital e todas as retificações; confirmar modalidade e especialidade; transcrever requisitos e tetos; registrar fonte, página e data da conferência; testar valores mínimos, máximos e faixas incompatíveis. Não extrapolar uma regra para todos os programas da mesma banca.

O catálogo inicial de 15 instituições não representa todas as provas nacionais. Ainda faltam a coleta e a validação das demais rubricas, uma rotina de atualização dos editais e persistência no servidor. Não há monitoramento automático em execução.

## Validação

`node --test tests/curriculo.test.cjs` cobre cálculo, tetos, ENAMED, faixas exclusivas, sugestões conservadoras, XML inválido, deduplicação, isolamento por conta, persistência, CRUD e ausência de notas para rubricas pendentes.

`npm run check:syntax` e `npm run check:css` validam scripts e folhas de estilo. As duas novas páginas também passam nos testes individuais de CSP.

A checagem integral do repositório não está verde: há divergências preexistentes nos prompts do Admin, testes antigos de fallback de imagens e service worker, além de cinco páginas existentes fora do inventário CSP. O inventário inclui as duas novas rotas. As falhas alheias ao currículo não foram encobertas.

## Prévia e publicação

A prévia local utiliza a fixture de autenticação já existente nos testes do projeto. Esse servidor de prévia fica fora do código do site e não deve ser publicado. Os arquivos reais das novas páginas continuam carregando a autenticação normal da LURIA.

Não foi feita publicação, migração de banco, push ou alteração da conta texto-em-blocos.
