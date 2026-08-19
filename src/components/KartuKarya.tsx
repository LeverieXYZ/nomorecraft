"use client";

import React, { useState } from "react";
import { Work } from "@/data/mockData";
import { ShoppingCart, Share2, Eye, Check } from "lucide-react";
import SafeImage from "./SafeImage";

interface KartuKaryaProps {
  work: Work;
  onSelect: (work: Work) => void;
}

export default function KartuKarya({ work, onSelect }: KartuKaryaProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      onClick={() => onSelect(work)}
      className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-rose-50 dark:bg-zinc-800">
          <SafeImage
            src={work.imageUrl}
            alt={work.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-zinc-900/90 text-rose-600 dark:text-rose-400 backdrop-blur-md shadow-xs">
              {work.categoryName}
            </span>
            {work.isFeatured && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950 shadow-xs">
                Featured ✨
              </span>
            )}
          </div>

          {work.isSold && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-zinc-900/80 text-white backdrop-blur-md">
              Terjual (Sold Out)
            </span>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="p-3 rounded-full bg-white/90 text-zinc-900 shadow-lg hover:scale-110 transition-transform">
              <Eye className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="p-6 space-y-2">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {work.title}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {work.description}
          </p>
        </div>
      </div>

      {/* Footer / Price & Action */}
      <div className="px-6 pb-6 pt-3 border-t border-rose-50 dark:border-zinc-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-zinc-400 block font-medium">Harga</span>
          <span className="text-lg font-extrabold text-rose-600 dark:text-rose-400">
            {work.price}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-full text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors"
            title="Bagikan link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
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
  );
}
