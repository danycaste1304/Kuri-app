import React, { useState } from "react";

export default function SavingsGoalScreen({ onBack, onEarnCoins }) {
  
  // Objetivo sugerido (podrías cambiar el valor inicial si quieres)
  const [goalInput, setGoalInput] = useState("300"); // USD
  const numericGoal = parseFloat(goalInput) || 0;

  // Semanas en las que el usuario cumplió su objetivo semanal
  const [weeksCompleted, setWeeksCompleted] = useState(0);

  // Recompensa grande por objetivo largo plazo
  const [longTermRewardClaimed, setLongTermRewardClaimed] = useState(false);

  // Parámetros de recompensa (ajustables)
  const WEEKLY_COINS = 5;
  const LONG_TERM_COINS = 50;

  // Meta semanal sugerida: repartimos el objetivo en 12 meses * 4 semanas
  const weeklyTarget =
    numericGoal > 0 ? numericGoal / (6 * 4) : 0; // muy aproximado, pero suficiente para un MVP

  // Ahorro "simulado" acumulado según semanas cumplidas
  const approximateSaved = weeksCompleted * weeklyTarget;

  const progress =
    numericGoal > 0 ? (approximateSaved / numericGoal) * 100 : 0;
  const clampedProgress = Math.min(progress, 100);
  const goalReached = clampedProgress >= 100;

  const handleWeekCompleted = () => {
    if (!numericGoal || numericGoal <= 0) return;

    // En la vida real esto lo marcaría el backend al ver tus gastos,
    // aquí solo simulamos con un botón.
    setWeeksCompleted((prev) => prev + 1);
    onEarnCoins?.(WEEKLY_COINS);
  };

  const handleClaimLongTermReward = () => {
    if (!goalReached || longTermRewardClaimed) return;
    onEarnCoins?.(LONG_TERM_COINS);
    setLongTermRewardClaimed(true);
  };

  return (
    <div className="min-h-screen w-full bg-black/80 text-white flex justify-center">
      <div className="w-full max-w-[960px] px-4 py-5 md:px-8 md:py-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          className="text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
          onClick={onBack}
        >
          ← Volver
        </button>
        <h1 className="text-xl md:text-2xl font-bold">Tu objetivo de ahorro</h1>
      </div>

      <p className="text-sm md:text-base text-slate-200 mb-4">
        Kuri analiza tus gastos del banco y te propone un{" "}
        <span className="font-semibold text-emerald-300">
          objetivo de ahorro a largo plazo
        </span>{" "}
        y una meta semanal alcanzable. Cada semana que cumples, tu tarrito se
        llena, ganas moneditas y te acercas a desbloquear nuevas recompensas.
      </p>

      {/* Zona superior: objetivo + tarrito */}
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-4 mb-5">
        {/* Objetivo y datos sugeridos */}
        <div className="bg-slate-900/75 border border-slate-700 rounded-2xl p-4">
          <h2 className="text-lg font-semibold mb-3">
            Objetivo sugerido por Kuri
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Objetivo de ahorro a largo plazo (USD)
              </label>
              <input
                type="number"
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder="Ej: 300"
              />
              
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Meta semanal sugerida
              </label>
              <div className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm flex items-center">
                {numericGoal > 0 ? (
                  <span>
                    ~{" "}
                    <span className="font-semibold text-emerald-300">
                      {weeklyTarget.toFixed(2)} USD
                    </span>{" "}
                    por semana
                  </span>
                ) : (
                  <span className="text-slate-400">
                    Define un objetivo para ver la meta semanal.
                  </span>
                )}
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Calculada a partir de tu objetivo semestral para que sea alcanzable.
              </p>
            </div>
          </div>

          {/* Progreso numérico aproximado */}
          <div className="mt-2">
            <div className="flex justify-between text-[11px] text-slate-300 mb-1">
              <span>Progreso hacia tu objetivo</span>
              {numericGoal > 0 ? (
                <span>
                  Semanas cumplidas:{" "}
                  <span className="font-semibold text-emerald-300">
                    {weeksCompleted}
                  </span>
                </span>
              ) : (
                <span>Define un objetivo para comenzar</span>
              )}
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  goalReached ? "bg-emerald-400" : "bg-emerald-500/80"
                }`}
                style={{ width: `${Math.min(progress, 120)}%` }}
              />
            </div>

            {goalReached && (
              <p className="mt-2 text-xs md:text-sm text-emerald-300">
                🎉 ¡Tu patrón de ahorro sostenido alcanzó el objetivo que Kuri
                te propuso!
              </p>
            )}
          </div>
        </div>

        {/* Tarrito visual */}
        <div className="bg-slate-900/75 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center">
          <h2 className="text-sm md:text-base font-semibold mb-2">
            Tarrito de ahorro
          </h2>
          <p className="text-[11px] md:text-xs text-slate-300 text-center mb-3">
            Cada semana que cumples tu meta, el tarrito se llena un poco más.  
            Cuando se llene del todo, desbloqueas recompensas especiales. 🫙
          </p>

          <div className="relative w-20 h-40 md:w-24 md:h-48 mx-auto my-2 flex items-end justify-center">
            {/* Contorno del tarro */}
            <div className="absolute inset-0 rounded-3xl border-2 border-emerald-300/80 bg-slate-950/60 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              {/* Líquido */}
              <div
                className={`absolute bottom-0 left-0 w-full transition-all duration-700 ${
                  goalReached ? "bg-emerald-300" : "bg-emerald-400/90"
                }`}
                style={{ height: `${clampedProgress || 0}%` }}
              />
            </div>

            {/* Tapita */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-3 md:w-16 md:h-3.5 rounded-t-xl bg-slate-200/90 border border-slate-400" />
          </div>

          <p className="text-xs text-slate-200 mt-2 text-center">
            {numericGoal > 0 ? (
              <>
                Tu tarrito está aproximadamente al{" "}
                <span className="font-semibold text-emerald-300">
                  {clampedProgress.toFixed(1)}%
                </span>{" "}
                según las semanas que has cumplido.
              </>
            ) : (
              "Define un objetivo para empezar a llenar tu tarrito."
            )}
          </p>
        </div>
      </div>

      {/* Ahorro semanal (sin ingresar montos manuales) */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 mb-5">
        <h2 className="text-lg font-semibold mb-2">Progreso semanal</h2>
        <p className="text-xs md:text-sm text-slate-200 mb-3">
          Cada semana, Kuri revisa tus gastos y comprueba si lograste ahorrar al
          menos la meta sugerida. En esta versión, puedes simularlo marcando las
          semanas que cumpliste tu objetivo. 💚
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-sm text-slate-100">
              Semanas cumplidas:{" "}
              <span className="font-semibold text-emerald-300">
                {weeksCompleted}
              </span>
            </p>
            {numericGoal > 0 && weeklyTarget > 0 && (
              <p className="text-[11px] text-slate-400 mt-1">
                Ahorro aproximado asociado: ~{" "}
                <span className="text-emerald-300">
                  {(weeksCompleted * weeklyTarget).toFixed(2)} USD
                </span>
              </p>
            )}
          </div>

          <button
            onClick={handleWeekCompleted}
            disabled={!numericGoal || numericGoal <= 0}
            className={`md:w-auto w-full px-4 py-2 rounded-xl text-sm font-semibold transition
              ${
                numericGoal > 0
                  ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
          >
            Marcar semana como cumplida
          </button>
        </div>

        <p className="mt-2 text-[11px] text-slate-400">
          Cada semana cumplida te da{" "}
          <span className="text-amber-300 font-semibold">
            +{WEEKLY_COINS} monedas
          </span>{" "}
          para accesorios y mascotas.
        </p>
      </div>

      {/* Recompensa de objetivo largo plazo */}
      <div className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-4 mb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Recompensa de Kuri (largo plazo)
              <span>🪙</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-200 mt-1">
              Cuando mantienes tu hábito de ahorro y alcanzas el objetivo que
              Kuri te propuso, puedes reclamar una recompensa extra de{" "}
              <span className="font-semibold text-amber-300">
                {LONG_TERM_COINS} moneditas
              </span>
              .
            </p>
          </div>

          <button
            onClick={handleClaimLongTermReward}
            disabled={!goalReached || longTermRewardClaimed}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition
              ${
                goalReached && !longTermRewardClaimed
                  ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
          >
            {longTermRewardClaimed
              ? "Recompensa reclamada"
              : "Reclamar recompensa"}
          </button>
        </div>
      </div>

      {/* Crear tu propia mascota / IA */}
      <div className="bg-slate-900/85 border border-slate-700 rounded-2xl p-4 flex-1">
        <h2 className="text-lg font-semibold mb-2">
          Crea tu propia mascota virtual
        </h2>
        <p className="text-xs md:text-sm text-slate-200 mb-3">
          Cuando mantienes tu ahorro y cumples el objetivo anual de Kuri, desbloqueas
          la opción de crear una mascota única. Puedes diseñarla tú mismo o
          generar ideas con inteligencia artificial. 💡
        </p>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-3 mt-2 ${
            !goalReached ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="bg-slate-950/60 border border-slate-700 rounded-xl p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-1">
                Diseñar mi propia mascota
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                Elige colores, estilo, accesorios y personalidad. Ideal para que
                tu Kuri sea 100% tuyo.
              </p>
            </div>
            <button
              className="mt-1 w-full py-2 rounded-lg bg-emerald-400 text-slate-950 text-xs font-semibold hover:bg-emerald-300 transition"
              onClick={() =>
                alert("Aquí podrías abrir un editor visual en el futuro 😊")
              }
            >
              Empezar diseño
            </button>
          </div>

          <div className="bg-slate-950/60 border border-slate-700 rounded-xl p-3 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold mb-1">
                Usar inteligencia artificial
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                Describe tu estilo (gamer, minimalista, kawaii, etc.) y una IA
                genera propuestas de mascota para ti.
              </p>
            </div>
            <button
              className="mt-1 w-full py-2 rounded-lg bg-slate-700 text-slate-300 text-xs font-semibold cursor-not-allowed"
              onClick={() =>
                alert("Funcionalidad de IA pendiente de implementar 🚀")
              }
            >
              Usar IA (próximamente)
            </button>
          </div>
        </div>

        {!goalReached && (
          <p className="mt-3 text-[11px] text-slate-400">
            🔒 Esta sección se desbloquea cuando cumples el objetivo de ahorro
            que Kuri te propuso.
          </p>
        )}
      </div>
    </div>
    </div>
  );
}
