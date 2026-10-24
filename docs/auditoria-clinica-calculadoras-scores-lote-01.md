# Auditoria clínica da LURIA — Lote 01/06 (calculadoras 1–30)

**Data:** 24 de outubro de 2026  
**Escopo:** 30 primeiras calculadoras na ordem de `C` em `trabalho/calculadora/index.html`, de CKD-EPI 2021 a índice ROX.  
**Objetivo:** exatidão aritmética, unidades, condições de aplicação, campos obrigatórios, interpretação, perigos no fluxo assistencial e referências.  
**Fora do escopo neste lote:** demais 42 calculadoras, todos os 95 scores (incluindo 28 referências sem cálculo), integração em prontuário e validação clínica prospectiva.

## Avaliação individual

| # | Ferramenta | Resultado da auditoria e intervenção |
|---:|---|---|
| 01 | CKD-EPI 2021 — creatinina | Fórmula confrontada com NKF/NIDDK; restringida à idade adulta, alerta sobre creatinina instável e marcador padronizado. |
| 02 | Cockcroft–Gault | Fórmula confirmada; valida idade adulta e explicita necessidade de escolher peso adequado para o fármaco. |
| 03 | FENa | Expressão e unidades conferidas; reforçadas amostras pareadas e baixa especificidade (diuréticos, DRC, sepse, etc.). |
| 04 | FEUreia | Expressão conferida; destaca que ureia urinária e plasmática precisam da MESMA unidade e que o índice é apenas adjunto diagnóstico. |
| 05 | CKD-EPI 2021 — creatinina+cistatina C | Coeficientes confrontados com NKF/NIDDK; restringida a adultos e marcadores padronizados IDMS/IFCC. |
| 06 | Pressão arterial média | Fórmula conservada; acrescentada validação de PAS ≥ PAD. |
| 07 | Índice de choque | Cálculo FC/PAS confirmado; ressalva para idade, gestação e condições clínicas. |
| 08 | QTc | **Erro funcional corrigido:** o sistema interpretava por sexo sem perguntar sexo. Campo e alerta sobre extremos de FC incluídos. |
| 09 | Pressão de pulso | Fórmula conservada; impede pressão diastólica superior à sistólica. |
| 10 | Ânion gap | Mantida fórmula sem potássio; alertas sobre albumina e referências locais. |
| 11 | Fórmula de Winter | **Condição de uso corrigida:** aplica-se a acidose metabólica, não a bicarbonato normal/elevado. |
| 12 | Déficit de água livre | Bloqueada interpretação fora de hipernatremia (>145 mEq/L), sem transformar déficit em ordem de infusão. |
| 13 | Preparo de KCl | **Proteção crítica:** campos de volume FINAL e via, cálculo de taxa e concentração final; bloqueios para condições de alto risco; proibição explícita de bolus de concentrado. |
| 14 | Adrogué–Madias | **Erro funcional corrigido:** é aceito potássio zero na solução. Alertas sobre variação estimada por 1 L e não extrapolação linear. |
| 15 | Déficit de sódio | Mantido como déficit TEÓRICO, não quantidade prescritível; checagem de sódio-alvo. |
| 16 | Volume teórico de NaCl 3% | **Revisão crítica:** substituída extrapolação linear de variação por litro por modelo de mistura; limitado a cenários apropriados. Exibido como modelo físico, NÃO dose, volume recomendado ou velocidade de infusão. |
| 17 | Ânion gap corrigido | Fórmula de albumina confirmada com necessidade de amostras pareadas e referência do laboratório. |
| 18 | Sódio corrigido pela glicemia | Opções explícitas Katz 1,6 e Hillier 2,4, com restrição a hiperglicemia e incerteza em glicemia elevada. |
| 19 | Osmolalidade calculada | Identificação expressa de BUN (nitrogênio ureico, **não ureia**) e validação de unidades. |
| 20 | Gap osmolar | Também diferencia BUN de ureia e destaca álcoois/outros osmóis não incluídos no cálculo basal. |
| 21 | Delta ratio | **Condição de uso corrigida:** exige AG corrigido elevado e HCO₃ reduzido; bloqueia cálculos com denominador nulo/não pertinente. |
| 22 | Cálcio corrigido por albumina | Fórmula mantida com aviso forte: não substitui cálcio ionizado, particularmente na UTI e acidose/alcalose. |
| 23 | HbA1c → glicemia média estimada | Equação original conservada; valida faixa plausível e diferencia média retrospectiva de glicose atual. |
| 24 | LDL Friedewald | Preserva bloqueio de TG ≥400 mg/dL; agora bloqueia resultados negativos ou CT/HDL incompatíveis e alerta sobre baixa precisão. |
| 25 | IMC | Classificação da tela explicitamente adulta; bloqueia classificação incorreta de pediátricos. |
| 26 | Superfície corporal Mosteller | Expressão e conversões conferidas; finalidade e não equivalência a peso real esclarecidas. |
| 27 | Peso ideal Devine | Aviso sobre idade adulta/altura mínima de 152,4 cm e uso específico na dose, não como meta nutricional. |
| 28 | Peso ajustado | Só para adultos e situações com peso real ≥ ideal, quando protocolo do medicamento assim recomenda. |
| 29 | PaO₂/FiO₂ | Converte percentagem para fração; valida FiO₂ entre 21–100% e ressalta critérios completos da SDRA. |
| 30 | Índice ROX | **Interpretação aprimorada:** inclui tempo desde início de CNAF (2, 6 ou 12 h), limiares diferentes de falha e orientação para contexto populacional validado. |

