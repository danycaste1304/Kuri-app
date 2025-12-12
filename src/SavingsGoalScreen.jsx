import React, { useState } from "react";

export default function SavingsGoalScreen({
  onBack,
  onEarnCoins,
  savingsGoal,
  summary,
  monthlyChallenge,
  monthlyBudget,
}) {
  const spent = summary?.spentThisMonth ?? 0;
  const remaining = summary?.remaining ?? 0;

  // ====== META LARGO PLAZO ======
  const [longTermGoalInput, setLongTermGoalInput] = useState(
    savingsGoal ? String(savingsGoal) : "300"
  );
  const longTermGoal = parseFloat(longTermGoalInput) || 0;

  // 👇 ahora el mínimo son 3 meses
  const HORIZON_STEPS = [3, 5, 6, 9, 12];
  const [horizonIndex, setHorizonIndex] = useState(0);
  const currentHorizonMonths = HORIZON_STEPS[horizonIndex];
  const nextHorizonMonths =
    HORIZON_STEPS[Math.min(horizonIndex + 1, HORIZON_STEPS.length - 1)];

  // ====== META CORTO PLAZO ======
  const [shortTermMode, setShortTermMode] = useState("week"); // "week" | "month"

  const baseSuggestedShortTerm =
    longTermGoal > 0
      ? shortTermMode === "week"
        ? longTermGoal / (currentHorizonMonths * 4)
        : longTermGoal / currentHorizonMonths
      : 0;

  const [shortTermGoalInput, setShortTermGoalInput] = useState(
    baseSuggestedShortTerm ? String(baseSuggestedShortTerm.toFixed(2)) : ""
  );

  const shortTermGoal =
    parseFloat(shortTermGoalInput) ||
    (baseSuggestedShortTerm > 0 ? baseSuggestedShortTerm : 0);

  // 👉 cuando cambiamos de weekly a monthly, recalculamos el valor sugerido
  const handleChangeShortTermMode = (mode) => {
    setShortTermMode(mode);

    if (longTermGoal > 0) {
      const newSuggested =
        mode === "week"
          ? longTermGoal / (currentHorizonMonths * 4)
          : longTermGoal / currentHorizonMonths;

      setShortTermGoalInput(newSuggested.toFixed(2));
    }
  };

  // ====== HÁBITO / TARRITO ======
  const [periodsCompleted, setPeriodsCompleted] = useState(0);

  const WEEKLY_COINS = 5;

  const approximateSaved = periodsCompleted * shortTermGoal;
  const progress =
    longTermGoal > 0 ? (approximateSaved / longTermGoal) * 100 : 0;
  const clampedProgress = Math.min(progress, 100);
  const goalReached = clampedProgress >= 100;

  const handlePeriodCompleted = () => {
    if (!shortTermGoal || shortTermGoal <= 0) return;
    setPeriodsCompleted((prev) => prev + 1);
    onEarnCoins?.(WEEKLY_COINS);
  };

  // ====== BONUS HÁBITO / CUPÓN ======
  const [couponClaimed, setCouponClaimed] = useState(false);

  const handleClaimCoupon = () => {
    if (!goalReached || couponClaimed) return;
    setCouponClaimed(true);

    // cuando reclamas, alargamos el horizonte (3 → 5 → 6 → ...)
    if (horizonIndex < HORIZON_STEPS.length - 1) {
      setHorizonIndex((idx) => idx + 1);
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-black/80 text-white flex justify-center">
      {/* 👇 ESTE DIV ES EL QUE SCROLLEA */}
      <div className="w-full max-w-[960px] px-4 py-5 md:px-8 md:py-6 flex flex-col gap-4 overflow-y-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <button
            className="text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
            onClick={onBack}
          >
            ← Volver
          </button>
          <h1 className="text-xl md:text-2xl font-bold">
            Tus objetivos de ahorro 🎯
          </h1>
          <div className="w-8" />
        </div>

        {/* RESUMEN RÁPIDO DEL MES */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 flex flex-col gap-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Presupuesto mensual</span>
            <span className="font-semibold text-emerald-300">
              ${(monthlyBudget ?? 0).toFixed(2)}
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

        {/* BLOQUE LARGO PLAZO + TARRITO */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-4">
          {/* LARGO PLAZO */}
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
            <h2 className="text-lg font-semibold mb-3">
              Meta de largo plazo (Kuri) 💚
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Objetivo total sugerido (editable)
                </label>
                <input
                  type="number"
                  value={longTermGoalInput}
                  onChange={(e) => setLongTermGoalInput(e.target.value)}
                  className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                  placeholder="Ej: 300"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">
                  Plazo actual
                </label>
                <div className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm flex flex-col">
                  <span>
                    {currentHorizonMonths}{" "}
                    {currentHorizonMonths === 1 ? "mes" : "meses"}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Cuando mantienes el hábito, Kuri va ampliando el plazo:
                    luego {nextHorizonMonths} meses y más.
                  </span>
                </div>
              </div>
            </div>

            {/* Progreso aproximado hacia meta larga */}
            <div className="mt-1">
              <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                <span>Progreso hacia tu meta larga</span>
                {longTermGoal > 0 ? (
                  <span>
                    Veces que cumpliste tu meta corta:{" "}
                    <span className="font-semibold text-emerald-300">
                      {periodsCompleted}
                    </span>
                  </span>
                ) : (
                  <span>Define una meta para empezar</span>
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
              {longTermGoal > 0 && (
                <p className="mt-1 text-[11px] text-slate-400">
                  Ahorro aproximado asociado:{" "}
                  <span className="text-emerald-300">
                    ${approximateSaved.toFixed(2)}
                  </span>
                </p>
              )}
              {goalReached && (
                <p className="mt-2 text-xs text-emerald-300">
                  🎉 ¡Comportamiento de ahorro súper sólido!
                </p>
              )}
            </div>
          </section>

          {/* TARRITO */}
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 flex flex-col items-center justify-center">
            <h2 className="text-sm md:text-base font-semibold mb-2">
              Tarrito de ahorro 🫙
            </h2>

            <div className="relative w-20 h-40 md:w-24 md:h-48 mx-auto my-2 flex items-end justify-center">
              <div className="absolute inset-0 rounded-3xl border-2 border-emerald-300/80 bg-slate-950/60 overflow-hidden shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                <div
                  className={`absolute bottom-0 left-0 w-full transition-all duration-700 ${
                    goalReached ? "bg-emerald-300" : "bg-emerald-400/90"
                  }`}
                  style={{ height: `${clampedProgress || 0}%` }}
                />
              </div>

              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-3 md:w-16 md:h-3.5 rounded-t-xl bg-slate-200/90 border border-slate-400" />
            </div>

            <p className="text-xs text-slate-200 mt-2 text-center">
              {longTermGoal > 0 ? (
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
            <p className="mt-1 text-[10px] text-slate-400 text-center">
              (Demo: tú marcas cuando cumples la meta. En la app final, Kuri lo
              llena solo cuando detecta que sí cumpliste.)
            </p>
          </section>
        </div>

        {/* META CORTO PLAZO */}
        <section className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <div>
              <h2 className="text-sm md:text-base font-semibold mb-1">
                Meta de corto plazo ⚡
              </h2>
              <p className="text-xs text-slate-300">
                Kuri te arma una meta corta que puedes ajustar.
              </p>
            </div>

            <div className="flex gap-2 text-xs">
              <button
                className={`px-3 py-1 rounded-full border ${
                  shortTermMode === "week"
                    ? "bg-emerald-400 text-slate-900 border-emerald-300"
                    : "bg-slate-800 text-slate-200 border-slate-600"
                }`}
                onClick={() => handleChangeShortTermMode("week")}
              >
                Meta semanal
              </button>
              <button
                className={`px-3 py-1 rounded-full border ${
                  shortTermMode === "month"
                    ? "bg-emerald-400 text-slate-900 border-emerald-300"
                    : "bg-slate-800 text-slate-200 border-slate-600"
                }`}
                onClick={() => handleChangeShortTermMode("month")}
              >
                Meta mensual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Meta corta sugerida ({shortTermMode === "week" ? "semana" : "mes"})
              </label>
              <input
                type="number"
                value={
                  shortTermGoalInput ||
                  (shortTermGoal ? shortTermGoal.toFixed(2) : "")
                }
                onChange={(e) => setShortTermGoalInput(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
                placeholder={
                  shortTermMode === "week" ? "Ej: 15 USD/sem" : "Ej: 60 USD/mes"
                }
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Basado en tus datos, pero siempre puedes ajustarla.
              </p>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">
                Veces que cumpliste tu meta corta
              </label>
              <div className="flex gap-2 items-center">
                <div className="flex-1 rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm">
                  {periodsCompleted}
                </div>
                <button
                  onClick={handlePeriodCompleted}
                  disabled={!shortTermGoal || shortTermGoal <= 0}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition
                    ${
                      shortTermGoal > 0
                        ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                        : "bg-slate-700 text-slate-400 cursor-not-allowed"
                    }`}
                >
                  + 1 meta cumplida
                </button>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Cada vez que marcas una meta cumplida, ganas{" "}
                <span className="text-amber-300 font-semibold">
                  +{WEEKLY_COINS} monedas
                </span>{" "}
                para tu Kuri.
              </p>
            </div>
          </div>
        </section>

        {/* RETO MENSUAL DE KURI */}
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
          </section>
        )}

        {/* BONUS HÁBITO = CUPÓN */}
        <section className="bg-slate-900/80 border border-emerald-500/40 rounded-2xl p-4 mb-2">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm md:text-base font-semibold flex items-center gap-2">
                Bonus por hábito constante 🎁
              </h2>
              <p className="text-xs text-slate-200 mt-1">
                Si llegas al 100% de tu meta larga, desbloqueas un cupón real.
              </p>
              <p className="text-[11px] text-emerald-200 mt-1">
                Ejemplo de demo:{" "}
                <span className="font-semibold">
                  cupón 15% en Sudan Coffee ☕
                </span>{" "}
                o en marcas aliadas.
              </p>
            </div>

            <button
              onClick={handleClaimCoupon}
              disabled={!goalReached || couponClaimed}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition
                ${
                  goalReached && !couponClaimed
                    ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
            >
              {couponClaimed
                ? "Cupón desbloqueado ✅"
                : "Desbloquear cupón de sponsor"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
