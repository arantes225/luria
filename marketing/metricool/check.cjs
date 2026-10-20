'use strict';
/*
 * Verificador de conectividade e status do conector MCP do Metricool.
 *
 * Uso:
 *   node metricool/check.cjs
 */
const https = require('node:https');
const { MetricoolMcpClient } = require('./client.cjs');

async function probeMcpEndpoint(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 8000 }, res => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', err => resolve({ error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ error: 'Timeout de conexão' }); });
  });
}

async function main() {
  const client = new MetricoolMcpClient();

  console.log('=== VERIFICAÇÃO DO CONECTOR OFICIAL METRICOOL MCP ===');
  console.log(`Endpoint oficial: ${client.config.serverUrl}`);

  console.log('\n[1/2] Testando conectividade com https://ai.metricool.com/mcp...');
  const probe = await probeMcpEndpoint(client.config.serverUrl);

  if (probe.error) {
    console.log(`⚠ Falha de rede: ${probe.error}`);
    console.log('  O pipeline continuará funcionando normalmente em modo local offline.');
  } else {
    console.log(`✔ Conectividade OK! Código HTTP: ${probe.statusCode}`);
    if (probe.statusCode === 401) {
      console.log('  Autenticação necessária (conforme especificação oficial OAuth 2.1 com PKCE).');
      console.log('  Documentação oficial: https://help.metricool.com/en/article/how-to-connect-metricools-mcp-1364s63/');
    }
  }

  console.log('\n[2/2] Verificando credenciais locais...');
  if (client.isAuthenticated) {
    console.log('✔ Credencial local detectada (METRICOOL_API_TOKEN ou METRICOOL_USER_TOKEN configurado).');
  } else {
    console.log('🟡 Nenhuma credencial informada.');
    console.log('  Para ativar o envio direto de rascunhos para o Metricool:');
    console.log('  1. Conecte sua conta do Metricool em Account Settings > API.');
    console.log('  2. Configure as variáveis de ambiente:');
    console.log('     $env:METRICOOL_API_TOKEN="seu_token"');
    console.log('     $env:METRICOOL_USER_ID="seu_user_id"');
    console.log('  3. Pela regra de segurança #7 e #10, a produção de vídeos é 100% independente do conector externo.');
  }
}

if (require.main === module) main().catch(e => { console.error(e); process.exitCode = 1; });