## Implementação e testes

- **Definições e validação:** `assets/js/clinical-calculators-audit-batch1.js`.
- **Carregamento:** `trabalho/calculadora/index.html`, após a expansão clínica existente.
- **Cache:** `service-worker.js`, versão atualizada para invalidar o cache PWA anterior.
- **Teste reproduzível:** `tests/clinical-calculators-audit-batch1.test.cjs`.
- **Execução sugerida:** `node --test tests/clinical-calculators-audit-batch1.test.cjs`.
- Foram executados na sessão de auditoria **30 testes numéricos positivos e 10 testes de rejeição** usando avaliação isolada das definições; nenhum falhou antes dos últimos refinamentos menores. A suíte Node foi adicionada ao repositório, **mas a execução pela CI do projeto e teste visual no navegador não foram confirmados**.
- Os testes são unitários de fórmulas/limites, **não constituem ensaio clínico, certificação regulatória, validação de dose ou aprovação para uso autônomo em pacientes reais**.

## Pontos de atenção ainda necessários

1. Conferir validação independente de cálculos de reposição e protocolos locais (principalmente KCl/NaCl 3%), com médico e farmacêutico antes de liberar no Modo Trabalho.
2. Os métodos de TFG devem considerar creatinina não estável, idade, área corporal e população validada. Em fármacos, a fórmula exigida pela bula prevalece.
3. Cálcio corrigido, FENa, FEUreia, delta ratio, ROX e imprecisões de sódio são complementos ao raciocínio, e não regras autossuficientes.
4. Testar interação na tela PWA real (inclusive acessibilidade, campos com valor zero, proteção CSP, funcionamento offline e sessão autenticada).
5. Rodar os testes em CI e revisar resultados limites com casos clínicos sintéticos e protocolo institucional.

## Fontes científicas prioritárias verificadas

- Sociedade Brasileira de Nefrologia / SBPC-ML. [Consenso brasileiro: TFG estimada na prática clínica](https://pmc.ncbi.nlm.nih.gov/articles/PMC11300030/).
- National Kidney Foundation. [CKD-EPI 2021 creatinina](https://www.kidney.org/ckd-epi-creatinine-equation-2021) e [creatinina+cistatina C](https://www.kidney.org/professionals/ckd-epi-creatinine-cystatin-equation-2021).
- NIDDK. [Equações de TFG em adultos](https://www.niddk.nih.gov/research-funding/research-programs/kidney-clinical-research-epidemiology/laboratory/glomerular-filtration-rate-equations/adults).
- OPAS. [Sódio corrigido na hiperglicemia](https://recursos.opas.org.br/en/tools/corrected-sodium-calculator).
- European Society of Endocrinology et al. [Clinical Practice Guideline on Hyponatraemia](https://academic.oup.com/ejendo/article/170/3/G1/6668028).
- NHS Specialist Pharmacy Service. [Tratamento de hipocalemia aguda em adultos](https://sps.nhs.uk/articles/hypokalaemia/).
- National Lipid Association. [Lipid measurements — recommendations](https://www.lipid.org/sites/default/files/files/JACL%201734%281%29.pdf).
- Roca et al. [Validação do ROX](https://pubmed.ncbi.nlm.nih.gov/30576221/).

**Próxima etapa:** lote 02/06 — calculadoras 31–60, mantendo o mesmo padrão científico, editorial, funcional e de regressão.
