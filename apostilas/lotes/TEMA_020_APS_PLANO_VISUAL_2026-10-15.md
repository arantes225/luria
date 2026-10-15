# LURIA — Tema 020 | Plano de 10 visuais autorais de alta utilidade
**Data:** 15/10/2026. **Status:** planejamento editorial, **não são imagens prontas**, 0 publicadas, 0 aprovadas.

## Princípio de curadoria
A APS e seus atributos não requerem radiografias, ECG ou fotografias clínicas. A prioridade são esquemas **originais**, legíveis em PWA e apoiados pela PNAB, pela teoria de Starfield e por informações metodológicas do MS. Não copiar o mapa `SUS.pdf` do Drive nem infográficos privados ou protegidos. Criar SVG autoral pode ser mais adequado que incorporar uma imagem externa. Até revisão visual, preservar todos como proposta.

| Nº | Local no texto | Visual original proposto | O que precisa ensinar | Alerta de QA |
|---|---|---|---|---|
| 01 | `starfield` | **Mandala 4 + 3**: núcleo com 4 essenciais e órbita com 3 derivados | Diferenciar categorias sem confundir com princípios do SUS | A mesma cor não deve dar falsa impressão de mesma categoria |
| 02 | `primeiro` | **Funil acesso → utilização → resposta segura** | Barreiras organizacionais, geográficas e simbólicas | Não substituir acolhimento por 'triagem de exclusão' |
| 03 | `longitudinal` | **Linha do tempo de vida** infância → adolescência → adulto → idoso | Fonte regular, informação e vínculo ao longo dos anos | Evitar confundir continuidade informacional e longitudinalidade |
| 04 | `integral` | **Matriz 2x2** serviços disponíveis/prestados × individual/coletivo | Integralidade horizontal e vertical; prevenção/diagnóstico/tratamento | Não sugerir pacote de exames universais |
| 05 | `coordenacao` | **Fluxo bidirecional** UBS ↔ especialista ↔ hospital ↔ UBS | Referência, contrarreferência e reconciliação pós-alta | Setas precisam mostrar responsabilidade que permanece com APS |
| 06 | `derivados` | **Triângulo família–comunidade–cultura** | Três derivados em casos diferentes | Não estereotipar comunidades nem ilustrar população fictícia como dado real |
| 07 | `territorio` | **Mapa esquemático fictício** UBS, escola, CRAS, transporte, saneamento | Diagnóstico situacional e intersetorialidade | Identificar 'esquema fictício': nunca sugerir geolocalização real |
| 08 | `esf` | **Rede colaborativa da eSF/eMulti** | Responsabilidades compartilhadas em torno da pessoa | Não reduzir equipe a encaminhamento para especialidades |
| 09 | `acolhimento` | **Árvore de decisão da demanda nova** | Urgência, resposta no dia, atendimento programado e retorno seguro | Não representar algoritmo de classificação universal sem protocolo |
| 10 | `qualidade` | **Ciclo de melhoria PDSA** com exemplo de acesso ao pré-natal | Meta → teste → medida → ajuste; dados/experiência/resultados | Não confundir nota administrativa com todos atributos |

## Requisitos de desenvolvimento visual
- A identidade deve seguir LURIA: azuis/branco e variações acessíveis nos temas escuro e rosa; tipografia limpa, componentes responsivos e sem poluição.
- Arte educativa original, não fotografias de exames ou pacientes geradas artificialmente.
- SVG e HTML sem dependência externa, com texto alternativo e rótulos navegáveis quando adequado; se exportar raster, usar WebP leve e respeitar limites do site.
- Para mapas, usar esquema declaradamente **fictício**. Para instrumentos como PCATool, não copiar a tabela proprietária do manual; criar gráfico de conceito e remeter a fonte.
- Verificar legibilidade a 320 px, desktop/PWA, alto contraste e modo escuro.
- Se alguma imagem externa for escolhida futuramente, verificar autor/licença individual e seguir fila Admin `pending` antes de qualquer exibição pública.

## Legendas interpretativas sugeridas (não incorporadas)
1. “Quatro atributos essenciais definem o funcionamento da APS; três derivados qualificam o cuidado no contexto familiar, comunitário e cultural.”
2. “Existir uma UBS não garante primeiro contato quando barreiras impedem utilização ou resposta oportuna.”
3. “Longitudinalidade conecta a pessoa à sua fonte habitual de atenção ao longo do tempo, independentemente da doença.”
4. “Integralidade reúne identificação de necessidades, ações efetivamente ofertadas e acesso organizado à rede.”
5. “Coordenação exige que a informação e a responsabilidade circulem nos dois sentidos da referência e da contrarreferência.”
6. “Família, território e cultura são dimensões de interpretação clínica, nunca rótulos fixos de grupos.”
7. “Diagnóstico territorial combina dados, escuta comunitária e recursos de diferentes setores.”
8. “Cuidado compartilhado aproxima eSF e eMulti da pessoa e não dissolve o vínculo com equipe de referência.”
9. “Acolhimento orienta resposta proporcional ao risco e garante retorno seguro.”
10. “Melhoria da APS depende de medir experiências, processos, resultados e consequências não intencionais.”

**Conclusão:** dez propostas autorais de valor pedagógico identificadas; nenhum arquivo de imagem criado ou publicado. O texto JSON já contém seis tabelas originais e casos de aplicação.
