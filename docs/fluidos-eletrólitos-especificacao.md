# LURIA — Fluidos e eletrólitos

## Escopo e status

Esta entrega é a fundação local da aba **Fluidos e eletrólitos** do Modo Trabalho. A tela organiza avaliação, calculadoras determinísticas, balanço, biblioteca inicial e rascunho revisável. Ela não é protocolo assistencial, não prescreve automaticamente e não deve ser publicada como ferramenta clínica sem revisão humana formal.

## Objetivo clínico

Ajudar o estudante/profissional a estruturar os cinco objetivos da terapia IV: ressuscitação, manutenção, reposição, redistribuição e reavaliação. O fluxo deve começar pela pergunta “a necessidade pode ser atendida por via oral/enteral?” e terminar com um plano explícito de monitorização, prazo de revisão e critérios de interrupção/escalonamento.

## Módulos planejados

1. **Triagem e avaliação:** ABCDE, perfusão, congestão, peso e tendência, balanço, diurese, perdas, função renal, eletrólitos, glicose, gasometria quando indicada, comorbidades e grupos especiais.
2. **Calculadoras:** manutenção 4–2–1; manutenção diária por peso como estimativa; osmolaridade calculada; ânion gap; ânion gap corrigido por albumina; sódio corrigido por hiperglicemia com fórmula identificada; déficit de água livre; fração de excreção de sódio; fração de excreção de ureia; correção de cálcio total por albumina; diurese indexada; balanço cumulativo; conversão volume/tempo. Toda saída deve mostrar fórmula, unidade, dados faltantes, limitações e timestamp.
3. **Sódio:** classificação por hipo/hipernatremia, sintomas, cronicidade conhecida/desconhecida, glicose, osmolaridade, volume efetivo, urina, medicações e alertas de velocidade. Não fornecer automaticamente volume/concentração de salina hipertônica ou água livre.
4. **Potássio, magnésio, cálcio e fósforo:** identificar urgência, ECG/monitorização, função renal, perdas e coalterações. Eletrólitos concentrados somente como texto educacional e, futuramente, como preset institucional bloqueado até aprovação farmacêutica; nunca como “clique para administrar”.
5. **Balanço hídrico:** entradas por via, medicações, nutrição, sangue; saídas por diurese, drenos, perdas gastrointestinais, ostomias, fístulas e perdas insensíveis estimadas separadamente. Exibir intervalo, balanço do período e acumulado, qualidade do dado e campos desconhecidos.
6. **Soluções:** catálogo versionado por instituição: composição, osmolaridade, sódio/cloro/potássio/cálcio, glicose, indicação, contraindicações/precauções, compatibilidades, apresentação comercial, fonte, data de revisão e responsável.
7. **Protocolos:** cartões separados para adulto, pediatria, gestação, UTI, trauma/hemorragia, sepse, cetoacidose, queimaduras, gastroenterite/desidratação, LRA/DRC, IC/cirrose e pós-operatório. O sistema deve mostrar “seguir protocolo institucional” e não unificar contextos como se fossem intercambiáveis.
8. **Prescrição assistida:** gerar apenas rascunho com objetivo, solução selecionada, volume/velocidade a preencher, fontes adicionais, monitorização, revisão humana, assinatura e motivo de alteração. Bloquear publicação se faltarem peso, indicação, função renal, risco de congestão ou revisão.
9. **Integrações:** leitura explícita e rastreável de Exames; catálogo do Bulário somente para informação de apresentação/concentração; prontuário temporário com expiração, minimização de dados e sem copiar automaticamente para prontuário oficial.
10. **Auditoria:** versão da fórmula, fonte clínica, usuário, horário, dados de entrada, saída exibida, alterações, revisão e decisão de descartar/salvar. Nunca registrar segredo, token ou credencial.

## Regras de segurança obrigatórias

- Via oral/enteral deve ser considerada antes de IV quando clinicamente possível.
- Todo cálculo é apoio educacional; nenhuma saída pode equivaler a uma ordem.
- Alertar para instabilidade, congestão, hiponatremia/hipernatremia importante, alterações de K/Ca/Mg, LRA/DRC, IC/cirrose, gestação, pediatria, UTI, sepse e refeeding.
- Eletrólitos concentrados, aditivos em bolsa, correções rápidas e protocolos de alto risco ficam fora da primeira versão.
- Cada protocolo deve declarar população, exclusões, monitorização, gatilhos de interrupção e necessidade de avaliação sênior.
- Não fazer arredondamentos silenciosos; mostrar casas, unidade e fonte da fórmula.
- Sem publicação clínica até: testes automatizados, revisão clínica independente, revisão farmacêutica quando houver soluções/medicamentos, teste de acessibilidade, teste de regressão do shell LURIA e aprovação institucional documentada.

## Próximas fases de implementação

### Fase 1 — fundação local (entregue nesta etapa)

Shell visual, triagem, alertas, seis calculadoras determinísticas, balanço básico, biblioteca comparativa provisória, rascunho revisável e documentação de escopo.

### Fase 2 — motor clínico testável

Extrair fórmulas para módulo puro, criar tabela de casos-limite, testes de unidade e propriedades, validar unidades, impedir NaN/Infinity, revisar fórmulas com especialista e adicionar explicações de interpretação sem conduta automática.

### Fase 3 — conteúdos e grupos especiais

Catalogar soluções e protocolos por população, com referências primárias, data de revisão e revisão clínica/farmacêutica. Incluir pediatria, gestação e UTI apenas como módulos independentes.

### Fase 4 — integração segura

Somente após inspeção do schema Supabase: tabelas versionadas, RLS por usuário, trilha de auditoria, expiração do prontuário temporário, permissões mínimas, nenhuma chave secreta no cliente e testes de leitura/escrita com dados sintéticos.

### Fase 5 — validação e publicação

Revisão clínica independente, revisão de segurança, acessibilidade, desempenho, regressão da PWA, aprovação explícita e workflow de publicação. Um commit não será considerado “ao vivo” sem workflow Pages concluído e verificação pública.

## Base de evidência inicial

- NICE CG174 — princípios dos 5 Rs, avaliação, monitorização, reavaliação e necessidade de prescrição com tipo, volume, velocidade e plano de monitorização: https://www.nice.org.uk/guidance/cg174/chapter/recommendations
- NICE NG29 — fluidoterapia IV em crianças e jovens, incluindo avaliação e prescrição com monitorização: https://www.nice.org.uk/guidance/ng29/chapter/recommendations
- WHO — guideline on fluid management of acutely ill children: https://www.who.int/news/item/28-10-2022-guideline-on-fluid-management-of-acutely-ill-children
- Surviving Sepsis Campaign 2026 — atualização de ressuscitação, cristaloides balanceados como padrão em muitos contextos e medidas dinâmicas: https://www.sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-adult-guidelines
- Ministério da Saúde/CONITEC — portal de Protocolos Clínicos e Diretrizes Terapêuticas, a ser consultado por condição e versão vigente: https://www.gov.br/conitec/pt-br/assuntos/avaliacao-de-tecnologias-em-saude/protocolos-clinicos-e-diretrizes-terapeuticas/

As referências acima orientam a arquitetura, não substituem protocolos locais nem revisão clínica do conteúdo final.
