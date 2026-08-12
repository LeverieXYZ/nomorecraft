"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { MOCK_WORKS, MOCK_CATEGORIES, Work } from "@/data/mockData";
import { Plus, Trash2, Layers, Check, ShoppingCart } from "lucide-react";

export default function AdminKelolaGaleriPage() {
  const [works, setWorks] = useState<Work[]>(MOCK_WORKS);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState("Rp 45.000");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const cat = MOCK_CATEGORIES.find((c) => c.id === Number(categoryId));

    const newWork: Work = {
      id: Date.now(),
      categoryId: Number(categoryId),
      categoryName: cat?.name || "Nail Art",
      title,
      description,
      imageUrl,
      buyLink: "https://shopee.co.id/nomorecraft",
      shopeeUrl: "https://shopee.co.id/nomorecraft",
      tiktokShopUrl: "https://tiktok.com/@nomorecraft",
      price,
      isSold: false,
      isFeatured: true,
    };

    setWorks([newWork, ...works]);
    setTitle("");
    setImageUrl("");
    setDescription("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeleteWork = (id: number) => {
    setWorks(works.filter((w) => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CMS Kelola Galeri Karya</h1>
            <p className="text-sm text-zinc-400">
              Tambah, edit harga, dan kelola karya yang tampil di galeri showcase.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Karya Berhasil Ditambahkan!</span>
            </div>
          )}
        </div>

        {/* Add Work Form */}
        <form onSubmit={handleAddWork} className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-rose-500" />
            <span>Tambah Karya Baru Ke Galeri</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Karya</label>
              <input
                type="text"
                required
                placeholder="mis. Sakura Press-on Nails Set"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Kategori Karya</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                {MOCK_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Harga (Format: Rp xx.000)</label>
              <input
                type="text"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">URL Foto HD Karya</label>
              <input
                type="url"
                required
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Deskripsi Singkat</label>
              <input
                type="text"
                placeholder="Deskripsi bahan dan kelengkapan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Karya</span>
            </button>
          </div>
        </form>

        {/* Existing Works Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-500" />
            <span>Karya Di Galeri ({works.length})</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((w) => (
              <div key={w.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="aspect-4/3 bg-zinc-950 relative">
                    <img src={w.imageUrl} alt={w.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white">
                      {w.categoryName}
                    </span>
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-base font-bold text-white">{w.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">{w.description}</p>
                    <span className="text-sm font-extrabold text-rose-400 block pt-1">{w.price}</span>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => handleDeleteWork(w.id)}
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
