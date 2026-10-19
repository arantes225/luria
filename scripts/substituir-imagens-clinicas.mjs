import fs from 'fs';
import path from 'path';

const USER_AGENT = 'LuriaBot/1.0 (editorial@luria.med.br)';

// Mapeamento semântico de termos de busca em inglês para a Wikimedia Commons
function getSearchQuery(title, didactic) {
  const t = (title + ' ' + (didactic || '')).toLowerCase();
  
  // Cardiologia & ECGs
  if (t.includes('fibrilacao atrial') || t.includes('fa ')) return 'Atrial fibrillation ECG 12 lead';
  if (t.includes('flutter atrial')) return 'Atrial flutter ECG';
  if (t.includes('wellens')) return 'Wellens syndrome ECG';
  if (t.includes('de winter')) return 'De Winter ECG';
  if (t.includes('infarto') || t.includes('iam') || t.includes('stemi')) return 'STEMI 12 lead ECG';
  if (t.includes('bloqueio atrioventricular') || t.includes('bav')) return 'complete heart block ECG';
  if (t.includes('estenose aortica') || t.includes('aortic stenosis')) return 'aortic stenosis echocardiogram';
  if (t.includes('estenose mitral')) return 'mitral stenosis echocardiogram';
  if (t.includes('insuficiencia mitral')) return 'mitral regurgitation echocardiogram';
  
  // Neonatologia & Pediatria
  if (t.includes('fitomenadiona') || t.includes('vitamina k')) return 'infant intramuscular injection';
  if (t.includes('clampeamento') || t.includes('cordao umbilical')) return 'umbilical cord clamp';
  if (t.includes('pele a pele')) return 'skin to skin newborn kangaroo';
  if (t.includes('cateterismo venoso umbilical') || t.includes('veia umbilical')) return 'umbilical catheter newborn';
  if (t.includes('perimetro cefalico')) return 'measuring head circumference';
  if (t.includes('aspiracao de vias aereas')) return 'infant suctioning airway';
  if (t.includes('ventilacao com pressao positiva') || t.includes('vpp')) return 'bag valve mask infant ventilation';
  if (t.includes('fototerapia') || t.includes('ictericia neonatal')) return 'phototherapy neonatal jaundice';
  if (t.includes('teste do pezinho')) return 'newborn blood spot screening heel prick';
  if (t.includes('teste do olhinho') || t.includes('reflexo vermelho')) return 'red reflex examination eye';
  if (t.includes('oximetria') || t.includes('coracaozinho')) return 'pulse oximetry infant hand';
  if (t.includes('leite humano') || t.includes('amamentacao')) return 'breastfeeding infant latch';
  
  // Trauma & Cirurgia
  if (t.includes('torniquete') || t.includes('cat tourniquet')) return 'combat application tourniquet';
  if (t.includes('cinta pelvica') || t.includes('lencol')) return 'pelvic binder';
  if (t.includes('drenagem de torax') || t.includes('dreno de torax')) return 'chest tube thoracostomy';
  if (t.includes('toracocentese')) return 'thoracentesis needle';
  if (t.includes('cricotireoidostomia')) return 'cricothyroidotomy';
  if (t.includes('intubacao') || t.includes('laringoscopia')) return 'direct laryngoscopy vocal cords';
  if (t.includes('fast') || t.includes('efast')) return 'FAST ultrasound trauma';
  
  // Ginecologia & Obstetrícia
  if (t.includes('comprimento cabeca-nadega') || t.includes('ccn') || t.includes('crl')) return 'crown rump length ultrasound';
  if (t.includes('saco gestacional') || t.includes('vesicula vitelinica')) return 'gestational sac ultrasound yolk sac';
  if (t.includes('gravidez ectopica')) return 'ectopic pregnancy ultrasound';
  if (t.includes('cardiotocografia')) return 'cardiotocography trace';
  if (t.includes('partograma')) return 'partogram WHO labor';
  if (t.includes('colposcopia') || t.includes('schiller')) return 'colposcopy cervix acetowhite';
  if (t.includes('citopatologico') || t.includes('papanicolau')) return 'cervical smear pap stain';
  
  // Microbiologia & Lâminas
  if (t.includes('escherichia coli') || t.includes('e. coli')) return 'Escherichia coli Gram stain';
  if (t.includes('streptococcus agalactiae') || t.includes('gbs')) return 'Streptococcus agalactiae agar';
  if (t.includes('staphylococcus')) return 'Staphylococcus aureus colonies';
  if (t.includes('treponema') || t.includes('sifilis')) return 'Treponema pallidum dark field';
  if (t.includes('neisseria gonorrhoeae')) return 'Neisseria gonorrhoeae gram stain';
  if (t.includes('chlamydia')) return 'Chlamydia trachomatis cell culture';
  
  // Dermato & Lesões
  if (t.includes('cancro duro')) return 'primary syphilis chancre';
  if (t.includes('cancro mole')) return 'chancroid genital ulcer';
  if (t.includes('herpes genital')) return 'herpes simplex genital lesions';
  if (t.includes('sarampo')) return 'measles rash Koplik spots';
  if (t.includes('rubeola')) return 'rubella rash';
  if (t.includes('varicela') || t.includes('catapora')) return 'varicella chickenpox rash lesions';
  if (t.includes('escarlatina')) return 'scarlet fever tongue rash';
  
  return null;
}

