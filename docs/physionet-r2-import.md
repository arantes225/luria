# Importar dados do PhysioNet para Cloudflare R2

Este fluxo foi preparado para a LURIA sem alterar a aplicacao em producao.

## Preparacao (uma unica vez)

1. No Cloudflare, abra **Storage & databases > R2 > Overview** e crie um bucket **privado** da classe **Standard** chamado `luria-ecg-library` (ou use um bucket existente).
2. Em **R2 > Manage API Tokens**, crie um token S3 **Object Read & Write**, com acesso **somente ao bucket escolhido**. Copie o **Access Key ID** e **Secret Access Key** da pagina de confirmacao.
3. No GitHub, abra o repositorio **arantes225/luria** > **Settings > Secrets and variables > Actions**. Em **Repository secrets**, crie:
   - `R2_ACCOUNT_ID`: identificador da conta Cloudflare (32 caracteres);
   - `R2_ACCESS_KEY_ID`: Access Key ID do token R2;
   - `R2_SECRET_ACCESS_KEY`: Secret Access Key do token R2.
4. Se o nome do bucket nao for `luria-ecg-library`, crie uma **Repository variable** `R2_BUCKET` com o nome do bucket existente.
5. Apos o merge, abra **Actions > Importar PhysioNet para Cloudflare R2 > Run workflow**. Selecione:
   - `ptbxl-100hz` (recomendado para testar): PTB-XL de 100 Hz + tabelas de rotulos;
   - `ptbxl-completo`: PTB-XL com 100 e 500 Hz;
   - `ptbxl-plus`: todas as caracteristicas PTB-XL+;
   - `ambos`: PTB-XL completo + PTB-XL+.

**Nao envie credenciais no chat, nas issues, nos logs ou no codigo.** Use apenas os campos de GitHub Secrets.

## Como funciona

A execucao e **manual**, utiliza um runner temporario do GitHub e copia os datasets publicos do bucket `s3://physionet-open` para R2 pela API S3. Nao usa seu computador, Cloudflare Workers, Supabase nem endpoints de chamadas ao vivo.

Destinos:
- `physionet/ptb-xl/1.0.3/`
- `physionet/ptb-xl-plus/1.0.1/`

Arquivos sao copiados mantendo nomes e hierarquia originais. O comando `sync` permite repetir a transferencia para completar arquivos faltantes, mas como o runner e descartado ao final, uma repeticao baixa novamente os arquivos da origem. O fluxo **nao usa --delete** e nao altera conteudo de outros caminhos no bucket.

## Verificacao

A workflow para com erro se faltarem segredos, houver falha de transferencia ou se as amostras de verificacao (`ptbxl_database.csv` e `LICENSE.txt`) nao estiverem acessiveis no R2. Esses testes **nao substituem** uma auditoria de checksums de todos os objetos. A PTB-XL fornece `SHA256SUMS.txt` para verificacao integral, a implementar na etapa seguinte.

Recomendacao: testar primeiro `ptbxl-100hz`, depois `ambos`. A transferencia completa ocupa cerca de 5 GB no destino, segundo o PhysioNet (3.0 GB para PTB-XL e 2.0 GB para PTB-XL+), antes de possiveis arquivos adicionais e outros objetos na conta.

## Licencas e seguranca

As duas bases publicas usam CC BY 4.0 e exigem atribuicao. Preserve `LICENSE.txt` e inclua citacoes das bases. O bucket deve permanecer privado; se os ECGs forem usados no ECG Lab, crie um mecanismo de entrega autenticada. Nao transfira bases do PhysioNet que tenham acesso controlado sem conferir suas regras especificas.

- PTB-XL: https://physionet.org/content/ptb-xl/1.0.3/
- PTB-XL+: https://physionet.org/content/ptb-xl-plus/1.0.1/
- Cloudflare R2: https://developers.cloudflare.com/r2/get-started/s3/
