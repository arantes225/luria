const fs = require('node:fs');
const path = require('node:path');

const file = path.join(__dirname, '..', 'apostilas', 'trauma-pelvico-e-geniturinario', 'content.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));
const id = 'sec-populacoes-especiais-seguimento-trauma-pelvico';
if (!data.q.some((section) => section[0] === id)) {
  data.q.splice(data.q.findIndex((section) => section[0] === 'referencias'), 0, [id, 0, [
    ['2', 'Populações especiais, seguimento e critérios de reavaliação'],
    ['3', 'A estabilidade inicial não encerra o cuidado'],
    ['p', 'O paciente com trauma pélvico ou geniturinário precisa de reavaliação seriada mesmo quando a pressão arterial melhora após a primeira intervenção. Registrar tendência de frequência cardíaca, perfusão periférica, temperatura, débito urinário, dor, hemoglobina, lactato quando indicado e necessidade de hemocomponentes. A resposta transitória à reposição pode mascarar sangramento contínuo; piora do estado mental, extremidades frias, oligúria ou aumento de necessidade transfusional exigem reabrir a busca por fonte hemorrágica e considerar controle definitivo.'],
    ['3', 'Crianças, gestantes, idosos e pessoas anticoaguladas'],
    ['p', 'Em crianças, a reserva fisiológica pode manter sinais vitais aparentemente preservados até deterioração rápida. Usar peso estimado confiável, aquecimento, analgesia e estratégia de transfusão compatível com protocolo pediátrico; não transportar automaticamente volumes de adulto. Em gestantes, priorizar estabilização materna, deslocamento uterino quando aplicável, avaliação obstétrica e decisão conjunta sobre imagem, proteção fetal e necessidade de parto, sem atrasar controle de hemorragia potencialmente fatal.'],
    ['p', 'Em idosos, doença cardiovascular, fragilidade, insuficiência renal e uso de antiagregantes ou anticoagulantes alteram a tolerância à perda sanguínea e à sobrecarga volêmica. Em quem usa varfarina, DOAC ou antiagregante, confirmar fármaco, horário da última dose, função renal e disponibilidade de reversão segundo protocolo institucional. A reversão não substitui hemostasia mecânica, angioembolização ou cirurgia quando indicadas.'],
    ['3', 'Seguimento urológico e prevenção de complicações'],
    ['p', 'Hematúria persistente, febre, dor lombar crescente, queda tardia da hemoglobina, urinoma, fístula, hipertensão nova ou redução da função renal devem desencadear revisão especializada. A necessidade e o momento de tomografia de controle dependem do grau da lesão, da evolução clínica e dos achados iniciais; não repetir radiação de forma automática em todo trauma estável. Quando houver lesão do sistema coletor, confirmar resolução do extravasamento e o plano para retirar ou trocar cateteres, evitando que um dispositivo temporário se torne fonte de obstrução ou infecção.'],
    ['t', ['Situação de retorno', 'Sinais de alerta', 'Ação orientada'], [
      ['Alta após trauma renal de baixo grau', 'Febre, dor crescente, hematúria recorrente, tontura ou síncope', 'Retorno imediato para exame, hemograma e imagem conforme avaliação'],
      ['Após angioembolização ou packing', 'Nova instabilidade, aumento de transfusão ou distensão abdominal/pélvica', 'Reavaliar hemostasia e acionar trauma, radiologia intervencionista e cirurgia'],
      ['Após derivação urinária', 'Febre, anúria/oligúria, dor lombar, saída reduzida pelo dreno', 'Avaliar obstrução, infecção, posição do dispositivo e urinoma'],
      ['Trauma uretral com cistostomia', 'Dor suprapúbica, extravasamento, infecção ou incapacidade de completar seguimento', 'Urologia define uretrografia de controle e reconstrução ou realinhamento']
    ], 'book-table'],
    ['3', 'Questão de fixação'],
    ['p', '<strong>Paciente com trauma renal grau IV</strong>, inicialmente estável, evolui no terceiro dia com febre, dor lombar crescente e queda de hemoglobina. A resposta mais segura é: A) presumir que a febre é esperada e manter alta; B) repetir avaliação clínica e laboratorial, investigar urinoma, sangramento ou infecção e discutir imagem/intervenção com trauma e urologia; C) retirar todo cateter sem imagem; D) indicar nefrectomia imediata apenas pelo grau anatômico. <strong>Gabarito: B.</strong> O grau orienta risco, mas a evolução clínica determina a reavaliação; intervenção deve ser dirigida à fonte identificada e à estabilidade do paciente.'],
    ['p', 'As condutas dependem do protocolo local, dos recursos disponíveis e da avaliação de equipes habilitadas. Esta seção organiza sinais de reavaliação e não substitui decisão à beira-leito.']
  ]]);
  const refIndex = data.o.findIndex((entry) => entry[0] === 'referencias');
  data.o.splice(refIndex, 0, [id, 'Populações especiais, seguimento e critérios de reavaliação']);
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}
