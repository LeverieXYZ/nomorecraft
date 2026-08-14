"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_SETTINGS } from "@/data/mockData";
import { Save, Check, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

export default function AdminTentangPage() {
  const [formData, setFormData] = useState({
    siteName: MOCK_SETTINGS.siteName,
    tagline: MOCK_SETTINGS.tagline,
    aboutText: MOCK_SETTINGS.aboutText,
    ownerName: MOCK_SETTINGS.ownerName,
    whatsappNumber: MOCK_SETTINGS.whatsappNumber,
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const res = await fetch("/api/tentang");
      const json = await res.json();
      if (json.success && json.data) {
        setFormData({
          siteName: json.data.siteName || MOCK_SETTINGS.siteName,
          tagline: json.data.tagline || MOCK_SETTINGS.tagline,
          aboutText: json.data.aboutText || MOCK_SETTINGS.aboutText,
          ownerName: json.data.ownerName || MOCK_SETTINGS.ownerName,
          whatsappNumber: json.data.whatsappNumber || MOCK_SETTINGS.whatsappNumber,
        });
      }
    } catch (err) {
      console.error("Failed to load about data from Supabase:", err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/tentang", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      await loadData();
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      <main className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-500 hover:underline mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Admin Dashboard</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              CMS Edit Halaman Tentang
            </h1>
            <p className="text-sm text-zinc-500">
              Kelola teks profil brand, nama pemilik, dan nomor kontak WhatsApp di Supabase database.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Perubahan Berhasil Disimpan ke Supabase!</span>
            </div>
          )}
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-md space-y-6"
        >
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Profil Brand & Pemilik</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Nama Brand / Toko
                </label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Nama Pemilik / Crafter
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Tagline Utama
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Nomor WhatsApp (format: 628xxxxxxxx)
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Teks Cerita Tentang Brand (About Paragraph)
              </label>
              <textarea
                rows={5}
                value={formData.aboutText}
                onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-rose-100 dark:border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Menyimpan..." : "Simpan Perubahan ke Supabase"}</span>
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
