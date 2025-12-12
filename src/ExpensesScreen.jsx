import React from "react";

export default function ExpensesScreen({ onBack, monthlyBudget, transactions = [] }) {
  // 💸 Presupuesto mensual configurado en Kuri (viene de la app, ej: 400)
  const budget = monthlyBudget ?? 0;

  // Agrupar transacciones por categoría
  const categoryMeta = {
    Comida: {
      emoji: "🍕",
      color: "#34d399",
      label: "Comida y snacks",
    },
    Transporte: {
      emoji: "🚌",
      color: "#22c55e",
      label: "Transporte",
    },
    Entretenimiento: {
      emoji: "🎉",
      color: "#a3e635",
      label: "Salidas y ocio",
    },
    Supermercado: {
      emoji: "🛒",
      color: "#f97316",
      label: "Supermercado",
    },
    Salud: {
      emoji: "💊",
      color: "#facc15",
      label: "Salud",
    },
    Compras: {
      emoji: "🛍️",
      color: "#38bdf8",
      label: "Compras",
    },
  };

  const grouped = {};
  transactions.forEach((t) => {
    if (!grouped[t.category]) grouped[t.category] = 0;
    grouped[t.category] += t.amount;
  });

  const categories = Object.entries(grouped).map(([catName, amount]) => {
    const meta = categoryMeta[catName] || {};
    return {
      id: catName,
      label: meta.label || catName,
      emoji: meta.emoji || "💸",
      amount,
      color: meta.color || "#64748b",
    };
  });

  const totalSpent =
    categories.reduce((sum, c) => sum + c.amount, 0) ||
    transactions.reduce((sum, t) => sum + t.amount, 0); // fallback por si acaso

  const remaining = budget - totalSpent;
  const percentUsed =
    budget > 0 ? Math.round((totalSpent / budget) * 100) : 0;

  // 🎯 Modelo de ahorro sugerido: 20% del presupuesto (coincide con 80 si budget=400)
  const suggestedSaving = Math.round(budget * 0.2);
  const weeklySaving =
    budget > 0 ? Math.round((suggestedSaving / 4) * 10) / 10 : 0;

  // Donut chart segments
  const totalForPie = totalSpent || 1; // evitar división por 0
  let cumulative = 0;
  const segments = categories.map((cat) => {
    const fraction = cat.amount / totalForPie;
    const segment = {
      ...cat,
      fraction,
      offset: cumulative,
    };
    cumulative += fraction;
    return segment;
  });

  return (
    <div className="h-[100dvh] w-full bg-black/80 text-white flex justify-center">
      <div className="w-full max-w-[960px] px-4 py-5 md:px-8 md:py-6 overflow-y-auto pb-10">
        {/* Botón volver */}
        <button
          onClick={onBack}
          className="mb-4 text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
        >
          ← Volver
        </button>

        <h1 className="text-2xl md:text-3xl font-bold mb-1">
          Resumen de gastos
        </h1>
        <p className="text-[11px] md:text-xs text-slate-400 mb-1">
          Presupuesto mensual configurado en Kuri:{" "}
          <span className="font-semibold text-emerald-300">
            ${budget.toFixed(2)}
          </span>
        </p>
        <p className="text-xs md:text-sm text-slate-300 mb-5">
          Así se está moviendo tu plata este mes 💸
        </p>

        {/* Presupuesto vs gasto */}
        <div className="bg-slate-900/80 p-4 md:p-5 rounded-2xl mb-5 border border-slate-700">
          <div className="flex items-baseline justify-between gap-4 mb-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Gasto total del mes
              </p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">
                ${totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Presupuesto mensual</p>
              <p className="text-sm md:text-base font-semibold text-slate-100">
                ${budget.toFixed(2)}
              </p>
              <p
                className={`text-[11px] mt-1 ${
                  remaining > 0
                    ? "text-emerald-300"
                    : remaining === 0
                    ? "text-amber-300"
                    : "text-red-300"
                }`}
              >
                {remaining > 0
                  ? `Te quedan $${remaining.toFixed(2)} de tu presupuesto`
                  : remaining === 0
                  ? "Has usado el 100% de tu presupuesto"
                  : `Te pasaste $${Math.abs(remaining).toFixed(2)}`}
              </p>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-slate-400 mb-1">
              <span>Uso del presupuesto</span>
              <span>{percentUsed}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  percentUsed <= 80
                    ? "bg-emerald-400"
                    : percentUsed <= 100
                    ? "bg-amber-400"
                    : "bg-red-400"
                } transition-all`}
                style={{ width: `${Math.min(percentUsed, 110)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Por categoría */}
        <div className="bg-slate-900/80 p-4 md:p-5 rounded-2xl mb-5 border border-slate-700">
          <h2 className="text-lg md:text-xl font-semibold mb-3">
            ¿En qué se te va la plata?
          </h2>

          {categories.length === 0 ? (
            <p className="text-xs text-slate-400">
              Aún no hay movimientos en este demo.
            </p>
          ) : (
            <ul className="space-y-2 text-sm md:text-base">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-1">
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </div>
                  <span className="font-medium">
                    ${cat.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Gráfica de pie (donut) */}
        <div className="bg-slate-900/80 p-4 md:p-5 rounded-2xl mb-5 border border-slate-700">
          <h2 className="text-lg md:text-xl font-semibold mb-3">
            Gráfica de gastos
          </h2>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Donut */}
            <div className="flex items-center justify-center">
              <svg
                viewBox="0 0 36 36"
                className="w-32 h-32 md:w-40 md:h-40"
              >
                {/* Fondo del donut */}
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#1f2937"
                  strokeWidth="6"
                />
                {segments.map((seg) => (
                  <circle
                    key={seg.id}
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="6"
                    strokeDasharray={`${seg.fraction * 100} ${
                      100 - seg.fraction * 100
                    }`}
                    strokeDashoffset={25 - seg.offset * 100}
                    strokeLinecap="butt"
                  />
                ))}
              </svg>
            </div>

            {/* Leyenda */}
            <div className="flex-1 space-y-2 text-xs md:text-sm">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-slate-200">
                      {cat.emoji} {cat.label}
                    </span>
                  </div>
                  <span className="text-slate-300">
                    {totalSpent > 0
                      ? ((cat.amount / totalSpent) * 100).toFixed(1)
                      : "0.0"}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Objetivo de ahorro sugerido */}
        <div className="bg-slate-900/80 p-4 md:p-5 rounded-2xl border border-emerald-500/60 text-sm md:text-base">
          <h2 className="text-lg md:text-xl font-semibold mb-2 text-emerald-300">
            Modelo de ahorro sugerido 🐾
          </h2>
          <p className="text-slate-200 mb-2">
            Con un presupuesto de{" "}
            <span className="font-semibold text-emerald-300">
              ${budget.toFixed(0)}
            </span>
            , Kuri te propone ahorrar alrededor de{" "}
            <span className="font-bold text-emerald-300">
              ${suggestedSaving.toFixed(0)} al mes
            </span>{" "}
            (≈{" "}
            {budget > 0
              ? Math.round((suggestedSaving / budget) * 100)
              : 0}
            % de tu presupuesto).
          </p>

          <p className="text-slate-300 text-[13px] md:text-sm mb-2">
            Eso sería aproximadamente{" "}
            <span className="font-semibold text-emerald-200">
              ${weeklySaving.toFixed(1)} por semana
            </span>
            . Si lo mantienes 6 meses, tendrías cerca de{" "}
            <span className="font-semibold text-emerald-200">
              ${(suggestedSaving * 6).toFixed(0)}
            </span>{" "}
            para tu objetivo (viaje, laptop, curso, etc.).
          </p>

          <p className="text-slate-400 text-[12px] md:text-sm">
            Ideas concretas para liberar esos{" "}
            <span className="text-emerald-200 font-semibold">
              ${suggestedSaving.toFixed(0)}
            </span>
            :
            <br />• Bajar un poco en{" "}
            <span className="text-slate-200">Comida y snacks</span>{" "}
            (llevar algo de casa algunos días).
            <br />• Reducir{" "}
            <span className="text-emerald-200">Salidas y ocio</span>{" "}
            (una salida menos o planes más low-cost).
            <br />• Revisar{" "}
            <span className="text-slate-200">suscripciones</span> y cancelar
            una app que casi no uses.
          </p>
        </div>
      </div>
    </div>
  );
}
