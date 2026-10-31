const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

test('Arquitetura de arquivos da nova seção Aplicar', () => {
  assert(fs.existsSync('aplicar/index.html'), 'aplicar/index.html deve existir');
  assert(fs.existsSync('aplicar/vocacao/index.html'), 'aplicar/vocacao/index.html deve existir');
  assert(fs.existsSync('aplicar/radar/index.html'), 'aplicar/radar/index.html deve existir');
  assert(fs.existsSync('aplicar/editais/index.html'), 'aplicar/editais/index.html deve existir');
  assert(fs.existsSync('aplicar/hall/index.html'), 'aplicar/hall/index.html deve existir');
  assert(fs.existsSync('assets/img/aplicar-editais-art.svg'), 'assets/img/aplicar-editais-art.svg deve existir');
  assert(fs.existsSync('assets/img/aplicar-vocacao-art.svg'), 'assets/img/aplicar-vocacao-art.svg deve existir');
  assert(fs.existsSync('assets/img/aplicar-radar-art.svg'), 'assets/img/aplicar-radar-art.svg deve existir');
  assert(fs.existsSync('assets/css/aplicar.css'), 'assets/css/aplicar.css deve existir');
  assert(fs.existsSync('assets/js/aplicar-nav.js'), 'assets/js/aplicar-nav.js deve existir');
  assert(fs.existsSync('assets/js/aplicar-vocacao.js'), 'assets/js/aplicar-vocacao.js deve existir');
  assert(fs.existsSync('assets/js/aplicar-radar.js'), 'assets/js/aplicar-radar.js deve existir');
  assert(fs.existsSync('supabase/migrations/20261016020000_luria_aplicar_section.sql'), 'Migração SQL deve existir');
});

test('Estrutura HTML e acessibilidade de aplicar/index.html', () => {
  const html = fs.readFileSync('aplicar/index.html', 'utf8');
  assert(html.includes('data-page="aplicar"'), 'Body deve ter data-page="aplicar"');
  assert(html.includes('class="luria-page-spotlight"'), 'Deve conter spotlight banner');
  assert(!html.includes('class="cv-nav"'), 'Início do Aplicar não deve conter navegação por abas/pills no topo');
  assert(html.includes('cv-grid-2x2'), 'Deve conter grid 2x2 de cartões');
  assert(html.includes('cv-hub'), 'Deve conter grid de cartões da central');
  assert(html.includes('href="/editais/"'), 'Deve conter link para editais');
  assert(html.includes('href="/aplicar/curriculo/"'), 'Deve conter link para currículo');
  assert(html.includes('href="/aplicar/radar/"'), 'Deve conter link para radar');
  assert(html.includes('href="/vocacao/"'), 'Deve conter link para mapa de interesses');
  assert(html.includes('Editais e provas'), 'Deve conter título do card editais');
  assert(html.includes('Currículo & Lattes'), 'Deve conter título do card currículo');
  assert(html.includes('Radar de provas'), 'Deve conter título do card radar');
  assert(html.includes('Mapa de interesses'), 'Deve conter título do card vocação');
});

test('Navegação e sidebar em app.js', () => {
  const appJs = fs.readFileSync('assets/js/app.js', 'utf8');
  assert(appJs.includes('href="/aplicar/"'), 'Sidebar deve possuir link para /aplicar/');
  assert(appJs.includes('compass:'), 'TRAUBE_ICON_PATHS deve conter ícone compass');
  assert(appJs.includes('aplicar: {'), 'PAGE_CONFIG deve conter configuração para aplicar');
});

