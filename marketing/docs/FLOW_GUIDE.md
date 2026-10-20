# GUIA DE INTEGRAÇÃO COM O GOOGLE FLOW (VEO)

Este guia orienta a utilização do **Google Flow** de forma semiautomática para gerar cenas complementares cinematográficas para os Reels da **LURIA**, com custo zero de API.

---

## 1. Princípios de Direção e Estética LURIA

Para manter a consistência com a identidade institucional da LURIA:
* **Paleta:** Branco predominante, azul institucional `#184888`, tons de ardósia e azul petróleo.
* **Estética Médica Premium:** Iluminação cinematográfica, foco nítido, profundidade de campo rasa (bokeh suave), ambiente de hospital ou biblioteca médica de excelência.
* **Profissionalismo:** Médicos e residentes portando jalecos impecáveis ou scrubs azuis-marinho, postura focada, atitude colaborativa.
* **Evitar:** Apresentações escolares, gráficos infantis, jalecos amassados ou mãos distorcidas por IA (especificado nos *negative prompts*).

---

## 2. Passo a Passo do Fluxo Semiautomático

### Passo 1: Obter os Prompts Estruturados
Os prompts são gerados automaticamente com especificações de câmera, iluminação e enquadramento:
```powershell
# Listar prompts disponíveis
npm run flow:prompts

# Ou gerar prompts para um novo tema clínico do calendário:
node flow/build-prompts.cjs --topic "avc-crises-convulsivas"
```
Os arquivos prontos para cópia ficam em `marketing/flow/prompts/<tema>-flow.md`.

### Passo 2: Gerar os Clipes no Google Flow
1. Acesse o [Google Flow](https://flow.google.com).
2. Configure a proporção para **9:16 Vertical** (obrigatório para Reels).
3. Cole o prompt em inglês da cena desejada (exemplo em `flow/prompts/study-rats-flow.md`).
4. Configure a duração para **4 a 6 segundos**.
5. Gere a cena e avalie o realismo anatômico e médico.

### Passo 3: Baixar e Importar os Clipes
1. Baixe o arquivo gerado (`.mp4`).
2. Mova o arquivo para a pasta correspondente:
   `marketing/flow/clips/<tema>/<nome-da-cena>.mp4`
   *(Exemplo: `marketing/flow/clips/study-rats/cena1-estudo-solitario.mp4`)*
3. Execute o script de importação:
   ```powershell
   npm run flow:import
   ```
4. O script valida a proporção 9:16, taxa de quadros e duração, gerando o arquivo `marketing/flow/manifest.json`.

### Passo 4: Integração na Montagem Remotion
Os clipes registrados no `manifest.json` são lidos automaticamente pelas composições Remotion (`marketing/remotion/compositions/`), que os alternam com as capturas reais da tela em blocos de transição ou introdução.

---

## 3. Segurança e Política de Custos

* **Custo $0,00:** Todo o processo utiliza a interface interativa do Google Flow, sem consumo de chamadas pagas da API do Veo.
* **Sem dependência externa bloqueante:** Se nenhum clipe generativo for gerado, o pipeline utiliza as gravações reais da interface da LURIA e transições dinâmicas nativas em Remotion, garantindo entrega autônoma e contínua.
