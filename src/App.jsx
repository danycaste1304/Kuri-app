import React, { useState, useEffect } from "react";
import CustomizeScreen from "./CustomizeScreen";
import ExpensesScreen from "./ExpensesScreen";
import AdviceScreen from "./AdviceScreen";
import SavingsGoalScreen from "./SavingsGoalScreen";
import OnboardingScreen from "./OnboardingScreen";
import defaultPetImage from "./assets/Armadillo.png";
import fondo1 from "./assets/Fondo1.png";
import SplashScreen from "./SplashScreen";

/* ===========================================
   1. DATOS FICTICIOS COHERENTES (MVP)
   =========================================== */

const MOCK_USER = {
  name: "Daniela",
};

const MOCK_BANK = {
  bankName: "Banco Pichincha",
  last4: "1234",
};

const MOCK_MONTHLY_BUDGET = 400;
const MOCK_LAST_MONTH_SPENT = 420;

const MOCK_TRANSACTIONS = [
  { id: 1, description: "Uber", amount: 8.5, category: "Transporte", date: "2025-12-01" },
  { id: 2, description: "Netflix", amount: 10, category: "Entretenimiento", date: "2025-12-02" },
  { id: 3, description: "Almuerzo USFQ", amount: 7.8, category: "Comida", date: "2025-12-03" },
  { id: 4, description: "Supermaxi", amount: 85.0, category: "Supermercado", date: "2025-12-04" },
  { id: 5, description: "Cabify", amount: 6.0, category: "Transporte", date: "2025-12-05" },
  { id: 6, description: "Spotify", amount: 6.99, category: "Entretenimiento", date: "2025-12-05" },
  { id: 7, description: "Cena con amigos", amount: 34.0, category: "Comida", date: "2025-12-06" },
  { id: 8, description: "Farmacia", amount: 12.0, category: "Salud", date: "2025-12-07" },
  { id: 9, description: "Ropa", amount: 72.0, category: "Compras", date: "2025-12-09" },
  { id: 10, description: "Café", amount: 9.0, category: "Comida", date: "2025-12-10" },
  { id: 11, description: "Cine", amount: 21.0, category: "Entretenimiento", date: "2025-12-11" },
  { id: 12, description: "Panadería", amount: 9.0, category: "Comida", date: "2025-12-11" },
];

const MOCK_SAVINGS_GOAL = 80;

/* ===========================================
   2. MOODS DE KURI
   =========================================== */

const MOOD_THRESHOLDS = {
  HAPPY_MAX: 50,
  NEUTRAL_MAX: 90,
  WORRIED_MAX: 100,
};

const MOOD_CONFIG = {
  happy: {
    emoji: "✨",
    text: "¡Vamos súper bien este mes! Estoy muy orgulloso de ti 💚.",
  },
  neutral: {
    emoji: "😌",
    text: "Vamos bien, pero aún podemos mejorar un poquito juntos.",
  },
  worried: {
    emoji: "😟",
    text: "Estamos cerca de tu presupuesto… yo te ayudo a no pasarnos.",
  },
  sad: {
    emoji: "🥺",
    text: "Nos pasamos un poco… pero no pasa nada, lo ajustamos el próximo mes.",
  },
};

/* ===========================================
   3. LÓGICA FINANCIERA
   =========================================== */

function getMonthlySummary(transactions, monthlyBudget) {
  const spentThisMonth = transactions.reduce((sum, t) => sum + t.amount, 0);

  const percentage =
    monthlyBudget > 0
      ? Math.min(150, Math.round((spentThisMonth / monthlyBudget) * 100))
      : 0;

  return {
    spentThisMonth,
    remaining: Math.max(0, monthlyBudget - spentThisMonth),
    percentage,
  };
}

function getKuriMood(summary) {
  const { percentage } = summary;
  const { HAPPY_MAX, NEUTRAL_MAX, WORRIED_MAX } = MOOD_THRESHOLDS;

  if (percentage < HAPPY_MAX) return "happy";
  if (percentage < NEUTRAL_MAX) return "neutral";
  if (percentage <= WORRIED_MAX) return "worried";
  return "sad";
}

