"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { MOCK_CATEGORIES, Work } from "@/data/mockData";
import { getStoredWorks, saveStoredWorks } from "@/utils/worksStore";
import {
  Plus,
  Trash2,
  Edit2,
  Grid,
  Check,
  Search,
  X,
  Save,
  Star,
} from "lucide-react";

export default function AdminKelolaGaleriPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");

  // Form state for Create / Edit
  const [editingWork, setEditingWork] = useState<Work | null>(null);

  // Form input states
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [price, setPrice] = useState("Rp 45.000");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [shopeeUrl, setShopeeUrl] = useState("https://shopee.co.id/nomorecraft");
  const [tiktokShopUrl, setTiktokShopUrl] = useState("https://tiktok.com/@nomorecraft");
  const [isFeatured, setIsFeatured] = useState(true);
  const [isSold, setIsSold] = useState(false);

  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  useEffect(() => {
    setWorks(getStoredWorks());
  }, []);

  const resetForm = () => {
    setTitle("");
    setCategoryId(1);
    setPrice("Rp 45.000");
    setImageUrl("");
    setDescription("");
    setShopeeUrl("https://shopee.co.id/nomorecraft");
    setTiktokShopUrl("https://tiktok.com/@nomorecraft");
    setIsFeatured(true);
    setIsSold(false);
    setEditingWork(null);
  };

  const handleEditClick = (work: Work) => {
    setEditingWork(work);
    setTitle(work.title);
    setCategoryId(work.categoryId);
    setPrice(work.price);
    setImageUrl(work.imageUrl);
    setDescription(work.description);
    setShopeeUrl(work.shopeeUrl || "https://shopee.co.id/nomorecraft");
    setTiktokShopUrl(work.tiktokShopUrl || "https://tiktok.com/@nomorecraft");
    setIsFeatured(work.isFeatured ?? true);
    setIsSold(work.isSold);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveWork = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;

    const cat = MOCK_CATEGORIES.find((c) => c.id === Number(categoryId));

    let updatedList: Work[];
    if (editingWork) {
      // UPDATE existing work
      const updatedWork: Work = {
        ...editingWork,
        title,
        categoryId: Number(categoryId),
        categoryName: cat?.name || "Nail Art",
        price,
        imageUrl,
        description,
        shopeeUrl,
        tiktokShopUrl,
        buyLink: shopeeUrl,
        isFeatured,
        isSold,
      };

      updatedList = works.map((w) => (w.id === editingWork.id ? updatedWork : w));
      setSavedSuccess("Detail karya berhasil diperbarui ke database!");

      // Call database API
      try {
        await fetch("/api/cms/galeri", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedWork),
        });
      } catch (err) {
        console.error("Failed to update work in database:", err);
      }
    } else {
      // CREATE new work
      const newWork: Work = {
        id: Date.now(),
        categoryId: Number(categoryId),
        categoryName: cat?.name || "Nail Art",
        title,
        description,
        imageUrl,
        buyLink: shopeeUrl,
        shopeeUrl,
        tiktokShopUrl,
        price,
        isSold,
        isFeatured,
        createdAt: new Date().toISOString().split("T")[0],
      };
      updatedList = [newWork, ...works];
      setSavedSuccess("Karya baru berhasil disimpan ke database!");

      // Call database API
      try {
        await fetch("/api/cms/galeri", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newWork),
        });
      } catch (err) {
        console.error("Failed to insert work into database:", err);
      }
    }

    setWorks(updatedList);
    saveStoredWorks(updatedList);
    resetForm();
    setTimeout(() => setSavedSuccess(null), 3000);
  };

  const handleDeleteWork = async (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus karya ini dari galeri?")) {
      const updatedList = works.filter((w) => w.id !== id);
      setWorks(updatedList);
      saveStoredWorks(updatedList);

      // Delete from database
      try {
        await fetch(`/api/cms/galeri?id=${id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.error("Failed to delete work from database:", err);
      }

      setSavedSuccess("Karya telah dihapus dari database.");
      setTimeout(() => setSavedSuccess(null), 3000);
    }
  };

  const filteredWorks = works.filter((w) => {
    const matchesSearch =
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || w.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CMS Kelola Galeri Karya</h1>
            <p className="text-sm text-zinc-400">
              Tambah, edit detail/harga, dan hapus karya yang tampil di katalog galeri showcase.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>{savedSuccess}</span>
            </div>
          )}
        </div>

        {/* Create / Edit Form */}
        <form
          onSubmit={handleSaveWork}
          className={`p-6 sm:p-8 rounded-3xl border transition-all space-y-4 ${
            editingWork
              ? "bg-rose-950/30 border-rose-500/60 shadow-lg"
              : "bg-zinc-900 border-zinc-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              {editingWork ? (
                <>
                  <Edit2 className="w-5 h-5 text-rose-400" />
                  <span>Edit Karya: &ldquo;{editingWork.title}&rdquo;</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-rose-500" />
                  <span>Tambah Karya Baru Ke Galeri</span>
                </>
              )}
            </h2>

            {editingWork && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-1 text-xs font-bold text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-zinc-800"
              >
                <X className="w-3.5 h-3.5" />
                <span>Batal Edit</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Karya</label>
              <input
                type="text"
                required
                placeholder="mis. Coquette Pearl Press-on Nails"
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
                placeholder="Rp 65.000"
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
                placeholder="Deskripsi bahan, gaya & kelengkapan..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Link Shopee</label>
              <input
                type="url"
                placeholder="https://shopee.co.id/..."
                value={shopeeUrl}
                onChange={(e) => setShopeeUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Link TikTok Shop</label>
              <input
                type="url"
                placeholder="https://tiktok.com/@nomorecraft/..."
                value={tiktokShopUrl}
                onChange={(e) => setTiktokShopUrl(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-200">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-rose-500 bg-zinc-800 border-zinc-700"
              />
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Tampilkan di Featured Home</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-zinc-200">
              <input
                type="checkbox"
                checked={isSold}
                onChange={(e) => setIsSold(e.target.checked)}
                className="w-4 h-4 rounded text-rose-500 bg-zinc-800 border-zinc-700"
              />
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-400">Sold Out</span>
              <span>Tandai Sebagai Terjual</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            {editingWork && (
              <button
                type="button"
                onClick={resetForm}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-zinc-400 bg-zinc-800 hover:bg-zinc-700"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105"
            >
              {editingWork ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{editingWork ? "Simpan ke Database" : "Tambah Karya Ke Database"}</span>
            </button>
          </div>
        </form>

        {/* Existing Works Grid & Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-rose-500" />
              <span>Daftar Karya Di Galeri ({filteredWorks.length})</span>
            </h2>

            {/* Filter & Search */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari karya..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(
                    e.target.value === "all" ? "all" : Number(e.target.value)
                  )
                }
                className="px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="all">Semua Kategori</option>
                {MOCK_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorks.map((w) => (
              <div
                key={w.id}
                className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-all"
              >
                <div>
                  <div className="aspect-[4/3] bg-zinc-950 relative">
                    <img
                      src={w.imageUrl}
                      alt={w.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow">
                        {w.categoryName}
                      </span>
                      {w.isSold && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-zinc-950/80 text-amber-400 border border-amber-400/30">
                          Sold Out
                        </span>
                      )}
                      {w.isFeatured && (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-400 text-zinc-950">
                          Featured ⭐
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-base font-bold text-white">{w.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">{w.description}</p>
                    <span className="text-sm font-extrabold text-rose-400 block pt-1">
                      {w.price}
                    </span>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-500">
                    ID: #{w.id}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(w)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-400 bg-amber-950/40 hover:bg-amber-900/60 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteWork(w.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
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
