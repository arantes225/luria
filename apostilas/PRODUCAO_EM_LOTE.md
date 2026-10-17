# Produção em lote — Apostilas LURIA

Atualizado em 13/10/2026.

## Decisão editorial

As apostilas passam a ser criadas e revisadas **em lotes**, com padrão de livro-texto e visual semelhante ao material de material de estudo. Exigir no mínimo **60.000 caracteres didáticos úteis por apostila**, sem tratar a metragem como prova de qualidade. Não duplicar explicações nem trocar recursos visuais por texto corrido para atingir esse piso. O conteúdo precisa permitir resolver questões de residência sem recorrer obrigatoriamente a outra apostila.

O fluxo de imagens é **centralizado no Admin**. Não incluir novas imagens clínicas diretamente no HTML, não inserir links de imagens ainda não aprovadas dentro dos capítulos, nem exigir que o administrador visite cada apostila separadamente.

## Gate de autossuficiência antes da publicação

Uma apostila só está pronta quando **um aluno que nunca estudou o assunto consegue aprendê-lo integralmente e enfrentar questões de residência apenas com este caderno**. Não depender de outros livros, cursos, apostilas ou buscas para completar explicações essenciais; bibliografia e links são fontes de verificação e leitura adicional facultativa.

Para cada tema, exigir **matriz de cobertura com âncoras internas** (conceitos necessários, fisiopatologia, sinais clínicos, diagnóstico e interpretação de testes, diferenciais, condutas com justificativa e alternativas, riscos, complicações e seguimento) e **teste com questões representativas**. O revisor deve conseguir justificar cada resposta pelo texto e pelos esquemas da própria apostila. Se uma pergunta importante exigir conteúdo externo, preencher a lacuna no ponto correspondente e repetir o teste. Não aprovar só porque há 60.000 caracteres; proibir reexplicações redundantes e preservar recursos visuais didáticos.

A avaliação de autossuficiência requer julgamento clínico/editorial e não pode ser certificada apenas pelo validador automático de extensão.

## Etapa zero — leitura comparativa no Google Drive (obrigatória)

**Antes de qualquer produção ou edição de apostila, pesquisar e abrir ao menos uma apostila correlata no Google Drive, priorizando materiais do material de referência com autoria realmente identificada.** Conferir sumário, abrangência, profundidade, fluxogramas, quadros, imagens, casos e técnica de exposição. Abrir também uma apostila LURIA já padronizada, para não quebrar a identidade visual da plataforma. Se nenhum material semelhante estiver acessível, interromper e solicitar acesso; não assumir que a busca por nome equivale a ter lido a fonte.

Preencher o registro comparativo antes de alterar o HTML:

| Campo | Registro exigido |
| --- | --- |
| Apostila LURIA | Tema e caminho do arquivo |
| Material do Drive consultado | Nome, link e autoria institucional confirmada (ou não identificada) |
| Consulta | Data e partes realmente examinadas |
| Estrutura pedagógica | Tópicos, tabelas, imagens, fluxos, casos e extensão relativa |
| Lacunas da LURIA | Conceitos ausentes, ensino insuficiente, diagnóstico, condutas, exceções e referências |
| Aplicação original | O que será incluído/melhorado sem cópia de texto, imagens, tabelas ou identidade de terceiros |
| Verificação de saída | 60K úteis; autossuficiência; deduplicação; diretrizes atuais; testes e layout desktop/PWA |

O comparativo serve para **não esquecer matérias e entregar qualidade superior**, nunca como autorização para reproduzir material protegido por direitos autorais. Material do Drive é benchmarking; validação clínica exige fontes primárias atuais. Novas imagens clínicas só entram após revisão e aprovação no Admin.

## Etapa 0 — consulta obrigatória ao Google Drive

**Toda criação ou edição médica começa pela leitura de uma apostila comparável no Drive, preferencialmente do material de referência.** Antes de redigir, buscar o tema e sinônimos; confirmar a procedência; abrir e estudar índice, capítulos, quadros, fluxogramas e casos. Só achar o título não conta. Montar matriz de comparação (Drive × LURIA × diretrizes atuais) e plano de lacunas por capítulo. O material de material de estudo orienta abrangência e estilo didático, mas deve resultar em texto, imagens e esquemas originais, sem cópia ou paráfrase próxima.

Se a referência do tema não existir, ler a mais próxima, indicar a limitação e não declarar a etapa cumprida integralmente sem fonte adequada. Se não houver acesso a qualquer referência útil, manter status de revisão parcial em vez de concluída. Registrar título, origem verificada, data, conteúdo realmente inspecionado, lacunas e ajustes, sem publicar URLs/IDs privados do Drive em arquivos públicos.

## Fluxo

