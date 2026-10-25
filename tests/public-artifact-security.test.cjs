'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {isPublicFile}=require('../scripts/public-files.cjs');

test('internal question factory snapshots never ship to the public web',()=>{
  for(const path of [
    'qf-r8K2mV7qL4x9P1cF/L001-B01.json',
    'qf-other-run/tmp/questions.json',
    'marketing/metricool/config.json',
    'marketing/public/commercial/layout.json',
    'marketing/public/captures/study-rats/image.png',
    'apostilas/curadoria-imagens/data.json',
    'apostilas/curadoria-imagens-v2/admin-import-01.json',
    'apostilas/_rascunhos/draft.json',
    'apostilas/lotes/internal.json',
    '.env',
    '.tmp/private.json',
    'supabase/functions/professor-alex-gemini/index.ts',
    'docs/internal/private.json'
  ])assert.equal(isPublicFile(path),false,path);
});
test('website assets required by current public static frontend are preserved',()=>{
  for(const path of [
    'index.html',
    'admin/index.html',
    'assets/js/supabase.js',
    'assets/css/ui-app.css',
    'apostilas/asma/index.html',
    'apostilas/asma/content.json',
    'content/weekly/manifest.json',
    'content/weekly/2026-W40/questions-g1-v1.json',
    'manifest.webmanifest',
    'CNAME'
  ])assert.equal(isPublicFile(path),true,path);
});
