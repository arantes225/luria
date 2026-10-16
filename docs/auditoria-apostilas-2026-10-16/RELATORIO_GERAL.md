# Auditoria da cadeia editorial LURIA — 16/10/2026

## Escopo e resultado

A ampliação é intencional: matérias foram incorporadas a apostilas existentes e outras receberam livros novos, incluindo lotes 10–13. A auditoria avalia se cada incorporação foi ensinada de modo coeso, referenciada e levada adiante na cadeia, sem tratar o aumento do catálogo como erro.

A revisão abrange produção em andamento e acervo servido: **26 apostilas HTML, 44 manuscritos/complementos na main e 296 versões adicionais em 36 branches**, distribuídas por 279 caminhos de conteúdo. Versões, arquivos e núcleos temáticos não são a mesma contagem. Base Git: `d7dc563786147a089a71d264247ad899d6e57576`.

Os textos foram processados integralmente para estrutura e referências e tiveram leitura focal de capítulos/trechos; foram feitos confrontos científicos amostrais onde discriminado. **Não foi realizada revisão clínica linha a linha de todas as versões. Não há aprovação médica integral nesta entrega.** Cada arquivo recebe parecer ou ficha da cadeia e ações pendentes, inclusive os ainda não publicados.

## Achados principais

1. **Rastreabilidade da ampliação:** a matriz editorial ampliada examinada organiza 280 entradas: 260 da expansão anterior, 16 novas propostas e quatro cadernos existentes recatalogados. Os 401 módulos do cursinho têm destinos principais cadastrados. A existência do vínculo não comprova que o capítulo já ensine integralmente o módulo; essa verificação orienta as fichas por núcleo.
2. **Produção fora da main:** ignorar branches faria desaparecer 279 caminhos de conteúdo. O piloto do PR #36 continua em rascunho; não deve servir como fila atual de ausentes sem confrontar os lotes posteriores.
3. **Handoff incompleto:** a branch de lote 01 contém 20 arquivos content.json sem index.html correspondente. O conteúdo pode existir e ainda faltar etapa de leitura/integração.
4. **Medida de extensão incompleta:** o auditor 60K atual percorre pastas imediatas e não mede os manuscritos centrais/arquivos de branch. Das 26 apostilas HTML, 16 ficam abaixo do piso e 10 passam apenas na triagem. A pasta _rascunhos não é uma apostila de zero caracteres.
5. **Coesão:** Ciclo Menstrual tem sete H3 malformados; Câncer de Mama repete literalmente uma mini-revisão oito vezes. Diversos cadernos mantêm aprofundamentos após a bibliografia; o parecer individual localiza as correções propostas.
6. **Referências:** foram checados 1989 destinos HTTP; 89 retornaram 404/410 na forma extraída. Bloqueios, timeout e links cortados na extração precisam ser distinguidos de fonte inexistente. A matriz de confrontos identifica o que foi realmente aberto e o que ficou restrito.
7. **Imagens:** 93 registros aprovados e 20 pendentes. 20 apostilas têm imagem embutida não decorativa ou inserção prevista na simulação. Figuras aprovadas podem ser ocultadas, deduplicadas ou não selecionadas pelo renderer; a licença continua exigida. Não foram aprovadas, rejeitadas ou inseridas imagens nesta rodada.
8. **Catálogo não é deploy:** o banco traz 18 registros publicados, mas há fallback local. URLs foram abertas por HTTP e os arquivos servidos comparados por hash quando possível; acesso/autenticação e layout desktop/PWA não foram visualmente certificados.

## Cadeia e verificadores

[Auditoria da ampliação e dos 401 módulos](MODULOS_CURSO_E_ENAMED.md) e [matriz estruturada dos 280 núcleos](matriz-ampliacao.json). Foram localizados artefatos candidatos em 192 núcleos; isso não é taxa de cobertura e não autoriza considerar os demais ausentes sem busca por aliases.

[Mapa completo da cadeia](CADEIA_DE_PRODUCAO.md), [status por arquivo da main](status-individual.json), [status por caminho em branches](status-cadeia.json), [confrontos científicos](confrontos-cientificos.json), [links HTTP](evidencias/links-http.json) e [comparação de arquivos publicados](evidencias/paginas-publicas.json).

