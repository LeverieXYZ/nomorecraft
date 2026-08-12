"use client";

import React from "react";
import { Target, Compass, Heart, Shield, Sparkles, Star } from "lucide-react";

export default function BrandValues() {
  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-rose-500" />,
      title: "Orisinalitas Kreatif",
      desc: "Menghadirkan desain unik yang mencerminkan kepribadian pemakainya.",
    },
    {
      icon: <Heart className="w-5 h-5 text-pink-500" />,
      title: "Cinta Dalam Pengerjaan",
      desc: "Setiap helai kawat dan gel kuku dikerjakan teliti dengan penuh kasih sayang.",
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      title: "Kualitas Tanpa Kompromi",
      desc: "Hanya menggunakan bahan aman, non-toxic, dan tahan lama.",
    },
    {
      icon: <Star className="w-5 h-5 text-amber-500" />,
      title: "Kepuasan Pelanggan",
      desc: "Layanan ramah, respon cepat, dan garansi keamanan pengiriman ke seluruh kota.",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Visi & Misi Header Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Visi Card */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 text-white p-8 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md w-fit">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-extrabold">Visi Kami</h3>
          <p className="text-rose-100 text-sm leading-relaxed">
            Menjadi brand crafting lokal terpercaya yang menginspirasi keindahan, senyuman, dan kehangatan momen spesial di seluruh Indonesia lewat karya handmade berkualitas tinggi.
          </p>
        </div>

        {/* Misi Card */}
        <div className="bg-zinc-900 text-white p-8 rounded-3xl border border-zinc-800 shadow-xl space-y-4 relative overflow-hidden">
          <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 w-fit">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold">Misi Utama</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Menyediakan produk kustomisasi kuku dan buket bunga unik yang ramah kantong, ramah lingkungan, serta proses order yang mudah dan transparan.
          </p>
        </div>
      </div>

      {/* Nilai Utama Grid */}
      <div className="space-y-6">
        <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white text-center">
          Nilai-Nilai Yang Kami Pegang
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-rose-100 dark:border-zinc-800 shadow-xs space-y-2">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-zinc-800 w-fit">{v.icon}</div>
              <h4 className="text-base font-bold text-zinc-900 dark:text-white">{v.title}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
