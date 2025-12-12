import React, { useState } from "react";

export default function SavingsGoalScreen({
  onBack,
  onEarnCoins,
  savingsGoal,
  summary,
  monthlyChallenge,
  monthlyBudget,
}) {
  // Objetivo editable (inicial viene de props)
  const [goalInput, setGoalInput] = useState(
    savingsGoal ? String(savingsGoal) : "300"
  );
  const numericGoal = parseFloat(goalInput) || 0;

  // Semanas cumplidas
  const [weeksCompleted, setWeeksCompleted] = useState(0);

  // Recompensa larga
  const [longTermRewardClaimed, setLongTermRewardClaimed] = useState(false);

  // Parámetros de recompensa
  const WEEKLY_COINS = 5;
  const LONG_TERM_COINS = 50;

  // Meta semanal sugerida: dividir objetivo en ~6 meses
  const weeklyTarget =
    numericGoal > 0 ? numericGoal / (6 * 4) : 0;

  // Ahorro aproximado según semanas cumplidas
  const approximateSaved = weeksCompleted * weeklyTarget;

  const progress =
    numericGoal > 0 ? (approximateSaved / numericGoal) * 100 : 0;
  const clampedProgress = Math.min(progress, 100);
  const goalReached = clampedProgress >= 100;

  const spent = summary?.spentThisMonth ?? 0;
  const remaining = summary?.remaining ?? 0;

  const handleWeekCompleted = () => {
    if (!numericGoal || numericGoal <= 0) return;
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
      <div className="w-full max-w-[960px] px-4 py-5 md:px-8 md:py-6 flex flex-col gap-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <button
            className="text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
            onClick={onBack}
          >
            ← Volver
          </button>
          <h1 className="text-xl md:text-2xl font-bold">
            Tu objetivo de ahorro 🎯
          </h1>
          <div className="w-8" />
        </div>

        {/* RESUMEN RÁPIDO DEL MES */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 flex flex-col gap-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Presupuesto mensual</span>
            <span className="font-semibold text-emerald-300">
              ${monthlyBudget?.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-slate-300">Gastado este mes</span>
            <span>${spent.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-slate-300">Te queda</span>
            <span>${remaining.toFixed(2)}</span>
          </div>
        </section>

        {/* ZONA SUPERIOR: OBJETIVO + TARRITO */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
          {/* Objetivo y datos sugeridos */}
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-3">
              Meta que Kuri te sugiere 💚
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Objetivo total (USD)
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
                      / semana
                    </span>
                  ) : (
                    <span className="text-slate-400">
                      Define una meta para empezar.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Progreso numérico aproximado */}
            <div className="mt-1">
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
                  <span>Define un objetivo</span>
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

              {numericGoal > 0 && (
                <p className="mt-1 text-[11px] text-slate-400">
                  Ahorro aproximado:{" "}
                  <span className="text-emerald-300">
                    ${approximateSaved.toFixed(2)}
                  </span>
                </p>
              )}

              {goalReached && (
                <p className="mt-2 text-xs text-emerald-300">
                  🎉 ¡Llegaste a tu meta! Kuri está orgulloso de ti.
                </p>
              )}
            </div>
          </section>

          {/* Tarrito visual */}
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center">
            <h2 className="text-sm md:text-base font-semibold mb-2">
              Tarrito de ahorro 🫙
            </h2>

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
                  Tu tarrito va en{" "}
                  <span className="font-semibold text-emerald-300">
                    {clampedProgress.toFixed(1)}%
                  </span>
                  .
                </>
              ) : (
                "Pon una meta para empezar a llenarlo."
              )}
            </p>
          </section>
        </div>

        {/* PROGRESO SEMANAL */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm md:text-base font-semibold mb-1">
                Progreso semanal 💪
              </h2>
              <p className="text-xs text-slate-200 mb-1">
                Marca las semanas donde sentiste que cumpliste tu meta.
              </p>
              <p className="text-xs text-slate-300">
                Semanas cumplidas:{" "}
                <span className="font-semibold text-emerald-300">
                  {weeksCompleted}
                </span>
              </p>
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
              + 1 semana cumplida
            </button>
          </div>

          <p className="mt-2 text-[11px] text-slate-400">
            Cada semana cumplida:{" "}
            <span className="text-amber-300 font-semibold">
              +{WEEKLY_COINS} monedas
            </span>{" "}
            para tu Kuri.
          </p>
        </section>

        {/* RETO MENSUAL DE KURI (AQUÍ VA EL RETO) */}
        {monthlyChallenge && (
          <section className="bg-emerald-900/70 border border-emerald-300/60 rounded-2xl p-4">
            <h2 className="text-sm md:text-base font-semibold text-emerald-100 mb-1">
              {monthlyChallenge.title}
            </h2>
            <p className="text-xs text-emerald-50 mb-2">
              {monthlyChallenge.description}
            </p>
            <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${monthlyChallenge.progress}%`,
                  backgroundColor: "#fbbf24",
                }}
              />
            </div>
            <p className="mt-1 text-[11px] text-emerald-100">
              Progreso del reto: {monthlyChallenge.progress}%.
            </p>
            <p className="mt-1 text-[11px] text-emerald-200">
              Completarlo te acerca a recompensas reales y más moneditas 🪙✨
            </p>
          </section>
        )}

        {/* RECOMPENSA LARGO PLAZO */}
        <section className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                Bonus por hábito constante 🪙
              </h2>
              <p className="text-xs text-slate-200 mt-1">
                Si llegas al 100% de tu meta, puedes reclamar un bonus extra.
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
                ? "Recompensa reclamada ✅"
                : `Reclamar +${LONG_TERM_COINS} monedas`}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
