// src/kuriLogic.js

// --- 1. Datos de ejemplo para el MVP (luego vendrá el banco real) ---
export const demoTransactions = [
  { id: 1, description: "Uber", amount: 6.5, category: "Transporte", date: "2025-12-01" },
  { id: 2, description: "Netflix", amount: 10, category: "Entretenimiento", date: "2025-12-02" },
  { id: 3, description: "Almuerzo USFQ", amount: 7.8, category: "Comida", date: "2025-12-03" },
  { id: 4, description: "Supermaxi", amount: 45.2, category: "Supermercado", date: "2025-12-04" },
];

// --- 2. Función que, en el futuro, reemplazamos por ML real ---
export function classifyTransactions(rawTransactions) {
  // Por ahora asumimos que ya vienen con categoría
  // Aquí luego iría el modelo de ML
  return rawTransactions;
}

// --- 3. Cálculo de resumen mensual ---
export function getMonthlySummary(transactions, monthlyBudget) {
  const spentThisMonth = transactions.reduce((sum, t) => sum + t.amount, 0);

  const percentage = monthlyBudget > 0
    ? Math.min(100, Math.round((spentThisMonth / monthlyBudget) * 100))
    : 0;

  return {
    spentThisMonth,
    remaining: Math.max(0, monthlyBudget - spentThisMonth),
    percentage,
  };
}

// --- 4. Mood de Kuri según cómo va el mes ---
export function getKuriMood(summary) {
  const { percentage } = summary;

  if (percentage < 50) return "happy";        // vamos súper bien
  if (percentage < 90) return "neutral";      // meh, vamos ok
  if (percentage <= 100) return "worried";    // casi al límite
  return "sad";                               // nos pasamos 😢
}

// --- 5. Sistema de nivel muy simple ---
export function calculateKuriLevel(transactions) {
  const totalSaved = 0; 
  // Luego aquí podríamos calcular ahorro real vs ingresos.
  // Por ahora, usamos número de transacciones como proxy de "uso".

  const xp = transactions.length * 10; // 10 XP por transacción registrada
  const level = 1 + Math.floor(xp / 100); // cada 100 XP → sube de nivel

  return { level, xp };
}

// --- 6. Reto mensual dinámico ---
export function generateMonthlyChallenge(lastMonthSpent, currentSpent) {
  // Si no hay datos del mes pasado, ponemos un reto fijo
  if (!lastMonthSpent || lastMonthSpent <= 0) {
    return {
      id: "first-month",
      title: "Primer reto con Kuri 🐾",
      description: "Intenta gastar menos en compras por impulso este mes.",
      targetType: "generic",
      targetValue: null,
      progress: 0,
    };
  }

  // Queremos bajar un % respecto al mes pasado
  const targetReductionPercent = 10; // 10% menos que el mes anterior
  const targetSpend = lastMonthSpent * (1 - targetReductionPercent / 100);

  const progress = currentSpent <= 0
    ? 0
    : Math.min(100, Math.round((lastMonthSpent - currentSpent) / (lastMonthSpent - targetSpend) * 100));

  return {
    id: "reduce-monthly-spend",
    title: "Reto mensual con Kuri 💛",
    description: `Gasta al menos un ${targetReductionPercent}% menos que el mes pasado.`,
    targetType: "reduce_spend",
    targetValue: targetSpend,
    progress: isNaN(progress) ? 0 : progress,
  };
}
