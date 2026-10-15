# LURIA — Lote 08, aula 181 | Curadoria efetiva de ECGs reais do PTB-XL

**Atualização:** 15/10/2026. **Etapa:** imagens reais derivadas disponíveis como artefato de revisão, não incorporadas ao site e **não homologadas**.  
**Origem:** Wagner P et al. *PTB-XL v1.0.3*, PhysioNet, DOI: [10.13026/kfzx-aw45](https://doi.org/10.13026/kfzx-aw45). **Licença declarada pela fonte:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).  
**Workflow testado:** [Execução bem-sucedida 38692608147](https://github.com/arantes225/luria/actions/runs/38692608147) (somente branch editorial, sem deploy).  
**Artefato produzido:** GitHub Actions \`PTBXL-ECG-REVIEW-ONLY\`, ID **11952823006**, aproximadamente **1,27 MB compactado**, com 12 WebPs reais + metadados de proveniência + seleção. **Expira em 22/10/2026**. **Preservar/arquivar em local editorial após conferência de direitos, se quiser reutilizar além desse período.** O artefato ZIP também foi recuperado para revisão durante a sessão, mas não foi inserido no repositório.

## O que foi comprovadamente executado

1. Workflow utilizou \`ptbxl_database.csv\` da versão 1.0.3: **21.799 linhas de dados**.
2. Seleção por código SCP-ECG, priorizando \`validated_by_human\` verdadeiro e folds 9/10, excluindo metadados de ruído/eletrodos sinalizados. **3.309 registros passaram no filtro**; 15 candidatos foram retornados pelo seletor em sua primeira versão. A lista de 12 traçados veio do primeiro conjunto de classes selecionado.
3. Foram baixados pares de arquivos WFDB \`.hea\` + \`.dat\` de 12 registros em \`records100/\`, versão declarada 1.0.3.
4. O renderizador leu ondas elétricas medidas em 12 derivações, 10 s, **100 Hz**, montou 3×4 trechos de 2,5 s em sequência temporal de coluna, converteu em WebP e produziu manifesto sem carimbo de aprovação.
5. Os testes com **sinais sintéticos exclusivamente para software** passaram no primeiro workflow; os artefatos públicos de estudo derivam **dos sinais reais baixados**, não de geradores artificiais.
6. Todos os 12 arquivos atendem \`<= 120 × 1.024 bytes\`; a maior figura possui 120.722 bytes. Os resultados **não são traçados originais a 500 Hz**, portanto o uso para picos estreitos, atividade de marca-passo, fragmentação de QRS ou medidas milimétricas finas requer renderização da versão 500 Hz.

## Os 12 registros realmente convertidos, com arquivo e descrição provisória

| Identificador PTB-XL | Código SCP informado pelo banco | Arquivo WebP no artefato | Tamanho (bytes) | Legenda candidata AINDA NÃO VALIDADA |
|---|---|---|---:|---|
| 00057 | NORM | \`luria-ecg-ptbxl-00057.webp\` | 104.728 | Registro anotado como ECG normal; ensinar sistematização |
| 08215 | AFIB | \`luria-ecg-ptbxl-08215.webp\` | 102.360 | Registro anotado como fibrilação atrial; verificar ausência de P e irregularidade |
| 00449 | AFLT | \`luria-ecg-ptbxl-00449.webp\` | 98.928 | Registro anotado como flutter; conferir ondas F e resposta AV |
| 07075 | SVTAC | \`luria-ecg-ptbxl-07075.webp\` | 115.264 | Registro anotado como TSV; diferenciar ritmo, artefato e frequência |
| 00892 | STACH | \`luria-ecg-ptbxl-00892.webp\` | 108.346 | Registro anotado como taquicardia sinusal; medir RR/P |
| 00611 | SBRAD | \`luria-ecg-ptbxl-00611.webp\` | 101.224 | Registro anotado como bradicardia sinusal; medir frequência/PR |
| 00218 | 1AVB | \`luria-ecg-ptbxl-00218.webp\` | 108.302 | Registro anotado como bloqueio AV I; conferir PR e condução 1:1 |
| 19164 | 2AVB | \`luria-ecg-ptbxl-19164.webp\` | 98.022 | Registro anotado como BAV II; NÃO subclassificar sem prova |
| 00959 | 3AVB | \`luria-ecg-ptbxl-00959.webp\` | 120.722 | Registro anotado como BAV III; conferir dissociação AV |
| 01391 | IMI | \`luria-ecg-ptbxl-01391.webp\` | 104.766 | Registro anotado como infarto inferior, **sem garantia de evento agudo** |
| 00271 | ASMI | \`luria-ecg-ptbxl-00271.webp\` | 109.486 | Registro anotado como infarto anterosseptal, **sem garantia de evento agudo** |
| 02221 | LNGQT | \`luria-ecg-ptbxl-02221.webp\` | 98.430 | Registro anotado como QT longo; confirmar QT/QTc por método adequado |

**Rótulos não clínicos homologados:** cada descrição acima relata o **código da base de dados**, não a conclusão de uma revisão independente. O campo \`source_scp_likelihood=0\` em algumas entradas de ritmo significa que não foi atribuída probabilidade pelo esquema SCP, **não** que o diagnóstico tenha probabilidade zero. Não escrever uma legenda categórica antes da revisão.

## Auditoria médica imagem a imagem: exigências de aprovação

| Gate | Como documentar | Status atual |
|---|---|---|
| Identidade e origem do registro | ECG ID, URL \`records100\`, dataset v1.0.3, DOI e licença CC BY 4.0 | Documentado no manifesto |
| Rótulo de origem | Código SCP + revisão humana original / probabilidade, sem diagnóstico inventado | Parcial, metadados presentes |
| Confirmar achado morfológico | Cardiologista medir/calcular e assinar interpretação do traçado | **Pendente** |
| Diferenciais e contexto | Não chamar MI de infarto agudo; explicar correlação clínica | **Pendente** |
| Qualidade visual | 12 derivações; papel digital a 100 Hz; ganhos; legibilidade no celular | Inspeção inicial de exemplo 00449, resto pendente |
| Direitos e referência por imagem | Autor, versão, CC BY 4.0, modificação, URL da fonte | Estruturados, inserir nas legendas finais |
| Resolução para ensino avançado | Considerar usar \`records500/\` para análise detalhada | **Pendente** |
| Integração LURIA | Converter para estrutura interna, aprovar no Admin, testar desktop/PWA | **Não realizada** |

## Limitações honestas e prevenção de confusão

- Os dados são **ECGs clínicos reais**, mas os gráficos são **derivados digitais** de 100 Hz, não fotografias do papel original e não têm calibração física de impressão.
- Folds 9/10 e \`validated_by_human\` elevam confiança nos metadados; não garantem que todo diagnóstico seja visível ou seja o melhor exemplo para alunos.
- O artefato GitHub tem retenção de 7 dias e a entrega não o transforma automaticamente em arquivo versionado permanente.
- **O workflow não escreve na \`main\` nem publica no GitHub Pages.**
- A fonte não cobre necessariamente em quantidade suficiente exemplos de Wellens, de Winter, FA pré-excitada ou captura/fusão ventricular. Procurar esses ECGs em acervo alternativo com licença própria, sem inventar sinais.

## Próxima integração após revisão médica

Após cada exemplo ser validado, preparar legenda específica ("Qual achado observar?", "Como reconhecer?", "Diagnósticos diferenciais", "Pulo do Gato"), otimizar tamanho/pontos de zoom, preservar fonte e licença e posicionar nos capítulos 3, 5–10, 12–13 e 24–30 conforme contexto. Para padrões que exigem alta resolução, substituir pela fonte \`records500/\` antes de homologação. Os arquivos ainda não fazem parte de \`apostilas/index.html\` ou \`content.json\` e nenhuma aprovação clínica foi presumida.

**Status da primeira rodada:** 12 figuras reais produzidas e auditadas tecnicamente; foram adicionadas duas candidatas exclusivas na segunda rodada, descritas adiante. **0 homologadas e 0 publicadas**.

## Segunda rodada validada tecnicamente — novos bloqueios de ramo

Uma execução seguinte de CI, **[38692816677](https://github.com/arantes225/luria/actions/runs/38692816677)**, concluiu **success** com os códigos oficiais **CLBBB** e **CRBBB**, conferidos no \`scp_statements.csv\` da versão 1.0.3. Ela produziu 12 WebPs, sendo **dois inéditos** em relação à primeira rodada:

| ECG ID | SCP original | Novo arquivo | Bytes | Legenda provisória, NÃO homologada |
|---|---|---|---:|---|
| **00598** | **CLBBB** | \`luria-ecg-ptbxl-00598.webp\` | **111.450** | Padrão anotado como bloqueio completo de ramo esquerdo; exigir revisão de morfologia e largura |
| **00172** | **CRBBB** | \`luria-ecg-ptbxl-00172.webp\` | **100.820** | Padrão anotado como bloqueio completo de ramo direito; exigir revisão de V1 e derivações laterais |

**Consolidação sem repetição:** os dois runs possuem 12 imagens cada, com 10 imagens comuns e 2 exclusivas do conjunto inicial (anotações ASMI e LNGQT) e 2 exclusivas da segunda execução (CLBBB e CRBBB). A união contém **14 imagens únicas**, **todas com menos de 120 KiB**, sem aprovação clínica e sem integração ao HTML. Ambas as versões do ZIP original foram recuperadas durante a sessão e foi montado um **pacote combinado local de 14 imagens** com manifesto e SHA-256 dos WebPs. O arquivo combinado **não está comitado na branch**, portanto sua disponibilidade depende da cópia entregue na conversa; os artefatos GitHub Actions expiram após sete dias.

**Artefato adicional no Actions:** \`PTBXL-ECG-REVIEW-ONLY\` do run 38692816677, ID **11952304322**. O título do artefato coincide com o da execução anterior, mas os **IDs e os conteúdos são diferentes**; não confundir.

**Contagem real atual desta etapa:** **14 traçados clínicos reais convertidos**, 14 candidatos de validação, **zero aprovados**. A diferença entre dois códigos SCP de um mesmo exame e laudo médico precisa ser respeitada; usar rótulos \`IMI\`/\`ASMI\` como história de infarto anotada e não afirmar SCA aguda.


## Terceira rodada (15/10/2026): 500 Hz reais, escala vertical comparável — substituição técnica do pacote anterior

**Execução concluída com sucesso:** [GitHub Actions 38696857730](https://github.com/arantes225/luria/actions/runs/38696857730).  
**Artefato:** \`PTBXL-14-ECGs-500Hz-ESCALA-UNIFORME-REVIEW-ONLY\`, ID **11955300806**, expiração indicada **22/10/2026**. Os 14 registros foram baixados diretamente dos \`records500/\` da versão **PTB-XL 1.0.3** e convertidos, após testes, sem interpolar ou inventar sinais.  
**Manifesto de origem:** \`scripts/editorial/ptbxl-14-ids-review.json\`, com os mesmos 14 IDs do pacote anterior; renderizador \`scripts/editorial/render_ptbxl_ecgs.py\` atualizado para **500 Hz** e **uma escala vertical mV uniforme para todas as 12 derivações do mesmo exame**; workflow \`.github/workflows/editorial-ptbxl-500hz.yml\`.  
**Resultado medido e verificado a partir dos arquivos reais produzidos:** 14/14 WebP válidos, 1.800×1.125 px cada, tamanhos de **99.092 a 120.816 bytes** (≤120 KiB); manifesto assinala \`sampling_hz=500\`, \`uniform_vertical_mV_limit\` e ambas as flags \`clinical_label_verified=false\` / \`publication_approved=false\`. Integridade ZIP verificada.  
**Pacote de revisão produzido:** ZIP específico de 500 Hz com 14 WebPs, manifesto JSON com SHA-256 por figura, proveniência/licença CC BY 4.0 e aviso de não publicação; também foi produzida uma prévia em mosaico. Esta entrega está nos arquivos da conversa, **não no código ativo do site**. Nenhum ECG desta etapa foi aprovado clinicamente.

### Por que substituir as 14 primeiras renderizações de 100 Hz?

A primeira versão ajustava **o limite vertical de cada derivação separadamente**. Isso pode falsear a comparação visual de amplitudes entre derivações, embora cada traçado derive de uma medição real. A versão de 500 Hz foi reconstruída com **uma escala de mV compartilhada entre as doze derivações em cada ECG**, além de cinco vezes mais amostras por segundo. Portanto, **priorizar a versão nova para futura revisão e não importar a primeira no Admin**.

A grade é uma **visualização digital com tempo e voltagem em unidades consistentes**, mas não foi construída como **papel físico calibrado a 25 mm/s e 10 mm/mV**. Não ensinar hipertrofia, onda Q patológica ou duração em “quadradinhos do papel” a partir da largura física da imagem sem consultar as unidades e a calibração. Em PDF ou PWA, redimensionamento da imagem altera os milímetros físicos, mas não os dados de origem.

### Limitação importante descoberta durante a inspeção: falta tira de ritmo contínua

Cada registro clínico contém 10 segundos; o desenho clássico 3×4 exibe quatro **janelas consecutivas de 2,5 s**, com derivações diferentes em cada coluna. Isso é suficiente para observar morfologia em 12 derivações, mas **não é uma tira de 10 s contínuos na mesma derivação**. Para concluir e ensinar **BAV II, BAV total, FA, flutter, arritmias intermitentes e regularidade de RR**, adicionar um painel de **DII contínuo por 10 s**, também extraído do próprio registro real de 500 Hz. Até que exista, **não certificar o material como traçado final para diagnóstico de dissociação AV**.

**Critérios por grupo:**
- \`1AVB\`: confirmar PR com cálculo digital e demonstrar condução P→QRS 1:1.
- \`2AVB\` e \`3AVB\`: revisar **ondas P contínuas**, relação P–QRS, intervalos e eventuais batimentos de captura; **não inferir Mobitz I versus II a partir de relação 2:1**.
- \`AFIB\` e \`AFLT\`: confirmar ausência/presença de atividade atrial organizada e variação RR com tira contínua; o exame 00449 apresenta ondas atriais visíveis em derivações inferiores, mas falta laudo de especialista.
- \`SVTAC\`, \`STACH\`, \`SBRAD\`: conferir RR, morfologia de P, início/terminação quando disponível e sintomas; um registro de 10 s pode não mostrar começo da arritmia.
- \`CRBBB\`/\`CLBBB\`: medir duração QRS, avaliar padrão precordial/lateral e excluir colocação de eletrodos errada.
- \`IMI\`/\`ASMI\`: código de anotação não é **diagnóstico de SCA aguda**; avaliar ondas Q/ST/T e contexto temporal.
- \`LNGQT\`: medir QT em mseg e RR em segundos, indicar fórmula de correção (Bazett/Fridericia) e limites; anotação isolada do banco não é prova de síndrome congênita.
- \`NORM\`: examinar calibração, intervalos, QRS, eixo e repolarização; a etiqueta normal deve ser validada, não presumida.

**Bloqueios permanentes:** 0 laudos independentes homologados; 0 figuras aprovadas pelo Admin; 0 imagens integradas à aula HTML/content.json; 0 publicação ou deploy. São **14 ECGs clínicos reais para curadoria**, ainda não a camada visual premium concluída.
