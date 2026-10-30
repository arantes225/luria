/* LURIA | Calculadoras clinicas - lote 4 (expansao), 2026-10-26.
 * Carregar DEPOIS de clinical-calculators-audit-batch3.js (que valida a ordem do catalogo).
 * Apoio matematico: NAO prescreve, NAO substitui protocolo institucional nem julgamento clinico.
 * Revisao assistencial externa pendente antes de uso em producao.
 */
(() => {
  if (typeof C === "undefined" || typeof defs === "undefined" || typeof cats === "undefined" || typeof render !== "function") return;
  const calcInterp = (typeof calcInterpretations !== "undefined") ? calcInterpretations : (window.calcInterpretations = {});
  const f = (n, d = 1) => (+n).toLocaleString("pt-BR", { maximumFractionDigits: d });
  const num = (id, label, unit) => [id, label, "number", unit || ""];
  const sel = (id, label, opts) => [id, label, "select", opts];
  const opt = (s) => parseFloat(String(s).replace(/^[^0-9]*?([0-9]+(?:[.,][0-9]+)?).*$/, "$1").replace(",", "."));
  const need = (cond, msg) => { if (!cond) throw Error(msg); };
  const S = {
    hemo: "Formulas hemodinamicas classicas; valores dependem da tecnica de medicao.",
    acid: "Equacoes classicas de equilibrio acido-base e eletrolitos; interpretar com o quadro clinico.",
    renal: "KDIGO 2024 (CKD) e formulas classicas de depuracao; interpretar com contexto.",
    vent: "Tobin/Yang NEJM 1991 (RSBI); PALICC 2015 (OI); formulas classicas de mecanica ventilatoria.",
    ped: "PALS/APLS; formulas de estimativa, preferir medicao/fita de Broselow quando disponivel.",
    drug: "Calculo de dose por peso/superficie. Confirmar com bula, protocolo institucional e dupla checagem independente.",
    liver: "AASLD/EASL; formulas classicas. Interpretar com o contexto.",
    rheum: "ACR/EULAR; Prevoo 1995 (DAS28), Aletaha 2005 (CDAI).",
    conv: "Fatores de conversao laboratoriais convencionais para SI.",
    gen: "Formula classica; conferir unidade e contexto clinico."
  };
  const items = [], extra = {}, msg = {};
  const add = (cat, code, title, purpose, id, fields, formula, calc, ref, interp) => {
    items.push([cat, code, title, purpose, id]);
    extra[id] = { fields, formula, calc, reference: ref, auditDate: "2026-10-26" };
    if (interp) msg[id] = interp;
  };

  // ---------- Cardiovascular ----------
  add("Cardiovascular", "RVS", "Resistência vascular sistêmica", "Pós-carga a partir de PAM, PVC e débito cardíaco", "svr",
    [num("map", "PAM", "mmHg"), num("cvp", "PVC", "mmHg"), num("co", "Débito cardíaco", "L/min")],
    "RVS = (PAM − PVC) × 80 / DC (dyn·s·cm⁻⁵). Referência usual 800–1200.",
    v => { need(+v.map > +v.cvp, "PAM deve ser maior que a PVC."); return [(+v.map - +v.cvp) * 80 / +v.co, "dyn·s·cm⁻⁵"]; }, S.hemo,
    n => n < 800 ? "Abaixo de 800: padrão vasodilatado (ex.: sepse, anafilaxia)." : n <= 1200 ? "Faixa usual (800–1200)." : "Acima de 1200: vasoconstrição/pós-carga elevada.");
  add("Cardiovascular", "IC", "Índice cardíaco", "Débito cardíaco indexado à superfície corporal", "cardiacindex",
    [num("co", "Débito cardíaco", "L/min"), num("bsa", "Superfície corporal", "m²")],
    "IC = DC / SC (L/min/m²). Referência usual 2,5–4,0.",
    v => [+v.co / +v.bsa, "L/min/m²"], S.hemo,
    n => n < 2.2 ? "Baixo (<2,2): considerar baixo débito, com PAM, lactato e perfusão." : n <= 4 ? "Faixa usual (2,5–4,0)." : "Elevado (>4,0): considerar estados hiperdinâmicos.");
  add("Cardiovascular", "PPC", "Pressão de perfusão cerebral", "Perfusão cerebral em monitorização de PIC", "cpp",
    [num("map", "PAM", "mmHg"), num("icp", "PIC", "mmHg")],
    "PPC = PAM − PIC. Meta em TCE grave geralmente 60–70 mmHg (Brain Trauma Foundation 2016/2019).",
    v => { need(+v.map > +v.icp, "PAM deve ser maior que a PIC."); return [+v.map - +v.icp, "mmHg"]; }, "Brain Trauma Foundation, Guidelines for Severe TBI, 4ª ed. (2016) e atualização 2019.",
    n => n < 60 ? "Abaixo da faixa-alvo usual (60–70 mmHg) em TCE grave." : n <= 70 ? "Dentro da faixa-alvo usual (60–70 mmHg)." : "Acima de 70: evitar elevações agressivas rotineiras de PPC (risco de SDRA).");
  add("Cardiovascular", "O₂C", "Conteúdo arterial de O₂ (CaO₂)", "Oxigênio transportado por dL de sangue arterial", "cao2",
    [num("hb", "Hemoglobina", "g/dL"), num("sat", "SaO₂", "%"), num("pao2", "PaO₂", "mmHg")],
    "CaO₂ = 1,34 × Hb × SaO₂/100 + 0,003 × PaO₂ (mL O₂/dL).",
    v => { need(+v.sat <= 100, "SaO₂ deve ser ≤ 100%."); return [1.34 * +v.hb * +v.sat / 100 + 0.003 * +v.pao2, "mL O₂/dL"]; }, S.hemo,
    () => "Valor usual em adultos ~16–22 mL/dL. Constante de Hüfner 1,34 (algumas fontes usam 1,36–1,39).");
  add("Cardiovascular", "DO₂", "Oferta de O₂ (DO₂)", "Oferta sistêmica de oxigênio", "do2",
    [num("co", "Débito cardíaco", "L/min"), num("hb", "Hemoglobina", "g/dL"), num("sat", "SaO₂", "%"), num("pao2", "PaO₂", "mmHg")],
    "DO₂ = DC × CaO₂ × 10 (mL O₂/min). Usual ~900–1100 em repouso.",
    v => { need(+v.sat <= 100, "SaO₂ deve ser ≤ 100%."); const ca = 1.34 * +v.hb * +v.sat / 100 + 0.003 * +v.pao2; return [+v.co * ca * 10, "mL O₂/min"]; }, S.hemo);

  // ---------- Metabólico / Renal ----------
  add("Metabólico", "HCO₃", "Déficit de bicarbonato", "Estimativa de bicarbonato para atingir alvo", "hco3def",
    [num("w", "Peso", "kg"), num("cur", "HCO₃⁻ atual", "mEq/L"), num("tgt", "HCO₃⁻ alvo", "mEq/L"), sel("k", "Espaço de distribuição", "0,5 (padrão)|0,4 (acidose leve)|0,6 (acidose grave)")],
    "Déficit (mEq) = fator × peso × (HCO₃ alvo − HCO₃ atual). Repor parcialmente (≈ metade) e reavaliar.",
    v => { need(+v.tgt > +v.cur, "O alvo deve ser maior que o valor atual."); return [opt(v.k) * +v.w * (+v.tgt - +v.cur), "mEq"]; }, S.acid,
    () => "Não repor o déficit total de uma vez. Bicarbonato tem indicações restritas (ex.: acidose grave com pH muito baixo, hiperpotassemia, intoxicações específicas). Tratar a causa.");
  add("Metabólico", "UAG", "Ânion gap urinário", "Distinguir perda gastrointestinal de acidose tubular renal", "uag",
    [num("na", "Na⁺ urinário", "mEq/L"), num("k", "K⁺ urinário", "mEq/L"), num("cl", "Cl⁻ urinário", "mEq/L")],
    "AG urinário = Na⁺ + K⁺ − Cl⁻ (mEq/L).",
    v => [+v.na + +v.k - +v.cl, "mEq/L"], S.acid,
    n => n < 0 ? "Negativo: sugere excreção adequada de NH₄⁺ (ex.: diarreia)." : "Positivo: sugere defeito de acidificação renal (ex.: acidose tubular renal). Menos confiável com cetonúria ou ânions não medidos.");
  add("Metabólico", "LAC", "Depuração de lactato", "Variação percentual do lactato entre duas dosagens", "lacclear",
    [num("l0", "Lactato inicial", "mmol/L"), num("l1", "Lactato após reavaliação", "mmol/L")],
    "Depuração (%) = (lactato inicial − lactato final) / lactato inicial × 100.",
    v => [(+v.l0 - +v.l1) / +v.l0 * 100, "%"], "Surviving Sepsis Campaign 2021 (ressuscitação guiada por lactato).",
    n => n >= 10 ? "Depuração ≥ 10% no intervalo; acompanhar tendência junto da clínica." : "Depuração < 10%: reavaliar perfusão, volemia, fonte e controle da causa.");
  add("Renal", "ClCr24", "Depuração de creatinina 24 h", "Clearance medido em urina de 24 horas", "crcl24",
    [num("uc", "Creatinina urinária", "mg/dL"), num("vol", "Volume urinário 24 h", "mL"), num("pc", "Creatinina plasmática", "mg/dL")],
    "ClCr = (creatinina urinária × volume) / (creatinina plasmática × 1440) (mL/min).",
    v => [+v.uc * +v.vol / (+v.pc * 1440), "mL/min"], S.renal,
    () => "Coleta incompleta é a principal fonte de erro; superestima a TFG verdadeira por secreção tubular de creatinina.");
  add("Renal", "RPC", "Relação proteína/creatinina urinária", "Proteinúria em amostra isolada", "upcr",
    [num("up", "Proteína urinária", "mg/dL"), num("uc", "Creatinina urinária", "mg/dL")],
    "RPC = proteína urinária / creatinina urinária (mg/mg ≈ g/g).",
    v => [+v.up / +v.uc, "mg/mg"], "KDIGO 2024 CKD Guideline.",
    n => n < 0.15 ? "< 150 mg/g: dentro do esperado." : n <= 0.5 ? "150–500 mg/g: proteinúria leve." : n < 3.5 ? "> 500 mg/g: proteinúria significativa." : "≥ 3,5 g/g: faixa nefrótica (confirmar clínica e albumina).");
  add("Renal", "U/Cr", "Relação ureia/creatinina", "Padrão pré-renal vs. outras causas", "bunratio",
    [num("u", "Ureia", "mg/dL"), num("cr", "Creatinina", "mg/dL")],
    "Ureia/Cr = (ureia / 2,14) / creatinina, ou seja, BUN/Cr. Por ureia em mg/dL.",
    v => [(+v.u / 2.14) / +v.cr, ""], S.renal,
    n => n > 20 ? "BUN/Cr > 20: compatível com padrão pré-renal, sangramento digestivo alto, catabolismo ou corticoide; não é específico." : "BUN/Cr ≤ 20: sem padrão pré-renal clássico; interpretar com o contexto.");

  // ---------- Respiratório ----------
  add("Respiratório", "OI", "Índice de oxigenação (OI)", "Gravidade da hipoxemia em ventilação mecânica", "oi",
    [num("mawp", "Pressão média de via aérea", "cmH₂O"), num("fio", "FiO₂", "%"), num("pao2", "PaO₂", "mmHg")],
    "OI = (Paw × FiO₂ em %) / PaO₂.",
    v => [+v.mawp * +v.fio / +v.pao2, ""], S.vent,
    n => n < 4 ? "OI < 4." : n < 8 ? "OI 4–7,9: faixa leve (critérios pediátricos PALICC)." : n < 16 ? "OI 8–15,9: faixa moderada (PALICC)." : "OI ≥ 16: faixa grave (PALICC).");
  add("Respiratório", "RSBI", "Índice de respiração rápida superficial", "Auxílio na predição de sucesso de desmame", "rsbi",
    [num("rr", "Frequência respiratória", "irpm"), num("vt", "Volume corrente", "mL")],
    "RSBI = FR / VT (L), em respiração espontânea (Yang e Tobin).",
    v => [+v.rr / (+v.vt / 1000), "irpm/L"], S.vent,
    n => n < 105 ? "< 105: associado a maior chance de sucesso na extubação, não é decisório isoladamente." : "≥ 105: maior risco de falha; reavaliar com teste de respiração espontânea e clínica.");
  add("Respiratório", "VM", "Ventilação-minuto", "Volume corrente × frequência", "minvent",
    [num("vt", "Volume corrente", "mL"), num("rr", "Frequência respiratória", "irpm")],
    "VM = VT × FR / 1000 (L/min).", v => [+v.vt * +v.rr / 1000, "L/min"], S.vent);
  add("Respiratório", "Raw", "Resistência de vias aéreas", "Resistência em ventilação com fluxo constante", "raw",
    [num("pip", "Pressão de pico", "cmH₂O"), num("pplat", "Pressão de platô", "cmH₂O"), num("flow", "Fluxo inspiratório", "L/min")],
    "Raw = (Ppico − Pplatô) / fluxo (L/s). Válido em ventilação controlada com fluxo constante.",
    v => { need(+v.pip > +v.pplat, "Ppico deve ser maior que Pplatô."); return [(+v.pip - +v.pplat) / (+v.flow / 60), "cmH₂O/L/s"]; }, S.vent,
    () => "Aumento sugere obstrução (secreção, broncoespasmo, tubo dobrado). Pico alto com platô normal indica componente resistivo.");
  add("Respiratório", "VD/VT", "Fração de espaço morto alveolar", "Estimativa por PaCO₂ e PetCO₂", "deadspace",
    [num("pa", "PaCO₂", "mmHg"), num("pet", "PetCO₂", "mmHg")],
    "Fração = (PaCO₂ − PetCO₂) / PaCO₂. Aproximação do espaço morto alveolar, não o de Bohr-Enghoff completo.",
    v => { need(+v.pa >= +v.pet, "PetCO₂ não deve exceder a PaCO₂."); return [(+v.pa - +v.pet) / +v.pa, ""]; }, S.vent,
    () => "Aumento sugere ventilação sem perfusão (ex.: TEP, hipovolemia, hiperinsuflação). Depende de boa curva de capnografia.");
  add("Respiratório", "O₂cil", "Autonomia de cilindro de oxigênio", "Tempo estimado de uso", "o2cyl",
    [num("p", "Pressão atual do cilindro", "bar"), num("vol", "Volume hidráulico do cilindro", "L"), num("flow", "Fluxo de O₂", "L/min"), sel("res", "Pressão de reserva", "0|20|30|50")],
    "Tempo (min) = (P − reserva) × volume / fluxo. Gás consumível ≈ pressão × volume do cilindro.",
    v => { need(+v.p > +v.res, "Pressão atual deve exceder a reserva."); return [(+v.p - +v.res) * +v.vol / +v.flow, "min"]; }, "Cálculo físico simplificado (lei de Boyle).",
    () => "Estimativa: o consumo real varia com ventilação, FiO₂ e perdas. Manter reserva e plano de troca antes do término.");

  // ---------- Hematologia / Nutrição / Endócrino ----------
  add("Hematologia", "Fe", "Déficit de ferro (Ganzoni)", "Dose total estimada de ferro parenteral", "ganzoni",
    [num("w", "Peso", "kg"), num("hbc", "Hb atual", "g/dL"), num("hbt", "Hb alvo", "g/dL")],
    "Déficit (mg) = peso × (Hb alvo − Hb atual) × 2,4 + reserva (500 mg se ≥ 35 kg, ou 15 mg/kg se < 35 kg).",
    v => { need(+v.hbt > +v.hbc, "Hb alvo deve ser maior que a Hb atual."); const st = +v.w >= 35 ? 500 : 15 * +v.w; return [+v.w * (+v.hbt - +v.hbc) * 2.4 + st, "mg"]; }, "Ganzoni AM. Schweiz Med Wochenschr 1970.",
    () => "Respeitar dose máxima por infusão e a ficha técnica de cada produto (ferro sacarato, carboximaltose, derivado). Avaliar reação de hipersensibilidade.");
  add("Hematologia", "ABL", "Perda sanguínea máxima permitida", "Volume sanguíneo que pode ser perdido até o Hb alvo", "abl",
    [num("w", "Peso", "kg"), sel("pop", "Perfil", "Homem adulto (75 mL/kg)|Mulher adulta (65 mL/kg)|Criança (75 mL/kg)|Lactente (80 mL/kg)|Recém-nascido a termo (85 mL/kg)"), num("hi", "Hb inicial", "g/dL"), num("hf", "Hb mínima aceitável", "g/dL")],
    "PSMP = volemia estimada × (Hb inicial − Hb final) / Hb média.",
    v => { need(+v.hi > +v.hf, "Hb inicial deve ser maior que a mínima."); return [opt(v.pop) * +v.w * (+v.hi - +v.hf) / ((+v.hi + +v.hf) / 2), "mL"]; }, "Gross JB. Anesthesiology 1983;58:277.",
    () => "Estimativa; a decisão de transfundir deve ser clínica e baseada em protocolo, não só em Hb.");
  add("Antropometria", "RCQ", "Relação cintura-quadril", "Distribuição de gordura abdominal", "whr",
    [num("c", "Circunferência da cintura", "cm"), num("h", "Circunferência do quadril", "cm"), sel("sex", "Sexo", "Feminino|Masculino")],
    "RCQ = cintura / quadril. OMS: risco aumentado se ≥ 0,85 (mulheres) ou ≥ 0,90 (homens).",
    v => [+v.c / +v.h, ""], "OMS, Waist circumference and waist-hip ratio (2008).",
    (n, u, v) => (v.sex === "Feminino" ? n >= 0.85 : n >= 0.90) ? "Acima do limiar OMS de risco metabólico aumentado." : "Abaixo do limiar OMS.");
  add("Endócrino", "FSI", "Fator de sensibilidade à insulina", "Regra de 1800 para análogo ultrarrápido", "isf",
    [num("tdd", "Dose total diária de insulina", "U")],
    "FSI (mg/dL por U) = 1800 / dose total diária (análogo ultrarrápido). Regra empírica.",
    v => [1800 / +v.tdd, "mg/dL por U"], "Regra empírica (1800), referida pela SBD e ADA.",
    () => "Estimativa de partida; individualizar com monitorização. Em internação usar protocolo institucional.");
  add("Endócrino", "RIC", "Relação insulina/carboidrato", "Regra de 500", "icr",
    [num("tdd", "Dose total diária de insulina", "U")],
    "RIC (g de carboidrato por U) = 500 / dose total diária. Regra empírica.",
    v => [500 / +v.tdd, "g/U"], "Regra empírica (500), referida pela SBD e ADA.",
    () => "Estimativa de partida; ajustar clinicamente.");
  add("Endócrino", "COR", "Dose de correção de insulina", "Correção da hiperglicemia", "insulincorr",
    [num("bg", "Glicemia atual", "mg/dL"), num("tgt", "Glicemia alvo", "mg/dL"), num("isf", "Fator de sensibilidade", "mg/dL por U")],
    "Dose = (glicemia − alvo) / fator de sensibilidade.",
    v => { need(+v.bg > +v.tgt, "A glicemia deve ser maior que o alvo."); return [(+v.bg - +v.tgt) / +v.isf, "U"]; }, "Regra empírica (SBD/ADA).",
    () => "Considerar insulina ativa, função renal, jejum e hipoglicemia prévia. Em CAD/EHH seguir protocolo próprio, não esta correção.");

  // ---------- Pediatria ----------
  add("Pediatria", "TOT", "Tubo orotraqueal pediátrico", "Estimativa do diâmetro interno", "ett",
    [num("age", "Idade", "anos")],
    "Com balonete: idade/4 + 3,5; sem balonete: idade/4 + 4; profundidade oral ≈ idade/2 + 12 cm (≥ 1 ano). Estimativas.",
    v => { need(+v.age >= 1 && +v.age <= 14, "Fórmula para 1 a 14 anos."); return [+v.age / 4 + 3.5, "mm DI (com balonete)"]; }, "PALS (AHA); formulas classicas.",
    (n, u, v) => "Sem balonete: " + f(+v.age / 4 + 4, 1) + " mm DI. Profundidade oral aproximada: " + f(+v.age / 2 + 12, 1) + " cm. Ter tubos 0,5 mm acima e abaixo disponíveis e confirmar posição.");
  add("Pediatria", "PESO", "Peso estimado por idade", "Estimativa de peso em emergência pediátrica", "pedweight",
    [num("age", "Idade", "anos")],
    "APLS: 1–5 anos: 2 × idade + 8; 6–12 anos: 3 × idade + 7. Preferir peso medido ou fita de Broselow.",
    v => { need(+v.age >= 1 && +v.age <= 12, "Fórmula para 1 a 12 anos."); return [+v.age <= 5 ? 2 * +v.age + 8 : 3 * +v.age + 7, "kg"]; }, S.ped);
  add("Pediatria", "PAS", "PAS mínima aceitável (pediatria)", "Limite inferior de pressão sistólica", "pedsbp",
    [num("age", "Idade", "anos")],
    "PAS mínima (hipotensão) = 70 + 2 × idade (1–10 anos). Abaixo disso, considerar hipotensão.",
    v => { need(+v.age >= 1 && +v.age <= 10, "Fórmula para 1 a 10 anos."); return [70 + 2 * +v.age, "mmHg"]; }, "PALS (AHA).",
    () => "Hipotensão é sinal tardio de choque em crianças; avaliar perfusão e FC.");
  add("Pediatria", "DH", "Déficit hídrico por % de desidratação", "Volume do déficit estimado", "dehyd",
    [num("w", "Peso", "kg"), num("pct", "Desidratação estimada", "%")],
    "Déficit (mL) = peso (kg) × % desidratação × 10.",
    v => [+v.w * +v.pct * 10, "mL"], "OMS/SBP, diretrizes de terapia de reidratação.",
    () => "A % clínica é estimativa. Preferir reidratação oral quando possível; usar protocolo institucional para fase de reposição e manutenção.");

  // ---------- Infusão e doses ----------
  add("Infusão", "GTT", "Gotejamento", "Velocidade em gotas/min", "drip",
    [num("vol", "Volume", "mL"), num("t", "Tempo", "horas"), sel("fac", "Equipo", "20 gotas/mL (macro)|60 microgotas/mL (micro)")],
    "Gotas/min = volume (mL) × fator / (tempo em h × 60). Microgotas/min = mL/h.",
    v => [+v.vol * opt(v.fac) / (+v.t * 60), "gotas/min"], S.gen,
    () => "Preferir bomba de infusão para medicamentos de alto risco. Fator depende do equipo.");
  add("Infusão", "TINF", "Duração da infusão", "Tempo a partir do volume e da velocidade", "infdur",
    [num("vol", "Volume", "mL"), num("rate", "Velocidade", "mL/h")],
    "Tempo (h) = volume / velocidade.", v => [+v.vol / +v.rate, "horas"], S.gen);
  add("Infusão", "C1V1", "Diluição (C₁V₁ = C₂V₂)", "Volume da solução estoque a usar", "dilution",
    [num("c1", "Concentração do estoque (C₁)", "unid./mL"), num("c2", "Concentração desejada (C₂)", "unid./mL"), num("v2", "Volume final (V₂)", "mL")],
    "V₁ = C₂ × V₂ / C₁; completar com diluente até V₂.",
    v => { need(+v.c2 <= +v.c1, "C₂ deve ser menor ou igual a C₁."); return [+v.c2 * +v.v2 / +v.c1, "mL de estoque"]; }, S.gen,
    (n, u, v) => "Adicionar diluente até " + f(v.v2, 1) + " mL. Usar a mesma unidade de concentração em C₁ e C₂.");
  add("Infusão", "mg/kg", "Dose por peso com limite máximo", "Dose total, limitada ao teto, e volume", "weightdose",
    [num("w", "Peso", "kg"), num("dose", "Dose", "mg/kg"), num("max", "Dose máxima por administração", "mg"), num("conc", "Concentração da solução", "mg/mL")],
    "Dose (mg) = mg/kg × peso, limitada à dose máxima; volume (mL) = dose / concentração.",
    v => [Math.min(+v.dose * +v.w, +v.max), "mg"], S.drug,
    (n, u, v) => (+v.dose * +v.w > +v.max ? "Dose limitada ao máximo informado. " : "") + "Volume: " + f(n / +v.conc, 2) + " mL. Verificar intervalo, via e dose diária máxima na bula.");
  add("Infusão", "mg/m²", "Dose por superfície corporal", "Dose total por mg/m²", "bsadose",
    [num("w", "Peso", "kg"), num("h", "Altura", "cm"), num("dose", "Dose", "mg/m²")],
    "SC (Mosteller) = √(altura × peso / 3600); dose = mg/m² × SC.",
    v => [+v.dose * Math.sqrt(+v.h * +v.w / 3600), "mg"], S.drug,
    (n, u, v) => "SC: " + f(Math.sqrt(+v.h * +v.w / 3600), 2) + " m². Arredondamento e limites de dose seguem o protocolo.");
  add("Infusão", "Calvert", "Dose de carboplatina (Calvert)", "Dose por AUC alvo", "calvert",
    [num("auc", "AUC alvo", "mg/mL·min"), num("gfr", "TFG", "mL/min")],
    "Dose (mg) = AUC × (TFG + 25). TFG limitada a 125 mL/min (FDA).",
    v => [+v.auc * (Math.min(+v.gfr, 125) + 25), "mg"], "Calvert AH et al. J Clin Oncol 1989; FDA (limite de TFG 125).",
    (n, u, v) => (+v.gfr > 125 ? "TFG limitada a 125 mL/min. " : "") + "Uso restrito a oncologia; seguir protocolo e checagem independente.");
  add("Infusão", "Lido", "Dose máxima de lidocaína local", "Limite de lidocaína para infiltração", "lidomax",
    [num("w", "Peso", "kg"), sel("epi", "Solução", "4,5 (sem vasoconstritor)|7 (com adrenalina)")],
    "Máximo: 4,5 mg/kg (limite absoluto 300 mg) sem vasoconstritor; 7 mg/kg (limite absoluto 500 mg) com adrenalina.",
    v => { const withEpi = opt(v.epi) === 7; return [Math.min(opt(v.epi) * +v.w, withEpi ? 500 : 300), "mg"]; }, "Bula/ficha técnica e referencias de anestesia local.",
    n => "Equivale a " + f(n / 10, 1) + " mL de lidocaína 1% ou " + f(n / 20, 1) + " mL de 2%. Aspirar antes de injetar; ter emulsão lipídica disponível (toxicidade sistêmica).");
  add("Infusão", "Enox", "Dose de enoxaparina terapêutica", "Dose por peso", "enox",
    [num("w", "Peso", "kg"), sel("sch", "Esquema", "1 mg/kg a cada 12 h|1,5 mg/kg a cada 24 h|1 mg/kg a cada 24 h (ClCr < 30 mL/min)")],
    "Dose (mg) = peso × 1 mg/kg (a cada 12 h, ou 24 h se ClCr < 30) ou × 1,5 mg/kg (a cada 24 h).",
    v => [opt(v.sch) * +v.w, "mg por dose"], "Bula da enoxaparina; ACCP/CHEST.",
    () => "Arredondar para a seringa disponível. Ajustar em obesidade extrema, insuficiência renal, gestação e risco de sangramento. Considerar dosagem de anti-Xa quando indicado.");
  add("Infusão", "NAC", "Acetilcisteína IV (paracetamol), protocolo 21 h", "Dose total por peso (adulto)", "nac21",
    [num("w", "Peso (usar no máximo 100 kg)", "kg")],
    "Protocolo clássico (Prescott): 150 mg/kg em 1 h, 50 mg/kg em 4 h e 100 mg/kg em 16 h (total 300 mg/kg). Peso limitado a 100 kg.",
    v => [300 * Math.min(+v.w, 100), "mg (total em 21 h)"], "Prescott LF et al. BMJ 1979; protocolos de centros de intoxicação.",
    (n, u, v) => { const w = Math.min(+v.w, 100); return "Bolsa 1: " + f(150 * w, 0) + " mg em 200 mL SG5% em 1 h; bolsa 2: " + f(50 * w, 0) + " mg em 500 mL em 4 h; bolsa 3: " + f(100 * w, 0) + " mg em 1000 mL em 16 h. Indicação, nomograma de Rumack-Matthew e ajustes pediátricos: confirmar com o centro de intoxicação."; });

  // ---------- Hepatologia ----------
  add("Hepatologia", "DF", "Função discriminante de Maddrey", "Gravidade de hepatite alcoólica", "maddrey",
    [num("pt", "TP do paciente", "s"), num("ptc", "TP controle", "s"), num("bili", "Bilirrubina total", "mg/dL")],
    "DF = 4,6 × (TP paciente − TP controle) + bilirrubina total (mg/dL).",
    v => [4.6 * (+v.pt - +v.ptc) + +v.bili, ""], "AASLD 2019, Alcohol-associated liver disease.",
    n => n >= 32 ? "DF ≥ 32: hepatite alcoólica grave; considerar corticoide conforme critérios e contraindicações." : "DF < 32: abaixo do limiar clássico de gravidade.");
  add("Hepatologia", "AST/ALT", "Relação AST/ALT (De Ritis)", "Padrão de lesão hepática", "deritis",
    [num("ast", "AST", "U/L"), num("alt", "ALT", "U/L")],
    "Relação = AST / ALT.", v => [+v.ast / +v.alt, ""], S.liver,
    n => n > 2 ? "> 2: classicamente associada a doença hepática alcoólica; não é específica." : n < 1 ? "< 1: padrão mais comum em hepatites virais/MASLD sem fibrose avançada." : "Entre 1 e 2: inespecífica.");
  add("Hepatologia", "APRI", "APRI", "Triagem não invasiva de fibrose", "apri",
    [num("ast", "AST", "U/L"), num("uln", "Limite superior da AST do laboratório", "U/L"), num("plt", "Plaquetas", "10⁹/L (mil/µL)")],
    "APRI = (AST / LSN) / plaquetas (10⁹/L) × 100.",
    v => [(+v.ast / +v.uln) / +v.plt * 100, ""], "OMS 2015, Guidelines for hepatitis B.",
    n => n < 0.5 ? "< 0,5: baixa probabilidade de fibrose significativa." : n <= 1.5 ? "0,5–1,5: indeterminado." : n <= 2 ? "> 1,5: sugere fibrose significativa." : "> 2: sugere cirrose (OMS, hepatite B). Confirmar com outros métodos.");
  add("Hepatologia", "SAAG", "Gradiente soro-ascite de albumina", "Causa da ascite", "saag",
    [num("serum", "Albumina sérica", "g/dL"), num("asc", "Albumina do líquido ascítico", "g/dL")],
    "SAAG = albumina sérica − albumina ascítica (amostras simultâneas).",
    v => [+v.serum - +v.asc, "g/dL"], "AASLD 2021, Ascites guidance.",
    n => n >= 1.1 ? "≥ 1,1: ascite por hipertensão portal." : "< 1,1: ascite não relacionada à hipertensão portal (ex.: peritoneal, pancreática). Interpretar com o conjunto.");

  // ---------- Reumatologia ----------
  const counts = Array.from({ length: 29 }, (_, i) => i).join("|");
  add("Reumatologia", "DAS28", "DAS28-VHS", "Atividade da artrite reumatoide", "das28",
    [sel("tjc", "Articulações dolorosas (28)", counts), sel("sjc", "Articulações edemaciadas (28)", counts), num("esr", "VHS", "mm/h"), num("gh", "Avaliação global do paciente", "0–100")],
    "DAS28 = 0,56 × √TJC + 0,28 × √SJC + 0,70 × ln(VHS) + 0,014 × GH.",
    v => { need(+v.gh <= 100, "A avaliação global deve estar entre 0 e 100."); return [0.56 * Math.sqrt(+v.tjc) + 0.28 * Math.sqrt(+v.sjc) + 0.70 * Math.log(+v.esr) + 0.014 * +v.gh, ""]; }, S.rheum,
    n => n < 2.6 ? "Remissão (< 2,6)." : n <= 3.2 ? "Baixa atividade (2,6–3,2)." : n <= 5.1 ? "Atividade moderada (3,2–5,1)." : "Alta atividade (> 5,1).");
  add("Reumatologia", "CDAI", "CDAI", "Atividade da artrite reumatoide sem exame", "cdai",
    [sel("tjc", "Articulações dolorosas (28)", counts), sel("sjc", "Articulações edemaciadas (28)", counts), num("pga", "Global do paciente", "0–10 cm"), num("phga", "Global do médico", "0–10 cm")],
    "CDAI = TJC28 + SJC28 + global do paciente (0–10) + global do médico (0–10).",
    v => [+v.tjc + +v.sjc + +v.pga + +v.phga, ""], S.rheum,
    n => n <= 2.8 ? "Remissão (≤ 2,8)." : n <= 10 ? "Baixa atividade (> 2,8 a 10)." : n <= 22 ? "Atividade moderada (> 10 a 22)." : "Alta atividade (> 22).");

  // ---------- Obstetrícia ----------
  add("Obstetrícia", "ILA", "Índice de líquido amniótico", "Soma dos quatro maiores bolsões", "afi",
    [num("a", "Bolsão 1", "cm"), num("b", "Bolsão 2", "cm"), num("c", "Bolsão 3", "cm"), num("d", "Bolsão 4", "cm")],
    "ILA = soma das medidas verticais dos maiores bolsões de cada quadrante.",
    v => [+v.a + +v.b + +v.c + +v.d, "cm"], "ACOG Practice Bulletin 175 (2016).",
    n => n < 5 ? "ILA < 5 cm: oligoâmnio." : n >= 25 ? "ILA ≥ 25 cm: polidrâmnio." : "ILA 5–24,9 cm: faixa habitual. Correlacionar com IG e maior bolsão vertical.");
  add("Obstetrícia", "ICO", "Índice de Choque Obstétrico", "Alerta precoce de Hemorragia Pós-Parto (FC / PAS)", "obshock",
    [num("hr", "Frequência cardíaca materna", "bpm"), num("sbp", "PAS materna", "mmHg")],
    "Índice de Choque = FC / PAS (faixa fisiológica na gestação/puerpério: 0,5 a 0,7).",
    v => [+v.hr / +v.sbp, ""], "OPAS / OMS / FEBRASGO — Estratégia Zero Morte Materna por HPP.",
    n => n >= 1.4 ? "≥ 1,4: choque grave; alta probabilidade de necessidade de Transfusão Maciça imediata." : n >= 0.9 ? "≥ 0,9: alerta de instabilidade oculta / HPP grave; acionar protocolo de hemorragia pós-parto." : "0,5–0,89: dentro da faixa habitual puerperal; manter vigilância do tônus uterino e sangramento.");

  // ---------- Emergência, Trauma e UTI ----------
  add("Terapia Intensiva", "Park", "Fórmula de Parkland (Grande Queimado)", "Ressuscitação volêmica nas primeiras 24 h", "parkland",
    [num("w", "Peso", "kg"), num("tbsa", "Superfície corporal queimada (2º/3º grau)", "%"), sel("fa", "Fator (ATLS 10ª ed. vs Clássico)", "2 (ATLS queimadura térmica adulto)|4 (Parkland clássico / elétrica)")],
    "Volume 24h (mL) = fator (2 ou 4 mL) × peso (kg) × %SCQ (50% nas primeiras 8h a partir da hora do trauma e 50% nas 16h seguintes).",
    v => { need(+v.tbsa <= 100, "A %SCQ não pode exceder 100%."); return [opt(v.fa) * +v.w * +v.tbsa, "mL em 24 h"]; }, "ATLS 10th ed.; Baxter CR, Shires T. Surg Clin North Am 1968.",
    n => "1ª metade (" + f(n / 2, 0) + " mL de Ringer Lactato) em 8 h = " + f(n / 16, 0) + " mL/h; 2ª metade (" + f(n / 2, 0) + " mL) nas 16 h seguintes = " + f(n / 32, 0) + " mL/h. Titular pela diurese alvo (0,5 mL/kg/h no adulto; 1 mL/kg/h em crianças/elétrica).");
  add("Cardiologia", "ITB", "Índice Tornozelo-Braquial (ITB)", "Triagem de Doença Arterial Obstrutiva Periférica", "abi",
    [num("ank", "Maior PAS do tornozelo (pediosa ou tibial posterior)", "mmHg"), num("arm", "Maior PAS braquial (entre os dois braços)", "mmHg")],
    "ITB = maior PAS do tornozelo / maior PAS braquial.",
    v => [+v.ank / +v.arm, ""], "ACC/AHA 2024 Lower Extremity PAD Guideline.",
    n => n > 1.4 ? "> 1,40: artérias não compressíveis (calcificação de Mönckeberg — comum em DM/DRC); solicitar índice hálux-braquial." : n >= 1.0 ? "1,00–1,40: ITB normal." : n >= 0.91 ? "0,91–0,99: ITB limítrofe." : n >= 0.41 ? "0,41–0,90: DAOP leve a moderada." : "≤ 0,40: DAOP grave / risco de isquemia crítica de membro.");
  add("Terapia Intensiva", "Phen", "Fenitoína corrigida pela albumina (Sheiner-Tozer)", "Ajuste da fenitoína sérica total na hipoalbuminemia/DRC", "phenytoin",
    [num("pt", "Fenitoína sérica medida", "mcg/mL"), num("alb", "Albumina sérica", "g/dL"), sel("renal", "ClCr < 10 mL/min ou diálise?", "0,2 (função renal preservada)|0,1 (insuficiência renal grave / uremia)")],
    "Fenitoína corrigida = Fenitoína medida / [(fator × albumina) + 0,1], onde fator = 0,2 (ou 0,1 na uremia).",
    v => [+v.pt / (opt(v.renal) * +v.alb + 0.1), "mcg/mL"], "Sheiner LB, Tozer TN. Clinical Pharmacokinetics 1978.",
    n => n < 10 ? "< 10 mcg/mL: abaixo da faixa terapêutica habitual (10–20 mcg/mL)." : n <= 20 ? "10–20 mcg/mL: dentro da faixa terapêutica estimada." : "> 20 mcg/mL: faixa potencialmente tóxica (avaliar nistagmo, ataxia e dosar fenitoína livre se disponível).");
  add("Hepatologia", "R-Hep", "Fator R de lesão hepática (DILI)", "Diferencia padrão hepatocelular, colestático ou misto", "rfactor",
    [num("alt", "ALT (TGP) do paciente", "U/L"), num("altu", "LSN da ALT", "U/L"), num("alp", "Fosfatase Alcalina (FA) do paciente", "U/L"), num("alpu", "LSN da Fosfatase Alcalina", "U/L")],
    "Fator R = (ALT / LSN da ALT) ÷ (FA / LSN da FA).",
    v => [(+v.alt / +v.altu) / (+v.alp / +v.alpu), ""], "EASL Clinical Practice Guidelines: Drug-induced liver injury (2019).",
    n => n >= 5 ? "R ≥ 5: padrão HEPATOCELULAR (ex.: hepatites virais, isquêmica, paracetamol, autoimune)." : n <= 2 ? "R ≤ 2: padrão COLESTÁTICO (ex.: coledocolitíase, colangite, neoplasia periampular, CBP/CEP)." : "2 < R < 5: padrão MISTO.");
  add("Renal", "Delta", "Relação Delta-Delta (ΔAG / ΔHCO₃)", "Distúrbios metabólicos mistos na acidose de ânion gap elevado", "deltadelta",
    [num("na", "Sódio (Na⁺)", "mEq/L"), num("cl", "Cloro (Cl⁻)", "mEq/L"), num("hco3", "Bicarbonato (HCO₃⁻)", "mEq/L")],
    "ΔAG / ΔHCO₃ = (AG − 12) / (24 − HCO₃⁻), onde AG = Na − Cl − HCO₃.",
    v => { const ag = +v.na - +v.cl - +v.hco3; need(+v.hco3 < 24 && ag > 12, "Aplicável quando HCO₃ < 24 e AG > 12 mEq/L."); return [(ag - 12) / (24 - +v.hco3), " (AG = " + f(ag, 1) + ")"]; }, "Rose BD, Post TW. Clinical Physiology of Acid-Base and Electrolyte Disorders.",
    n => n < 1 ? "< 1,0: Acidose de Ânion Gap elevado + Acidose Metabólica Hiperclorêmica associada (ex.: diarreia ou acidose tubular renal coexistente)." : n <= 2 ? "1,0 a 2,0: Acidose Metabólica de Ânion Gap elevado pura (ex.: cetoacidose ou acidose láctica)." : "> 2,0: Acidose de Ânion Gap elevado + Alcalose Metabólica associada (ex.: vômitos/diuréticos) ou retenção crônica compensatória de HCO₃ (DPOC).");
  add("Renal", "TTKG", "Gradiente Transtubular de Potássio (TTKG)", "Avaliação da ação mineralocorticoide distal", "ttkg",
    [num("uk", "Potássio urinário", "mEq/L"), num("pk", "Potássio sérico", "mEq/L"), num("uosm", "Osmolalidade urinária", "mOsm/kg"), num("posm", "Osmolalidade sérica", "mOsm/kg")],
    "TTKG = (K urinário / K sérico) ÷ (Osm urinária / Osm sérica). Válido apenas se Osm urinária > Osm sérica e Na urinário > 25 mEq/L.",
    v => { need(+v.uosm > +v.posm, "O TTKG requer osmolalidade urinária superior à plasmática."); return [(+v.uk / +v.pk) / (+v.uosm / +v.posm), ""]; }, "Ethier JH et al. Am J Kidney Dis 1990.",
    n => "TTKG = " + f(n, 1) + ". Na hipercalemia, TTKG < 6 sugere hipoaldosteronismo/resistência tubular; na hipocalemia, TTKG > 4 sugere perda renal de potássio.");
  add("Antropometria", "Nadler", "Volume Sanguíneo Estimado (Nadler)", "Volemia total estimada em adultos", "nadler",
    [sel("sex", "Sexo", "1 (Masculino)|0 (Feminino)"), num("h", "Altura", "cm"), num("w", "Peso", "kg")],
    "Homens: 0,3669 × Alt(m)³ + 0,03219 × Peso + 0,6041; Mulheres: 0,3561 × Alt(m)³ + 0,03308 × Peso + 0,1833 (resultado em litros).",
    v => { const hm = +v.h / 100; const l = opt(v.sex) === 1 ? 0.3669 * Math.pow(hm, 3) + 0.03219 * +v.w + 0.6041 : 0.3561 * Math.pow(hm, 3) + 0.03308 * +v.w + 0.1833; return [l * 1000, "mL"]; }, "Nadler SB et al. Surgery 1962;51:224–232.",
    n => "Equivale a ~" + f(n / 1000, 2) + " L de volemia total estimada (usado em aférese/plasmaférese e estimativa de perda sanguínea).");
  add("Antropometria", "TMB", "Taxa Metabólica Basal (Mifflin-St Jeor)", "Gasto energético basal diário", "mifflin",
    [sel("sex", "Sexo", "5 (Masculino)|-161 (Feminino)"), num("w", "Peso", "kg"), num("h", "Altura", "cm"), num("age", "Idade", "anos")],
    "TMB = 10 × peso(kg) + 6,25 × altura(cm) − 5 × idade(anos) + (5 se homem ou −161 se mulher).",
    v => [10 * +v.w + 6.25 * +v.h - 5 * +v.age + opt(v.sex), "kcal/dia"], "Mifflin MD et al. Am J Clin Nutr 1990;51:241–247.",
    n => "Gasto basal em repouso: " + f(n, 0) + " kcal/dia. Multiplicar pelo fator de atividade/estresse metabólico (1,2 a 1,5).");
  add("Pediatria", "PALS", "Doses de PCR Pediátrica por Peso (PALS)", "Adrenalina, Amiodarona e Carga de Desfibrilação", "palspcr",
    [num("w", "Peso da criança", "kg")],
    "Adrenalina IV/IO: 0,01 mg/kg (0,1 mL/kg da diluição 1:10.000, máx 1 mg); Amiodarona: 5 mg/kg (máx 300 mg); Choque: 1º = 2 J/kg, 2º = 4 J/kg.",
    v => [Math.min(0.01 * +v.w, 1), "mg de Adrenalina IV"], "AHA Pediatric Advanced Life Support (PALS) Guidelines.",
    (n, u, v) => { const w = +v.w; return "Adrenalina diluída 1:10.000 (1 ampola + 9 mL SF): " + f(Math.min(0.1 * w, 10), 1) + " mL IV/IO | Amiodarona PCR: " + f(Math.min(5 * w, 300), 0) + " mg | Desfibrilação: 1º choque " + f(2 * w, 0) + " J → 2º choque " + f(4 * w, 0) + " J | Bolus cristaloide: " + f(20 * w, 0) + " mL."; });

  // ---------- Conversores ----------
  const dir = (id, code, title, a, b, k, unitA, unitB, ref) => {
    add("Conversores", code, title, a + " ↔ " + b, id,
      [num("x", "Valor", ""), sel("d", "Conversão", a + " → " + b + "|" + b + " → " + a)],
      a + " × " + k + " = " + b.split(" ")[0] + " (fator " + k + ").",
      v => v.d.indexOf(a) === 0 ? [+v.x * k, unitB] : [+v.x / k, unitA], ref);
  };
  dir("convcr", "Cr", "Creatinina (mg/dL ↔ µmol/L)", "mg/dL", "µmol/L", 88.4, "mg/dL", "µmol/L", S.conv);
  dir("convbili", "Bili", "Bilirrubina (mg/dL ↔ µmol/L)", "mg/dL", "µmol/L", 17.1, "mg/dL", "µmol/L", S.conv);
  dir("convchol", "Col", "Colesterol (mg/dL ↔ mmol/L)", "mg/dL", "mmol/L", 0.02586, "mg/dL", "mmol/L", S.conv);
  dir("convtg", "TG", "Triglicerídeos (mg/dL ↔ mmol/L)", "mg/dL", "mmol/L", 0.01129, "mg/dL", "mmol/L", S.conv);
  dir("convlac", "Lac", "Lactato (mg/dL ↔ mmol/L)", "mg/dL", "mmol/L", 0.111, "mg/dL", "mmol/L", S.conv);
  dir("convbun", "BUN", "Ureia ↔ BUN (mg/dL)", "ureia", "BUN", 1 / 2.14, "mg/dL de ureia", "mg/dL de BUN", S.conv);
  dir("convkpa", "kPa", "Pressão (mmHg ↔ kPa)", "mmHg", "kPa", 0.13332, "mmHg", "kPa", S.conv);
  dir("convlb", "lb", "Peso (lb ↔ kg)", "lb", "kg", 0.45359, "lb", "kg", S.conv);


  // Lote 5: fórmulas dimensionais com campos, unidades, referências e limites.
  // Revisão clínica externa e teste E2E obrigatórios antes de exposição assistencial.
  add("Metabólico","OSM-E","Osmolalidade efetiva / tonicidade","Contribuição osmoticamente efetiva de Na e glicose","tonicity",
    [num("na","Sódio sérico","mEq/L"),num("glu","Glicose sérica","mg/dL")],
    "Tonicidade calculada ≈ 2 × Na (mEq/L) + glicose (mg/dL) / 18.",
    v=>{need(+v.na>=100&&+v.na<=190&&+v.glu>=0&&+v.glu<=2500,"Verifique Na e glicose.");return[2*+v.na+ +v.glu/18,"mOsm/L"];},
    "ADA, Standards of Care in Diabetes: hyperglycemic crises; fórmula de tonicidade sérica.",
    ()=> "Não equivale à osmolalidade total (que inclui ureia). Interpretar com exame clínico e osmolalidade medida.");

  add("Renal","PROT24","Proteinúria em 24 horas","Excreção proteica diária a partir de concentração e volume","protein24h",
    [num("prot","Proteína urinária","mg/dL"),num("vol","Volume urinário em 24 horas","mL")],
    "mg/24h = proteína (mg/dL) × volume (mL) / 100.",
    v=>{need(+v.prot>=0&&+v.vol>0&&+v.vol<=15000,"Concentração e volume inválidos.");return[+v.prot*+v.vol/100,"mg/24 h"];},
    "KDIGO CKD Guideline 2024; conversão dimensional mg/dL × dL.",
    ()=>"Interpretar com integridade da coleta e albuminúria; valor isolado não define doença renal.");

  add("Renal","Na24","Sódio urinário em 24 horas","Quantidade diária excretada de sódio","na24h",
    [num("na","Sódio urinário","mEq/L"),num("vol","Volume urinário em 24 horas","mL")],
    "mEq/24h = Na urinário (mEq/L) × volume (mL) / 1000.",
    v=>{need(+v.na>=0&&+v.vol>0&&+v.vol<=15000,"Concentração/volume inválidos.");return[+v.na*+v.vol/1000,"mEq/24 h"];},
    "Conversão dimensional e avaliação de coleta urinária 24 h.",
    ()=>"Coleta incompleta ou uso de diuréticos alteram a interpretação.");

  add("Renal","Ca24","Cálcio urinário em 24 horas","Excreção diária de cálcio","ca24h",
    [num("ca","Cálcio urinário","mg/dL"),num("vol","Volume urinário em 24 horas","mL")],
    "mg/24h = cálcio urinário (mg/dL) × volume (mL) / 100.",
    v=>{need(+v.ca>=0&&+v.vol>0&&+v.vol<=15000,"Concentração/volume inválidos.");return[+v.ca*+v.vol/100,"mg/24 h"];},
    "AUA Medical Management of Kidney Stones, 2019; conversão dimensional.",
    ()=>"Interpretar com ingestão de cálcio, sódio, função renal e qualidade da coleta.");

  add("Renal","Ox24","Oxalato urinário em 24 horas","Excreção diária de oxalato","oxalate24h",
    [num("ox","Oxalato urinário","mg/L"),num("vol","Volume urinário em 24 horas","mL")],
    "mg/24h = oxalato (mg/L) × volume (mL) / 1000.",
    v=>{need(+v.ox>=0&&+v.vol>0&&+v.vol<=15000,"Concentração/volume inválidos.");return[+v.ox*+v.vol/1000,"mg/24 h"];},
    "AUA Medical Management of Kidney Stones, 2019; conversão dimensional.",
    ()=>"Confirmar unidade do laboratório (mg/L vs mmol/L) e completude da coleta.");

  add("Renal","FEUA","Fração de excreção de ácido úrico","Percentual de excreção renal de urato","feua",
    [num("uu","Ácido úrico urinário","mg/dL"),num("pc","Creatinina plasmática","mg/dL"),num("pu","Ácido úrico plasmático","mg/dL"),num("uc","Creatinina urinária","mg/dL")],
    "FEUA (%) = (urato urinário × creatinina plasmática)/(urato plasmático × creatinina urinária) × 100.",
    v=>{need(+v.uu>=0&&+v.pc>0&&+v.pu>0&&+v.uc>0,"Valores inválidos/denominador zero.");return[(+v.uu*+v.pc)/(+v.pu*+v.uc)*100,"%"];},
    "Equação padrão de excreção fracionária; correlacionar com função renal e estado volêmico.",
    ()=>"Não usar FEUA isoladamente para confirmar SIADH ou outra causa de hiponatremia.");

  add("Renal","FEPO4","Fração de excreção de fosfato","Avaliação da perda renal de fosfato","fepo4",
    [num("uu","Fosfato urinário","mg/dL"),num("pc","Creatinina plasmática","mg/dL"),num("pu","Fosfato plasmático","mg/dL"),num("uc","Creatinina urinária","mg/dL")],
    "FEPO₄ (%) = (fosfato urinário × creatinina plasmática)/(fosfato plasmático × creatinina urinária) × 100.",
    v=>{need(+v.uu>=0&&+v.pc>0&&+v.pu>0&&+v.uc>0,"Valores inválidos/denominador zero.");return[(+v.uu*+v.pc)/(+v.pu*+v.uc)*100,"%"];},
    "Equação padrão de excreção fracionária; interpretação de fosfatúria.",
    ()=>"Interpretar com fosfatemia, PTH, FGF23 e função renal.");

  add("Renal","FECa","Fração de excreção de cálcio","Excreção fracionária de cálcio","feca",
    [num("uu","Cálcio urinário","mg/dL"),num("pc","Creatinina plasmática","mg/dL"),num("pu","Cálcio plasmático total","mg/dL"),num("uc","Creatinina urinária","mg/dL")],
    "FECa (%) = (Ca urinário × Cr plasmática)/(Ca plasmático × Cr urinária) × 100.",
    v=>{need(+v.uu>=0&&+v.pc>0&&+v.pu>0&&+v.uc>0,"Valores inválidos/denominador zero.");return[(+v.uu*+v.pc)/(+v.pu*+v.uc)*100,"%"];},
    "Equação de clearance de cálcio/creatinina; revisar unidade e método de dosagem.",
    ()=>"Não equivale ao CCCR sem ressalvas; interpretar cálcio sérico corrigido/ionizado e contexto.");

  add("Renal","FEMg","Fração de excreção de magnésio","Avaliação de perdas renais de magnésio","femg",
    [num("uu","Magnésio urinário","mg/dL"),num("pc","Creatinina plasmática","mg/dL"),num("pu","Magnésio plasmático total","mg/dL"),num("uc","Creatinina urinária","mg/dL")],
    "FEMg (%) = (Mg urinário × Cr plasmática)/(0,7 × Mg plasmático × Cr urinária) × 100.",
    v=>{need(+v.uu>=0&&+v.pc>0&&+v.pu>0&&+v.uc>0,"Valores inválidos/denominador zero.");return[(+v.uu*+v.pc)/(0.7*+v.pu*+v.uc)*100,"%"];},
    "Equação convencional com fração plasmática filtrável de Mg estimada em 0,7.",
    ()=>"A fração filtrável de 70% é aproximação, e a interpretação depende da função renal.");

  add("Cardiovascular","PVR","Resistência vascular pulmonar","Cálculo hemodinâmico em unidades Wood","pvr",
    [num("mpap","Pressão média da artéria pulmonar","mmHg"),num("pawp","Pressão de oclusão capilar pulmonar","mmHg"),num("co","Débito cardíaco","L/min")],
    "PVR (Wood) = (mPAP − PAWP)/débito cardíaco.",
    v=>{need(+v.mpap>=+v.pawp&&+v.pawp>=0&&+v.co>0,"Pressões/débito incompatíveis.");return[(+v.mpap-+v.pawp)/+v.co,"unidades Wood"];},
    "ESC/ERS Pulmonary Hypertension Guidelines 2022, equação hemodinâmica.",
    ()=>"Exige medidas hemodinâmicas adequadas; não diagnostica hipertensão pulmonar isoladamente.");

  add("Cardiovascular","CPO","Cardiac Power Output","Potência cardíaca estimada","cpo",
    [num("map","PAM","mmHg"),num("co","Débito cardíaco","L/min")],
    "CPO (W) = PAM × débito cardíaco / 451.",
    v=>{need(+v.map>0&&+v.co>0,"PAM/débito inválidos.");return[(+v.map*+v.co)/451,"W"];},
    "Equação hemodinâmica clássica, conversão mmHg × L/min para watts.",
    ()=>"Marcador hemodinâmico complementar; interpretar em conjunto com perfusão e medida do débito.");

  add("Cardiovascular","LVOT","Débito cardíaco por LVOT/VTI","Débito ecocardiográfico a partir de volume sistólico","lvotco",
    [num("d","Diâmetro de LVOT","cm"),num("vti","VTI de LVOT","cm"),num("hr","Frequência cardíaca","bpm")],
    "Débito (L/min) = π × (diâmetro LVOT / 2)² × VTI × FC / 1000.",
    v=>{need(+v.d>0&&+v.d<5&&+v.vti>0&&+v.hr>0,"Verifique diâmetro, VTI e FC.");return[Math.PI*Math.pow(+v.d/2,2)*+v.vti*+v.hr/1000,"L/min"];},
    "ASE Echocardiography chamber quantification; equação de continuidade volumétrica.",
    ()=>"Medida de LVOT deve ser tecnicamente adequada; erro de diâmetro é amplificado ao quadrado.");

  add("Cardiovascular","BER","Gradiente Doppler (Bernoulli)","Estimativa de gradiente transvalvar","bernoulli",
    [num("v","Velocidade máxima Doppler","m/s")],
    "ΔP (mmHg) ≈ 4 × v².",
    v=>{need(+v.v>=0&&+v.v<=12,"Velocidade fora de faixa plausível.");return[4*Math.pow(+v.v,2),"mmHg"];},
    "Equação simplificada de Bernoulli para Doppler cardíaco.",
    ()=>"O modelo simplificado pode ser inadequado quando a velocidade proximal é importante.");

  add("Cardiovascular","JTc","Intervalo JT corrigido","Avaliação complementar da repolarização com QRS alargado","jtc",
    [num("qtc","QTc medido ou calculado","ms"),num("qrs","Duração do QRS","ms")],
    "JTc (ms) = QTc − QRS.",
    v=>{need(+v.qtc>+v.qrs&&+v.qrs>0,"QTc deve exceder QRS.");return[+v.qtc-+v.qrs,"ms"];},
    "Conceito de intervalo JT, AHA/ACCF/HRS ECG Standardization, Circulation 2009.",
    ()=>"O JTc não tem ponto de corte universal; confirmar fórmula de correção e contexto clínico.");

  add("Cardiovascular","FS","Fração de encurtamento ventricular","Fração de encurtamento linear sistólico","fracshort",
    [num("dd","Diâmetro diastólico final do VE","mm"),num("ds","Diâmetro sistólico final do VE","mm")],
    "FE (%) = (LVIDd − LVIDs)/LVIDd × 100.",
    v=>{need(+v.dd>+v.ds&&+v.ds>0,"Diâmetros inválidos.");return[(+v.dd-+v.ds)/+v.dd*100,"%"];},
    "ASE, ecocardiografia M-mode, fração de encurtamento.",
    ()=>"Não substituir fração de ejeção; interpretação limitada em alteração segmentar de contratilidade.");

  add("Infusão","DD-Age","D-dímero ajustado por idade","Limiar apenas para investigação em algoritmo apropriado de TEP","ddimerage",
    [num("age","Idade","anos")],
    "Limite de D-dímero (ng/mL FEU) = 500 até 50 anos; acima de 50, idade × 10.",
    v=>{need(Number.isInteger(+v.age)&&+v.age>=18&&+v.age<=120,"Idade adulta inválida.");return[+v.age>50?+v.age*10:500,"ng/mL FEU"];},
    "ADJUST-PE, JAMA 2014; AHA/ACC Acute PE Guideline 2026.",
    ()=>"Apenas em algoritmo diagnóstico apropriado, com probabilidade pré-teste não alta e ensaio FEU. NÃO usar limiar FEU em resultado DDU.");

  add("Antropometria","WHtR","Relação cintura/altura","Marcador antropométrico complementar","waistheight",
    [num("waist","Circunferência da cintura","cm"),num("height","Estatura","cm")],
    "Relação cintura/altura = cintura (cm) / altura (cm).",
    v=>{need(+v.waist>0&&+v.height>0,"Medidas inválidas.");return[+v.waist/+v.height,""];},
    "WHO waist and waist-hip ratio report, 2008; razão cintura/altura.",
    ()=>"Interpretar conforme idade, população e contexto; não substitui avaliação do risco cardiometabólico.");

  // Os instrumentos que admitem analito zero têm guarda explícita de denominador.
  for (const id of ["tonicity","protein24h","na24h","ca24h","oxalate24h","feua","fepo4","feca","femg","bernoulli"]) {
    if (extra[id]) extra[id].allowZero = true;
  }


  // Lote 6: ferramentas com unidades explícitas. Não substituir julgamento médico.
  add("Endócrino","GMI","Indicador de Gerenciamento da Glicose (GMI)","Estimativa por média da monitorização contínua","gmi",
    [num("mean","Glicose média obtida por CGM","mg/dL"),num("days","Duração dos dados de CGM","dias")],
    "GMI (%) = 3,31 + 0,02392 × glicose média (mg/dL).",
    v=>{need(+v.mean>=40&&+v.mean<=500&&+v.days>=10,"GMI exige glicose média de CGM e pelo menos 10 dias de dados.");return[3.31+0.02392*+v.mean,"%"];},
    "Bergenstal RM et al. Diabetes Care 2018;41:2275–2280, PMID 30224348; SBD Diretriz 2026 (CGM).",
    (n,u,v)=>"Estimativa por CGM; NÃO é a HbA1c laboratorial. Preferir 14 dias ou mais e ≥70% de dados válidos. Dados informados: "+v.days+" dia(s).");

  add("Endócrino","CV-CGM","Coeficiente de variação da glicose","Variabilidade do sensor de glicose","glucosecv",
    [num("mean","Glicose média do CGM","mg/dL"),num("sd","Desvio padrão das leituras","mg/dL")],
    "CV (%) = 100 × desvio padrão / glicose média.",
    v=>{need(+v.mean>0&&+v.sd>=0,"Média e desvio padrão inválidos.");return[100*+v.sd/+v.mean,"%"];},
    "SBD Diretriz 2026; International Consensus on Time in Range, Diabetes Care 2019, PMC6973648.",
    n=>"Métrica de variabilidade do CGM. Alvo usual de CV ≤36% para muitos adultos; interpretar adequação dos dados e hipoglicemia.");

  add("Endócrino","TIR","Tempo no alvo da glicose (TIR)","Percentual de tempo de CGM na faixa definida","glucosetir",
    [num("target","Tempo efetivo de CGM na faixa-alvo","minutos"),num("observed","Tempo total efetivamente registrado pelo CGM","minutos")],
    "TIR (%) = 100 × minutos de CGM na faixa / minutos totais de CGM válidos.",
    v=>{need(+v.target>=0&&+v.observed>0&&+v.target<=+v.observed,"Tempo na faixa não pode exceder tempo registrado.");return[100*+v.target/+v.observed,"%"];},
    "SBD Diretriz 2026, monitorização de glicose intersticial; Diabetes Care 2026, Glycemic Goals.",
    ()=>"Usar a faixa individualizada (habitualmente 70–180 mg/dL para muitos adultos). Esta ferramenta não lê dados do sensor nem valida intervalos de tempo; conferir cobertura.");

  add("Epidemiologia","NNT","Número necessário para tratar (NNT)","Benefício absoluto comparando riscos binários","nnt",
    [num("control","Risco do evento no grupo controle","%"),num("treated","Risco do evento no grupo tratado","%")],
    "NNT = teto[1 / ((risco controle − risco tratado)/100)] para desfecho adverso e redução de risco positiva.",
    v=>{need(+v.control>=0&&+v.control<=100&&+v.treated>=0&&+v.treated<=100&&+v.control>+v.treated,"NNT só se aplica aqui quando tratamento reduz o desfecho adverso.");return[Math.ceil(100/(+v.control-+v.treated)),"pacientes"];},
    "NICE Glossary: number needed to treat; relação entre redução absoluta do risco e NNT.",
    ()=>"A interpretação só é válida para o período de seguimento, população e evento especificados no estudo. Não comparar NNT de horizontes diferentes.");

  add("Epidemiologia","Bayes","Probabilidade pós-teste","Estimativa bayesiana com razão de verossimilhança","posttestlr",
    [num("pre","Probabilidade pré-teste","%"),num("lr","Razão de verossimilhança (LR+ ou LR−)","adimensional")],
    "Odds pré = p/(1−p); odds pós = odds pré × LR; probabilidade pós = odds pós/(1 + odds pós).",
    v=>{need(+v.pre>0&&+v.pre<100&&+v.lr>0,"Probabilidade deve estar entre 0 e 100% (exclusivo); LR deve ser >0.");const prior=+v.pre/(100-+v.pre),post=prior*+v.lr;return[100*post/(1+post),"%"];},
    "Centre for Evidence-Based Medicine, likelihood ratios and post-test probability; relação de Bayes.",
    ()=>"Usar razão de verossimilhança adequada ao teste, prevalência e população; não equivale a diagnóstico.");

  add("Endócrino","FAI","Índice de Androgênios Livres (FAI)","Razão testosterona total/SHBG","freeandrogen",
    [num("test","Testosterona total","nmol/L"),num("shbg","SHBG","nmol/L")],
    "FAI = 100 × testosterona total (nmol/L)/SHBG (nmol/L).",
    v=>{need(+v.test>=0&&+v.shbg>0,"Testosterona e SHBG inválidas.");return[100*+v.test/+v.shbg,""];},
    "International Evidence-Based Guideline for PCOS 2023; índice de androgênios livres.",
    ()=>"Não usar como diagnóstico isolado de hiperandrogenismo; precisão pode variar por sexo e concentração de SHBG.");

  add("Hematologia","WBCc","Leucócitos corrigidos por eritroblastos","Corrige contagem leucocitária por nRBC/100 leucócitos","correctwbc",
    [num("wbc","Leucócitos medidos","/µL"),num("nrbc","Eritroblastos observados por 100 leucócitos","nRBC/100 leucócitos")],
    "Leucócitos corrigidos (/µL) = leucócitos medidos × 100 / (100 + nRBC/100 leucócitos).",
    v=>{need(+v.wbc>=0&&+v.nrbc>=0,"Valores inválidos.");return[+v.wbc*100/(100+ +v.nrbc),"/µL"];},
    "Regra hematológica clássica de correção de WBC quando o analisador inclui células nucleadas eritroides.",
    ()=>"Somente se o método do hemograma requer essa correção. Equipamentos modernos podem fornecer WBC já corrigido.");

  add("Terapia Intensiva","VIS","Vasoactive-Inotropic Score (VIS)","Intensidade numérica de suporte vasoativo em seis agentes","vis",
    [num("dop","Dopamina","µg/kg/min"),num("dob","Dobutamina","µg/kg/min"),
     num("epi","Adrenalina","µg/kg/min"),num("norepi","Noradrenalina","µg/kg/min"),
     num("mil","Milrinona","µg/kg/min"),num("vaso","Vasopressina","unidades/kg/min")],
    "VIS = dopamina + dobutamina + 100×adrenalina + 100×noradrenalina + 10×milrinona + 10000×vasopressina (U/kg/min).",
    v=>{const a=['dop','dob','epi','norepi','mil','vaso'].map(k=>+v[k]);need(a.every(x=>x>=0&&Number.isFinite(x)),"Doses devem ser não negativas.");return[a[0]+a[1]+100*a[2]+100*a[3]+10*a[4]+10000*a[5],"pontos VIS"];},
    "Gaies MG et al. Pediatr Crit Care Med 2010;11:234–238; estudo brasileiro Rev Assoc Med Bras 2023 VIS.",
    ()=>"Vasopressina DEVE ser informada em U/kg/min, não mU/kg/min nem U/min. Não há corte prognóstico único entre populações.");

  add("Cardiovascular","Qp/Qs","Relação Qp/Qs por Doppler","Fluxo pulmonar relativo ao fluxo sistêmico","qpqs",
    [num("rvd","Diâmetro do RVOT","cm"),num("rvvti","VTI do RVOT","cm"),
     num("lvd","Diâmetro do LVOT","cm"),num("lvvti","VTI do LVOT","cm")],
    "Qp/Qs = [π(RVOT/2)²×VTI RVOT]/[π(LVOT/2)²×VTI LVOT].",
    v=>{need(+v.rvd>0&&+v.rvvti>0&&+v.lvd>0&&+v.lvvti>0,"Medidas inválidas.");return[Math.pow(+v.rvd/+v.lvd,2)*(+v.rvvti/+v.lvvti),""];},
    "ASE echocardiography shunt assessment; Doppler volumetric continuity.",
    ()=>"Medição depende da geometria e localização de amostragem; regurgitações e alterações de fluxo podem invalidar inferência do shunt.");

  add("Cardiovascular","RVSP","Pressão sistólica de VD estimada (RVSP)","Estimativa ecocardiográfica por jato de regurgitação tricúspide","rvsp",
    [num("trv","Velocidade máxima da regurgitação tricúspide","m/s"),
     num("rap","Pressão atrial direita estimada","mmHg")],
    "RVSP (mmHg) ≈ 4×(velocidade TR)² + pressão atrial direita estimada.",
    v=>{need(+v.trv>0&&+v.trv<8&&+v.rap>=0&&+v.rap<=30,"Velocidade/pressão atrial inválidas.");return[4*Math.pow(+v.trv,2)+ +v.rap,"mmHg"];},
    "ASE Right Heart Guideline 2025, atualização disponível em asecho.org.",
    ()=>"Não estimar na ausência de jato mensurável ou com obstrução da via de saída do VD; IT importante pode distorcer o resultado.");

  add("Cardiovascular","AVA","Área valvar aórtica por continuidade","Área efetiva da válvula aórtica por VTI","avacontinuity",
    [num("d","Diâmetro do LVOT","cm"),num("vl","VTI do LVOT","cm"),num("va","VTI do jato aórtico","cm")],
    "AVA (cm²) = π×(LVOT/2)² × VTI LVOT / VTI aórtico.",
    v=>{need(+v.d>0&&+v.d<5&&+v.vl>0&&+v.va>0,"Medidas inválidas.");return[Math.PI*Math.pow(+v.d/2,2)*+v.vl/+v.va,"cm²"];},
    "EACVI/ASE Recommendations on Aortic Valve Stenosis, EHJ Cardiovasc Imaging 2017;18:254–275.",
    ()=>"Depende de medidas técnicas adequadas, estado de fluxo e achados ecocardiográficos adicionais. Não diagnosticar estenose isoladamente.");

  add("Terapia Intensiva","O2ER","Fração de extração de oxigênio","Diferença arterial-venosa de conteúdo de oxigênio","o2er",
    [num("ca","Conteúdo arterial de oxigênio CaO₂","mL/dL"),num("cv","Conteúdo venoso misto de oxigênio CvO₂","mL/dL")],
    "Extração de O₂ (%) = 100 × (CaO₂ − CvO₂) / CaO₂.",
    v=>{need(+v.ca>0&&+v.cv>=0&&+v.cv<=+v.ca,"CaO₂ deve ser >0 e CvO₂ não pode excedê-lo nesse modelo.");return[100*(+v.ca-+v.cv)/+v.ca,"%"];},
    "Fisiologia de Fick e conteúdo de oxigênio; relação de extração arterial-venosa.",
    ()=>"O conteúdo venoso deve representar coleta venosa mista quando a interpretação exigir. Diferença não determina perfusão adequada sozinha.");

  add("Terapia Intensiva","PCO2Δ","Gradiente venoarterial de PCO₂","Diferença entre PCO₂ venosa e arterial","pco2gap",
    [num("pv","PCO₂ venosa","mmHg"),num("pa","PCO₂ arterial","mmHg")],
    "Gradiente (mmHg) = PvCO₂ − PaCO₂.",
    v=>{need(+v.pv>=0&&+v.pa>=0,"PCO₂ deve ser não negativa.");return[+v.pv-+v.pa,"mmHg"];},
    "Fisiologia hemodinâmica de diferença venoarterial de CO₂.",
    ()=>"Preferir amostras coletadas em intervalo próximo; PvCO₂ venosa central e venosa mista não são intercambiáveis.");

  for (const id of ["glucosecv","glucosetir","nnt","freeandrogen","correctwbc","vis",
                    "rvsp","o2er","pco2gap"]) if (extra[id]) extra[id].allowZero=true;


  // Lote 7: fórmulas adicionais, sem card duplicado com os catálogos atuais.
  add("Renal","UOsm","Osmolalidade urinária calculada","Estimativa a partir de eletrólitos, nitrogênio ureico e glicose urinários","urineosmol",
    [num("na","Sódio urinário","mmol/L"),num("k","Potássio urinário","mmol/L"),
     num("uun","NITROGÊNIO ureico urinário (UUN, não ureia)","mg/dL"),num("glu","Glicose urinária","mg/dL")],
    "Osm urinária estimada = 2×(Na+K) + UUN(mg/dL)/2,8 + glicose(mg/dL)/18.",
    v=>{const a=["na","k","uun","glu"].map(x=>+v[x]);need(a.every(x=>Number.isFinite(x)&&x>=0),"Os analitos não podem ser negativos.");return[2*(a[0]+a[1])+a[2]/2.8+a[3]/18,"mOsm/L"];},
    "Nephrol Dial Transplant 2020;35:1827–1832, doi:10.1093/ndt/gfaa165 (equação de osm urinária).",
    ()=>"Equação aproximada: não substitui osmolalidade medida. O campo é UUN, não ureia urinária em massa.");

  add("Renal","UOsmΔ","Gap osmolal urinário","Osmolalidade medida menos a calculada","urinegap",
    [num("meas","Osmolalidade urinária MEDIDA","mOsm/kg"),num("na","Sódio urinário","mmol/L"),num("k","Potássio urinário","mmol/L"),
     num("uun","Nitrogênio ureico urinário (UUN)","mg/dL"),num("glu","Glicose urinária","mg/dL")],
    "Gap urinário = osm medida − [2×(UNa+UK) + UUN/2,8 + glicose/18].",
    v=>{const a=["meas","na","k","uun","glu"].map(x=>+v[x]);need(a.every(x=>Number.isFinite(x)&&x>=0),"Analitos/osmolalidade inválidos.");return[a[0]-(2*(a[1]+a[2])+a[3]/2.8+a[4]/18),"mOsm/kg (aprox.)"];},
    "Nephrol Dial Transplant 2020;35:1827–1832; review PMC5757610.",
    ()=>"Diferença entre unidades mOsm/kg e mOsm/L cria pequena aproximação. Não interpretar como amônio urinário exato; interferências por outros solutos.");

  add("Renal","EFWC","Clearance de água livre de eletrólitos","Estimativa de perda/retensão urinária de água em 24 horas","efwc",
    [num("vol","Diurese coletada em 24 h","mL/24 h"),num("un","Sódio urinário","mEq/L"),
     num("uk","Potássio urinário","mEq/L"),num("pn","Sódio plasmático","mEq/L")],
    "C H₂O(e) (mL/24 h) = volume urinário × [1 − (Na urinário + K urinário)/Na plasmático].",
    v=>{need(+v.vol>0&&+v.un>=0&&+v.uk>=0&&+v.pn>0,"Vol, Na e K inválidos.");return[+v.vol*(1-(+v.un+ +v.uk)/+v.pn),"mL/24 h"];},
    "Electrolyte-free water clearance: review PMC8784663; Nephrol Dial Transplant 2020;35:1827–1832.",
    n=>(n>0?"Valor positivo: perda renal de água livre de eletrólitos. ":"Valor não positivo: retenção relativa de água livre de eletrólitos. ")+"Não prediz sozinho a mudança de natremia.");

  add("Endócrino","TyG","Índice triglicerídeos–glicose (TyG)","Marcador indireto de resistência insulínica","tyg",
    [num("tg","Triglicerídeos EM JEJUM","mg/dL"),num("glu","Glicose EM JEJUM","mg/dL")],
    "Versão TyG = ln[(TG × glicose)/2], ambos em mg/dL. Log natural.",
    v=>{need(+v.tg>0&&+v.glu>0,"Medidas em jejum devem ser >0.");return[Math.log(+v.tg*+v.glu/2),""];},
    "Front Endocrinol (Lausanne) 2026;17:1793587, PMC13128429; versão ln[(TG×G)/2].",
    ()=>"Existem fórmulas publicadas com parênteses diferentes (ln[TG×G]/2). Não comparar limiares entre versões. Sem corte universal.");

  add("Endócrino","QUICKI","Índice QUICKI","Índice de sensibilidade à insulina a partir de glicose/insulina em jejum","quicki",
    [num("glu","Glicose em jejum","mg/dL"),num("ins","Insulina em jejum","µU/mL")],
    "QUICKI = 1/[log10(glicose em mg/dL) + log10(insulina em µU/mL)].",
    v=>{need(+v.glu>0&&+v.ins>0&&Math.log10(+v.glu)+Math.log10(+v.ins)>0,"Glicose/insulina não admitem zero e o denominador deve ser >0.");return[1/(Math.log10(+v.glu)+Math.log10(+v.ins)),""];},
    "Endotext NCBI Bookshelf NBK278954, tabela de índices de sensibilidade à insulina.",
    ()=>"A medida é um marcador indireto e não um diagnóstico de resistência à insulina.");

  add("Endócrino","HOMA-β","HOMA-beta clássico","Estimativa basal de função das células beta pancreáticas","homabeta",
    [num("glu","Glicose em jejum","mg/dL"),num("ins","Insulina em jejum","µU/mL")],
    "HOMA-β (%) = 360 × insulina (µU/mL) / [glicose (mg/dL) − 63].",
    v=>{need(+v.glu>63&&+v.ins>0,"Fórmula não aplicável quando glicose ≤63 mg/dL ou insulina ≤0.");return[360*+v.ins/(+v.glu-63),"% (modelo clássico)"];},
    "OPAS / PAHO HOMA-IR/HOMA-Beta tool; Endotext insulin sensitivity indices.",
    ()=>"Marcador de modelo basal, não porcentagem direta de células beta funcionais; distinguir de HOMA2 computacional.");

  add("Endócrino","MATS","Índice de Matsuda (TOTG)","Estimativa de sensibilidade insulínica com valores basais e médios do TOTG","matsuda",
    [num("g0","Glicose de jejum","mg/dL"),num("i0","Insulina de jejum","µU/mL"),
     num("gm","Glicose MÉDIA de todas as coletas do TOTG","mg/dL"),num("im","Insulina MÉDIA de todas as coletas do TOTG","µU/mL")],
    "ISI = 10000 / raiz[(glicose 0 × insulina 0) × (glicose média × insulina média)].",
    v=>{const a=["g0","i0","gm","im"].map(x=>+v[x]);need(a.every(x=>x>0),"Todas as medidas e médias devem ser >0.");return[10000/Math.sqrt(a.reduce((p,x)=>p*x,1)),""];},
    "Matsuda M, DeFronzo RA. Diabetes Care 1999;22:1462–1470. PMID 10480510; Endotext NBK278954.",
    ()=>"As médias devem usar todos os tempos previstos no protocolo de TOTG utilizado, não apenas 0 e 120 min. Não há ponto de corte universal.");

  add("Pediatria","PN-RN","Perda de peso neonatal","Percentual de perda em relação ao peso ao nascer","newbornweightloss",
    [num("birth","Peso ao nascer","g"),num("current","Peso atual","g")],
    "Perda (%) = (peso ao nascer − peso atual) / peso ao nascer × 100.",
    v=>{need(+v.birth>0&&+v.current>0&&+v.current<=+v.birth,"Peso atual maior que o peso ao nascer não é perda; use avaliação de ganho de peso.");return[(+v.birth-+v.current)/+v.birth*100,"%"];},
    "ABM Clinical Protocol #3, revised 2017; equação de perda ponderal percentual.",
    ()=>"Não existe um único limite de perda seguro para todos os recém-nascidos; correlacionar com idade pós-natal, diurese, oferta e curvas apropriadas.");

  add("Pediatria","KCAL-RN","Aporte enteral neonatal (kcal/kg/dia)","Energia ingerida a partir de volume e densidade calórica","neonatalkcal",
    [num("vol","Volume ingerido em 24 horas","mL"),num("density","Densidade energética da dieta","kcal/100 mL"),
     num("weight","Peso atual","kg")],
    "kcal/kg/dia = volume total (mL/dia) × (kcal/100 mL)/100 ÷ peso (kg).",
    v=>{need(+v.vol>0&&+v.density>0&&+v.weight>0,"Volume, densidade e peso devem ser positivos.");return[+v.vol*+v.density/(100*+v.weight),"kcal/kg/dia"];},
    "Conversão dimensional; Anvisa RDC 976/2025 e RDC 1003/2025 para composição de fórmulas infantis.",
    ()=>"Calcular apenas a ingestão efetiva, não prescrever automaticamente meta calórica. Densidade depende de leite humano, fortificação e fórmula.");

  add("Nutrição","BAL-N","Balanço nitrogenado estimado","Estimativa nutricional pelo aporte de proteína e nitrogênio ureico urinário","nitrogenbalance",
    [num("protein","Proteína recebida","g/dia"),num("uun","Nitrogênio ureico urinário TOTAL 24 h","g/dia")],
    "Balanço N (g/d) ≈ proteína g/d ÷ 6,25 − UUN g/d − 4 g/d (perdas adicionais estimadas).",
    v=>{need(+v.protein>=0&&+v.uun>=0,"Aporte e UUN não podem ser negativos.");return[+v.protein/6.25-+v.uun-4,"g N/dia"];},
    "National Kidney Foundation nutrition assessment pocket guide, capítulo Nitrogen Balance; ACCP PSAP Nutrition 2005.",
    ()=>"Estimativa inadequada sem coleta urinária íntegra; o termo +4 g de perdas pode não valer em sepse, drenagens, diálise ou grandes perdas.");

  add("Cardiovascular","PAPi","Pulmonary Artery Pulsatility Index","Pressão pulsátil pulmonar em relação à pressão atrial direita","papi",
    [num("pas","Pressão sistólica da artéria pulmonar","mmHg"),
     num("pad","Pressão diastólica da artéria pulmonar","mmHg"),
     num("rap","Pressão atrial direita","mmHg")],
    "PAPi = (PAP sistólica − PAP diastólica)/pressão atrial direita.",
    v=>{need(+v.pas>+v.pad&&+v.pad>=0&&+v.rap>0,"Pressões inconsistentes ou pressão atrial direita igual a zero.");return[(+v.pas-+v.pad)/+v.rap,""];},
    "StatPearls NCBI Bookshelf NBK557404, Right Heart Catheterization: PAPi.",
    ()=>"Interpretar no contexto de cateterismo, choque, hipertensão pulmonar e função de VD; sem ponto de corte universal.");

  for(const id of ["urineosmol","urinegap","efwc","nitrogenbalance"])if(extra[id])extra[id].allowZero=true;

  for (const row of items) if (!C.some(x => x[4] === row[4])) C.push(row);
  for (const id of Object.keys(extra)) if (!defs[id]) defs[id] = extra[id];
  for (const id of Object.keys(msg)) if (!calcInterp[id]) calcInterp[id] = msg[id];
  for (const g of new Set(items.map(x => x[0]))) if (!cats.includes(g)) cats.push(g);
  render();
})();
