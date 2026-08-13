import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickNav from "@/components/QuickNav";
import CategoryShowcase from "@/components/CategoryShowcase";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import TikTokSection from "@/components/TikTokSection";
import ShopSection from "@/components/ShopSection";
import QuickShopBar from "@/components/QuickShopBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "No More Craft — Handmade Craft, Nail Art, Pipe Cleaner & Crochet",
  description: "Selamat datang di No More Craft! Jelajahi koleksi kuku palsu press-on custom, buket kawat bulu pipe cleaner abadi, dan rajutan crochet yang aesthetic dan handmade.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200 selection:text-rose-900">
      <Navbar />
      <HeroSection />
      <QuickNav />
      <CategoryShowcase />
      <AboutSection />
      <BlogSection />
      <TikTokSection />
      <ShopSection />
      <QuickShopBar />
      <Footer />
    </main>
  );
}
