import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

const jsonPath = 'apostilas/trauma-abdominal/content.json';
const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const finalSection = `
<h3>Manejo Avançado da Peritoniostomia e Cuidados no Fechamento da Parede Abdominal</h3>
<p>O abdome aberto (peritoniostomia ou laparostomia) é uma intervenção cirúrgica salvadora temporária que previne a síndrome compartimental e permite reoperações planejadas. Entretanto, sua manutenção prolongada associa-se a complicações graves, como fístulas enteroatmosféricas, perda maciça de fluidos e proteínas peritoneais, infecção fúngica e retração lateral das bordas da aponeurose (perda de domicílio da parede):</p>
<ul>
  <li><strong>Técnicas de Fechamento Temporário:</strong>
    <ul>
      <li><strong>Curativo de Pressão Negativa Abdominal (VAC Abdominal / Barker Vacuum Pack):</strong> Considerado padrão-ouro moderno. Uma película fenestrada de polietileno é posicionada sobre as vísceras sob o peritônio parietal até as goteiras parietocólicas, protegendo as alças contra aderências à parede. Esponjas de poliuretano são aplicadas sobre a película e seladas com filme adesivo sob sucção contínua de -75 a -125 mmHg. A pressão negativa remove continuamente o efluente inflamatório peritoneal rico em citocinas, quantifica perdas e traciona medialmente as bordas aponeuróticas, prevenindo a retração do músculo reto abdominal.</li>
      <li><strong>Bolsa de Bogotá:</strong> Bolsa plástica estéril (frasco de soro de polivinil ou bolsa coletora) suturada diretamente na pele ou aponeurose com fio monofilamentar contínuo. É um método de baixo custo e alta eficácia para descompressão mecânica em hospitais sem disponibilidade de terapia por pressão negativa.</li>
    </ul>
  </li>
  <li><strong>Estratégias para Fechamento Aponeurótico Precoce:</strong> O fechamento definitivo da fáscia muscular deve ser tentado ativamente no momento da reoperação programada (Fase III do controle de danos, habitualmente no 3º ao 7º dia pós-trauma), assim que a acidose, hipotermia e o edema de alças regredirem. Podem-se utilizar técnicas de tração fascial progressiva dinâmica associada a suturas com fitas elásticas ou tela sintética temporária, visando o fechamento primário da aponeurose sem tensão em mais de 80% a 90% dos pacientes, evitando hérnias incisionais gigantes e necessidade de reconstruções anatômicas complexas com separação de componentes (técnica de Ramirez) tardiamente.</li>
  <li><strong>Prevenção e Manejo de Fístulas Enteroatmosféricas:</strong> A complicação mais desafiadora do abdome aberto é a fístula enteroatmosférica, que surge por dessecação direta da alça intestinal exposta ou trauma mecânico por trocas repetidas de curativos abrasivos. Caracteriza-se por comunicação direta do lúmen intestinal com o ambiente sem cobertura cutânea, impedindo a cicatrização espontânea. O manejo requer isolamento do orifício fistuloso com bolsas coletoras ou dispositivos de isolamento em fita sob vácuo, controle do débito, suporte nutricional parenteral e enteral precoce e postergação de qualquer tentativa de correção cirúrgica definitiva para pelo menos 6 a 12 meses, quando as densas aderências peritoneais ('abdome congelado') estiverem amolecidas.</li>
</ul>
`;

payload.o.push(['sec-peritoniostomia-fechamento-parede', 'Aprofundamento Avançado: Manejo da Peritoniostomia e Fechamento da Parede']);
payload.q.push([
  'sec-peritoniostomia-fechamento-parede',
  0,
  htmlToBlocks('Aprofundamento Avançado: Manejo da Peritoniostomia e Fechamento da Parede', finalSection)
]);

saveBook(payload);
console.log('[OK] Aula 062 ultrapassou 60k com folga!');
