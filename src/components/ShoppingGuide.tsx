"use client";

import React from "react";
import { MOCK_SETTINGS } from "@/data/mockData";
import { MousePointerClick, ShoppingBag, PackageCheck, MessageCircle, ArrowRight, HelpCircle } from "lucide-react";

export default function ShoppingGuide() {
  const steps = [
    {
      num: "01",
      icon: <MousePointerClick className="w-5 h-5 text-rose-500" />,
      title: "Pilih Karya / Produk",
      desc: "Pilih model Press-on Nails atau Buket Bunga Pipe Cleaner favoritmu di katalog.",
    },
    {
      num: "02",
      icon: <ShoppingBag className="w-5 h-5 text-orange-500" />,
      title: "Klik Marketplace / Custom WA",
      desc: "Pilih checkout di Shopee untuk promo gratis ongkir atau diskon TikTok Shop.",
    },
    {
      num: "03",
      icon: <PackageCheck className="w-5 h-5 text-emerald-500" />,
      title: "Pengemasan & Pengiriman",
      desc: "Produk dibuat 100% handmade dan dikirim aman dengan box & bubble wrap.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-rose-50/60 via-pink-50/20 to-purple-50/40 dark:from-zinc-900 dark:to-zinc-950 p-8 sm:p-12 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-md space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Panduan Belanja</span>
        </div>
        <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
          3 Langkah Mudah Memesan Kerajinan No More Craft
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-rose-100 dark:border-zinc-800 shadow-xs space-y-3 relative overflow-hidden"
          >
            <span className="text-4xl font-extrabold text-rose-100 dark:text-zinc-800 absolute top-4 right-4 select-none">
              {step.num}
            </span>
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-zinc-800 w-fit relative z-10">{step.icon}</div>
            <h4 className="text-base font-bold text-zinc-900 dark:text-white relative z-10">{step.title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed relative z-10">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 text-center space-y-3 border-t border-rose-200 dark:border-zinc-800">
        <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
          Butuh bantuan ukuran kuku palsu atau pertanyaan kustom khusus?
        </p>
        <div>
          <a
            href={`https://wa.me/${MOCK_SETTINGS.whatsappNumber}?text=Halo%20No%20More%20Craft,%20saya%20butuh%20bantuan%20panduan%20belanja`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-transform hover:scale-105"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Tanyakan ke Customer Service WA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
