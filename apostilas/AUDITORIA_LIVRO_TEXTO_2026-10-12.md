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



### Câncer de Mama — expansão aplicada no HTML
- Arquivo \`apostilas/cancer-de-mama/index.html\` atualizado na branch \`main\`, commit \`bbb1ded8899f2d99032c768b4376b720aa0590b6\`.
- Novo módulo integrador com oito seções didáticas: unidade ductolobular e invasão, receptores hormonais/HER2, concordância tripla, diferença entre rastreamento e diagnóstico, conservação da mama e radioterapia, avaliação axilar, neoadjuvância/adjuvância e caso comparativo.
- Atualizado e reforçado o **rastreamento bienal de 50 a 74 anos** conforme Ministério da Saúde (2025), com referência ao **PCDT de câncer de mama atualizado em maio de 2026**.
- Mantida a formatação LURIA e acrescentado item de navegação; nenhuma imagem previamente aprovada foi removida.
- Estimativa de texto visível do artigo: **38.579 → 53.170 caracteres**, ainda sujeita a validação estrita, conferência científica e testes PWA. Registro inicialmente não localizado na tabela \`public.apostilas\`; atualização no GitHub não garante visibilidade no catálogo.



### Crescimento intrauterino reduzido e aumentado — expansão em capítulos separados
- Arquivo \`apostilas/crescimento-intrauterino-reduzido-aumentado/index.html\` atualizado na branch \`main\`, commit \`ad77bc3bf532bf3a64891deae5b4b8861ba1728d\`.
- Dois blocos completos e separados: **16. RCF/PIG**, com datação, Doppler, etiologia e manejo diferencial de RCF precoce/tardia; **17. GIG/macrossomia**, com crescimento metabólico, erro na estimativa ultrassonográfica, distócia de ombro, decisões intraparto e adaptação neonatal.
- Fontes complementares FIGO 2021 (DOI 10.1002/ijgo.13522) e ACOG Macrosomia PB 216, reafirmado em 2026. Novas âncoras do índice incluídas; materiais de curadoria e **2 imagens aprovadas / 8 pendentes** foram preservados sem mudança de estado.
- Texto visível do artigo estimado **27.128 → 46.471 caracteres**, com verificação editorial estrita e testes PWA ainda pendentes.



### Avaliação da Vitalidade Fetal — expansão aplicada no HTML
- Arquivo \`apostilas/avaliacao-vitalidade-fetal/index.html\` atualizado na branch \`main\`, commit \`82fa0280b95fb201a38a67fdd8db93c2f05df726\`.
- Adicionado **capítulo 16** com oito subcapítulos sobre transporte de oxigênio, fisiologia da cardiotocografia, desacelerações, PBF, líquido amniótico, Doppler umbilical/cerebral/ducto venoso, limites de previsibilidade e dois casos integradores. A interpretação anteparto e intraparto foi explicitamente diferenciada.
- Fontes ACOG/SMFM Committee Opinion 828, ACOG Practice Bulletin 229 e FIGO (RCF) 2021, com URLs institucionais; sumário recebeu link novo. Imagens aprovadas preservadas.
- Estimativa de texto visível do artigo **26.012 → 40.540 caracteres**; o valor fica próximo do piso e depende de **aferição estrita** excluindo referências, resumos e elementos auxiliares. Se a contagem estrita for inferior a 40.000, requer expansão adicional antes da certificação.


### Ciclo Menstrual e Eixo Hipotálamo-Hipófise-Ovário — expansão aplicada
- Arquivo `apostilas/ciclo-menstrual-eixo-hho/index.html` atualizado em main, commit `87ed9a62bfbf00979cd45ef8752b08d6fbea8e06`.
- Novo capítulo 16 aborda GnRH pulsátil/KNDy, FSH/LH, esteroidogênese, foliculogênese, feedback, meiose, corpo lúteo, janela fértil e interpretação hormonal.
- Estimativa de artigo: 29.062 → 43.721 caracteres; validação estrita, revisão clínica e PWA ainda pendentes.

### Hemorragias do Primeiro e Terceiro Trimestre — expansão aplicada
- Arquivo `apostilas/hemorragias-primeiro-terceiro-trimestre/index.html`, commit `c6059d1bdc11096659dcd30506f1fd2382f1b7e9`.
- Dois capítulos separados: hemorragias iniciais (gestação de localização desconhecida, ectópica, critérios de perda e condutas) e hemorragias tardias (prévia/acretismo, DPP, vasa prévia, rotura e ressuscitação).
- Estimativa de texto do artigo: 36.677 → 50.501 caracteres. Requer revisão clínica, aferição estrita e validação visual/PWA.


### Infertilidade Conjugal — expansão do raciocínio etiológico
- Arquivo \`apostilas/infertilidade-conjugal/index.html\` atualizado em main, commit \`f8140073c10a1fa94a230b9b5636a1ab5840acac\`.
- Criado capítulo 14 com avaliação de ambos os parceiros, função ovulatória, reserva ovariana versus qualidade, permeabilidade e função tubária, investigação masculina, FIV/ICSI e casos explicados. Fonte ASRM 2021 DOI 10.1016/j.fertnstert.2021.08.038.
- Texto visível do artigo estimado **35.790 → 45.839 caracteres**; imagens e navegação preservadas. Necessários validação estrita e teste PWA.

### Climatério e Menopausa — expansão em JSON
- Arquivo \`apostilas/climaterio-menopausa/content.json\` atualizado, commit \`6a9e89915c3953705dc236e77fd3e4d031446fbe\`.
- Criado capítulo 17 com oito seções de fisiopatologia ovariana, fogachos, síndrome geniturinária, estrogênio/progestagênio, vias oral e transdérmica, metabolismo ósseo, alternativas não hormonais e caso clínico. Fontes FEBRASGO Diretriz Brasileira 2024 e The Menopause Society 2022.
- Conteúdo textual JSON estimado em **42.828 caracteres** na triagem preliminar, ainda sujeito a exclusão estrita de tags/estruturas e revisão clínica/visual. Renderer e sumário mantidos.


### Cervicites e Doença Inflamatória Pélvica — expansão aplicada
- Arquivo `apostilas/cervicites-doenca-inflamatoria-pelvica/index.html`, commit `ae2891cf4eaea963cf93ba8faf782b97ac381023`.
- Capítulo 13 aprofundou mecanismos de clamídia, gonococo, M. genitalium, diagnóstico da DIP, antibióticos de amplo espectro, abscesso tubo-ovariano, seguimento e casos. Referências CDC e PCDT brasileiro.
- Texto estimado do artigo: 33.427 → 44.083 caracteres; requer contagem estrita, revisão clínica e PWA. Imagens aprovadas preservadas.


## Atualização do método — referência do Drive e piloto visual

Em 12/10/2026, após orientação de evitar “textões”, foram inspecionados visualmente dois PDFs do Drive para identificar padrões editoriais genéricos de cursinhos: \`02 - CORRIMENTOS VAGINAIS .pdf\` (**10 páginas**) e \`02 - ASSISTENCIA AO PRE-NATAL.pdf\` (**8 páginas**). Ambos combinam duas colunas por página, grande densidade didática, figuras de exame/ilustrações, diagramas, tabelas e blocos pequenos com títulos fortes. Outros exemplos inspecionados tinham 4–10 páginas; não se deve atribuir 40 páginas a esses arquivos, embora **40–60 páginas A4 relevantes** seja um objetivo desejado para cadernos completos da LURIA, conforme complexidade.

**Correção da abordagem:** não aumentar o tamanho por meio de muitos parágrafos consecutivos ou apêndices massivos. Preservar e aprofundar visualmente todo mapa mental, fluxo, callout, gráfico e tabela existente; acrescentar, onde houver benefício, cartões comparativos, quadros de tomada de decisão, pequenos textos de interpretação e diagramas originais. Alvo de 40.000 caracteres didáticos **distribuídos ao longo dos capítulos**, sem conversão a longos blocos de prosa. O modelo do cursinho serve de inspiração estrutural, sem reprodução literal de textos/arte/propriedade intelectual de terceiros.

### Piloto implementado em Vulvovaginites
- Arquivo \`apostilas/vulvovaginites/index.html\` atualizado no GitHub em \`main\`, commit \`928dd59d0ebde1ff8f72530cea596cc7e592892b\`.
- Acrescentado quadro visual original, com **dois roteiros de quatro etapas** (raciocínio diagnóstico e fisiologia do pH), **três cards comparativos** (candidíase, vaginose, tricomoníase) e bloco interpretativo clínico.
- CSS adicional usa as cores do próprio tema LURIA, com layout de **duas colunas em telas amplas e uma coluna no PWA**, além de regras básicas para impressão, sem substituir layout geral existente.
- Contagem de elementos visuais antes e depois: **4 figuras/imagens, 9 tabelas, 9 callouts e 1 mapa mental** preservados integralmente; nova seção e link de sumário confirmados na leitura pós-escrita.
- O piloto **não** é a conclusão da expansão para >= 40.000 caracteres, nem uma validação final de 40–60 páginas impressas. Falta testar a renderização visual desktop/PWA e expandir o restante do tema conforme a nova orientação.

### Regra para seguir revisando os outros cadernos
O aprofundamento deve acontecer **junto dos fluxogramas, imagens e capítulos originais**, com realce gráfico dos conceitos. Os grandes blocos finais de aprofundamento já adicionados em materiais anteriores devem ser redistribuídos futuramente para os capítulos corretos, preservando o conteúdo válido e aumentando a legibilidade.


## Correção editorial — organização e mídia (Vulvovaginites)

Após rejeição da repetição de figuras, mosaicos de quatro imagens e blocos textuais desorganizados, foram executadas as seguintes correções diretamente no repositório:

1. \`assets/js/apostila-tools.js\`:
   - removida a geração automática de \`apostila-approved-pair\`;
   - adicionada deduplicação de URLs e origens equivalentes antes de posicionar imagens aprovadas;
   - limitada a inserção complementar por capítulo, privilegiando informação visual diferente da figura fixa;
   - escolhida inserção após parágrafos/subtópicos para impedir pilhas no fim das seções;
   - dimensões usuais de 480–520 px de largura e 320–340 px de altura máxima, respeitando proporção e adaptação mobile.
   - Commits: \`9f240aaafcc62133fda8223db7dc9e946b81634c\` e \`4c412242ef1ed1588262f64fe3318a72fa1e2d4b\`.
2. \`apostilas/vulvovaginites/index.html\`:
   - quadro visual recolocado na sequência didática após microbiota;
   - dois apêndices repetitivos após a bibliografia removidos;
   - aprofundamento organizado nos próprios capítulos de microbiota, candidíase, vaginose, tricomoníase, avaliação clínica, diferenciais, terapêutica, situações especiais e seguimento;
   - conteúdo adicional distribuído entre explicações clínicas curtas, quadros comparativos, mapas de decisão, cardzinhos e tabelas — sem imagens extras para aumentar altura;
   - removida ainda a seção 12 que repetia as mesmas etiologias; referências voltaram a ser a última parte.
   - Commits: \`cf552a79cfd13ed0a64265423d7a14a4a68ea2ed\`, \`29558d69d1619fd1ac7fed92f7e7c21d5b6d9524\`, \`66b2fe45e1ecdd3be2db50f848353ea73b5018e9\`, \`2a6d856377170dda8ca5e73890b22ce301373241\`.
3. **Leitura pós-alteração:** aproximadamente **43.560 caracteres de conteúdo extraído do artigo** (ainda estimativa, inclui alguns elementos de revisão e referências), 4 imagens fixas distintas sem URLs repetidas, 12 tabelas, 10 callouts. Todos os IDs de seções e links internos da apostila testados por inspeção do arquivo; o script comum e os scripts inline passaram na verificação sintática.
4. **Limitação relevante:** nenhuma renderização final desktop/PWA nem auditoria clínica independente foi concluída; navegador/headless browser não estava disponível neste ambiente e o domínio publicado não pôde ser resolvido aqui. Não carimbar visualmente como concluído sem inspecionar screenshots reais.
5. Os 9 itens marcados como \`approved\` na fila de Vulvovaginites **permanecem aprovados no Supabase**. O front-end agora faz seleção editorial para evitar exibição duplicada/agrupada sem alterar as aprovações originais nem excluir arquivos da fila.

**Aplicação aos demais 24 cadernos:** regra de renderização de imagens é global; a revisão da organização textual ainda precisa ser replicada em cada caderno, com auditoria individual e sem remoção indiscriminada de imagens e esquemas úteis.


### Reorganização clínica por doença e tratamento das três figuras externas

**Pedido expresso**: cada doença deve ser ensinada integralmente em um único bloco (epidemiologia, fisiopatologia, clínica, diagnóstico, tratamento, prevenção e seguimento) e não por eixos gerais misturando candidíase, vaginose e tricomoníase.

- **Vulvovaginites, commit \`676061015f55be0c1930fd0cc739d56eff0aefed\`**: retirados os antigos blocos genéricos de tratamentos, situações especiais e seguimento, consolidando os esquemas e as explicações relevantes dentro de cada doença. Avaliação inicial (princípios gerais) antes das três, quadro comparativo depois delas, referências ao final.
- **Commit \`ca4fcb3e9f50c0dcbd09a3f4b4febebd5e2760fe\`**: sub-blocos reorganizados por doença em conceito/epidemiologia → fisiopatologia → quadro clínico → diagnóstico → tratamento → prevenção/seguimento; removidos trechos diagnósticos transversais repetidos.
- **Commit \`ef8df6d8a5e1bd87a8168854128f41447ab45cc4\`**: cada fotomicrografia fixa transferida para perto do bloco de diagnóstico, mantendo 4 imagens inline únicas no arquivo e 1 para cada etiologia.
- **JS de curadoria, commits \`ca43117537f1ad8191b2a7fb52f695b3bf0937a9\` e \`318ed7cee99e08905569b0d69fe08959598fac65\`**: imagens clínicas aprovadas inseridas perto de quadro clínico; images de microscopia perto de diagnóstico; fallback de origem para assets inacessíveis. Correção extra no script global de fallback \`93c4cddbae8fc41b126efea3dac8d13d99dc1698\`.
- **Imagens clínicas #13 (DermNet candidíase), #15 (DermNet vaginose), #17 (Scientific Archives colo em morango)**: as URLs diretas de imagem não foram acessíveis/estáveis. Os registros **continuam aprovados**, mas o JSONB \`render_mode\` passou a \`source_link\`: o usuário vê descrição didática e link explícito à fonte original, sem imagem quebrada. O #17 passou a apontar diretamente para PDF oficial CC BY na página que contém a figura. **Não declarar que as fotografias estejam hospedadas inline na LURIA**; isso requer cópia local autorizada e realmente verificada.
- QA estrutural pós-edição: 3 doenças, cada uma com exatamente seis unidades editoriais, índice sem links quebrados/IDs duplicados, 4 imagens HTML distintas, referências no final, extração de texto aproximada em 42.500 caracteres no artigo. Código JavaScript compartilhado e fallback passaram em avaliação sintática; **teste renderizado no desktop/PWA ainda não realizado**.
