"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import { MOCK_SETTINGS, SiteSettings } from "@/data/mockData";
import { Heart, Sparkles, ShieldCheck, Award, MessageCircle, ArrowRight } from "lucide-react";

export default function TentangPage() {
  const [settings, setSettings] = useState<SiteSettings>(MOCK_SETTINGS);

  useEffect(() => {
    fetch("/api/tentang")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && json.data) {
          setSettings({
            siteName: json.data.siteName || MOCK_SETTINGS.siteName,
            tagline: json.data.tagline || MOCK_SETTINGS.tagline,
            heroTitle: json.data.heroTitle || MOCK_SETTINGS.heroTitle,
            heroSubtitle: json.data.heroSubtitle || MOCK_SETTINGS.heroSubtitle,
            heroImageUrl: json.data.heroImageUrl || MOCK_SETTINGS.heroImageUrl,
            aboutText: json.data.aboutText || MOCK_SETTINGS.aboutText,
            ownerName: json.data.ownerName || MOCK_SETTINGS.ownerName,
            whatsappNumber: json.data.whatsappNumber || MOCK_SETTINGS.whatsappNumber,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-rose-50/60 via-pink-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Cerita & Dedikasi {settings.siteName}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Mengenal Lebih Dekat {settings.siteName}
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Setiap detail dibuat buatan tangan (100% handmade) dengan cinta, kecermatan, dan material berkualitas tinggi.
          </p>
        </div>
      </section>

      {/* Main Brand Story */}
      <AboutSection />

      {/* Value Pillars Section */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/50 border-y border-rose-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
              Mengapa Memilih {settings.siteName}?
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
              Prinsip yang selalu kami jaga dalam setiap pesanan dan kerajinan tangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Desain Kustom Eksklusif</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Bisa request warna, tema, ukuran kuku, hingga variasi bunga sesuai selera impianmu.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Bahan Premium & Awet</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Memakai gel kuku profesional dan pipe cleaner tebal yang warna serta bentuknya bertahan lama.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Garansi Kemasan Aman</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Setiap buket dan paket Press-on Nails dikemas rapi dengan kotak kokoh dan bubble wrap tebal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Owner Contact CTA */}
      <section className="py-20 max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
          Ingin Berkonsultasi atau Pesan Custom?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-300 text-base max-w-xl mx-auto">
          Hubungi {settings.ownerName} langsung melalui WhatsApp untuk diskusi warna, harga paket, atau jadwal pengerjaan.
        </p>
        <div>
          <a
            href={`https://wa.me/${settings.whatsappNumber}?text=Halo%20${encodeURIComponent(settings.ownerName)},%20saya%20ingin%20tanya%20tentang%20kerajinan%20${encodeURIComponent(settings.siteName)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Chat WhatsApp Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
