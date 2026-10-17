import cp from 'child_process';

const out = cp.execSync('git log --all --name-only --format=""', { maxBuffer: 100 * 1024 * 1024 }).toString();
const lines = out.split('\n');
const paths = new Set();

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed.startsWith('apostilas/')) {
    paths.add(trimmed);
  }
}

const arr = Array.from(paths).sort();
console.log(`Total apostilas files in git history across all branches: ${arr.length}`);

// Group by top-level folder inside apostilas/
const folders = new Set();
for (const p of arr) {
  const parts = p.split('/');
  if (parts.length > 1) {
    folders.add(parts[1]);
  }
}

console.log(`Total top-level directories in apostilas/: ${folders.size}`);
console.log(Array.from(folders).sort());
