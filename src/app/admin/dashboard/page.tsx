"use client";

import React, { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { Sparkles, Layers, BookOpen, Video, ShoppingBag, ArrowRight, Database, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    works: 0,
    blog: 0,
    tiktok: 0,
    shop: 0,
  });

  const [dbStatus, setDbStatus] = useState<any>(null);
  const [checkingDb, setCheckingDb] = useState(false);
  const [seedingDb, setSeedingDb] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const fetchStats = () => {
    fetch("/api/beranda")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setCounts({
            works: Array.isArray(json.data.works) ? json.data.works.length : 0,
            blog: Array.isArray(json.data.blogPosts) ? json.data.blogPosts.length : 0,
            tiktok: Array.isArray(json.data.tiktokVideos) ? json.data.tiktokVideos.length : 0,
            shop: Array.isArray(json.data.shopProducts) ? json.data.shopProducts.length : 0,
          });
        }
      })
      .catch(() => {});
  };

  const handleCheckDb = async () => {
    setCheckingDb(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/debug/supabase");
      const json = await res.json();
      setDbStatus(json);
    } catch (err: any) {
      setDbStatus({ success: false, error: err.message });
    } finally {
      setCheckingDb(false);
    }
  };

  const handleSeedDb = async () => {
    if (!confirm("Apakah Anda yakin ingin mengisi data awal ke tabel Supabase yang kosong? Data yang sudah ada tidak akan terhapus.")) return;
    setSeedingDb(true);
    setSeedResult(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const json = await res.json();
      if (json.success) {
        setSeedResult("✅ Data awal berhasil di-seed ke Supabase!");
        fetchStats();
      } else {
        setSeedResult(`❌ Gagal seed: ${json.error || "Cek konfigurasi environment variables"}`);
      }
    } catch (err: any) {
      setSeedResult(`❌ Gagal: ${err.message}`);
    } finally {
      setSeedingDb(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = [
    { label: "Karya Showcase", count: counts.works.toString(), icon: <Layers className="w-5 h-5 text-rose-500" />, href: "/galeri" },
    { label: "Artikel Blog", count: counts.blog.toString(), icon: <BookOpen className="w-5 h-5 text-purple-500" />, href: "/blog" },
    { label: "Video TikTok", count: counts.tiktok.toString(), icon: <Video className="w-5 h-5 text-pink-500" />, href: "/#tiktok" },
    { label: "Produk Ready", count: counts.shop.toString(), icon: <ShoppingBag className="w-5 h-5 text-orange-500" />, href: "/belanja" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 text-rose-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Control Panel CMS (Supabase Live)</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Selamat Datang di Panel Admin</h1>
          <p className="text-sm text-zinc-400">
            Kelola seluruh konten website No More Craft yang terhubung langsung dengan Supabase PostgreSQL database.
          </p>
        </div>

        {/* Supabase Connection & Seed Widget */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white">Status Koneksi Supabase Database</h2>
                <p className="text-xs text-zinc-400">
                  Pastikan seluruh data CRUD tersimpan langsung ke cloud database Supabase.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCheckDb}
                disabled={checkingDb}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${checkingDb ? "animate-spin" : ""}`} />
                <span>{checkingDb ? "Memeriksa..." : "Tes Koneksi"}</span>
              </button>

              <button
                type="button"
                onClick={handleSeedDb}
                disabled={seedingDb}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-md transition-colors disabled:opacity-50"
              >
                <Database className="w-3.5 h-3.5" />
                <span>{seedingDb ? "Mengisi Data..." : "Seed Data Awal"}</span>
              </button>
            </div>
          </div>

          {seedResult && (
            <div className="p-3.5 rounded-xl bg-zinc-800/80 border border-zinc-700 text-xs font-semibold text-zinc-200">
              {seedResult}
            </div>
          )}

          {dbStatus && (
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold">
                {dbStatus.success ? (
                  <span className="flex items-center gap-1 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Supabase Terhubung dengan Sukses!</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-amber-400">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Supabase Belum Terhubung (Menggunakan SQLite / Mock)</span>
                  </span>
                )}
              </div>
              {dbStatus.env && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-zinc-400 pt-1 border-t border-zinc-800/60">
                  <div>URL: <span className="text-zinc-200">{dbStatus.env.NEXT_PUBLIC_SUPABASE_URL}</span></div>
                  <div>Anon Key: <span className="text-zinc-200">{dbStatus.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}</span></div>
                  <div>Vercel: <span className="text-zinc-200">{dbStatus.env.VERCEL}</span></div>
                  <div>Node Env: <span className="text-zinc-200">{dbStatus.env.NODE_ENV}</span></div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-zinc-900 p-6 rounded-3xl border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-2xl bg-zinc-800">{s.icon}</div>
                <span className="text-3xl font-extrabold text-white">{s.count}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-300">{s.label}</h3>
                <Link href={s.href} className="text-xs font-semibold text-rose-400 flex items-center gap-1 mt-1 hover:underline">
                  <span>Lihat di Web</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Menu Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Menu Kelola Konten Rapid Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/admin/tentang"
              className="group bg-zinc-900 p-6 rounded-3xl border border-zinc-800 hover:border-rose-500/50 transition-all space-y-2"
            >
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                Edit Profil & Teks Tentang
              </h3>
              <p className="text-xs text-zinc-400">
                Ubah deskripsi brand story, nama pemilik, dan nomor WhatsApp CS.
              </p>
            </Link>

            <Link
              href="/admin/galeri"
              className="group bg-zinc-900 p-6 rounded-3xl border border-zinc-800 hover:border-rose-500/50 transition-all space-y-2"
            >
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                Kelola Galeri Karya
              </h3>
              <p className="text-xs text-zinc-400">
                Tambah karya baru, edit harga/foto HD, atau hapus katalog karya.
              </p>
            </Link>

            <Link
              href="/admin/sosial-media"
              className="group bg-zinc-900 p-6 rounded-3xl border border-zinc-800 hover:border-rose-500/50 transition-all space-y-2"
            >
              <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors">
                Kelola Link Media Sosial
              </h3>
              <p className="text-xs text-zinc-400">
                Update handle WhatsApp, TikTok @nomorecraft, dan Instagram.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