1. Após a **etapa zero registrada para cada tema**, preparar um **lote de 5 a 10 apostilas** em JSON, cada uma com definição, mecanismo, classificação, diagnóstico completo, diferenciais, tratamento, complicações, seguimento e situações especiais relevantes. Haverá temas mais curtos e temas muito extensos. Preferir fontes nacionais vigentes, sociedades médicas e atualizações internacionais.
2. Para os novos livros, usar `scripts/build-apostilas-batch.cjs --input lote.json --dry-run`. O validador não aceita capítulos sem desenvolvimento clínico, poucos capítulos, ausência de referências ou imagens embutidas.
3. Publicar os textos aprovados por um lote único (`node scripts/build-apostilas-batch.cjs --input lote.json`). A execução não sobrescreve apostilas existentes; `--overwrite` é explícito e exige cuidado para não perder conteúdo já revisado.
4. Gerar um **manifesto único das candidatas de imagem**: `apostilas/_imagens-candidatas-ultimo-lote.json`. Cada registro informa apostila, seção, chave única, fonte, licença, legenda e URL de prévia. Uma candidata de imagem não é conteúdo publicado.
5. Abrir **Admin → Imagens para aprovação → Apostilas**; selecionar o arquivo JSON, importar, filtrar por apostila e aprovar ou rejeitar candidatas em grupos de até 25. Conferir autoria, licença, fidelidade clínica, legibilidade e tamanho antes de aprovar.
6. A imagem inédita só aparece na apostila **após a aprovação** pelo fluxo existente. Na aprovação, o backend otimiza para no máximo **110 KiB** e coloca o item na seção selecionada. Imagem que já recebeu aprovação anterior pode reutilizar o arquivo previamente validado (regra existente da fila).
7. Rodar `node scripts/audit-apostilas-60k.mjs --json`, `node scripts/audit-apostilas-batch.cjs --json` e `node scripts/check-syntax.cjs` para auditar o lote completo. Depois aplicar a **matriz de cobertura e o teste de resolução por conteúdo interno** definidos acima; a auditoria de comprimento e marcadores **não substitui revisão médica** nem comprova autossuficiência.
8. Evitar alterações globais sem revisar CSS/PWA: `assets/css/apostila-luria-book.css` é compartilhado, e os conteúdos aprovados devem continuar acessíveis e legíveis no celular.

## Entrada JSON do gerador

```json
{
  "books": [{
    "slug": "nome-do-tema",
    "title": "Nome do tema",
    "area": "Ginecologia e Obstetrícia",
    "materia": "Ginecologia",
    "description": "Descrição didática",
    "sections": [
      {"id": "conceitos", "title": "1. Conceitos", "body_html": "<p>Texto aprofundado com raciocínio clínico.</p>"}
    ],
    "references": [
      {"label": "Fonte oficial, edição e ano", "url": "https://www.exemplo.org/fonte"}
    ],
    "images": [
      {
        "candidate_key": "tema-figura-01",
        "target_section": "conceitos",
        "src": "https://www.exemplo.org/imagem.webp",
        "alt": "Descrição objetiva",
        "caption": "O que o aluno deve observar",
        "didactic_note": "Por que esta figura é importante",
        "source_url": "https://www.exemplo.org/fonte",
        "source_name": "Nome da instituição",
        "source_license": "Licença comercial verificada"
      }
    ]
  }]
}
```

O exemplo ilustra apenas o **formato**. Na geração real, são necessários pelo menos sete capítulos substantivos, quatro referências rastreáveis, casos clínicos comentados e **60.000 caracteres de conteúdo didático útil sem repetição**. É proibido inflar a contagem com explicações reescritas, blocos desconexos ou transformação de tabelas/fluxogramas/esquemas em textão.

## Regras de qualidade de imagem

- Imagem clínica real é preferível a figura genérica. Verificar **correspondência anatômica, qualidade diagnóstica, crédito e licença para uso comercial**; não assumir que imagem de fonte governamental é automaticamente livre para reprodução.
- Conservar imagens previamente aprovadas. Em imagens inéditas, não inventar URLs nem inserir imagens geradas artificialmente no lugar de exames reais quando o contexto exige fotografia/exame.
- Registrar sempre a seção de destino, a legenda explicativa, o que deve ser observado e a fonte original. A ausência de boa imagem não impede publicar o capítulo textual: a candidata permanece pendente no Admin.

## Observações técnicas

O controle de acesso no Supabase está protegido por RLS para inserção/revisão administrativa. Não expor chaves de serviço no frontend. As aprovações usam `admin_review_apostila_image`, enquanto o Admin importa candidatas em `apostila_image_review_queue`. Cada candidata tem chave única por `apostila_path + candidate_key`, reduzindo duplicações em execuções por lote.

A geração de textos e a aprovação de imagens são **etapas independentes**. Textos não são automaticamente certificados como completos por terem sido gerados ou por passarem na validação sintática. Verificar qualidade de fontes, critérios clínicos e cobertura de questões de provas antes de considerar um lote finalizado.

## Revisão capítulo a capítulo sem reexplicações

- Mapear conceitos e afirmações já cobertos antes de editar. Cada novo parágrafo precisa trazer um dado, mecanismo, diferencial ou implicação clínica **novo**.
- Preservar esquemas, tabelas, algoritmos, mapas mentais, callouts e fotografias aprovadas. Ampliar os próprios recursos quando isso ensina melhor do que prosa.
- Inserir aprofundamento na seção correspondente, ao lado do elemento didático relacionado. Não criar capítulo final genérico apenas para fechar 60 mil caracteres.
- Evitar parágrafos extensos sem ligação causal, repetições literais ou paráfrases, cabeçalhos duplicados e exercícios que repetem a mesma explicação.
- A aprovação exige triagem de extensão >=60.000, revisão de ausência de redundância, checagem de atualidade das recomendações e inspeção visual desktop/PWA. A triagem automática **não** garante esses critérios qualitativos.
