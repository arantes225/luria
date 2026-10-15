# Lote 06 · Tema 116 — Teste de autossuficiência e prévia técnica

**Status: TRIAGEM ESTRUTURAL PASSOU (triagem automatizada, não validação médica final).**

O teste busca as premissas conceituais das **12 questões** nos capítulos didáticos, **sem recorrer ao gabarito**. A presença de palavras é requisito estrutural mínimo, não comprovação de que o enunciado e todas as alternativas estejam justificadas em profundidade. O conteúdo clínico exige revisão por profissional médico e confronto com diretrizes.

| Questão | Objetivo | Capítulo de suporte | Âncora interna | Teste de termos |
| --- | --- | --- | --- | --- |
| 1 | Fenótipo nefrótico e hipoalbuminemia | 2 | `#cap-02-reconhecimento-das-sindromes-glomerulares` | Encontrou (sindrome nefrotica ✓, proteinuria ✓) |
| 2 | IgA e hematúria sinfaringítica | 14 | `#cap-14-nefropatia-por-iga-e-vasculite-por-iga` | Encontrou (iga ✓, hematuria ✓) |
| 3 | GNRP com deterioração renal rápida | 16 | `#cap-16-glomerulonefrite-rapidamente-progressiva-gnrp` | Encontrou (creatinina ✓, hematuria ✓) |
| 4 | KDIGO 2025: proteinúria e meta em IgA | 14 | `#cap-14-nefropatia-por-iga-e-vasculite-por-iga` | Encontrou (0,5 g/dia ✓, 0,3 g/dia ✓) |
| 5 | Nefrite lúpica proliferativa e indução | 15 | `#cap-15-nefrite-lupica` | Encontrou (classe iii ✓, classe iv ✓) |
| 6 | Síndrome pulmão-rim como urgência | 16 | `#cap-16-glomerulonefrite-rapidamente-progressiva-gnrp` | Encontrou (hemoptise ✓, anti-mbg ✓) |
| 7 | KDIGO 2025 pediátrica, curso inicial | 9 | `#cap-09-sindrome-nefrotica-na-infancia` | Encontrou (8 ou 12 semanas ✓, prednisona ✓) |
| 8 | GESF é padrão, não etiologia única | 11 | `#cap-11-glomeruloesclerose-segmentar-e-focal-gesf` | Encontrou (gesf ✓, secundaria ✓) |
| 9 | Membranosa, resposta imunológica vs clínica | 12 | `#cap-12-nefropatia-membranosa` | Encontrou (anti-pla2r ✓, proteinuria ✓) |
| 10 | Tratamento anti-MBG com terapia dirigida | 17 | `#cap-17-doenca-anti-membrana-basal-glomerular` | Encontrou (plasmaferese ✓, ciclofosfamida ✓) |
| 11 | Diagnóstico diferencial: infecção e imunossupressão | 13 | `#cap-13-glomerulonefrite-associada-a-infeccao-e-glomerulopatia-` | Encontrou (endocardite ✓, infeccao ✓) |
| 12 | Vasculite por IgA e acompanhamento renal | 14 | `#cap-14-nefropatia-por-iga-e-vasculite-por-iga` | Encontrou (vasculite por iga ✓, renal ✓) |

### Resultado técnico

- Seções do livro: **24**.
- Referências vinculadas: **11**.
- Comprimento textual estimado pelo pré-validador: **88695 caracteres**, incluindo casos e questões; não equivale à contagem de caracteres únicos do corpo didático.
- Questões com título detectadas no HTML: **12**.
- Casos clínicos com título detectados no HTML: **8**.
- Âncoras ausentes no HTML: **0**.
- Itens da matriz com palavras-chave ausentes: **0**.
- Novas imagens integradas no artigo: **0**. Duas candidatas permanecem pendentes de revisão/apoio do Admin.

### Crítica editorial qualificada

1. A questão 11 anterior repetia o tema da questão 5 (indução na nefrite lúpica). Ela foi **substituída por uma situação de glomerulonefrite da endocardite**, abordando uma armadilha de segurança relevante: iniciar imunossupressão sem excluir infecção.
2. O capítulo pediátrico passou a distinguir as decisões de incorporação do SUS em 2025 do estágio do PCDT, com fontes normativas oficiais.
3. O bloco anti-MBG/ANCA requer revisão específica da decisão de plasmaférese e avaliação benefício-risco. A errata KDIGO 2024 está citada no capítulo 18.
4. As alternativas das 11 outras questões ainda estão visualmente agrupadas em um parágrafo no HTML; **falta renderizá-las em lista de opções**, com letras e acessibilidade apropriadas, antes da revisão desktop/PWA.
5. Sem fonte comparativa extensa e de autoria confirmada no Drive para este tema, a etapa zero continua **parcial**. Materiais resumidos correlatos foram efetivamente consultados antes da edição.
6. Não foi executado o comando local `node scripts/build-apostilas-batch.cjs --input ... --dry-run`; o JSON e a prévia passaram somente por validação estrutural equivalente em JavaScript. Não alegar execução de testes do repositório ou certificação clínica.
7. Confirmar a documentação de licença, relevância didática e direitos de figuras antes de submetê-las ao Admin; nenhuma imagem clínica foi automaticamente incorporada.

### Pendências para publicação

- [ ] Revisão científica especializada por capítulo, com testes contra texto real de diretrizes e PCDT do Brasil
- [ ] Auditoria da métrica de 60.000 caracteres didáticos únicos após consolidação final
- [ ] Fonte comparativa extensa no Drive com autoria confirmada
- [ ] Conversão definitiva para pasta pública apenas após aprovação editorial
- [ ] Validadores do repositório, sintaxe, navegação, mobile/PWA e curadoria de imagens
- [ ] Deploy/merge autorizado separadamente