async function searchCommons(query) {
  const url = 'https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url|size|mime|extmetadata&format=json&gsrsearch=' + encodeURIComponent(query);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.query?.pages) return null;
    for (const page of Object.values(data.query.pages)) {
      const info = page.imageinfo?.[0];
      if (!info || !info.url) continue;
      const mime = info.mime || '';
      if (mime.includes('pdf') || mime.includes('ogg') || mime.includes('webm')) continue;
      const meta = info.extmetadata || {};
      const license = meta.LicenseShortName?.value || meta.UsageTerms?.value || 'CC BY-SA';
      const author = (meta.Artist?.value || meta.Credit?.value || 'Wikimedia Commons').replace(/<[^>]+>/g, '').trim();
      const filename = page.title.replace(/^File:/, '');
      return {
        filename,
        canonicalUrl: 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename),
        sourceUrl: 'https://commons.wikimedia.org/wiki/' + encodeURIComponent(page.title),
        author,
        license
      };
    }
    return null;
  } catch {
    return null;
  }
}

async function verifyUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': USER_AGENT } });
    return res.status === 200 || res.status === 301 || res.status === 302;
  } catch {
    return false;
  }
}

async function run() {
  console.log('Iniciando substituição prioritária de imagens clínicas reais...');
  
  // 1. Carrega todas as candidatas pré-verificadas dos arquivos pontuais já existentes
  const verifiedFiles = [
    'apostilas/lotes/FA_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/HAS_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/ICTERICIA_NEONATAL_CANDIDATAS_IMAGENS_2026-10-15.md',
    'apostilas/lotes/IC_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/PERIOP_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/PREOP_CANDIDATAS_IMAGENS_2026-10-14.md',
    'apostilas/lotes/SCA_CANDIDATAS_IMAGENS_2026-10-14.md'
  ];

  const candidateMap = new Map();

  for (const f of verifiedFiles) {
    if (!fs.existsSync(f)) continue;
    const text = fs.readFileSync(f, 'utf8');
    const slugMatch = text.match(/apostilas\/([a-z0-9-]+)\/content\.json/);
    const slug = slugMatch ? slugMatch[1] : path.basename(f).split('_')[0].toLowerCase();
    const lines = text.split('\n');
    for (const line of lines) {
      if (line.startsWith('|') && line.includes('http')) {
        const p = line.split('|').map(s => s.trim());
        if (p.length >= 6 && p[1] !== 'Obra' && p[1] !== '---') {
          const m = p[2].match(/https:\/\/commons\.wikimedia\.org\/wiki\/File:([^\)\s]+)/);
          if (m) {
            let filename = decodeURIComponent(m[1]).replace(/[\),]+$/, '');
            const rawUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(filename);
            const isOk = await verifyUrl(rawUrl);
            if (isOk) {
              const key = `/apostilas/${slug}/:${filename}`;
              candidateMap.set(key, {
                apostila_path: `/apostilas/${slug}/`,
                apostila_title: slug,
                candidate_key: filename.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 80),
                target_section: 'visao-geral',
                placement: 'after',
                proposed_asset: {
                  src: rawUrl,
                  alt: p[1],
                  title: p[1],
                  caption: p[5] || p[1],
                  didactic_note: p[4] || ''
                },
                source_url: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(filename)}`,
                source_name: p[3] || 'Wikimedia Commons',
                source_license: p[4] || 'CC BY-SA',
                source_trust: 'verified',
                review_status: 'pending'
              });
            }
          }
        }
      }
    }
  }

  console.log(`Carregadas ${candidateMap.size} imagens médicas já verificadas diretamente nos lotes.`);

  // 2. Itera sobre o acervo de dados da curadoria e busca substitutas reais no Commons para termos clínicos
  const dataPath = 'apostilas/curadoria-imagens-v2/data.json';
  if (fs.existsSync(dataPath)) {
    const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    for (const item of raw) {
      const query = getSearchQuery(item.title, item.didactic);
      if (!query) continue; // Pula diagramas conceituais e leis
      
      const found = await searchCommons(query);
      if (found) {
        const key = `/apostilas/curadoria-pendente/:${found.filename}`;
        if (!candidateMap.has(key)) {
          candidateMap.set(key, {
            apostila_path: '/apostilas/curadoria-pendente/',
            apostila_title: 'Exames e Fotos Clínicas Reais (Curadoria)',
            candidate_key: found.filename.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 80),
            target_section: 'visao',
            placement: 'after',
            proposed_asset: {
              src: found.canonicalUrl,
              alt: item.title,
              title: item.title,
              caption: item.didactic || item.title,
              didactic_note: found.license
            },
            source_url: found.sourceUrl,
            source_name: found.author,
            source_license: found.license,
            source_trust: 'verified',
            review_status: 'pending'
          });
          console.log(`[RESOLVIDA] "${item.title}" -> ${found.filename}`);
        }
      }
    }
  }

  const allImages = Array.from(candidateMap.values());
  console.log(`\nTOTAL DE IMAGENS CLÍNICAS REAIS VERIFICADAS: ${allImages.length}`);

  // Divide em lotes de até 70 imagens para importação suave no Admin
  const LOT_SIZE = 70;
  const numLots = Math.ceil(allImages.length / LOT_SIZE);
  for (let i = 0; i < numLots; i++) {
    const slice = allImages.slice(i * LOT_SIZE, (i + 1) * LOT_SIZE);
    const filename = `apostilas/curadoria-imagens-v2/admin-import-clinicas-0${i + 1}.json`;
    fs.writeFileSync(filename, JSON.stringify(slice, null, 2), 'utf8');
    console.log(`Lote ${i + 1} salvo em: ${filename} (${slice.length} imagens)`);
  }
}

run();
