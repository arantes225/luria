# Aula 48 — Auditoria editorial e validação estática do HTML

Data: 14/10/2026. Branch: `editorial/lote-03-auditoria-20261014`.

**Manuscrito:** `apostilas/_rascunhos/lote-03/48-imunizacoes-infancia.md`.  
**Prévia HTML:** `apostilas/imunizacoes-infancia/index.html`.

## O que foi efetivamente testado

- Manuscrito: **91.502 caracteres brutos**, **30 capítulos numerados** em sequência, 10 casos clínicos e 16 questões de múltipla escolha com alternativas A–D e gabaritos explicados.
- HTML: **131.946 caracteres**, **31 seções indexadas** (inclui comparativo inicial), 10 blocos de casos, 16 de questões com gabaritos expansíveis e 5 tabelas.
- Após recuperar o HTML gravado no GitHub: **0 âncoras internas sem destino**, **0 IDs duplicados** e **0 desequilíbrios** de section, article, div, details, table, thead, tbody, tr, td, th, nav, aside, main, header, h2 e h3.
- Aviso editorial e `robots=noindex,nofollow` presentes.
- Referência ao script padrão `apostila-tools.js` presente, mas **nenhum teste funcional de grifos/post-its foi realizado em navegador**.
- **0 imagens** inseridas: aguardam curadoria de fonte, licença comercial, relevância didática e aprovação no Admin.
- Nenhuma mudança ao catálogo público, branch principal, banco, merge ou deploy.

## Referências e ressalvas

Comparação foi realizada com o arquivo do Drive `Imunizações .pdf`, identificado como **PNI 2020**; foi utilizado exclusivamente para identificação de tópicos e de orientações desatualizadas. A base normativa desta edição é o **calendário brasileiro de 2026**, a Instrução Normativa 2026 e notas de transição VPC10→VPC20, consultadas em outubro de 2026. O documento é autoral e não reproduz redação/figuras do resumo antigo.

**Atenção:** calendário, esquemas de recuperação, limites de idade, imunossupressão, CRIE/RIE, covid-19, rotavírus e imunobiológicos podem ser atualizados no mesmo ano. Cada aplicação real deve seguir normas/condições válidas **na data de atendimento** e a apresentação disponível.

## Pendências de aprovação

1. Revisão médico-pediátrica e farmacêutica linha a linha dos produtos, intervalos, janelas etárias, doses, contraindicações e normas de 2026.
2. Revisão de pós-exposição (raiva, tétano, hepatite B, sarampo, varicela) e elegibilidade de imunobiológicos especiais pelos protocolos correspondentes.
3. Auditoria humana de autossuficiência: responder aos 10 casos e às 16 questões apenas pela apostila, preencher lacunas e corrigir erros.
4. Produção/seleção de diagramas originais, checagem de uso comercial de imagens, submissão ao Admin, WebP e legendagem após aprovação.
5. Inspeção real em desktop, mobile/PWA e temas claro/escuro/rosa, navegabilidade, tabelas, leitura, gabaritos e ferramentas de grifo.
6. Checagem de referências, links, atos normativos substituídos e coerência com a aula 43.

**Status: HTML_EDITORIAL_REVISAO_PENDENTE.** A QA estática não equivale à homologação científica ou teste visual/funcional real.

## Complementação clínica e verificação de sincronização (14/10/2026)

Após a primeira prévia, foi integrado o estudo de **VSR 2026** (vacinação materna a partir da 28ª semana versus imunização passiva por **nirsevimabe**, conforme elegibilidade, idade e sazonalidade), acrescidos **casos 9 e 10** e **questões 13–16**, com revisão da matriz de cobertura. Fontes oficiais: protocolo/guia de nirsevimabe de 2026 e FAQ da vacinação gestacional do Ministério da Saúde. Verificação estática da versão sincronizada: **30 capítulos 1–30**, **10 casos**, **16 questões com gabaritos expansíveis**, **31 seções no índice** (inclui comparativo), **5 tabelas**, **0 âncoras quebradas/IDs duplicados/elementos estruturais desequilibrados**. Não foram incorporadas imagens.

Esta é **QA automática de estrutura**, não validação de prescrição, estabilidade normativa, renderização ou funcionamento real das ferramentas.
