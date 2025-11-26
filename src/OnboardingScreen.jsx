import React, { useState } from "react";

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);

  // Datos del usuario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Datos del banco
  const [bankName, setBankName] = useState("");
  const [last4, setLast4] = useState("");
  const [isLinking, setIsLinking] = useState(false);
  const [linked, setLinked] = useState(false);

  const canContinueStep1 = name.trim() !== "" && email.trim() !== "";

  const handleLinkBank = (e) => {
    e.preventDefault();
    if (!bankName || last4.length !== 4) return;

    setIsLinking(true);

    // Simulación de verificación con el banco
    setTimeout(() => {
      setIsLinking(false);
      setLinked(true);
    }, 900);
  };

  const handleFinish = () => {
    if (!linked) return;

    onComplete(
      { name: name.trim(), email: email.trim() },
      { bankName, last4 }
    );
  };

  return (
    <div className="w-full max-w-md bg-slate-950/95 border border-slate-700 rounded-3xl px-6 py-7 shadow-xl">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
          Bienvenido
        </p>
        <h1 className="text-2xl font-bold text-slate-50 mt-1">
          Tu mascota financiera <span className="text-emerald-400">Kuri</span> 🐾
        </h1>
        <p className="text-sm text-slate-300 mt-2">
          Crea tu usuario y vincula tu cuenta bancaria para empezar a recibir
          consejos personalizados.
        </p>
      </div>

      {/* Indicador de pasos */}
      <div className="flex items-center gap-3 mb-6 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${
              step === 1
                ? "bg-emerald-400 text-slate-900"
                : "bg-slate-700 text-slate-200"
            }`}
          >
            1
          </div>
          <span>Tu usuario</span>
        </div>
        <span className="text-slate-600">—</span>
        <div className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold ${
              step === 2
                ? "bg-emerald-400 text-slate-900"
                : "bg-slate-700 text-slate-200"
            }`}
          >
            2
          </div>
          <span>Cuenta de banco</span>
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 mb-1 block">
              Nombre
            </label>
            <input
              type="text"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400"
              placeholder="Cómo quieres que Kuri te llame"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400"
              placeholder="tucorreo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            disabled={!canContinueStep1}
            onClick={() => setStep(2)}
            className={`w-full mt-4 py-2.5 rounded-xl text-sm font-medium transition
            ${
              canContinueStep1
                ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Continuar con la vinculación bancaria →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 mb-1 block">
              Banco
            </label>
            <select
              className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            >
              <option value="">Selecciona tu banco</option>
              <option value="Banco Pichincha">Banco Pichincha</option>
              <option value="Produbanco">Produbanco</option>
              <option value="Banco Guayaquil">Banco Guayaquil</option>
              <option value="Banco Bolivariano">Banco Bolivariano</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-300 mb-1 block">
              Últimos 4 dígitos de tu cuenta
            </label>
            <input
              type="text"
              maxLength={4}
              inputMode="numeric"
              className="w-32 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-emerald-400"
              placeholder="1234"
              value={last4}
              onChange={(e) =>
                setLast4(e.target.value.replace(/[^0-9]/g, ""))
              }
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Sólo se usa como referencia visual. No guardamos credenciales
              sensibles.
            </p>
          </div>

          {/* Estado de verificación */}
          {linked ? (
            <div className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-400/60 rounded-xl px-3 py-2">
              <span>✅</span>
              <span>Cuenta vinculada correctamente con tu perfil.</span>
            </div>
          ) : (
            <button
              onClick={handleLinkBank}
              disabled={!bankName || last4.length !== 4 || isLinking}
              className={`w-full py-2.5 rounded-xl text-sm font-medium transition
              ${
                !bankName || last4.length !== 4 || isLinking
                  ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-400 text-slate-950"
              }`}
            >
              {isLinking ? "Verificando con el banco..." : "Vincular cuenta"}
            </button>
          )}

          <button
            onClick={handleFinish}
            disabled={!linked}
            className={`w-full mt-2 py-2.5 rounded-xl text-sm font-medium transition
            ${
              linked
                ? "bg-emerald-400 hover:bg-emerald-300 text-slate-950"
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            Entrar a mi mascota financiera 🐾
          </button>

          <button
            onClick={() => setStep(1)}
            className="w-full text-xs text-slate-400 hover:text-slate-200 mt-1"
          >
            ← Volver a mis datos
          </button>
        </div>
      )}
    </div>
  );
}
