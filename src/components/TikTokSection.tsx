"use client";

import React, { useState, useEffect } from "react";
import { MOCK_TIKTOK_VIDEOS, TikTokVideo } from "@/data/mockData";
import { Play, ExternalLink, Video, Sparkles } from "lucide-react";
import SafeImage from "./SafeImage";

export default function TikTokSection() {
  const [videos, setVideos] = useState<TikTokVideo[]>(MOCK_TIKTOK_VIDEOS);
  const [activeVideo, setActiveVideo] = useState<TikTokVideo>(MOCK_TIKTOK_VIDEOS[0]);

  useEffect(() => {
    fetch("/api/tiktok")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setVideos(json.data);
          const featured = json.data.find((v: TikTokVideo) => v.isFeatured) || json.data[0];
          setActiveVideo(featured);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="tiktok" className="py-20 bg-gradient-to-b from-white via-pink-50/20 to-rose-50/40 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 text-xs font-semibold">
            <Video className="w-3.5 h-3.5" />
            <span>TikTok Video Feed</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Intip Serunya Proses Crafting Kami
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Tonton video pendek pembuatan kreasi, unboxing buket, hingga behind-the-scenes pembuatan orderan custom!
          </p>

          {/* Top Action Button */}
          <div className="pt-2">
            <a
              href="https://tiktok.com/@nomorecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-md transition-transform hover:scale-105"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Kunjungi TikTok @nomorecraft</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Video Player & Feed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Video Embed / Preview */}
          <div className="lg:col-span-7 bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 relative group">
            <div className="aspect-video bg-zinc-950 relative overflow-hidden flex items-center justify-center">
              <SafeImage
                src={activeVideo.thumbnailUrl}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Play Button Overlay */}
              <a
                href={activeVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute p-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white shadow-xl hover:scale-110 transition-transform flex items-center justify-center group/btn"
                title="Buka Video di TikTok"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </a>

              {/* Unggulan Label */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-400 text-amber-950 shadow-md">
                <Sparkles className="w-3.5 h-3.5 fill-amber-950" />
                <span>Video Unggulan</span>
              </div>
            </div>

            {/* Info Bar */}
            <div className="p-6 bg-zinc-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-zinc-800">
              <div>
                <p className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Sedang Diputar</p>
                <h3 className="text-base font-bold line-clamp-1">{activeVideo.title}</h3>
              </div>

              <a
                href={activeVideo.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 rounded-full border border-zinc-700 transition-colors shrink-0"
              >
                <span>Tonton di TikTok</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Playlist Grid */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider px-1">
              Video Terbaru Lainnya
            </h3>

            <div className="space-y-3">
              {videos.map((vid) => {
                const isActive = activeVideo.id === vid.id;
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex items-center gap-4 ${
                      isActive
                        ? "bg-rose-50 dark:bg-zinc-800/90 border-rose-300 dark:border-rose-700 shadow-md"
                        : "bg-white dark:bg-zinc-900 border-rose-100 dark:border-zinc-800 hover:bg-rose-50/50 dark:hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="w-20 h-14 rounded-xl overflow-hidden bg-zinc-800 relative shrink-0">
                      <SafeImage
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-2 leading-snug">
                        {vid.title}
                      </p>
                      <span className="text-[11px] text-rose-500 font-medium mt-1 inline-block">
                        {isActive ? "● Sedang Dipilih" : "Klik untuk putar"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Profile CTA Button */}
            <div className="pt-2">
              <a
                href="https://tiktok.com/@nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-white bg-zinc-950 dark:bg-zinc-800 hover:bg-zinc-900 dark:hover:bg-zinc-700 rounded-2xl shadow-lg border border-zinc-800 transition-all hover:scale-[1.02]"
              >
                <Video className="w-4 h-4 text-pink-400" />
                <span>Lihat Feed Lengkap di TikTok @nomorecraft</span>
                <ExternalLink className="w-4 h-4 ml-auto" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
