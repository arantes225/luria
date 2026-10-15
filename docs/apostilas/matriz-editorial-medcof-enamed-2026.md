# Matriz editorial LURIA — MedCof 2026 × ENAMED (sete áreas)
Atualizado em 15/10/2026. **Planejamento de revisão, não certificação de que a apostila esteja completa.**

## Fontes e escopo
- PDF fornecido: *Cronograma — Extensivo Programado R1 Acesso Direto 2026*, 31 páginas.
- Entradas prioritárias de conteúdo: **179 Alta + 63 Média + 46 Baixa + 113 Diamante = 401 aulas**. Aulas Diamante podem se complementar, não são assuntos exclusivos.
- Matriz de referência comum do Inep: Portaria Inep nº 478/2025, contemplando **Clínica Médica, Cirurgia Geral, Ginecologia e Obstetrícia, Pediatria, Medicina da Família e Comunidade, Saúde Mental e Saúde Coletiva**. Fonte: https://www.gov.br/inep/pt-br/relatorio-anual-de-atividades-e-gestao-do-inep-2025/avaliacoes-e-exames-educacionais/avaliacoes-exames-nacionais/enamed
- Rótulos MedCof não constituem estatística oficial de frequência do ENAMED. **Nada deve ser removido automaticamente por classificação Baixa**.
- Conteúdo local do acervo deve prevalecer sobre simples comparação de nomes.

