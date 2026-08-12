"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { MOCK_SHOP_LINKS } from "@/data/mockData";
import { Save, ShoppingBag, Video, Check, Globe } from "lucide-react";

export default function AdminKelolaTautanPage() {
  const [links, setLinks] = useState(MOCK_SHOP_LINKS);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CMS Kelola Tautan Toko Marketplace</h1>
            <p className="text-sm text-zinc-400">
              Kelola nama toko resmi dan link checkout Shopee & TikTok Shop.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Perubahan Berhasil Disimpan!</span>
            </div>
          )}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSave} className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 space-y-6">
          <div className="space-y-6">
            {links.map((link, idx) => (
              <div key={link.id} className="p-6 rounded-2xl bg-zinc-800/60 border border-zinc-700 space-y-4">
                <div className="flex items-center gap-2 font-bold text-base text-white">
                  {link.platform === "Shopee" ? (
                    <ShoppingBag className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Video className="w-5 h-5 text-pink-500" />
                  )}
                  <span>Toko Resmi {link.platform}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">Nama Toko Resmi</label>
                    <input
                      type="text"
                      value={link.shopName}
                      onChange={(e) => {
                        const updated = [...links];
                        updated[idx].shopName = e.target.value;
                        setLinks(updated);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1">URL Toko / Link Checkout</label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...links];
                        updated[idx].url = e.target.value;
                        setLinks(updated);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Menyimpan..." : "Simpan Perubahan Tautan Toko"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
