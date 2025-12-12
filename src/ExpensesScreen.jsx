import React from "react";

export default function ExpensesScreen({ onBack, transactions = [] }) {
  // Agrupar por categorías
  const categories = {};
  transactions.forEach((t) => {
    if (!categories[t.category]) categories[t.category] = [];
    categories[t.category].push(t);
  });

  // Calcular totales
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="h-[100dvh] w-full bg-black/80 text-white flex justify-center">
      {/* 👇 Contenedor scroll */}
      <div className="w-full max-w-[480px] px-4 py-5 flex flex-col gap-4 overflow-y-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <button
            className="text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
            onClick={onBack}
          >
            ← Volver
          </button>

          <h1 className="text-xl font-bold">Tus gastos</h1>

          <div className="w-8"></div>
        </div>

        {/* TOTAL GASTADO */}
        <div className="bg-slate-900/80 border border-emerald-400/40 rounded-2xl p-4 flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-emerald-300">
            Total del mes
          </h2>
          <p className="text-xl font-bold">${totalSpent.toFixed(2)}</p>
          <p className="text-xs text-slate-400">
            Este total coincide con los datos que analiza Kuri para tu
            presupuesto.
          </p>
        </div>

        {/* LISTA DE TRANSACCIONES AGRUPADAS */}
        <div className="flex flex-col gap-4">
          {Object.keys(categories).map((cat) => {
            const catTotal = categories[cat].reduce(
              (sum, t) => sum + t.amount,
              0
            );

            return (
              <div
                key={cat}
                className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{cat}</h3>
                  <span className="text-emerald-300 font-semibold">
                    ${catTotal.toFixed(2)}
                  </span>
                </div>

                {/* Lista de movimientos */}
                <div className="flex flex-col gap-2">
                  {categories[cat].map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-700"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm">{item.description}</span>
                        <span className="text-[11px] text-slate-400">
                          {item.date}
                        </span>
                      </div>

                      <span className="text-sm font-semibold">
                        ${item.amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ESPACIO FINAL PARA QUE EL USUARIO SCROLLEE TRANQUILO */}
        <div className="h-10"></div>
      </div>
    </div>
  );
}
