# Auditoria inicial — conversão integral das Apostilas LURIA para livro-texto (12/10/2026)

## Escopo e situação verificada
- Repositório canônico identificado: \`arantes225/luria\` (antigo \`arantes225/studyos\`).
- **25 cadernos com conteúdo** localizados em \`apostilas/<slug>/index.html\` e/ou \`content.json\`.
- **18 entradas com \`is_published=true\` na tabela \`public.apostilas\` do Supabase**; outras 7 pastas estão no GitHub, mas não constam no catálogo consultado. Isso não prova que estejam indisponíveis por rotas alternativas.
- Banco de curadoria: **91 imagens em \`approved\` e 65 em \`pending\`**, em 12/10/2026. A aprovação não comprova, isoladamente, que a figura esteja sendo renderizada e acessível.
- **Apenas 5 dos 25 arquivos alcançaram 40.000 caracteres na TRIAGEM PRELIMINAR**; mesmo os 5 precisam de medição estrita e revisão científica antes de receber o selo editorial.
- Os valores abaixo estimam texto visível retirando tags, CSS e JavaScript e (nos JSONs) extraindo os blocos; podem incluir elementos de resumo, navegação ou bibliografia. **Não são contagens certificadas de texto didático desenvolvido.** A contagem definitiva será mais estrita; não certificar nenhum caderno apenas pelos números abaixo.

## Inventário por caderno

| Apostila (pasta) | Texto estimado* | Diferença para 40.000* | Registro publicado no catálogo | Imagens aprovadas / pendentes | Estado editorial |
|---|---:|---:|:---:|---:|---|
| alteracoes-fisiologicas-da-gestacao | 19.996 | 20.004 | Sim | 5 / 0 | Expandir profundamente |
| amenorreia | 41.752 | — | Sim | 11 / 0 | Auditar cobertura/qualidade; contagem definitiva pendente |
| amniorrexe-prematura | 24.385 | 15.615 | Sim | 3 / 17 | Expandir; manter 17 pendentes no Admin |
| assistencia-ao-parto | 45.923 | — | Não localizado | 0 / 0 | Auditar conteúdo e curadoria |
| avaliacao-vitalidade-fetal | 26.390 | 13.610 | Sim | 5 / 0 | Expandir |
| cancer-colo-utero-hpv | 28.023 | 11.977 | Sim | 5 / 0 | Expandir; conteúdo em JSON |
| cancer-de-mama | 39.513 | 487 | Não localizado | 0 / 0 | Expandir com densidade real; revisar imagens |
| cervicites-doenca-inflamatoria-pelvica | 33.816 | 6.184 | Sim | 6 / 0 | Expandir |
| ciclo-menstrual-eixo-hho | 29.512 | 10.488 | Sim | 5 / 0 | Expandir |
| climaterio-menopausa | 34.941 | 5.059 | Sim | 9 / 0 | Expandir; conteúdo em JSON |
| crescimento-intrauterino-reduzido-aumentado | 27.503 | 12.497 | Sim | 2 / 8 | Expandir; separar integralmente os dois temas |
| diabetes-mellitus-gestacional | 38.656 | 1.344 | Sim | 0 / 0 | Expandir com densidade real |
| hemorragias-primeiro-terceiro-trimestre | 37.076 | 2.924 | Sim | 5 / 0 | Expandir; diferenciar causas por período |
| inducao-do-trabalho-de-parto | 25.952 | 14.048 | Sim | 0 / 0 | Expandir |
| infeccoes-gestacao-transmissao-vertical | 57.561 | — | Sim | 0 / 0 | Auditar individualmente as infecções e as imagens |
| infeccoes-sexualmente-transmissiveis | 60.709 | — | Não localizado | 8 / 10 | Auditar profundidade por agente; manter pendências |
| infertilidade-conjugal | 36.196 | 3.804 | Sim | 7 / 0 | Expandir |
| planejamento-reprodutivo-contracepcao | 32.940 | 7.060 | Não localizado | 7 / 0 | Expandir; priorizar fotos reais de métodos/dispositivos |
| pre-natal-baixo-risco | 64.531 | — | Sim | 0 / 0 | Auditar se capítulos cobrem condutas por trimestre |
| sangramento-uterino-anormal | 37.064 | 2.936 | Sim | 4 / 0 | Expandir |
| sexualidade | 32.210 | 7.790 | Não localizado | 0 / 20 | Expandir; 20 pendências preservadas |
| sindrome-ovariana-metabolica-poliendocrina-somp | 24.515 | 15.485 | Não localizado | 0 / 0 | Expandir; revisar nomenclatura e critérios |
| sindromes-hipertensivas-da-gestacao | 31.511 | 8.489 | Sim | 0 / 10 | Expandir; 10 pendências preservadas |
| trabalho-parto-prematuro | 38.320 | 1.680 | Não localizado | 0 / 0 | Expandir; conteúdo em JSON |
| vulvovaginites | 30.140 | 9.860 | Sim | 9 / 0 | Expandir com agentes, diagnóstico diferencial e tratamento |

*Estimativas preliminares, não auditadas linha a linha. A diferença é apenas aritmética, **não** um convite a produzir conteúdo repetido. Um caderno pode exigir acréscimo substancialmente maior para ficar realmente completo.*

## Checklist de migração por pasta
1. Ler integralmente versão atual e identificar tópicos superficiais/ausentes, duplicações e eventuais desatualizações.
2. Estruturar capítulos e subcapítulos coerentes, da base anatômica/fisiológica à conduta.
3. Desenvolver efetivamente cada capítulo em prosa, com mecanismos, diagnósticos, decisões, diferenciais, peculiaridades, complicações e seguimento.
4. Inserir somente referências verificadas e contemporâneas em temas dinâmicos; não inventar fontes ou doses.
5. Preservar URLs, \`content.json\`/renderer conforme a pasta, IDs, sumário, navegação, CSS/PWA e imagens já aprovadas.
6. Auditar lacunas de mídia e produzir novas candidatas por fontes reais, **sem publicar antes do Admin aprovar**. Manter 65 candidatas pendentes no estado existente; não substituir fotos reais por esquemas artificiais.
7. Aferir **>= 40.000 caracteres didáticos úteis** excluindo CSS/JS/HTML estrutural, capa, sumário, bibliografia e repetições.
8. Revisar conteúdo e abertura do caderno em navegadores desktop/PWA, imagens, links e âncoras; registrar explicitamente a conclusão.

## Critério de encerramento da migração
**Nenhum dos 25 cadernos está automaticamente certificado como revisado pelo novo padrão.** A atualização da norma editorial e esta auditoria são a preparação do trabalho, não uma declaração de que as 25 obras já foram reescritas. Só marcar uma pasta como concluída depois de realizar a expansão e os testes. Os aprovados da fila de imagens permanecem aprovados; itens pendentes dependem de curadoria administrativa.


## Registro de implementação — 12/10/2026

### Diabetes Mellitus Gestacional — expansão textual aplicada no código
- Arquivo \`apostilas/diabetes-mellitus-gestacional/index.html\` atualizado na branch \`main\`, commit \`bbe9a1991346e4cbb25b409d1bf8586c060d8cc9\`.
- A seção **9.2 Complicações maternas e obstétricas** recebeu aprofundamento estruturado em seis novos subcapítulos: relação com pré-eclâmpsia, infecções sem sobrediagnóstico, crescimento fetal/decisão obstétrica, leitura da avaliação fetal, adaptação metabólica neonatal e seguimento do puerpério.
- Inseridos mecanismos, diferenciação entre associação e causalidade, alertas de aplicação clínica, um caso integrado e referência verificável às **ADA Standards of Care 2026** (DOI 10.2337/dc26-S015).
- A contagem aproximada do **artigo central** (sem scripts e estilos) foi de 38.330 para **51.030 caracteres**, antes da exclusão definitiva de sumário e referências. Contagem estrita e revisão visual/PWA ainda são requisitos para certificar a obra. Não foram modificadas imagens já aprovadas nem aprovadas candidatas novas.
- A linha da tabela acima representa a **situação inicial da auditoria**, não a medição após essa revisão.

### Infraestrutura editorial
- \`apostilas/EDITORIAL_STANDARD.md\`: padrão Livro-Texto 40K, critérios clínicos, preservação de renderer e curadoria de imagens adicionados.
- \`scripts/audit-apostilas-40k.mjs\`: auditoria preliminar automatizada de conteúdo didático das 25 pastas, com exclusão de HTML estrutural e compatibilidade com páginas HTML/JSON; não confundir resultado de triagem com certificação clínica.


### Síndromes hipertensivas da gestação — expansão textual aplicada no código
- Arquivo \`apostilas/sindromes-hipertensivas-da-gestacao/index.html\` atualizado na branch \`main\`, commit de conteúdo \`5d596909035e6fa0e6f7a20d9e0239b271d36a48\` e sumário integrado no commit \`19f939000af21be489234a117061ef894daa1c26\`.
- Criado **capítulo 20** com nove blocos desenvolvidos de fisiologia vascular, placentação, desequilíbrio angiogênico, lesão renal, HELLP, diagnóstico diferencial de microangiopatias, neurofisiopatologia/eclâmpsia, edema pulmonar, interpretação fetal, puerpério e casos integradores.
- Fundamentação atualizada com RBEHG 2025, Diretriz Brasileira de Hipertensão 2025 e FEBRASGO HELLP 2024; distinção entre critérios laboratoriais, sinais clínicos e decisões no serviço.
- Contagem preliminar do artigo principal passou de **31.083 para 49.831 caracteres** (antes de exclusões mais estritas); revisão visual/PWA e validação clínica integral ainda pendentes.
- **10 candidatas de imagem continuam pendentes no Admin**; nenhuma foi aprovada automaticamente e o fluxo de curadoria não foi alterado.



### Sangramento Uterino Anormal — expansão textual aplicada no código
- Arquivo \`apostilas/sangramento-uterino-anormal/index.html\` atualizado em \`main\`, commit \`19e39e76be7e0b1fe23156ad5eb11962f7a13add\`.
- Adicionado **capítulo 17** desenvolvendo hemostasia menstrual normal, anovulação, Sistemas 1 e 2 FIGO, miomas por topografia, pólipos, adenomiose, coagulopatias, interpretação de ultrassonografia e amostragem endometrial, mecanismo dos tratamentos, anemia e casos integradores.
- Referências: FEBRASGO 2026 e FIGO; capítulo e âncora adicionados ao sumário; imagens aprovadas mantidas.
- Contagem preliminar do artigo (sem scripts/estilos) passou de **36.601 a 54.567 caracteres**; contagem estrita, revisão clínica final e teste PWA ainda pendentes.



### Trabalho de Parto Prematuro — expansão aplicada no renderer JSON
- Arquivo \`apostilas/trabalho-parto-prematuro/content.json\` atualizado na branch \`main\`, commit \`5b96dc113ee7966cb4db09e58e31f2758681839e\`.
- Novo **capítulo 19**, com nove seções aprofundadas em quiescência miometrial, remodelamento cervical, mecanismos inflamatórios, diagnóstico e probabilidade de parto nas próximas 48 horas, tocólise, corticoterapia antenatal, neuroproteção fetal, ruptura de membranas e casos clínicos.
- Fontes complementares NICE NG25 e FEBRASGO para uso racional de tocólise. Foi preservado o formato compacto do renderer \`content.json\` e a estrutura de índice \`o\`, com novo item antes de referências. Dados de figuras/curadoria já presentes no JSON foram mantidos.
- Contagem **preliminar** (blocos de texto incluindo marcações e rótulos) após expansão superior a 52 mil caracteres; falta executar o auditor estrito e revisar qualidade/layout/links na página servida.

