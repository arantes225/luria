import cp from 'child_process';

const keywords = [
  'endocardite',
  'aleitamento',
  'pericardite',
  'cicatrizacao',
  'alimentacao',
  'tromboembolismo',
  'crescimento',
  'regionalizacao',
  'redes',
  'pnab',
  'familia',
  'nutricao'
];

console.log('Searching git branches for keywords...');

const branches = cp.execSync('git branch -r').toString().split('\n').map(b => b.trim()).filter(Boolean);

for (const kw of keywords) {
  try {
    const log = cp.execSync(`git log --all --grep="${kw}" --oneline -n 5`).toString().trim();
    if (log) {
      console.log(`\n=== Keyword: ${kw} in commit messages ===\n${log}`);
    }
  } catch (e) {}
}

console.log('\nChecking filenames across all branches for keywords...');
try {
  const tree = cp.execSync('git log --all --name-only --format=""', { maxBuffer: 100 * 1024 * 1024 }).toString().split('\n');
  const matching = new Set();
  for (const line of tree) {
    const lower = line.toLowerCase();
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        matching.add(line);
      }
    }
  }
  console.log(`Found ${matching.size} matching files in git history:`);
  for (const m of Array.from(matching).slice(0, 30)) {
    console.log('  ', m);
  }
} catch (e) {
  console.log('Error searching filenames:', e.message);
}
