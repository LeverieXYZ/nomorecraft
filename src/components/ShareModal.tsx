"use client";

import React, { useState } from "react";
import { Work } from "@/data/mockData";
import { X, Share2, Check, Copy, MessageSquare, Twitter, Facebook } from "lucide-react";

interface ShareModalProps {
  work: Work | null;
  onClose: () => void;
}

export default function ShareModal({ work, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!work) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Lihat kerajinan handmade "${work.title}" seharga ${work.price} di No More Craft!`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${currentUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${currentUrl}`)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
  const shareFacebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-100 dark:border-zinc-800 relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-rose-50"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">Bagikan Karya</h3>
            <p className="text-xs text-zinc-500 line-clamp-1">{work.title}</p>
          </div>
        </div>

        {/* Share Options Grid */}
        <div className="grid grid-cols-3 gap-3">
          <a
            href={shareWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:scale-105 transition-transform text-emerald-700 dark:text-emerald-300"
          >
            <MessageSquare className="w-5 h-5 fill-emerald-500 text-emerald-500" />
            <span className="text-xs font-bold">WhatsApp</span>
          </a>

          <a
            href={shareTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 hover:scale-105 transition-transform text-sky-700 dark:text-sky-300"
          >
            <Twitter className="w-5 h-5 fill-sky-500 text-sky-500" />
            <span className="text-xs font-bold">Twitter (X)</span>
          </a>

          <a
            href={shareFacebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-transform text-blue-700 dark:text-blue-300"
          >
            <Facebook className="w-5 h-5 fill-blue-500 text-blue-500" />
            <span className="text-xs font-bold">Facebook</span>
          </a>
        </div>

        {/* Copy Link Input */}
        <div className="pt-2">
          <label className="block text-xs font-bold text-zinc-500 mb-1">Salin Tautan</label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="flex-1 px-3 py-1 bg-transparent text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none truncate"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Tersalin" : "Salin"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
