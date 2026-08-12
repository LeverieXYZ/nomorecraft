"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, LayoutDashboard, Image as ImageIcon, BookOpen, Camera, ShoppingBag, Share2, Info, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: "Hero Banner", href: "/admin/tentang", icon: <ImageIcon className="w-4 h-4" /> },
    { label: "Profil Tentang", href: "/admin/tentang", icon: <Info className="w-4 h-4" /> },
    { label: "Foto Kegiatan", href: "/admin/foto-kegiatan", icon: <Camera className="w-4 h-4" /> },
    { label: "Tautan Medsos", href: "/admin/sosial-media", icon: <Share2 className="w-4 h-4" /> },
    { label: "Lihat Website", href: "/", icon: <Sparkles className="w-4 h-4 text-rose-500" /> },
  ];

  return (
    <aside className="w-64 bg-zinc-900 text-white min-h-screen border-r border-zinc-800 flex flex-col justify-between p-6 shrink-0">
      <div className="space-y-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-base tracking-tight">Admin NoMoreCraft</span>
        </Link>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-6 border-t border-zinc-800">
        <Link
          href="/admin/login"
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Keluar (Logout)</span>
        </Link>
      </div>
    </aside>
  );
}
