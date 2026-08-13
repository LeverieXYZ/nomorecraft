"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { MOCK_BANNERS, MOCK_SETTINGS } from "@/data/mockData";
import { Save, Plus, Trash2, Check, Image as ImageIcon, Eye } from "lucide-react";

export default function AdminKelolaBerandaPage() {
  const [heroTitle, setHeroTitle] = useState(MOCK_SETTINGS.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(MOCK_SETTINGS.heroSubtitle);
  const [banners, setBanners] = useState(MOCK_BANNERS);

  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    setBanners([
      {
        id: Date.now(),
        title: newTitle,
        subtitle: newSubtitle,
        imageUrl: newImageUrl,
        buttonText: "Lihat Detail",
        buttonLink: "#galeri",
        isActive: true,
        badgeText: "Baru ✨",
      },
      ...banners,
    ]);

    setNewTitle("");
    setNewSubtitle("");
    setNewImageUrl("");
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CMS Kelola Content Beranda</h1>
            <p className="text-sm text-zinc-400">
              Atur banner carousel, teks hero utama, dan promo spesial yang tampil di halaman depan.
            </p>
          </div>

          {saved && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Teks Hero Disimpan!</span>
            </div>
          )}
        </div>

        {/* Hero Section Edit */}
        <form onSubmit={handleSaveHero} className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-rose-500" />
            <span>Teks Hero Utama Beranda</span>
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Hero (Headline)</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Sub-judul / Deskripsi Hero</label>
              <textarea
                rows={3}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan Hero</span>
            </button>
          </div>
        </form>

        {/* Add New Banner */}
        <form onSubmit={handleAddBanner} className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-rose-500" />
            <span>Tambah Hero Banner Slider Baru</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Banner</label>
              <input
                type="text"
                required
                placeholder="mis. Promo Spesia Valentine Press-on"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Sub-judul Banner</label>
              <input
                type="text"
                placeholder="mis. Diskon 20% khusus pesanan custom..."
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">URL Gambar Banner</label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Banner</span>
            </button>
          </div>
        </form>

        {/* Existing Banners Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Daftar Banner Aktif ({banners.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div key={b.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-md">
                <div className="aspect-[21/9] bg-zinc-950 relative">
                  <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover opacity-80" />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white">
                    {b.badgeText || "Promo"}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-white">{b.title}</h3>
                  <p className="text-xs text-zinc-400">{b.subtitle}</p>
                  <div className="flex justify-end pt-2 border-t border-zinc-800">
                    <button
                      onClick={() => handleDeleteBanner(b.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus Banner</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
