@echo off
setlocal
cd /d "%~dp0"
where npx >nul 2>&1
if errorlevel 1 (
  echo Node.js e npx nao foram encontrados neste terminal.
  echo Instale Node.js pelo site oficial https://nodejs.org/ e abra este arquivo novamente.
  pause
  exit /b 1
)
echo Esta configuracao publica somente luria-homologacao-voz.
echo Entre na Cloudflare quando o navegador abrir e revise a autorizacao do Wrangler.
call npx --yes wrangler@4.150.0 login
if errorlevel 1 (
  echo O login nao foi concluido. Nada sera publicado por este arquivo.
  pause
  exit /b 1
)
call npx --yes wrangler@4.150.0 deploy --config wrangler.staging.toml
if errorlevel 1 (
  echo A publicacao nao foi concluida. Copie a mensagem de erro, sem credenciais.
  pause
  exit /b 1
)
echo Worker de homologacao publicado com o namespace ROOM_VOICE.
echo Retorne ao Codex para verificarmos o registro e testarmos o audio.
pause
