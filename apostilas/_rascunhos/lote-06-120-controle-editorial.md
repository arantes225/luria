# Lote 06 · Tema 120 — Medicina Baseada em Evidências (MBE)
**Auditoria inicial:** 14/10/2026. **Status:** revisão preparatória; não publicar.

## Etapa zero realizada antes da escrita
- **Inventário no GitHub:** consultas aos diretórios `apostilas/` e `apostilas/_rascunhos/` na branch editorial não localizaram apostila específica de MBE, epidemiologia clínica ou bioestatística. Verificar sobreposição posterior com temas de rastreamento e medidas de associação, sem criar materiais redundantes.
- **Benchmark aberto e lido no Google Drive:** `Estudos Epidemiológicos.pdf` (3.081 caracteres de texto extraído), com autoria nominal na própria capa/texto mas **sem identificação institucional verificável de Estratégia MED**. Texto realmente consultado: estudos descritivos, coorte, caso-controle, ecológico, ensaio clínico e medidas RR/OR/RRA/RRR/NNT. O material não inclui capítulos de testes diagnósticos, GRADE, revisões sistemáticas, integridade científica e avaliação econômica. Não copiar frases, quadros, imagens, estilo ou exemplos proprietários.
- **Base visual LURIA:** consultada a apostila existente `apostilas/planejamento-reprodutivo-contracepcao/index.html` para confirmar a estrutura de HTML, CSS compartilhado e navegação, sem utilizar seu conteúdo médico.
- **Limitação importante:** o documento do Drive é uma folha-resumo, **não uma apostila extensa equivalente ao Estratégia MED**; o benchmarking premium segue incompleto. O resumo simplifica orientações temporais como “coorte sempre prospectiva e caso-controle sempre retrospectivo”; a redação LURIA explicará a direção da seleção amostral e o tempo da coleta separadamente.

## Diretrizes e referências científicas checadas externamente
1. **Conitec/Ministério da Saúde:** portal oficial de Diretrizes Metodológicas, com manuais de revisão sistemática, metanálise, estudos diagnósticos, GRADE, avaliação econômica e diretrizes clínicas. https://www.gov.br/conitec/pt-br/assuntos/avaliacao-de-tecnologias-em-saude/diretrizes-metodologicas
2. **Cochrane Handbook** versão 6.5 (2024): métodos de revisão sistemática, risco de viés, síntese e heterogeneidade. https://training.cochrane.org/handbook/current
3. **PRISMA 2020** (publicação original em 2021): checklist de relato para revisões sistemáticas; **não ferramenta de classificação de risco de viés**. https://www.equator-network.org/reporting-guidelines/prisma/
4. **CONSORT 2025:** 30 itens essenciais e fluxograma de participantes para relato transparente de ensaios randomizados, substituindo a versão de 2010. https://www.bmj.com/content/389/bmj-2024-081123
5. **STROBE:** relatos observacionais de coorte, caso-controle e transversais; não é ferramenta de aferição de qualidade metodológica. https://www.equator-network.org/reporting-guidelines/strobe/
6. **RoB 2 Cochrane:** avaliação de risco de viés em ensaios randomizados. https://methods.cochrane.org/bias/resources/rob-2-revised-cochrane-risk-bias-tool-randomized-trials
7. **PROSPERO:** registro prospectivo de revisões sistemáticas elegíveis em saúde. https://www.crd.york.ac.uk/PROSPERO/

## Plano de conteúdos não redundantes
1. Pergunta estruturada PICO/PECO/PIRD, implementação e decisão compartilhada.
2. Ensaios randomizados, coorte, caso-controle, transversais, ecológicos, séries, pesquisa qualitativa.
3. Medidas de frequência e associação, interpretação de RRA/RRR/NNT/NNH, RR/OR/HR, intervalos de confiança.
4. Testes diagnósticos, Bayes, razões de verossimilhança, prevalência, ROC, viés de espectro.
5. Inferência estatística, distribuição, amostragem, erro alfa/beta, poder, hipóteses, multiplicidade, p e IC.
6. Tipos de viés, confusão, causalidade, vieses de tempo imortal, perdas, intenção de tratar, desfechos substitutos.
7. Revisão sistemática, metanálise, modelos de efeito, heterogeneidade, certeza GRADE e força de recomendação.
8. Leitura crítica de diretrizes, Conitec, ATS, avaliação econômica básica, ética e integridade.
9. Casos e questões autorais com números verificáveis e explicação das alternativas.
10. Gerador JSON/HTML LURIA, imagens candidatas licenciadas via Admin; não publicar sem revisões e validadores.

