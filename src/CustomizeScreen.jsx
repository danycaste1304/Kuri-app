import React, { useState } from "react";

import Armadillo from "./assets/Armadillo.png";
import Buho from "./assets/Buho.png";
import Conejo from "./assets/Conejo.png";
import Dragon from "./assets/Dragon.png";
import Cerdito from "./assets/Gaston.png";
import Zorro from "./assets/Zorro.png";

// Accesorios reales (los que tienes en assets)
import Diadema from "./assets/diadema.png";
import Guitarra from "./assets/guitarra.png";
import Lazo from "./assets/lazo.png";
import Mascara from "./assets/mascara.png";
import Sombrero from "./assets/sombrero.png";

const MASCOTAS = [
  { id: "armadillo", nombre: "Armadillo", img: Armadillo },
  { id: "buho",      nombre: "Búho",      img: Buho },
  { id: "conejo",    nombre: "Conejo",    img: Conejo },
  { id: "dragon",    nombre: "Dragón",    img: Dragon },
  { id: "cerdito",   nombre: "Cerdito",   img: Cerdito },
  { id: "zorro",     nombre: "Zorro",     img: Zorro },
];


const ACCESSORIES = [
  { id: "sombrero", label: "Sombrero", img: Sombrero },
  { id: "diadema", label: "Diadema", img: Diadema },
  { id: "lazo", label: "Lazo", img: Lazo },
  { id: "guitarra", label: "Guitarra", img: Guitarra },
];


export default function CustomizeScreen({
  currentAccessory,
  selectedPetId,
  onBack,
  onSelectPet,
  onSelectAccessory,
}) {
  // "accessories" por defecto, "pets" cuando aprietas la huellita
  const [mode, setMode] = useState("accessories");

  return (
    <div className="min-h-screen px-6 py-6 text-white">
      {/* Botón volver */}
      <button
        className="mb-4 text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
        onClick={onBack}
      >
        ← Volver
      </button>

      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        Personalizar mascota
      </h1>

      {/* Barra de modos: huellita + accesorios */}
      <div className="flex items-center gap-3 mb-6">
        {/* Botón circular con huellita – cambia a modo MASCOTAS */}
        <button
          onClick={() => setMode("pets")}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition
            ${
              mode === "pets"
                ? "bg-emerald-400 text-slate-900 border-emerald-300"
                : "bg-slate-800 text-slate-100 border-slate-600"
            }`}
        >
          🐾
        </button>

        {/* Botón circular de accesorios (modo por defecto) */}
        <button
          onClick={() => setMode("accessories")}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition
            ${
              mode === "accessories"
                ? "bg-emerald-400 text-slate-900 border-emerald-300"
                : "bg-slate-800 text-slate-100 border-slate-600"
            }`}
        >
          🎀
        </button>

        <span className="text-sm md:text-base text-slate-300">
          {mode === "accessories"
            ? "Elige accesorios para tu mascota"
            : "Cambia de mascota"}
        </span>
      </div>

      {/* CONTENIDO SEGÚN MODO */}
      {mode === "accessories" && (
        <>
          <h2 className="text-lg font-semibold mb-2">Accesorios</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {ACCESSORIES.map((acc) => (
              <button
                key={acc.id}
                onClick={() => onSelectAccessory(acc)}
                className={`flex flex-col items-center bg-slate-900/80 p-3 rounded-2xl hover:bg-slate-800 border
                  ${
                    currentAccessory && currentAccessory.id === acc.id
                      ? "border-emerald-400"
                      : "border-slate-700"
                  }`}
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-800 flex items-center justify-center">
                  <img
                    src={acc.img}
                    alt={acc.label}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <p className="text-xs mt-2 text-center">{acc.label}</p>
              </button>
            ))}

            {/* Botón para quitar accesorio */}
            <button
              onClick={() => onSelectAccessory(null)}
              className="flex flex-col items-center bg-slate-900/80 p-3 rounded-2xl hover:bg-slate-800 border border-slate-700"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-800 flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <p className="text-xs mt-2 text-center">Quitar accesorio</p>
            </button>
          </div>
        </>
      )}


      {mode === "pets" && (
        <>
          <h2 className="text-lg font-semibold mb-2">Elegir mascota</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {MASCOTAS.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectPet(m)}   // ← mandamos TODO el objeto, no solo la imagen
                className={`bg-slate-900/80 p-3 rounded-2xl hover:bg-slate-800 border
                  ${
                    /* selectedPetId viene como prop desde App.jsx */
                    m.id === selectedPetId ? "border-emerald-400" : "border-slate-700"
                  }
                `}
              >
                <div className="w-full h-40 flex items-end justify-center">
                  <img
                    src={m.img}
                    alt={m.nombre}
                    className="max-h-full object-contain"
                  />
                </div>
                <p className="text-center mt-2 text-sm">{m.nombre}</p>
              </button>
            ))}
          </div>
        </>
      )}
      
    </div>
  );
}
