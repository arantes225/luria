# Política editorial LURIA — imagens clínicas (2026-10-07)

## Regra mandatória
* Priorizar **fotografias e registros clínicos autênticos**: exame físico, lesões, corrimentos, cervicite, ultrassonografia, radiografias, mamografia, ressonância, histopatologia, equipamentos, contraceptivos e procedimentos, sempre com fonte e permissão de reutilização conferidas.
* Quando foto real não esclarecer o conceito (p. ex., prolapso do cordão), aceitar **ilustração anatômica externa validada**. Não gerar imagens artificiais para substituir acervo clínico.
* Não usar imagens que sejam texto/callouts: “avaliar, decidir, monitorar”, “tratamento multimodal”, listas, tabelas, fluxogramas triviais. Essas informações devem ser elementos semânticos HTML, não arquivos de imagem.
* Não reutilizar o mesmo esquema em vários tópicos. Cada figura deve adicionar um **achado que o aluno reconheça** e ser acompanhada de legenda: o que observar, como diferencia diagnóstico e fonte.
* Uma imagem ruim, duplicada, fora de tema, sem creditação ou com URL quebrada **não deve ser exibida**. Substituir ou deixar o trecho sem figura.
* Mostrar as candidatas verdadeiras na galeria administrativa e preservar aprovações existentes. Não aprovar automaticamente. Conferir licença e versão local otimizada antes da publicação; fonte externa sozinha não constitui hospedagem estável.

## Prioridades por apostila
* Cervicites / DIP: fotografia de colo uterino com exsudato mucopurulento; cervicite com friabilidade; exemplos reais de secreções quando distinguíveis; evitar concluir agente etiológico apenas pela aparência.
* Vulvovaginites: fotografias reais de corrimento, pH e microscopia conforme indicação, sem substituir testes.
* Câncer de mama: mamografia, US, RM com realce de lesão, imagens histológicas e fotos clínicas com consentimento/licença.
* Contracepção: fotografia individualizada de preservativo interno, diafragma, DIU de cobre, SIU-LNG, implante, anel, adesivo e instrumentos/procedimento de laqueadura; não esquemas repetidos com texto.
* Indução de parto: fotografia real de Foley/balão de Cook; imagem externa apropriada de prolapso do cordão e ruptura uterina, preferencialmente caso clínico/documentação ou esquema anatômico autorizado.
* Sexualidade: remover candidatas repetitivas de tratamento multimodal, educação e conduta; só imagens anatômicas/exames úteis.
* Amenorreia: preferir fotos clínicas autorizadas de causas anatômicas (incluindo hímen imperfurado), US/RM/histeroscopia, preservando imagens já aprovadas.

## Fluxo de publicação
1. Curadoria de fontes confiáveis (Ministério da Saúde, FEBRASGO, CDC PHIL, NCBI/PMC, artigos OA, fabricantes para fotos de produto).
2. Verificar se imagem retrata exatamente o achado; checar licença, direitos e privacidade do paciente.
3. Prévia real, com fonte, legenda e alvo de inserção no Admin.
4. Aprovação editorial individual (sem aprovar em lote por conta própria).
5. Hospedar localmente ou Supabase em WebP leve quando permitido; checar HTTP, tipo e renderização; inserir no trecho relacionado, não numa seção de imagens decorativas.


## Fontes reais verificadas para próxima curadoria (2026-10-07)

As referências abaixo têm fotografia/exame real documentado. **Não confundir link do artigo com URL direta da imagem**. Antes de oferecer no Admin, obter a mídia do próprio artigo, respeitar licença, validar carregamento e converter para WebP.

| Apostila | Alvo | Fonte externa e figura | Situação |
| --- | --- | --- | --- |
| Amenorreia | Hímen imperfurado com abaulamento arroxeado | https://pmc.ncbi.nlm.nih.gov/articles/PMC9464463/ — Figura 1, caso real, Cureus CC BY 4.0 | Fonte confirmada; URL direta e hospedagem pendentes |
| Amenorreia | Hímen imperfurado, detalhe do exame | https://pmc.ncbi.nlm.nih.gov/articles/PMC9732849/ — Figura 2 | Fonte confirmada; reutilização requer avaliação de direitos |
| Amenorreia | Hematocolpo e correlação com RM | https://pmc.ncbi.nlm.nih.gov/articles/PMC9464463/ — Figura 2 | Fonte confirmada; converter mídia |
| Cervicite | Exsudato endocervical purulento | https://wwwn.cdc.gov/phil/Details.aspx?pid=19141 — PHIL 19141, CDC / Dr. Wiesner | Foto clínica domínio público; creditar CDC |
| Cervicite | Hiperemia e edema do colo | https://wwwn.cdc.gov/PHIL/Details.aspx?pid=19143 — PHIL 19143 | Foto clínica domínio público; creditar CDC |
| Cervicite | Cervicite com gonorreia documentada | https://wwwn.cdc.gov/phil/Details.aspx?pid=4087 — PHIL 4087 | Imagem clínica real; não diagnosticar por imagem isolada |
| Cervicite | Cervicite HSV, erosões | https://phil.cdc.gov/Details.aspx?pid=6495 — PHIL 6495 | Imagem clínica real, checar termo de uso |
| Indução | Balão cervical duplo Cook | https://onlinelibrary.wiley.com/doi/10.1155/2017/9396075 — Figura 1 | Fotografia real publicada; checar reutilização |
| Indução | Posicionamento anatômico do Cook | https://onlinelibrary.wiley.com/doi/10.1155/2017/9396075 — Figura 3 | Esquema do fabricante, só usar se autorizado |
| Câncer de mama | RM contrastada com neoplasia | https://commons.wikimedia.org/wiki/File:Mri_of_breast_cancer.jpg — NCI | Imagem real em domínio público; abrir apostila correspondente antes de cadastrar |

**Nota:** no levantamento do cadastro publicado consultado nesta data, a apostila de câncer de mama não foi encontrada na tabela `public.apostilas`; localizar a página/caminho correto antes de inserir candidatas.
