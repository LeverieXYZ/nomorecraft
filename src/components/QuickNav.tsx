"use client";

import React from "react";
import { Sparkles, Flower2, Heart, BookOpen, Video, ShoppingBag } from "lucide-react";

export default function QuickNav() {
  const quickLinks = [
    {
      title: "Nail Art Custom",
      subtitle: "Press-on Nails",
      icon: Sparkles,
      href: "#galeri",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50 dark:bg-pink-950/40",
      borderColor: "border-pink-200 dark:border-pink-800/60",
      iconColor: "text-pink-600 dark:text-pink-400",
    },
    {
      title: "Pipe Cleaner",
      subtitle: "Buket Bunga Abadi",
      icon: Flower2,
      href: "#galeri",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/40",
      borderColor: "border-amber-200 dark:border-amber-800/60",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Crochet Handmade",
      subtitle: "Rajutan Manis",
      icon: Heart,
      href: "#galeri",
      color: "from-rose-500 to-red-500",
      bgColor: "bg-rose-50 dark:bg-rose-950/40",
      borderColor: "border-rose-200 dark:border-rose-800/60",
      iconColor: "text-rose-600 dark:text-rose-400",
    },
    {
      title: "Blog & Tutorial",
      subtitle: "Tips Perawatan",
      icon: BookOpen,
      href: "#blog",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/40",
      borderColor: "border-purple-200 dark:border-purple-800/60",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      title: "Video TikTok",
      subtitle: "Behind The Scenes",
      icon: Video,
      href: "#tiktok",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-50 dark:bg-sky-950/40",
      borderColor: "border-sky-200 dark:border-sky-800/60",
      iconColor: "text-sky-600 dark:text-sky-400",
    },
    {
      title: "Toko Marketplace",
      subtitle: "Shopee & TikTok",
      icon: ShoppingBag,
      href: "#belanja",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-200 dark:border-emerald-800/60",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <section className="py-8 bg-gradient-to-b from-pink-50/30 to-white dark:from-zinc-950 dark:to-zinc-950 -mt-6 z-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-xl">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Navigasi Cepat Kategori & Konten</span>
            </h3>
            <span className="text-[11px] text-zinc-400">Klik untuk langsung menuju bagian</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  className={`p-3.5 rounded-2xl border ${item.bgColor} ${item.borderColor} hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center space-y-2 group`}
                >
                  <div className={`p-2.5 rounded-xl bg-white dark:bg-zinc-900 shadow-xs ${item.iconColor} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
