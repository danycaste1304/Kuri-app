import React, { useState } from "react";

export default function OnboardingScreen({ onComplete }) {
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("Banco Pichincha");
  const [last4, setLast4] = useState("1234");

  const handleStart = () => {
    if (!name.trim()) {
      alert("Cuéntale a Kuri cómo te llamas 🐾");
      return;
    }

    const user = { name: name.trim() };
    const bank = { bankName, last4 };
    onComplete?.(user, bank);
  };

  return (
    <div className="w-full max-w-md bg-slate-950/80 border border-slate-800 rounded-3xl px-6 py-6 md:px-8 md:py-7 shadow-2xl shadow-emerald-500/20 text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Bienvenido a <span className="text-emerald-300">Kuri</span> 🐾
      </h1>
      <p className="text-xs md:text-sm text-slate-200 mb-5">
        Vinculamos (de forma ficticia) tu banco para que Kuri pueda entender tus
        gastos, proponerte un objetivo de ahorro y celebrar tus avances semana a semana.
      </p>

      {/* Nombre */}
      <div className="mb-4">
        <label className="block text-xs text-slate-300 mb-1">
          ¿Cómo quieres que Kuri te llame?
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Dani, Jorge..."
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
        />
      </div>

      {/* Banco ficticio */}
      <div className="mb-4">
        <label className="block text-xs text-slate-300 mb-1">
          Banco vinculado (demo)
        </label>
        <select
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm focus:outline-none focus:border-emerald-400"
        >
          <option>Banco Pichincha</option>
          <option>Banco Guayaquil</option>
          <option>Produbanco</option>
          <option>Banco del Pacífico</option>
        </select>
      </div>

      {/* Últimos 4 dígitos ficticios */}
      <div className="mb-6">
        <label className="block text-xs text-slate-300 mb-1">
          Últimos 4 dígitos (solo demo)
        </label>
        <input
          type="text"
          maxLength={4}
          value={last4}
          onChange={(e) =>
            setLast4(e.target.value.replace(/\D/g, "").slice(0, 4))
          }
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-sm tracking-[0.3em] text-center focus:outline-none focus:border-emerald-400"
        />
        <p className="mt-1 text-[10px] text-slate-400">
          No conectamos bancos reales, es solo para que la experiencia se sienta auténtica.
        </p>
      </div>

      {/* Botón principal */}
      <button
        onClick={handleStart}
        className="w-full py-2.5 rounded-xl bg-emerald-400 text-slate-950 text-sm md:text-base font-semibold hover:bg-emerald-300 transition mb-3"
      >
        Empezar con Kuri
      </button>

      {/* Separador */}
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 h-px bg-slate-700" />
        <span className="text-[10px] text-slate-400">o</span>
        <div className="flex-1 h-px bg-slate-700" />
      </div>

      {/* Botón de login / biométricos (solo UI) */}
      <button
        onClick={() =>
          alert("Aquí iría el login real o biométrico en una versión futura 😊")
        }
        className="w-full py-2.5 rounded-xl bg-slate-900 text-slate-100 text-sm md:text-base border border-slate-700 hover:border-emerald-400/70 hover:bg-slate-900/80 transition flex items-center justify-center gap-2"
      >
        <span className="text-lg">🔓</span>
        <span>Ingresar con mi cuenta / biométricos</span>
        <span className="text-[10px] text-emerald-300/80">(demo)</span>
      </button>

      <p className="mt-3 text-[10px] text-slate-500 text-center">
        En una versión real podrías iniciar sesión con huella, Face ID o usuario
        y contraseña. Aquí solo simulamos la experiencia visual.
      </p>
    </div>
  );
}
