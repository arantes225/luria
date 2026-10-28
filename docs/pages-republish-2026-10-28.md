# Reativação de GitHub Pages — 28/10/2026

Esta alteração documental dispara a execução do workflow existente `deploy-pages.yml` após o repositório voltar à visibilidade pública. Não altera código, configurações, domínio, credenciais, serviços ou lógica da aplicação.

Caso o deployment indique que Pages está desativado, a fonte correta é **GitHub Actions** em Settings > Pages, pois `.github/workflows/deploy-pages.yml` já executa `actions/deploy-pages@v4`.

## Publicação do hall de apostilas — 28/10/2026

A mudança do fluxo **Aprender → Apostilas → Hall de Áreas Médicas → Biblioteca da Área** foi integrada à branch `main` pelo PR #190 (merge `651c88ad7bbfb2ba790c4ee3cfd6264b06969139`).

Este commit de republicação aciona novamente `.github/workflows/deploy-pages.yml`, que executa verificações de qualidade, gera `build/pages` e faz deploy via `actions/deploy-pages@v4` quando os gates passam. O registro do disparo **não equivale à confirmação de deploy**.

Validação pós-publicação exigida: abrir `/apostilas/` sem a biblioteca visível, escolher `Ginecologia e Obstetrícia` e confirmar a biblioteca filtrada em `/apostilas/?area=ginecologia-obstetricia`; conferir botão de voltar ao hall, navegação do histórico e atualização do PWA.
