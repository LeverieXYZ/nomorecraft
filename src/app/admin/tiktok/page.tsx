"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { MOCK_TIKTOK_VIDEOS, TikTokVideo } from "@/data/mockData";
import { Plus, Trash2, Video, Check, Star } from "lucide-react";

export default function AdminKelolaTikTokPage() {
  const [videos, setVideos] = useState<TikTokVideo[]>(MOCK_TIKTOK_VIDEOS);
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) return;

    const newVideo: TikTokVideo = {
      id: Date.now(),
      title,
      videoUrl,
      embedUrl: videoUrl,
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
      isFeatured,
      sortOrder: 0,
    };

    setVideos([newVideo, ...videos]);
    setTitle("");
    setVideoUrl("");
    setThumbnailUrl("");
    setIsFeatured(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeleteVideo = (id: number) => {
    setVideos(videos.filter((v) => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CMS Kelola Video TikTok</h1>
            <p className="text-sm text-zinc-400">
              Tambah link video TikTok baru dan tandai video sebagai Video Unggulan.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Video TikTok Ditambahkan!</span>
            </div>
          )}
        </div>

        {/* Add Form */}
        <form onSubmit={handleAddVideo} className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-pink-500" />
            <span>Tambah Link Video TikTok Baru</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Video TikTok</label>
              <input
                type="text"
                required
                placeholder="mis. Tutorial Memakai Press-on Nails..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">URL Video TikTok</label>
              <input
                type="url"
                required
                placeholder="https://tiktok.com/@nomorecraft/video/..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">URL Gambar Thumbnail</label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex items-center pt-6 gap-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 bg-zinc-800 border-zinc-700"
              />
              <label htmlFor="isFeatured" className="text-xs font-bold text-white cursor-pointer flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Tandai Sebagai Video Unggulan</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 shadow-md transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Video</span>
            </button>
          </div>
        </form>

        {/* Existing TikTok Videos Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Video className="w-5 h-5 text-pink-500" />
            <span>Video TikTok Di Feed ({videos.length})</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v) => (
              <div key={v.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] bg-zinc-950 relative">
                    <img src={v.thumbnailUrl} alt={v.title} className="w-full h-full object-cover" />
                    {v.isFeatured && (
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-amber-950">
                        Unggulan ✨
                      </span>
                    )}
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-sm font-bold text-white line-clamp-2">{v.title}</h3>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => handleDeleteVideo(v.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