function calculateKuriLevel(transactions) {
  const xp = transactions.length * 10; // 10 XP por transacción
  const level = 1 + Math.floor(xp / 100);
  return { level, xp };
}

function generateMonthlyChallenge(lastMonthSpent, currentSpent) {
  if (!lastMonthSpent || lastMonthSpent <= 0) {
    return {
      id: "first-month",
      title: "Primer reto con Kuri 🐾",
      description: "Intenta registrar y revisar tus gastos este mes junto a Kuri.",
      targetType: "generic",
      targetValue: null,
      progress: 0,
    };
  }

  const targetReductionPercent = 10; // 10% menos que el mes anterior
  const targetSpend = lastMonthSpent * (1 - targetReductionPercent / 100);

  const progress =
    currentSpent <= 0 || currentSpent >= lastMonthSpent
      ? 0
      : Math.min(
          100,
          Math.round(
            ((lastMonthSpent - currentSpent) / (lastMonthSpent - targetSpend)) * 100
          )
        );

  return {
    id: "reduce-monthly-spend",
    title: "Reto mensual con Kuri 💛",
    description: `Gasta al menos un ${targetReductionPercent}% menos que el mes pasado.`,
    targetType: "reduce_spend",
    targetValue: targetSpend,
    progress: isNaN(progress) ? 0 : progress,
  };
}

/* ===========================================
   4. COMPONENTE PRINCIPAL
   =========================================== */

