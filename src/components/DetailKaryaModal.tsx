"use client";

import React from "react";
import { Work, MOCK_SETTINGS } from "@/data/mockData";
import { X, ShoppingCart, ExternalLink, MessageCircle, Sparkles } from "lucide-react";

interface DetailKaryaModalProps {
  work: Work | null;
  onClose: () => void;
}

export default function DetailKaryaModal({ work, onClose }: DetailKaryaModalProps) {
  if (!work) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700 transition-colors shadow-md"
          aria-label="Tutup Detail"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[4/3] bg-rose-50 dark:bg-zinc-800 relative overflow-hidden">
            <img
              src={work.imageUrl}
              alt={work.title}
              className="w-full h-full object-cover"
            />
            {work.isSold && (
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-zinc-900/80 text-white backdrop-blur-md">
                Terjual (Sold Out)
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {work.categoryName}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                {work.title}
              </h3>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {work.description}
              </p>

              <div className="pt-2">
                <span className="text-xs text-zinc-400 block font-medium">Harga</span>
                <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                  {work.price}
                </span>
              </div>
            </div>

            {/* Action Links */}
            <div className="space-y-2 pt-4 border-t border-rose-100 dark:border-zinc-800">
              <a
                href={work.shopeeUrl || work.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Beli di Shopee</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>

              <a
                href={work.tiktokShopUrl || "https://tiktok.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-zinc-950 hover:bg-zinc-900 dark:bg-zinc-800 rounded-xl border border-zinc-700 transition-colors"
              >
                <span>Beli di TikTok Shop</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>

              <a
                href={`https://wa.me/${MOCK_SETTINGS.whatsappNumber}?text=Halo%20No%20More%20Craft,%20saya%20tertarik%20dengan%20karya%20${encodeURIComponent(work.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 rounded-xl transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Pesan Custom via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
