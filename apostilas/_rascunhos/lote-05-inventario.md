# LURIA — Inventário editorial do Lote 5 (093–115)
Data: 14/10/2026. **Situação:** auditoria inicial, não certificação de completude.
Fonte da grade: `assets/js/cronograma-base-data.js`, aulas 93–115. Não inferir existência de apostila a partir do índice de assuntos.

| Nº | Área | Tema | Situação inicial no repositório |
|---|---|---|---|
| 093 | Pediatria | Asma na infância | Rascunho avançado em `_rascunhos/lote-05-093-asma-infancia.md` (~73,9 mil caracteres brutos Markdown, ~65,8 mil estimados sem marcação/tabelas); ainda necessita revisão médica e validação formal |
| 094 | GO | Rotura prematura de membranas | Pasta existente `amniorrexe-prematura/`; preservar e auditar |
| 095 | Preventiva | Sensibilidade, especificidade e valores preditivos | Não identificada pasta temática homônima; buscar conteúdo integrado |
| 096 | Clínica | Distúrbios hidroeletrolíticos | Não identificada pasta homônima; auditar antes de criar |
| 097 | Cirurgia | Pancreatite aguda cirúrgica | Não identificada pasta homônima; auditar antes de criar |
| 098 | Pediatria | Crupe e epiglotite | Não identificada pasta homônima; auditar antes de criar |
| 099 | GO | Trabalho de parto prematuro | `trabalho-parto-prematuro/index.html` é apenas o contêiner (~3,1 mil caracteres); conteúdo médico já existe em `content.json` (~71,1 mil caracteres brutos). Preservar e auditar utilidade real |
| 100 | Preventiva | Testes diagnósticos e curvas ROC | Sem pasta homônima identificada; avaliar complementaridade com nº 095 |
| 101 | Clínica | Distúrbios ácido-base | Sem pasta homônima identificada |
| 102 | Cirurgia | Obstrução intestinal | Sem pasta homônima identificada |
| 103 | Pediatria | Tuberculose na infância | Sem pasta homônima identificada |
| 104 | GO | Hemorragia pós-parto | Manuscrito avançado em `_rascunhos/lote-05-104-hemorragia-pos-parto.md` (~81,5 mil caracteres brutos; ~70,9 mil de texto estimado após remoção simples de cabeçalhos/tabelas); `assistencia-ao-parto/` possui cobertura parcial e foi preservada; pendem revisão médica, validação de doses e imagens |
| 105 | Preventiva | Desenhos de estudos epidemiológicos | Sem pasta homônima identificada |
| 106 | Clínica | Lesão renal aguda | Sem pasta homônima identificada |
| 107 | Cirurgia | Hérnias da parede abdominal | Sem pasta homônima identificada |
| 108 | Pediatria | Infecção urinária na criança | Sem pasta homônima identificada |
| 109 | GO | Puerpério normal e patológico | Sem pasta homônima identificada; auditar `assistencia-ao-parto/` |
| 110 | Preventiva | Ensaios clínicos e revisões sistemáticas | Sem pasta homônima identificada; cruzar nº 105 |
| 111 | Clínica | Doença renal crônica | Sem pasta homônima identificada |
| 112 | Cirurgia | Diverticulite aguda | Sem pasta homônima identificada |
| 113 | Pediatria | Síndrome nefrótica e síndrome nefrítica | Sem pasta homônima identificada |
| 114 | GO | Infecção puerperal | Sem pasta homônima identificada; cruzar 109 |
| 115 | Preventiva | Vieses, confundimento e causalidade | Sem pasta homônima identificada; cruzar 105 e 110 |

## Constatações de arquivo efetivamente aberto
- `apostilas/amniorrexe-prematura/index.html`: ~104.430 caracteres de HTML total. Contém capítulos em profundidade e esquemas. **Não significa 104.430 caracteres didáticos úteis.**
- `apostilas/trabalho-parto-prematuro/index.html`: ~3.107 caracteres de HTML, **renderer legítimo**, com atributo `data-apostila-content` apontando para `content.json`. O JSON foi efetivamente aberto: ~71.107 caracteres totais, sumário com mais de 20 seções (concepção, diagnóstico, corticoterapia, tocólise, MgSO4, EGB, RPMO, casos e referências). **Apostila existente substancial: não recriar.** O tamanho bruto do JSON não mede caracteres didáticos úteis.
- `apostilas/assistencia-ao-parto/index.html`: ~83.798 caracteres de HTML total, com capítulos e fluxos relevantes; não contar como cobertura automática de HPP, puerpério ou infecção puerperal.

## Regra de continuação
Para cada apostila seguinte: pesquisar e **abrir** uma apostila comparável no Drive; examinar previamente o conteúdo LURIA existente; registrar comparação e lacunas; confirmar diretrizes vigentes; produzir texto próprio; criar candidatas de imagem somente via Admin; exigir ≥60 mil caracteres didáticos úteis, questões/casos e autossuficiência antes da publicação.

## Primeira revisão
Tema 093: comparação realizada com **Asma.pdf** e **Crise Asmática.pdf** do Drive, além do padrão visual LURIA e GINA 2026. Textos do Drive são resumos não identificados como Estratégia MED, com referências antigas. **Situação:** rascunho inicial, não apto para publicação.

## Retificação documental de 14/10/2026
A classificação inicial da apostila 099 com base apenas em `index.html` estava incorreta. Após leitura de `content.json`, a etapa correta é **auditoria de profundidade e atualização**, não criação de novo documento. Para revisão clínica, comparar com o documento FEBRASGO sobre uso racional da tocólise, a recomendação da OMS 2022 sobre corticoterapia antenatal e, separadamente, a recomendação da OMS 2022 sobre tocólise. A consulta comparativa no Drive localizada neste turno é indireta (obstetrícia e sangramento de segunda metade), portanto **a etapa zero do tema 099 ainda está pendente de uma apostila verdadeiramente equivalente**.


