# LURIA — Interpretador de ECG | etapa inicial de validação (24/10/2026)

## Estado
- **Não disponível para uso clínico. Não fazer deploy em produção.**
- Página existente /trabalho/ecg/ recebeu uma demonstração explicitamente fictícia de achados por derivação e fluxo de revisão do médico (aceitar, rejeitar, rever).
- A demonstração **não chama IA, não recebe exames reais, não envia, registra ou armazena dados de pacientes**.
- Backend isolado em cloudflare/work-ecg/index.mjs: aceita SOMENTE IDs de casos de benchmark previamente permitidos, cujas imagens PNG estejam na pasta ecg-benchmarks/ de um R2 privado dedicado. Não aceita uploads, links arbitrários nem base64 do usuário.
- A API está desativada por padrão e exige autenticação de administrador verificada no Supabase. Separar eventual deploy de benchmark do domínio/ambiente clínico.

## Objetivo e arquitetura
Médico revisa cada sugestão por derivação; o sistema não emite diagnóstico definitivo. A IA pode sugerir alterações de ST/T, ritmo, condução, hipóteses e dados ausentes, sempre vinculados a evidências verificáveis. **Concordância entre IAs não comprova acurácia.**

Para o piloto estritamente **não clínico**, foram escolhidas APIs públicas:
- OpenAI GPT-6 Luna: modelo gpt-6-luna; leitura independente da imagem.
- Anthropic Claude Haiku 5.5: modelo claude-haiku-5-5; leitura independente.
- OpenAI GPT-6.1 Sol: modelo gpt-6.1-sol; chamada adicional opcional e **manual** para casos de benchmark, desativada por padrão.

Cada serviço recebe o mesmo arquivo original. Os resultados são relatados separadamente, com divergências de cobertura por derivação. A comparação atual não valida similaridade semântica nem acurácia diagnóstica e não é um algoritmo de consenso clínico.

## Custos
A meta comercial é R$0,05/ECG. NÃO é orçamento garantido. O Worker retorna tokens cobrados e estimativa USD por modelo e total, baseada em tarifas de referência de 24/10/2026 e sem abatimento por cache nem sobretaxas. Imagens de alta resolução e tokens adicionais podem elevar muito os custos; falta confirmar como o modelo cobra tokens de imagem em chamadas reais. Ajustar taxas a partir dos recibos dos fornecedores. Não prosseguir com rollout se o desempenho clínico ficar aquém dos critérios definidos mesmo que o custo seja baixo.

## Como testar o backend, SEM PACIENTES
1. Criar um bucket privado R2 exclusivo de ECGs fictícios/de referência licenciados. Não usar storage de exames de pacientes nem o guardião global da LURIA que comprime uploads de imagem até 80KB.
2. Vincular o bucket ao Worker usando a declaração em wrangler.toml. NÃO instalar rota em produção.
3. Configurar segredos OPENAI_API_KEY, ANTHROPIC_API_KEY, SUPABASE_URL e SUPABASE_ANON_KEY no ambiente de benchmark; nunca no frontend.
4. Fixar ECG_BENCHMARK_CASE_IDS somente a IDs conhecidos e adicionar objetos PNG em ecg-benchmarks/<ID>.png, sem identificação de pacientes.
5. Após obter termos e acordos apropriados para o BENCHMARK, definir ECG_VALIDATION_ENABLED=true **apenas** em ambiente restrito a administradores/testadores. Chamada POST / com JSON {"caseId":"..."} e bearer da sessão Supabase admin.
6. ECG_ENABLE_ESCALATION=true só em testes controlados; payload {"caseId":"...","escalate":true}. Não habilitar por padrão.
7. Checar precisão em conjunto cegado, variabilidade, falhas por patologia, latência, custo observado, alergias a artefatos e necessidade de medidas objetivas.
8. Implementar cotas duráveis por usuário/dia/mês, telemetria de custo sem dados clínicos, controles de privacidade e delete/retention, antes de permitir maior volume de testes.

## Requisitos antes da integração com pacientes reais
- Estudo de validação com ECGs de diferentes equipamentos, derivações, qualidade, calibração, populações e prevalências; avaliar sobretudo sensibilidade e especificidade para alterações críticas. Idealmente usar sinais digitais com mensuração objetiva, não inferir milímetros de screenshot.
- UX que preserve o ECG original, indique a derivação, evidência e incerteza, mostre discordância entre modelos, registre revisão humana, permita correção, exiba falha de leitura sem tranquilização indevida e não atrase condutas emergenciais.
- Análise ANVISA da finalidade pretendida sob RDC 657/2022; avaliação jurídica e ética profissional; LGPD e contratos de tratamento de dados com todos os fornecedores; consentimento/base legal e política de retenção; autenticação e trilhas de auditoria.
- Confirmar que os acordos e políticas dos provedores permitem os exames clínicos; disponibilidade técnica de API não é permissão contratual nem validação médica.
- A API Gemini pública NÃO faz parte do fluxo clínico por seus termos atuais de uso.
- R2 de referência e R2 de eventuais exames reais devem ser ambientes separados e privados, com KMS/criptografia, rotatividade de credenciais, controle de acesso e retenção documentada.
- Só publicar quando critérios regulatórios, jurídicos, técnicos e clínicos forem satisfeitos e houver aprovação formal da equipe responsável.

## Limitações conhecidas
- O frontend novo mostra uma demonstração textual fictícia, **não** faz upload nem interpreta ECG.
- O Worker de benchmark não está conectado à interface ou a um domínio, e não foi ativado.
- A diferença de resultados detectada pelo backend é superficial (presença de derivação), não substitui adjudicação clínica. Medidas e recortes por derivação ainda não foram implementados.
- A API não salva resultados; o orçamento e o uso demandarão persistência/rate limiting independente antes de abrir acesso para mais testadores.
- Não foram realizados ensaios com APIs pagas, benchmark clínico ou deploy de infraestrutura.

## Fontes técnicas
- https://platform.openai.com/pricing
- https://platform.claude.com/docs/en/models/overview
- https://platform.claude.com/docs/en/about-claude/pricing
- https://developers.cloudflare.com/r2/api/workers/workers-api-usage/
- https://ai.google.dev/gemini-api/terms/
