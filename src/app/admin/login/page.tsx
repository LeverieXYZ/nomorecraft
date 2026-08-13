"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { getStoredAdminPassword } from "@/utils/authStore";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const validPassword = getStoredAdminPassword();
      const validEmail = "admin@nomorecraft.com";

      if (email.trim().toLowerCase() === validEmail && password === validPassword) {
        router.push("/admin/dashboard");
      } else {
        setErrorMessage("Email atau Kata Sandi yang Anda masukkan salah. (Default: admin@nomorecraft.com / admin123)");
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-rose-500">
      <Navbar />

      <main className="pt-32 pb-24 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-zinc-900/90 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 mx-auto shadow-md">
              <div className="w-full h-full bg-zinc-900 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-rose-500" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white">Login Admin CMS</h1>
            <p className="text-xs text-zinc-400">Masuk untuk mengelola seluruh konten No More Craft</p>
          </div>

          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} autoComplete="off" className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Email Admin</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email admin"
                  autoComplete="off"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-800/90 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Kata Sandi (Password)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  autoComplete="off"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-zinc-800/90 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-50"
            >
              <span>{loading ? "Memproses Login..." : "Masuk ke Dashboard CMS"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
