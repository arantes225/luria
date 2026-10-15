# Lote 06 — Tema 121: Infecção Urinária e Pielonefrite
**Data de referência:** 14/10/2026. **Status:** auditoria inicial; rascunho separado, não publicado.

## Etapa zero — inventário e prevenção de duplicação
- Consultados diretórios \`apostilas/\` e \`apostilas/_rascunhos/\` na branch editorial \`editorial/lote-06-auditoria-20261014\`. **Não foi localizada apostila específica publicada nem rascunho com tema nominal ITU, pielonefrite ou cistite.**
- Apostilas publicadas com conteúdo tangencial identificadas: \`infeccoes-gestacao-transmissao-vertical\` e \`infeccoes-sexualmente-transmissiveis\`; **manter recorte de 121 primariamente de Clínica Médica**, complementando sem duplicar a gestão detalhada de gestantes e IST.
- Conferir nos lotes futuros o recorte de pediatria, urologia, litíase, sepse e prostatite.

## Documentos do Drive efetivamente abertos para benchmark de abrangência
1. \`10 - UROLOGIA - LITIASE NO PRONTO-SOCORRO.pdf\`, cerca de 6,5 mil caracteres de texto extraído: explica litíase, cólica, sinais de obstrução e **pielonefrite obstrutiva → drenagem por duplo J/nefrostomia e antibiótico**. Um resumo de urologia, **não uma apostila de ITU**.
2. \`03 - ESPECIALIDADES- NEFRO - HIDRONEFROSE E RVU.pdf\`, cerca de 20,9 mil caracteres: hidronefrose, refluxo vesicoureteral e associação com ITU febril infantil. Conteúdo parcialmente sobreposto, recorte principal distinto.
3. \`01 - ESPECIALIDADES- NEFRO - HIDRONEFROSE E RVU.pdf\`, cerca de 31,1 mil caracteres, reúne temas de nefrologia e RVU; serve apenas para prevenir lacunas em complicações e encaminhamento.
4. \`02 - ASSISTENCIA AO PRE-NATAL.pdf\`, cerca de 25,3 mil caracteres, inclui **urocultura do pré-natal**, mas pode conter dados de protocolos antigos que devem ser cotejados com diretrizes recentes.
- **Limitação:** nenhum destes quatro arquivos é uma apostila extensa de ITU/pielonefrite de autoria institucional Estratégia MED confirmada. Não apresentá-los como benchmark equivalente nem copiar trechos/tabelas/imagens.

## Diretrizes científicas localizadas e conferidas
1. **EAU Urological Infections Guidelines, atualização 2026**: https://uroweb.org/guidelines/urological-infections/chapter/the-guideline e https://uroweb.org/guidelines/urological-infections/summary-of-changes/2026 . Diferenciar cistite localizada, infecção sistêmica, bacteriúria assintomática, exames, antimicrobianos e obstrução. Atualização 2026 inclui capítulo novo de ITU fúngica.
2. **IDSA Guideline on Complicated Urinary Tract Infections 2025**: https://www.idsociety.org/~/link/bc125f1fa47a47b7913b884cd368e8a0.aspx . Escolha empírica em quatro passos: gravidade, risco de resistência, fatores individuais, antibiograma local se sepse; desescalonamento.
3. **IDSA 2025 — duração da cUTI**: https://academic.oup.com/cid/article/82/Supplement_3/i79/8384478 . Terapia efetiva em pessoa melhorando permite frequentemente 5–7 dias de fluoroquinolona ou 7 dias de outra classe; ressalvas para prostatite e grupos não adequadamente estudados. Não aplicar mecanicamente a gestantes.
4. **IDSA AMR Guidance 2024**: https://www.idsociety.org/practice-guideline/amr-guidance/ . E. coli ESBL, enterobactérias resistentes e diferenças entre cistite e pielonefrite; nitrofurantoína/fosfomicina oral não são opções adequadas para infecção parenquimatosa.
5. **ACOG Clinical Consensus 2023 — UTI in pregnant individuals**: https://www.acog.org/clinical/clinical-guidance/clinical-consensus/articles/2023/08/urinary-tract-infections-in-pregnant-individuals . Bacteriúria assintomática de gestantes e pielonefrite inicial hospitalar com 14 dias totais; contextualizar em rede brasileira, sem supor que seja PCDT nacional.
6. **EAU 2026 — referência operacional para antibioticoterapia da cistite**: primeira linha fosfomicina trometamol 3 g dose única; nitrofurantoína por cinco dias conforme apresentação e função renal; **não usar indiscriminadamente aminopenicilinas ou quinolonas para cistite simples**. A disponibilidade e o perfil de resistência no Brasil podem divergir da Europa.
7. **Diretrizes pediátricas** devem ser citadas quando incorporadas e conferidas em etapa de revisão; não extrapolar critérios de adulto para lactentes.

## Escopo planejado
- Definições e anatomia; E. coli uropatogênica; epidemiologia e fatores de risco.
- Cistite simples, pielonefrite, infecção sistêmica, infecção associada a cateter, obstrução infectada, bactérias resistentes.
- Contaminação da amostra, cultura, tiras de urina e limitações, interpretação de UFC conforme coleta/sintomas.
- Abordagem de sepse, imagem seletiva e drenagem obrigatória na obstrução infectada.
- Antimicrobianos com local de ação, espectro, limites, dose orientadora adulta quando possível, duração e ajuste renal; antibiograma/desescalonamento.
- Bacteriúria assintomática, gestação, diabetes, transplantados, idosos, cateteres, homens/prostatite, recorrência e prevenção.
- Casos clínicos comentados, questões, quadros e algoritmos originais, curadoria de imagens aprovada via Admin.

## Bloqueios de conclusão
- [ ] Redação robusta com ~60 mil caracteres **úteis e não redundantes**.
- [ ] ≥4 casos completos e ≥6 questões originais comentadas; meta editorial 8/12.
- [ ] Revisão clínica médica e farmacológica, doses, restrições e protocolos locais brasileiros.
- [ ] Imagens didáticas somente com autoria/licença rastreada e aprovação Admin.
- [ ] Benchmark extenso de autoria comprovada, ou limitação formal.
- [ ] JSON/HTML provisórios e validador oficial realmente executado; desktop/PWA.
- [ ] Nenhum deploy/merge até autorização e aprovação editorial.

**Não copiar documentos privados, não fabricar referências brasileiras e não alterar material publicado na produção.**


---

## Etapa seguinte — material redigido e pré-validação técnica

**Arquivos criados e preservados em branch editorial:**
- \`apostilas/_rascunhos/lote-06-121-infeccao-urinaria-pielonefrite.md\`: 30 capítulos numerados, 8 casos, 12 questões originais; **101.762 caracteres brutos**.
- \`apostilas/_rascunhos/lote-06-121-build-input-preliminar.json\`: entrada para gerador com **29 seções**, 8 referências vinculadas e zero imagens embutidas.
- \`apostilas/_rascunhos/lote-06-121-preview.html\`: prévia de HTML baseada no template da LURIA com **30 seções**, 8 casos, 12 questões e 12 listas de alternativas de A a D. \`noindex,nofollow\`; nenhuma página pública foi alterada.
- \`apostilas/_rascunhos/lote-06-121-imagens-candidatas-parciais.json\`: quatro imagens de ultrassom/TC com páginas de fonte e licença CC BY/CC BY-SA **individualmente verificadas**; seis temas visuais ainda pendentes de seleção. **Sem inserção/aprovação no Admin ou publicação.**

### Cobertura e integridade
- **Corpo instrucional estimado:** 70.369 caracteres nos capítulos 1–26, depois da remoção simples de URLs e marcadores Markdown; exclui 8 casos, 12 questões, bibliografia e controle. **Não é certificação de originalidade semântica, utilidade total ou revisão científica humana.**
- Títulos de capítulos numerados consecutivamente: 30/30.
- 8 casos em sequência, 12 questões com justificativas individuais.
- Links internos de navegação no HTML sem âncoras quebradas no teste textual; nenhum ID duplicado.
- Não foram encontrados parágrafos longos exatamente duplicados na triagem textual, mas o texto contém recapitulacões didáticas cuja necessidade deve ser revista.

### Matriz de autossuficiência preliminar (sem consultar gabaritos)
| Questão | Competência | Capítulos de suporte | Termos-chave | Situação |
| --- | --- | --- | --- | --- |
| 1 | Cistite típica | 5, 11 | disuria ✓; cistite ✓ | Cobertura lexical |
| 2 | Antibiótico renal | 6, 12 | pielonefrite ✓; nitrofurantoina ✓ | Cobertura lexical |
| 3 | Obstrução infectada | 14 | descompressao ✓; obstrucao ✓ | Cobertura lexical |
| 4 | BAS em idosos | 7, 18 | bacteriuria assintomatica ✓; idos ✓ | Cobertura lexical |
| 5 | BAS na gestação | 7, 17 | gesta ✓; urocultura ✓ | Cobertura lexical |
| 6 | Pielonefrite gestacional | 17 | pielonefrite ✓; 14 dias ✓ | Cobertura lexical |
| 7 | Cistite ESBL | 15 | esbl ✓; tmp-smx ✓ | Cobertura lexical |
| 8 | cUTI e duração | 13 | 7 dias ✓; bacteremia ✓ | Cobertura lexical |
| 9 | Falso negativo nitrito | 8 | nitrito ✓; negativo ✓ | Cobertura lexical |
| 10 | CAUTI x colonização | 19 | biofilme ✓; cateter ✓ | Cobertura lexical |
| 11 | Lactente febril | 23 | tres meses ✓; coleta ✓ | Cobertura lexical |
| 12 | Não resposta ao tratamento | 10, 24 | 48 ✓; obstrucao ✓ | Cobertura lexical |

**Resultado: 12/12** com cobertura por busca de termos. **Limite:** demonstra apenas que termos e conceitos centrais aparecem nos capítulos, não a suficiência clínica de todas as justificativas nem a segurança de prescrição. Revisão de especialista segue indispensável.

### Camada visual
Foram analisadas fontes abertas e identificadas quatro candidatas com licenças rastreáveis:
1. Cerevisae, *Ultrasound of right kidney moderate hydronephrosis*, CC BY-SA 4.0.
2. James Heilman, *Phydronephrosisfromstone*, CC BY-SA 3.0.
3. Cerevisae, *Right kidney hydroureter with stone within*, CC BY-SA 4.0.
4. Hansen, Nielsen e Ewertsen, *Ultrasonography of renal stone located at the pyeloureteric junction*, CC BY 4.0.

A descrição e links completos estão no JSON de candidatos. As outras seis imagens/diagramas ainda precisam ser localizadas, licenciadas ou desenhadas de modo original, avaliadas clinicamente e aprovadas no fluxo Admin. **Não converter automaticamente imagens da internet em arquivos públicos sem validar licença e atribuição.**

### Pendências que bloqueiam marcação de "concluída"
1. **Revisão especializada de antimicrobianos, apresentações disponíveis no Brasil, perfil de resistência, ajustes por eGFR, interações, gestação, prostatite e complicações.** As diretrizes EAU 2026 e IDSA 2025 não substituem protocolos da CCIH/APS/SUS locais.
2. Auditoria rigorosa da utilidade/ausência de duplicações semânticas e comparação com benchmark extenso de origem institucional confirmada (não disponível).
3. Seleção/validação/legenda de figuras e compressão em WebP, com aprovação do Admin.
4. Executar realmente os scripts oficiais do repositório (\`node scripts/build-apostilas-batch.cjs ... --dry-run\`, auditores do lote e sintaxe), que **ainda não foram executados**. Pré-teste estrutural em JS **não equivale a execução real de build.**
5. Testar renderização desktop e PWA, corrigir problemas de responsividade e acessibilidade.
6. Validação editorial antes de qualquer merge, deploy ou alteração de versão publicada.

**Parecer atual:** apostila redigida, casos e exercícios prontos em prévia, estrutura e cobertura básicas verificadas. **Não aprovada para publicação ou uso clínico sem revisão.**
