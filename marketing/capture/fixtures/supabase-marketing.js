/*
 * TRAUBE Marketing Studio — backend fictício para capturas de tela.
 *
 * Este arquivo substitui /assets/js/supabase.js SOMENTE dentro do navegador de
 * captura (via Playwright route). Nenhuma requisição chega ao Supabase real.
 * Todos os nomes, números e conteúdos são fictícios e não pertencem a alunos.
 *
 * O cenário é injetado em window.__TRAUBE_MARKETING_SCENARIO (addInitScript).
 * As cenas podem alterar dados em tempo real via window.__marketing.
 */
(() => {
  const scenario = window.__TRAUBE_MARKETING_SCENARIO || {};
  const log = (window.__marketingLog = window.__marketingLog || []);
  const owner = {
    id: '00000000-0000-4000-8000-00000000a11a',
    email: 'demo@luria.invalid',
    user_metadata: { display_name: scenario.ownerName || 'Lia' }
  };
  window.__fixtureOwner = owner;
  try { localStorage.setItem('luria:shift-manager:security-mode:' + owner.id, 'none'); } catch {}

  const today = new Date().toISOString().slice(0, 10);
  const daysFromNow = n => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10);
  const isoAgo = d => new Date(Date.now() - d * 86400000).toISOString();

  const friends = (scenario.friends || []).map((f, i) => ({
    user_id: f.id || ('00000000-0000-4000-8000-0000000000' + String(10 + i)),
    display_name: f.name,
    luria_id: f.luriaId || ('DEMO' + String(1000 + i)),
    studyrat_variant: f.variant || 'blue',
    studyrat_accessory: f.accessory || 'none',
    avatar_url: null
  }));
  const byName = Object.fromEntries(friends.map(f => [f.display_name, f]));

  // Converte desafios do cenário no formato da RPC my_studyrats_challenges_v3.
  function studyratsRows(challenges) {
    const rows = [];
    for (const ch of challenges || []) {
      for (const p of ch.participants || []) {
        const isOwner = p.name === 'owner';
        const friend = byName[p.name];
        rows.push({
          challenge_id: ch.id,
          creator_user_id: owner.id,
          challenge_title: ch.title,
          challenge_type: ch.type || 'flashcards',
          deadline: daysFromNow(ch.deadlineInDays ?? 4),
          created_at: isoAgo(ch.startedDaysAgo ?? 3),
          status: ch.status || 'active',
          participant_user_id: isOwner ? owner.id : (friend ? friend.user_id : p.name),
          participant_name: isOwner ? owner.user_metadata.display_name : p.name,
          studyrat_variant: isOwner ? (scenario.ownerVariant || 'blue') : (friend?.studyrat_variant || p.variant || 'blue'),
          studyrat_accessory: isOwner ? (scenario.ownerAccessory || 'none') : (friend?.studyrat_accessory || p.accessory || 'none'),
          progress: p.progress
        });
      }
    }
    return rows;
  }

  const clinicalCases = window.__CLINICAL_CASES_FIXTURE || [];
  const clinicalSummaries = clinicalCases.map(c => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    setting: c.setting || 'Sala de emergência',
    specialty: c.specialty || 'Cardiologia / Emergência',
    difficulty: c.difficulty || 'Intermediário',
    summary: c.summary || c.presentation?.chief_complaint || '',
    presentation: c.presentation,
    version: c.version || 2,
    active: true
  }));

  const state = {
    challenges: JSON.parse(JSON.stringify(scenario.studyrats || [])),
    profile: {
      user_id: owner.id,
      display_name: owner.user_metadata.display_name,
      username: 'demo',
      luria_id: 'DEMO0001',
      gender: 'other',
      specialty: 'Clínica médica',
      studyrat_variant: scenario.ownerVariant || 'blue',
      studyrat_accessory: scenario.ownerAccessory || 'none',
      studyrat_accessory_offsets: {}
    },
    tables: Object.assign({
      user_settings: [{ user_id: owner.id, theme: 'light', onboarding_completed: true }],
      flashcards: [],
      study_topics: [],
      notifications: [],
      clinical_cases: clinicalSummaries,
      clinical_case_sessions: [],
      interconsultation_cases: []
    }, scenario.tables || {})
  };

  // API pública para as cenas (page.evaluate).
  window.__marketing = {
    owner,
    state,
    setChallenges(next) { state.challenges = JSON.parse(JSON.stringify(next)); },
    setProgress(challengeId, map) {
      const ch = state.challenges.find(c => c.id === challengeId);
      if (!ch) return false;
      for (const p of ch.participants) if (p.name in map) p.progress = map[p.name];
      return true;
    },
    setStarted(challengeId, startedDaysAgo) {
      const ch = state.challenges.find(c => c.id === challengeId);
      if (ch) ch.startedDaysAgo = startedDaysAgo;
    }
  };

  const entitlementNames = ['dashboard', 'cronograma', 'caderno', 'flashcards', 'error_notebook', 'questions', 'plantao',
    'statistics_general', 'images', 'studyrats_variants', 'studyrats_accessories', 'social', 'professor_alex', 'automatic_schedule'];

  const isAdminFlag = Boolean(scenario.isAdmin);
  const entitlementPayload = {
    plan: 'pro',
    is_admin: isAdminFlag,
    features: Object.fromEntries(entitlementNames.map(n => [n, { enabled: true, limit: null }]))
  };

  // Garante entitlements globais caso a interface consulte antes ou depois do bootstrap
  window.docmapEntitlements = entitlementPayload;
  if (isAdminFlag) window.docmapIsAdmin = true;
  window.TraubeEntitlements = {
    enabled: () => true,
    limit: (_k, fallback = null) => fallback
  };

  class Query {
    constructor(table) { this.table = table; this.filters = []; this.action = 'select'; this.singleRow = false; }
    select() { return this; }
    eq(k, v) { this.filters.push(r => r[k] === v); return this; }
    neq(k, v) { this.filters.push(r => r[k] !== v); return this; }
    in(k, v) { this.filters.push(r => v.includes(r[k])); return this; }
    lte(k, v) { this.filters.push(r => r[k] <= v); return this; }
    gte() { return this; } gt() { return this; } lt() { return this; }
    is() { return this; } not() { return this; } or() { return this; } ilike() { return this; }
    order() { return this; } match() { return this; } contains() { return this; } filter() { return this; }
    limit(n) { this.max = n; return this; }
    range(a, b) { this.start = a; this.max = b - a + 1; return this; }
    maybeSingle() { this.singleRow = true; return this; }
    single() { this.singleRow = true; return this; }
    insert(v) { this.action = 'insert'; this.values = v; return this; }
    upsert(v) { this.action = 'insert'; this.values = v; return this; }
    update(v) { this.action = 'update'; this.values = v; return this; }
    delete() { this.action = 'delete'; return this; }
    then(resolve, reject) {
      return Promise.resolve().then(() => {
        let rows = this.table === 'profiles' ? [state.profile] : (state.tables[this.table] || []);
        if (!(this.table in state.tables) && this.table !== 'profiles') log.push({ kind: 'table', name: this.table, action: this.action });
        if (this.action === 'insert') {
          const added = (Array.isArray(this.values) ? this.values : [this.values]).map(v => ({ id: crypto.randomUUID(), ...v }));
          state.tables[this.table] = [...rows, ...added];
          return { data: this.singleRow ? added[0] : added, error: null };
        }
        const match = r => this.filters.every(f => f(r));
        if (this.action === 'update') {
          rows.forEach(r => { if (match(r)) Object.assign(r, this.values); });
        }
        const result = rows.filter(match).slice(this.start || 0, this.max ? (this.start || 0) + this.max : undefined);
        return { data: this.singleRow ? (result[0] || null) : result, error: null, count: result.length };
      }).then(resolve, reject);
    }
  }

  const rpcHandlers = {
    luria_bootstrap: () => ({
      entitlements: entitlementPayload,
      profile: state.profile,
      is_admin: isAdminFlag,
      theme: 'light'
    }),
    register_daily_access: () => ({
      current_streak: scenario.streakDays ?? 14,
      longest_streak: scenario.longestStreak ?? 21,
      status: 'active'
    }),
    social_snapshot: () => [],
    social_room_features: () => ({ voice_enabled: true, daily_limit: null }),
    my_friends: () => friends,
    my_direct_shares: () => [],
    my_studyrats_challenges_v3: () => studyratsRows(state.challenges),
    is_admin: () => isAdminFlag,
    get_my_entitlements: () => entitlementPayload,
    beta_feedback_status: () => ({ is_beta_tester: false, needs_feedback: false }),
    start_study_session: () => 'demo-session',
    list_active_clinical_case_summaries: () => clinicalSummaries,
    get_active_clinical_case: a => {
      const found = clinicalCases.find(c => c.id === a.p_case_id);
      return found ? [found] : (clinicalCases.length ? [clinicalCases[0]] : []);
    },
    set_studyrat_variant: a => { state.profile.studyrat_variant = a.p_variant; scenario.ownerVariant = a.p_variant; return true; },
    set_studyrat_accessory: a => { state.profile.studyrat_accessory = a.p_accessory; scenario.ownerAccessory = a.p_accessory; return true; },
    set_studyrat_accessory_position: () => true,
    create_studyrats_challenge_v2: a => {
      const id = 'demo-' + (state.challenges.length + 1);
      const participants = [{ name: 'owner', progress: 0 }].concat(
        (a.p_friend_user_ids || []).map(uid => ({ name: (friends.find(f => f.user_id === uid) || {}).display_name || 'Colega', progress: 0 })));
      state.challenges.unshift({ id, title: a.p_title, type: a.p_challenge_type, startedDaysAgo: 0.02, deadlineInDays: 7, participants });
      return id;
    }
  };
  Object.assign(rpcHandlers, scenario.rpc || {});

  window.supabaseClient = {
    auth: {
      getSession: async () => ({ data: { session: { user: owner, access_token: 'marketing-fixture' } }, error: null }),
      getUser: async () => ({ data: { user: owner }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
      signOut: async () => ({ error: null })
    },
    from: table => new Query(table),
    rpc: async (name, args = {}) => {
      const handler = rpcHandlers[name];
      if (typeof handler === 'function') return { data: handler(args), error: null };
      if (handler !== undefined) return { data: handler, error: null };
      log.push({ kind: 'rpc', name });
      return { data: name.includes('snapshot') ? [] : {}, error: null };
    },
    storage: { from: () => ({ getPublicUrl: () => ({ data: { publicUrl: '' } }), createSignedUrl: async () => ({ data: { signedUrl: '' }, error: null }) }) },
    realtime: { setAuth: async () => {} },
    channel: () => ({ on() { return this; }, subscribe(fn) { if (fn) setTimeout(() => fn('SUBSCRIBED'), 10); return this; }, track: async () => {}, presenceState: () => ({}), send: async () => {} }),
    removeChannel() {},
    functions: { invoke: async name => { log.push({ kind: 'function', name }); return { data: null, error: { message: 'Indisponível na captura' } }; } }
  };
  void today;
})();