## Regras editoriais obrigatórias
1. **Preservar os 260 temas originais e as apostilas já produzidas.** Não sobrescrever, apagar nem alterar títulos publicados para atender à distribuição de lotes.
2. **Diamante é uma aula complementar, não necessariamente uma nova apostila.** Agrupar rastreamento, fatores de risco, propedêutica, diagnóstico, tratamento e seguimento em um mesmo núcleo da doença, com subtítulos específicos.
3. **Quando um tema já existe, conferi-lo antes de produzir.** Para cada anotação `CONFERIR / COMPLETAR`, verificar capítulos e adicionar *somente* o que faltar; manter imagens e referências válidas.
4. **Novas apostilas somente nos lotes 11, 12 e 13.** O lote 10 fica inalterado para evitar retrabalho, pois sua conclusão não foi confirmada. As novas recebem IDs 261–276 e são propostas não iniciadas, mesmo que algum conteúdo já exista noutro capítulo.
5. **Sete áreas ENAMED:** reapresentar temas de `Medicina Preventiva` como **Medicina de Família e Comunidade** ou **Saúde Coletiva** de acordo com a competência; Saúde Mental é área independente. Um tema transversal pode aparecer como referência em duas áreas, sem duplicar material.
6. **NÃO criar uma segunda apostila de meningite sem necessidade.** #133 (Pediatria) já contempla meningites/encefalites; verificar e ampliar capítulos de adulto e mostrar o conteúdo também em Clínica Médica. **Não transferir para Antibioticoterapia.**
7. **BLS e ACLS (#182), gasometria (#101), diarreia e C. difficile (#276), Sjögren (#171), hiperaldosteronismo (#91) continuam cobertos.** O fato de o MedCof identificar uma aula como Baixa não permite suprimir o tema.
8. **Os cards exibem pendências editoriais**, não avaliações automáticas nem atestados de conclusão. Marcar capítulo como concluído apenas após inspeção real do texto e das fontes.

## Unificações exemplares
- **Mastologia:** #169 cobre a sequência MedCof de propedêutica mamária (Diamante), rastreamento (Diamante), fatores de risco e carcinoma ductal in situ (Diamante), doença invasiva (Alta), diagnóstico, tratamento e seguimento. A apostila *Câncer de Mama* já existe no GitHub e deve ser reaproveitada.
- **Câncer do colo:** #159 (rastreamento/lesões precursoras) e #164 (câncer: diagnóstico/tratamento) são capítulos encadeados, sem conteúdo duplicado.
- **Anemias:** #151 integra hemograma + hipoproliferativas I (Diamante) e II (Alta) + hemolíticas (Média).
- **Neurovascular:** #176 integra AIT/AVCi (Diamante) + HSA/AVCh (Alta).
- **Cirrose:** #126 integra I (Diamante) e II (Alta).
- **Amenorreia:** #129 integra primária + secundária (Diamante) e malformações müllerianas, ampliando o conteúdo já existente; sem nova apostila.
- **Climatério:** #144 integra síndrome climatérica + terapia hormonal (Diamante).

## Distribuição conservadora
- **Lotes 1–10:** IDs originais intactos, apenas cards com novas anotações.
- **Lote 11:** 12 temas originais + 5 novas propostas + 1 apostila já publicada indexada.
- **Lote 12:** 12 temas originais + 5 novas propostas + 1 apostila já publicada indexada.
- **Lote 13:** 11 temas originais + 6 novas propostas + 2 apostilas já publicadas indexadas.
- **Total editorial:** 280 entradas (260 originais + 16 novas propostas + 4 apostilas já publicadas, incorporadas ao índice). Quantidade não é número de apostilas concluídas.


## Segunda auditoria obrigatória: rastreabilidade 401/401

- O arquivo `docs/apostilas/medcof-401-inventario.json` contém as **401 aulas** extraídas do PDF, com título, área original, categoria Alta/Média/Baixa/Diamante, página e bloco.
- O arquivo `docs/apostilas/medcof-401-correspondencia.json` aponta **401/401** aulas para pelo menos um tema LURIA; não há entradas sem destino. A conferência semântica editorial foi realizada, com capítulos a validar.
- O script `assets/js/apostilas-medcof-401.js` fornece **401 aulas à interface**. Cada card mostra `CONFERIR X AULAS MEDCOF VINCULADAS` e, quando expandido, cada título e a classificação original. Se houver instrução de acréscimo, ela aparece acima dos módulos.
- **360** aulas apontam a temas já incluídos nos 260 originais, **35** a propostas novas #261–276, **6** a quatro apostilas já publicadas #277–280, inseridas no índice sem duplicar arquivos.
- **0/401** capítulos foram certificados como completos nesta auditoria; essa contagem é intencional e impede interpretar *tema mapeado* como *capítulo pronto*. Precisamos verificar texto, referências e atualidade antes de marcar cada um como concluído.
- As 16 propostas de produção ficam apenas nos lotes 11–13. As quatro indexadas já existentes são #277 Infertilidade Conjugal; #278 Ciclo Menstrual/Eixo HHO; #279 Crescimento Fetal; #280 Alterações Fisiológicas da Gestação.
- Um capítulo pode cobrir aulas complementares Diamante/Alta/Média/Baixa. A mesma aula não deve gerar várias apostilas; a correspondência pode indicar referências complementares quando necessário.
- Todos os arquivos foram alterados apenas em uma branch e abertos em PR rascunho; **nada foi implantado na main**.

## Como retomar o trabalho com outro chat/Codex
1. Abrir `docs/apostilas/medcof-401-correspondencia.json` para obter o destino exato da aula e `assets/js/apostilas-editorial-enamed-2026.js` para as instruções adicionais do card.
2. Conferir todos os tópicos da chave `notes[número].instruction` e o texto real da apostila.
3. Se estiver completo, registrar essa verificação; se incompleto, acrescentar capítulos e fontes, sem conteúdo redundante.
4. Trabalhar nos novos IDs 261–276 apenas após revisar sobreposição com páginas existentes. O campo `lot` define o lote correto.
5. **Todas as 401 aulas estão mapeadas a temas**, mas isso não certifica o conteúdo. Registrar a correspondência verificada **aula MedCof → tema LURIA → capítulo real → referências**, com conferência científica antes de marcar como concluído. Há 178 cards com instruções manuais adicionais e 401 módulos indicados diretamente.
