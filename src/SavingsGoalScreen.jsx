import React from "react";

export default function SavingsGoalScreen({ onBack }) {
  // 🔢 Datos de ejemplo (luego los podemos hacer dinámicos o venir de la API)
  const goalAmount = 500;       // Meta de ahorro total
  const totalSaved = 180;       // Lo que lleva ahorrado
  const savedThisWeek = 25;     // Ahorro de esta semana
  const appCoinsEarned = totalSaved >= goalAmount ? 120 : 40; // monedas ganadas (ejemplo)

  const progress = Math.min(totalSaved / goalAmount, 1);
  const progressPercent = Math.round(progress * 100);

  const motivationalMessage =
    totalSaved >= goalAmount
      ? "¡Lo lograste! 🥳 Alcanzaste tu objetivo de ahorro. Kuri está MUY orgulloso de ti."
      : savedThisWeek > 0
      ? `Esta semana ahorraste $${savedThisWeek}. Cada pasito cuenta, Kuri está feliz contigo 🐾`
      : "No pasa nada si esta semana no ahorraste. Podemos empezar con $1 la próxima, lo importante es avanzar. 💚";

  return (
    <div className="min-h-screen px-6 py-6 text-white">
      {/* Volver */}
      <button
        onClick={onBack}
        className="mb-4 text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
      >
        ← Volver
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Tu objetivo de ahorro
      </h1>

      {/* Resumen numérico */}
      <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700 mb-4">
        <p className="text-sm text-slate-300">Meta total</p>
        <p className="text-2xl font-bold text-emerald-400">
          ${goalAmount.toFixed(2)}
        </p>

        <div className="mt-3 flex justify-between text-sm text-slate-200">
          <span>Ahorro acumulado</span>
          <span>${totalSaved.toFixed(2)}</span>
        </div>

        <div className="mt-1 flex justify-between text-xs text-slate-400">
          <span>Progreso</span>
          <span>{progressPercent}%</span>
        </div>

        {/* Barra de progreso */}
        <div className="mt-3 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-400 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Tarrito con moneditas */}
      <div className="flex flex-col md:flex-row gap-6 items-center mt-4">
        {/* Tarro */}
        <div className="flex-1 flex flex-col items-center">
          <p className="mb-2 text-sm text-slate-300">
            Así va llenándose tu tarrito:
          </p>

          <div className="relative w-32 h-52 md:w-40 md:h-60 bg-slate-900/70 rounded-[40px] border-4 border-amber-300 overflow-hidden flex items-end justify-center">
            {/* Parte llena del tarro */}
            <div
              className="w-full bg-gradient-to-t from-amber-400 via-amber-300/90 to-amber-200/60 transition-all"
              style={{ height: `${progressPercent}%` }}
            />

            {/* Moneditas flotando dentro */}
            <div className="absolute bottom-3 flex flex-wrap justify-center gap-1 px-2">
              <span className="text-lg">🪙</span>
              <span className="text-lg">🪙</span>
              {progressPercent > 20 && <span className="text-lg">🪙</span>}
              {progressPercent > 40 && <span className="text-lg">🪙</span>}
              {progressPercent > 60 && <span className="text-lg">🪙</span>}
              {progressPercent > 80 && <span className="text-lg">🪙</span>}
            </div>

            {/* Tapa del tarro */}
            <div className="absolute -top-4 w-20 h-4 bg-amber-300 rounded-full shadow-md" />
          </div>

          {/* Texto bajo el tarro */}
          <p className="mt-3 text-sm text-slate-300">
            Te faltan{" "}
            <span className="text-emerald-400 font-semibold">
              ${(goalAmount - totalSaved).toFixed(2)}
            </span>{" "}
            para lograr tu meta.
          </p>
        </div>

        {/* Lado derecho: Kuri + mensaje motivacional + monedas app */}
        <div className="flex-1 bg-slate-900/80 p-4 rounded-2xl border border-slate-700">
          <h2 className="text-lg font-semibold mb-2">Mensaje de Kuri 🐾</h2>
          <p className="text-sm text-slate-200 mb-4">{motivationalMessage}</p>

          <div className="bg-slate-800/80 rounded-xl p-3 text-sm">
            <p className="text-slate-300">
              Moneditas de la app acumuladas:
            </p>
            <p className="text-xl font-bold text-amber-300 mt-1">
              {appCoinsEarned} KuriCoins 🪙
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Podrás usarlas para comprar accesorios, fondos y premios para tu
              mascota.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
