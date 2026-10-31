// ==============================================================================
// TRAUBE MARKETING - TAREFA AGENDADA SEMANAL DE DICAS DE CRESCIMENTO ORGÂNICO
// Pode ser executada localmente via Node ou por GitHub Actions cron schedule.
// ==============================================================================

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../assets/data/organic-growth-tips.json");

const TIPS_BANK = [
  {
    titulo: "Hack de Carrossel Salvável",
    dica: "Carrosséis técnicos de 7 a 9 lâminas com infográfico resumo na penúltima lâmina geram 3.5x mais salvamentos entre residentes e internos.",
    acao: "Certifique-se de que a lâmina 7 tenha o 'Resumo de 30 Segundos' para leitura rápida durante a correria do internato."
  },
  {
    titulo: "Roteiro de Reels de 3 Segundos (Gancho Forte)",
    dica: "Se os primeiros 3 segundos não prenderem com um dilema clínico, 70% dos médicos rolam o feed.",
    acao: "Comece o vídeo direto com 'Se chegar esse ECG no seu plantão, o que você prescreve primeiro?'. Não diga 'Olá pessoal'."
  },
  {
    titulo: "Otimização de R$ 20/semana no Meta Ads",
    dica: "Em orçamentos de R$ 20/semana, turbine o post vencedor da semana diretamente pelo aplicativo para Visitas ao Perfil.",
    acao: "Configuração: R$ 2,85/dia por 7 dias. Segmente apenas por raio de capitais com grandes hospitais universitários ou interesse em Residência Médica."
  },
  {
    titulo: "Conversão de Seguidor para Lead VIP",
    dica: "Após ganhar seguidores na fase 1, ative a fase 2 com automação de direct ou link da bio para os 15 dias grátis.",
    acao: "Coloque CTA nos stories com sticker de link para /black-november/ reforçando que não precisa de cartão de crédito."
  }
];

function runWeeklyUpdate() {
  let existing = [];
  try {
    if (fs.existsSync(DATA_FILE)) {
      existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }
  } catch (err) {
    console.error("Erro ao ler dicas existentes:", err);
  }

  const now = new Date();
  const nextWeekNumber = existing.length + 43; // Começou semana 43
  
  // Seleciona uma nova pauta dinâmica ou rotativa
  const tipSelected = TIPS_BANK[existing.length % TIPS_BANK.length];

  const newEntry = {
    id: `semana-${nextWeekNumber}-${now.getFullYear()}`,
    semana: `Semana Agendada (${now.toLocaleDateString('pt-BR')})`,
    foco: `Otimização de Engajamento Orgânico & Eficiência de R$ 20`,
    pilares: [
      tipSelected,
      {
        titulo: "Análise de Métricas da Semana Anterior",
        dica: "Avalie métricas de engajamento verdadeiro: taxa de salvamento > 3% e retenção média de reels > 45%.",
        acao: "Arquive ou pause posts que tiveram retenção abaixo de 20% e replique o modelo visual do mais salvo."
      }
    ],
    atualizado_em: now.toISOString()
  };

  existing.unshift(newEntry);

  // Mantém no máximo 12 semanas no histórico
  if (existing.length > 12) existing = existing.slice(0, 12);

  fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), "utf-8");
  console.log(`✓ Dicas de crescimento orgânico atualizadas com sucesso para ${newEntry.semana}.`);
}

if (require.main === module) {
  runWeeklyUpdate();
}

module.exports = { runWeeklyUpdate };
