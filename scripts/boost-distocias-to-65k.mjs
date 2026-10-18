import fs from 'fs';

let content = fs.readFileSync('build-scripts/build-distocias.mjs', 'utf8');

const boostSections = `
    [
      'estudo-comparativo-tipos-forcipe-detalhado',
      0,
      [
        ['2', 'Comparativo Extensivo dos Modelos de Fórcipe: Mecânica, Anatomia e Riscos'],
        ['p', 'A correta seleção do modelo de fórcipe obstétrico é imperativa para evitar desfechos traumáticos fetais e maternos. O conhecimento das características anatômicas das colheres, hastes e articulações define a sua aplicação precisa.'],
        ['3', 'Anatomia Comparativa das Colheres e Articulações'],
        ['t', [
          'Modelo de Fórcipe',
          'Tipo de Articulação',
          'Curvaturas das Colheres',
          'Função Mecânica Principal',
          'Indicação Clínica Clássica'
        ], [
          ['<strong>Simpson / Simpson-Braun</strong>', 'Fixa (inglesa / encaixe por entalhe cruzado)', 'Curvatura cefálica e pélvica bem acentuadas; colheres fenestradas', '<strong>Tração pura</strong> no eixo da bacia', 'Cabeças fletidas e moldadas em variedades anteriores (OP, OEA, ODA)'],
          ['<strong>Kielland</strong>', 'Deslizante (permite correção de assinclitismo)', 'Sem curvatura pélvica significativa (haste reta); botão direcionador no cabo', '<strong>Rotação e tração</strong>', 'Variedades transversas e posteriores persistentes no estreito médio'],
          ['<strong>Piper</strong>', 'Frouxa (haste flexível alongada)', 'Curvatura perineal para baixo; colheres fenestradas', '<strong>Tração na cabeça derradeira</strong>', 'Parto pélvico assistido com cabeça retida após saída das escápulas'],
          ['<strong>Tarnier</strong>', 'Fixa com parafuso francês e trator móvel', 'Curvatura cefálica e pélvica; trator mecânico no cabo', '<strong>Tração no eixo pélvico</strong>', 'Parto instrumental histórico no estreito superior (atualmente em desuso)'],
          ['<strong>Barton</strong>', 'Articulação deslizante com colher anterior articulada', 'Colher anterior com dobradiça que se flete sobre a sínfise', '<strong>Rotação em bacia platipeloide</strong>', 'Variedade transversa pura em bacia com estreitamento ântero-posterior']
        ], 'book-table'],
        ['3', 'Traumatismo Craniofacial Fetal pelo Fórcipe: Diagnóstico Diferencial'],
        ['p', 'A aplicação do fórcipe pode produzir marcas compressivas temporárias ou lesões graves que devem ser diagnosticadas e diferenciadas imediatamente pelo pediatra e obstetra:'],
        ['u', [
          '<strong>Marca de Pressão das Colheres:</strong> Eritema e edema dérmico fugaz na região malar e pré-auricular, sem significado patológico, regredindo em 24 a 48 horas;',
          '<strong>Paralisia Facial Periférica Traumática:</strong> Resulta da compressão do tronco do nervo facial (VII par craniano) na emergência do forame estilomastoideo pela extremidade posterior de uma colher assimétrica ou mal articulada. Manifesta-se por assimetria do choro, incapacidade de fechar a pálpebra do lado acometido (lagoftalmia), apagamento do sulco nasolabial e desvio da comissura labial para o lado contralateral sadio. O prognóstico é favorável em &gt; 90% dos casos com resolução espontânea em algumas semanas por tratar-se habitualmente de neuropraxia;',
          '<strong>Cefaloematoma:</strong> Coleção hemática subperiosteal delimitada pelas suturas cranianas (<strong>NÃO ultrapassa as linhas de sutura</strong>), de consistência flácida ou elástica, que surge horas após o parto e regride lentamente em semanas;',
          '<strong>Bossa Serossanguínea (Caput Succedaneum):</strong> Edema serossanguinolento subcutâneo que <strong>ultrapassa livremente as linhas de sutura</strong>, de consistência amolecida com sinal do cacifo positivo, presente logo ao nascimento e com reabsorção rápida em 48 a 72 horas;',
          '<strong>Hemorragia Subgaleal:</strong> Sangramento maciço no espaço subaponeurótico entre a aponeurose epicraniana (gálea aponeurótica) e o periósteo. Apresenta consistência em bolsa d\'água flutuante, ultrapassa suturas, estende-se para a fronte e nuca e pode acumular mais de 50% da volemia neonatal, causando choque hemorrágico hipovolêmico e óbito. É a complicação mais temida do vácuo-extrator e de aplicações forçadas de fórcipe.'
        ]]
      ]
    ],
    [
      'cesariana-complicada-extracao-cabeca-impactada',
      0,
      [
        ['2', 'Manejo da Cabeça Fetal Impactada na Cesariana após Falha de Descida'],
        ['p', 'Um dos cenários cirúrgicos mais aterrorizantes para o obstetra ocorre durante a cesariana de emergência indicada após trabalho de parto prolongado no segundo período ou após tentativa frustrada de fórcipe, na qual a cabeça fetal encontra-se profundamente encravada no estreito médio e inferior da pelve materna.'],
        ['3', 'Riscos Cirúrgicos e Armadilhas Anatômicas'],
        ['p', 'A tentativa intempestiva do cirurgião de introduzir a mão por baixo da calota fetal impactada no segmento inferior edemaciado acarreta invariavelmente a <strong>laceração lateral do segmento uterino</strong> com extensão para os vasos uterinos (artéria e veias uterinas), hematoma retroperitoneal expansivo no ligamento largo, laceração vesical e hemorragia exsanguinante.'],
        ['3', 'Técnicas Reconhecidas para Desimpactação Segura'],
        ['o', [
          '<strong>Técnica do Empurrão Vaginal Reverso (Push Technique):</strong> Um assistente estéril posicionado entre as pernas da paciente introduz a mão enluvada na vagina e aplica pressão contínua e suave com a palma da mão ou dedos espalmados sobre o vértice fetal para empurrá-lo cranialmente para fora da pelve, enquanto o cirurgião abdominal aguarda a elevação para apreender a cabeça;',
          '<strong>Técnica de Extração Pélvica Reversa / Puxo Podálico (Pull Technique ou Manobra de Patwardhan):</strong> O cirurgião ignora a cabeça fetal encravada no segmento, introduz a mão no fundo uterino, localiza os pés ou a pelve fetal e realiza a extração pélvica invertida, retirando primeiro os membros inferiores, o tronco e os ombros, e finalmente desprendendo a cabeça suavemente por tração cranial. Ensaios clínicos randomizados demonstram que a técnica podálica (pull) reduz significativamente as lacerações uterinas e a hemorragia em comparação com a técnica de empurrão vaginal;',
          '<strong>Uso de Balão Descompressor Uterino Cefálico (Fetal Pillow):</strong> Dispositivo de silicone posicionado na vagina antes da incisão cirúrgica e insuflado com 180 mL de soro fisiológico, elevando a cabeça fetal em 3 a 4 cm no estreito superior antes da histerotomia.'
        ]]
      ]
    ],
    [
      'vicio-pelvico-pelvimetria-radiologica-mri',
      0,
      [
        ['2', 'Avaliação de Vícios Pélvicos e Métodos Modernos de Imagem'],
        ['p', 'Embora a pelvimetria clínica digital pelo toque vaginal permaneça como o método universalmente acessível no leito do parto, o avanço dos métodos diagnósticos por imagem permitiu compreender com precisão milimétrica a volumetria pélvica.'],
        ['3', 'A Radiopelvimetria e a Tomografia Computadorizada (Classificação de Thoms)'],
        ['p', 'A radiopelvimetria clássica foi amplamente abandonada no pré-natal de rotina devido à radiação ionizante no concepto. Contudo, em casos selecionados de sequelas traumáticas graves da pelve (fraturas pélvicas prévias com calo ósseo deformante, osteíte ou cirurgias ortopédicas reconstrutoras com próteses metálicas), a Tomografia Computadorizada ou Ressonância Magnética (RMN) volumétrica sem radiação é indicada no terceiro trimestre para aferir os diâmetros e planejar a via de parto programada.'],
        ['3', 'Índices Pelvimétricos Clássicos'],
        ['u', [
          '<strong>Índice do Estreito Superior de Mengert:</strong> Produto do diâmetro ântero-posterior pelo diâmetro transverso do estreito superior. Valores inferiores a 85% do padrão médio populacional associam-se a falha absoluta de descida em &gt; 90% das apresentações cefálicas a termo;',
          '<strong>Deformidades Pélvicas Específicas:</strong> Pelve de Naegele (ausência congênita de uma asa sacral gerando bacia assimetricamente estreitada unilateralmente); Pelve de Robert (ausência bilateral das asas sacrais com estreitamento transversal extremo intransponível); e Pelve Raquítica (achatamento ântero-posterior severo com promontório projetado para a frente reduzindo a conjugata obstétrica para &lt; 8 cm).'
        ]]
      ]
    ],
`;

// Insert extra sections before casos-clinicos-integradores
const target = "    [\n      'casos-clinicos-integradores',";
content = content.replace(target, boostSections + target);

// Also add to bookDistocias.o
const tocExtra = `
    ['estudo-comparativo-tipos-forcipe-detalhado', 'Comparativo Extensivo dos Modelos de Fórcipe: Mecânica e Riscos'],
    ['cesariana-complicada-extracao-cabeca-impactada', 'Manejo da Cabeça Fetal Impactada na Cesariana'],
    ['vicio-pelvico-pelvimetria-radiologica-mri', 'Avaliação de Vícios Pélvicos e Imagem'],
    ['casos-clinicos-integradores', '13. Casos Clínicos Resolvidos de Distócias e Parto Instrumental'],`;

const tocTarget = "    ['casos-clinicos-integradores', 'Casos Clínicos Resolvidos de Distócias e Parto Instrumental'],";
content = content.replace(tocTarget, tocExtra);

fs.writeFileSync('build-scripts/build-distocias.mjs', content, 'utf8');
console.log('Successfully boosted build-distocias.mjs!');
