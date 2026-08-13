"use client";

import React, { useState, useEffect } from "react";
import { MOCK_SETTINGS, HeroBanner } from "@/data/mockData";
import { getStoredBanners, getStoredHeroText, HeroTextSettings } from "@/utils/bannersStore";
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Heart, Award, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  const [banners, setBanners] = useState<HeroBanner[]>([]);
  const [heroText, setHeroText] = useState<HeroTextSettings>({
    title: MOCK_SETTINGS.heroTitle,
    subtitle: MOCK_SETTINGS.heroSubtitle,
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  const loadData = () => {
    setBanners(getStoredBanners());
    setHeroText(getStoredHeroText());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("nomorecraft_banners_updated", loadData);
    window.addEventListener("nomorecraft_hero_text_updated", loadData);
    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("nomorecraft_banners_updated", loadData);
      window.removeEventListener("nomorecraft_hero_text_updated", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const banner = banners[currentSlide] || banners[0] || {
    id: 1,
    title: heroText.title,
    subtitle: heroText.subtitle,
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&auto=format&fit=crop&q=80",
    buttonText: "Lihat Katalog",
    buttonLink: "#galeri",
    isActive: true,
    tag: "Press-on Nails & Craft",
  };

  return (
    <section id="beranda" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-pink-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-rose-300/30 via-pink-300/30 to-amber-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Info */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>{banner.tag || banner.badgeText || MOCK_SETTINGS.tagline}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
              {banner.title || heroText.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {banner.subtitle || heroText.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={banner.buttonLink || "#galeri"}
                className="flex items-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 rounded-full shadow-lg shadow-rose-200 dark:shadow-none hover:scale-105 transition-all"
              >
                <span>{banner.buttonText || "Lihat Katalog"}</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#galeri"
                className="px-6 py-3.5 text-base font-semibold text-zinc-700 dark:text-zinc-200 bg-white/80 dark:bg-zinc-800/80 hover:bg-rose-50 border border-zinc-200 dark:border-zinc-700 rounded-full transition-all"
              >
                Jelajahi Galeri
              </a>
            </div>

            {/* Micro Feature Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-rose-100 dark:border-zinc-800 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">100% Handmade</p>
                  <p className="text-[11px] text-zinc-500">Dengan Teliti</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400">
                  <Award className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Custom Design</p>
                  <p className="text-[11px] text-zinc-500">Sesuai Keinginan</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-zinc-900 dark:text-white">Kualitas Premium</p>
                  <p className="text-[11px] text-zinc-500">Bahan Terpilih</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Banner Image & Carousel Controls */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-400 to-amber-300 rounded-3xl transform rotate-3 scale-105 opacity-40 blur-sm" />
              
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-800 aspect-[4/3] sm:aspect-square">
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-4 rounded-2xl border border-rose-100 dark:border-zinc-700 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs text-rose-500 font-bold uppercase tracking-wider">{banner.tag || banner.badgeText || "Highlight Promo"}</p>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{banner.title}</p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold bg-rose-500 text-white rounded-full">
                    Active
                  </span>
                </div>
              </div>

              {/* Controls */}
              {banners.length > 1 && (
                <div className="flex items-center justify-between mt-4 px-2">
                  <div className="flex gap-2">
                    {banners.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2.5 rounded-full transition-all ${
                          currentSlide === idx ? "w-8 bg-rose-500" : "w-2.5 bg-rose-200 dark:bg-zinc-700"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-1.5">
                    <button
                      onClick={prevSlide}
                      className="p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 transition-colors"
                      aria-label="Previous Banner"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 transition-colors"
                      aria-label="Next Banner"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
