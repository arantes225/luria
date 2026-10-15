# LURIA — Lote 12: controle de produção e handoff editorial

**Data:** 15/10/2026  
**Branch isolada:** `editorial/lote-12-producao-20261015`  
**Base:** `audit/enamed-7areas-lotes-finais-20261015` (inclui matrizes ENAMED 7 áreas e MedCof 401 aulas)  
**Norma superior:** `lead.apostilas.txt` — mínimo editorial desejável ~60 mil caracteres **úteis por apostila**, 4 casos e 6 questões, imagens reais autorizadas, referências científicas, revisão médica.  
**Regra de segurança:** não publicar/aprovar/deployar rascunhos; não sobrescrever as apostilas publicadas, nem mesclar conteúdo de módulos Diamante que se complementam.

## Escopo consolidado: 18 entradas

| ID | Título / destino | Tipo | Conteúdo prioritário | Situação |
|---|---|---|---|---|
| 238 | Trauma raquimedular e avaliação neurológica inicial | Original | Alta; TC/RM, AIS, choque, cirurgia | **MANUSCRITO 32.211 caracteres — ampliação pendente** |
| 239 | Catarata, glaucoma crônico e retinopatias | Original | Alta; oftalmopediatria, retina, catarata e glaucoma; não duplicar #195 | **MANUSCRITO 33.101 caracteres — ampliação pendente** |
| 240 | Aneurisma da aorta e emergências vasculares | Original | Alta; AAA, dissecção e tratamento | **PENDENTE** |
| 241 | Malformações congênitas e síndromes genéticas | Original | Alta; SNC, diferenças do desenvolvimento sexual, genética | **PENDENTE** |
| 242 | Doença celíaca e síndromes de má absorção | Original | Alta; diarreia crônica, má absorção; diferenciais | **PENDENTE** |
| 243 | Oncologia pediátrica: leucemias, linfomas e tumores sólidos | Original | Diamante; emergências oncológicas pediátricas | **PENDENTE** |
| 244 | Púrpuras, coagulopatias e hemoglobinopatias pediátricas | Original | Média/Diamante; hemostasia, anemia falciforme | **PENDENTE** |
| 245 | Puberdade precoce e atrasada | Original | Alta/Média; HAC, tireoide e endocrinologia | **PENDENTE** |
| 246 | Afogamento e emergências ambientais na infância | Original | Baixa/essencial; APH e prevenção | **PENDENTE** |
| 247 | Hiperêmese gravídica | Original | GO; estabilização, diagnósticos diferenciais | **PENDENTE** |
| 248 | Colestase intra-hepática da gestação | Original | GO; ácidos biliares, monitoramento e parto | **PENDENTE** |
| 249 | Violência sexual e direitos reprodutivos na assistência | Original | Alta/Média; acolhimento, profilaxias, legalidade | **PENDENTE** |
| 266 | Oncologia de cabeça e pescoço | Nova | CEC, massas cervicais e estadiamento | **PENDENTE** |
| 267 | Endoscopia digestiva e urgências endoscópicas | Nova | Hemorragia digestiva, corpos estranhos | **PENDENTE** |
| 268 | Cirurgia cardiovascular para o generalista | Nova | Coronariana, valvar, aorta; links #240 | **PENDENTE** |
| 269 | Ultrassonografia obstétrica e medicina fetal | Nova | US, Doppler, avaliação fetal; sem repetir #89 | **PENDENTE** |
| 270 | Intercorrências clínicas na gestação | Nova | Cardiopatias, trombofilias e outros agravos | **PENDENTE** |
| 278 | Ciclo menstrual e eixo hipotálamo–hipófise–ovário | **Já existente** | Fisiologia menstrual e esteroidogênese | **EXISTE — `/apostilas/ciclo-menstrual-eixo-hho/`; NÃO RECRIAR** |

## Apostila existente #278 — verificação preliminar real

Foi lido `apostilas/ciclo-menstrual-eixo-hho/index.html` na branch-base: arquivo com **81.031 caracteres**, estrutura que inclui “Arquitetura do eixo hipotálamo-hipófise-ovário”, “Esteroidogênese: modelo das duas células–duas gonadotrofinas”, “Foliculogênese”, “Fase folicular”, “Ovulação”, “Fase lútea”, “Ciclo endometrial” e “Casos clínicos comentados”. Busca textual encontrou GnRH, FSH, LH, aromatase, inibina, feedback negativo e outras expressões nucleares. **Isso comprova presença textual, não qualidade científica ou completude.** Conservar o conteúdo e depois auditar contradições, tópicos faltantes e correspondência com módulos MedCof (“Fisiologia Menstrual” e “Esteroidogênese”). Não abrir uma segunda apostila #278.

## Scripts oficiais de mapeamento

- `assets/js/apostilas-lotes-225.js`: agrupamento do lote 12 e etiquetas editoriais.
- `assets/js/apostilas-editorial-enamed-2026.js`: tarefas e notas específicas, incluindo #266–270 e #278.
- `assets/js/apostilas-medcof-401.js`: vínculos 401 aulas MedCof por destino principal e referência cruzada.
- Matriz-base ENAMED em sete áreas; nomes de apostilas originais 238–249 preservados.
- Estado atual da branch separado da publicação. **Nunca atribuir 'concluído' à correspondência automática do cronograma.**

## Regras obrigatórias para próximas iterações

1. Ler `lead.apostilas.txt` antes de ação.
2. Conferir se arquivo publicado/rascunho existe; aproveitar em vez de apagar.
3. Não declarar conclusão com menos de ~60 mil caracteres úteis sem justificativa clínica, nem com lacunas de diagnóstico/tratamento/casos/questões.
4. Ao aprofundar #238 ou #239, editar o **mesmo** manuscrito; não criar outra versão paralela.
5. Auditar fontes oficiais, divergências de guidelines e doses/contraindicações antes de aprovação.
6. Curadoria visual: ≥10 candidatas por tema quando apropriado, **licença verificada**, seleção proporcional à didática, otimização WebP e acessibilidade.
7. Após conclusão editorial, Codex executará auditoria técnica/geral e integração; **não realizar deploy automático**.
8. Preservar o padrão de capítulos (base → mecanismo → clínica → diagnóstico → diferencial → estratificação → conduta → casos → questões → imagens → bibliografia → auditoria).
9. Atualizar tabela acima em cada nova entrega e registrar commit.
10. Verificar continuamente sobreposições (ex.: #240 com #268; #239 com #195; #269 com #89; #241 com #245).

## Controle de aprovação

Não existe nesta data autorização de publicação: **0/18 itens estão certificados como finalizados.** Dos 18, **2 manuscritos estão iniciados**, 15 entradas novas/originais aguardam produção e 1 apostila já está publicada e aguarda auditoria pontual. O status deve mudar somente após comprovação por inspeção real do arquivo e checklist de qualidade.
