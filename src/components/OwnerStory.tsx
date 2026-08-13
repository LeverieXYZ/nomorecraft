"use client";

import React from "react";
import { MOCK_SETTINGS } from "@/data/mockData";
import { Heart, Sparkles, Quote, MessageCircle, Instagram } from "lucide-react";

export default function OwnerStory() {
  return (
    <div className="bg-gradient-to-r from-rose-500/10 via-pink-500/5 to-purple-500/10 dark:from-rose-950/30 dark:via-pink-950/20 dark:to-purple-950/30 p-8 sm:p-12 rounded-3xl border border-rose-200 dark:border-zinc-800 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Owner Image */}
        <div className="md:col-span-5 relative group">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-zinc-800 bg-rose-100 dark:bg-zinc-800">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"
              alt={MOCK_SETTINGS.ownerName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 p-4 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl border border-rose-100 dark:border-zinc-800 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
            <div className="text-left">
              <span className="text-xs font-bold text-zinc-900 dark:text-white block">Founder & Crafter</span>
              <span className="text-[11px] text-rose-500 font-semibold">{MOCK_SETTINGS.ownerName}</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
            <Quote className="w-3.5 h-3.5" />
            <span>Kisah Di Balik Karya</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
            &ldquo;Seni Handmade Menyimpan Perasaan &amp; Cerita di Setiap Sentuhan&rdquo;
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Berawal dari hobi membuat hadiah buket bunga pipe cleaner unik untuk teman terdekat, kecintaan {MOCK_SETTINGS.ownerName} berkembang menjadi No More Craft. Kini, kami membantu ratusan pelanggan merayakan momen istimewa lewat kuku palsu Press-on Nails dan buket bunga yang tidak pernah layu.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/${MOCK_SETTINGS.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Sapa {MOCK_SETTINGS.ownerName} via WA</span>
            </a>
            <a
              href="https://instagram.com/nomorecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 hover:bg-rose-50 border border-zinc-200 dark:border-zinc-700 transition-colors"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>Instagram @nomorecraft</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