## Critérios bloqueadores
- [ ] Produzir corpo instrucional próximo ou superior a 60 mil caracteres úteis sem repetições.
- [ ] 8 casos e 12 questões comentadas, análise quantitativa correta e matriz de autossuficiência.
- [ ] 10 candidatas de figuras/diagramas com licença e finalidade didática conferidas quando aplicável, sem inserção direta.
- [ ] Comparação com apostila longa de origem institucional confirmada, se acessível.
- [ ] Revisão científica independente, verificação de fórmulas/contas, referências e clareza editorial.
- [ ] Executar de fato os validadores do repositório e conferir desktop/PWA antes de qualquer merge/deploy.

---

## Etapa 2 — redação, cálculo e prévia técnica (14/10/2026)

- **Markdown original:** `apostilas/_rascunhos/lote-06-120-medicina-baseada-em-evidencias.md` — **100.983 caracteres brutos**, 32 capítulos, com 28 de corpo instrucional, 8 casos (capítulo 29), 12 questões (capítulo 30), bibliografia e controle.
- **Corpo didático pré-contado:** **72.997 caracteres**, capítulos 1–28, após remover URLs e marcas Markdown básicas, sem casos/questões/bibliografia. **Não é certificação de 60 mil caracteres semanticamente únicos e úteis.**
- **Entrada do gerador:** `apostilas/_rascunhos/lote-06-120-build-input-preliminar.json` — 31 seções, 11 referências, nenhuma figura inserida.
- **Prévia HTML LURIA:** `apostilas/_rascunhos/lote-06-120-preview.html` — 32 seções contando bibliografia, 8 casos, 12 questões, 12 listas A–D, 0 âncoras internas ausentes, 0 IDs duplicados; com `noindex`. Nenhum arquivo público alterado, nenhum deploy/merge.
- **Verificação aritmética independente:** RR 2,0; OR 2,67; NNT 34 no exemplo de benefício 10% versus 7%; VPP 33,3%; VPN 98,6%; LR+ 4,5; LR− 0,125; ICER R$ 20.000 por QALY nos exemplos fictícios. Esses cálculos passaram, mas é obrigatória a revisão profissional da interpretação e dos demais números.
- **Correção de cobertura:** o capítulo 14 recebeu distinção explícita entre equivalência, não inferioridade e valor de p não significativo. Markdown, JSON e HTML foram sincronizados.

### Matriz de autossuficiência preliminar — sem ler gabaritos
| Questão | Conteúdo | Capítulos | Termos no corpo didático | Situação |
| --- | --- | --- | --- | --- |
| 1 | OR e seleção pelo desfecho | 3, 6 | caso-controle ✓; odds ratio ✓ | Cobertura lexical |
| 2 | Diferença RR/OR | 9 | rr ✓; or ✓; 2,67 ✓ | Cobertura lexical |
| 3 | NNT/RRA | 10 | nnt ✓; reducao absoluta ✓ | Cobertura lexical |
| 4 | VPP e prevalência | 16 | vpp ✓; prevalencia ✓ | Cobertura lexical |
| 5 | LR+ e Bayes | 17 | lr+ ✓; 0,90 ✓ | Cobertura lexical |
| 6 | p e equivalência | 14 | valor de p ✓; equivalencia ✓ | Cobertura lexical |
| 7 | Tempo imortal | 5, 11 | tempo imortal ✓; exposicao ✓ | Cobertura lexical |
| 8 | PRISMA vs RoB 2 | 20, 24 | prisma ✓; rob 2 ✓ | Cobertura lexical |
| 9 | IC e linha nula | 14 | ic95% ✓; 1 ✓ | Cobertura lexical |
| 10 | GRADE por desfecho | 23 | grade ✓; imprecisao ✓ | Cobertura lexical |
| 11 | Lead-time | 27 | lead-time ✓; mortalidade ✓ | Cobertura lexical |
| 12 | ICER | 25 | icer ✓; qaly ✓ | Cobertura lexical |

**Resultado: 12/12.** A busca por termos confirma apenas presença mínima de conceitos nos capítulos escolhidos. Não é validação científica da questão inteira nem da justificativa de cada alternativa.

### Bloqueios de conclusão
1. Benchmark extenso de origem institucional comprovada, não localizado nesta rodada no Drive.
2. Revisão médica e metodológica humana; recálculo das demais estimativas e avaliação de vieses e fontes.
3. Deduplicação semântica e certificação editorial de caracteres **úteis e únicos**.
4. Até 10 figuras/diagramas didáticos candidatos com licença/autoria rastreada, submetidos **somente pelo Admin**, sem inclusão direta no HTML.
5. Execução real de `node scripts/build-apostilas-batch.cjs --input ... --dry-run`, auditores do repositório e inspeção desktop/PWA. **Não foram executados nesta rodada.**
6. Aprovação editorial antes de merge, deploy ou marcação de “concluída”.

**Parecer: apostila 120 redigida e estruturada para prévia; NÃO PUBLICADA e NÃO CERTIFICADA.**
