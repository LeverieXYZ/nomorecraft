"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Lock, Instagram, MessageCircle, Video } from "lucide-react";
import AestheticLogo from "./AestheticLogo";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-40 w-full bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-rose-100/60 dark:border-zinc-800 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/">
            <AestheticLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            <Link
              href="/"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/galeri"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Galeri Karya
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Blog & Tutorial
            </Link>
            <Link
              href="/tentang"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              href="/belanja"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Toko Marketplace
            </Link>
            <Link
              href="/kontak"
              className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            >
              Kontak
            </Link>
          </nav>

          {/* Right Header Actions, Theme Switcher & Social Media Icons */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Theme Toggle Button (Dark / Light) */}
            <ThemeToggle />

            {/* Social Media Quick Icons */}
            <div className="flex items-center gap-1.5 px-2 border-l border-r border-rose-100 dark:border-zinc-800">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-zinc-500 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition-colors"
                title="WhatsApp CS"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              </a>
              <a
                href="https://instagram.com/nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-zinc-500 hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors"
                title="Instagram @nomorecraft"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
              </a>
              <a
                href="https://tiktok.com/@nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                title="TikTok @nomorecraft"
              >
                <Video className="w-4 h-4 text-zinc-900 dark:text-white" />
              </a>
            </div>

            {/* Admin CMS Login */}
            <Link
              href="/admin/login"
              className="p-2 rounded-full text-zinc-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors"
              title="CMS Admin Dashboard"
            >
              <Lock className="w-4 h-4" />
            </Link>

            {/* Shopee CTA Button */}
            <a
              href="https://shopee.co.id/nomorecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 hover:opacity-95 shadow-md shadow-rose-200 dark:shadow-none hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli di Shopee</span>
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />

            <Link
              href="/admin/login"
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              title="CMS Admin"
            >
              <Lock className="w-4.5 h-4.5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-rose-50 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border-b border-rose-100 dark:border-zinc-800 px-4 pt-3 pb-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              Beranda
            </Link>
            <Link
              href="/galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              Galeri Karya
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              Blog & Tutorial
            </Link>
            <Link
              href="/tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              Tentang Kami
            </Link>
            <Link
              href="/belanja"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              Toko Marketplace
            </Link>
            <Link
              href="/kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200"
            >
              Kontak
            </Link>
          </nav>

          <div className="pt-3 border-t border-rose-100 dark:border-zinc-800 space-y-3">
            {/* Theme Toggle row in Mobile Drawer */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-rose-50/60 dark:bg-zinc-900 border border-rose-100 dark:border-zinc-800">
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Tampilan Mode</span>
              <ThemeToggle showLabel={true} />
            </div>

            <div className="flex items-center justify-center gap-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-pink-50 dark:bg-pink-950/60 text-pink-600 font-bold text-xs flex items-center gap-1.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://tiktok.com/@nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs flex items-center gap-1.5"
              >
                <Video className="w-4 h-4" />
                <span>TikTok</span>
              </a>
            </div>

            <a
              href="https://shopee.co.id/nomorecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Buka Toko Shopee</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
