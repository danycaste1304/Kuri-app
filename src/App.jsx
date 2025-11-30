import React, { useState, useEffect } from "react";
import CustomizeScreen from "./CustomizeScreen";
import ExpensesScreen from "./ExpensesScreen";
import AdviceScreen from "./AdviceScreen";
import SavingsGoalScreen from "./SavingsGoalScreen";
import OnboardingScreen from "./OnboardingScreen";
import defaultPetImage from "./assets/Armadillo.png";
import fondo1 from "./assets/Fondo1.png";
import SplashScreen from "./SplashScreen";

function App() {
  const [screen, setScreen] = useState("splash");
  const [petImageState, setPetImageState] = useState(defaultPetImage);
  const [currentPetId, setCurrentPetId] = useState("armadillo");

  // 🪙 Monedas iniciales
  const [coins, setCoins] = useState(40);

  // 🐾 Mascotas disponibles desde el inicio
  const [ownedPets, setOwnedPets] = useState(["armadillo", "dragon"]);

  // 🎁 Accesorios disponibles (sombrero gratis)
  const [ownedAccessories, setOwnedAccessories] = useState(["sombrero"]);

  const [accessory, setAccessory] = useState(null);

  const [userProfile, setUserProfile] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);

  // 🔔 Notificación de sobrepresupuesto
  const [spendingAlert, setSpendingAlert] = useState(false);

  useEffect(() => {
    if (screen !== "home") return;

    const timer = setTimeout(() => {
      setSpendingAlert(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [screen]);

  // 🎯 ACCESORIOS RESPONSIVOS (100% PORCENTAJES)
  const accessoryStyles = {
    armadillo: {
      sombrero: {
        top: "6%",
        left: "50%",
        width: "55%",
        transform: "translateX(-50%)",
      },
      diadema: {
        top: "8%",
        left: "50%",
        width: "60%",
        transform: "translateX(-50%)",
      },
      lazo: {
        top: "26%",
        left: "50%",
        width: "35%",
        transform: "translateX(-50%)",
      },
      guitarra: {
        top: "62%",
        left: "50%",
        width: "60%",
        transform: "translateX(-50%)",
      },
    },

    conejo: {
      sombrero: {
        top: "0%",
        left: "50%",
        width: "50%",
        transform: "translateX(-50%)",
      },
      diadema: {
        top: "3%",
        left: "50%",
        width: "60%",
        transform: "translateX(-50%)",
      },
      lazo: {
        top: "20%",
        left: "50%",
        width: "35%",
        transform: "translateX(-50%)",
      },
      guitarra: {
        top: "62%",
        left: "50%",
        width: "60%",
        transform: "translateX(-50%)",
      },
    },

    buho: {
      sombrero: {
        top: "2%",
        left: "50%",
        width: "52%",
        transform: "translateX(-50%)",
      },
      diadema: {
        top: "4%",
        left: "50%",
        width: "58%",
        transform: "translateX(-50%)",
      },
      lazo: {
        top: "22%",
        left: "50%",
        width: "33%",
        transform: "translateX(-50%)",
      },
      guitarra: {
        top: "60%",
        left: "50%",
        width: "60%",
        transform: "translateX(-50%)",
      },
    },

    dragon: {
      sombrero: {
        top: "4%",
        left: "50%",
        width: "48%",
        transform: "translateX(-50%)",
      },
      diadema: {
        top: "6%",
        left: "50%",
        width: "55%",
        transform: "translateX(-50%)",
      },
      lazo: {
        top: "18%",
        left: "50%",
        width: "32%",
        transform: "translateX(-50%)",
      },
      guitarra: {
        top: "58%",
        left: "50%",
        width: "62%",
        transform: "translateX(-50%)",
      },
    },

    cerdito: {
      sombrero: {
        top: "4%",
        left: "50%",
        width: "50%",
        transform: "translateX(-50%)",
      },
      diadema: {
        top: "6%",
        left: "50%",
        width: "55%",
        transform: "translateX(-50%)",
      },
      lazo: {
        top: "24%",
        left: "50%",
        width: "34%",
        transform: "translateX(-50%)",
      },
      guitarra: {
        top: "63%",
        left: "50%",
        width: "60%",
        transform: "translateX(-50%)",
      },
    },

    zorro: {
      sombrero: {
        top: "3%",
        left: "50%",
        width: "52%",
        transform: "translateX(-50%)",
      },
      diadema: {
        top: "6%",
        left: "50%",
        width: "58%",
        transform: "translateX(-50%)",
      },
      lazo: {
        top: "23%",
        left: "50%",
        width: "34%",
        transform: "translateX(-50%)",
      },
      guitarra: {
        top: "61%",
        left: "50%",
        width: "60%",
        transform: "translateX(-50%)",
      },
    },

    default: {
      sombrero: {
        top: "5%",
        left: "50%",
        width: "50%",
        transform: "translateX(-50%)",
      },
      diadema: {
        top: "7%",
        left: "50%",
        width: "58%",
        transform: "translateX(-50%)",
      },
      lazo: {
        top: "25%",
        left: "50%",
        width: "34%",
        transform: "translateX(-50%)",
      },
      guitarra: {
        top: "60%",
        left: "50%",
        width: "58%",
        transform: "translateX(-50%)",
      },
    },
  };

  const displayName = userProfile?.name || "Usuario";
  const initials = displayName.charAt(0).toUpperCase();
  const bankLabel = bankInfo
    ? `${bankInfo.bankName} · •••• ${bankInfo.last4}`
    : "Banco vinculado · •••• 1234";

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${fondo1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* SPLASH */}
      {screen === "splash" && (
        <SplashScreen onFinish={() => setScreen("onboarding")} />
      )}

      {/* ONBOARDING */}
      {screen === "onboarding" && (
        <div className="min-h-screen w-full bg-black/70 flex items-center justify-center px-4">
          <OnboardingScreen
            onComplete={(user, bank) => {
              setUserProfile(user);
              setBankInfo(bank);
              setScreen("home");
            }}
          />
        </div>
      )}

      {/* HOME */}
      {screen === "home" && (
        <div className="min-h-screen w-full bg-black/40 flex justify-center">
          {/* Columna tipo celular */}
          <div className="w-full max-w-[480px] flex flex-col">

            {/* HEADER */}
            <header className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-emerald-400/90 flex items-center justify-center border-2 border-emerald-300 text-slate-950 font-bold text-sm md:text-base">
                  <span>{initials}</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-[11px] md:text-xs text-slate-300">
                    Cuenta vinculada
                  </span>

                  <span className="text-xs md:text-sm font-semibold text-slate-50 truncate max-w-[180px]">
                    {bankLabel}
                  </span>
                </div>
              </div>

              {/* MONEDAS */}
              <div className="flex items-center gap-1 bg-slate-900/80 border border-amber-300/70 rounded-full px-3 py-1 shadow-md">
                <span className="text-lg">🪙</span>
                <span className="text-sm md:text-base font-semibold text-amber-300">
                  {coins}
                </span>
              </div>
            </header>

            {/* NOTIFICACIÓN */}
            {spendingAlert && (
              <div className="px-4 md:px-8 mt-1">
                <div className="flex items-start gap-3 bg-slate-900/90 border border-amber-300/60 rounded-2xl px-3 py-2 shadow-md shadow-amber-500/20">
                  <div className="text-xl pt-0.5">🐾</div>
                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-amber-100">
                      Oye, vi un gasto que se sale un poquito de tu presupuesto.
                      A veces te mereces un gustito 💚, pero no te olvides de tu
                      ahorro… ni de mí.
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

          {/* MAIN */}
          <main className="flex-1 flex flex-col items-center px-3 pb-4 pt-1 md:px-4 md:pb-6">
            <div className="relative flex flex-col items-center w-full max-w-md flex-1">

              {/* BURBUJA DE TEXTO */}
              <div className="mt-10 md:mt-12 mb-2 w-full flex justify-center px-3 animate-fadeIn">
                <div className="relative max-w-sm bg-emerald-700/40 backdrop-blur-sm border border-emerald-300/50 rounded-2xl px-4 py-3 shadow-lg shadow-emerald-500/30">
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-5 bg-emerald-700/40 border-l border-b border-emerald-300/50 rotate-45 rounded-bl-sm" />
                  <h1 className="text-base md:text-lg font-bold text-emerald-100">
                    ¡Hola! Soy <span className="text-emerald-300">Kuri</span> 🐾
                  </h1>
                  <p className="mt-1 text-xs md:text-sm text-emerald-50 leading-relaxed">
                    Estoy revisando tus gastos… y prometo ayudarte para que puedas ahorrar sin dejar de disfrutar 💚.
                  </p>
                </div>
              </div>

              {/* ESCENARIO / MASCOTA */}
              <div className="relative w-full flex-1">
                {/* anclado siempre un poco arriba de la barra inferior */}
                <div className="absolute inset-x-0 bottom-[5.5rem] md:bottom-[6rem] flex justify-center">
                  <div
                    className="
                      relative
                      w-[16rem] h-[19rem]
                      md:w-[18rem] md:h-[21rem]
                      flex items-end justify-center
                    "
                  >
                    <img
                      src={petImageState}
                      alt="Mascota financiera"
                      className="w-full h-full object-contain object-bottom drop-shadow-[0_0_25px_rgba(0,255,200,0.45)]"
                    />

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
            <div className="bg-slate-900/85 border border-slate-700 rounded-3xl px-5 py-3 flex gap-5 md:gap-8 shadow-lg backdrop-blur-md">
              {[
                { label: "Gastos", icon: "❤️", action: () => setScreen("expenses") },
                { label: "Consejos", icon: "💡", action: () => setScreen("advice") },
                { label: "Tu objetivo", icon: "🎯", action: () => setScreen("savings") },
                { label: "Mascota", icon: "🐾", action: () => setScreen("customize") },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  className="flex flex-col items-center text-xs md:text-base text-slate-200 hover:text-emerald-300 transition"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-800 flex items-center justify-center mb-1 border border-slate-700">
                    <span className="text-xl md:text-3xl">{btn.icon}</span>
                  </div>
                  {btn.label}
                </button>
              ))}
            </div>
          </nav>
        </div>{/* fin columna tipo celular */}
        </div>
      )}

      {/* PERSONALIZAR */}
      {screen === "customize" && (
        <div className="min-h-screen w-full bg-black/70">
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
              if (coins < petObj.price) return alert("No tienes suficientes monedas.");
              setCoins((c) => c - petObj.price);
              setOwnedPets((prev) => [...prev, petObj.id]);
            }}
            onSelectAccessory={(acc) => {
              setAccessory(acc);
              setScreen("home");
            }}
            onBuyAccessory={(acc) => {
              if (ownedAccessories.includes(acc.id)) return;
              if (coins < acc.price) return alert("No tienes suficientes monedas.");
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
        <div className="min-h-screen w-full bg-black/70">
          <ExpensesScreen onBack={() => setScreen("home")} />
        </div>
      )}

      {/* CONSEJOS */}
      {screen === "advice" && (
        <div className="min-h-screen w-full bg-black/70">
          <AdviceScreen onBack={() => setScreen("home")} />
        </div>
      )}

      {/* AHORRO */}
      {screen === "savings" && (
        <div className="min-h-screen w-full bg-black/70">
          <SavingsGoalScreen
            onBack={() => setScreen("home")}
            onEarnCoins={(amount) => setCoins((c) => c + amount)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
