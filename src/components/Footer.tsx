"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, MessageCircle, Instagram, Video, ShoppingBag, Heart, ArrowUpRight } from "lucide-react";
import { MOCK_SETTINGS } from "@/data/mockData";

export default function Footer() {
  const waPrefilledUrl = `https://wa.me/${MOCK_SETTINGS.whatsappNumber}?text=${encodeURIComponent(
    "Halo No More Craft, saya tertarik dengan produk kerajinan handmade dan ingin konsultasi!"
  )}`;

  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-16 pb-12 border-t border-zinc-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-0.5 shadow-lg">
                <div className="w-full h-full bg-zinc-900 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                No More Craft
              </span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Crafting & Handmade berkualitas tinggi dari Press-on Nails eksklusif, buket kawat bulu Pipe Cleaner, hingga rajutan Crochet buatan tangan dengan penuh cinta.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={waPrefilledUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all"
                title="WhatsApp CS"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://instagram.com/nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-white border border-pink-500/30 transition-all"
                title="Instagram @nomorecraft"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-all"
                title="TikTok @nomorecraft"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-sm text-zinc-400 font-medium">
              <li>
                <Link href="/" className="hover:text-rose-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/galeri" className="hover:text-rose-400 transition-colors">Galeri Karya</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-rose-400 transition-colors">Blog & Tutorial</Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-rose-400 transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/belanja" className="hover:text-rose-400 transition-colors">Toko Marketplace</Link>
              </li>
              <li>
                <Link href="/kontak" className="hover:text-rose-400 transition-colors">Kontak</Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kategori Produk</h4>
            <ul className="space-y-2 text-sm text-zinc-400 font-medium">
              <li>Press-on Nails</li>
              <li>Buket Pipe Cleaner</li>
              <li>Bunga Kawat Bulu</li>
              <li>Rajutan Crochet</li>
              <li>Custom Gift Set</li>
            </ul>
          </div>

          {/* Marketplace Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Toko Resmi</h4>
            <div className="space-y-2.5">
              <a
                href="https://shopee.co.id/nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shopee Official</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://tiktok.com/@nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 text-xs font-bold transition-all"
              >
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-pink-400" />
                  <span>TikTok Shop</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} No More Craft. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk pecinta crafting & kuku cantik</span>
          </div>
        </div>

      </div>

      {/* Floating Sticky WhatsApp Button */}
      <a
        href={waPrefilledUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-2xl hover:scale-108 transition-all duration-300 animate-pulse"
        title="Chat CS WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">Tanya via WhatsApp</span>
      </a>
    </footer>
  );
}
