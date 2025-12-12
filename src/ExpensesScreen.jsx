import React from "react";

export default function ExpensesScreen({
  onBack,
  transactions = [],
  summary,
  monthlyBudget,
  savingsGoal,
}) {
  const totalSpent = summary?.spentThisMonth ?? 0;
  const remaining = summary?.remaining ?? 0;
  const budget = monthlyBudget ?? 0;
  const goal = savingsGoal ?? 0;

  // Agrupar gastos por categoría
  const categories = {};
  transactions.forEach((t) => {
    if (!categories[t.category]) categories[t.category] = 0;
    categories[t.category] += t.amount;
  });

  const maxCategory = Object.values(categories).reduce(
    (max, val) => (val > max ? val : max),
    0
  );

  const lastMovements = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  return (
    <div className="h-[100dvh] w-full bg-black/80 text-white flex justify-center">
      {/* este es el contenedor que scrollea */}
      <div className="w-full max-w-[480px] px-4 py-5 md:px-6 flex flex-col gap-4 overflow-y-auto pb-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-1">
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

        {/* RESUMEN DEL MES */}
        <section className="bg-slate-900/80 border border-emerald-400/40 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-emerald-200">
              Resumen rápido
            </h2>
            <span className="text-[11px] text-slate-300">
              Presupuesto:{" "}
              <span className="font-semibold text-emerald-300">
                ${budget.toFixed(2)}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs mt-2">
            <div className="flex flex-col">
              <span className="text-slate-400">Gastado</span>
              <span className="text-sm font-semibold">
                ${totalSpent.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400">Te queda</span>
              <span className="text-sm font-semibold">
                ${remaining.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-slate-400">Meta de ahorro</span>
              <span className="text-sm font-semibold text-emerald-300">
                ${goal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Barra de progreso del presupuesto */}
          <div className="mt-3">
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Uso del presupuesto</span>
              <span>
                {summary ? summary.percentage : 0}
                %
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${summary ? summary.percentage : 0}%`,
                  backgroundColor:
                    summary && summary.percentage <= 80
                      ? "#4ade80"
                      : summary && summary.percentage <= 100
                      ? "#facc15"
                      : "#f97373",
                }}
              />
            </div>
          </div>
        </section>

        {/* GRÁFICO DE GASTOS POR CATEGORÍA */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <h2 className="text-sm md:text-base font-semibold mb-2">
            Gráfico de tus gastos 📊
          </h2>
          <p className="text-[11px] text-slate-300 mb-3">
            Kuri agrupa tus movimientos por categoría para que veas en qué se va
            tu dinero sin tener que hacer Excel.
          </p>

          <div className="flex flex-col gap-2">
            {Object.keys(categories).length === 0 && (
              <p className="text-xs text-slate-400">
                Aún no hay gastos registrados en este demo.
              </p>
            )}

            {Object.entries(categories).map(([cat, amount]) => {
              const percent =
                maxCategory > 0 ? (amount / maxCategory) * 100 : 0;

              return (
                <div key={cat} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-200">{cat}</span>
                    <span className="text-slate-300">
                      ${amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${percent}%`,
                        background:
                          "linear-gradient(90deg, #22c55e, #a3e635)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* MOVIMIENTOS RECIENTES */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
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

        {/* PLAN DE AHORRO PERSONALIZADO */}
        <section className="bg-emerald-900/80 border border-emerald-300/60 rounded-2xl p-4 mb-4">
          <h2 className="text-sm md:text-base font-semibold text-emerald-100 mb-1">
            Plan de ahorro personalizado de Kuri 🐾
          </h2>
          <p className="text-xs text-emerald-50 mb-2">
            Con tus datos de este mes, Kuri te propone un plan simple:
          </p>

          <ul className="list-disc list-inside text-[11px] text-emerald-50 space-y-1">
            <li>
              Mantener tu gasto mensual por debajo de{" "}
              <span className="font-semibold">
                ${budget.toFixed(2)}
              </span>{" "}
              para no pasarte del presupuesto.
            </li>
            <li>
              Intentar ahorrar al menos{" "}
              <span className="font-semibold">
                ${goal.toFixed(2)} al mes
              </span>{" "}
              (tu meta larga en la sección de objetivos).
            </li>
            <li>
              Revisar una vez por semana tus categorías más altas
              (especialmente las que están arriba en el gráfico).
            </li>
          </ul>

          <p className="mt-2 text-[11px] text-emerald-200">
            En la versión conectada al banco, este plan se ajusta solo según tus
            movimientos reales. Aquí lo ves ya simulado con tus datos ficticios.
          </p>
        </section>
      </div>
    </div>
  );
}
