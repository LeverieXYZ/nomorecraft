"use client";

import React from "react";
import { MOCK_SETTINGS } from "@/data/mockData";
import { Heart, Sparkles, Target, Compass, MessageCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 bg-gradient-to-b from-pink-50/40 via-rose-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Photos Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
              
              {/* Main Photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-zinc-800 aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                  alt="Proses Pembuatan Kerajinan"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-5">
                  <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                    <span>Dibuat dengan rasa cinta & ketelitian</span>
                  </span>
                </div>
              </div>

              {/* Grid 2 Photos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-zinc-800 aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80"
                    alt="Detail Rajutan Crochet"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-zinc-800 aspect-square">
                  <img
                    src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=500&q=80"
                    alt="Pipe Cleaner Bouquet"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </div>

              {/* Floating Owner Badge */}
              <div className="absolute -bottom-6 -right-2 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-xl border border-rose-100 dark:border-zinc-700 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  C
                </div>
                <div>
                  <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">Pemilik Studio</p>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white">{MOCK_SETTINGS.ownerName}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tentang No More Craft</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Mengenal Kisah di Balik Setiap Kreasiku
            </h2>

            <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
              {MOCK_SETTINGS.aboutText}
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Misi Kami</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Menghadirkan barang buatan tangan berkualitas tinggi yang memancarkan keceriaan dan kesan eksklusif bagi pemiliknya.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800 shadow-xs space-y-2">
                <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Nilai & Kualitas</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Memakai material terbaik, ramah lingkungan, dan senantiasa melayani pesanan kustom dengan ramah & responsif.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Contact Link */}
            <div className="pt-4">
              <a
                href={`https://wa.me/${MOCK_SETTINGS.whatsappNumber}?text=Halo%20No%20More%20Craft,%20saya%20tertarik%20tanya%20produk`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-md shadow-emerald-200 dark:shadow-none transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Tanya Langsung via WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
