"use client";

import React, { useState, useEffect } from "react";
import { MOCK_CATEGORIES, Work, Category } from "@/data/mockData";
import { Sparkles, ShoppingBag, Video, Check, Share2, Eye, Images } from "lucide-react";
import GalleryDetailModal from "./GalleryDetailModal";
import SafeImage from "./SafeImage";

export default function CategoryShowcase() {
  const [works, setWorks] = useState<Work[]>([]);
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [activeModalWork, setActiveModalWork] = useState<Work | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/galeri")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          if (Array.isArray(json.data.works)) {
            setWorks(json.data.works);
          }
          if (Array.isArray(json.data.categories) && json.data.categories.length > 0) {
            setCategories(json.data.categories);
          }
        }
      })
      .catch(() => {});
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
            Setiap karya dirancang unik dengan detail presisi. Klik karya untuk melihat galeri foto lengkap & detail spesifikasinya.
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

          {categories.map((cat) => {
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
          {filteredWorks.map((work) => {
            const itemStatus = work.stockStatus || (work.isSold ? "Sold Out" : "Ready Stock");
            const shopeeLink = work.shopeeUrl || work.buyLink || "https://shopee.co.id/nomorecraft";
            const tiktokLink = work.tiktokShopUrl || "https://tiktok.com/@nomorecraft";
            const totalPhotos = work.images && work.images.length > 0 ? work.images.length : 1;

            return (
              <div
                key={work.id}
                onClick={() => setActiveModalWork(work)}
                className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-rose-50 dark:bg-zinc-800">
                  <SafeImage
                    src={work.imageUrl}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category & Featured Badges Overlay */}
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

                  {/* Stock Status Badge (Ready Stock / Pre-Order / Sold Out) */}
                  <div className="absolute top-3 right-3 pointer-events-none">
                    {itemStatus === "Ready Stock" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md backdrop-blur-md">
                        Ready Stock ✨
                      </span>
                    )}
                    {itemStatus === "Pre-Order" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-600 text-white shadow-md backdrop-blur-md">
                        Pre-Order ⏳
                      </span>
                    )}
                    {itemStatus === "Sold Out" && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-900/90 text-zinc-300 border border-zinc-700 backdrop-blur-md">
                        Sold Out ❌
                      </span>
                    )}
                  </div>

                  {/* Multiple Photos Badge */}
                  {totalPhotos > 1 && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/70 text-white backdrop-blur-md shadow pointer-events-none">
                      <Images className="w-3.5 h-3.5 text-rose-400" />
                      <span>{totalPhotos} Foto</span>
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
                      title="Lihat Detail & Galeri Carousel"
                    >
                      <Eye className="w-5 h-5 text-rose-600" />
                      <span>Lihat Galeri Foto</span>
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

                  <div className="pt-3 border-t border-rose-50 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] text-zinc-400 block font-medium">Harga</span>
                      <span className="text-base sm:text-lg font-extrabold text-rose-600 dark:text-rose-400">
                        {work.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
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

                      {/* Shopee Buy Button */}
                      <a
                        href={shopeeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-full shadow-sm hover:shadow-orange-200/50 transition-all hover:scale-105"
                        title="Beli di Shopee"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shopee</span>
                      </a>

                      {/* TikTok Shop Buy Button */}
                      <a
                        href={tiktokLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-3 py-2 text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full border border-zinc-700/60 shadow-sm transition-all hover:scale-105"
                        title="Beli di TikTok Shop"
                      >
                        <Video className="w-3.5 h-3.5 text-pink-400" />
                        <span>TikTok</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Mode Carousel Modal Detail Preview */}
      <GalleryDetailModal
        work={activeModalWork}
        onClose={() => setActiveModalWork(null)}
      />
    </section>
  );
}
