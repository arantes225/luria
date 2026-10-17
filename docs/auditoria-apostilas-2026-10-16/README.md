# Auditoria da biblioteca ampliada — 16/10/2026

A ampliação para atender ao cursinho e ao ENAMED foi preservada: matérias incorporadas em livros existentes e apostilas novas, inclusive nos lotes 10–13.

Começar por:

1. [Ampliação: 280 entradas e 401 módulos do cursinho](MODULOS_CURSO_E_ENAMED.md).
2. [Relatório geral](RELATORIO_GERAL.md).
3. [Cadeia de produção e pendências de integração](CADEIA_DE_PRODUCAO.md).
4. [Status por arquivo da main](status-individual.json) e [por caminho em branches](status-cadeia.json).
5. [Matriz por núcleo, aula e artefato](matriz-ampliacao.json).

Há fichas por núcleo em `nucleos/`, pareceres por arquivo da main em `pareceres/` e rastreamento das versões de branches em `cadeia/`. Sidecars ao lado dos originais apontam para os pareceres, sem alterar o conteúdo científico.

## Alcance real

Foram feitas extração estrutural/bibliográfica, leitura focal de trechos, consultas de fontes discriminadas em `confrontos-cientificos.json`, checagem HTTP, simulação do renderer de imagens, consulta somente leitura ao catálogo/curadoria e comparação dos arquivos servidos com o Git.

Isso não é revisão médica linha a linha de toda a produção. Módulo cadastrado e título de capítulo encontrado não comprovam ensino integral. As fichas mantêm pendentes as verificações que não foram executadas, inclusive licença/fidelidade clínica de cada imagem e inspeção visual desktop/PWA.

## Scripts e dependências

Node.js e dependências do `package-lock.json`. Os scripts datados em `scripts/` extraem evidências, rastreiam branches, conferem o catálogo ampliado, verificam links, geram os relatórios e validam a entrega. As referências de branches e o commit de cada snapshot são registrados nas evidências.

```sh
node scripts/audit-apostilas-individual-20261016.cjs
node scripts/audit-editorial-chain-20261016.cjs
node scripts/audit-expanded-curriculum-20261016.cjs
node scripts/check-apostila-links-20261016.cjs
node scripts/check-apostilas-publicadas-20261016.cjs
node scripts/report-editorial-audit-20261016.cjs
node scripts/verify-editorial-audit-20261016.cjs
```

Os snapshots de catálogo/imagens foram obtidos por leitura autorizada no conector; os scripts não escrevem no banco. Preserve os relatórios desta data antes de atualizar os snapshots. As consultas HTTP usam cache dos resultados registrados na rodada; repetição não deve ser apresentada como nova conferência independente.

Não houve alteração de texto científico, aprovação de imagens, integração de outras branches, merge ou deploy.
