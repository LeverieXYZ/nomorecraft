"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_SHOP_PRODUCTS, ShopProduct } from "@/data/mockData";
import { Sparkles, ShoppingBag, Video, ExternalLink, Search, Check, Filter, X, Eye, ShoppingCart } from "lucide-react";
import ModalPortal from "@/components/ModalPortal";
import SafeImage from "@/components/SafeImage";

export default function BelanjaPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<ShopProduct | null>(null);

  const filteredProducts = MOCK_SHOP_PRODUCTS.filter((prod) =>
    prod.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-orange-50/60 via-pink-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 text-xs font-semibold">
            <ShoppingBag className="w-4 h-4" />
            <span>Toko Resmi Shopee & TikTok Shop</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Belanja Produk No More Craft
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Dapatkan promo gratis ongkir, voucher diskon, dan transaksi 100% aman langsung di marketplace pilihanmu!
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk (mis. Press-on Nails, Buket Pipe Cleaner...)"
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-orange-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Official Marketplace Banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shopee Card */}
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
                Official Marketplace
              </span>
              <h3 className="text-2xl font-extrabold">Shopee Official Store</h3>
              <p className="text-orange-100 text-sm">
                Nikmati Voucher Gratis Ongkir Ekstra dan CashBack s/d 50% setiap harinya!
              </p>
            </div>
            <a
              href="https://shopee.co.id/nomorecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-orange-600 bg-white hover:bg-orange-50 shadow-md transition-transform group-hover:scale-105"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Buka Toko Shopee</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* TikTok Shop Card */}
          <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group border border-zinc-800">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
                Live Shopping
              </span>
              <h3 className="text-2xl font-extrabold">TikTok Shop Official</h3>
              <p className="text-zinc-300 text-sm">
                Tonton Live Crafting harian dan klaim Kupon Diskon Spesial Penonton Live!
              </p>
            </div>
            <a
              href="https://tiktok.com/@nomorecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-zinc-900 bg-white hover:bg-zinc-100 shadow-md transition-transform group-hover:scale-105"
            >
              <span>Buka TikTok Shop</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-8 text-center">
          Katalog Produk Siap Order ({filteredProducts.length})
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setActiveModalProduct(product)}
              className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-orange-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] overflow-hidden bg-orange-50 dark:bg-zinc-800 relative">
                  <SafeImage src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs z-10">
                    {product.stockStatus}
                  </span>

                  {/* Eye Icon Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProduct(product);
                      }}
                      className="p-3.5 rounded-full bg-white text-zinc-900 shadow-xl hover:scale-115 transition-transform cursor-pointer flex items-center gap-1.5 font-bold text-xs"
                      title="Lihat Detail Produk"
                    >
                      <Eye className="w-5 h-5 text-rose-600" />
                      <span>Lihat Detail</span>
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors">{product.name}</h3>
                  <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400">{product.price}</div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2" onClick={(e) => e.stopPropagation()}>
                <a
                  href={product.shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Beli di Shopee</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>

                <a
                  href={product.tiktokshopUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-700 transition-colors"
                >
                  <span>Beli di TikTok Shop</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Detail Produk (Fit Zero Scroll, Compact Layout) */}
      {activeModalProduct && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md cursor-pointer animate-fade-in"
            onClick={() => setActiveModalProduct(null)}
          >
            <div
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative cursor-default flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 transition-colors shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 max-h-[85vh] overflow-y-auto">
                <div className="bg-rose-50 dark:bg-zinc-800 flex items-center justify-center p-3">
                  <SafeImage
                    src={activeModalProduct.imageUrl}
                    alt={activeModalProduct.name}
                    className="max-h-[220px] sm:max-h-[280px] w-full object-contain rounded-2xl"
                  />
                </div>

                <div className="p-4 sm:p-5 flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                      {activeModalProduct.stockStatus}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                      {activeModalProduct.name}
                    </h3>

                    <div>
                      <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider">Harga</span>
                      <span className="text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                        {activeModalProduct.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-rose-100 dark:border-zinc-800">
                    <a
                      href={activeModalProduct.shopeeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Beli di Shopee</span>
                      <ExternalLink className="w-3 h-3 ml-auto" />
                    </a>

                    <a
                      href={activeModalProduct.tiktokshopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-zinc-700 transition-colors"
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
