// scripts/compile-bloco-06-117.mjs
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import * as p1 from './build-bloco-06-117-part1.mjs';
import * as extra from './build-bloco-06-117-extra.mjs';
import * as extra2 from './build-bloco-06-117-extra2.mjs';
import * as p2 from './build-bloco-06-117-part2.mjs';

const book = {
  slug: 'isquemia-mesenterica',
  title: 'Isquemia Mesentérica Aguda e Crônica',
  subtitle: 'Tratado Avançado de Circulação Esplâncnica, Isquemia Mesentérica e Colite Isquêmica para Concursos e Residência Médica',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Aparelho Digestivo e Cirurgia Vascular de Emergência',
  description: 'Tratado exaustivo sobre afecções isquêmicas intestinais para provas de residência médica e ENAMED: anatomia cirúrgica da circulação esplâncnica (tronco celíaco, artéria mesentérica superior, artéria mesentérica inferior e arcadas colaterais de Riolan e Drummond, zonas de bacia hidrográfica de Griffith e Sudeck); fisiopatologia e etiopatogenia detalhada das quatro formas de isquemia mesentérica aguda: embolia da AMS (poupando jejuno proximal), trombose arterial aterosclerótica na raiz da AMS (necrose pan-intestinal), trombose venosa mesentérica associada a trombofilias e hipertensão portal, e isquemia mesentérica não oclusiva (IMNO) por vasoespasmo em choque cardiogênico/séptico; apresentação clínica cardinal com dor abdominal dilacerante desproporcional ao exame físico; biomarcadores (leucocitose com desvio, acidose metabólica com ânion gap elevado e cinética do lactato sérico); angiotomografia computadorizada multislice com contraste intravenoso como padrão-ouro absoluto (sinais de falha de enchimento, ausência de realce parietal, pneumatose intestinal e aeroportia); tratamento cirúrgico de emergência com embolectomia por cateter de Fogarty, revascularização por bypass aorto-mesentérico, critérios intraoperatórios de viabilidade de alça intestinal e o conceito salvador da laparotomia de reavaliação programada (Second-Look) em 24 a 48 horas; técnicas endovasculares avançadas (trombectomia farmacomecânica, aspiração e stents ostiais) e manejo intensivo de UTI (síndrome compartimental abdominal e monitorização de PIA); manejo e fisiopatologia da Síndrome do Intestino Curto e uso de Teduglutida; isquemia mesentérica crônica (angina abdominal pós-prandial, medo de se alimentar e emagrecimento severo com angioplastia e stent); colite isquêmica transitória e gangrenosa; casos clínicos estruturados e 6 questões comentadas alternativa por alternativa.',
  sections: [
    p1.sec1,
    p1.sec2,
    p1.sec3,
    extra.secTromboseVenosaAprofundada,
    p1.sec4,
    extra2.secEndovascularEAvancos,
    p2.sec5,
    p2.sec6,
    p2.sec7,
    p2.sec8
  ],
  references: p2.bookReferencesIsquemia
};

saveBook(book.slug, book);

// Verify useful chars with bloco-06-utils
import fs from 'fs';
import path from 'path';
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'apostilas', book.slug, 'content.json'), 'utf-8'));
let totalChars = 0;
for (const s of content.sections) {
  if (s.body_html) totalChars += countUsefulChars(s.body_html);
}
console.log(`Aula 117 compilada com sucesso! Caracteres úteis: ${totalChars} (Seções: ${content.sections.length})`);
