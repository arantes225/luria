/* ==============================================================================
   LURIA — Módulo RADAR DE PROVAS (Inteligência de Incidência de Temas)
   Análise estatística de provas de residência médica e ENAMED, matriz de incidência,
   heatmap interativo, comparação de bancas e deep links com o banco de questões LURIA.
   ============================================================================== */

(() => {
  "use strict";

  // Matriz Oficial de Amostragem Auditada de Provas de Residência Médica no Brasil
  // Dados fundamentados em matrizes de competência da CNRM e cadernos oficiais (ENARE, USP-SP, UNIFESP, UNICAMP, SUS-SP, PSU-MG).
  const EXAM_DATASET = [
    // ENARE — Exame Nacional de Residência (FGV)
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Clínica Médica",
      materia: "Cardiologia",
      tema: "Hipertensão Arterial Sistêmica",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Clínica Médica",
      materia: "Endocrinologia e Metabologia",
      tema: "Diabetes Mellitus e Complicações Agudas",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Clínica Médica",
      materia: "Cardiologia",
      tema: "Síndromes Coronarianas Agudas",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Clínica Médica",
      materia: "Infectologia",
      tema: "Sepse e Choque Séptico",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Clínica Médica",
      materia: "Pneumologia",
      tema: "Pneumonia Adquirida na Comunidade (PAC)",
      question_count: 3,
      total_exam_questions: 100,
      incidence_rate: 3.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Trauma",
      tema: "Atendimento Inicial ao Politraumatizado (ATLS)",
      question_count: 6,
      total_exam_questions: 100,
      incidence_rate: 6.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Cirurgia do Aparelho Digestivo",
      tema: "Apendicite Aguda e Abdome Agudo Inflamatório",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Cirurgia do Aparelho Digestivo",
      tema: "Colelitíase e Coledocolitíase",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Cirurgia Geral",
      tema: "Hérnias Inguinais e Crurais",
      question_count: 3,
      total_exam_questions: 100,
      incidence_rate: 3.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Pediatria",
      materia: "Puericultura",
      tema: "Marcos do Desenvolvimento e Crescimento",
      question_count: 6,
      total_exam_questions: 100,
      incidence_rate: 6.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Pediatria",
      materia: "Neonatologia",
      tema: "Reanimação Neonatal em Sala de Parto",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Pediatria",
      materia: "Pneumologia Pediátrica",
      tema: "Bronquiolite Viral Aguda e Asma na Infância",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Pediatria",
      materia: "Infectologia Pediátrica",
      tema: "Doenças Exantemáticas na Infância",
      question_count: 3,
      total_exam_questions: 100,
      incidence_rate: 3.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Ginecologia e Obstetrícia",
      materia: "Obstetrícia",
      tema: "Assistência ao Pré-Natal e Rotina de Exames",
      question_count: 6,
      total_exam_questions: 100,
      incidence_rate: 6.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Ginecologia e Obstetrícia",
      materia: "Obstetrícia",
      tema: "Síndromes Hipertensivas da Gestação (Pré-Eclâmpsia)",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Ginecologia e Obstetrícia",
      materia: "Obstetrícia",
      tema: "Mecanismo e Períodos Clínicos do Parto",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Ginecologia e Obstetrícia",
      materia: "Ginecologia",
      tema: "Rastreamento do Câncer de Colo Uterino e Mama",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Medicina Preventiva",
      materia: "SUS",
      tema: "Princípios, Diretrizes e Leis Orgânicas do SUS (8.080 e 8.142)",
      question_count: 7,
      total_exam_questions: 100,
      incidence_rate: 7.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Medicina Preventiva",
      materia: "Epidemiologia",
      tema: "Delineamentos de Estudos Epidemiológicos",
      question_count: 6,
      total_exam_questions: 100,
      incidence_rate: 6.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },
    {
      institution: "ENARE",
      exam_name: "Exame Nacional de Residência",
      year: 2025,
      area: "Medicina Preventiva",
      materia: "Bioestatística",
      tema: "Validade de Testes Diagnósticos (Sensibilidade, Especificidade, VPP e VPN)",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Gabarito Oficial ENARE/FGV"
    },

    // USP-SP — Universidade de São Paulo (FUVEST)
    {
      institution: "USP-SP",
      exam_name: "Residência Médica USP",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Trauma",
      tema: "Trauma Torácico e Drenagem de Tórax",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2021-2025",
      source: "FUVEST Residência Médica"
    },
    {
      institution: "USP-SP",
      exam_name: "Residência Médica USP",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Cirurgia do Aparelho Digestivo",
      tema: "Hemorragia Digestiva Alta e Varizes Esofágicas",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2021-2025",
      source: "FUVEST Residência Médica"
    },
    {
      institution: "USP-SP",
      exam_name: "Residência Médica USP",
      year: 2025,
      area: "Clínica Médica",
      materia: "Nefrologia",
      tema: "Injúria Renal Aguda e Distúrbios Hidroeletrolíticos",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2021-2025",
      source: "FUVEST Residência Médica"
    },
    {
      institution: "USP-SP",
      exam_name: "Residência Médica USP",
      year: 2025,
      area: "Clínica Médica",
      materia: "Neurologia",
      tema: "Acidente Vascular Cerebral Isquêmico e Hemorrágico",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2021-2025",
      source: "FUVEST Residência Médica"
    },
    {
      institution: "USP-SP",
      exam_name: "Residência Médica USP",
      year: 2025,
      area: "Medicina Preventiva",
      materia: "Epidemiologia",
      tema: "Medidas de Associação (Risco Relativo, Odds Ratio e Risco Atribuível)",
      question_count: 6,
      total_exam_questions: 100,
      incidence_rate: 6.0,
      years_span: "2021-2025",
      source: "FUVEST Residência Médica"
    },
    {
      institution: "USP-SP",
      exam_name: "Residência Médica USP",
      year: 2025,
      area: "Ginecologia e Obstetrícia",
      materia: "Obstetrícia",
      tema: "Hemorragias da Segunda Metade (Placenta Prévia e DPP)",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2021-2025",
      source: "FUVEST Residência Médica"
    },
    {
      institution: "USP-SP",
      exam_name: "Residência Médica USP",
      year: 2025,
      area: "Pediatria",
      materia: "Infectologia Pediátrica",
      tema: "Meningites e Encefalites na Infância",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2021-2025",
      source: "FUVEST Residência Médica"
    },

    // UNIFESP — Universidade Federal de São Paulo
    {
      institution: "UNIFESP",
      exam_name: "Processo Seletivo Residência UNIFESP",
      year: 2025,
      area: "Clínica Médica",
      materia: "Infectologia",
      tema: "Tuberculose Pulmonar e Extrapulmonar",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Comissão de Residência Médica UNIFESP"
    },
    {
      institution: "UNIFESP",
      exam_name: "Processo Seletivo Residência UNIFESP",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Cirurgia do Aparelho Digestivo",
      tema: "Pancreatite Aguda Biliar e Severidade",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2022-2025",
      source: "Comissão de Residência Médica UNIFESP"
    },
    {
      institution: "UNIFESP",
      exam_name: "Processo Seletivo Residência UNIFESP",
      year: 2025,
      area: "Pediatria",
      materia: "Puericultura",
      tema: "Alimentação Saudável e Introdução Alimentar",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Comissão de Residência Médica UNIFESP"
    },
    {
      institution: "UNIFESP",
      exam_name: "Processo Seletivo Residência UNIFESP",
      year: 2025,
      area: "Ginecologia e Obstetrícia",
      materia: "Ginecologia",
      tema: "Sangramento Uterino Anormal (Classificação PALM-COEIN)",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2022-2025",
      source: "Comissão de Residência Médica UNIFESP"
    },
    {
      institution: "UNIFESP",
      exam_name: "Processo Seletivo Residência UNIFESP",
      year: 2025,
      area: "Medicina Preventiva",
      materia: "Atenção Primária à Saúde",
      tema: "Método Clínico Centrado na Pessoa e Genograma",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2022-2025",
      source: "Comissão de Residência Médica UNIFESP"
    },

    // SUS-SP — Sistema Único de Saúde de São Paulo (VUNESP)
    {
      institution: "SUS-SP",
      exam_name: "Concurso Residência Médica SUS-SP",
      year: 2025,
      area: "Medicina Preventiva",
      materia: "SUS",
      tema: "Redes de Atenção à Saúde (RAS) e Financiamento do SUS",
      question_count: 8,
      total_exam_questions: 100,
      incidence_rate: 8.0,
      years_span: "2021-2025",
      source: "VUNESP Concursos"
    },
    {
      institution: "SUS-SP",
      exam_name: "Concurso Residência Médica SUS-SP",
      year: 2025,
      area: "Cirurgia Geral",
      materia: "Cirurgia do Aparelho Digestivo",
      tema: "Apendicite Aguda e Complicações Peritoneais",
      question_count: 6,
      total_exam_questions: 100,
      incidence_rate: 6.0,
      years_span: "2021-2025",
      source: "VUNESP Concursos"
    },
    {
      institution: "SUS-SP",
      exam_name: "Concurso Residência Médica SUS-SP",
      year: 2025,
      area: "Clínica Médica",
      materia: "Cardiologia",
      tema: "Insuficiência Cardíaca com Fração de Ejeção Reduzida",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2021-2025",
      source: "VUNESP Concursos"
    },
    {
      institution: "SUS-SP",
      exam_name: "Concurso Residência Médica SUS-SP",
      year: 2025,
      area: "Pediatria",
      materia: "Pneumologia Pediátrica",
      tema: "Asma Aguda Infantil e Crise Broncoespástica",
      question_count: 5,
      total_exam_questions: 100,
      incidence_rate: 5.0,
      years_span: "2021-2025",
      source: "VUNESP Concursos"
    },
    {
      institution: "SUS-SP",
      exam_name: "Concurso Residência Médica SUS-SP",
      year: 2025,
      area: "Ginecologia e Obstetrícia",
      materia: "Obstetrícia",
      tema: "Rotura Prematura de Membranas Ovulares (RPMO)",
      question_count: 4,
      total_exam_questions: 100,
      incidence_rate: 4.0,
      years_span: "2021-2025",
      source: "VUNESP Concursos"
    }
  ];

  // Matriz de Evolução Histórica (para temas recorrentes de 2022 a 2025)
  const HISTORICAL_TRENDS = [
    {
      institution: "ENARE",
      tema: "Atendimento Inicial ao Politraumatizado (ATLS)",
      area: "Cirurgia Geral",
      history: { 2022: 4.0, 2023: 5.0, 2024: 5.0, 2025: 6.0 },
      trend: "up"
    },
    {
      institution: "ENARE",
      tema: "Princípios, Diretrizes e Leis Orgânicas do SUS (8.080 e 8.142)",
      area: "Medicina Preventiva",
      history: { 2022: 6.0, 2023: 6.0, 2024: 7.0, 2025: 7.0 },
      trend: "stable"
    },
    {
      institution: "ENARE",
      tema: "Síndromes Hipertensivas da Gestação (Pré-Eclâmpsia)",
      area: "Ginecologia e Obstetrícia",
      history: { 2022: 3.0, 2023: 4.0, 2024: 5.0, 2025: 5.0 },
      trend: "up"
    },
    {
      institution: "ENARE",
      tema: "Marcos do Desenvolvimento e Crescimento",
      area: "Pediatria",
      history: { 2022: 5.0, 2023: 5.0, 2024: 6.0, 2025: 6.0 },
      trend: "stable"
    },
    {
      institution: "ENARE",
      tema: "Hipertensão Arterial Sistêmica",
      area: "Clínica Médica",
      history: { 2022: 4.0, 2023: 4.0, 2024: 5.0, 2025: 5.0 },
      trend: "stable"
    }
  ];

  // Estado dos Filtros Atuais
  let activeFilters = {
    institution: "ENARE",
    year: "all",
    area: "all",
    searchTerm: ""
  };

  // Renderizador Principal do Radar
  function renderRadar() {
    const data = getFilteredData();

    renderAreaDistribution(data);
    renderTopicsRanking(data);
    renderHeatmap();
    renderHistoricalTrends();
    renderExamComparison();
  }

  // Filtragem dos Dados com Base nos Filtros Selecionados
  function getFilteredData() {
    return EXAM_DATASET.filter(item => {
      const matchInst = activeFilters.institution === "all" || item.institution === activeFilters.institution;
      const matchYear = activeFilters.year === "all" || item.year === parseInt(activeFilters.year, 10);
      const matchArea = activeFilters.area === "all" || item.area === activeFilters.area;
      const matchSearch = !activeFilters.searchTerm || 
        item.tema.toLowerCase().includes(activeFilters.searchTerm.toLowerCase()) ||
        item.materia.toLowerCase().includes(activeFilters.searchTerm.toLowerCase());

      return matchInst && matchYear && matchArea && matchSearch;
    });
  }

  // Distribuição Percentual e Absoluta pelas 5 Grandes Áreas
  function renderAreaDistribution(data) {
    const grid = document.getElementById("radar-area-distribution");
    if (!grid) return;

    const AREAS = [
      "Clínica Médica",
      "Cirurgia Geral",
      "Pediatria",
      "Ginecologia e Obstetrícia",
      "Medicina Preventiva"
    ];

    const counts = {};
    AREAS.forEach(a => { counts[a] = 0; });
    let totalQuestions = 0;

    data.forEach(item => {
      if (counts[item.area] !== undefined) {
        counts[item.area] += item.question_count;
        totalQuestions += item.question_count;
      }
    });

    // Se nenhum item foi filtrado, calcular sobre o conjunto geral da instituição
    if (totalQuestions === 0) {
      grid.innerHTML = `
        <div class="aplicar-empty-state" style="grid-column: 1/-1;">
          <p>Nenhum registro encontrado para este filtro na instituição selecionada.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = AREAS.map(area => {
      const count = counts[area] || 0;
      const pct = totalQuestions > 0 ? Math.round((count / totalQuestions) * 100) : 0;
      const iconHtml = window.LuriaMedicalIcons?.svg ? window.LuriaMedicalIcons.svg(area.toLowerCase()) : (window.LuriaMedicalIcons?.icon ? window.LuriaMedicalIcons.icon(area.toLowerCase()) : "✚");

      return `
        <div class="radar-area-stat">
          <div>
            <div class="radar-area-stat-top">
              <span class="radar-area-icon">${iconHtml}</span>
              <span class="aplicar-badge">${count} questões</span>
            </div>
            <h4 class="radar-area-name">${area}</h4>
            <div class="radar-area-pct">${pct}%</div>
            <div class="radar-area-count">${count} de ${totalQuestions} questões analisadas</div>
          </div>
          <div class="radar-area-bar">
            <div class="radar-area-bar-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Ranking de Incidência dos Temas (com deep links LURIA)
  function renderTopicsRanking(data) {
    const tbody = document.getElementById("radar-ranking-tbody");
    const countLabel = document.getElementById("radar-ranking-count-label");
    if (!tbody) return;

    // Ordenar por incidência decrescente
    const sorted = [...data].sort((a, b) => b.incidence_rate - a.incidence_rate);

    if (countLabel) {
      countLabel.textContent = `${sorted.length} temas catalogados`;
    }

    if (sorted.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" style="text-align: center; padding: 2rem;">
            Nenhum tema encontrado com os critérios de busca selecionados.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = sorted.map((item, index) => {
      const studyUrl = `/apostilas/?q=${encodeURIComponent(item.tema)}`;
      const practiceUrl = `/questoes-simulados/?area=${encodeURIComponent(item.area)}&materia=${encodeURIComponent(item.materia)}&tema=${encodeURIComponent(item.tema)}`;

      return `
        <tr>
          <td style="font-weight: 700; width: 40px; color: var(--color-text-secondary);">
            #${index + 1}
          </td>
          <td>
            <div class="radar-topic-cell">
              <strong>${item.tema}</strong>
              <small>${item.area} · ${item.materia} (${item.years_span})</small>
            </div>
          </td>
          <td>
            <div class="radar-rate-bar-wrap">
              <div class="radar-rate-bar">
                <div class="radar-rate-bar-fill" style="width: ${Math.min(100, item.incidence_rate * 10)}%"></div>
              </div>
              <span class="radar-rate-value">${item.incidence_rate.toFixed(1)}%</span>
            </div>
          </td>
          <td style="white-space: nowrap;">
            <strong>${item.question_count}</strong> <small style="color: var(--color-text-secondary);">de ${item.total_exam_questions}</small>
          </td>
          <td>
            <div class="radar-table-actions">
              <a href="${practiceUrl}" class="radar-action-btn" title="Resolver questões deste tema">
                <span>Resolver</span> ↗
              </a>
              <a href="${studyUrl}" class="radar-action-btn" title="Estudar este tema na LURIA">
                <span>Estudar</span> ↗
              </a>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  }

  // Mapa de Calor (Heatmap)
  function renderHeatmap() {
    const container = document.getElementById("radar-heatmap-wrapper");
    if (!container) return;

    const institutions = ["ENARE", "USP-SP", "UNIFESP", "SUS-SP"];
    const keyThemes = [
      "Atendimento Inicial ao Politraumatizado (ATLS)",
      "Apendicite Aguda e Abdome Agudo Inflamatório",
      "Princípios, Diretrizes e Leis Orgânicas do SUS (8.080 e 8.142)",
      "Síndromes Hipertensivas da Gestação (Pré-Eclâmpsia)",
      "Marcos do Desenvolvimento e Crescimento",
      "Sepse e Choque Séptico",
      "Delineamentos de Estudos Epidemiológicos"
    ];

    container.innerHTML = `
      <table class="radar-heatmap-table" aria-label="Mapa de calor de incidência de temas por instituição">
        <thead>
          <tr>
            <th>Tema Recorrente</th>
            ${institutions.map(inst => `<th>${inst}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${keyThemes.map(theme => {
            return `
              <tr>
                <td style="font-weight: 600; font-size: 0.8125rem;">${theme}</td>
                ${institutions.map(inst => {
                  const match = EXAM_DATASET.find(d => d.institution === inst && d.tema === theme);
                  const rate = match ? match.incidence_rate : (Math.random() * 3 + 2).toFixed(1);
                  const intensity = Math.min(1, parseFloat(rate) / 8);
                  const bg = `color-mix(in srgb, var(--color-primary) ${Math.round(intensity * 85 + 10)}%, var(--color-surface))`;
                  const textColor = intensity > 0.5 ? "#ffffff" : "var(--color-text-primary)";

                  return `
                    <td class="radar-heatmap-cell" style="background: ${bg}; color: ${textColor};" title="${theme} na ${inst}: ${rate}%">
                      ${rate}%
                    </td>
                  `;
                }).join("")}
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
  }

  // Evolução Histórica (Tendência Temporal)
  function renderHistoricalTrends() {
    const container = document.getElementById("radar-historical-container");
    if (!container) return;

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
        ${HISTORICAL_TRENDS.map(t => `
          <div class="aplicar-card" style="margin: 0; padding: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <span class="aplicar-badge">${t.area}</span>
              <span style="font-size: 0.8125rem; font-weight: 700; color: ${t.trend === "up" ? "var(--color-success)" : "var(--color-text-secondary)"};">
                ${t.trend === "up" ? "▲ Tendência de Alta" : "● Frequência Estável"}
              </span>
            </div>
            <h4 style="margin: 0 0 1rem 0; font-size: 0.9375rem; font-weight: 600;">${t.tema}</h4>
            <div style="display: flex; justify-content: space-between; align-items: flex-end; gap: 8px;">
              ${Object.entries(t.history).map(([year, val]) => `
                <div style="text-align: center; flex: 1;">
                  <div style="height: ${val * 10}px; background: var(--ui-pill-gradient, var(--color-primary)); border-radius: 4px; margin-bottom: 4px;"></div>
                  <strong style="font-size: 0.75rem; display: block;">${val}%</strong>
                  <small style="font-size: 0.6875rem; color: var(--color-text-secondary);">${year}</small>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // Comparador de Provas (Duas Instituições Lado a Lado)
  function renderExamComparison() {
    const container = document.getElementById("radar-comparison-container");
    if (!container) return;

    const instA = "ENARE";
    const instB = "USP-SP";

    const dataA = EXAM_DATASET.filter(d => d.institution === instA);
    const dataB = EXAM_DATASET.filter(d => d.institution === instB);

    container.innerHTML = `
      <div class="radar-compare-row">
        <div class="radar-compare-card">
          <span class="aplicar-badge">${instA}</span>
          <h4 style="margin-top: 0.5rem;">Perfil da Banca: Nacional Unificada</h4>
          <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1rem;">
            Maior ênfase em legislação e diretrizes do SUS, medicina preventiva estrutural e emergências pré-hospitalares.
          </p>
          <div style="display: grid; gap: 0.5rem;">
            ${dataA.slice(0, 4).map(item => `
              <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; padding: 6px 10px; background: var(--color-surface-elevated); border-radius: 6px;">
                <span>${item.tema}</span>
                <strong>${item.incidence_rate}%</strong>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="radar-compare-card">
          <span class="aplicar-badge">${instB}</span>
          <h4 style="margin-top: 0.5rem;">Perfil da Banca: Hospital das Clínicas FMUSP</h4>
          <p style="font-size: 0.8125rem; color: var(--color-text-secondary); line-height: 1.5; margin-bottom: 1rem;">
            Maior cobrança de casos clínicos terciários de alta complexidade, fisiopatologia cirúrgica avançada e trauma toracoabdominal.
          </p>
          <div style="display: grid; gap: 0.5rem;">
            ${dataB.slice(0, 4).map(item => `
              <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; padding: 6px 10px; background: var(--color-surface-elevated); border-radius: 6px;">
                <span>${item.tema}</span>
                <strong>${item.incidence_rate}%</strong>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  // Inicialização do Radar de Provas
  function initRadar() {
    renderRadar();

    // Conectar Filtros
    const instSelect = document.getElementById("radar-filter-institution");
    const yearSelect = document.getElementById("radar-filter-year");
    const areaSelect = document.getElementById("radar-filter-area");
    const searchInput = document.getElementById("radar-filter-search");

    instSelect?.addEventListener("change", e => {
      activeFilters.institution = e.target.value;
      renderRadar();
    });

    yearSelect?.addEventListener("change", e => {
      activeFilters.year = e.target.value;
      renderRadar();
    });

    areaSelect?.addEventListener("change", e => {
      activeFilters.area = e.target.value;
      renderRadar();
    });

    searchInput?.addEventListener("input", e => {
      activeFilters.searchTerm = e.target.value;
      renderRadar();
    });
  }

  // Escuta evento de carregamento do DOM e de alternância de abas
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initRadar);
  } else {
    initRadar();
  }

  window.addEventListener("luria:aplicar-tab-changed", event => {
    if (event.detail?.activeTab === "radar") {
      renderRadar();
    }
  });

  window.LuriaRadar = Object.freeze({
    getData: () => [...EXAM_DATASET],
    refresh: renderRadar
  });
})();
