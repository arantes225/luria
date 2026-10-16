# Radar de provas

Rota: `/aplicar/radar/`, acessível pelo hub Aplicar e pela navegação do Currículo. Reutiliza o shell, autenticação e variáveis dos quatro temas do site. Não introduz tabelas ou permissões de banco de dados.

O seletor reúne 45 provas: 37 com tabelas utilizáveis da MedCof e 31 com mapas Aristo, com sobreposição entre fontes. A MedEvo não integra os dados publicados.

## Dados e ordem

`assets/data/radar-provas.json` é uma fotografia de 16/10/2026. Cada entrada da MedCof preserva URL, tabela, linha, perfil, subárea, valor e metadados da publicação. A ordenação ocorre dentro da mesma prova, perfil e grande área, por contagem decrescente; empates têm a mesma posição. Não são percentuais de incidência e não constituem uma recontagem independente das provas. O conjunto contém apenas a seleção temática dos artigos, não todas as questões das bancas.

Ginecologia e Obstetrícia compartilham a grande área na interface, mantendo a classificação original nos metadados. A pessoa acessa diretamente assuntos específicos; Cardiologia e outras subáreas aparecem somente como contexto abaixo do tema.

135 entradas da extração MedCof foram retidas: unidades incompatíveis, agrupamentos residuais, subáreas abrangentes, recorte histórico incerto ou inconsistências editoriais identificadas. Elas não são servidas ao cliente nem recebem posição. O artigo PUC-RS, originalmente publicado em 2024, não entra no seletor utilizável.

Aristo não fornece contagens. Somente temas gerais com identificação explícita da grande área são filtrados por área; sua ordem é editorial, sem ranking numérico. Os dez destaques gerais de cada mapa continuam consultáveis em uma seção separada. Não se somam fontes e não se infere que um tema ausente nunca seja cobrado. Os PDFs e URLs com tokens não são publicados.

## Validação

- Testes `tests/radar.test.cjs`: ordenação, empates, dados numéricos, exclusão de grupos residuais, troca de área/prova/fonte e busca vazia.
- Testes Currículo executados antes da publicação; workflow inclui ambos.
- Sintaxe, CSS/rotas, CSP e geração de `build/pages` conferidos.
- Conferência visual local em 1280px e 390px, com autenticação substituída somente pelo servidor local de teste.

Os testes globais de CSP contêm falhas legadas em fallback de imagens de apostilas e inventário fixo de páginas; não se alterou esse comportamento para acomodar o Radar. O teste de startup inicialmente oscilou em uma execução concorrente e passou na execução isolada.
