# Reativação de GitHub Pages — 28/10/2026

Esta alteração documental dispara a execução do workflow existente `deploy-pages.yml` após o repositório voltar à visibilidade pública. Não altera código, configurações, domínio, credenciais, serviços ou lógica da aplicação.

Caso o deployment indique que Pages está desativado, a fonte correta é **GitHub Actions** em Settings > Pages, pois `.github/workflows/deploy-pages.yml` já executa `actions/deploy-pages@v4`.
