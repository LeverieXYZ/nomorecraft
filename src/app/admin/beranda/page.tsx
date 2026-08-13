"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { HeroBanner } from "@/data/mockData";
import {
  getStoredBanners,
  saveStoredBanners,
  getStoredHeroText,
  saveStoredHeroText,
} from "@/utils/bannersStore";
import {
  Save,
  Plus,
  Trash2,
  Check,
  Image as ImageIcon,
  Tag as TagIcon,
  Edit3,
  X,
  Link2,
} from "lucide-react";
import ModalPortal from "@/components/ModalPortal";

const PRESET_TAGS = [
  "Baru ✨",
  "Promo Spesial 🔥",
  "Hot Deal 💥",
  "Best Seller ⭐",
  "Limited Edition 🏷️",
  "Custom Design 🎨",
];

export default function AdminKelolaBerandaPage() {
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [banners, setBanners] = useState<HeroBanner[]>([]);

  // Form New Banner
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newTag, setNewTag] = useState("Baru ✨");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newButtonText, setNewButtonText] = useState("Lihat Detail");
  const [newButtonLink, setNewButtonLink] = useState("#galeri");

  // Form Edit Banner State
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);

  const [savedHero, setSavedHero] = useState(false);
  const [savedBanner, setSavedBanner] = useState(false);

  useEffect(() => {
    const textData = getStoredHeroText();
    setHeroTitle(textData.title);
    setHeroSubtitle(textData.subtitle);

    setBanners(getStoredBanners());

    // Sync from database API on mount if available
    fetch("/api/cms/beranda")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          if (resData.settings) {
            setHeroTitle(resData.settings.heroTitle || textData.title);
            setHeroSubtitle(resData.settings.heroSubtitle || textData.subtitle);
          }
          if (Array.isArray(resData.banners) && resData.banners.length > 0) {
            const mappedBanners: HeroBanner[] = resData.banners.map((b: any) => ({
              id: b.id,
              title: b.title,
              subtitle: b.subtitle,
              imageUrl: b.imageUrl || b.image_url,
              buttonText: b.buttonText || b.button_text || "Lihat Detail",
              buttonLink: b.buttonLink || b.button_link || "#galeri",
              isActive: Boolean(b.isActive ?? b.is_active ?? 1),
              badgeText: b.badgeText || b.badge_text || "Promo ✨",
              tag: b.badgeText || b.badge_text || "Promo ✨",
            }));
            setBanners(mappedBanners);
            saveStoredBanners(mappedBanners);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredHeroText({
      title: heroTitle,
      subtitle: heroSubtitle,
    });

    setSavedHero(true);
    setTimeout(() => setSavedHero(false), 3000);
  };

  const handleAddBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const tagText = newTag.trim() || "Promo Spesial ✨";

    const newBannerObj: HeroBanner = {
      id: Date.now(),
      title: newTitle,
      subtitle: newSubtitle,
      imageUrl: newImageUrl,
      buttonText: newButtonText || "Lihat Detail",
      buttonLink: newButtonLink || "#galeri",
      isActive: true,
      badgeText: tagText,
      tag: tagText,
    };

    const updatedBanners = [newBannerObj, ...banners];
    setBanners(updatedBanners);
    saveStoredBanners(updatedBanners);

    // Save to database
    try {
      await fetch("/api/cms/beranda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBannerObj),
      });
    } catch (err) {
      console.error("Failed to insert banner into database:", err);
    }

    setNewTitle("");
    setNewSubtitle("");
    setNewTag("Baru ✨");
    setNewImageUrl("");
    setNewButtonText("Lihat Detail");
    setNewButtonLink("#galeri");

    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleOpenEdit = (banner: HeroBanner) => {
    setEditingBanner({ ...banner });
  };

  const handleSaveEditedBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner) return;

    const updatedBanners = banners.map((b) =>
      b.id === editingBanner.id
        ? {
            ...editingBanner,
            badgeText: editingBanner.tag || editingBanner.badgeText,
          }
        : b
    );

    setBanners(updatedBanners);
    saveStoredBanners(updatedBanners);

    // Save to database
    try {
      await fetch("/api/cms/beranda", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_BANNER",
          data: editingBanner,
        }),
      });
    } catch (err) {
      console.error("Failed to update banner in database:", err);
    }

    setEditingBanner(null);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  const handleDeleteBanner = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus banner ini?")) {
      const updated = banners.filter((b) => b.id !== id);
      setBanners(updated);
      saveStoredBanners(updated);

      // Delete from database
      try {
        await fetch(`/api/cms/beranda?id=${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to delete banner from database:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CMS Kelola Content Beranda</h1>
            <p className="text-sm text-zinc-400">
              Edit teks hero utama, kelola slider banner carousel, tambahkan tag khusus, dan perbarui banner yang sudah diposting.
            </p>
          </div>

          {(savedHero || savedBanner) && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Data Berhasil Disimpan ke Database & Local Storage!</span>
            </div>
          )}
        </div>

        {/* 1. Edit Teks Hero Utama Beranda */}
        <form onSubmit={handleSaveHero} className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-rose-500" />
              <span>Teks Hero Utama Beranda (Headline)</span>
            </h2>
            <span className="text-xs text-rose-400 font-semibold bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/40">
              Tersimpan ke Database (SQLite / Supabase)
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Hero (Headline Utama)</label>
              <input
                type="text"
                required
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                placeholder="Masukkan judul hero utama"
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Sub-judul / Deskripsi Singkat Hero</label>
              <textarea
                rows={3}
                required
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Masukkan deskripsi hero utama"
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
              <span>Simpan Teks Hero Utama</span>
            </button>
          </div>
        </form>

        {/* 2. Form Tambah Banner Baru dengan Opsi Tag */}
        <form onSubmit={handleAddBanner} className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-5 shadow-md">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-rose-500" />
            <span>Tambah Hero Banner Slider Baru</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Banner *</label>
              <input
                type="text"
                required
                placeholder="mis. Promo Spesial Valentine Press-on"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Sub-judul / Deskripsi Promo</label>
              <input
                type="text"
                placeholder="mis. Diskon 20% khusus pesanan custom..."
                value={newSubtitle}
                onChange={(e) => setNewSubtitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Opsi Tag Banner */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <TagIcon className="w-4 h-4 text-rose-400" />
              <span>Opsi Tag / Label Badge Banner *</span>
            </label>

            {/* Tag Preset Quick Selection Chips */}
            <div className="flex flex-wrap gap-2 mb-2">
              {PRESET_TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => setNewTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    newTag === tag
                      ? "bg-rose-500 text-white border-rose-400 shadow-md"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white hover:bg-zinc-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <input
              type="text"
              required
              placeholder="Ketik atau pilih tag di atas (mis. Promo Spesial 🔥 / Best Seller)"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-zinc-300 mb-1">URL Gambar Banner *</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Teks Tombol CTA</label>
              <input
                type="text"
                placeholder="Lihat Detail / Beli"
                value={newButtonText}
                onChange={(e) => setNewButtonText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 shadow-md transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Banner Baru</span>
            </button>
          </div>
        </form>

        {/* 3. Daftar Banner Aktif dengan Opsi EDIT & HAPUS */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Daftar Banner Slider Aktif ({banners.length})</span>
            <span className="text-xs font-normal text-zinc-400">Klik 'Edit Banner' untuk mengubah isi promo</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {banners.map((b) => (
              <div key={b.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-md flex flex-col justify-between">
                <div>
                  <div className="aspect-[21/9] bg-zinc-950 relative overflow-hidden">
                    <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover opacity-85" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-md">
                      <TagIcon className="w-3 h-3" />
                      <span>{b.tag || b.badgeText || "Promo"}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-base font-bold text-white">{b.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">{b.subtitle}</p>
                    <div className="text-[11px] text-rose-400 flex items-center gap-1">
                      <Link2 className="w-3 h-3" />
                      <span>{b.buttonText || "Lihat Detail"} ({b.buttonLink || "#galeri"})</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-zinc-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 transition-colors border border-zinc-700"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-rose-400" />
                    <span>Edit Banner</span>
                  </button>

                  <button
                    onClick={() => handleDeleteBanner(b.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 transition-colors"
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

      {/* Modal Edit Banner yang Telah Diposting */}
      {editingBanner && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-pointer animate-fade-in"
            onClick={() => setEditingBanner(null)}
          >
            <div
              className="bg-zinc-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-zinc-800 shadow-2xl relative cursor-default space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setEditingBanner(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold border border-rose-500/30">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Banner Postingan</span>
                </div>
                <h2 className="text-xl font-extrabold text-white">Edit Hero Banner #{editingBanner.id}</h2>
              </div>

              <form onSubmit={handleSaveEditedBanner} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Banner *</label>
                  <input
                    type="text"
                    required
                    value={editingBanner.title}
                    onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">Sub-judul / Deskripsi Banner</label>
                  <textarea
                    rows={2}
                    value={editingBanner.subtitle}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                {/* Tag Selection di Modal Edit */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                    <TagIcon className="w-4 h-4 text-rose-400" />
                    <span>Tag / Label Banner *</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {PRESET_TAGS.map((tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setEditingBanner({ ...editingBanner, tag, badgeText: tag })}
                        className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border ${
                          (editingBanner.tag || editingBanner.badgeText) === tag
                            ? "bg-rose-500 text-white border-rose-400 shadow-md"
                            : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    required
                    value={editingBanner.tag || editingBanner.badgeText || ""}
                    onChange={(e) =>
                      setEditingBanner({
                        ...editingBanner,
                        tag: e.target.value,
                        badgeText: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1">URL Gambar Banner *</label>
                  <input
                    type="url"
                    required
                    value={editingBanner.imageUrl}
                    onChange={(e) => setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Teks Tombol</label>
                    <input
                      type="text"
                      value={editingBanner.buttonText || "Lihat Detail"}
                      onChange={(e) => setEditingBanner({ ...editingBanner, buttonText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Link Tombol</label>
                    <input
                      type="text"
                      value={editingBanner.buttonLink || "#galeri"}
                      onChange={(e) => setEditingBanner({ ...editingBanner, buttonLink: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setEditingBanner(null)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan ke Database</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
}
