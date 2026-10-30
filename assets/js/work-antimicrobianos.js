/**
 * LURIA Antimicrobianos 2.0 - Core Interactive & Intelligence Engine
 * Features:
 * - Smart Empiric Assistant with clinical decision tree
 * - Live Renal Clearance & Antimicrobial Dose Adjuster (Cockcroft-Gault)
 * - Dynamic Spectrum Matrix (Microbial Heatmap) with quick filters
 * - Fast multi-dimensional search with filter chips
 * - Full Catalog Popover with Posology, Renal Alerts, and Bulario Link
 */

(function () {
  "use strict";

  // --- Clinical Database & Spectrum Definitions ---
  const SPECTRUM_DATA = [
    { name: "Amoxicilina", class: "Aminopenicilina", gramP: 2, gramN: 1, anaer: 1, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Amoxi + Clavulanato", class: "Penicilina + Inibidor", gramP: 2, gramN: 2, anaer: 2, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Oxacilina", class: "Penicilina antiestafilocócica", gramP: 3, gramN: 0, anaer: 0, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Ampicilina", class: "Aminopenicilina", gramP: 2, gramN: 1, anaer: 1, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Piperacilina + Tazobactam", class: "Ureidopenicilina + Inibidor", gramP: 2, gramN: 3, anaer: 3, atyp: 0, pseud: 3, mrsa: 0, esbl: 1 },
    { name: "Cefalexina", class: "Cefalosporina 1ª ger.", gramP: 2, gramN: 1, anaer: 0, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Cefazolina", class: "Cefalosporina 1ª ger.", gramP: 3, gramN: 1, anaer: 0, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Ceftriaxona", class: "Cefalosporina 3ª ger.", gramP: 2, gramN: 3, anaer: 0, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Cefepima", class: "Cefalosporina 4ª ger.", gramP: 2, gramN: 3, anaer: 0, atyp: 0, pseud: 3, mrsa: 0, esbl: 0 },
    { name: "Ceftazidima", class: "Cefalosporina 3ª ger.", gramP: 0, gramN: 3, anaer: 0, atyp: 0, pseud: 3, mrsa: 0, esbl: 0 },
    { name: "Meropenem", class: "Carbapenêmico", gramP: 2, gramN: 3, anaer: 3, atyp: 0, pseud: 3, mrsa: 0, esbl: 3 },
    { name: "Ertapenem", class: "Carbapenêmico", gramP: 2, gramN: 3, anaer: 3, atyp: 0, pseud: 0, mrsa: 0, esbl: 3 },
    { name: "Vancomicina", class: "Glicopeptídeo", gramP: 3, gramN: 0, anaer: 1, atyp: 0, pseud: 0, mrsa: 3, esbl: 0 },
    { name: "Linezolida", class: "Oxazolidinona", gramP: 3, gramN: 0, anaer: 1, atyp: 0, pseud: 0, mrsa: 3, esbl: 0 },
    { name: "Daptomicina", class: "Lipopeptídeo", gramP: 3, gramN: 0, anaer: 0, atyp: 0, pseud: 0, mrsa: 3, esbl: 0 },
    { name: "Azitromicina", class: "Macrolídeo", gramP: 1, gramN: 1, anaer: 0, atyp: 3, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Levofloxacino", class: "Fluoroquinolona respiratória", gramP: 2, gramN: 3, anaer: 0, atyp: 3, pseud: 2, mrsa: 0, esbl: 0 },
    { name: "Ciprofloxacino", class: "Fluoroquinolona", gramP: 1, gramN: 3, anaer: 0, atyp: 2, pseud: 3, mrsa: 0, esbl: 0 },
    { name: "Metronidazol", class: "Nitroimidazólico", gramP: 0, gramN: 0, anaer: 3, atyp: 0, pseud: 0, mrsa: 0, esbl: 0 },
    { name: "Amicacina", class: "Aminoglicosídeo", gramP: 0, gramN: 3, anaer: 0, atyp: 0, pseud: 3, mrsa: 0, esbl: 2 },
    { name: "Gentamicina", class: "Aminoglicosídeo", gramP: 1, gramN: 3, anaer: 0, atyp: 0, pseud: 2, mrsa: 0, esbl: 1 },
    { name: "Nitrofurantoína", class: "Nitrofurano", gramP: 2, gramN: 2, anaer: 0, atyp: 0, pseud: 0, mrsa: 0, esbl: 1 },
    { name: "Fosfomicina", class: "Fosfonato", gramP: 2, gramN: 3, anaer: 0, atyp: 0, pseud: 1, mrsa: 0, esbl: 2 }
  ];

  // Renal dosing adjustments rules for common antibiotics
  const RENAL_DOSE_RULES = [
    {
      drug: "Ceftriaxona",
      normal: "1g a 2g IV 1x/dia",
      adj50: "Sem ajuste de dose (eliminação biliar/renal)",
      adj30: "Sem ajuste (máx 2g/dia se disfunção hepática concomitante)",
      adj15: "Sem ajuste rotineiro",
      hemo: "Sem necessidade de dose de reforço pós-hemodiálise",
      notes: "Excelente opção empírica em insuficiência renal sem necessidade de escalonamento."
    },
    {
      drug: "Piperacilina + Tazobactam",
      normal: "4,5g IV a cada 6h (infusão estendida)",
      adj50: "3,375g IV a cada 6h",
      adj30: "2,25g IV a cada 6h",
      adj15: "2,25g IV a cada 8h",
      hemo: "2,25g a cada 8h + 0,75g após cada sessão de diálise",
      notes: "Infusão estendida (3-4h) otimiza T>MIC farmacodinâmico."
    },
    {
      drug: "Meropenem",
      normal: "1g IV a cada 8h (infusão de 3h na sepse)",
      adj50: "1g IV a cada 12h",
      adj30: "500mg IV a cada 12h",
      adj15: "500mg IV a cada 24h",
      hemo: "500mg após hemodiálise",
      notes: "Risco de toxicidade neurológica / convulsão se não ajustado na insuficiência renal."
    },
    {
      drug: "Cefepima",
      normal: "2g IV a cada 8h",
      adj50: "2g IV a cada 12h",
      adj30: "1g a 2g IV a cada 24h",
      adj15: "1g IV a cada 24h",
      hemo: "1g pós-diálise",
      notes: "ALTO RISCO de encefalopatia por cefepima (mioclonias, confusão) em falência renal não ajustada."
    },
    {
      drug: "Vancomicina",
      normal: "15-20 mg/kg IV a cada 8-12h (ataque 25-30 mg/kg na sepse)",
      adj50: "15 mg/kg a cada 24h",
      adj30: "15 mg/kg a cada 48h",
      adj15: "Guiado estritamente por dosagem de vale (vancocinemia)",
      hemo: "Dose de ataque inicial + redose apenas quando vancocinemia < 15 mcg/mL",
      notes: "Manter vale entre 15-20 mcg/mL em infecções graves/MRSA. Nefrotóxico."
    },
    {
      drug: "Ciprofloxacino",
      normal: "400mg IV 12/12h ou 500-750mg VO 12/12h",
      adj50: "Sem ajuste ou 400mg IV a cada 12h",
      adj30: "200-400mg IV a cada 18-24h",
      adj15: "200-400mg IV a cada 24h",
      hemo: "Dose após a sessão de diálise",
      notes: "Cuidado com prolongamento do intervalo QTc e rotura tendínea em idosos."
    },
    {
      drug: "Amoxicilina + Clavulanato",
      normal: "875/125mg VO 12/12h ou 1g IV 8/8h",
      adj50: "Sem ajuste na dose habitual",
      adj30: "Reduzir frequência para 12/12h (evitar formulação 875mg se ClCr < 30)",
      adj15: "500/125mg VO a cada 24h",
      hemo: "Dose pós-sessão de hemodiálise",
      notes: "A formulação 875/125mg não deve ser usada se ClCr < 30 mL/min."
    },
    {
      drug: "Nitrofurantoína",
      normal: "100mg VO a cada 6h (ou formulação liberação modificada 100mg 12/12h)",
      adj50: "Usar com cautela",
      adj30: "CONTRAINDICADA se ClCr < 30 mL/min",
      adj15: "CONTRAINDICADA (concentração urinária ineficaz + risco de toxicidade)",
      hemo: "Contraindicada",
      notes: "Ineficaz em infecção alta (pielonefrite) ou ClCr reduzido."
    }
  ];

  // Empiric Guide Scenarios
  const EMPIRIC_SCENARIOS = {
    pac: {
      title: "Pneumonia Adquirida na Comunidade (PAC)",
      types: {
        ambulatorial_sem_comorb: {
          name: "Ambulatorial (sem comorbidades / CURB-65 0-1)",
          firstLine: {
            drugs: "Amoxicilina 500mg-1g VO 8/8h por 5-7 dias",
            badge: "1ª Linha",
            notes: "Alternativa: Azitromicina 500mg VO 1x/dia (ou Doxiciclina 100mg VO 12/12h se suspeita de atípico)."
          },
          alt: {
            drugs: "Amoxicilina + Clavulanato 875/125mg VO 12/12h OU Azitromicina + Amoxicilina",
            badge: "Alternativa / Alergia",
            notes: "Se alergia a penicilina não IgE-mediada: Cefuroxima axetil 500mg 12/12h. Se anafilaxia: Levofloxacino 500mg VO 1x/dia ou Moxifloxacino 400mg VO 1x/dia."
          }
        },
        ambulatorial_comorb: {
          name: "Ambulatorial (com comorbidades / DPOC / Idoso / Antibiótico recente)",
          firstLine: {
            drugs: "Amoxicilina + Clavulanato 875/125mg VO 12/12h + Azitromicina 500mg VO 1x/dia (5 dias)",
            badge: "1ª Linha Padrão",
            notes: "Cobre Streptococcus pneumoniae resistente, Haemophilus e germes atípicos."
          },
          alt: {
            drugs: "Levofloxacino 750mg VO 1x/dia (5 dias) OU Moxifloxacino 400mg VO 1x/dia",
            badge: "Alternativa (Monoterapia)",
            notes: "Reservar quinolonas para pacientes intolerantes ou com alergia severa a beta-lactâmicos."
          }
        },
        enfermaria: {
          name: "Internação em Enfermaria (CURB-65 2)",
          firstLine: {
            drugs: "Ceftriaxona 1g-2g IV 1x/dia + Azitromicina 500mg IV/VO 1x/dia",
            badge: "Padrão Ouro",
            notes: "Alternativa a Ceftriaxona: Ampicilina/sulbactam 1,5g-3g IV 6/6h."
          },
          alt: {
            drugs: "Levofloxacino 750mg IV/VO 1x/dia em monoterapia",
            badge: "Alternativa",
            notes: "Para alérgicos a beta-lactâmicos."
          }
        },
        uti: {
          name: "PAC Grave / UTI (CURB-65 ≥ 3 ou Choque Séptico / IOT)",
          firstLine: {
            drugs: "Ceftriaxona 2g IV 1x/dia + Azitromicina 500mg IV 1x/dia (OU Levofloxacino 750mg IV)",
            badge: "PAC Grave Clássica",
            notes: "Se risco de Pseudomonas (bronquiectasias, corticoterapia prévia): trocar Ceftriaxona por Piperacilina/Tazobactam 4,5g IV 6/6h ou Cefepima 2g IV 8/8h."
          },
          alt: {
            drugs: "Se risco de MRSA (colonização prévia, hemodiálise, necrose cavitária pós-influenza): Associar Vancomicina ou Linezolida 600mg IV 12/12h",
            badge: "Adição para MRSA",
            notes: "Coletar hemoculturas e escarro/aspirado traqueal ANTES do início do antimicrobiano."
          }
        }
      }
    },
    itu: {
      title: "Infecção do Trato Urinário (ITU)",
      types: {
        cistite_nao_complicada: {
          name: "Cistite não complicada (Mulher jovem hígida, não gestante)",
          firstLine: {
            drugs: "Nitrofurantoína 100mg VO 6/6h (5 dias) OU Fosfomicina trometamol 3g dose única VO",
            badge: "1ª Linha",
            notes: "Poupadores de flora sistêmica com baixa taxa de resistência comunitária."
          },
          alt: {
            drugs: "Cefalexina 500mg VO 6/6h (7 dias) OU Sulfametoxazol-Trimetoprima 800/160mg 12/12h (3 dias, se resistência local < 20%)",
            badge: "Alternativas",
            notes: "EVITAR quinolonas (Cipro/Levo) em cistite simples pelo risco ecológico e efeitos adversos desproporcionais."
          }
        },
        cistite_gestante: {
          name: "Bacteriúria assintomática / Cistite na Gestante",
          firstLine: {
            drugs: "Fosfomicina 3g VO dose única OU Nitrofurantoína 100mg VO 6/6h (evitar no 1º tri e termo)",
            badge: "1ª Linha",
            notes: "Cefalexina 500mg VO 6/6h (7 dias) ou Amoxicilina/Clavulanato 500mg 8/8h são alternativas seguras."
          },
          alt: {
            drugs: "Sempre repetir urocultura de controle 7-14 dias após o término do tratamento.",
            badge: "Alerta Gestacional",
            notes: "Contraindicados: Quinolonas, Tetraciclinas e Aminoglicosídeos."
          }
        },
        pielonefrite_ambulatorial: {
          name: "Pielonefrite Aguda Não Complicada (Sem critérios de sepse)",
          firstLine: {
            drugs: "Ciprofloxacino 500mg VO 12/12h (7 dias) OU Levofloxacino 750mg VO 1x/dia (5 dias)",
            badge: "1ª Linha Oral",
            notes: "Pode-se fazer 1ª dose de Ceftriaxona 1g IV/IM na unidade antes da alta com fluoroquinolona oral."
          },
          alt: {
            drugs: "Ceftriaxona 1g IM/IV 1x/dia (10-14 dias) OU Amoxicilina/Clavulanato (se germe comprovadamente sensível)",
            badge: "Alternativa",
            notes: "Nitrofurantoína e Fosfomicina NÃO penetram no parênquima renal e NÃO servem para pielonefrite."
          }
        },
        pielonefrite_hospitalar: {
          name: "Pielonefrite Grave / Sepse de Foco Urinário / Pielonefrite Complicada",
          firstLine: {
            drugs: "Ceftriaxona 1g a 2g IV 1x/dia",
            badge: "Hospitalar Inicial",
            notes: "Se choque séptico, manipulação urológica recente ou cateter vesical: Piperacilina/Tazobactam 4,5g IV 6/6h ou Meropenem 1g IV 8/8h (se risco de ESBL)."
          },
          alt: {
            drugs: "Amicacina 15mg/kg IV 1x/dia (adjuvante em choque) OU Ciprofloxacino 400mg IV 12/12h",
            badge: "Ajuste por Cultura",
            notes: "Solicitar USG/TC de vias urinárias se febre persistente após 72h para afastar litíase obstrutiva ou abscesso perirrenal."
          }
        }
      }
    },
    pele: {
      title: "Pele e Partes Moles",
      types: {
        erisipela_celulite_leve: {
          name: "Erisipela / Celulite Não Purulenta (Estreptocócica provável)",
          firstLine: {
            drugs: "Cefalexina 500mg VO 6/6h OU Cefazolina 1g-2g IV 8/8h OU Penicilina Benzatina 1.200.000 UI IM",
            badge: "1ª Linha",
            notes: "Duração habitual: 5 a 7 dias. Elevação do membro é fundamental."
          },
          alt: {
            drugs: "Amoxicilina 500mg VO 8/8h OU Clindamicina 300-450mg VO 6/6h (se alergia a penicilina)",
            badge: "Alternativa",
            notes: "Diferenciar de estase venosa crônica para evitar antibioticoterapia desnecessária."
          }
        },
        abscesso_purulenta: {
          name: "Infecção Purulenta / Abscesso Cutâneo (Suspeita de MSSA / CA-MRSA)",
          firstLine: {
            drugs: "Drenagem cirúrgica e lavagem (O controle de foco é o tratamento principal)",
            badge: "Conduta Principal",
            notes: "Se abscesso simples < 2cm sem sinais sistêmicos: antibioticoterapia muitas vezes NÃO é necessária após drenagem eficaz."
          },
          alt: {
            drugs: "Sulfametoxazol-Trimetoprima 800/160mg 12/12h OU Doxiciclina 100mg 12/12h OU Clindamicina 300mg 6/6h",
            badge: "Se houver celulite adjacente / imunossupressão",
            notes: "Para casos graves internados com suspeita de MRSA: Vancomicina IV ou Daptomicina IV."
          }
        },
        fasceite_grave: {
          name: "Infecção Necrosante de Partes Moles (Emergência Cirúrgica)",
          firstLine: {
            drugs: "Meropenem 1g IV 8/8h + Vancomicina 15-20mg/kg IV 12/12h + Clindamicina 900mg IV 8/8h",
            badge: "Emergência Imediata",
            notes: "A clindamicina atua inibindo a síntese de toxinas estafilocócicas e estreptocócicas (efeito Eagle)."
          },
          alt: {
            drugs: "Desbridamento cirúrgico de urgência sem atraso para início de exames de imagem",
            badge: "Cirúrgico",
            notes: "Dor desproporcional ao exame físico e crepitação são sinais de alarme cruciais."
          }
        }
      }
    },
    intra_abdominal: {
      title: "Infecção Intra-Abdominal (Apendicite / Diverticulite / Peritonite)",
      types: {
        comunitaria_leve_mod: {
          name: "Adquirida na Comunidade (Leve a Moderada)",
          firstLine: {
            drugs: "Ceftriaxona 1g-2g IV 1x/dia + Metronidazol 500mg IV/VO 8/8h",
            badge: "Padrão Ouro",
            notes: "Alternativa em monoterapia: Ciprofloxacino 400mg IV + Metronidazol 500mg IV ou Amoxicilina/Clavulanato 1g IV 8/8h."
          },
          alt: {
            drugs: "Ertapenem 1g IV 1x/dia",
            badge: "Alternativa Prática (1x ao dia)",
            notes: "Excelente cobertura para anaeróbios e enterobactérias comunitárias com comodidade posológica."
          }
        },
        hospitalar_grave: {
          name: "Grave / Choque Séptico / Pós-Operatória Hospitalar",
          firstLine: {
            drugs: "Piperacilina + Tazobactam 4,5g IV 6/6h (infusão estendida) OU Meropenem 1g IV 8/8h",
            badge: "Espectro Amplo",
            notes: "Cobrem bacilos entéricos resistentes, anaeróbios e Pseudomonas aeruginosa."
          },
          alt: {
            drugs: "Associar Vancomicina se infecção pós-operatória com prótese ou prevalência de MRSA / Enterococcus resistente",
            badge: "Associação",
            notes: "Considerar cobertura antifúngica empírica com Equinocandina (Anidulafungina/Micafungina) se perfuração de trato gastrointestinal superior, nutrição parenteral prolongada ou choque refratário."
          }
        }
      }
    },
    meningite: {
      title: "Meningite Bacteriana Aguda",
      types: {
        adulto_jovem: {
          name: "Adulto hígido (Pneumococo, Meningococo)",
          firstLine: {
            drugs: "Ceftriaxona 2g IV a cada 12h (Dose meníngea dobrada!) + Dexametasona 10mg IV antes ou com a 1ª dose",
            badge: "Dose Meníngea",
            notes: "Atenção: A dose de Ceftriaxona para meningite é 2g 12/12h (total 4g/dia), superior à dose habitual de sepse."
          },
          alt: {
            drugs: "Associar Vancomicina 15-20mg/kg IV 8/12h se suspeita de pneumococo com sensibilidade intermediária",
            badge: "Associação Empírica",
            notes: "Suspender dexametasona se o agente identificado não for Streptococcus pneumoniae."
          }
        },
        idoso_imuno: {
          name: "Idoso (> 50 anos) / Gestante / Imunossuprimido (Risco de Listeria)",
          firstLine: {
            drugs: "Ceftriaxona 2g IV 12/12h + Ampicilina 2g IV a cada 4h",
            badge: "Esquema com Ampicilina",
            notes: "A Listeria monocytogenes tem resistência natural intrínseca a TODAS as cefalosporinas. A Ampicilina é obrigatória."
          },
          alt: {
            drugs: "Sulfametoxazol-Trimetoprima IV se alergia grave a penicilinas com suspeita de Listeria",
            badge: "Alérgico",
            notes: "Manter tratamento mínimo de 21 dias se confirmada infecção por Listeria."
          }
        }
      }
    }
  };

  // State Management
  let activeTab = "empirico";
  let activeCatalog = [];
  let currentFilter = "all";

  // DOM Elements
  const tabBtns = document.querySelectorAll(".abx-tab-btn");
  const tabPanels = document.querySelectorAll(".abx-tab-panel");
  const searchInput = document.getElementById("abx-search");
  const tagBtns = document.querySelectorAll(".abx-tag-btn");
  const emptyNotice = document.getElementById("abx-empty");

  // Empiric Elements
  const empiricFocus = document.getElementById("empiric-focus");
  const empiricSubtype = document.getElementById("empiric-subtype");
  const empiricMrsa = document.getElementById("empiric-mrsa");
  const empiricPseudomonas = document.getElementById("empiric-pseudomonas");
  const empiricResult = document.getElementById("empiric-result");

  // Renal Elements
  const renalAge = document.getElementById("renal-age");
  const renalWeight = document.getElementById("renal-weight");
  const renalCr = document.getElementById("renal-cr");
  const renalSex = document.getElementById("renal-sex");
  const renalClcrDisplay = document.getElementById("renal-clcr-display");
  const renalStageBadge = document.getElementById("renal-stage-badge");
  const renalTableBody = document.getElementById("renal-table-body");

  // Spectrum Matrix Elements
  const matrixTableHead = document.getElementById("matrix-table-head");
  const matrixTableBody = document.getElementById("matrix-table-body");
  const matrixFilterBtns = document.querySelectorAll(".matrix-filter-btn");

  // Popover Elements
  const popover = document.getElementById("drug-popover");
  const popTitle = document.getElementById("drug-popover-title");
  const popSub = document.getElementById("drug-popover-sub");
  const popBody = document.getElementById("drug-popover-body");
  const popClose = document.getElementById("drug-popover-close");

  // Utility String Normalizer
  const norm = (s) => (s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

  // --- TAB SWITCHING ---
  function setTab(tabId) {
    activeTab = tabId;
    tabBtns.forEach((btn) => {
      const match = btn.dataset.tab === tabId;
      btn.setAttribute("aria-selected", String(match));
    });
    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === tabId);
    });
    filterContent();
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => setTab(btn.dataset.tab));
  });

  // --- FILTER & GLOBAL SEARCH ---
  function filterContent() {
    const q = norm(searchInput?.value.trim() || "");
    const activePanel = document.querySelector(".abx-tab-panel.active");
    if (!activePanel) return;

    const items = activePanel.querySelectorAll(".searchable");
    let visibleCount = 0;

    items.forEach((item) => {
      const text = norm((item.dataset.search || "") + " " + item.textContent);
      const tagMatch = currentFilter === "all" || (item.dataset.tags || "").includes(currentFilter);
      const queryMatch = !q || text.includes(q);

      const show = tagMatch && queryMatch;
      item.hidden = !show;
      if (show) visibleCount++;
    });

    if (emptyNotice) {
      emptyNotice.style.display = (items.length > 0 && visibleCount === 0) ? "block" : "none";
    }
  }

  searchInput?.addEventListener("input", filterContent);

  tagBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tagBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter || "all";
      filterContent();
    });
  });

  // --- MODULE 1: SMART EMPIRIC ASSISTANT LOGIC ---
  function updateEmpiricSubtypes() {
    if (!empiricFocus || !empiricSubtype) return;
    const focusKey = empiricFocus.value;
    const scenario = EMPIRIC_SCENARIOS[focusKey];
    empiricSubtype.innerHTML = "";

    if (scenario && scenario.types) {
      Object.keys(scenario.types).forEach((key) => {
        const opt = document.createElement("option");
        opt.value = key;
        opt.textContent = scenario.types[key].name;
        empiricSubtype.appendChild(opt);
      });
    }
    renderEmpiricRecommendation();
  }

  function renderEmpiricRecommendation() {
    if (!empiricFocus || !empiricSubtype || !empiricResult) return;
    const focusKey = empiricFocus.value;
    const subtypeKey = empiricSubtype.value;
    const scenario = EMPIRIC_SCENARIOS[focusKey];
    if (!scenario || !scenario.types[subtypeKey]) return;

    const data = scenario.types[subtypeKey];
    const wantMrsa = empiricMrsa?.checked;
    const wantPseud = empiricPseudomonas?.checked;

    let extraWarning = "";
    if (wantPseud) {
      extraWarning += `<div class="regimen-box" style="border-left: 4px solid #3b82f6;">
        <div class="regimen-line">
          <span class="regimen-name">Cobertura Adicional: Pseudomonas aeruginosa</span>
          <span class="regimen-badge badge-warning">Risco Marcado</span>
        </div>
        <div class="regimen-dose">Optar por: Piperacilina/Tazobactam 4,5g IV 6/6h (infusão de 3-4h), Cefepima 2g IV 8/8h ou Meropenem 1g IV 8/8h.</div>
        <div class="regimen-rationale">Lembrete: Ceftriaxona, Ampicilina/Sulbactam e Ertapenem NÃO cobrem Pseudomonas.</div>
      </div>`;
    }

    if (wantMrsa) {
      extraWarning += `<div class="regimen-box" style="border-left: 4px solid #ef4444;">
        <div class="regimen-line">
          <span class="regimen-name">Cobertura Adicional: MRSA</span>
          <span class="regimen-badge badge-warning">Risco Marcado</span>
        </div>
        <div class="regimen-dose">Associar: Vancomicina (dose ataque 25-30mg/kg, depois 15-20mg/kg 12/12h guiada por vale) OU Linezolida 600mg IV/VO 12/12h.</div>
        <div class="regimen-rationale">Na pneumonia, NÃO utilizar Daptomicina (inativada pelo surfactante).</div>
      </div>`;
    }

    empiricResult.innerHTML = `
      <div class="empiric-output-title">
        <h3><span>🎯</span> Esquema Recomendado · ${esc(data.name)}</h3>
        <span class="tag">Diretriz Atualizada</span>
      </div>
      
      <div class="regimen-box">
        <div class="regimen-line">
          <span class="regimen-name">1ª Linha: ${esc(data.firstLine.drugs)}</span>
          <span class="regimen-badge badge-firstline">${esc(data.firstLine.badge)}</span>
        </div>
        <div class="regimen-rationale">${esc(data.firstLine.notes)}</div>
      </div>

      <div class="regimen-box">
        <div class="regimen-line">
          <span class="regimen-name">Alternativa / Alergia: ${esc(data.alt.drugs)}</span>
          <span class="regimen-badge badge-alt">${esc(data.alt.badge)}</span>
        </div>
        <div class="regimen-rationale">${esc(data.alt.notes)}</div>
      </div>

      ${extraWarning}

      <div class="ctx">
        <strong>Conduta de Stewardship:</strong> Coletar culturas e lactato antes do início de antimicrobianos. Reavaliar o esquema e escalonar/descalonar em 48h a 72h conforme o resultado dos antibiogramas.
      </div>
    `;
  }

  empiricFocus?.addEventListener("change", updateEmpiricSubtypes);
  empiricSubtype?.addEventListener("change", renderEmpiricRecommendation);
  empiricMrsa?.addEventListener("change", renderEmpiricRecommendation);
  empiricPseudomonas?.addEventListener("change", renderEmpiricRecommendation);

  // --- MODULE 2: RENAL CLEARANCE CALCULATOR (Cockcroft-Gault) ---
  function calculateRenalDoses() {
    if (!renalAge || !renalWeight || !renalCr || !renalSex) return;
    const age = parseFloat(renalAge.value) || 0;
    const weight = parseFloat(renalWeight.value) || 0;
    const cr = parseFloat(renalCr.value) || 0;
    const isFemale = renalSex.value === "female";

    if (age <= 0 || weight <= 0 || cr <= 0) {
      if (renalClcrDisplay) renalClcrDisplay.textContent = "-- mL/min";
      return;
    }

    // Cockcroft-Gault equation: [(140 - age) * weight] / (72 * Cr) (* 0.85 if female)
    let clcr = ((140 - age) * weight) / (72 * cr);
    if (isFemale) clcr *= 0.85;
    clcr = Math.round(clcr * 10) / 10;

    if (renalClcrDisplay) renalClcrDisplay.textContent = clcr.toFixed(1) + " mL/min";

    let stageText = "Função Normal";
    let stageColor = "badge-firstline";
    if (clcr >= 90) {
      stageText = "ClCr Normal / Hiperfiltração (≥ 90)";
      stageColor = "badge-firstline";
    } else if (clcr >= 60) {
      stageText = "Disfunção Leve (60-89)";
      stageColor = "badge-firstline";
    } else if (clcr >= 30) {
      stageText = "Disfunção Moderada (30-59)";
      stageColor = "badge-alt";
    } else if (clcr >= 15) {
      stageText = "Disfunção Grave (15-29)";
      stageColor = "badge-warning";
    } else {
      stageText = "Falência Renal / Diálise (< 15)";
      stageColor = "badge-warning";
    }

    if (renalStageBadge) {
      renalStageBadge.className = `renal-stage-badge ${stageColor}`;
      renalStageBadge.textContent = stageText;
    }

    // Render table rows based on current calculated ClCr
    if (renalTableBody) {
      renalTableBody.innerHTML = RENAL_DOSE_RULES.map((rule) => {
        let suggestedDose = rule.normal;
        let isAdjusted = false;

        if (clcr < 15) {
          suggestedDose = rule.adj15;
          isAdjusted = true;
        } else if (clcr < 30) {
          suggestedDose = rule.adj30;
          isAdjusted = true;
        } else if (clcr < 50) {
          suggestedDose = rule.adj50;
          isAdjusted = true;
        }

        return `
          <tr>
            <td>
              <strong style="color: var(--accent); font-size: 13px;">${esc(rule.drug)}</strong>
              ${isAdjusted ? '<br><span class="renal-alert badge-warning">Ajuste Necessário</span>' : '<br><span class="renal-alert badge-firstline">Dose Padrão</span>'}
            </td>
            <td><b>${esc(suggestedDose)}</b></td>
            <td><small style="color: var(--muted);">${esc(rule.normal)}</small></td>
            <td><small>${esc(rule.hemo)}</small></td>
            <td><small style="color: var(--muted);">${esc(rule.notes)}</small></td>
          </tr>
        `;
      }).join("");
    }
  }

  [renalAge, renalWeight, renalCr, renalSex].forEach((el) => {
    el?.addEventListener("input", calculateRenalDoses);
    el?.addEventListener("change", calculateRenalDoses);
  });

  // --- MODULE 3: SPECTRUM MATRIX HEATMAP ---
  function renderMatrix(filterType = "all") {
    if (!matrixTableHead || !matrixTableBody) return;

    const headers = [
      { key: "drug", label: "Antimicrobiano", class: "drug-col" },
      { key: "class", label: "Classe" },
      { key: "gramP", label: "Gram +" },
      { key: "gramN", label: "Gram −" },
      { key: "anaer", label: "Anaeróbios" },
      { key: "atyp", label: "Atípicos" },
      { key: "pseud", label: "Pseudomonas" },
      { key: "mrsa", label: "MRSA" },
      { key: "esbl", label: "ESBL" }
    ];

    matrixTableHead.innerHTML = `<tr>${headers.map((h) => `<th class="${h.class || ""}">${h.label}</th>`).join("")}</tr>`;

    let filtered = SPECTRUM_DATA;
    if (filterType === "pseudomonas") {
      filtered = SPECTRUM_DATA.filter((d) => d.pseud >= 2);
    } else if (filterType === "mrsa") {
      filtered = SPECTRUM_DATA.filter((d) => d.mrsa >= 2);
    } else if (filterType === "anaerobios") {
      filtered = SPECTRUM_DATA.filter((d) => d.anaer >= 2);
    } else if (filterType === "esbl") {
      filtered = SPECTRUM_DATA.filter((d) => d.esbl >= 2);
    }

    const renderCell = (score) => {
      if (score === 3) return '<span class="cell-cov cov-3" title="Excelente Atividade">+++</span>';
      if (score === 2) return '<span class="cell-cov cov-2" title="Atividade Moderada / Parcial">++</span>';
      if (score === 1) return '<span class="cell-cov cov-2" style="opacity:0.75" title="Variável / Limitada">+</span>';
      return '<span class="cell-cov cov-0" title="Sem Atividade Relevante">0</span>';
    };

    matrixTableBody.innerHTML = filtered.map((row) => `
      <tr>
        <td class="drug-col">
          <button type="button" class="drug-chip" data-drug="${esc(row.name)}" style="border:none;background:transparent;padding:0;font-weight:800;color:var(--accent);">
            ${esc(row.name)}
          </button>
        </td>
        <td><small style="color:var(--muted);">${esc(row.class)}</small></td>
        <td>${renderCell(row.gramP)}</td>
        <td>${renderCell(row.gramN)}</td>
        <td>${renderCell(row.anaer)}</td>
        <td>${renderCell(row.atyp)}</td>
        <td>${renderCell(row.pseud)}</td>
        <td>${renderCell(row.mrsa)}</td>
        <td>${renderCell(row.esbl)}</td>
      </tr>
    `).join("");
  }

  matrixFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      matrixFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderMatrix(btn.dataset.matrixFilter);
    });
  });

  // --- CATALOG & DRUG DETAILS MODAL ---
  const normDrug = (s) => norm(String(s || "").replace(/\s*\+\s*/g, " "));

  function findDrug(name) {
    const q = normDrug(name);
    return activeCatalog.find((r) => normDrug(r.name) === q || normDrug(r.active_ingredient) === q) ||
           activeCatalog.find((r) => normDrug(r.name).includes(q) || q.includes(normDrug(r.name)) || normDrug(r.active_ingredient).includes(q));
  }

  function openDrug(name) {
    if (!popover || !popTitle || !popSub || !popBody) return;
    const row = findDrug(name);
    popTitle.textContent = row?.name || name;

    if (!row) {
      popSub.textContent = "Medicamento em referência rápida do guia clínico.";
      popBody.innerHTML = `
        <div class="ctx">
          Ficha detalhada do Bulário disponível para consulta de apresentações comerciais e registro Anvisa.
        </div>
        <div class="drug-popover-actions">
          <a href="/trabalho/bulario/?q=${encodeURIComponent(name)}" target="_blank" rel="noopener">Pesquisar "${esc(name)}" no Bulário</a>
        </div>
      `;
      popover.classList.add("open");
      return;
    }

    const d = row.data || {};
    const forms = Array.isArray(d.formulations) ? d.formulations : [];
    const f = forms[0] || {};
    const diseases = Array.isArray(d.diseases) ? d.diseases : [];

    popSub.textContent = (row.active_ingredient || "Princípio ativo") + " · " + (d.therapeutic_class || row.therapeutic_class || "Classe Antimicrobiana");

    popBody.innerHTML = `
      <div class="drug-popover-grid">
        <div class="drug-mini"><span>Apresentações</span><b>${esc(forms.length ? forms.length + " cadastrada(s)" : "Diversas")}</b></div>
        <div class="drug-mini"><span>Via Preferencial</span><b>${esc(f.route || "IV / VO conforme caso")}</b></div>
        <div class="drug-mini"><span>Posologia Habitual</span><b>${esc(f.dose_text || "Ver protocolos clínicos")}</b></div>
        <div class="drug-mini"><span>Intervalo</span><b>${esc(f.interval_text || "Conforme clearance")}</b></div>
      </div>
      ${diseases.length ? `<div class="label">Indicações e Sítios Cadastrados</div><div class="drugline">${esc(diseases.slice(0, 6).join(" · "))}</div>` : ""}
      ${f.cautions ? `<div class="ctx"><strong>Avisos e Ajustes:</strong> ${esc(f.cautions)}</div>` : ""}
      <div class="drug-popover-actions">
        <a href="/trabalho/bulario/?q=${encodeURIComponent(row.name)}" target="_blank" rel="noopener">Abrir Ficha Completa no Bulário</a>
      </div>
      <div class="drug-popover-note">
        Verifique sempre alergias prévias, função renal calculada (Cockcroft-Gault) e perfil de sensibilidade local da sua comissão de controle de infecção hospitalar (CCIH).
      </div>
    `;
    popover.classList.add("open");
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest(".drug-chip");
    if (b && b.dataset.drug) {
      openDrug(b.dataset.drug);
    }
  });

  popClose?.addEventListener("click", () => popover?.classList.remove("open"));
  popover?.addEventListener("click", (e) => {
    if (e.target === popover) popover.classList.remove("open");
  });

  // Attach chip buttons dynamically to existing details cards if needed
  function addFocusDrugButtons() {
    document.querySelectorAll(".focus-card[data-drugs]").forEach((card) => {
      if (card.querySelector(".focus-drugs")) return;
      const names = (card.dataset.drugs || "").split("|").filter(Boolean);
      const box = document.createElement("div");
      box.className = "focus-drugs";
      box.innerHTML = '<div class="focus-drugs-title">Antimicrobianos relacionados · Toque para ver detalhes</div><div class="agents"></div>';
      const wrap = box.querySelector(".agents");
      names.forEach((name) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "drug-chip";
        btn.dataset.drug = name;
        btn.textContent = name;
        wrap.appendChild(btn);
      });
      card.querySelector(".focus-body")?.appendChild(box);
    });
  }

  // --- INITIALIZATION ---
  async function init() {
    addFocusDrugButtons();
    updateEmpiricSubtypes();
    calculateRenalDoses();
    renderMatrix();

    try {
      if (window.supabaseClient && typeof window.supabaseClient.from === "function") {
        const { data, error } = await window.supabaseClient
          .from("bulario_catalog")
          .select("id,name,active_ingredient,therapeutic_class,pharmacological_class,data")
          .order("name")
          .limit(1000);
        if (!error && Array.isArray(data)) {
          activeCatalog = data;
        }
      }
    } catch (_) {
      // Fallback bridge handles seeds if offline
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
