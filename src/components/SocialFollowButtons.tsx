"use client";

import React from "react";
import { MOCK_SETTINGS } from "@/data/mockData";
import { Instagram, Video, MessageCircle, ExternalLink, Sparkles, UserPlus } from "lucide-react";

export default function SocialFollowButtons() {
  return (
    <div className="bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-purple-500/10 dark:from-pink-950/30 dark:via-rose-950/30 dark:to-purple-950/30 p-8 rounded-3xl border border-rose-200 dark:border-zinc-800 shadow-md text-center space-y-6">
      <div className="space-y-2 max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ikuti Media Sosial No More Craft</span>
        </div>
        <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
          Dapatkan Update Karya & Promo Pertama!
        </h3>
        <p className="text-xs text-zinc-500">
          Ikuti akun sosial media resmi kami untuk video tutorial, giveaway buket, dan diskon eksklusif pengikut.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {/* TikTok Follow */}
        <a
          href="https://tiktok.com/@nomorecraft"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-900 shadow-lg hover:scale-105 transition-all border border-zinc-800"
        >
          <Video className="w-4 h-4 text-pink-400" />
          <span>Follow @nomorecraft di TikTok</span>
          <UserPlus className="w-3.5 h-3.5 ml-1 text-pink-400" />
        </a>

        {/* Instagram Follow */}
        <a
          href="https://instagram.com/nomorecraft"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 shadow-lg hover:scale-105 transition-all"
        >
          <Instagram className="w-4 h-4" />
          <span>Follow @nomorecraft di Instagram</span>
          <UserPlus className="w-3.5 h-3.5 ml-1" />
        </a>

        {/* WhatsApp Chat */}
        <a
          href={`https://wa.me/${MOCK_SETTINGS.whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:scale-105 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>Chat CS WhatsApp</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