## Continuação de 14/10/2026 — produção e benchmarks
- **093 — Asma na infância:** duas fichas do Drive realmente lidas (`Asma.pdf`, `Crise Asmática.pdf`), atualizadas criticamente com GINA 2026; consultados também a revisão nacional no Jornal Brasileiro de Pneumologia (2024) e os metadados de aprovação do PCDT Asma do Ministério da Saúde (Portaria Conjunta SAES/SCTIE nº 43/2026, atualização de anexo em setembro). Rascunho Markdown avançado; contagem simples não certifica autossuficiência nem elegibilidade de medicamentos para uso brasileiro. Sem conteúdo incorporado ao site.
- **104 — Hemorragia pós-parto:** apostila `04 - HEMORRAGIA POS PARTO.pdf` do Drive aberta e lida; origem institucional não identificada; `assistencia-ao-parto/index.html` da LURIA aberta e avaliada nas referências a HPP. Divergência crítica registrada: limiares tradicionais de 500 mL/1000 mL versus critério precoce OMS/FIGO/ICM 2025 de perda medida ≥300 mL com sinal hemodinâmico anormal ou ≥500 mL. Elaborado rascunho original e autônomo em `_rascunhos/lote-05-104-hemorragia-pos-parto.md`. Revisão adicional baseada no protocolo FEBRASGO Femina 2025 e Position Statement 2024. **Pendente de revisão, extensão e publicação.**
- **094 — RPMO:** a apostila existente permanece intocada. Busca neste turno não encontrou material diretamente equivalente no Drive; para respeitar Etapa Zero, **não editar até obter benchmark realmente adequado**. Fonte primária FEBRASGO 2024 e protocolo hospitalar 2026 identificados para futura atualização.
- **095 — Testes diagnósticos:** nenhum material específico de referência educacional localizado nas buscas iniciais no Drive; ainda não iniciada edição médica. Buscar outros termos e pastas antes de iniciar.


## Checkpoint editorial — 14/10/2026, complemento da apostila 104

**Arquivos reais confirmados:** apostila publicada preexistente \`apostilas/assistencia-ao-parto/index.html\`; novo rascunho \`apostilas/_rascunhos/lote-05-104-hemorragia-pos-parto.md\`. Nenhum conteúdo existente foi sobrescrito.

**Etapa zero concluída para 104:** revisão integral do texto extraído do PDF correlato \`04 - HEMORRAGIA POS PARTO.pdf\`, localizado e aberto no Drive; autoria institucional não confirmada, portanto jamais atribuir ao Estratégia MED. Benchmark comparado com capítulos e trechos de HPP da apostila LURIA de assistência ao parto, com checagem científica independentemente na OMS/FIGO/ICM 2025, no guia de implementação OMS 2026 e nas publicações/fluxograma FEBRASGO.

**Evolução do manuscrito:** 19.310 → 54.662 → **81.511 caracteres Markdown** (contagem de arquivo inteiro); extração aproximada da linguagem corrente sem títulos e linhas de tabela ~70.935 caracteres. Isto é **triagem métrica**, não cálculo auditado de 60 mil caracteres úteis nem prova de qualidade. Há 21 capítulos numerados de desenvolvimento, dez casos com identificadores explícitos (quatro iniciais e seis avançados), seis questões formativas abreviadas e oito novas questões de cinco alternativas comentadas individualmente, recursos didáticos e roteiro de doze imagens candidatas ainda NÃO criadas/avaliadas.

**Conteúdo diferencial acrescentado e baseado em fontes confirmadas:**
1. Prevenção por uterotônico e condutas não recomendadas na profilaxia segundo OMS 2025.
2. Reconhecimento objetivo por perda ≥300 mL com alteração hemodinâmica, ou ≥500 mL, sem espera em instabilidade clínica.
3. Fluxo de resposta coordenado (E-MOTIVE), com definição de tarefas e reavaliação.
4. Farmacologia clínica dos uterotônicos, interações e contraindicações (ex.: metilergometrina e hipertensão; carboprost e asma).
5. Interpretação de hemoglobina, fibrinogênio, plaquetas, coagulograma e implicações para reposição/hemoterapia.
6. Critérios estritos de segurança para balão intrauterino, opções cirúrgicas e temporizadoras.
7. Cenários especiais: acretismo, inversão uterina, hipertensão, asma, sangramento secundário.
8. Plano de cuidado após HPP e matriz de teste de autossuficiência.

**Lacunas técnicas que impedem marcar como finalizada:** auditoria de cada dose de oxitócico/hemoderivado em protocolos brasileiros e bulas vigentes; comparação crítica adicional com protocolos assistenciais dos serviços brasileiros; validação da consistência do texto e questões por revisor obstetra independente; seleção e autorização de imagens via Admin; adaptação de Markdown ao renderizador JSON/HTML; testes automáticos do projeto e inspeção desktop/PWA; certificação de cobertura/aprendizado por resolução independente de casos. **Status correto: EM REVISÃO, NÃO PUBLICADA.**

**Referências públicas efetivamente consultadas:** 
- OMS/FIGO/ICM, diretriz HPP 2025 — https://www.who.int/publications/i/item/9789240115637
- OMS, guia de implementação HPP 2026 — https://www.who.int/publications/i/item/9789240116115
- FEBRASGO, fluxo nacional — https://www.febrasgo.org.br/fluxograma/procedimento-para-tratar-hemorragia-pos-parto/
- FEBRASGO, Femina 2025, protocolos sobre HPP e manejo hemostático (textos oficiais indexados, links editoriais com alterações de hospedagem).
