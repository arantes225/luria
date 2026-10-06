# Padrão editorial das Apostilas LURIA

## Regra central
**Nível de aprofundamento: ALTO.**

Cada apostila deve ser escrita como se fosse o principal e, se necessário, o único material de estudo do leitor sobre aquele tema. O texto não pode depender de outra fonte para completar conceitos essenciais.

## Princípios obrigatórios

1. Explicar, não apenas listar.
2. Desenvolver o raciocínio fisiopatológico e clínico.
3. Organizar o conteúdo do básico ao avançado.
4. Evitar tópicos telegráficos quando o tema exigir desenvolvimento.
5. Incluir, quando aplicável:
   - definição;
   - epidemiologia e fatores de risco;
   - fisiopatologia;
   - quadro clínico;
   - classificação;
   - diagnóstico;
   - critérios diagnósticos;
   - diagnósticos diferenciais;
   - exames complementares e interpretação;
   - tratamento não farmacológico;
   - tratamento farmacológico;
   - doses, vias, ajustes e monitorização quando pertinentes;
   - situações especiais;
   - complicações e mecanismo de cada complicação;
   - prognóstico;
   - seguimento;
   - condutas práticas;
   - pontos de prova e armadilhas frequentes.
6. Tabelas, algoritmos, fluxogramas e callouts devem complementar o texto, nunca substituir explicações necessárias.
7. A leitura deve permitir que o aluno entenda **por que** uma conduta é tomada, não apenas qual é a conduta.
8. Sempre que houver material interno LURIA/Drive sobre o tema, ele deve ser consultado para entender cobertura, sequência e estilo didático. Conteúdo desatualizado não deve ser perpetuado quando diretrizes mais recentes divergirem.
9. Referências devem aparecer em lista organizada, priorizando diretrizes, consensos e entidades brasileiras quando disponíveis.
10. Se um subtópico introduzir uma nova entidade clínica (por exemplo, hipoglicemia), tratá-la como um mini-capítulo completo: definição, fisiopatologia, quadro clínico, diagnóstico, classificação quando aplicável, tratamento e prevenção/seguimento.

## Critério de qualidade
Antes de publicar, perguntar: **“Um estudante conseguiria estudar esse tema do zero até um nível de prova e prática clínica usando apenas esta apostila?”**  
Se a resposta for não, o conteúdo ainda está insuficiente.


## Regra obrigatória de imagens — curadoria antes da publicação

11. **Toda nova apostila deve pesquisar no mínimo 10 imagens candidatas**, mesmo que nem todas sejam utilizadas no resultado final.
12. A busca de imagens faz parte da criação da apostila e deve acontecer antes da publicação final. Não usar imagem apenas para “encher” a página: cada candidata precisa ter uma justificativa didática clara.
13. Prioridade de fontes:
   - Ministério da Saúde, CONITEC, ANVISA, Fiocruz, universidades públicas e sociedades médicas brasileiras;
   - OMS/WHO, CDC, NIH/NCI, PhysioNet e outras entidades institucionais;
   - Wikimedia Commons apenas quando a licença for compatível e a autoria/licença puderem ser preservadas;
   - artigos científicos e atlas com permissão/licença compatível.
14. Para cada imagem candidata, registrar obrigatoriamente:
   - URL direta da imagem;
   - URL da fonte original;
   - nome da fonte/autoria;
   - licença/condição de uso quando disponível;
   - legenda sugerida;
   - texto alternativo;
   - seção/subseção exata onde a imagem deve entrar;
   - justificativa didática em uma frase.
15. **Não baixar nem armazenar definitivamente a candidata antes da aprovação humana.** A fila deve referenciar a imagem original. Isso evita ocupar Storage com imagens que serão rejeitadas.
16. Toda nova apostila deve abrir, para o administrador, com um bloco de **“Curadoria de imagens” logo após a capa/hero**, semelhante à fila de imagens do Admin, contendo no mínimo 10 candidatas e os comandos:
   - **Expandir** — ver a imagem em tamanho maior;
   - **Rejeitar** — excluir definitivamente a candidata da fila;
   - **Aprovar** — aprovar a imagem e inseri-la automaticamente no ponto do texto previamente definido.
17. Imagens pendentes **não aparecem no corpo da apostila para o aluno**. Somente imagens aprovadas podem ser renderizadas no conteúdo.
18. Ao aprovar, a imagem deve entrar junto do trecho que ela explica, nunca em uma galeria aleatória. A legenda deve dizer ao aluno **o que observar** na figura e citar a fonte.
19. Ao rejeitar, a candidata deve ser removida da fila, sem permanecer como item “rejeitado” ocupando espaço ou poluindo a curadoria.
20. O mínimo de 10 candidatas é uma regra de **busca e curadoria**, não uma meta de 10 imagens publicadas. A apostila final pode ter menos imagens se apenas algumas forem realmente boas e didaticamente necessárias.
21. Imagens indispensáveis ao entendimento de um instrumento, exame, anatomia, mecanismo ou classificação devem receber prioridade. Exemplos: partograma em uma apostila de assistência ao parto, ECG em uma apostila de eletrocardiografia, radiografia quando o diagnóstico depende do padrão radiológico e fotografias clínicas quando a morfologia é central ao reconhecimento.
22. Sempre preferir a **figura útil isolada** ao PDF/documento inteiro incorporado. Se a fonte for um PDF, extrair/recortar apenas a figura necessária e preservar a referência da publicação original.

23. Ao registrar uma candidata, garantir que o domínio da imagem esteja contemplado no `img-src` da Content-Security-Policy da apostila; ao aprovar uma nova fonte, atualizar o CSP se necessário para que a imagem realmente carregue.
