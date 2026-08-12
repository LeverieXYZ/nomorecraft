"use client";

import React from "react";
import { MOCK_SHOP_LINKS } from "@/data/mockData";
import { ShoppingBag, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

export default function QuickShopBar() {
  const shopeeLink = MOCK_SHOP_LINKS.find((l) => l.platform === "Shopee")?.url || "https://shopee.co.id";
  const tiktokLink = MOCK_SHOP_LINKS.find((l) => l.platform === "TikTok Shop")?.url || "https://tiktok.com";

  return (
    <div className="py-6 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white shadow-xl relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left message */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md shrink-0 hidden sm:flex">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Official Stores</span>
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
              Siap Pesan Kerajinan Handcrafted Favoritmu?
            </h3>
            <p className="text-xs sm:text-sm text-white/90">
              Belanja langsung dengan gratis ongkir & promo cashback di marketplace resmi kami.
            </p>
          </div>
        </div>

        {/* Right CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <a
            href={shopeeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-white text-orange-600 hover:bg-orange-50 shadow-lg hover:scale-105 transition-all"
          >
            <ShoppingBag className="w-4 h-4 text-orange-500" />
            <span>Shopee Store</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <a
            href={tiktokLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold bg-zinc-950 text-white hover:bg-zinc-900 shadow-lg hover:scale-105 transition-all border border-zinc-800"
          >
            <ShoppingBag className="w-4 h-4 text-pink-400" />
            <span>TikTok Shop</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>

      </div>
    </div>
  );
}
