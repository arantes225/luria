# LURIA — Aula 50 | Auditoria jurídico-editorial e HTML preliminar

**Data:** 15/10/2026. **Branch:** \`editorial/lote-03-auditoria-20261014\`.

**Manuscrito:** \`apostilas/_rascunhos/lote-03/50-financiamento-gestao-sus.md\`.  
**Prévia HTML isolada:** \`apostilas/financiamento-gestao-sus/index.html\`.

## Diagnóstico inicial e base comparativa

A aula 50 já possuía 9.321 caracteres e cobertura inicial de financiamento tripartite, blocos, APS, Plano/PAS/RAG, quatro minicasos e seis questões curtas. A expansão preservou os fundamentos, aprofundou LC141, bases de cálculo, classificação ASPS, PPA/LDO/LOA, restos a pagar, SIOPS, redes, farmácia, financiamento APS e análise de qualidade, e reescreveu casos e questões em formato autossuficiente. O tema de controle social é aprofundado separadamente na aula 45.

**Drive realmente aberto:** \`SUS.pdf\` (autoria institucional não confirmada), um resumo introdutório sem cobertura específica adequada de financiamento, de ~2.670 caracteres. Utilizado somente para identificar limites e comparar abrangência, sem copiar material protegido. **LURIA existente realmente aberta:** \`apostilas/assistencia-ao-parto/index.html\`, para referência de estrutura, sem usar conteúdo obstétrico.

## Métricas verificadas no GitHub

- Manuscrito: **86.976 caracteres brutos**, 20 capítulos numerados de 1 a 20 sem lacunas/repetições, mais seção comparativa inicial.
- **Oito casos gerenciais originais** com identificação do problema, raciocínio, dados/cálculos e conduta.
- **Dezesseis questões** A–D e dezesseis gabaritos com comentários por alternativa e mini-revisão.
- HTML: **124.593 caracteres**. 21 seções indexadas incluindo comparativo, oito casos, 16 gabaritos expansíveis e dez tabelas.
- Auditoria estática pós-gravação: zero âncoras internas sem destino; zero IDs duplicados; zero desequilíbrios nos elementos \`section\`, \`article\`, \`div\`, \`details\`, \`table\`, \`thead\`, \`tbody\`, \`tr\`, \`td\`, \`th\`, \`nav\`, \`aside\`, \`main\`, \`header\`, \`h2\`, \`h3\`.
- O HTML possui \`robots=noindex,nofollow\` e referência ao \`apostila-tools.js\`, mas **não houve teste de funcionamento de grifos/post-its nem renderização em navegador**.
- **Zero imagens de terceiros inseridas**. Lista de doze recursos diagramáticos autorais sugeridos, todos pendentes de aprovação/produção.
- **Nenhuma mudança pública, deploy, merge ou alteração do catálogo**.

## Autoridades verificadas em outubro de 2026

- Constituição Federal, art. 198, §2º: União 15% RCL do exercício, estados/municípios com bases tributárias específicas.
- **LC141 texto consolidado em 2026**, arts. 2º–4º, 6º–11, 14–26, 36–39; inclui LC209/2024, LC227/2026 e LC234/2026 em hipóteses legais delimitadas.
- Portaria 3.992/2017, com nomes históricos Custeio/Investimento, e Portaria 828/2020, com blocos vigentes Manutenção/Estruturação; Portaria 3.493/2024 cofinanciamento APS; **Nota Técnica 8/2026**, publicada 02/10/2026.
- Ministério da Saúde, instrumentos Plano/PAS/RQPC/RAG, SIOPS e FAQ com sanções, incluindo diferenças entre descumprimento de piso e falta de declaração/homologação.
- Bibliografia com URLs institucionais está no capítulo 19.

## Gaps para homologação

1. Revisão técnico-jurídica por gestor/contador de saúde dos efeitos de LC227/2026, transição IBS e regras de pisos/ASPS.
2. Revisão de critérios excepcionais de inclusão em ASPS (LC209/2024, LC234/2026), RAP e despesas de investimentos.
3. Avaliação de todas as 16 questões e oito casos pela legislação consolidada e por revisor independente, com teste de autossuficiência do capítulo.
4. Verificação das alterações posteriores à NT8/2026 e dos indicadores/faixas da APS por modalidade de equipe, sem introduzir valores antigos de transição.
5. Construção/revisão de diagramas originais e aprovação Admin se imagens estáticas forem usadas; não copiar infográficos oficiais ou apostila do Drive.
6. Testes reais no browser e PWA: responsividade, contraste, links, coloração, acessibilidade, grifos, post-its, scroll e gabaritos.
7. Revisão final de sobreposição com aula 45 e redação para alunos do zero ao avançado.

**Status: HTML_EDITORIAL_REVISAO_PENDENTE.** A quantidade de caracteres e validação estática não homologam a apostila.

## Complemento normativo e quantitativo — 15/10/2026

Foi detectado e corrigido erro temporal relevante: a Portaria GM/MS nº 828/2020 altera os nomes dos dois blocos introduzidos pela Portaria nº 3.992/2017. Em 2026 os nomes são **Manutenção das ASPS** e **Estruturação da Rede de Serviços Públicos de Saúde**. A redação da seção 10.2, a questão 8, a tabela e a matriz passaram a diferenciar essas denominações de Custeio/Investimento (históricas), bem como reparos/adaptações de reformas/expansões.

Acrescentada **oficina de cinco exercícios completos**, com bases dos pisos de ASPS, exemplo didático de restos a pagar e disponibilidade de caixa segundo LC141 art. 24, finalidade do saldo de Estruturação, efeito do denominador dos indicadores de hipertensão e custo efetivo de referência regional. Incluído quadro adicional de seis pegadinhas quantitativas nas subseções 16.5–16.6.

**Readback verificado no GitHub:** manuscrito 86.976 caracteres, capítulos 1–20, 8 casos, 16 questões/gabaritos; prévia HTML 124.593 caracteres, 21 seções indexadas (inclui comparativo), 10 tabelas, 8 casos e 16 gabaritos expansíveis. Sem âncoras internas quebradas, IDs duplicados ou desequilíbrio nas tags analisadas. O aviso noindex e o script de ferramentas continuam presentes; zero imagens incorporadas.

**Fontes:** Portaria 828/2020: https://bvsms.saude.gov.br/bvs/saudelegis/gm/2020/prt0828_24_04_2020.html ; Portaria consolidada 6/2017: https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prc0006_03_10_2017_comp.html ; Fundo Nacional de Saúde: https://portalfns.saude.gov.br/sobre-o-fns/ ; LC141: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp141.htm .

**Pendências:** validação por contador/gestor de saúde das normas e bases tributárias do exercício, teste independente dos casos e questões, produção de diagramas originais e testes visuais/funcionais no navegador e PWA. Não houve homologação, merge, publicação nem deploy.
