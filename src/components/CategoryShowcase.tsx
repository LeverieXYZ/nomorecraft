"use client";

import React, { useState, useEffect } from "react";
import { MOCK_CATEGORIES, Work } from "@/data/mockData";
import { getStoredWorks } from "@/utils/worksStore";
import { Sparkles, ShoppingCart, ExternalLink, Check, Share2, Eye, X } from "lucide-react";
import ModalPortal from "./ModalPortal";

export default function CategoryShowcase() {
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [activeModalWork, setActiveModalWork] = useState<Work | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const loadWorks = () => {
    setWorks(getStoredWorks());
  };

  useEffect(() => {
    loadWorks();
    window.addEventListener("nomorecraft_works_updated", loadWorks);
    window.addEventListener("storage", loadWorks);
    return () => {
      window.removeEventListener("nomorecraft_works_updated", loadWorks);
      window.removeEventListener("storage", loadWorks);
    };
  }, []);

  const filteredWorks = selectedCategory
    ? works.filter((work) => work.categoryId === selectedCategory)
    : works;

  const handleShare = (work: Work, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(work.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="galeri" className="py-20 bg-white dark:bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Karya Handmade</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Koleksi Kerajinan Pilihan
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Setiap karya dirancang unik dengan detail presisi. Pilih kategori favoritmu untuk menjelajahi kreasinya.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === null
                ? "bg-rose-500 text-white shadow-md shadow-rose-200 dark:shadow-none scale-105"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-700"
            }`}
          >
            Semua Karya ({works.length})
          </button>

          {MOCK_CATEGORIES.map((cat) => {
            const count = works.filter((w) => w.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200 dark:shadow-none scale-105"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-700"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => setActiveModalWork(work)}
              className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-rose-50 dark:bg-zinc-800">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-zinc-900/90 text-rose-600 dark:text-rose-400 backdrop-blur-md shadow-xs">
                    {work.categoryName}
                  </span>
                  {work.isFeatured && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950 shadow-xs">
                      Featured ✨
                    </span>
                  )}
                </div>

                {/* Sold / Status Badge */}
                {work.isSold && (
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-zinc-900/80 text-white backdrop-blur-md pointer-events-none">
                    Terjual (Sold Out)
                  </div>
                )}

                {/* Quick Action Overlay */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveModalWork(work);
                    }}
                    className="p-3.5 rounded-full bg-white text-zinc-900 shadow-xl hover:scale-115 transition-transform cursor-pointer flex items-center gap-1.5 font-bold text-xs"
                    title="Lihat Detail Karya"
                  >
                    <Eye className="w-5 h-5 text-rose-600" />
                    <span>Lihat Detail</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
                    {work.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-rose-50 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 block">Harga</span>
                    <span className="text-lg font-extrabold text-rose-600 dark:text-rose-400">
                      {work.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleShare(work, e)}
                      className="p-2 rounded-full text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors"
                      title="Bagikan link karya"
                    >
                      {copiedId === work.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>

                    <a
                      href={work.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-full shadow-md transition-all hover:scale-105"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Beli</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal Detail Karya (Rendered via Portal to document.body) */}
      {activeModalWork && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md cursor-pointer animate-fade-in"
            onClick={() => setActiveModalWork(null)}
          >
            <div
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModalWork(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-square bg-rose-50 dark:bg-zinc-800 relative overflow-hidden">
                  <img
                    src={activeModalWork.imageUrl}
                    alt={activeModalWork.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
                        {activeModalWork.categoryName}
                      </span>
                      {activeModalWork.isSold && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          Terjual
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                      {activeModalWork.title}
                    </h3>

                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      {activeModalWork.description}
                    </p>

                    <div className="pt-2">
                      <span className="text-xs text-zinc-400 block">Harga</span>
                      <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                        {activeModalWork.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-rose-100 dark:border-zinc-800">
                    <a
                      href={activeModalWork.shopeeUrl || activeModalWork.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Beli di Shopee</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                    </a>

                    <a
                      href={activeModalWork.tiktokShopUrl || "https://tiktok.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl border border-zinc-700 transition-colors"
                    >
                      <span>Beli di TikTok Shop</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </section>
  );
}
