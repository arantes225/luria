const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('all sensitive tables in supabase/migrations enforce explicit Row Level Security and avoid open write policies', () => {
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  const policies = [];
  const tables = new Set();
  const rlsEnabled = new Set();

  for (const file of files) {
    const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

    // Tables created
    const tableMatches = content.matchAll(/CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+(?:public\.)?([a-zA-Z0-9_]+)/gi);
    for (const m of tableMatches) {
      tables.add(m[1].toLowerCase());
    }

    // Explicit RLS enabled
    const rlsMatches = content.matchAll(/ALTER\s+TABLE\s+(?:public\.)?([a-zA-Z0-9_]+)\s+ENABLE\s+ROW\s+LEVEL\s+SECURITY/gi);
    for (const m of rlsMatches) {
      rlsEnabled.add(m[1].toLowerCase());
    }

    // Policies created
    const policyMatches = content.matchAll(/CREATE\s+POLICY\s+["']?([^"'\n]+)["']?\s+ON\s+(?:public\.)?([a-zA-Z0-9_]+)([\s\S]*?);/gi);
    for (const m of policyMatches) {
      policies.push({
        file,
        name: m[1],
        table: m[2].toLowerCase(),
        definition: m[3].replace(/\s+/g, ' ').trim()
      });
    }
  }

  // 1. Whitelist of tables allowed to have USING (true) for SELECT
  const ALLOWED_PUBLIC_READ_TABLES = new Set([
    'traube_exam_topic_incidence',
    'question_sources',
    'question_areas',
    'question_themes',
    'question_subthemes'
  ]);

  for (const p of policies) {
    const def = p.definition.toLowerCase();
    
    // Never allow USING (true) or WITH CHECK (true) for writes (INSERT, UPDATE, DELETE, ALL)
    if (def.includes('insert') || def.includes('update') || def.includes('delete') || def.includes('for all')) {
      const openWrite = /using\s*\(\s*true\s*\)/i.test(def) || /with\s*check\s*\(\s*true\s*\)/i.test(def);
      assert.equal(openWrite, false, `Table ${p.table} has an open write policy in ${p.file}: ${p.definition}`);
    }

    // SELECT policies with USING (true) must be in the approved read-only catalog list
    if (/using\s*\(\s*true\s*\)/i.test(def) && def.includes('for select')) {
      assert.ok(
        ALLOWED_PUBLIC_READ_TABLES.has(p.table),
        `Table "${p.table}" has an unexpected USING (true) SELECT policy in ${p.file}: ${p.definition}`
      );
    }
  }

  // 2. Sensitive tables that MUST have explicit ENABLE ROW LEVEL SECURITY
  const SENSITIVE_TABLES = [
    'user_recipe_templates',
    'apostila_image_review_queue',
    'feynman_sessions',
    'agencia_posts',
    'agencia_atividade',
    'agencia_config',
    'agencia_publicacao_log',
    'agencia_instagram_conexao'
  ];

  for (const t of SENSITIVE_TABLES) {
    if (tables.has(t)) {
      assert.ok(
        rlsEnabled.has(t),
        `Sensitive table "${t}" must have explicit ALTER TABLE ... ENABLE ROW LEVEL SECURITY in migrations.`
      );
    }
  }
});

test('all SECURITY DEFINER functions in supabase/migrations enforce explicit search_path (CVE-2018-1058)', () => {
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

  const securityDefinerFns = new Map();

  for (const file of files) {
    const content = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

    // Function definitions
    const fnBlocks = content.split(/(?=CREATE(?:\s+OR\s+REPLACE)?\s+FUNCTION)/i);
    for (const block of fnBlocks) {
      if (!/^CREATE(?:\s+OR\s+REPLACE)?\s+FUNCTION/i.test(block.trim())) continue;
      const m = block.match(/FUNCTION\s+([a-zA-Z0-9_.]+)/i);
      if (!m) continue;
      const name = m[1].toLowerCase().replace(/^public\./, '');
      const isSecDef = /SECURITY\s+DEFINER/i.test(block);
      const hasSearchPath = /SET\s+search_path/i.test(block);

      if (isSecDef) {
        securityDefinerFns.set(name, hasSearchPath);
      }
    }

    // ALTER FUNCTION ... SET search_path hardening
    const alterMatches = content.matchAll(/ALTER\s+FUNCTION\s+([a-zA-Z0-9_.]+)\s*(?:\([^)]*\))?\s+SET\s+search_path/gi);
    for (const m of alterMatches) {
      const name = m[1].toLowerCase().replace(/^public\./, '');
      securityDefinerFns.set(name, true);
    }
  }

  assert.ok(securityDefinerFns.size > 0, 'Must have audited SECURITY DEFINER functions');

  const unhardened = [];
  for (const [fn, hardened] of securityDefinerFns.entries()) {
    if (!hardened) {
      unhardened.push(fn);
    }
  }

  assert.deepEqual(
    unhardened,
    [],
    `The following SECURITY DEFINER functions are missing explicit search_path (CVE-2018-1058): ${unhardened.join(', ')}`
  );
});
