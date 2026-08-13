"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Trash2, Camera, ArrowLeft, Image as ImageIcon, Check } from "lucide-react";
import Link from "next/link";

interface Photo {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

export default function AdminFotoKegiatanPage() {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: 1,
      title: "Proses Hand-Painting Press-on Nails",
      category: "Nail Art Sesi",
      imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
      caption: "Setiap detail garis dan motif gel digambar teliti satu per satu.",
    },
    {
      id: 2,
      title: "Merangkai Bunga Pipe Cleaner",
      category: "Pipe Cleaner Craft",
      imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      caption: "Membentuk kawat bulu menjadi mahkota bunga mawar yang cantik.",
    },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Nail Art Sesi");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const newPhoto: Photo = {
      id: Date.now(),
      title: newTitle,
      category: newCategory,
      imageUrl: newImageUrl,
      caption: newCaption,
    };

    setPhotos([newPhoto, ...photos]);
    setNewTitle("");
    setNewImageUrl("");
    setNewCaption("");
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeletePhoto = (id: number) => {
    setPhotos(photos.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      <main className="pt-32 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Admin Dashboard</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              CMS Kelola Foto Kegiatan
            </h1>
            <p className="text-sm text-zinc-500">
              Tambah dan hapus dokumentasi foto pengerjaan kerajinan di studio.
            </p>
          </div>

          {showSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Foto Berhasil Ditambahkan!</span>
            </div>
          )}
        </div>

        {/* Add Photo Form */}
        <form
          onSubmit={handleAddPhoto}
          className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-md space-y-4"
        >
          <h2 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-rose-500" />
            <span>Tambah Foto Dokumentasi Baru</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Judul Foto / Kegiatan
              </label>
              <input
                type="text"
                required
                placeholder="mis. Finishing Buket Rose Pink"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Kategori Kegiatan
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <option value="Nail Art Sesi">Nail Art Sesi</option>
                <option value="Pipe Cleaner Craft">Pipe Cleaner Craft</option>
                <option value="Crochet Sesi">Crochet Sesi</option>
                <option value="Quality Control">Quality Control</option>
                <option value="Behind The Scenes">Behind The Scenes</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                URL Gambar Foto
              </label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Keterangan Singkat (Caption)
              </label>
              <input
                type="text"
                placeholder="mis. Pengecekan sebelum dikirim..."
                value={newCaption}
                onChange={(e) => setNewCaption(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Foto</span>
            </button>
          </div>
        </form>

        {/* Existing Photos Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-rose-500" />
            <span>Daftar Foto Kegiatan ({photos.length})</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-zinc-800 relative">
                    <img src={photo.imageUrl} alt={photo.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md">
                      {photo.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{photo.title}</h3>
                    <p className="text-xs text-zinc-500 line-clamp-2">{photo.caption}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-rose-50 dark:border-zinc-800 flex justify-end">
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors"
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

      <Footer />
    </div>
  );
}
