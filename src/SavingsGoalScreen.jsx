import React, { useState } from "react";

export default function SavingsGoalScreen({ onBack, onEarnCoins }) {
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState("");
  const [rewardClaimed, setRewardClaimed] = useState(false);

  const numericGoal = parseFloat(goal) || 0;
  const numericSaved = parseFloat(saved) || 0;

  const goalReached = numericGoal > 0 && numericSaved >= numericGoal;
  const progress =
    numericGoal > 0 ? Math.min((numericSaved / numericGoal) * 100, 120) : 0;

  const handleClaimReward = () => {
    if (!goalReached || rewardClaimed) return;
    // Por ejemplo 50 monedas
    onEarnCoins?.(50);
    setRewardClaimed(true);
  };

  return (
    <div className="min-h-screen px-6 py-6 text-white flex flex-col">
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
        Define cuánto quieres ahorrar y ve tu progreso. Cuando llegues a tu
        objetivo, Kuri te dará moneditas para desbloquear nuevas mascotas y
        accesorios. ✨
      </p>

      {/* Formulario objetivo */}
      <div className="bg-slate-900/75 border border-slate-700 rounded-2xl p-4 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Monto objetivo (USD)
            </label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
              placeholder="Ej: 200"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">
              Llevo ahorrado (USD)
            </label>
            <input
              type="number"
              value={saved}
              onChange={(e) => setSaved(e.target.value)}
              className="w-full rounded-xl bg-slate-800 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
              placeholder="Ej: 80"
            />
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] text-slate-300 mb-1">
            <span>Progreso</span>
            <span>
              {numericGoal > 0
                ? `${numericSaved.toFixed(2)} / ${numericGoal.toFixed(2)} USD`
                : "Define tu objetivo para empezar"}
            </span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${
                goalReached ? "bg-emerald-400" : "bg-emerald-500/80"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {goalReached && (
            <p className="mt-2 text-xs md:text-sm text-emerald-300">
              🎉 ¡Felicitaciones! Alcanzaste tu objetivo de ahorro.
            </p>
          )}
        </div>
      </div>

      {/* Recompensa de monedas */}
      <div className="bg-slate-900/75 border border-emerald-500/40 rounded-2xl p-4 mb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              Recompensa de Kuri
              <span>🪙</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-200 mt-1">
              Al cumplir tu objetivo puedes reclamar{" "}
              <span className="font-semibold text-amber-300">50 moneditas</span>{" "}
              para desbloquear mascotas y accesorios.
            </p>
          </div>

          <button
            onClick={handleClaimReward}
            disabled={!goalReached || rewardClaimed}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition
              ${
                goalReached && !rewardClaimed
                  ? "bg-emerald-400 text-slate-900 hover:bg-emerald-300"
                  : "bg-slate-700 text-slate-400 cursor-not-allowed"
              }`}
          >
            {rewardClaimed ? "Recompensa reclamada" : "Reclamar 50 monedas"}
          </button>
        </div>
      </div>

      {/* Crear tu propia mascota / IA */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-4 flex-1">
        <h2 className="text-lg font-semibold mb-2">
          Crea tu propia mascota virtual
        </h2>
        <p className="text-xs md:text-sm text-slate-200 mb-3">
          Cuando alcanzas tu objetivo de ahorro, desbloqueas la opción de crear
          una mascota única que te represente. Puedes diseñarla tú mismo o
          generar ideas usando inteligencia artificial. 💡
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
                Define color, forma, accesorios y personalidad. Ideal para que
                tu Kuri sea 100% tú.
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
            🔒 Esta sección se desbloquea al alcanzar tu objetivo de ahorro.
          </p>
        )}
      </div>
    </div>
  );
}
