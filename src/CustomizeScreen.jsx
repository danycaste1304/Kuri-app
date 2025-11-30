import React, { useState } from "react";

import Armadillo from "./assets/Armadillo.png";
import Buho from "./assets/Buho.png";
import Conejo from "./assets/Conejo.png";
import Dragon from "./assets/Dragon.png";
import Cerdito from "./assets/Gaston.png";
import Zorro from "./assets/Zorro.png";

// Accesorios reales
import Diadema from "./assets/diadema.png";
import Guitarra from "./assets/guitarra.png";
import Lazo from "./assets/lazo.png";
import Sombrero from "./assets/sombrero.png";

// 🐾 Solo dragón y armadillo son gratis
const MASCOTAS = [
  { id: "armadillo", nombre: "Armadillo", img: Armadillo, price: 0 },
  { id: "dragon", nombre: "Dragón", img: Dragon, price: 0 },
  { id: "conejo", nombre: "Conejo", img: Conejo, price: 40 },
  { id: "cerdito", nombre: "Cerdito", img: Cerdito, price: 40 },
  { id: "buho", nombre: "Búho", img: Buho, price: 50 },
  { id: "zorro", nombre: "Zorro", img: Zorro, price: 50 },
];

// 🎀 Accesorios con precio
const ACCESSORIES = [
  { id: "sombrero", label: "Sombrero", img: Sombrero, price: 25 },
  { id: "diadema", label: "Diadema", img: Diadema, price: 20 },
  { id: "lazo", label: "Lazo", img: Lazo, price: 15 },
  { id: "guitarra", label: "Guitarra", img: Guitarra, price: 35 },
];

export default function CustomizeScreen({
  currentAccessory,
  selectedPetId,
  coins,
  ownedPets,
  ownedAccessories,
  onBack,
  onSelectPet,
  onBuyPet,
  onSelectAccessory,
  onBuyAccessory,
}) {
  const [mode, setMode] = useState("accessories");

  return (
    <div className="min-h-screen w-full bg-black/80 text-white flex justify-center">
      <div className="w-full max-w-[480px] px-6 py-6">
      {/* Botón volver */}
      <button
        className="mb-4 text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
        onClick={onBack}
      >
        ← Volver
      </button>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl md:text-3xl font-bold">
          Personalizar mascota
        </h1>

        {/* Monedas actuales también aquí (opcional) */}
        <div className="flex items-center gap-1 bg-slate-900/80 border border-amber-300/70 rounded-full px-3 py-1 shadow-md text-sm">
          <span>🪙</span>
          <span className="font-semibold text-amber-300">{coins}</span>
        </div>
      </div>

      {/* Barra de modos: huellita + accesorios */}
      <div className="flex items-center gap-3 mb-6">
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
            ? "Elige y compra accesorios para tu mascota"
            : "Compra y cambia de mascota"}
        </span>
      </div>

      {/* CONTENIDO SEGÚN MODO */}
      {mode === "accessories" && (
        <>
          <h2 className="text-lg font-semibold mb-2">Accesorios</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {ACCESSORIES.map((acc) => {
              const isOwned = ownedAccessories.includes(acc.id);

              return (
                <button
                  key={acc.id}
                  onClick={() =>
                    isOwned ? onSelectAccessory(acc) : onBuyAccessory(acc)
                  }
                  className={`flex flex-col items-center bg-slate-900/80 p-3 rounded-2xl hover:bg-slate-800 border transition
                    ${
                      currentAccessory &&
                      currentAccessory.id === acc.id &&
                      isOwned
                        ? "border-emerald-400"
                        : "border-slate-700"
                    }`}
                >
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img
                      src={acc.img}
                      alt={acc.label}
                      className="w-12 h-12 object-contain"
                    />

                    {!isOwned && (
                      <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center text-[10px] rounded-full">
                        <span className="text-amber-300 font-bold">
                          🪙 {acc.price}
                        </span>
                        <span className="mt-1 text-[9px] text-slate-100">
                          Toca para comprar
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs mt-2 text-center">
                    {acc.label}
                    {!isOwned && (
                      <span className="block text-[10px] text-amber-300 mt-0.5">
                        {acc.price} monedas
                      </span>
                    )}
                  </p>
                </button>
              );
            })}

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
            {MASCOTAS.map((m) => {
              const isOwned = ownedPets.includes(m.id);

              return (
                <button
                  key={m.id}
                  onClick={() =>
                    isOwned ? onSelectPet(m) : onBuyPet(m)
                  }
                  className={`bg-slate-900/80 p-3 rounded-2xl hover:bg-slate-800 border transition
                    ${
                      m.id === selectedPetId && isOwned
                        ? "border-emerald-400"
                        : "border-slate-700"
                    }`}
                >
                  <div className="w-full h-40 flex items-end justify-center relative overflow-hidden rounded-2xl">
                    <img
                      src={m.img}
                      alt={m.nombre}
                      className="max-h-full object-contain"
                    />

                    {!isOwned && (
                      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-xs">
                        <span className="text-amber-300 font-bold">
                          🪙 {m.price}
                        </span>
                        <span className="mt-1 text-[10px] text-slate-100">
                          Toca para desbloquear
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-center mt-2 text-sm">
                    {m.nombre}
                    {!isOwned && (
                      <span className="block text-[11px] text-amber-300 mt-0.5">
                        {m.price} monedas
                      </span>
                    )}
                  </p>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
    </div>
  );
}