test('Motor do módulo Vocação e metodologia de afinidade', () => {
  const vocacaoCode = fs.readFileSync('assets/js/aplicar-vocacao.js', 'utf8');
  const sandbox = {
    window: {
      addEventListener: () => {},
      dispatchEvent: () => {},
      TraubeMedicalIcons: { icon: () => '<svg></svg>' }
    },
    document: {
      readyState: 'complete',
      getElementById: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {}
    },
    localStorage: { setItem: () => {}, getItem: () => null }
  };
  vm.createContext(sandbox);
  vm.runInContext(vocacaoCode, sandbox);

  const TraubeVocacao = sandbox.window.TraubeVocacao;
  assert(TraubeVocacao, 'TraubeVocacao deve estar disponível globalmente');

  const specialties = TraubeVocacao.getSpecialties();
  assert(Array.isArray(specialties) && specialties.length >= 15, 'Deve carregar catálogo de especialidades');

  const questions = TraubeVocacao.getQuestions();
  assert.equal(questions.length, 10, 'Deve conter 10 dimensões clínicas no questionário');

  // Testar cálculo de afinidade com respostas simuladas
  const mockAnswers = {
    q1_intervention: 'opt_procedures',
    q2_tempo: 'opt_acute',
    q3_environment: 'opt_surgical_block',
    q4_patient_contact: 'opt_objective_talk',
    q5_population: 'opt_adult_elderly',
    q6_lifestyle: 'opt_dedicated_surge',
    q7_decision_making: 'opt_fast_stress',
    q8_technology: 'opt_tech_craft',
    q9_prevention_cure: 'opt_cure_now',
    q10_formation: 'opt_long_subspecialty'
  };

  const result = TraubeVocacao.calculate(mockAnswers);
  assert(result.topMatches && result.topMatches.length > 0, 'Deve retornar topMatches');
  assert(result.topMatches[0].affinityScore >= 50 && result.topMatches[0].affinityScore <= 100, 'Score deve ser percentual calibrado');
  // Para respostas estritamente cirúrgicas/agudas, Cirurgia Geral deve figurar no topo
  const topNames = result.topMatches.map(m => m.name);
  assert(topNames.includes('Cirurgia Geral') || topNames.includes('Ortopedia e Traumatologia'), 'Cirurgia ou Ortopedia deve ter alta afinidade');
});

test('Motor do módulo Radar de Provas e dados estatísticos auditáveis', () => {
  const radarCode = fs.readFileSync('assets/js/aplicar-radar.js', 'utf8');
  const sandbox = {
    window: {
      addEventListener: () => {},
      dispatchEvent: () => {},
      TraubeMedicalIcons: { icon: () => '<svg></svg>' }
    },
    document: {
      readyState: 'complete',
      getElementById: () => null,
      querySelectorAll: () => [],
      addEventListener: () => {}
    }
  };
  vm.createContext(sandbox);
  vm.runInContext(radarCode, sandbox);

  const TraubeRadar = sandbox.window.TraubeRadar;
  assert(TraubeRadar, 'TraubeRadar deve estar disponível globalmente');

  const dataset = TraubeRadar.getData();
  assert(Array.isArray(dataset) && dataset.length >= 20, 'Deve conter dataset oficial de questões auditadas');

  // Verificar consistência metodológica: taxa = (questões / total) * 100
  dataset.forEach(item => {
    const expectedRate = (item.question_count / item.total_exam_questions) * 100;
    assert(Math.abs(item.incidence_rate - expectedRate) < 0.01, `Incidência calculada para ${item.tema} deve bater com fórmula`);
    assert(['Clínica Médica', 'Cirurgia Geral', 'Pediatria', 'Ginecologia e Obstetrícia', 'Medicina Preventiva'].includes(item.area), 'Deve pertencer às 5 grandes áreas');
  });
});

test('Migração SQL Supabase possui RLS e estruturas corretas', () => {
  const sql = fs.readFileSync('supabase/migrations/20261016020000_luria_aplicar_section.sql', 'utf8');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.luria_vocational_profiles'), 'Deve criar tabela de perfis vocacionais');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.luria_exam_topic_incidence'), 'Deve criar tabela de incidência');
  assert(sql.includes('ALTER TABLE public.luria_vocational_profiles ENABLE ROW LEVEL SECURITY'), 'RLS ativo em vocational profiles');
  assert(sql.includes('ALTER TABLE public.luria_exam_topic_incidence ENABLE ROW LEVEL SECURITY'), 'RLS ativo em exam incidence');
  assert(sql.includes('auth.uid() = user_id'), 'Regra estrita de RLS do proprietário');
});
