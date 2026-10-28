# Separacao do ECG para repositorio privado — 28/10/2026

## Objetivo e estado atual

Separar o motor do digitalizador/IA de ECG do projeto LURIA sem migrar o site principal, recriar bancos de dados ou interromper a plataforma. O repositório original permanece **privado** até que seja seguro expor uma nova versão do site.

**Entregue nesta branch:** exportador controlado em `scripts/export-private-ecg.cjs`, que copia apenas o conjunto especificado de arquivos de ECG, gera testes/documentacao e cria um snapshot externo **sem diretorio .git, sem historico antigo e sem secrets de ambiente**. A ferramenta nao cria por si o novo repositorio GitHub e nao altera o deploy.

## Como preparar o repositorio privado novo

1. Execute na copia local atualizada da LURIA: `node scripts/export-private-ecg.cjs ../luria-ecg-private-export`.
2. Confirme `EXPORT_MANIFEST.json` e revise a lista de arquivos antes de publicar.
3. Crie um **repositorio GitHub novo, vazio e privado**, por exemplo `arantes225/luria-ecg`. Nao faca fork, transfer ou import: estes processos podem conservar o historico anterior.
4. Na pasta exportada, `git init -b main`, `git add .`, `git commit -m "Initial ECG snapshot"`, configure o remote do repositorio novo e `git push -u origin main`.
5. Instale dependencias e execute `npm test`. Os testes atuais sao principalmente sinteticos; nao equivalem a validacao por fotografia ou clinica.

## Limites de arquitetura

**Copia de desenvolvimento privada** inclui: motor de CV, extrator, contratos, scripts da camera e conferencia para referencia, experimento PyTorch, testes, fixtures PhysioNet com licenca, fontes das Edge Functions e documentos de auditoria. As fontes da interface ainda estao presentes na LURIA original para nao causar indisponibilidade.

**Frontend LURIA (posteriormente publico):** manter apenas interface da camera/captura, previsualizacao, revisao, estado de carregamento, autorizacao de acesso e cliente HTTP autenticado. Funcoes de calculadoras e conteudos didaticos continuam na LURIA.

**Backend ECG privado (proxima etapa):** processamento de imagem/segmentacao, correcao de perspectiva, calibracao, extracao, metricas, pesos, datasets, jobs de treino, testes e API. Isolar ainda autorizacao, limites de requisicoes, auditoria e regras de retencao de imagens de pacientes. Nao colocar chaves privilegiadas na UI.

Arquivos JavaScript que um navegador recebe **continuam inspecionaveis** mesmo que o repositorio de origem seja privado. Portanto a exportacao so organiza a fonte; a protecao real do motor requer implementacao de inferencia no servidor e remocao dos scripts proprietarios do bundle publico.

## Integracoes e infraestrutura

- **Supabase:** nao e necessario recriar o banco nem o Auth. As copias das Edge Functions ainda nao estao implantadas no novo projeto. Ajustar permissoes somente quando houver API implantada e autenticacao verificada. A funcao `ecg-signal-classifier` nao foi encontrada no repositorio anterior e nao deve ser anunciada como implantada.
- **Cloudflare:** manter o site atual conectado ao repositorio original ate haver testes de regressao e nova rota de API. O novo motor pode ter deploy independente.
- **Cloudflare R2:** conservar buckets e objetos privados; nunca copiar dados clinicos nem credenciais para o repositorio. A rotina de importacao e exportada como **exemplo desativado**.
- **GitHub/Jules:** novo repositorio privado precisa ser autorizado nas integracoes e no GitHub App separadamente.
- **Pesos e licencas:** nao importar automaticamente checkpoints de 2024/2026 sem verificar licencas de codigo, pesos, datasets, atribuicoes e dependencias.
- **Historico:** a exportacao e apenas de arquivos; criar o novo repositorio por commit inicial novo. Nao tornar o original publico enquanto ele ainda contiver o historico do motor.

## Criterios para concluir a separacao real

- [ ] Novo repositorio privado criado, com primeiro commit independente e sem historico antigo
- [ ] Manifesto SHA-256 e fontes revisados; nenhum token/secret incluido
- [ ] Testes de unidade/sinteticos aprovados em CI no novo repositorio
- [ ] Motor de inferencia privado com API autenticada e limites adequados implantado
- [ ] Frontend da LURIA usa apenas API e nao envia pesos ou codigos proprietarios ao navegador
- [ ] Testes de regressao de captura, login, recaptura, imagens e fallback aprovados
- [ ] Conjunto fotografico independente avaliado; nao prometer desempenho clinico sem validacao
- [ ] Somente depois, preparar publicacao de um **novo repositorio do site com historico limpo**

## Nao fazer nesta etapa

Nao apagar o repo original, nao modificar a LURIA publicada, nao alterar Supabase/R2/Cloudflare, nao modificar credenciais de producao e nao misturar copia do ECG com migrations do restante do site.
