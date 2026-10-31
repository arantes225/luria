
  function synthesizeRecipe(r) {
    const routes = [];
    const orientations = [];

    if (Array.isArray(r.treatment) && r.treatment.length) {
      r.treatment.forEach(grp => {
        const routeName = grp.regimen || grp.title || "Uso Clínico / Prescrição Direcionada";
        const items = (grp.items || []).map(itemText => {
          const parts = String(itemText).split(":");
          if (parts.length > 1) {
            return {
              drug: parts[0].trim(),
              quantity: "",
              directions: parts.slice(1).join(":").trim()
            };
          }
          return {
            drug: String(itemText).trim(),
            quantity: "",
            directions: "Conforme avaliação médica e evolução clínica"
          };
        });
        if (items.length) {
          routes.push({
            route: routeName,
            mode: "standard",
            items: items
          });
        }
      });
    }

    if (Array.isArray(r.follow_up)) {
      r.follow_up.forEach(f => {
        (f.items || []).forEach(it => orientations.push(String(it)));
      });
    }
    if (Array.isArray(r.special_situations)) {
      r.special_situations.forEach(s => {
        (s.items || []).forEach(it => orientations.push(String(it)));
      });
    }
    if (!orientations.length) {
      orientations.push("Seguir posologia com rigor de horários e completar a duração total estipulada.");
      orientations.push("Retornar imediatamente ao serviço de emergência em caso de febre persistente, dispneia súbita, dor torácica ou piora clínica.");
    }

    return {
      id: "synth-" + (r.slug || r.id),
      slug: "synth-" + (r.slug || r.id),
      title: "Receita & Prescrição Pronta — " + (r.title || "Conduta Clínica"),
      status: "verified",
      is_synthesized: true,
      data: {
        copy_ready: true,
        routes: routes.length ? routes : [
          {
            route: "Prescrição Médica",
            mode: "standard",
            items: [{ drug: r.title, quantity: "1 tratamento", directions: "Conforme protocolo clínico institucional." }]
          }
        ],
        orientations: orientations
      }
    };
  }

  function getMatchedRecipes(r, recipesBank, norm) {
    const slugs = Array.isArray(r.linked_recipe_slugs) ? r.linked_recipe_slugs : [];
    let matched = (recipesBank || []).filter(rb => 
      slugs.includes(rb.slug) || 
      norm(rb.title).includes(norm(r.title)) || 
      norm(r.title).includes(norm(rb.title))
    );
    if (!matched.length) {
      matched = [synthesizeRecipe(r)];
    }
    return matched;
  }

  function formatRecipeCleanText(rec) {
    const data = rec.data || {};
    const routes = Array.isArray(data.routes) ? data.routes : [];
    const lines = [rec.title.toUpperCase(), ""];
    routes.forEach(rt => {
      lines.push(String(rt.route || "USO").toUpperCase() + ":");
      (rt.items || []).forEach((it, i) => {
        const prefix = rt.mode === "alternatives" ? (i + 1) + "ª OPÇÃO) " : (i + 1) + ") ";
        lines.push(prefix + (it.drug || "Medicamento") + (it.quantity ? " — " + it.quantity : ""));
        if (it.directions) lines.push("   " + it.directions);
      });
      lines.push("");
    });
    if (Array.isArray(data.orientations) && data.orientations.length) {
      lines.push("ORIENTAÇÕES:");
      data.orientations.forEach(o => lines.push("- " + o));
    }
    return lines.join("\n").trim();
  }

  function renderIntegratedRecipes(r, recipesBank, norm, esc) {
    const matchedRecipes = getMatchedRecipes(r, recipesBank, norm);

    return `
      <section class="protocol-section" style="border:2px solid color-mix(in srgb,var(--theme,#184888) 35%,var(--border));background:color-mix(in srgb,var(--theme,#184888) 3%,var(--surface));box-shadow:0 4px 16px rgba(0,0,0,0.04)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
          <div>
            <h3 style="margin:0;font-size:1.1rem;display:flex;align-items:center;gap:8px;color:var(--text)">
              <span>📋</span> Receita & Prescrição Pronta
            </h3>
            <span style="font-size:12.5px;color:var(--muted)">Pronta para copiar e colar no prontuário/PEP, com posologia completa e orientações</span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="padding:4px 8px;border-radius:999px;font-size:11px;font-weight:800;background:var(--surface);border:1px solid var(--border);color:var(--theme,#184888)">
              ${matchedRecipes.length} prescriç${matchedRecipes.length > 1 ? 'ões' : 'ão'}
            </span>
          </div>
        </div>
        <div style="display:grid;gap:12px">
          ${matchedRecipes.map((rec, rIdx) => {
            const data = rec.data || {};
            const routes = Array.isArray(data.routes) ? data.routes : [];
            return `
              <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;display:grid;gap:12px">
                <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
                  <strong style="font-size:14.5px;color:var(--theme,#184888)">${esc(rec.title)}</strong>
                  <div style="display:flex;gap:6px">
                    <button type="button" class="integrated-recipe-copy-btn" data-recipe-index="${rIdx}" style="padding:8px 14px;border-radius:8px;border:1px solid var(--theme,#184888);background:color-mix(in srgb,var(--theme,#184888) 12%,var(--surface));color:var(--theme,#184888);font-size:12.5px;font-weight:800;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
                      <span>📋</span> Copiar Receita Pronta
                    </button>
                  </div>
                </div>
                ${routes.map(rt => `
                  <div style="padding:10px 12px;border-radius:8px;background:var(--surface-2);border-left:3.5px solid var(--theme,#184888);display:grid;gap:6px">
                    <span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.5px;color:var(--theme,#184888)">${esc(rt.route || 'USO')}</span>
                    ${(rt.items || []).map((it, itIdx) => `
                      <div style="font-size:13px;line-height:1.5">
                        <strong>${rt.mode === 'alternatives' ? (itIdx + 1) + 'ª OPÇÃO: ' : ''}${esc(it.drug || 'Medicamento')}</strong>
                        ${it.quantity ? ' — <span style="color:var(--muted);font-weight:600">' + esc(it.quantity) + '</span>' : ''}
                        ${it.directions ? '<p style="margin:3px 0 0;font-size:12.5px;color:var(--text)">' + esc(it.directions) + '</p>' : ''}
                      </div>
                    `).join('')}
                  </div>
                `).join('')}
                ${data.orientations && data.orientations.length ? `
                  <div style="font-size:12.5px;color:var(--text);line-height:1.45;background:var(--surface-2);padding:10px 12px;border-radius:8px">
                    <strong style="color:var(--theme,#184888);display:block;margin-bottom:4px">Orientações ao Paciente:</strong>
                    <ul style="margin:0;padding-left:18px;display:grid;gap:3px">
                      ${data.orientations.map(o => `<li>${esc(o)}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

function getProtocolCalculators(r) {
    const slug = (r.slug || '').toLowerCase();
    const title = (r.title || '').toLowerCase();
    const cat = (r.category || '').toLowerCase();
    const sections = [];

    // 1. Calculadora Universal: Posologia Pediátrica e Ajuste por Peso (mg/kg)
    sections.push(`
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px;display:grid;gap:10px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
          <strong style="font-size:13.5px;color:var(--theme,#184888);display:flex;align-items:center;gap:6px">
            <span>⚖️</span> Calculadora de Dose por Peso (mg/kg) & Posologia
          </strong>
          <span style="font-size:11px;font-weight:700;color:var(--muted)">Pediátrico & Adulto</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;align-items:end">
          <label style="display:grid;gap:4px;font-size:12px;color:var(--text)">
            <span>Peso (kg):</span>
            <input type="number" class="calc-weight-input" min="1" max="250" step="0.5" placeholder="Ex: 20" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-size:13px;width:100%">
          </label>
          <label style="display:grid;gap:4px;font-size:12px;color:var(--text)">
            <span>Dose (mg/kg):</span>
            <input type="number" class="calc-dose-input" min="0.1" max="500" step="0.1" placeholder="Ex: 15" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-size:13px;width:100%">
          </label>
          <label style="display:grid;gap:4px;font-size:12px;color:var(--text)">
            <span>Apresentação (mg/mL):</span>
            <input type="number" class="calc-conc-input" min="0.1" max="1000" step="0.1" placeholder="Ex: 50" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-size:13px;width:100%">
          </label>
          <button type="button" class="btn-calculate-dose" style="padding:8px 12px;border-radius:6px;background:var(--theme,#184888);color:#fff;border:none;font-size:12px;font-weight:700;cursor:pointer;height:34px">
            Calcular Dose
          </button>
        </div>
        <div class="calc-dose-result" style="display:none;padding:8px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888);font-size:13px;line-height:1.4"></div>
      </div>
    `);

    // 2. Calculadora de Função Renal e Ajuste de Drogas (Cockcroft-Gault)
    sections.push(`
      <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px;display:grid;gap:10px">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px">
          <strong style="font-size:13.5px;color:var(--theme,#184888);display:flex;align-items:center;gap:6px">
            <span>🧪</span> Clearance de Creatinina (Cockcroft-Gault) & Ajuste Renal
          </strong>
          <span style="font-size:11px;font-weight:700;color:var(--muted)">Ajuste Farmacológico</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));gap:8px;align-items:end">
          <label style="display:grid;gap:4px;font-size:12px;color:var(--text)">
            <span>Idade (anos):</span>
            <input type="number" class="calc-cg-age" min="18" max="120" placeholder="Ex: 65" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-size:13px;width:100%">
          </label>
          <label style="display:grid;gap:4px;font-size:12px;color:var(--text)">
            <span>Peso (kg):</span>
            <input type="number" class="calc-cg-weight" min="30" max="250" placeholder="Ex: 70" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-size:13px;width:100%">
          </label>
          <label style="display:grid;gap:4px;font-size:12px;color:var(--text)">
            <span>Creatinina (mg/dL):</span>
            <input type="number" class="calc-cg-cr" min="0.2" max="20" step="0.01" placeholder="Ex: 1.2" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-size:13px;width:100%">
          </label>
          <label style="display:grid;gap:4px;font-size:12px;color:var(--text)">
            <span>Sexo:</span>
            <select class="calc-cg-sex" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-size:13px;width:100%">
              <option value="m">Masculino</option>
              <option value="f">Feminino</option>
            </select>
          </label>
          <button type="button" class="btn-calculate-cg" style="padding:8px 12px;border-radius:6px;background:var(--theme,#184888);color:#fff;border:none;font-size:12px;font-weight:700;cursor:pointer;height:34px">
            Calcular ClCr
          </button>
        </div>
        <div class="calc-cg-result" style="display:none;padding:8px 12px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888);font-size:13px;line-height:1.4"></div>
      </div>
    `);

    // 3. Calculadoras Específicas por Protocolo
    if (slug.includes('sepse') || title.includes('sepse') || title.includes('choque')) {
      sections.push(`
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px;display:grid;gap:8px">
          <strong style="font-size:13.5px;color:var(--theme,#184888)">Ressuscitação Volêmica Inicial na Sepse (30 mL/kg)</strong>
          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <span style="font-size:12.5px">Informe o peso:</span>
            <input type="number" class="calc-sepsis-kg" min="20" max="200" placeholder="Peso em kg" style="padding:5px 8px;border-radius:6px;border:1px solid var(--border);width:110px">
            <button type="button" class="btn-calc-sepsis" style="padding:5px 12px;border-radius:6px;background:var(--theme,#184888);color:#fff;border:none;font-size:12px;font-weight:700;cursor:pointer">Calcular Volume</button>
            <span class="calc-sepsis-output" style="font-size:13px;font-weight:700;color:var(--theme,#184888)"></span>
          </div>
        </div>
      `);
    }

    if (slug.includes('fibrilacao-atrial') || title.includes('fibrilação atrial')) {
      sections.push(`
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px;display:grid;gap:8px">
          <strong style="font-size:13.5px;color:var(--theme,#184888)">CHA₂DS₂-VASc (Risco Tromboembólico na FA)</strong>
          <div style="display:grid;gap:6px;font-size:13px" class="luria-calc-inputs">
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> IC / Disfunção VE (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Hipertensão arterial (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="2" class="chads-item"> Idade ≥ 75 anos (+2)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Diabetes Mellitus (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="2" class="chads-item"> AVC / AIT / Tromboembolismo prévio (+2)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Doença vascular (IAM, DAP ou placa aórtica) (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Idade entre 65–74 anos (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="chads-item"> Sexo feminino (+1)</label>
          </div>
          <div style="margin-top:6px;padding:8px 10px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888)">
            <strong style="display:block;font-size:13px" id="chads-score-display">Pontuação: 0 pontos</strong>
            <span style="font-size:12px;color:var(--muted)" id="chads-rec-display">Escore 0 (homem) ou 1 (mulher): Anticoagulação não recomendada.</span>
          </div>
        </div>
      `);
    }

    if (slug.includes('pneumonia') || title.includes('pneumonia')) {
      sections.push(`
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px;display:grid;gap:8px">
          <strong style="font-size:13.5px;color:var(--theme,#184888)">CURB-65 (Estratificação de Gravidade na PAC)</strong>
          <div style="display:grid;gap:6px;font-size:13px" class="luria-curb-inputs">
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>C</strong> - Confusão mental aguda (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>U</strong> - Ureia sérica > 50 mg/dL (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>R</strong> - Frequência respiratória ≥ 30 irpm (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>B</strong> - PA sistólica < 90 ou diastólica ≤ 60 mmHg (+1)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="curb-item"> <strong>65</strong> - Idade ≥ 65 anos (+1)</label>
          </div>
          <div style="margin-top:6px;padding:8px 10px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888)">
            <strong style="display:block;font-size:13px" id="curb-score-display">Pontuação: 0 pontos</strong>
            <span style="font-size:12px;color:var(--muted)" id="curb-rec-display">CURB 0-1: Baixo risco. Tratamento ambulatorial seguro.</span>
          </div>
        </div>
      `);
    }

    if (slug.includes('tromboembolismo') || slug.includes('tep') || title.includes('tromboembolismo pulmonar')) {
      sections.push(`
        <div style="background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px;display:grid;gap:8px">
          <strong style="font-size:13.5px;color:var(--theme,#184888)">Escore de Wells para TEP</strong>
          <div style="display:grid;gap:6px;font-size:13px" class="luria-wells-inputs">
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="3" class="wells-item"> Sinais/sintomas clínicos de TVP (+3,0)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="3" class="wells-item"> TEP é a principal suspeita (+3,0)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1.5" class="wells-item"> FC > 100 bpm (+1,5)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1.5" class="wells-item"> Imobilização ≥ 3 dias ou cirurgia prévia (+1,5)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1.5" class="wells-item"> TVP/TEP prévio documentado (+1,5)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="wells-item"> Hemoptise (+1,0)</label>
            <label style="display:flex;align-items:center;gap:8px"><input type="checkbox" data-pts="1" class="wells-item"> Câncer ativo (+1,0)</label>
          </div>
          <div style="margin-top:6px;padding:8px 10px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888)">
            <strong style="display:block;font-size:13px" id="wells-score-display">Pontuação: 0 pontos</strong>
            <span style="font-size:12px;color:var(--muted)" id="wells-rec-display">Wells ≤ 4: TEP improvável. Solicitar D-Dímero.</span>
          </div>
        </div>
      `);
    }

    return `
      <section class="protocol-section" style="border:2px solid color-mix(in srgb,var(--theme,#184888) 35%,var(--border));background:color-mix(in srgb,var(--theme,#184888) 2.5%,var(--surface))">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <div>
            <h3 style="margin:0;font-size:1.05rem;display:flex;align-items:center;gap:8px">
              <span>🧮</span> Calculadoras de Dose, Ajuste Renal & Escores Clínicos
            </h3>
            <span style="font-size:12px;color:var(--muted)">Cálculo dinâmico imediato à beira-leito</span>
          </div>
        </div>
        <div style="display:grid;gap:12px">
          ${sections.join('')}
        </div>
      </section>
    `;
  }

  function getDischargeInstructions(r) {
    return `
      <section class="protocol-section" style="border-left: 4px solid var(--theme,#184888)">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
          <h3 style="margin:0">Orientações de Alta ao Paciente & Sinais de Alarme</h3>
          <span style="font-size:11px;font-weight:800;color:var(--theme,#184888)">Educação & Segurança</span>
        </div>
        <div style="background:var(--surface-2);padding:12px;border-radius:12px;font-size:13px;line-height:1.55" id="protocol-discharge-text">
          <p style="margin:0 0 6px"><strong>1. Cuidados domiciliares:</strong> Seguir a posologia prescrita com rigor de horários e completar a duração total estipulada mesmo que haja melhora precoce dos sintomas.</p>
          <p style="margin:0 0 6px"><strong>2. Sinais de Alarme para Retorno Imediato:</strong> Febre persistente ou refratária aos antitérmicos, falta de ar (dispneia progressiva), dor torácica súbita, sonolência excessiva ou confusão mental, incapacidade de ingerir líquidos por vômitos incoercíveis, e sangramentos não usuais.</p>
          <p style="margin:0"><strong>3. Reavaliação Programada:</strong> Retornar à unidade básica ou ambulatório de referência em 48 a 72 horas para confirmação da melhora clínica e revisão dos exames complementares solicitados.</p>
        </div>
        <div style="margin-top:8px">
          <button type="button" id="copy-discharge-btn" style="padding:6px 12px;border-radius:8px;border:1px solid var(--border);background:var(--surface);font-size:12px;font-weight:700;color:var(--text);cursor:pointer">Copiar orientações de alta para a receita 📋</button>
        </div>
      </section>
    `;
  }


(() => {
  "use strict";
  const sb = window.supabaseClient;
  const bridge = window.LuriaClinicalBridge;
  const els = {
    search: document.getElementById("protocol-search"),
    category: document.getElementById("protocol-category"),
    batch: document.getElementById("protocol-batch"),
    pagePrev: document.getElementById("protocol-page-prev"),
    pageNext: document.getElementById("protocol-page-next"),
    pageLabel: document.getElementById("protocol-page-label"),
    list: document.getElementById("protocol-list"),
    detail: document.getElementById("protocol-detail"),
    count: document.getElementById("protocol-count"),
    empty: document.getElementById("protocol-empty")
  };
  let rows = [], selected = null, recipesBank = [];

  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = (v) => String(v ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const listSection = (title, groups, cls = "") => {
    if (!Array.isArray(groups) || !groups.length) return "";
    return `<section class="protocol-section ${cls}"><h3>${esc(title)}</h3><div class="protocol-stack">${groups.map((g) => `
      <article class="protocol-card">
        ${g.title ? `<strong>${esc(g.title)}</strong>` : ""}
        ${g.regimen ? `<span class="protocol-regimen">${esc(g.regimen)}</span>` : ""}
        ${Array.isArray(g.items) ? `<ul>${g.items.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      </article>`).join("")}</div></section>`;
  };

  const renderDecisionFlow = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section"><h3>Decisão clínica</h3><div class="protocol-flow">${items.map((x, i) => `
      <article class="protocol-flow-step">
        <span class="protocol-flow-number">${i + 1}</span>
        <div><strong>SE</strong><p>${esc(x.if)}</p><b>ENTÃO</b><p>${esc(x.then)}</p></div>
      </article>`).join("")}</div></section>`;
  };

  const renderImages = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section protocol-images">
      <h3>Imagens-chave</h3>
      <div class="protocol-image-grid">${items.map((img) => `
        <figure class="protocol-image-card">
          <button type="button" class="protocol-image-open" data-image-src="${esc(luriaSafeContentUrl(img.src, {relative:true}))}" aria-label="Ampliar imagem">
            <img loading="lazy" decoding="async" src="${esc(luriaSafeContentUrl(img.src, {relative:true}))}" alt="${esc(img.alt || img.caption || "Imagem didática do protocolo")}">
          </button>
          ${img.caption ? `<figcaption><strong>${esc(img.caption)}</strong>${img.credit ? `<small>${esc(img.credit)}</small>` : ""}</figcaption>` : ""}
        </figure>`).join("")}
      </div>
    </section>`;
  };

  const renderRefs = (items) => {
    if (!Array.isArray(items) || !items.length) return "";
    return `<section class="protocol-section protocol-refs"><h3>Fontes e referências</h3><div>${items.map((r) => `<a href="${esc(luriaSafeContentUrl(r.url) || '#')}" target="_blank" rel="noopener noreferrer">${esc(r.label || "Fonte oficial")}</a>`).join("")}</div></section>`;
  };


  const PAGE_SIZE = 40;
  let page = 0, totalMatches = 0, listRequest = 0, detailRequest = 0;
  function renderList() {
    els.count.textContent = String(totalMatches) + (totalMatches === 1 ? " protocolo" : " protocolos");
    els.empty.hidden = rows.length > 0;
    els.list.innerHTML = rows.map((r) =>
      '<button type="button" class="protocol-row' + (String(selected) === String(r.id) ? ' active' : '') + '" data-id="' + esc(r.id) + '">' +
        '<span><strong>' + esc(r.title) + '</strong><small>' + esc(r.category) + ' · ' + esc(r.setting) +
        (r.cid10_primary ? ' · CID-10 ' + esc(r.cid10_primary) : '') + '</small></span>' +
        '<em class="' + (r.status === 'verified' ? 'ok' : 'warn') + '">' +
        (r.status === 'verified' ? 'Revisado' : (Array.isArray(r.tags) && r.tags.includes('conteudo-pendente') ? 'Em elaboração' : 'Em revisão')) +
        '</em></button>'
    ).join("");
    els.list.querySelectorAll("[data-id]").forEach((btn) => btn.addEventListener("click", () => openProtocol(btn.dataset.id)));
    if (els.pagePrev) els.pagePrev.disabled = page <= 0;
    if (els.pageNext) els.pageNext.disabled = (page + 1) * PAGE_SIZE >= totalMatches;
    if (els.pageLabel) els.pageLabel.textContent = totalMatches ?
      "Página " + (page + 1) + " de " + Math.ceil(totalMatches / PAGE_SIZE) : "Nenhum resultado";
  }

  async function openProtocol(idOrSlug, bySlug = false) {
    const ticket = ++detailRequest;
    selected = idOrSlug;
    renderList();
    els.detail.innerHTML = '<div class="protocol-placeholder">Carregando a ficha selecionada…</div>';
    if (!sb) {
      const local = rows.find((x) => String(x.id) === String(idOrSlug) || x.slug === idOrSlug);
      if (local) renderDetail(local);
      else els.detail.textContent = "Protocolo não disponível.";
      return;
    }
    try {
      let request = sb.from("clinical_protocols").select("*");
      request = bySlug ? request.eq("slug", idOrSlug) : request.eq("id", idOrSlug);
      const result = await request.single();
      if (ticket !== detailRequest) return;
      if (result.error || !result.data) throw result.error || Error("Ficha não localizada");
      const data = result.data;
      selected = data.id;
      recipesBank = [];
      const linked = Array.isArray(data.linked_recipe_slugs) ? data.linked_recipe_slugs.filter(Boolean) : [];
      if (data.status === "verified" && linked.length) {
        const recipes = await sb.from("recipe_bank").select("*").in("slug", linked);
        if (ticket !== detailRequest) return;
        if (!recipes.error) recipesBank = recipes.data || [];
      }
      renderDetail(data);
      renderList();
      if (typeof matchMedia === "function" && matchMedia("(max-width:900px)").matches) els.detail.scrollIntoView({behavior:"smooth",block:"start"});
    } catch (err) {
      if (ticket !== detailRequest) return;
      console.error("[Traube] Falha ao abrir ficha", err);
      els.detail.innerHTML = '<div class="protocol-placeholder">Não foi possível carregar esta ficha. Tente novamente.</div>';
    }
  }

  async function loadPage(reset = false) {
    if (reset) page = 0;
    const ticket = ++listRequest;
    selected = null;
    ++detailRequest;
    els.detail.innerHTML = '<div class="protocol-placeholder">Clique em um protocolo para consultar sua ficha.</div>';
    els.list.innerHTML = '<div class="protocol-placeholder">Consultando títulos…</div>';
    if (!sb) {
      const local = Array.isArray(window.LURIA_PROTOCOL_SEEDS) ? window.LURIA_PROTOCOL_SEEDS : [];
      const queryText = norm(els.search?.value);
      const result = local.filter((r) => (!els.category.value || r.category === els.category.value) &&
        (!els.batch?.value || (r.tags || []).includes(els.batch.value)) &&
        (!queryText || norm((r.title || "") + " " + (r.cid10_primary || "")).includes(queryText)));
      totalMatches = result.length;
      rows = result.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
      renderList();
      return;
    }
    try {
      let req = sb.from("clinical_protocols").select("id,slug,title,category,setting,status,tags,cid10_primary,cid10_description", {count:"exact"});
      const cat = els.category?.value || "", batch = els.batch?.value || "";
      const q = (els.search?.value || "").trim().replace(/[,()*%\\]/g," ").slice(0,90).trim();
      if (cat) req = req.eq("category", cat);
      if (batch) req = req.contains("tags", [batch]);
      if (q) req = req.or("title.ilike.%" + q + "%,cid10_primary.ilike.%" + q + "%,cid10_description.ilike.%" + q + "%");
      const result = await req.order("title", {ascending:true}).range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      if (ticket !== listRequest) return;
      if (result.error) throw result.error;
      rows = result.data || [];
      totalMatches = result.count ?? rows.length;
      renderList();
    } catch (err) {
      if (ticket !== listRequest) return;
      console.error("[Traube] Falha na listagem paginada",err);
      rows = [];
      els.list.innerHTML = '<div class="protocol-placeholder">Falha ao consultar o catálogo. Verifique sua conexão.</div>';
      els.count.textContent = "—";
    }
  }

  function protocolText(r) {
    const lines = [r.title.toUpperCase(), "", r.summary || "", ""];
    const pushGroups = (label, groups) => {
      if (!Array.isArray(groups) || !groups.length) return;
      lines.push(label.toUpperCase() + ":");
      groups.forEach((g) => {
        if (g.title) lines.push(g.title);
        if (g.regimen) lines.push("Esquema: " + g.regimen);
        (g.items || []).forEach((x) => lines.push("- " + x));
      });
      lines.push("");
    };
    pushGroups("Quando suspeitar", r.suspicion);
    pushGroups("Primeira conduta", r.initial_actions);
    pushGroups("Exames", r.exams);
    if (Array.isArray(r.decision_flow) && r.decision_flow.length) {
      lines.push("FLUXO DE DECISÃO:");
      r.decision_flow.forEach((x) => lines.push("- SE " + x.if + " → " + x.then));
      lines.push("");
    }
    pushGroups("Tratamento", r.treatment);
    pushGroups("Situações especiais", r.special_situations);
    pushGroups("Seguimento", r.follow_up);
    if (Array.isArray(r.red_flags) && r.red_flags.length) {
      lines.push("SINAIS DE ALARME:");
      r.red_flags.forEach((x) => lines.push("- " + x));
    }
    return lines.join("\n").trim();
  }

  function renderDetail(r) {
    if (!r) { els.detail.innerHTML = '<div class="protocol-placeholder">Selecione um protocolo.</div>'; return; }
    // Conteudos apenas catalogados ainda nao sao protocolos clinicos: sem prescricao, alta ou copia.
    if (Array.isArray(r.tags) && r.tags.includes("conteudo-pendente")) {
      els.detail.innerHTML = `
        <header class="protocol-detail-head">
          <div>
            <div class="protocol-chips"><span>${esc(r.category)}</span><span>${esc(r.setting)}</span><span class="warn">Em elaboração</span></div>
            <h2>${esc(r.title)}</h2>
          ${r.cid10_primary ? `<p><strong>CID-10:</strong> ${esc(r.cid10_primary)} · ${esc(r.cid10_description || "")}${r.cid10_mapping_status !== "validated" ? " · Código sujeito à revisão" : ""}</p>` : ""}
            <p>${esc(r.summary || "")}</p>
          </div>
        </header>
        <section class="protocol-section">
          <h3>Conteúdo clínico ainda não disponível</h3>
          <p>Este tema foi adicionado ao catálogo para futura elaboração. Diagnóstico, exames, tratamentos, doses, contraindicações e referências precisam de redação e revisão clínica independente. Não utilize esta ficha para prescrever, dar alta ou tomar decisões assistenciais.</p>
        </section>
      `;
      return;
    }
    // Rascunhos clinicos: leitura restrita a secoes editoriais, sem receita, orientacao
    // de alta generica, calculadoras ou exportacao para prontuario.
    if (Array.isArray(r.tags) && r.tags.includes("rascunho-clinico")) {
      els.detail.innerHTML = `
        <header class="protocol-detail-head"><div>
          <div class="protocol-chips"><span>${esc(r.category)}</span><span>${esc(r.setting)}</span><span class="warn">Rascunho clínico — em revisão</span></div>
          <h2>${esc(r.title)}</h2>
          ${r.cid10_primary ? `<p><strong>CID-10:</strong> ${esc(r.cid10_primary)} · ${esc(r.cid10_description || "")}${r.cid10_mapping_status !== "validated" ? " · Código sujeito à revisão" : ""}</p>` : ""}
          <p>${esc(r.summary || "")}</p>
        </div></header>
        <section class="protocol-section danger">
          <h3>Atenção: conteúdo em revisão</h3>
          <p>Ficha de estudo inicial, não validada para assistência, prescrição ou tomada de decisão clínica. Confirmar condutas, contraindicações, doses e fontes específicas antes de uso. Revisão por profissional habilitado pendente.</p>
        </section>
        ${listSection("Quando suspeitar", r.suspicion)}
        ${listSection("Conduta inicial", r.initial_actions)}
        ${listSection("Exames dirigidos", r.exams)}
        ${renderDecisionFlow(r.decision_flow)}
        ${listSection("Tratamento — orientação preliminar", r.treatment, "treatment")}
        ${listSection("Situações especiais e contraindicações", r.special_situations)}
        ${listSection("Monitorização e seguimento", r.follow_up)}
        ${Array.isArray(r.red_flags) && r.red_flags.length ? `<section class="protocol-section danger"><h3>Sinais de alarme</h3><ul>${r.red_flags.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
        ${Array.isArray(r.source_refs) && r.source_refs.length ? renderRefs(r.source_refs) : '<section class="protocol-section protocol-refs"><h3>Fontes e referências</h3><p>Referências individuais ainda não conferidas; não considerar esta ficha pronta.</p></section>'}
      `;
      return;
    }
    const drugs = Array.isArray(r.linked_drug_terms) ? r.linked_drug_terms : [];
    const recipes = Array.isArray(r.linked_recipe_slugs) ? r.linked_recipe_slugs : [];
    els.detail.innerHTML = `
      <header class="protocol-detail-head">
        <div>
          <div class="protocol-chips"><span>${esc(r.category)}</span><span>${esc(r.setting)}</span><span class="${r.status === "verified" ? "ok" : "warn"}">${r.status === "verified" ? "Revisado" : "Em revisão"}</span></div>
          <h2>${esc(r.title)}</h2>
          ${r.cid10_primary ? `<p><strong>CID-10:</strong> ${esc(r.cid10_primary)} · ${esc(r.cid10_description || "")}${r.cid10_mapping_status !== "validated" ? " · Código sujeito à revisão" : ""}</p>` : ""}
          <p>${esc(r.summary || "")}</p>
        </div>
        <div class="protocol-actions">
          <button type="button" data-copy-main-recipe style="background:var(--theme,#184888);color:#fff;font-weight:700">📋 Copiar Receita Pronta</button>
          ${recipes.length ? `<button type="button" class="secondary" data-open-recipe>Ver no Banco</button>` : ""}
          <button type="button" class="secondary" data-send-note>Enviar à Cola Rápida</button>
        </div>
      </header>
      ${renderIntegratedRecipes(r, recipesBank, norm, esc)}
      ${listSection("Quando suspeitar", r.suspicion)}
      ${listSection("Primeira conduta", r.initial_actions)}
      ${listSection("Exames iniciais", r.exams)}
      ${renderImages(r.image_assets)}
      ${renderDecisionFlow(r.decision_flow)}
      ${listSection("Tratamento complementar", r.treatment, "treatment")}
      ${getProtocolCalculators(r)}
      ${getDischargeInstructions(r)}
      ${drugs.length ? `
        <section class="protocol-section" style="border-left:4px solid var(--theme,#184888)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px">
            <h3 style="margin:0;display:flex;align-items:center;gap:6px"><span>💊</span> Medicamentos Relacionados & Dados Farmacológicos</h3>
            <span style="font-size:11px;font-weight:700;color:var(--muted)">Clique para abrir ficha técnica com posologia, diluição e contraindicação</span>
          </div>
          <div class="protocol-drugs" style="display:flex;flex-wrap:wrap;gap:8px">
            ${drugs.map((d) => `
              <div style="display:inline-flex;border-radius:8px;border:1px solid var(--border);background:var(--surface);overflow:hidden">
                <button type="button" data-quick-drug="${esc(d)}" style="padding:6px 10px;background:none;border:none;font-size:12.5px;font-weight:700;color:var(--theme,#184888);cursor:pointer;display:flex;align-items:center;gap:4px">
                  <span>ℹ️</span> ${esc(d)}
                </button>
                <button type="button" data-drug="${esc(d)}" title="Ver no Bulário LURIA" style="padding:6px 8px;border:none;border-left:1px solid var(--border);background:var(--surface-2);font-size:11px;color:var(--muted);cursor:pointer">
                  ↗
                </button>
              </div>
            `).join("")}
          </div>
        </section>
      ` : ""}
      ${listSection("Profilaxia & Prevenção Secundária", r.prophylaxis, "prophylaxis")}
      ${listSection("Situações especiais", r.special_situations)}
      ${listSection("Acompanhamento", r.follow_up)}
      ${Array.isArray(r.red_flags) && r.red_flags.length ? `<section class="protocol-section danger"><h3>Quando encaminhar / internar / reavaliar com urgência</h3><ul>${r.red_flags.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
      ${r.notification?.text ? `<section class="protocol-section notification"><h3>Notificação</h3><p>${esc(r.notification.text)}</p></section>` : ""}
      ${renderRefs(r.source_refs)}
    `;

    els.detail.querySelectorAll("[data-image-src]").forEach((b) => b.addEventListener("click", () => {
      const src = b.dataset.imageSrc;
      const dialog = document.createElement("dialog");
      dialog.className = "protocol-image-dialog";
      dialog.innerHTML = `<button type="button" aria-label="Fechar">×</button><img src="${esc(src)}" alt="Imagem ampliada do protocolo">`;
      document.body.appendChild(dialog);
      dialog.querySelector("button")?.addEventListener("click", () => dialog.close());
      dialog.addEventListener("click", (ev) => { if (ev.target === dialog) dialog.close(); });
      dialog.addEventListener("close", () => dialog.remove());
      dialog.showModal();
    }));
    
    // Listener do CHA2DS2-VASc
    const chadsBoxes = els.detail.querySelectorAll('.chads-item');
    if (chadsBoxes.length) {
      const updateChads = () => {
        let pts = 0;
        chadsBoxes.forEach(b => { if (b.checked) pts += Number(b.dataset.pts); });
        const disp = els.detail.querySelector('#chads-score-display');
        const rec = els.detail.querySelector('#chads-rec-display');
        if (disp) disp.textContent = 'Pontuação: ' + pts + ' ponto' + (pts === 1 ? '' : 's');
        if (rec) {
          if (pts === 0) rec.textContent = 'Escore 0: Baixo risco. Anticoagulação oral não recomendada.';
          else if (pts === 1) rec.textContent = 'Escore 1: Risco intermediário. Considerar anticoagulação oral individualizada (preferir DOAC).';
          else rec.textContent = 'Escore ≥ 2: Alto risco de AVC embólico. Anticoagulação oral formalmente recomendada (DOAC de preferência ou Varfarina com INR 2-3).';
        }
      };
      chadsBoxes.forEach(b => b.addEventListener('change', updateChads));
    }

    // Listener do CURB-65
    const curbBoxes = els.detail.querySelectorAll('.curb-item');
    if (curbBoxes.length) {
      const updateCurb = () => {
        let pts = 0;
        curbBoxes.forEach(b => { if (b.checked) pts += Number(b.dataset.pts); });
        const disp = els.detail.querySelector('#curb-score-display');
        const rec = els.detail.querySelector('#curb-rec-display');
        if (disp) disp.textContent = 'Pontuação: ' + pts + ' ponto' + (pts === 1 ? '' : 's');
        if (rec) {
          if (pts <= 1) rec.textContent = 'CURB 0-1: Baixo risco. Manejo ambulatorial seguro (Amoxicilina ou Macrolídeo).';
          else if (pts === 2) rec.textContent = 'CURB 2: Risco moderado. Considerar internação em enfermaria ou observação estrita.';
          else rec.textContent = 'CURB ≥ 3: Pneumonia grave. Internação hospitalar obrigatória; avaliar critérios para UTI imediata se CURB 4-5.';
        }
      };
      curbBoxes.forEach(b => b.addEventListener('change', updateCurb));
    }

    // Listener da Calculadora de mg/kg
    els.detail.querySelector('.btn-calculate-dose')?.addEventListener('click', () => {
      const w = Number(els.detail.querySelector('.calc-weight-input')?.value);
      const doseMg = Number(els.detail.querySelector('.calc-dose-input')?.value);
      const conc = Number(els.detail.querySelector('.calc-conc-input')?.value);
      const out = els.detail.querySelector('.calc-dose-result');
      if (!w || !doseMg || w <= 0 || doseMg <= 0) {
        if (out) { out.style.display = 'block'; out.innerHTML = '<strong>Atenção:</strong> Preencha peso e dose/kg válidos.'; }
        return;
      }
      const totalMg = (w * doseMg).toFixed(1);
      let html = '<strong>Dose Total Calculada:</strong> ' + totalMg + ' mg por dose (' + doseMg + ' mg/kg × ' + w + ' kg).';
      if (conc && conc > 0) {
        const totalMl = (totalMg / conc).toFixed(2);
        html += '<br><strong>Volume a Administrar:</strong> ' + totalMl + ' mL (na concentração de ' + conc + ' mg/mL).';
      }
      if (out) { out.style.display = 'block'; out.innerHTML = html; }
    });

    // Listener da Calculadora Cockcroft-Gault
    els.detail.querySelector('.btn-calculate-cg')?.addEventListener('click', () => {
      const age = Number(els.detail.querySelector('.calc-cg-age')?.value);
      const w = Number(els.detail.querySelector('.calc-cg-weight')?.value);
      const cr = Number(els.detail.querySelector('.calc-cg-cr')?.value);
      const sex = els.detail.querySelector('.calc-cg-sex')?.value;
      const out = els.detail.querySelector('.calc-cg-result');
      if (!age || !w || !cr || cr <= 0) {
        if (out) { out.style.display = 'block'; out.innerHTML = '<strong>Atenção:</strong> Preencha idade, peso e creatinina válidos.'; }
        return;
      }
      let clcr = ((140 - age) * w) / (72 * cr);
      if (sex === 'f') clcr *= 0.85;
      const val = clcr.toFixed(1);
      let faixa = '';
      if (clcr >= 90) faixa = 'Função renal normal (ClCr ≥ 90 mL/min). Em geral, não requer redução posológica.';
      else if (clcr >= 60) faixa = 'Disfunção leve (ClCr 60–89 mL/min). Checar bulário para fármacos de margem estreita.';
      else if (clcr >= 30) faixa = 'Disfunção moderada (ClCr 30–59 mL/min). Ajuste de intervalo ou dose necessário para a maioria dos antimicrobianos.';
      else if (clcr >= 15) faixa = 'Disfunção grave (ClCr 15–29 mL/min). Redução importante de dose obrigatória e monitorar toxicidade.';
      else faixa = 'Insuficiência renal terminal / dialítica (ClCr < 15 mL/min). Dose pós-hemodiálise indicada para fármacos dialisáveis.';
      
      if (out) {
        out.style.display = 'block';
        out.innerHTML = '<strong>Clearance Estimado: ' + val + ' mL/min</strong><br><span style="color:var(--text)">' + faixa + '</span>';
      }
    });

    // Listener de volume na sepse
    els.detail.querySelector('.btn-calc-sepsis')?.addEventListener('click', () => {
      const kg = Number(els.detail.querySelector('.calc-sepsis-kg')?.value);
      const out = els.detail.querySelector('.calc-sepsis-output');
      if (kg && kg > 0) {
        const vol = (kg * 30).toLocaleString('pt-BR');
        if (out) out.textContent = 'Volume total: ' + vol + ' mL de cristaloide balanceado (Ringer Lactato) nas primeiras 3 horas.';
      }
    });

    // Listener do Modal de Detalhes Rápidos do Medicamento
    els.detail.querySelectorAll('[data-quick-drug]').forEach(btn => {
      btn.addEventListener('click', () => {
        const term = btn.dataset.quickDrug;
        const bSeeds = Array.isArray(window.LURIA_BULARIO_SEEDS) ? window.LURIA_BULARIO_SEEDS : [];
        const normStr = (v) => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
        const q = normStr(term);
        const drug = bSeeds.find(d => {
          const dn = normStr(d.name);
          const da = normStr(d.active_ingredient);
          return dn.includes(q) || da.includes(q) || q.includes(da) || (d.data?.products || []).some(p => normStr(p.name).includes(q));
        });

        const dialog = document.createElement('dialog');
        dialog.className = 'protocol-drug-dialog';
        dialog.style.cssText = 'max-width:640px;width:90%;border:1px solid var(--border);border-radius:16px;padding:20px;background:var(--surface);box-shadow:0 12px 36px rgba(0,0,0,0.25);color:var(--text);';
        
        if (drug) {
          const dt = drug.data || {};
          const f = (dt.formulations || [])[0] || {};
          dialog.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:12px;border-bottom:1px solid var(--border);padding-bottom:10px">
              <div>
                <h3 style="margin:0;font-size:1.15rem;color:var(--theme,#184888)">${esc(drug.name)}</h3>
                <small style="color:var(--muted)">${esc(drug.therapeutic_class || dt.therapeutic_class || '')}</small>
              </div>
              <button type="button" class="btn-close-drug-dialog" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-weight:700;cursor:pointer">✕</button>
            </div>
            <div style="display:grid;gap:10px;font-size:13px;max-height:60vh;overflow-y:auto;padding-right:6px">
              <div><strong>Indicação Clínica:</strong> ${esc(dt.indication || 'Uso conforme protocolo.')}</div>
              ${f.dose_text ? `<div style="padding:8px 10px;border-radius:8px;background:var(--surface-2);border-left:3px solid var(--theme,#184888)"><strong>Posologia Habitual:</strong> ${esc(f.dose_text)}</div>` : ''}
              ${dt.contraindications && dt.contraindications.length ? `<div style="color:var(--danger,#b91c1c)"><strong>Contraindicações:</strong> ${dt.contraindications.map(c => esc(c)).join('; ')}</div>` : ''}
              ${dt.renal_adjustment ? `<div><strong>Ajuste Renal:</strong> ${esc(dt.renal_adjustment)}</div>` : ''}
              ${dt.hepatic_adjustment ? `<div><strong>Ajuste Hepático:</strong> ${esc(dt.hepatic_adjustment)}</div>` : ''}
              ${dt.pregnancy_category ? `<div><strong>Gestação:</strong> ${esc(dt.pregnancy_category)} ${dt.pregnancy_text ? '— ' + esc(dt.pregnancy_text) : ''}</div>` : ''}
              ${dt.compatible_diluents ? `<div><strong>Diluição & Compatibilidade:</strong> ${esc(dt.compatible_diluents)}</div>` : ''}
              ${dt.antidote && dt.antidote.length ? `<div style="padding:6px 10px;border-radius:6px;background:color-mix(in srgb,var(--theme,#184888) 8%,var(--surface))"><strong>Antídoto / Extravasamento:</strong> ${dt.antidote.map(a => esc(a)).join(' ')}</div>` : ''}
            </div>
            <div style="margin-top:14px;display:flex;justify-content:flex-end;gap:8px;border-top:1px solid var(--border);padding-top:10px">
              <button type="button" class="btn-goto-bulario" style="padding:6px 12px;border-radius:8px;border:1px solid var(--theme,#184888);background:var(--theme,#184888);color:#fff;font-weight:700;cursor:pointer">Ver ficha completa no Bulário ↗</button>
            </div>
          `;
        } else {
          dialog.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
              <h3 style="margin:0;font-size:1.1rem;color:var(--theme,#184888)">${esc(term)}</h3>
              <button type="button" class="btn-close-drug-dialog" style="padding:4px 8px;border-radius:6px;border:1px solid var(--border);background:var(--surface-2);font-weight:700;cursor:pointer">✕</button>
            </div>
            <p style="font-size:13px;color:var(--muted)">Medicamento referenciado no protocolo clínico institucional. Consulte o bulário para a bula completa.</p>
            <div style="margin-top:14px;display:flex;justify-content:flex-end">
              <button type="button" class="btn-goto-bulario" style="padding:6px 12px;border-radius:8px;border:1px solid var(--theme,#184888);background:var(--theme,#184888);color:#fff;font-weight:700;cursor:pointer">Pesquisar no Bulário ↗</button>
            </div>
          `;
        }
        
        document.body.appendChild(dialog);
        dialog.querySelector('.btn-close-drug-dialog')?.addEventListener('click', () => dialog.close());
        dialog.querySelector('.btn-goto-bulario')?.addEventListener('click', () => {
          dialog.close();
          bridge?.openDrug(term);
        });
        dialog.addEventListener('click', (ev) => { if (ev.target === dialog) dialog.close(); });
        dialog.addEventListener('close', () => dialog.remove());
        dialog.showModal();
      });
    });

    // Listener do Wells TEP
    const wellsBoxes = els.detail.querySelectorAll('.wells-item');
    if (wellsBoxes.length) {
      const updateWells = () => {
        let pts = 0;
        wellsBoxes.forEach(b => { if (b.checked) pts += Number(b.dataset.pts); });
        const disp = els.detail.querySelector('#wells-score-display');
        const rec = els.detail.querySelector('#wells-rec-display');
        if (disp) disp.textContent = 'Pontuação: ' + pts.toFixed(1) + ' pontos';
        if (rec) {
          if (pts <= 4) rec.textContent = 'Wells ≤ 4 pontos: TEP improvável. Solicitar D-Dímero de alta sensibilidade; se negativo descarta TEP.';
          else rec.textContent = 'Wells > 4 pontos: TEP provável (alta suspeita). Indicar Angio-TC de tórax imediata e considerar anticoagulação plena empírica se não houver sangramento.';
        }
      };
      wellsBoxes.forEach(b => b.addEventListener('change', updateWells));
    }

    // Copiar orientações de alta
    els.detail.querySelector('#copy-discharge-btn')?.addEventListener('click', (e) => {
      const txt = els.detail.querySelector('#protocol-discharge-text')?.innerText || '';
      navigator.clipboard?.writeText(txt).then(() => {
        const btn = e.currentTarget;
        const old = btn.textContent;
        btn.textContent = 'Orientações copiadas! ✓';
        setTimeout(() => { btn.textContent = old; }, 1500);
      });
    });

    
    // Listener de cópia da receita integrada
    els.detail.querySelectorAll('.integrated-recipe-copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.recipeIndex);
        const matched = getMatchedRecipes(r, recipesBank, norm);
        const targetRec = matched[idx];
        if (!targetRec) return;

        const fullTxt = formatRecipeCleanText(targetRec);
        navigator.clipboard?.writeText(fullTxt).then(() => {
          const oldTxt = btn.innerHTML;
          btn.innerHTML = "<span>✓</span> Receita Copiada!";
          setTimeout(() => { btn.innerHTML = oldTxt; }, 1800);
        });
      });
    });

    // Listener para o botão de ação rápida do cabeçalho
    els.detail.querySelector('[data-copy-main-recipe]')?.addEventListener('click', () => {
      const matched = getMatchedRecipes(r, recipesBank, norm);
      if (!matched.length) return;
      const fullTxt = formatRecipeCleanText(matched[0]);
      navigator.clipboard?.writeText(fullTxt).then(() => {
        const topBtn = els.detail.querySelector('[data-copy-main-recipe]');
        if (topBtn) {
          const oldText = topBtn.innerHTML;
          topBtn.innerHTML = "<span>✓</span> Copiado!";
          setTimeout(() => { topBtn.innerHTML = oldText; }, 1800);
        }
      });
    });
els.detail.querySelectorAll("[data-drug]").forEach((b) => b.addEventListener("click", () => bridge?.openDrug(b.dataset.drug)));
    els.detail.querySelector("[data-open-recipe]")?.addEventListener("click", () => bridge?.openRecipe(recipes[0]));
    els.detail.querySelector("[data-send-note]")?.addEventListener("click", () => bridge?.toQuickChart({
      type:"protocol", slug:r.slug, title:r.title, text:protocolText(r), source:"Protocolos LURIA"
    }));
  }


  async function load() {
    const cats = ["Clínica Médica","APH / Emergência","Pediatria","Ginecologia e Obstetrícia","Cirurgia Geral",
      "Infectologia","Infectologia / Pneumologia","Procedimentos / Protocolos Transversais","Dermatologia","Psiquiatria"];
    els.category.innerHTML = '<option value="">Todas as áreas</option>' + cats.sort((a,b)=>a.localeCompare(b,"pt-BR"))
      .map(c=>'<option value="' + esc(c) + '">' + esc(c) + '</option>').join("");
    if (els.batch) {
      const labels = [
        ["bloco-01-de-04","Bloco 1 · Emergência, cardio, pneumologia"],
        ["bloco-02-de-04","Bloco 2 · Gastro, nefro, neurologia"],
        ["bloco-03-de-04","Bloco 3 · Infectologia, pediatria"],
        ["bloco-04-de-04","Bloco 4 · GO, cirurgia, atenção primária"],
        ["expansao-1700-20261031","Expansão CID-10 · 1.080 temas em elaboração"]
      ];
      els.batch.innerHTML = '<option value="">Todos os blocos</option>' +
        labels.map(pair => '<option value="' + esc(pair[0]) + '">' + esc(pair[1]) + '</option>').join("");
    }
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) els.search.value = q;
    await loadPage(true);
    const wanted = params.get("protocol");
    if (wanted) await openProtocol(wanted,true);
  }

  let searchDebounce;
  els.search?.addEventListener("input", () => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => loadPage(true), 240);
  });
  [els.category,els.batch].forEach(el=>el?.addEventListener("change", () => loadPage(true)));
  els.pagePrev?.addEventListener("click", () => { if (page > 0) {page--;loadPage();} });
  els.pageNext?.addEventListener("click", () => { if ((page + 1) * PAGE_SIZE < totalMatches) {page++;loadPage();} });
  load();
})();
