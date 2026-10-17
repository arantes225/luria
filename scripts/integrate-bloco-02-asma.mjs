import cp from 'node:child_process';
import { saveBook } from './bloco-02-utils.mjs';

const out = cp.execSync('git show origin/editorial/apostilas-lote-02-asma-20261014:apostilas/lotes/LOTE_02_INPUT_PREPUBLICACAO.json').toString();
const json = JSON.parse(out);
const asma = json.books.find(b => b.slug === 'asma-bronquica');

asma.slug = 'asma';
asma.title = 'Asma';
asma.area = 'Clínica Médica';
asma.materia = 'Pneumologia';

saveBook(asma);
