/**
 * LURIA - Organizador Inteligente de Anamnese
 * Processa informações clínicas soltas/desestruturadas em seções formais de anamnese médica.
 * Pronto para conectar com modelo próprio de IA via Endpoint REST ou mock local contextual.
 */

(() => {
  const ENDPOINT_KEY = 'luria_anamnese_ai_endpoint';

  // Configuração padrão ou salva
  const getCustomEndpoint = () => localStorage.getItem(ENDPOINT_KEY) || '';
  const setCustomEndpoint = (url) => {
    if (!url) {
      localStorage.removeItem(ENDPOINT_KEY);
    } else {
      localStorage.setItem(ENDPOINT_KEY, url.trim());
    }
  };

  // Seções clássicas da anamnese médica
  const DEFAULT_SECTIONS = [
    { key: 'qp', label: 'Queixa Principal (QP)', icon: '💬', placeholder: 'Motivo principal da consulta ou internação em poucas palavras' },
    { key: 'hda', label: 'História da Doença Atual (HDA)', icon: '📖', placeholder: 'Início, caracterização dos sintomas, evolução, fatores de melhora/piora e cronologia' },
    { key: 'isda', label: 'Interrogatório Sintomatológico (ISDA / ROS)', icon: '🩺', placeholder: 'Sintomas associados em outros sistemas (geral, resp, cv, gi, gu, neuro)' },
    { key: 'antecedentes', label: 'Antecedentes Pessoais e Familiares', icon: '🧬', placeholder: 'Comorbidades prévias (HAS, DM), cirurgias, internações, alergias e histórico familiar' },
    { key: 'medicamentos', label: 'Medicamentos em Uso', icon: '💊', placeholder: 'Drogas de uso contínuo, doses, posologias ou automedicação' },
    { key: 'exame_fisico', label: 'Exame Físico & Sinais Vitais', icon: '🫀', placeholder: 'PA, FC, FR, SpO2, Temp, ectoscopia, ausculta cárdiopulmonar, abdome e neuro' },
    { key: 'hipoteses', label: 'Hipóteses Diagnósticas & Conduta', icon: '🎯', placeholder: 'Principais suspeitas clínicas diagnósticas e plano inicial sugerido' }
  ];

  // Regras inteligentes locais de extração e triagem contextual de termos médicos
  const parseLocalStructuredAnamnese = (rawText) => {
    const text = rawText.trim();
    if (!text) return null;

    const lower = text.toLowerCase();
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

    const result = {
      qp: '',
      hda: '',
      isda: '',
      antecedentes: '',
      medicamentos: '',
      exame_fisico: '',
      hipoteses: ''
    };

    const hdaParts = [];
    const antecedentesParts = [];
    const medParts = [];
    const exameParts = [];
    const hipoteseParts = [];
    const isdaParts = [];

    // Detecção de Sinais Vitais e Exame Físico
    const svRegex = /(pa\s*[:=]?\s*\d{2,3}[\/x]\d{2,3}|fc\s*[:=]?\s*\d{2,3}|fr\s*[:=]?\s*\d{1,2}|spo2\s*[:=]?\s*\d{2,3}%?|sat\s*[:=]?\s*\d{2,3}%?|temp\s*[:=]?\s*\d{2}(?:[.,]\d)?\s*°?c?|afebril|eupneico|normocorado|acv|ar\s*[:=]|murm[uú]rio|mvua|rha|abdome|glasgow)/i;

    // Detecção de Medicamentos
    const medRegex = /(losartana|enalapril|hidroclorotiazida|anlodipino|metformina|insulina|glibenclamida|glimepirida|omeprazol|pantoprazol|atorvastatina|sinvastatina|aas|clopidogrel|dipirona|paracetamol|amoxicilina|azitromicina|ceftriaxona|levofloxacino|prednisona|alenia|aerolin|salbutamol|carvedilol|atenolol|propranolol|rivaroxabana|apixabana|varfarina|sertralina|escitalopram|clonazepam|quetiapina|mg\b|mcg\b|gotas\b|comp\b|ampola\b|posologia|em uso de)/i;

    // Detecção de Comorbidades / Antecedentes
    const antRegex = /(has\b|dm\b|dm2\b|diabetes|hipertens[aã]o|tabagista|etilista|ex-tabagista|dpoc|asma|neoplasia|cirurgia|apendicectomia|colecistectomia|alergia|al[eé]rgico|nega comorbidades|m[aã]e infartou|pai hipertenso)/i;

    // Detecção de Hipóteses / Conduta
    const hipRegex = /(hd\s*[:=]|hip[oó]tese|suspeita|dx\s*[:=]|conduta|plano|solicito|prescrevo|encaminho)/i;

    // Extrair linha a linha se o texto vier em tópicos ou solto
    lines.forEach(line => {
      const lineLower = line.toLowerCase();

      if (hipRegex.test(lineLower)) {
        hipoteseParts.push(line.replace(/^(hd\s*[:=]|hip[oó]tese\s*[:=]|conduta\s*[:=]|dx\s*[:=])/i, '').trim());
      } else if (svRegex.test(lineLower)) {
        exameParts.push(line);
      } else if (medRegex.test(lineLower) && !lineLower.includes('alergia')) {
        medParts.push(line);
      } else if (antRegex.test(lineLower)) {
        antecedentesParts.push(line);
      } else if (lineLower.includes('nega dor') || lineLower.includes('nega febre') || lineLower.includes('sem queixas urinárias') || lineLower.includes('sem dispneia')) {
        isdaParts.push(line);
      } else {
        hdaParts.push(line);
      }
    });

    // QP: pega a primeira frase de queixa ou primeiro sintoma marcante
    if (hdaParts.length > 0) {
      const firstLine = hdaParts[0];
      const qpMatch = firstLine.match(/^(?:paciente\s+(?:vem|refere|com|relata)\s+)?([^\.,;]+)/i);
      result.qp = qpMatch ? qpMatch[1].trim() : firstLine;
      result.hda = hdaParts.join('. ').replace(/\.\./g, '.');
    } else {
      result.qp = text.substring(0, 60) + '...';
      result.hda = text;
    }

    result.isda = isdaParts.length ? isdaParts.join('; ') : 'Sem particularidades adicionadas no relato solto.';
    result.antecedentes = antecedentesParts.length ? antecedentesParts.join('; ') : 'Não relatados especificamente no texto solto.';
    result.medicamentos = medParts.length ? medParts.join('\n') : 'Nenhuma medicação informada.';
    result.exame_fisico = exameParts.length ? exameParts.join('; ') : 'Exame físico não detalhado no envio bruto.';
    result.hipoteses = hipoteseParts.length ? hipoteseParts.join('; ') : 'A correlacionar com a evolução clínica completa.';

    return result;
  };

  // Chamada de IA: Se tiver endpoint configurado, faz POST; senão usa processador local
  const callAIAnamneseService = async (rawNotes) => {
    const endpoint = getCustomEndpoint();
    if (endpoint) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            notes: rawNotes,
            format: 'anamnese_clinica_padrao'
          })
        });
        if (!response.ok) {
          throw new Error(`Erro na API personalizada (${response.status})`);
        }
        const data = await response.json();
        // Espera retorno com campos qp, hda, isda, antecedentes, medicamentos, exame_fisico, hipoteses
        return data;
      } catch (err) {
        console.warn('Falha no endpoint próprio de IA, aplicando fallback estruturado local:', err);
      }
    }

    // Simula pequena latência de inferência caso use o modelo integrado local
    await new Promise(resolve => setTimeout(resolve, 650));
    return parseLocalStructuredAnamnese(rawNotes);
  };

  // Renderização e inicialização da tela
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('anamnese-app-root');
    if (!root) return;

    let currentStructuredData = null;

    const showToast = (msg) => {
      const existing = document.querySelector('.toast-feedback');
      if (existing) existing.remove();
      const toast = document.createElement('div');
      toast.className = 'toast-feedback';
      toast.innerHTML = `<span>✓</span><span>${msg}</span>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2500);
    };

    const renderUI = () => {
      const customUrl = getCustomEndpoint();

      root.innerHTML = `
        <div class="anamnese-app">
          <div class="anamnese-header-bar">
            <div>
              <div class="anamnese-badge-ai">
                <span class="dot"></span>
                <span>${customUrl ? 'Conectado à IA Personalizada' : 'Motor Estruturador Local Ativo (IA Própria em Preparação)'}</span>
              </div>
            </div>
            <div style="font-size: 0.85rem; color: var(--color-text-secondary, #64748b);">
              Transforme anotações corridas, áudios transcritos ou dados soltos em anamnese padrão.
            </div>
          </div>

          <div class="anamnese-grid">
            <!-- Bloco de Entrada -->
            <section class="anamnese-card" aria-label="Notas Brutas do Paciente">
              <div class="anamnese-card-title">
                <h2>Anotações Soltas</h2>
                <small>Cole ou digite livremente</small>
              </div>

              <div class="anamnese-quick-samples">
                <span>Exemplos rápidos:</span>
                <button type="button" class="anamnese-chip-btn" id="btn-sample-emergencia">Dor torácica / PA alta</button>
                <button type="button" class="anamnese-chip-btn" id="btn-sample-ambulatorio">Retorno HAS + DM2</button>
                <button type="button" class="anamnese-chip-btn" id="btn-sample-infeccao">Febre + Tosse</button>
              </div>

              <div class="anamnese-textarea-wrap">
                <textarea 
                  id="anamnese-raw-input" 
                  class="anamnese-textarea" 
                  placeholder="Exemplo de envio solto:&#10;homem 58 anos queixa de dor no peito em aperto que começou faz 2 horas irradiando pro braço esquerdo com sudorese. hipertenso e diabético toma losartana 50 e metformina 850. nega febre ou falta de ar. pa 160/95 fc 98 spo2 97% afebril..."
                ></textarea>
              </div>

              <div class="anamnese-input-actions">
                <button type="button" class="btn-primary-ia" id="btn-organize-ai">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  <span>Organizar com IA</span>
                </button>
                <button type="button" class="btn-secondary-clean" id="btn-clear-input">
                  Limpar
                </button>
              </div>

              <details class="endpoint-config-panel">
                <summary>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
                  <span>Configurar Endpoint da sua IA própria</span>
                </summary>
                <p style="margin: 0.2rem 0; color: var(--color-text-secondary, #64748b);">
                  Insira o webhook ou URL da sua API (ex: <code>https://sua-ia.com/v1/anamnese</code>). Quando preenchido, os dados serão enviados para seu modelo.
                </p>
                <div class="endpoint-input-row">
                  <input type="url" id="custom-endpoint-url" placeholder="https://api.seuservidor.com/organizar-anamnese" value="${customUrl}">
                  <button type="button" id="btn-save-endpoint">Salvar URL</button>
                </div>
              </details>
            </section>

            <!-- Bloco de Saída Estruturada -->
            <section class="anamnese-output-card" aria-label="Anamnese Estruturada">
              <div class="anamnese-output-header">
                <div class="anamnese-card-title">
                  <h2>Anamnese Organizada</h2>
                  <small>Formato médico padrão</small>
                </div>
                <div class="anamnese-output-actions" id="output-actions-bar" style="display: none;">
                  <button type="button" class="btn-action-copy" id="btn-copy-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    <span>Copiar Prontuário Completo</span>
                  </button>
                </div>
              </div>

              <div id="anamnese-output-container">
                <div class="anamnese-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <strong>Aguardando anotações</strong>
                  <p>Insira dados soltos, áudios transcritos ou queixas no painel à esquerda e clique em <b>Organizar com IA</b>.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      `;

      attachEvents();
    };

    const attachEvents = () => {
      const rawInput = document.getElementById('anamnese-raw-input');
      const btnOrganize = document.getElementById('btn-organize-ai');
      const btnClear = document.getElementById('btn-clear-input');
      const outputContainer = document.getElementById('anamnese-output-container');
      const outputActionsBar = document.getElementById('output-actions-bar');
      const btnCopyAll = document.getElementById('btn-copy-all');
      const btnSaveEndpoint = document.getElementById('btn-save-endpoint');
      const customEndpointInput = document.getElementById('custom-endpoint-url');

      // Amostras de teste rápido
      document.getElementById('btn-sample-emergencia')?.addEventListener('click', () => {
        rawInput.value = 'M, 62a, queixa de dor torácica retroesternal em aperto iniciada há 3 horas, irradia para MSE e mandíbula, acompanhada de sudorese fria e náuseas. Nega febre, nega dispneia aos esforços prévia. HAS e DM2 há 15 anos, ex-tabagista 30 anos/maço. Em uso de losartana 50mg 1x/dia, metformina 850mg 2x/dia e sinvastatina 20mg à noite. Alergia a dipirona. Exame: PA 165/100, FC 92, FR 18, SatO2 97% ar ambiente, Temp 36.4C. ACV RCR 2T sem sopros, AP MV presente sem RA. ECG solicitado com supra em parede anterior.';
      });

      document.getElementById('btn-sample-ambulatorio')?.addEventListener('click', () => {
        rawInput.value = 'Paciente feminina 45 anos em consulta de rotina para acompanhamento de diabetes e hipertensão. Refere que está sem sintomas no momento, sem queixas urinárias ou alterações visuais. Refere dor lombar ocasional após esforço. Faz uso regular de enalapril 10mg 12/12h e hidroclorotiazida 25mg pela manhã. Glicemia de jejum recente trouxe 142. PA de hoje 130/80 mmHg, FC 74 bpm, IMC 29. Abdome flácido, indolor.';
      });

      document.getElementById('btn-sample-infeccao')?.addEventListener('click', () => {
        rawInput.value = 'Criança 6 anos mãe relata febre de 38.5 há 2 dias associada a tosse produtiva e coriza hialina. Nega vômitos ou diarreia. Boa aceitação alimentar até ontem. Sem comorbidades prévias, vacinas em dia. Em uso apenas de paracetamol se dor/febre. Exame físico: Bom estado geral, corada, hidratada, acianótica. Oroscopia hiperemiada sem exsudato. Otoscopia sem abaulamentos. Ausculta pulmonar com roncos esparsos bilaterais, sem sibilos. FR 22, Tax 37.8C.';
      });

      btnClear?.addEventListener('click', () => {
        rawInput.value = '';
        rawInput.focus();
      });

      btnSaveEndpoint?.addEventListener('click', () => {
        setCustomEndpoint(customEndpointInput.value);
        showToast('Configuração de endpoint salva!');
        renderUI();
      });

      btnOrganize?.addEventListener('click', async () => {
        const text = rawInput.value.trim();
        if (!text) {
          alert('Por favor, digite ou cole anotações soltas antes de organizar.');
          rawInput.focus();
          return;
        }

        btnOrganize.disabled = true;
        outputContainer.innerHTML = `
          <div class="anamnese-loading-box">
            <div class="anamnese-spinner"></div>
            <strong>Estruturando anamnese médica...</strong>
            <span style="font-size:0.85rem; color:var(--color-text-secondary, #64748b);">Correlacionando termos, queixas, antecedentes e exame físico.</span>
          </div>
        `;

        try {
          const structured = await callAIAnamneseService(text);
          currentStructuredData = structured;
          renderStructuredOutput(structured);
          outputActionsBar.style.display = 'flex';
          showToast('Anamnese estruturada com sucesso!');
        } catch (error) {
          console.error(error);
          outputContainer.innerHTML = `
            <div class="anamnese-placeholder" style="color: #dc2626; border-color: #fca5a5;">
              <strong>Erro ao processar anotações</strong>
              <p>${error.message || 'Ocorreu um erro no processamento com a IA.'}</p>
            </div>
          `;
        } finally {
          btnOrganize.disabled = false;
        }
      });

      btnCopyAll?.addEventListener('click', () => {
        if (!currentStructuredData) return;
        const fullText = buildFullAnamneseText(currentStructuredData);
        navigator.clipboard.writeText(fullText).then(() => {
          showToast('Anamnese copiada para a área de transferência!');
        });
      });
    };

    const renderStructuredOutput = (data) => {
      const outputContainer = document.getElementById('anamnese-output-container');
      if (!outputContainer) return;

      const html = `
        <div class="anamnese-sections">
          ${DEFAULT_SECTIONS.map(sec => {
            const val = data[sec.key] || '';
            return `
              <div class="anamnese-section-item">
                <div class="anamnese-sec-header">
                  <span class="anamnese-sec-tag">
                    <span>${sec.icon}</span>
                    <span>${sec.label}</span>
                  </span>
                </div>
                <div class="anamnese-sec-body">
                  <textarea 
                    data-section-key="${sec.key}" 
                    placeholder="${sec.placeholder}"
                    rows="2"
                  >${escapeHtml(val)}</textarea>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;

      outputContainer.innerHTML = html;

      // Manter o objeto sincronizado se o médico editar os campos
      outputContainer.querySelectorAll('textarea[data-section-key]').forEach(ta => {
        ta.addEventListener('input', (e) => {
          const key = e.target.getAttribute('data-section-key');
          if (currentStructuredData) {
            currentStructuredData[key] = e.target.value;
          }
        });
      });
    };

    const buildFullAnamneseText = (data) => {
      const lines = [];
      lines.push('--- ANAMNESE CLÍNICA ---');
      if (data.qp) lines.push(`QP: ${data.qp}`);
      if (data.hda) lines.push(`\nHDA:\n${data.hda}`);
      if (data.isda) lines.push(`\nISDA / REVISÃO DE SISTEMAS:\n${data.isda}`);
      if (data.antecedentes) lines.push(`\nANTECEDENTES PESSOAIS / FAMILIARES:\n${data.antecedentes}`);
      if (data.medicamentos) lines.push(`\nMEDICAMENTOS EM USO:\n${data.medicamentos}`);
      if (data.exame_fisico) lines.push(`\nEXAME FÍSICO & SINAIS VITAIS:\n${data.exame_fisico}`);
      if (data.hipoteses) lines.push(`\nHIPÓTESES DIAGNÓSTICAS & CONDUTA:\n${data.hipoteses}`);
      return lines.join('\n');
    };

    const escapeHtml = (str) => {
      return String(str || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    };

    renderUI();
  });
})();
