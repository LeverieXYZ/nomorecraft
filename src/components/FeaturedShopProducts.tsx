"use client";

import React from "react";
import { MOCK_SHOP_PRODUCTS } from "@/data/mockData";
import { ShoppingCart, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";

export default function FeaturedShopProducts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-rose-500 uppercase tracking-wider block">Ready to Ship</span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
            Produk Unggulan Siap Order
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_SHOP_PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-4/3 overflow-hidden bg-rose-50 dark:bg-zinc-800 relative">
                <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {prod.stockStatus}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h4 className="text-base font-bold text-zinc-900 dark:text-white">{prod.name}</h4>
                <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400">{prod.price}</div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-2">
              <a
                href={prod.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-colors"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Beli di Shopee</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>

              <a
                href={prod.tiktokshopUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-700 transition-colors"
              >
                <span>Beli di TikTok Shop</span>
                <ExternalLink className="w-3.5 h-3.5 ml-auto" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
