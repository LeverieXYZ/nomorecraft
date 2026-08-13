"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Lock, Instagram, MessageCircle, Video } from "lucide-react";
import AestheticLogo from "./AestheticLogo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/75 backdrop-blur-md border-b border-rose-100/60 transition-all duration-300">
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
              className="text-sm font-semibold text-zinc-700 hover:text-rose-600 transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="/galeri"
              className="text-sm font-semibold text-zinc-700 hover:text-rose-600 transition-colors"
            >
              Galeri Karya
            </Link>
            <Link
              href="/blog"
              className="text-sm font-semibold text-zinc-700 hover:text-rose-600 transition-colors"
            >
              Blog & Tutorial
            </Link>
            <Link
              href="/tentang"
              className="text-sm font-semibold text-zinc-700 hover:text-rose-600 transition-colors"
            >
              Tentang Kami
            </Link>
            <Link
              href="/belanja"
              className="text-sm font-semibold text-zinc-700 hover:text-rose-600 transition-colors"
            >
              Toko Marketplace
            </Link>
            <Link
              href="/kontak"
              className="text-sm font-semibold text-zinc-700 hover:text-rose-600 transition-colors"
            >
              Kontak
            </Link>
          </nav>

          {/* Right Header Actions & Social Media Icons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Social Media Quick Icons */}
            <div className="flex items-center gap-2 pr-3 border-r border-rose-100">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-zinc-500 hover:text-emerald-500 hover:bg-emerald-50 transition-colors"
                title="WhatsApp CS"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              </a>
              <a
                href="https://instagram.com/nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-zinc-500 hover:text-pink-500 hover:bg-pink-50 transition-colors"
                title="Instagram @nomorecraft"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
              </a>
              <a
                href="https://tiktok.com/@nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                title="TikTok @nomorecraft"
              >
                <Video className="w-4 h-4 text-zinc-900" />
              </a>
            </div>

            {/* Admin CMS Login */}
            <Link
              href="/admin/login"
              className="p-2.5 rounded-full text-zinc-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="CMS Admin Dashboard"
            >
              <Lock className="w-4.5 h-4.5" />
            </Link>

            {/* Shopee CTA Button */}
            <a
              href="https://shopee.co.id/nomorecraft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 hover:opacity-95 shadow-md shadow-rose-200 hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Beli di Shopee</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/admin/login"
              className="p-2 rounded-full text-zinc-600 hover:bg-zinc-100"
            >
              <Lock className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 hover:bg-rose-50 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-rose-100 px-4 pt-3 pb-6 space-y-4 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 text-zinc-800"
            >
              Beranda
            </Link>
            <Link
              href="/galeri"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 text-zinc-800"
            >
              Galeri Karya
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 text-zinc-800"
            >
              Blog & Tutorial
            </Link>
            <Link
              href="/tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 text-zinc-800"
            >
              Tentang Kami
            </Link>
            <Link
              href="/belanja"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 text-zinc-800"
            >
              Toko Marketplace
            </Link>
            <Link
              href="/kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold px-3 py-2 rounded-xl hover:bg-rose-50 text-zinc-800"
            >
              Kontak
            </Link>
          </nav>

          <div className="pt-2 border-t border-rose-100 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-emerald-50 text-emerald-600 font-bold text-xs flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4 fill-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-pink-50 text-pink-600 font-bold text-xs flex items-center gap-1.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href="https://tiktok.com/@nomorecraft"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-zinc-100 text-zinc-900 font-bold text-xs flex items-center gap-1.5"
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
