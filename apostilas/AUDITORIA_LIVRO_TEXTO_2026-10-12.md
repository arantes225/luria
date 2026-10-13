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