Os sidecars junto aos arquivos da main remetem ao parecer correspondente. Para conteúdo de branches, o relatório de cadeia identifica caminho, blob e branches sem modificar esses trabalhos.

## Apostilas e manuscritos na main

Imagens na coluna: **embutidas / aprovadas no banco / pendentes no banco / adicionais na simulação**. Não somar essas quantidades como total de imagens distintas. Caracteres de MD são estimativa estrutural e incluem material editorial.

| Arquivo / parecer | Formato | Caracteres | Imagens E/A/P/S | Publicação no banco |
|---|---|---:|---|---|
| [alteracoes-fisiologicas-da-gestacao](pareceres/alteracoes-fisiologicas-da-gestacao.md) | HTML | 78397 | 0 / 5 / 0 / 4 | Sim |
| [amenorreia](pareceres/amenorreia.md) | HTML | 83025 | 1 / 11 / 0 / 5 | Sim |
| [amniorrexe-prematura](pareceres/amniorrexe-prematura.md) | HTML | 68032 | 0 / 5 / 9 / 4 | Sim |
| [artrites-inflamatorias-doencas-autoimunes--rascunho-editorial-lote09](pareceres/artrites-inflamatorias-doencas-autoimunes--rascunho-editorial-lote09.md) | MD | 116210 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [assistencia-ao-parto](pareceres/assistencia-ao-parto.md) | HTML | 44758 | 3 / 0 / 0 / 0 | Não comprovada por este registro |
| [avaliacao-vitalidade-fetal](pareceres/avaliacao-vitalidade-fetal.md) | HTML | 43695 | 1 / 5 / 0 / 5 | Sim |
| [avc-crises-convulsivas--rascunho-editorial-lote09](pareceres/avc-crises-convulsivas--rascunho-editorial-lote09.md) | MD | 87525 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [cancer-colo-utero-hpv](pareceres/cancer-colo-utero-hpv.md) | HTML | 77994 | 0 / 5 / 0 / 5 | Sim |
| [cancer-de-mama](pareceres/cancer-de-mama.md) | HTML | 127562 | 8 / 0 / 0 / 0 | Não comprovada por este registro |
| [cancer-endometrio--rascunho-editorial-lote09](pareceres/cancer-endometrio--rascunho-editorial-lote09.md) | MD | 95666 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [cervicites-doenca-inflamatoria-pelvica](pareceres/cervicites-doenca-inflamatoria-pelvica.md) | HTML | 49800 | 3 / 6 / 0 / 0 | Sim |
| [ciclo-menstrual-eixo-hho](pareceres/ciclo-menstrual-eixo-hho.md) | HTML | 50764 | 1 / 5 / 0 / 5 | Sim |
| [climaterio-menopausa](pareceres/climaterio-menopausa.md) | HTML | 47498 | 0 / 9 / 0 / 5 | Sim |
| [complicacoes-pos-operatorias--rascunho-editorial-lote09](pareceres/complicacoes-pos-operatorias--rascunho-editorial-lote09.md) | MD | 105659 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [crescimento-intrauterino-reduzido-aumentado](pareceres/crescimento-intrauterino-reduzido-aumentado.md) | HTML | 52421 | 1 / 2 / 1 / 1 | Sim |
| [cuidados-paliativos-comunicacao-mas-noticias--rascunho-editorial-lote09](pareceres/cuidados-paliativos-comunicacao-mas-noticias--rascunho-editorial-lote09.md) | MD | 76039 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [declaracao-obito-indicadores-mortalidade--rascunho-editorial-lote09](pareceres/declaracao-obito-indicadores-mortalidade--rascunho-editorial-lote09.md) | MD | 92385 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [diabetes-mellitus-gestacional](pareceres/diabetes-mellitus-gestacional.md) | HTML | 51996 | 0 / 0 / 0 / 0 | Sim |
| [etica-medica-sigilo-prontuario--rascunho-editorial-lote09](pareceres/etica-medica-sigilo-prontuario--rascunho-editorial-lote09.md) | MD | 83242 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [hemorragias-primeiro-terceiro-trimestre](pareceres/hemorragias-primeiro-terceiro-trimestre.md) | HTML | 53736 | 0 / 5 / 0 / 5 | Sim |
| [hiv-infeccoes-oportunistas--rascunho-editorial-lote09](pareceres/hiv-infeccoes-oportunistas--rascunho-editorial-lote09.md) | MD | 83007 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [inducao-do-trabalho-de-parto](pareceres/inducao-do-trabalho-de-parto.md) | HTML | 31269 | 1 / 0 / 0 / 0 | Sim |
| [infeccoes-gestacao-transmissao-vertical](pareceres/infeccoes-gestacao-transmissao-vertical.md) | HTML | 62229 | 2 / 0 / 0 / 0 | Sim |
| [infeccoes-sexualmente-transmissiveis](pareceres/infeccoes-sexualmente-transmissiveis.md) | HTML | 64415 | 8 / 8 / 10 / 0 | Não comprovada por este registro |
| [infertilidade-conjugal](pareceres/infertilidade-conjugal.md) | HTML | 48987 | 1 / 7 / 0 / 4 | Sim |
| [intoxicacoes-exogenas-infancia--rascunho-editorial-lote09](pareceres/intoxicacoes-exogenas-infancia--rascunho-editorial-lote09.md) | MD | 96314 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-05-093-asma-infancia](pareceres/lote-05-093-asma-infancia.md) | MD | 77419 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-05-096-disturbios-hidroeletroliticos](pareceres/lote-05-096-disturbios-hidroeletroliticos.md) | MD | 94822 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-05-097-pancreatite-aguda](pareceres/lote-05-097-pancreatite-aguda.md) | MD | 67994 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-05-101-disturbios-acido-base](pareceres/lote-05-101-disturbios-acido-base.md) | MD | 70782 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-05-102-obstrucao-intestinal](pareceres/lote-05-102-obstrucao-intestinal.md) | MD | 59755 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-05-104-hemorragia-pos-parto](pareceres/lote-05-104-hemorragia-pos-parto.md) | MD | 85350 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-121-itu-pielonefrite](pareceres/lote-07-aula-121-itu-pielonefrite.md) | MD | 94490 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-122-perfuracao-viscera-oca](pareceres/lote-07-aula-122-perfuracao-viscera-oca.md) | MD | 76489 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-123-febre-sem-sinais-localizatorios](pareceres/lote-07-aula-123-febre-sem-sinais-localizatorios.md) | MD | 75865 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-124-sua-casos-questoes-complemento](pareceres/lote-07-aula-124-sua-casos-questoes-complemento.md) | MD | 16273 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-125-rastreamento-prevencao-quaternaria](pareceres/lote-07-aula-125-rastreamento-prevencao-quaternaria.md) | MD | 62560 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-126-cirrose-complicacoes](pareceres/lote-07-aula-126-cirrose-complicacoes.md) | MD | 90111 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-127-hemorragia-digestiva-alta](pareceres/lote-07-aula-127-hemorragia-digestiva-alta.md) | MD | 76017 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-128-sepse-choque-septico-pediatrico](pareceres/lote-07-aula-128-sepse-choque-septico-pediatrico.md) | MD | 77275 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-129-amenorreia-auditoria-questoes](pareceres/lote-07-aula-129-amenorreia-auditoria-questoes.md) | MD | 12978 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-130-historia-natural-niveis-prevencao](pareceres/lote-07-aula-130-historia-natural-niveis-prevencao.md) | MD | 70787 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-131-hepatites-virais](pareceres/lote-07-aula-131-hepatites-virais.md) | MD | 68649 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-132-hemorragia-digestiva-baixa](pareceres/lote-07-aula-132-hemorragia-digestiva-baixa.md) | MD | 62251 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-133-meningites-encefalites](pareceres/lote-07-aula-133-meningites-encefalites.md) | MD | 77807 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-134-sop-auditoria-questoes](pareceres/lote-07-aula-134-sop-auditoria-questoes.md) | MD | 11426 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-135-imunizacoes-pni-2026](pareceres/lote-07-aula-135-imunizacoes-pni-2026.md) | MD | 79692 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-136-hemorragia-digestiva-integrada](pareceres/lote-07-aula-136-hemorragia-digestiva-integrada.md) | MD | 64924 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-137-drge-hernia-hiatal](pareceres/lote-07-aula-137-drge-hernia-hiatal.md) | MD | 77310 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-138-crises-convulsivas-estado-mal](pareceres/lote-07-aula-138-crises-convulsivas-estado-mal.md) | MD | 73291 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-139-endometriose](pareceres/lote-07-aula-139-endometriose.md) | MD | 74199 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [lote-07-aula-140-saude-crianca-aps](pareceres/lote-07-aula-140-saude-crianca-aps.md) | MD | 74900 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [massas-anexiais-cancer-ovario--rascunho-editorial-lote09](pareceres/massas-anexiais-cancer-ovario--rascunho-editorial-lote09.md) | MD | 95838 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [nodulos-cancer-tireoide--rascunho-editorial-lote09](pareceres/nodulos-cancer-tireoide--rascunho-editorial-lote09.md) | MD | 11415 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [planejamento-reprodutivo-contracepcao](pareceres/planejamento-reprodutivo-contracepcao.md) | HTML | 39065 | 0 / 7 / 0 / 7 | Não comprovada por este registro |
| [pre-natal-baixo-risco](pareceres/pre-natal-baixo-risco.md) | HTML | 70130 | 0 / 0 / 0 / 0 | Sim |
| [principios-oncologia-cirurgica--rascunho-editorial-lote09](pareceres/principios-oncologia-cirurgica--rascunho-editorial-lote09.md) | MD | 91115 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [puberdade-adolescencia--rascunho-editorial-lote09](pareceres/puberdade-adolescencia--rascunho-editorial-lote09.md) | MD | 84910 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [sangramento-uterino-anormal](pareceres/sangramento-uterino-anormal.md) | HTML | 51845 | 1 / 4 / 0 / 2 | Sim |
| [saude-do-trabalhador--rascunho-editorial-lote09](pareceres/saude-do-trabalhador--rascunho-editorial-lote09.md) | MD | 104371 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [sepse-choque-septico--complemento-editorial-02-lote09](pareceres/sepse-choque-septico--complemento-editorial-02-lote09.md) | MD | 12567 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [sepse-choque-septico--rascunho-editorial-lote09](pareceres/sepse-choque-septico--rascunho-editorial-lote09.md) | MD | 12743 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [sexualidade-masculina](pareceres/sexualidade-masculina.md) | HTML | 35007 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [sexualidade](pareceres/sexualidade.md) | HTML | 34134 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [sindrome-ovariana-metabolica-poliendocrina-somp](pareceres/sindrome-ovariana-metabolica-poliendocrina-somp.md) | HTML | 28600 | 1 / 0 / 0 / 0 | Não comprovada por este registro |
| [sindromes-hipertensivas-da-gestacao](pareceres/sindromes-hipertensivas-da-gestacao.md) | HTML | 53270 | 0 / 0 / 0 / 0 | Sim |
| [trabalho-parto-prematuro](pareceres/trabalho-parto-prematuro.md) | HTML | 60374 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [urgencias-pediatricas-suporte-basico-avancado--rascunho-editorial-lote09](pareceres/urgencias-pediatricas-suporte-basico-avancado--rascunho-editorial-lote09.md) | MD | 99426 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [violencia-maus-tratos-criancas-adolescentes--rascunho-editorial-lote09](pareceres/violencia-maus-tratos-criancas-adolescentes--rascunho-editorial-lote09.md) | MD | 64494 | 0 / 0 / 0 / 0 | Não comprovada por este registro |
| [vulvovaginites](pareceres/vulvovaginites.md) | HTML | 69482 | 4 / 9 / 0 / 2 | Sim |

## Ações realizadas e ações que permanecem

Foram criados pareceres, sidecars, fichas da cadeia, evidências e verificadores reproduzíveis. Nenhum conteúdo científico existente foi reescrito; nenhuma imagem teve status alterado; não houve alteração de catálogo, banco, políticas ou deploy.

A fila seguinte deve começar pelos defeitos de estrutura e pelos handoffs que impedem leitura, depois revisão fonte-afirmação por capítulo, reconciliação de versões e integração de um grupo pequeno validado. Cada aprovação requer revisão clínica humana e inspeção visual real.
