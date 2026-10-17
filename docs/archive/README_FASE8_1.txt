DOCMAP — FASE 8.1: CENTRAL DE EDITAIS formato-numerado

Foi incorporado:
catálogo externo de editais (referência histórica descontinuada)

Na página Editais / Provas agora existem duas abas:

1. MINHAS PROVAS
- mantém toda a Fase 8 do DocMap
- cadastro, datas, resultado, simulados etc.

2. CENTRAL DE EDITAIS formato-numerado
- abre o site da formato-numerado dentro da própria página do DocMap
- iframe em tela ampla
- carregamento somente quando a aba é aberta
- botão "Abrir em nova aba" como fallback

A última aba escolhida fica salva no navegador.
Se a Agenda abrir uma prova específica, a página volta automaticamente
para "Minhas provas".

IMPORTANTE
A formato-numerado é um site externo. Se ela configurar bloqueio de iframe
(X-Frame-Options / CSP frame-ancestors), nenhum frontend hospedado
no GitHub Pages consegue contornar isso de forma legítima.
Nesse caso o botão "Abrir em nova aba" continua funcionando.

NÃO PRECISA SQL.

SUBSTITUA:
- editais.html
- editais.css
- editais.js

PUBLICAÇÃO:
git add -A
git commit -m "Incorpora central de editais formato-numerado"
git push origin main

Depois: Ctrl + F5
