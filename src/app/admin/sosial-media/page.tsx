"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_SETTINGS, MOCK_SOCIAL_LINKS, SocialLink } from "@/data/mockData";
import { Save, ArrowLeft, Check, Instagram, MessageCircle, Video } from "lucide-react";
import Link from "next/link";

export default function AdminSosialMediaPage() {
  const [links, setLinks] = useState<SocialLink[]>(MOCK_SOCIAL_LINKS);
  const [waNumber, setWaNumber] = useState(MOCK_SETTINGS.whatsappNumber);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [resLinks, resSettings] = await Promise.all([
        fetch("/api/sosial-media").then((r) => r.json()),
        fetch("/api/tentang").then((r) => r.json()),
      ]);

      if (resLinks.success && Array.isArray(resLinks.data)) {
        setLinks(resLinks.data);
      }
      if (resSettings.success && resSettings.data) {
        setWaNumber(resSettings.data.whatsappNumber || MOCK_SETTINGS.whatsappNumber);
      }
    } catch (err) {
      console.error("Failed to load social links from Supabase:", err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Save WhatsApp number to settings
      await fetch("/api/tentang", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ whatsappNumber: waNumber }),
      });

      // Save each social link
      for (const link of links) {
        await fetch("/api/cms/sosial-media", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: link.id,
            username: link.username,
            url: link.url,
          }),
        });
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
      await loadData();
    } catch (err) {
      console.error("Failed to save social links to database:", err);
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
              CMS Kelola Tautan Media Sosial
            </h1>
            <p className="text-sm text-zinc-500">
              Kelola username dan link tautan WhatsApp, Instagram, dan TikTok resmi No More Craft di Supabase database.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Tautan Berhasil Disimpan ke Supabase!</span>
            </div>
          )}
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSave}
          className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-md space-y-6"
        >
          <div className="space-y-6">
            {/* WhatsApp */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <MessageCircle className="w-4 h-4 fill-emerald-500" />
                <span>WhatsApp Customer Service</span>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                  Nomor WhatsApp CS (Format: 628xxxxxxxx)
                </label>
                <input
                  type="text"
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Social Links Loop */}
            {links.map((link, idx) => (
              <div
                key={link.id}
                className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 space-y-3"
              >
                <div className="flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white">
                  {link.platform === "TikTok" ? (
                    <Video className="w-4 h-4 text-pink-500" />
                  ) : (
                    <Instagram className="w-4 h-4 text-rose-500" />
                  )}
                  <span>Official {link.platform}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      Username / Handle
                    </label>
                    <input
                      type="text"
                      value={link.username}
                      onChange={(e) => {
                        const updated = [...links];
                        updated[idx].username = e.target.value;
                        setLinks(updated);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                      URL Profil Lengkap
                    </label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => {
                        const updated = [...links];
                        updated[idx].url = e.target.value;
                        setLinks(updated);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-rose-100 dark:border-zinc-800 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-md transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Menyimpan..." : "Simpan Tautan ke Supabase"}</span>
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
