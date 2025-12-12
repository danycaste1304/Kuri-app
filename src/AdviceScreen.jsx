import React from "react";

export default function AdviceScreen({ onBack }) {
  const consejos = [
    {
      id: 1,
      titulo: "Elimina gastos hormiga",
      texto: "Pequeñas compras diarias pueden sumar más de $600 al año.",
      tiktok:
        "https://www.tiktok.com/@isaacenc/video/7576071371243916552?is_from_webapp=1&sender_device=pc&web_id=7576874939774715403",
    },
    {
      id: 2,
      titulo: "Regla del 50-30-20",
      texto: "50% necesidades, 30% gustos, 20% ahorro.",
      tiktok: "https://vm.tiktok.com/ZMAwqebGE/",
    },
    {
      id: 3,
      titulo: "Crea un fondo de emergencia",
      texto: "Ten al menos 3 meses de gastos básicos.",
      tiktok:
        "https://www.tiktok.com/@angiecoachdeahorro/video/7538073902702955798?is_from_webapp=1&sender_device=pc&web_id=7576874939774715403",
    },
  ];

  // TikToks recomendados usando imágenes desde /public/tiktoks
  const tiktoks = [
    { id: "t1", img: "/tiktoks/tiktok1.png", url: "https://vm.tiktok.com/ZMAwqVhJv/" },
    { id: "t2", img: "/tiktoks/tiktok2.png", url: "https://vm.tiktok.com/ZMAwqB8PQ/" },
    {
      id: "t3",
      img: "/tiktoks/tiktok3.png",
      url: "https://www.tiktok.com/@luisminegocios/video/7265508975150484742?is_from_webapp=1&sender_device=pc&web_id=7576874939774715403",
    },
  ];

  return (
    // 👇 Pantalla fija, sin scroll global
    <div className="h-[100dvh] w-full bg-black/80 text-white flex justify-center">
      {/* 👇 Este contenedor es el que scrollea */}
      <div className="w-full max-w-[960px] px-6 py-6 overflow-y-auto pb-10">
        {/* Volver */}
        <button
          onClick={onBack}
          className="mb-4 text-sm bg-slate-800 px-4 py-2 rounded-xl hover:bg-slate-700"
        >
          ← Volver
        </button>

        <h1 className="text-2xl font-bold mb-6">Consejos financieros</h1>

        {/* Consejo del día */}
        <div className="bg-slate-900/80 p-5 rounded-2xl mb-6 border border-slate-700">
          <h2 className="text-xl font-semibold mb-2">💡 Consejo del día</h2>
          <p className="text-slate-200 mb-3">
            “Antes de comprar algo, pregúntate si lo usarías al menos 30 veces.”
          </p>
          <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-xl text-sm font-medium">
            Ver más
          </button>
        </div>

        {/* Lista de consejos */}
        <h2 className="text-lg font-semibold mb-2">Artículos recomendados</h2>

        <div className="flex flex-col gap-4 mb-8">
          {consejos.map((c) => (
            <div
              key={c.id}
              className="bg-slate-900/80 p-4 rounded-xl border border-slate-700"
            >
              <h3 className="text-lg font-semibold">{c.titulo}</h3>
              <p className="text-slate-300 text-sm mt-1">{c.texto}</p>

              <a
                href={c.tiktok}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 text-sm mt-3 inline-block hover:underline"
              >
                Ver TikTok relacionado →
              </a>
            </div>
          ))}
        </div>

        {/* TikToks recomendados */}
        <h2 className="text-lg font-semibold mb-3">TikToks para ti</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {tiktoks.map((t) => (
            <a
              key={t.id}
              href={t.url}
              target="_blank"
              rel="noreferrer"
              className="min-w-[120px] h-[150px] bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
            >
              <img
                src={t.img}
                alt="TikTok recomendado"
                className="w-full h-full object-cover"
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
