# Entrega funcional das páginas sociais

Registro da entrega inicial em homologação. A publicação posterior autorizada pelo usuário está descrita em [social-production.md](social-production.md); as migrações incrementais citadas abaixo foram movidas para supabase/staging-migrations.

O usuário priorizou implementar as funcionalidades no layout atual e revisar o desenho depois. Esta entrega foi publicada somente em https://traube-homologacao.lfab225.workers.dev/amigos/. Não houve publicação em produção, push ou alteração do banco de produção.

## Implementado nesta etapa

- Hall com retorno à sessão e participantes reais sujeitos às permissões de perfil.
- Configurações de sala, administradores, agenda com horário/duração e materiais tipados, incluindo arquivos privados no Storage existente.
- Confirmação explícita de resposta antes de enviar ao quiz coletivo; contagem de questões e comentário após revelação.
- Spotify Embed sob ação do usuário e compartilhamento de convite oficial do Jam, sem simular sessão musical ativa.
- Microfone inicialmente desligado, troca de dispositivo, controle do áudio recebido, desbloqueio de reprodução e opção de pressionar para falar. Indicador de fala usa estatísticas locais disponíveis do WebRTC, sem gravação.
- Cota de voz de três horas diárias por usuário, compartilhada entre salas, com contabilização e autorização no servidor. Uma chamada ativa por usuário, reservas temporárias e limpeza de conexões expiradas. O dia usa America/Sao_Paulo.
- Painel restrito aos administradores institucionais para pausa da voz, cotas e capacidade. Estimativas de tráfego são identificadas como cenários; não substituem a fatura real da Cloudflare.

## Publicação e evidências

Migrações aditivas aplicadas e copiadas integralmente para supabase/migrations: 20261014025507_social_room_features.sql e 20261014033016_social_voice_usage.sql. A capacidade secreta de contabilização existe somente no Worker; o banco armazena seu hash. O caminho alternativo por MCP foi usado porque a CLI não conseguiu criar seu diretório de configuração no Windows.

Worker de voz: 7ca3275f-dc76-49f4-bc65-3b0968fd6bbe. Site: 8b9ba27d-85c8-40be-8f85-141bb7bd6c6f. Assets: social-rooms v3, social-voice v7 e social-v3.css v2, com precache atualizado.

42 testes de banco, interface e voz aprovados; outros quatro de PWA/build aprovados. Sintaxe: 253 blocos JS/CJS sem erros e Worker MJS verificado separadamente. CSS: 56 arquivos, sem erros. O verificador de sintaxe passa a excluir artefatos gerados do Wrangler e build, que não são fontes da aplicação. Os arquivos publicados foram comparados com o build local e a rota de voz recusou requisição sem autenticação com 401.

Navegador autenticado: hall real, retorno à sala Oioi, presença Realtime e modal de configurações com dados atuais conferidos sem salvar alterações. A conta de teste saiu da sala ao finalizar. Captura: browser-results/social/settings-published.png.

Advisors: novas tabelas privadas têm RLS sem políticas deliberadamente, acesso direto revogado e operações mediadas por funções autorizadas. social_voice_expire é SECURITY DEFINER de propósito, com capacidade secreta validada e escopo somente de limpeza/contabilização de conexões expiradas. Avisos de índices novos ainda não utilizados são esperados. A homologação também apresenta avisos anteriores de proteção contra senhas vazadas desabilitada e funções existentes; não se afirma ausência de todos os avisos. Referências: https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy e https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable.

## Limites de validação e trabalho posterior

O áudio real entre PC/Safari em Wi-Fi e 5G foi confirmado pelo usuário na versão anterior. Os novos controles e cotas passaram nos testes automatizados, mas esta publicação ainda precisa repetir o teste de áudio em aparelhos reais, lotações de 2/4/6/8 pessoas, suspensão e troca de rede. O administrador institucional foi validado com papéis de teste locais; nenhuma conta de homologação foi promovida automaticamente.

O Jam depende de convite e sessão criados no Spotify; integração real com uma conta Spotify não foi testada. Materiais vinculados não concedem acesso a conteúdo privado ou pago que o participante não possui.

O redesenho visual completo foi adiado pelo usuário. Continuidade da voz entre páginas HTML completas ainda não foi implementada: sair da sala, voltar ao hall ou fechar a página encerra a chamada. A contabilização e os limites reduzem uso; não são um teto financeiro garantido para falhas de rede ou atraso de limpeza do provedor. Não foi configurado um alerta automático de faturamento da Cloudflare nesta etapa.
