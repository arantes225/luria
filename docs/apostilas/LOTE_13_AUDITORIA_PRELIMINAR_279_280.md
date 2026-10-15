# LURIA — Lote 13: auditoria comparativa das apostilas existentes 279 e 280
**Data:** 15/10/2026 · **Branch:** `editorial/lote-13-preenchimento-20261015` · **Estado:** levantamento científico/editorial inicial, SEM publicação ou aprovação final.

## Método
Foram examinados os arquivos HTML existentes e o sumário/texto real de cada capítulo, sem sobrescrevê-los. Materiais do Google Drive foram abertos e lidos como **benchmark de cobertura**, jamais copiados. A bibliografia clínica e os possíveis ajustes são revisados contra fontes científicas externas. A medição de texto após remoção grosseira de HTML/CSS/scripts **NÃO** equivale à auditoria oficial de 60 mil caracteres didáticos úteis: ainda inclui navegação, referências, exercícios e possíveis repetições.

## 279 — Crescimento intrauterino reduzido e aumentado
**Preservar:** `apostilas/crescimento-intrauterino-reduzido-aumentado/index.html`.

- Conteúdo examinado: páginas e capítulos de PIG/RCF, etiologia placentária, rastreio, biometria, critérios Delphi/ISUOG, Doppler umbilical/cerebral/ducto venoso, RCF precoce e tardia, decisões de parto, GIG/macrossomia, distocia de ombro e casos clínicos.
- Aproximadamente **77,7 mil caracteres de HTML** e **55,9 mil caracteres extraídos após limpeza grosseira**: **NÃO** sustenta declarar meta de 60.000 caracteres úteis alcançada. O validador do repositório deve medir conteúdo sem navegação e redundância.
- Comparativo do Drive encontrado e **efetivamente lido:** PDF intitulado "Sofrimento Fetal Agudo", com avaliação de vitalidade fetal, CTG e perfil biofísico; contém menções a RCF, mas NÃO é apostila equivalente de restrição do crescimento ou Doppler seriado. A etapa zero integral continua **pendente**; procurar referência específica de crescimento fetal. Sem autoria institucional confirmada.
- Lacunas prioritárias: verificar critérios de crescimento seriado; comparação entre Delphi/ISUOG/SMFM/FEBRASGO, com explicação de divergências; interpretação de cenários de Doppler por idade gestacional e indicação de internação/vigilância; limite de evidência em RCF tardia; orientações de conduta para macrossomia em diabetes; questões objetivas (múltipla escolha com comentários de todas as alternativas) ainda não identificadas como bloco suficiente. Conferir referências por recomendação e não reproduzir tabelas/figuras de terceiros.
- **Interação curricular:** crescimento fetal #279 conversa com avaliação de vitalidade fetal e ultrassonografia fetal #269, não deve duplicar esses livros.
- **Ação atual:** inventário e análise, sem edição de HTML por benchmark insuficiente; não homologar.

## 280 — Alterações fisiológicas da gestação
**Preservar:** `apostilas/alteracoes-fisiologicas-da-gestacao/index.html`.

- Referência comparativa do Drive **aberta e lida:** PDF "Resumo — Modificações Gravídicas do Organismo Materno", com hemodiluição, circulação, endocrinologia, pele, músculo-esquelético, pulmão, rim, digestório, útero/vagina/mamas; autoria/editoria institucional não verificada.
- Apostila LURIA examinada: cerca de **107,6 mil caracteres HTML** e **82,1 mil caracteres extraídos grosseiramente**. Há **20 seções** incluindo resumo, 16 capítulos clínicos/sistemas, casos, revisão, autoteste e referências. Não igualar extração bruta à meta editorial de 60 mil caracteres exclusivos.
- **Matriz de cobertura:** hematologia/hemodiluição/plaque­topenia — forte; hemodinâmica e compressão aortocaval — forte; alcalose respiratória fisiológica — forte; renal/TFG/creatinina — forte; GI/hepático — forte; endocrinologia/tireoide — presente; pele/mamas/músculo — presente; complicações e sinais de risco — fortes; farmacocinética/anestesia — presentes e úteis. O material LURIA tem cobertura mais ampla que o resumo do Drive, sem necessidade de recriar.
- **Verificações científicas positivas:** a LURIA diferencia plaquetopenia gestacional leve e valor abaixo de 100 mil/µL que requer investigação, conforme literatura; apresenta PaCO₂ habitual perto de 28–32 mmHg, com alcalose respiratória compensada; reconhece creatinina de 1,0 mg/dL como possivelmente inadequada na gestante, sem considerar um único valor diagnóstico absoluto.
- **Questões e casos:** há 6 perguntas do autoteste com respostas abertas, e numerosos casos clínicos. O padrão novo do Prompt Magno pede **ao menos 6 questões de múltipla escolha com alternativas plausíveis e justificativa de cada alternativa**. Recomenda-se reformular o autoteste ou criar perguntas com novos objetivos, evitando repetir mecanicamente os casos existentes.
- **Pontos de auditoria final:** conferir se as referências clínicas têm links verificáveis e aderência específica a cada recomendação; revisar critérios de anemia conforme diretriz nacional e OMS 2024; confirmar segurança das figuras antigas e atribuições; testar âncoras, rolagem lateral, tipografia e PWA; auditar extensão didática sem redundâncias; avaliar tratamento diferencial da dispneia fisiológica/TEP, edema fisiológico e pré-eclâmpsia.
- **Referências externas para auditoria:** ACOG Practice Bulletin 233, anemia na gravidez (2021, reafirmado 2024); *NEJM* 2018, platelet counts during pregnancy (doi:10.1056/NEJMoa1802897); *ERS*, respiratory physiology of pregnancy; OMS guideline 2024 para pontos de corte de Hb. Materiais externos são orientação científica, não autorização para reprodução de figuras.
- **Ação atual:** revisão de escopo e documentação; **nenhuma modificação destrutiva** do livro já publicado.

## Regras para encerramento de ambas
1. Não certificar 60k pela metragem de HTML ou texto com menu/exercícios; executar auditoria específica do projeto.
2. Cada item novo deve suprir uma lacuna localizável, sem reexplicações repetidas.
3. Casos/questões devem exigir raciocínio que o próprio capítulo ensina.
4. Imagens só após curadoria, origem, licença e aprovação pelo fluxo do Admin.
5. Não publicar, fazer merge, alterar Supabase ou reindexar versões anteriores antes de revisão científica e concorrência com os demais lotes em execução.

**Status das duas:** `AUDITORIA_PRELIMINAR_NAO_HOMOLOGADA`.