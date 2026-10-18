import { secInfeccao1 } from './builders/infeccao-part1.mjs';
import { secInfeccao2 } from './builders/infeccao-part2.mjs';
import { secInfeccao3 } from './builders/infeccao-part3.mjs';
import { secInfeccaoProfilaxia } from './builders/infeccao-part4.mjs';
import { secInfeccaoCasosQuestoesExpandidos } from './builders/infeccao-part5.mjs';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const book = {
  slug: 'infeccao-puerperal',
  title: 'Infecção Puerperal',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Infectologia Obstétrica e Cirurgia Pélvica',
  description: 'Tratado completo de Infecção Puerperal: definição epidemiológica da Organização Mundial da Saúde (OMS) e critérios clássicos de Gibbs (temperatura axilar >= 38,0ºC em 2 dias quaisquer dos primeiros 10 dias pós-parto, com exclusão formal das primeiras 24 horas decorrentes de desidratação e esforço muscular; exceção de Gibbs para choque precoce e febre >= 38,5ºC nas primeiras 24h por sepse fulminante ou Streptococcus pyogenes do grupo A); estratificação dos fatores de risco maiores com ênfase na cesariana como fator independente principal (elevação de 5 a 20 vezes do risco relativo em relação ao parto vaginal), bolsa rota prolongada > 18-24 horas, múltiplos toques vaginais > 5, trabalho de parto arrastado, corioamnionite intraparto prévia, anemia e obesidade; microbiologia e etiopatogenia polimicrobiana mista sinérgica (bactérias anaeróbias estritas como Bacteroides fragilis, Peptostreptococcus e Prevotella em cooperação enzimática com bacilos Gram-negativos entéricos facultativos como Escherichia coli e Klebsiella pneumoniae, e cocos Gram-positivos como Streptococcus agalactiae GBS, Streptococcus pyogenes GAS e Enterococcus faecalis); espectro das formas clínicas e topográficas (endomiometrite pós-parto com a tríade clássica de febre puerperal, subinvolução uterina dolorosa e lochia foetida pútrida; infecção e abscesso de ferida operatória pós-cesariana e fasciíte necrotizante com crepitação subcutânea exigindo desbridamento cirúrgico de emergência; parametrite com empastamento lenhoso unilateral dos parâmetros vaginais e abscesso pélvico de fundo de saco de Douglas; peritonite puerperal com abdome em tábua e íleo paralítico reflexo; e Tromboflebite Pélvica Séptica com febre persistente em picos/agulhas apesar de antibioticoterapia correta, sinal da febre sem taquicardia desproporcional contínua, trombo venoso ovariano à tomografia contrastada e resposta espetacular ao teste terapêutico com heparina plena em 48 a 72 horas); prevenção e profilaxia cirúrgica (timing da Cefazolina 2 g IV 30-60 min antes da incisão, ajuste para obesidade >=120 kg para 3 g, profilaxia estendida com Azitromicina em cesarianas de urgência, antissepsia com clorexidina alcoólica); diagnóstico laboratorial e por imagem (TC contrastada e USG pélvica); protocolo de sepse puerperal e qSOFA obstétrico com pacote de 1 hora; protocolo terapêutico padrão-ouro de primeira linha intravenoso com Clindamicina 900 mg IV 8/8h + Gentamicina 5 mg/kg IV dose única diária (ou 1,5 mg/kg 8/8h); conduta frente à falha clínica após 48 a 72 horas de tratamento (associação tripla com Ampicilina 2 g IV 6/6h para cobertura de Enterococcus faecalis e busca ativa de coleções por TC/USG); critérios formais de cura e alta hospitalar (paciente afebril e assintomática por 24 a 48 horas consecutivas) com descontinuação pura dos antimicrobianos e desmistificação da prescrição de antibióticos orais ambulatoriais; múltiplos casos clínicos estruturados e questões comentadas para o ENAMED e residência médica.',
  sections: [
    ...secInfeccao1,
    ...secInfeccao2,
    ...secInfeccaoProfilaxia,
    ...secInfeccao3,
    ...secInfeccaoCasosQuestoesExpandidos
  ],
  references: [
    {
      title: 'Ministério da Saúde do Brasil — Protocolo de Prevenção e Tratamento das Infecções Puerperais e Manejo da Sepse Materna',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/s/saude-da-mulher'
    },
    {
      title: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Infecções Puerperais e Cirurgia Obstétrica',
      url: 'https://www.febrasgo.org.br'
    },
    {
      title: 'World Health Organization (WHO) — WHO recommendations for prevention and treatment of maternal peripartum infections',
      url: 'https://www.who.int/publications/i/item/9789241549363'
    },
    {
      title: 'American College of Obstetricians and Gynecologists (ACOG) — Practice Bulletin No. 195: Prevention of Infection After Gynecologic Procedures and Cesarean Delivery',
      url: 'https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/06/prevention-of-infection-after-gynecologic-procedures'
    },
    {
      title: 'Cochrane Pregnancy and Childbirth Group — Antibiotic regimens for postpartum endometritis (Mackeen AD et al.)',
      url: 'https://www.cochranelibrary.com'
    }
  ]
};

const chars = saveBook(book);
console.log(`[SUCESSO] ${book.slug} construído com ${chars} caracteres úteis.`);
