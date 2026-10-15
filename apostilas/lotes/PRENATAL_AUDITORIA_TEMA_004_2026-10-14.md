# LURIA — Auditoria editorial do tema oficial 004: Pré-natal de Baixo Risco
**Data:** 14/10/2026. **Plano:** Lote 1 dos 225 temas. **Status:** apostila preexistente preservada; auditoria parcial, NÃO certificada.

## Materiais efetivamente verificados
- **Arquivo principal** `apostilas/pre-natal-baixo-risco/index.html` aberto na branch `editorial/apostilas-lote-01-etapa-01-20261014`: aproximadamente 116.636 caracteres de HTML serializado; redação clínica extensa e organização por trimestres, sumário navegável e módulos específicos de infecções, vacinação e questões. Não usar o tamanho HTML como contagem de texto médico útil.
- **Benchmark Drive 1** `02 - ASSISTENCIA AO PRE-NATAL.pdf` aberto, 25.315 caracteres extraídos: orientações pré-concepcionais, suplementação, sinais de gravidez, consultas, rastreamentos. **Não copiar** textos, figuras, fluxogramas ou enunciados.
- **Benchmark Drive 2** `Pré-Natal.pdf` aberto, 1.603 caracteres: resumo antigo que cita mínimo de 6 consultas, não deve substituir a linha de cuidado vigente; não comprova autoria institucional Estratégia MED.
- **Documentos oficiais externos usados na triagem:** Ministério da Saúde, Calendário Nacional de Vacinação Gestante 2026 (`https://www.gov.br/saude/pt-br/vacinacao/arquivos/calendario-nacional-de-vacinacao-gestante`), calendário técnico gestante 2026 (`https://www.gov.br/saude/pt-br/composicao/svsa/pni/calendario-tecnico/calendario-tecnico-nacional-de-vacinacao-gestante`), FAQ VSR 2026 (`https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/v/vsr/faq/publico-alvo-e-elegibilidade-vsr/quem-pode-receber-a-vacina`).

## Achados de preservação e cobertura
1. A apostila já ensina estratificação contínua do risco, consultas, avaliações clínicas seriadas, datação, rastreios e ultrassonografia de forma integrada. Evitar criar outro livro de pré-natal geral ao trabalhar temas 009 (datação), 014 (exames e rastreamentos) e 019 (vacinação e suplementação) sem mapear primeiro as seções existentes.
2. O trecho inicial da apostila afirma início oportuno e ao menos oito consultas; **não substituir** pela informação resumida de seis consultas do comparativo.
3. A apostila já inclui explicitamente **dTpa em cada gestação a partir da 20ª semana e VSR a partir da 28ª semana**, inclusive em capítulo de vacinação final; não adicionar novo módulo redundante com a mesma mensagem.
4. O PNI 2026 determina, além disso, vacina covid-19 em cada nova gestação com condições de intervalo e histórico, influenza sazonal, hepatite B/dT conforme esquemas e vacina VSR uma dose por gestação a partir da 28ª semana. Verificar se todas as formulações do livro reproduzem corretamente nuances, exceções e contraindicações em revisão linha a linha.
5. O arquivo preexistente menciona figuras de USG e fontes de imagem; licenças e relevância de cada imagem ainda necessitam verificação, sem presumir direito de republicação.
6. Os benchmarks representam revisão temática, não fonte normativa; alguns critérios de suplementação, toxoplasmose, exames de rotina, rastreamento e calendários precisam ser confrontados com manuais atuais e particularidades regionais antes de fazer qualquer correção clínica.

## Próxima revisão obrigatória
- Inventariar cada seção, tabela e questão com respectivos IDs do HTML e resolver duplicações sem suprimir conteúdo bom.
- Confrontar critérios de datação e ultrassonografias, periodicidade e interpretação dos testes de HIV/sífilis, bacteriúria, GDM, Rh, toxoplasmose e triagem de risco com documentos nacionais atuais.
- Auditar o calendário de imunização 2026 por produto, grupo e semana gestacional, e apontar apenas lacunas reais no capítulo já existente.
- Validar casos clínicos, questões e todas as referências com revisores de GO; testar navegação e CSS desktop/PWA.
- Se houver correção necessária, editar o HTML **in loco** após checar CSP e integridade; não criar conteúdo alternativo desatualizado, nem fazer merge/deploy sem auditoria e coordenação com Codex.

**Decisão editorial desta etapa:** preservar `index.html` inalterado. O material já é robusto e a primeira leitura não mostrou falta do tópico VSR 2026; reescrever seria duplicar o que funciona. A auditoria é parcial e o tema não está certificado.