function App() {
  const [screen, setScreen] = useState("splash");
  const [petImageState, setPetImageState] = useState(defaultPetImage);
  const [currentPetId, setCurrentPetId] = useState("armadillo");

  const [coins, setCoins] = useState(40);
  const [ownedPets, setOwnedPets] = useState(["armadillo", "dragon"]);
  const [ownedAccessories, setOwnedAccessories] = useState(["sombrero"]);
  const [accessory, setAccessory] = useState(null);

  const [userProfile, setUserProfile] = useState(MOCK_USER);
  const [bankInfo, setBankInfo] = useState(MOCK_BANK);

  const [spendingAlert, setSpendingAlert] = useState(false);

  const [monthlyBudget, setMonthlyBudget] = useState(MOCK_MONTHLY_BUDGET);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [lastMonthSpent] = useState(MOCK_LAST_MONTH_SPENT);
  const [savingsGoal, setSavingsGoal] = useState(MOCK_SAVINGS_GOAL);

  const summary = getMonthlySummary(transactions, monthlyBudget);
  const kuriMood = getKuriMood(summary);
  const { level: kuriLevel, xp: kuriXP } = calculateKuriLevel(transactions);
  const monthlyChallenge = generateMonthlyChallenge(
    lastMonthSpent,
    summary.spentThisMonth
  );

  useEffect(() => {
    if (screen !== "home") return;

    const timer = setTimeout(() => {
      if (summary.percentage >= 90) {
        setSpendingAlert(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, [screen, summary.percentage]);

  // 🎯 ACCESORIOS RESPONSIVOS
  const accessoryStyles = {
    armadillo: {
      sombrero: { top: "6%", left: "50%", width: "55%", transform: "translateX(-50%)" },
      diadema: { top: "2%", left: "58%", width: "80%", transform: "translateX(-50%)" },
      lazo: { top: "18%", left: "50%", width: "35%", transform: "translateX(-50%)" },
      guitarra: { top: "55%", left: "60%", width: "60%", transform: "translateX(-50%)" },
    },
    conejo: {
      sombrero: { top: "15%", left: "55%", width: "50%", transform: "translateX(-50%)" },
      diadema: { top: "3%", left: "50%", width: "60%", transform: "translateX(-50%)" },
      lazo: { top: "20%", left: "50%", width: "35%", transform: "translateX(-50%)" },
      guitarra: { top: "62%", left: "50%", width: "60%", transform: "translateX(-50%)" },
    },
    buho: {
      sombrero: { top: "2%", left: "50%", width: "52%", transform: "translateX(-50%)" },
      diadema: { top: "4%", left: "50%", width: "58%", transform: "translateX(-50%)" },
      lazo: { top: "22%", left: "50%", width: "33%", transform: "translateX(-50%)" },
      guitarra: { top: "60%", left: "50%", width: "60%", transform: "translateX(-50%)" },
    },
    dragon: {
      sombrero: { top: "4%", left: "40%", width: "48%", transform: "translateX(-50%)" },
      diadema: { top: "2%", left: "47%", width: "65%", transform: "translateX(-50%)" },
      lazo: { top: "12%", left: "40%", width: "32%", transform: "translateX(-50%)" },
      guitarra: { top: "50%", left: "40%", width: "62%", transform: "translateX(-50%)" },
    },
    cerdito: {
      sombrero: { top: "10%", left: "50%", width: "50%", transform: "translateX(-50%)" },
      diadema: { top: "6%", left: "50%", width: "55%", transform: "translateX(-50%)" },
      lazo: { top: "24%", left: "50%", width: "34%", transform: "translateX(-50%)" },
      guitarra: { top: "63%", left: "50%", width: "60%", transform: "translateX(-50%)" },
    },
    zorro: {
      sombrero: { top: "3%", left: "50%", width: "52%", transform: "translateX(-50%)" },
      diadema: { top: "6%", left: "50%", width: "58%", transform: "translateX(-50%)" },
      lazo: { top: "23%", left: "50%", width: "34%", transform: "translateX(-50%)" },
      guitarra: { top: "61%", left: "50%", width: "60%", transform: "translateX(-50%)" },
    },
    default: {
      sombrero: { top: "5%", left: "50%", width: "50%", transform: "translateX(-50%)" },
      diadema: { top: "7%", left: "50%", width: "58%", transform: "translateX(-50%)" },
      lazo: { top: "25%", left: "50%", width: "34%", transform: "translateX(-50%)" },
      guitarra: { top: "60%", left: "50%", width: "58%", transform: "translateX(-50%)" },
    },
  };

  const displayName = userProfile?.name || "Usuario";
  const initials = displayName.charAt(0).toUpperCase();
  const bankLabel = bankInfo
    ? `${bankInfo.bankName} · •••• ${bankInfo.last4}`
    : "Banco vinculado · •••• 1234";

  const moodData = MOOD_CONFIG[kuriMood] || MOOD_CONFIG.neutral;

  return (
    <div
      className="min-h-[100dvh] w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${fondo1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* CONTENIDO PRINCIPAL: ahora ocupa TODO el ancho */}
      <div className="w-full min-h-[100dvh] bg-black/45 flex flex-col">
        {/* SPLASH */}
        {screen === "splash" && (
          <SplashScreen onFinish={() => setScreen("onboarding")} />
        )}

        {/* ONBOARDING */}
        {screen === "onboarding" && (
          <div className="min-h-[100dvh] w-full bg-black/70 flex items-center justify-center px-4">
            <OnboardingScreen
              onComplete={(user, bank) => {
                setUserProfile(user || MOCK_USER);
                setBankInfo(bank || MOCK_BANK);
                setScreen("home");
              }}
            />
          </div>
        )}

        {/* HOME */}
        {screen === "home" && (
          <div className="flex-1 w-full flex flex-col bg-black/40">
            {/* HEADER */}
            <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 gap-3">
              {/* IZQUIERDA: CUENTA VINCULADA */}
              <div className="flex items-center gap-2 max-w-[65%]">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-emerald-400/90 flex items-center justify-center border border-emerald-300 text-slate-950 font-bold text-xs md:text-sm">
                  <span>{initials}</span>
                </div>

                <div className="flex flex-col overflow-hidden">
                  <span className="text-[10px] md:text-[11px] text-slate-300">
                    Cuenta vinculada
                  </span>

                  <span className="text-[11px] md:text-xs font-semibold text-slate-50 truncate">
                    {bankLabel}
                  </span>
                </div>
              </div>

              {/* DERECHA: MONEDAS + NIVEL */}
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 bg-slate-900/80 border border-amber-300/70 rounded-full px-3 py-1 shadow-md">
                  <span className="text-lg">🪙</span>
                  <span className="text-sm md:text-base font-semibold text-amber-300">
                    {coins}
                  </span>
                </div>
                <div className="text-right leading-tight">
                  <span className="block text-[10px] text-emerald-200">
                    Nivel de Kuri
                  </span>
                  <span className="text-[11px] md:text-xs font-semibold text-emerald-300">
                    Lv. {kuriLevel} · {kuriXP} XP
                  </span>
                </div>
              </div>
            </header>

            {/* TARJETA RESUMEN FINANCIERO */}
            <div className="px-4 md:px-6 mt-1 flex flex-col gap-2">
              <div className="bg-slate-900/80 border border-emerald-400/40 rounded-2xl px-3 py-3 shadow-md">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xs md:text-sm font-semibold text-emerald-100">
                    Tu mes con Kuri 💛
                  </h2>
                  <span className="text-[11px] text-emerald-200">
                    Presupuesto: ${monthlyBudget.toFixed(2)}
                  </span>
                </div>
                <p className="text-[11px] md:text-xs text-slate-200">
                  Gastado:{" "}
                  <span className="font-semibold">
                    ${summary.spentThisMonth.toFixed(2)}
                  </span>{" "}
                  · Te queda:{" "}
                  <span className="font-semibold">
                    ${summary.remaining.toFixed(2)}
                  </span>
                </p>

                <div className="mt-2 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${summary.percentage}%`,
                      backgroundColor:
                        summary.percentage <= 80
                          ? "#4ade80"
                          : summary.percentage <= 100
                          ? "#facc15"
                          : "#f97373",
                    }}
                  />
                </div>
                <p className="mt-1 text-[10px] text-slate-300">
                  Has usado el {summary.percentage}% de tu presupuesto.
                </p>
              </div>
            </div>

            {/* NOTIFICACIÓN */}
            {spendingAlert && (
              <div className="px-4 md:px-6 mt-2">
                <div className="flex items-start gap-3 bg-slate-900/90 border border-amber-300/60 rounded-2xl px-3 py-2 shadow-md shadow-amber-500/20">
                  <div className="text-xl pt-0.5">🐾</div>
                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-amber-100">
                      Oye, ya usamos casi todo tu presupuesto de este mes. A
                      veces te mereces un gustito 💚, pero cuidemos tu ahorro…
                      y también a mí.
                    </p>
                  </div>
                  <button
                    onClick={() => setSpendingAlert(false)}
                    className="ml-2 text-[11px] text-amber-200/80 hover:text-amber-100"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}

            {/* MAIN: BURBUJA + KURI */}
              <main className="flex-1 flex flex-col items-center px-3 pb-4 pt-1 md:px-4 md:pb-6">
                <div className="relative flex flex-col items-center w-full max-w-md flex-1">
                  
                  {/* BURBUJA DE TEXTO CON MOOD */}
                  <div className="mt-6 md:mt-8 mb-2 w-full flex justify-center px-3 animate-fadeIn">
                    <div className="relative max-w-sm bg-emerald-700/40 backdrop-blur-sm border border-emerald-300/50 rounded-2xl px-4 py-3 shadow-lg shadow-emerald-500/30">
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-emerald-700/40 border-l border-b border-emerald-300/50 rotate-45 rounded-bl-sm" />
                      <h1 className="text-base md:text-lg font-bold text-emerald-100">
                        ¡Hola! Soy <span className="text-emerald-300">Kuri</span> 🐾 {moodData.emoji}
                      </h1>
                      <p className="mt-1 text-xs md:text-sm text-emerald-50 leading-relaxed">
                        {moodData.text}
                      </p>
                    </div>
                  </div>

                  {/* ESCENARIO / MASCOTA */}
                  <div className="relative w-full flex-1">
                    <div
                      className="
                        absolute inset-x-0
                        bottom-[3rem]        /* 🔽 KURI MÁS ABAJO */
                        md:bottom-[-1rem]  
                        lg:bottom-[-2rem]  
                        flex justify-center
                      "
                    >
                      <div
                        className="
                          relative
                          w-[13rem] h-[16rem]     /* 🔽 KURI MÁS PEQUEÑO */
                          md:w-[15rem] md:h-[18rem]
                          flex items-end justify-center
                        "
                      >
                        {/* MASCOTA */}
                        <img
                          src={petImageState}
                          alt="Mascota financiera"
                          className="w-full h-full object-contain object-bottom drop-shadow-[0_0_18px_rgba(0,255,200,0.35)]" 
                        />

                        {/* ACCESORIO */}
                        {accessory && (
                          <img
                            src={accessory.img}
                            alt={accessory.label}
                            className="absolute object-contain"
                            style={
                              (accessoryStyles[currentPetId] &&
                                accessoryStyles[currentPetId][accessory.id]) ||
                              accessoryStyles.default[accessory.id]
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </main>


            {/* NAV */}
            <nav className="w-full px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-5 flex justify-center">
              <div className="w-full max-w-md bg-slate-900/85 border border-slate-700 rounded-3xl px-5 py-3 flex justify-between gap-4 shadow-lg backdrop-blur-md">
                {[
                  { label: "Gastos", icon: "❤️", action: () => setScreen("expenses") },
                  { label: "Consejos", icon: "💡", action: () => setScreen("advice") },
                  { label: "Tu objetivo", icon: "🎯", action: () => setScreen("savings") },
                  { label: "Mascota", icon: "🐾", action: () => setScreen("customize") },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    onClick={btn.action}
                    className="flex flex-col items-center text-[11px] md:text-sm text-slate-200 hover:text-emerald-300 transition"
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-800 flex items-center justify-center mb-1 border border-slate-700">
                      <span className="text-xl md:text-2xl">{btn.icon}</span>
                    </div>
                    {btn.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}

        {/* PERSONALIZAR */}
        {screen === "customize" && (
          <div className="min-h-[100dvh] w-full bg-black/70">
            <CustomizeScreen
              currentAccessory={accessory}
              selectedPetId={currentPetId}
              coins={coins}
              ownedPets={ownedPets}
              ownedAccessories={ownedAccessories}
              onBack={() => setScreen("home")}
              onSelectPet={(petObj) => {
                setPetImageState(petObj.img);
                setCurrentPetId(petObj.id);
                setScreen("home");
              }}
              onBuyPet={(petObj) => {
                if (ownedPets.includes(petObj.id)) return;
                if (coins < petObj.price)
                  return alert("No tienes suficientes monedas.");
                setCoins((c) => c - petObj.price);
                setOwnedPets((prev) => [...prev, petObj.id]);
              }}
              onSelectAccessory={(acc) => {
                setAccessory(acc);
                setScreen("home");
              }}
              onBuyAccessory={(acc) => {
                if (ownedAccessories.includes(acc.id)) return;
                if (coins < acc.price)
                  return alert("No tienes suficientes monedas.");
                setCoins((c) => c - acc.price);
                setOwnedAccessories((prev) => [...prev, acc.id]);
                setAccessory(acc);
                setScreen("home");
              }}
            />
          </div>
        )}

        {/* RESUMEN DE GASTOS */}
        {screen === "expenses" && (
          <div className="min-h-[100dvh] w-full bg-black/70">
            <ExpensesScreen
              onBack={() => setScreen("home")}
              transactions={transactions}
            />
          </div>
        )}

        {/* CONSEJOS */}
        {screen === "advice" && (
          <div className="min-h-[100dvh] w-full bg-black/70">
            <AdviceScreen
              onBack={() => setScreen("home")}
              summary={summary}
              kuriMood={kuriMood}
              monthlyChallenge={monthlyChallenge}
            />
          </div>
        )}

        {/* AHORRO / TU OBJETIVO */}
        {screen === "savings" && (
          <div className="min-h-[100dvh] w-full bg-black/70">
            <SavingsGoalScreen
              onBack={() => setScreen("home")}
              onEarnCoins={(amount) => setCoins((c) => c + amount)}
              savingsGoal={savingsGoal}
              summary={summary}
              monthlyChallenge={monthlyChallenge}
              monthlyBudget={monthlyBudget}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
