import React, { useState } from "react";
import CustomizeScreen from "./CustomizeScreen";
import ExpensesScreen from "./ExpensesScreen";
import AdviceScreen from "./AdviceScreen";
import SavingsGoalScreen from "./SavingsGoalScreen";
import OnboardingScreen from "./OnboardingScreen";
import defaultPetImage from "./assets/Armadillo.png";

function App() {
  const [screen, setScreen] = useState("onboarding");
  const [petImageState, setPetImageState] = useState(defaultPetImage);
  const [currentPetId, setCurrentPetId] = useState("armadillo");
  const [accessory, setAccessory] = useState(null);

  const [userProfile, setUserProfile] = useState(null);
  const [bankInfo, setBankInfo] = useState(null);

  const accessoryStyles = {
    armadillo: {
      diadema: { top: "200px", width: "200px", transform: "translateX(-65px)" },
      sombrero: { top: "190px", width: "190px" },
      lazo: { top: "210px", width: "150px" },
      guitarra: { top: "380px", width: "190px", transform: "translateX(-50px)" },
    },
    conejo: {
      diadema: { top: "240px", width: "190px", transform: "translateX(-60px)" },
      sombrero: { top: "210px", width: "180px" },
      lazo: { top: "255px", width: "140px" },
      guitarra: { top: "400px", width: "190px", transform: "translateX(-35px)" },
    },
    default: {
      diadema: { top: "220px", width: "170px" },
      sombrero: { top: "210px", width: "180px" },
      lazo: { top: "255px", width: "140px" },
      guitarra: { top: "285px", width: "180px" },
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
        backgroundImage: "url('/src/assets/Fondo1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* ONBOARDING / REGISTRO */}
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
        <div className="min-h-screen w-full bg-black/40 flex flex-col">
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
                <span className="text-xs md:text-sm font-semibold text-slate-50 max-w-[200px] md:max-w-none truncate">
                  {bankLabel}
                </span>
              </div>
            </div>

            <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition">
              <span className="text-lg md:text-xl">⚙️</span>
            </button>
          </header>

          {/* MAIN */}
          <main className="flex-1 flex flex-col items-center px-3 pb-4 pt-1 md:px-4 md:pb-6">
            <div className="relative flex flex-col items-center w-full max-w-md">
              {/* TEXTO ARRIBA */}
              <div className="mt-2 mb-4 md:mt-4 md:mb-6 text-center px-3">
                <h1 className="text-xl md:text-3xl font-bold text-slate-50 leading-tight">
                  Hola, soy{" "}
                  <span className="text-emerald-300 drop-shadow-[0_0_10px_rgba(0,0,0,0.9)]">
                    Kuri
                  </span>{" "}
                  🐾
                </h1>
                <p className="mt-2 text-xs md:text-base text-slate-200">
                  Tu mascota financiera. Estoy aquí para ayudarte a cuidar tu
                  dinero, tus metas y tus hábitos, todos los días.
                </p>
              </div>

              {/* CONTENEDOR DE MASCOTA Y ACCESORIO */}
              <div className="relative flex flex-col items-center justify-center w-full">
                <img
                  src={petImageState}
                  alt="Mascota financiera"
                  className="w-[260px] h-[300px] md:w-[360px] md:h-[400px] object-contain object-bottom drop-shadow-[0_0_25px_rgba(0,255,200,0.45)]"
                  style={{
                    marginTop: "165px",     // antes 190px → la subimos un poco para móvil
                    marginBottom: "-130px", // ajustado para que siga sobre la plataforma
                  }}
                />


                {accessory && (
                  <img
                    src={accessory.img}
                    alt={accessory.label}
                    className="absolute left-1/2 -translate-x-1/2 object-contain"
                    style={
                      (accessoryStyles[currentPetId] &&
                        accessoryStyles[currentPetId][accessory.id]) ||
                      (accessoryStyles.default &&
                        accessoryStyles.default[accessory.id]) || {
                        top: "230px",
                        width: "160px",
                      }
                    }
                  />
                )}
              </div>
            </div>
          </main>

          {/* BOTONES INFERIORES */}
          <nav className="w-full px-4 pb-4 pt-2 md:px-6 md:pb-6 md:pt-3 flex justify-center">
            <div className="bg-slate-900/85 border border-slate-700 rounded-3xl px-3 py-2 flex gap-3 md:gap-6">
              {/* Gastos */}
              <button
                onClick={() => setScreen("expenses")}
                className="flex flex-col items-center text-[10px] md:text-sm text-slate-200 hover:text-emerald-300"
              >
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center mb-1 border border-slate-700">
                  <span className="text-lg md:text-2xl">❤️</span>
                </div>
                Gastos
              </button>

              {/* Consejos */}
              <button
                onClick={() => setScreen("advice")}
                className="flex flex-col items-center text-[10px] md:text-sm text-slate-200 hover:text-emerald-300"
              >
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center mb-1 border border-slate-700">
                  <span className="text-lg md:text-2xl">💡</span>
                </div>
                Consejos
              </button>

              {/* Tu objetivo */}
              <button
                onClick={() => setScreen("savings")}
                className="flex flex-col items-center text-[10px] md:text-sm text-slate-200 hover:text-emerald-300"
              >
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center mb-1 border border-slate-700">
                  <span className="text-lg md:text-2xl">🎯</span>
                </div>
                Tu objetivo
              </button>

              {/* Mascota */}
              <button
                className="flex flex-col items-center text-[10px] md:text-sm text-slate-200 hover:text-emerald-300"
                onClick={() => setScreen("customize")}
              >
                <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-slate-800 flex items-center justify-center mb-1 border border-slate-700">
                  <span className="text-lg md:text-2xl">🐾</span>
                </div>
                Mascota
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* PERSONALIZAR */}
      {screen === "customize" && (
        <div className="min-h-screen w-full bg-black/70">
          <CustomizeScreen
            currentAccessory={accessory}
            selectedPetId={currentPetId}
            onBack={() => setScreen("home")}
            onSelectPet={(petObj) => {
              setPetImageState(petObj.img);
              setCurrentPetId(petObj.id);
              setScreen("home");
            }}
            onSelectAccessory={(acc) => {
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

      {/* OBJETIVO DE AHORRO */}
      {screen === "savings" && (
        <div className="min-h-screen w-full bg-black/70">
          <SavingsGoalScreen onBack={() => setScreen("home")} />
        </div>
      )}
    </div>
  );
}

export default App;
