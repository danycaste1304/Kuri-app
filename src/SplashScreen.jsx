import React, { useEffect } from "react";
import logo from "./assets/kuri-logo.jpeg"; 
// 👆 Cambia el nombre si tu logo se llama distinto (por ejemplo LogoKuri.png)

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 20000); // 20 segundos. Para probar, puedes bajarlo a 3000 (3 s)

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">

        {/* Glow circular detrás del logo */}
        <div className="absolute w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative flex flex-col items-center px-8 text-center">
          {/* LOGO */}
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900/80 border border-emerald-400/60 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.6)] mb-5">
            <img
              src={logo}
              alt="Kuri – Tu mascota financiera"
              className="w-24 h-24 md:w-28 md:h-28 object-contain"
            />
          </div>

          {/* Nombre / tagline */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-emerald-200 tracking-wide">
            Kuri
          </h1>
          <p className="text-sm md:text-base text-emerald-100/90 font-medium">
            Tu mascota financiera
          </p>

          {/* Explicación cortita */}
          <p className="mt-4 text-xs md:text-sm text-slate-200 max-w-sm leading-relaxed">
            Kuriapp es una app financiera inteligente que se conecta con tu banco para mostrarte en qué gastas y 
            cómo puedes mejorar. A través de una mascota que evoluciona contigo, recibirás objetivos semanales, 
            consejos y una experiencia que hace el ahorro más emocionante.
          </p>

          {/* Indicador de “cargando” */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-1/2 bg-emerald-400/90 animate-[pulse_1.3s_ease-in-out_infinite]" />
            </div>
            <span className="text-[11px] text-slate-400">
              Preparando tu experiencia con Kuri…
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
