"use client";

import React, { useState } from "react";
import { MOCK_SHOP_PRODUCTS, MOCK_SHOP_LINKS, ShopProduct } from "@/data/mockData";
import { ShoppingBag, ExternalLink, ShoppingCart, Sparkles, Eye, X } from "lucide-react";

export default function ShopSection() {
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);

  return (
    <section id="belanja" className="py-20 bg-white dark:bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-semibold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Toko Online Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Belanja Mudah di Platform Favoritmu
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Dapatkan garansi pengiriman aman dan voucher gratis ongkir langsung melalui Shopee Official atau TikTok Shop.
          </p>
        </div>

        {/* Store Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Shopee Store Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-2 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
                Official Marketplace
              </span>
              <h3 className="text-2xl font-extrabold">Shopee Store No More Craft</h3>
              <p className="text-sm opacity-90 max-w-md">
                Nikmati cashback ekstra, gratis ongkir se-Indonesia, serta opsi pembayaran COD & ShopeePay.
              </p>
            </div>

            <div className="z-10">
              <a
                href={MOCK_SHOP_LINKS.find((l) => l.platform === "Shopee")?.url || "https://shopee.co.id"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-orange-600 bg-white hover:bg-orange-50 shadow-md transition-all group-hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Kunjungi Shopee Store</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* TikTok Shop Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-pink-950 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group border border-zinc-800">
            <div className="space-y-2 z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 backdrop-blur-md border border-pink-500/30">
                Live Shopping
              </span>
              <h3 className="text-2xl font-extrabold">TikTok Shop Official</h3>
              <p className="text-sm opacity-90 max-w-md">
                Diskon spesial saat sesi Live TikTok! Checkout cepat tanpa berpindah dari aplikasi TikTok.
              </p>
            </div>

            <div className="z-10">
              <a
                href={MOCK_SHOP_LINKS.find((l) => l.platform === "TikTok Shop")?.url || "https://tiktok.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-md transition-all group-hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buka TikTok Shop</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Featured Products Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-500" />
              <span>Produk Unggulan Siap Order</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_SHOP_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onClick={() => setActiveModalProduct(prod)}
                className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl p-5 border border-rose-100 dark:border-zinc-800 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-lg transition-all"
              >
                <div className="space-y-3">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-rose-50 dark:bg-zinc-800 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white backdrop-blur-md z-10 ${
                        prod.stockStatus === "Ready Stock" ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                    >
                      {prod.stockStatus}
                    </span>

                    {/* Quick Action Eye Icon Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalProduct(prod);
                        }}
                        className="p-3.5 rounded-full bg-white text-zinc-900 shadow-xl hover:scale-115 transition-transform cursor-pointer flex items-center gap-1.5 font-bold text-xs"
                        title="Lihat Detail Produk"
                      >
                        <Eye className="w-5 h-5 text-rose-600" />
                        <span>Lihat Detail</span>
                      </button>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors">
                    {prod.name}
                  </h4>
                  <span className="text-lg font-extrabold text-rose-600 dark:text-rose-400 block">
                    {prod.price}
                  </span>
                </div>

                <div
                  className="grid grid-cols-2 gap-2 pt-2 border-t border-rose-50 dark:border-zinc-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={prod.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 hover:bg-orange-100 font-bold text-xs text-center transition-colors"
                  >
                    Shopee
                  </a>
                  <a
                    href={prod.tiktokshopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 font-bold text-xs text-center transition-colors"
                  >
                    TikTok Shop
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Guide Box */}
        <div className="mt-16 p-8 rounded-3xl bg-rose-50/60 dark:bg-zinc-900/60 border border-rose-100 dark:border-zinc-800">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
            💡 Panduan Mudah Memesan Produk Kustom
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-600 dark:text-zinc-300">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-200/60 dark:bg-rose-950 text-rose-600 shrink-0 font-bold">1</div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">Pilih Karya atau Desain Impian</p>
                <p className="text-xs text-zinc-500 mt-1">Cari karya di galeri atau siapkan foto referensi kustom kuku/rajutanmu.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-pink-200/60 dark:bg-pink-950 text-pink-600 shrink-0 font-bold">2</div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">Konsultasi Ukuran & Detail</p>
                <p className="text-xs text-zinc-500 mt-1">Hubungi admin WhatsApp untuk kirim ukuran kuku atau warna benang.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-200/60 dark:bg-amber-950 text-amber-600 shrink-0 font-bold">3</div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-white">Checkout & Pengiriman</p>
                <p className="text-xs text-zinc-500 mt-1">Lakukan pembayaran via Shopee / Toko atau Transfer Bank aman.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Detail Produk (High Z-Index z-[9999]) */}
      {activeModalProduct && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md cursor-pointer animate-fade-in"
          onClick={() => setActiveModalProduct(null)}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-rose-50 dark:bg-zinc-800 relative overflow-hidden">
                <img
                  src={activeModalProduct.imageUrl}
                  alt={activeModalProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                    {activeModalProduct.stockStatus}
                  </span>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{activeModalProduct.name}</h3>
                  <div>
                    <span className="text-xs text-zinc-400 block">Harga</span>
                    <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">{activeModalProduct.price}</span>
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-rose-100 dark:border-zinc-800">
                  <a
                    href={activeModalProduct.shopeeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Beli di Shopee</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                  </a>
                  <a
                    href={activeModalProduct.tiktokshopUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-700 transition-colors"
                  >
                    <span>Beli di TikTok Shop</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
