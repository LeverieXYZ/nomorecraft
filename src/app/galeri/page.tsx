"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_CATEGORIES, Work } from "@/data/mockData";
import { getStoredWorks } from "@/utils/worksStore";
import { Sparkles, Search, ShoppingCart, ExternalLink, Eye, Share2, Check, X, Filter } from "lucide-react";
import ModalPortal from "@/components/ModalPortal";

export default function GaleriPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredWorks = works.filter((work) => {
    const matchesCategory = selectedCategory ? work.categoryId === selectedCategory : true;
    const matchesSearch =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = (work: Work, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(work.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-rose-50/60 via-pink-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Katalog Lengkap Kerajinan</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Galeri Showcase No More Craft
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Temukan berbagai kreasi Nail Art, Buket Pipe Cleaner, dan Rajutan Crochet eksklusif buatan tangan.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4 relative">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari karya (mis. Press-on Nails, Sunflower, Bag...)"
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-rose-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900 shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === null
                ? "bg-rose-500 text-white shadow-md scale-105"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50"
            }`}
          >
            Semua ({works.length})
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
                    ? "bg-rose-500 text-white shadow-md scale-105"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Works Grid */}
        {filteredWorks.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-rose-50/50 dark:bg-zinc-900/50 rounded-3xl border border-rose-100 dark:border-zinc-800">
            <Filter className="w-10 h-10 text-rose-400 mx-auto" />
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Tidak ada karya yang cocok</h3>
            <p className="text-sm text-zinc-500">Coba ubah kata kunci pencarian atau kategori filter.</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work) => (
              <div
                key={work.id}
                onClick={() => setActiveModalWork(work)}
                className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-rose-50 dark:bg-zinc-800">
                    <img
                      src={work.imageUrl}
                      alt={work.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-zinc-900/90 text-rose-600 dark:text-rose-400 backdrop-blur-md">
                        {work.categoryName}
                      </span>
                      {work.isFeatured && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950">
                          Featured ✨
                        </span>
                      )}
                    </div>
                    {work.isSold && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-zinc-900/80 text-white backdrop-blur-md pointer-events-none">
                        Sold Out
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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

                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors">
                      {work.title}
                    </h3>
                    <p className="text-sm text-zinc-500 line-clamp-2">{work.description}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-rose-50 dark:border-zinc-800 flex items-center justify-between">
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
                      className="p-2 rounded-full text-zinc-500 hover:text-rose-600 hover:bg-rose-50"
                    >
                      {copiedId === work.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
                    </button>
                    <a
                      href={work.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 rounded-full shadow-md"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Beli</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal Detail Karya (Fit Zero Scroll, Compact Layout) */}
      {activeModalWork && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md cursor-pointer animate-fade-in"
            onClick={() => setActiveModalWork(null)}
          >
            <div
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative cursor-default flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModalWork(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 transition-colors shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 max-h-[85vh] overflow-y-auto">
                <div className="bg-rose-50 dark:bg-zinc-800 flex items-center justify-center p-3">
                  <img
                    src={activeModalWork.imageUrl}
                    alt={activeModalWork.title}
                    className="max-h-[220px] sm:max-h-[280px] w-full object-contain rounded-2xl"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
                        {activeModalWork.categoryName}
                      </span>
                      {activeModalWork.isSold && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          Terjual
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                      {activeModalWork.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed line-clamp-3">
                      {activeModalWork.description}
                    </p>

                    <div>
                      <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider">Harga</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                        {activeModalWork.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-rose-100 dark:border-zinc-800">
                    <a
                      href={activeModalWork.shopeeUrl || activeModalWork.buyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Beli di Shopee</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>

                    <a
                      href={activeModalWork.tiktokShopUrl || "https://tiktok.com"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl border border-zinc-700 transition-colors"
                    >
                      <span>Beli di TikTok Shop</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}

      <Footer />
    </div>
  );
}
