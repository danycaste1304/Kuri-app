import React from "react";

export default function ExpensesScreen({
  onBack,
  transactions = [],
  summary,
  monthlyBudget,
  savingsGoal,
}) {
  const budget = monthlyBudget ?? 0;           // Ej: 400
  const goal = savingsGoal ?? 0;              // Ej: 80
  const spent = summary?.spentThisMonth ?? 0;
  const remaining = summary?.remaining ?? 0;
  const percentage = summary?.percentage ?? 0;

  // Agrupar por categoría para usar en el plan
  const categoriesTotals = {};
  transactions.forEach((t) => {
    if (!categoriesTotals[t.category]) categoriesTotals[t.category] = 0;
    categoriesTotals[t.category] += t.amount;
  });

  const [topCategoryName, topCategoryValue] =
    Object.entries(categoriesTotals).sort((a, b) => b[1] - a[1])[0] || [
      "Entretenimiento",
      0,
    ];

  // Últimos movimientos (ordenados por fecha descendente)
  const lastMovements = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Para el gráfico circular
  const arcPercent = Math.min(percentage, 100);
  const arcColor =
    percentage <= 80 ? "#22c55e" : percentage <= 100 ? "#fbbf24" : "#f97373";

  // Ahorro potencial si mantienes gasto así
  const potentialSavings = Math.max(0, budget - spent);

  return (
    <div className="h-[100dvh] w-full bg-black/80 text-white flex justify-center">
      {/* contenedor interno con scroll */}
      <div className="w-full max-w-[480px] px-4 py-5 md:px-6 overflow-y-auto pb-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <button
            className="text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
            onClick={onBack}
          >
            ← Volver
          </button>

          <h1 className="text-lg md:text-xl font-bold">
            Tus gastos del mes 💳
          </h1>

          <div className="w-8" />
        </div>

        {/* RESUMEN + GRÁFICO CIRCULAR */}
        <section className="bg-slate-900/80 border border-emerald-400/40 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-slate-300">Presupuesto mensual</p>
              <p className="text-lg font-semibold text-emerald-300">
                ${budget.toFixed(2)}
              </p>
            </div>

            {/* Gráfico circular */}
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full">
                <div
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(${arcColor} ${arcPercent}%, #0f172a ${arcPercent}% 100%)`,
                  }}
                />
              </div>
              <div className="absolute inset-2 rounded-full bg-slate-900 flex flex-col items-center justify-center">
                <span className="text-xs text-slate-300">Usado</span>
                <span className="text-sm font-semibold">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>

          {/* números debajo del gráfico */}
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <div className="flex flex-col">
              <span className="text-slate-400">Gastado</span>
              <span className="text-sm font-semibold">
                ${spent.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400">Te queda</span>
              <span className="text-sm font-semibold">
                ${remaining.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* META DE AHORRO CONECTADA A OBJETIVO */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 mb-4">
          <h2 className="text-sm md:text-base font-semibold mb-1">
            Tu ahorro este mes con Kuri 🐾
          </h2>
          <p className="text-xs text-slate-300 mb-2">
            Meta de ahorro sugerida para este mes:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex flex-col">
              <span className="text-slate-400">Meta mensual</span>
              <span className="text-sm font-semibold text-emerald-300">
                ${goal.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400">Ahorro potencial</span>
              <span className="text-sm font-semibold">
                ${potentialSavings.toFixed(2)}
              </span>
            </div>
          </div>

          <p className="mt-2 text-[11px] text-slate-400">
            Si mantienes el nivel de gasto de este demo, podrías ahorrar
            alrededor de{" "}
            <span className="text-emerald-300 font-semibold">
              ${Math.min(goal, potentialSavings).toFixed(2)}
            </span>{" "}
            este mes, alineado con el objetivo que fijaste en la sección{" "}
            <span className="font-semibold text-emerald-200">Tu objetivo</span>.
          </p>
        </section>

        {/* ÚLTIMOS MOVIMIENTOS */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm md:text-base font-semibold">
              Últimos movimientos
            </h2>
            <span className="text-[11px] text-slate-400">
              Total: {transactions.length}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {lastMovements.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between bg-slate-800/70 border border-slate-700 rounded-xl px-3 py-2"
              >
                <div className="flex flex-col">
                  <span className="text-sm">{m.description}</span>
                  <span className="text-[11px] text-slate-400">
                    {m.category} · {m.date}
                  </span>
                </div>
                <span className="text-sm font-semibold">
                  ${m.amount.toFixed(2)}
                </span>
              </div>
            ))}

            {lastMovements.length === 0 && (
              <p className="text-xs text-slate-400">
                Aún no tienes movimientos en este demo.
              </p>
            )}
          </div>
        </section>

        {/* PLAN PERSONALIZADO AL FINAL */}
        <section className="bg-emerald-900/80 border border-emerald-300/60 rounded-2xl p-4 mb-2">
          <h2 className="text-sm md:text-base font-semibold text-emerald-100 mb-1">
            Plan de ahorro personalizado de Kuri 💚
          </h2>

          <p className="text-xs text-emerald-50 mb-2">
            Con tus datos ficticios de este MVP, Kuri arma un mini plan:
          </p>

          <ul className="list-disc list-inside text-[11px] text-emerald-50 space-y-1">
            <li>
              Intenta que tus gastos totales se mantengan por debajo de{" "}
              <span className="font-semibold">
                ${budget.toFixed(2)}
              </span>{" "}
              (tu presupuesto mensual).
            </li>
            <li>
              Reserva al menos{" "}
              <span className="font-semibold">
                ${goal.toFixed(2)} de ahorro
              </span>{" "}
              en tu tarrito, como viste en <strong>Tu objetivo</strong>.
            </li>
            <li>
              Revisa especialmente la categoría{" "}
              <span className="font-semibold">{topCategoryName}</span>, donde
              llevas unos{" "}
              <span className="font-semibold">
                ${topCategoryValue.toFixed(2)}
              </span>{" "}
              en este demo.
            </li>
          </ul>

          <p className="mt-2 text-[11px] text-emerald-200">
            En la versión conectada al banco, este plan se ajusta solo según tus
            movimientos reales. Aquí está sincronizado con los datos ficticios
            que usa Kuri en toda la app.
          </p>
        </section>
      </div>
    </div>
  );
}
