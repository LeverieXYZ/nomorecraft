"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_SETTINGS } from "@/data/mockData";
import { MessageCircle, Instagram, Video, Send, Check, Clock, MapPin, Sparkles, Copy } from "lucide-react";

export default function KontakPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [craftType, setCraftType] = useState("Press-on Nails");
  const [submitted, setSubmitted] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  const handleCopy = (handle: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(handle);
      setCopiedHandle(handle);
      setTimeout(() => setCopiedHandle(null), 2000);
    }
  };

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;

    const waText = `Halo No More Craft! Nama saya ${name || "Pelanggan"}. Saya mau konsultasi pesanan custom ${craftType}.\n\nPesan: ${message}`;
    const waUrl = `https://wa.me/${MOCK_SETTINGS.whatsappNumber}?text=${encodeURIComponent(waText)}`;
    
    window.open(waUrl, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-rose-50/60 via-pink-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            <MessageCircle className="w-4 h-4 text-emerald-500 fill-emerald-500" />
            <span>Hubungi & Media Sosial</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Kontak No More Craft
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Ingin diskusi desain custom, konsultasi ukuran kuku palsu, atau tanya ketersediaan stok? Kami siap membantu!
          </p>
        </div>
      </section>

      {/* Social Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* WhatsApp Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800/60 shadow-sm space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <MessageCircle className="w-6 h-6 fill-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                Official WhatsApp
              </span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  +{MOCK_SETTINGS.whatsappNumber}
                </h3>
                <button
                  onClick={(e) => handleCopy(`+${MOCK_SETTINGS.whatsappNumber}`, e)}
                  className="p-2 rounded-xl bg-white/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-emerald-600 text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  {copiedHandle === `+${MOCK_SETTINGS.whatsappNumber}` ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-2">Respon cepat & ramah (Senin - Minggu 08.00 - 21.00 WIB)</p>
            </div>
          </div>

          {/* Instagram Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/40 dark:to-rose-950/20 border border-pink-200 dark:border-pink-800/60 shadow-sm space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-md">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider block">
                Instagram Official
              </span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  @nomorecraft
                </h3>
                <button
                  onClick={(e) => handleCopy("@nomorecraft", e)}
                  className="p-2 rounded-xl bg-white/80 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-pink-600 text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  {copiedHandle === "@nomorecraft" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-zinc-500 mt-2">Foto HD hasil karya terbaru & katalog lengkap Instagram Story</p>
            </div>
          </div>

          {/* TikTok Card */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black text-white border border-zinc-800 shadow-sm space-y-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-pink-400 flex items-center justify-center shadow-md border border-zinc-700">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">
                TikTok Channel
              </span>
              <div className="flex items-center justify-between gap-2 mt-1">
                <h3 className="text-xl font-extrabold text-white">
                  @nomorecraft
                </h3>
                <button
                  onClick={(e) => handleCopy("@nomorecraft_tiktok", e)}
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                >
                  {copiedHandle === "@nomorecraft_tiktok" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-zinc-400 mt-2">Video pendek tutorial, unboxing buket & behind the scenes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form & Info Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-8 sm:p-10 rounded-3xl border border-rose-100 dark:border-zinc-800 shadow-lg space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                Kirim Pesan & Konsultasi Custom Order
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Formulir ini akan otomatis terhubung ke WhatsApp customer service No More Craft.
              </p>
            </div>

            <form onSubmit={handleSendWA} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Nama Kamu</label>
                <input
                  type="text"
                  required
                  placeholder="mis. Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Jenis Kerajinan Yang Dipesan</label>
                <select
                  value={craftType}
                  onChange={(e) => setCraftType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Press-on Nails Custom">Press-on Nails Custom</option>
                  <option value="Buket Bunga Pipe Cleaner">Buket Bunga Pipe Cleaner</option>
                  <option value="Gantungan Kunci Crochet">Gantungan Kunci Crochet</option>
                  <option value="Pertanyaan Lain">Pertanyaan Lain</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 mb-1">Detail Pesan / Keinginan Custom</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan warna, ukuran kuku, atau bentuk bunga yang kamu inginkan..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-transform hover:scale-102"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Kirim via WhatsApp Sekarang</span>
              </button>

              {submitted && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Membuka halaman WhatsApp...</span>
                </div>
              )}
            </form>
          </div>

          {/* Info Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-rose-50/60 dark:bg-zinc-900 p-8 rounded-3xl border border-rose-100 dark:border-zinc-800 space-y-6">
              <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-500" />
                <span>Informasi Studio Crafting</span>
              </h3>

              <div className="space-y-4 text-xs font-medium text-zinc-600 dark:text-zinc-300">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">Jam Operasional CS</span>
                    <span>Senin - Minggu: 08.00 - 21.00 WIB</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-zinc-900 dark:text-white block">Lokasi Studio</span>
                    <span>Indonesia (Pengiriman ke Seluruh Kota via J&T, JNE, Shopee Express)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
