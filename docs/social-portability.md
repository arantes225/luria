# Portabilidade da central social

Direção aprovada pelo usuário em 13/10/2026: facilitar uma futura migração de infraestrutura, mantendo o funcionamento e os dados atuais. Este documento registra os contratos e os próximos cuidados; não afirma que a migração esteja implementada.

O usuário esclareceu que a preocupação abrange a LURIA inteira, não somente a central social. A direção de portabilidade deve também contemplar questões, flashcards, materiais, estatísticas, assinatura, configurações e autenticação. Não há autorização de publicação em produção ou decisão de migrar esses módulos agora.

Uma mudança de hospedagem estática ou servidor HTTP não implica trocar o banco. Se a prioridade for minimizar reescrita, considerar PostgreSQL em outro provedor como destino de banco, mantendo contratos e IDs. Cloudflare D1 utiliza SQLite e exige adaptar funções PostgreSQL, RLS e transações; não é substituição direta da base existente. R2 também exige migrar arquivos e manter regras de acesso equivalentes a Storage; usar nomes e caminhos de objetos estáveis e não gravar URLs assinadas como identificadores permanentes.

## Limites dos provedores

- Dados permanentes de usuários, amizades, grupos, salas, mensagens, sessões, rodadas e progresso permanecem no PostgreSQL. UUIDs dos usuários estão vinculados a Auth: uma futura troca de autenticação deve preservar esses IDs ou fazer um mapeamento transacional explícito.
- `social_command` e `social_snapshot` definem as operações e os dados da central. Manter seus contratos como referência para um adaptador futuro, sem espalhar chamadas de tabelas novas pelos componentes de UI.
- Supabase Auth, Presence/Broadcast, Postgres Changes e Storage são integrações específicas. Exportar o banco não as substitui. Futuras migrações precisam implementar autenticação, autorização, reconexão, canais privados e URLs temporárias equivalentes.
- As respostas de quiz ficam protegidas no servidor. Um adaptador não pode transferir essas regras para o cliente nem permitir que o participante leia gabaritos antecipadamente.
- `social-voice.js` usa um endpoint HTTP da LURIA. SFU e Durable Objects permanecem na implementação server-side em `cloudflare/study-voice`. O SFU transporta áudio; metadados temporários de chamadas não são a fonte do histórico permanente.

## Próximos cuidados de implementação

1. Centralizar configuração de URL/chave pública por ambiente, em uma cópia estática de homologação isolada. Não substituir a configuração de produção pelo projeto de testes.
2. Quando houver necessidade concreta de outro provedor, extrair um adaptador pequeno para identidade, comandos, eventos e anexos, conservando os contratos já usados. Não criar camada genérica em toda a plataforma ou dois sistemas de salas.
3. Versionar alterações SQL e registrar quais foram aplicadas em cada ambiente. O bootstrap `db/staging_base_schema.sql` reconstrói definições para um projeto vazio; não é backup completo de dados, arquivos, Auth, configuração de serviços ou tarefas agendadas.
4. Manter backup separado de dados e objetos de Storage, com restauração validada. Não exportar segredos para o repositório.
5. Validar no destino os cenários existentes de autorização, bloqueios, privacidade, quiz, reconexão e preservação de personalizações antes de mudar o tráfego.

## Estado atual

Não houve migração do provedor de banco nem publicação em produção da LURIA. O banco de homologação foi instalado no Supabase separado, com dados de teste criados pelo usuário. O app SFU, o Worker de voz e o site de homologação foram criados na Cloudflare; o registro do Durable Object e os testes reais de áudio ainda estão pendentes. Consulte `docs/social-staging.md` para o progresso de configuração.
