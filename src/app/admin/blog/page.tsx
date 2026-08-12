"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import { MOCK_BLOG_POSTS, MOCK_BLOG_CATEGORIES, BlogPost } from "@/data/mockData";
import { Plus, Trash2, BookOpen, Check } from "lucide-react";

export default function AdminKelolaBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
  const [title, setTitle] = useState("");
  const [blogCategoryId, setBlogCategoryId] = useState(1);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !coverImageUrl) return;

    const cat = MOCK_BLOG_CATEGORIES.find((c) => c.id === Number(blogCategoryId));
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const newPost: BlogPost = {
      id: Date.now(),
      blogCategoryId: Number(blogCategoryId),
      categoryName: cat?.name || "Tutorial",
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      publishedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      readTime: "3 min baca",
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setExcerpt("");
    setContent("");
    setCoverImageUrl("");
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 sm:p-10 space-y-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">CMS Kelola Blog & Tutorial</h1>
            <p className="text-sm text-zinc-400">
              Tulis artikel panduan crafting baru, tips perawatan, dan cerita inspiratif.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500 text-white font-bold text-xs shadow-lg animate-bounce">
              <Check className="w-4 h-4" />
              <span>Artikel Berhasil Diterbitkan!</span>
            </div>
          )}
        </div>

        {/* Add Post Form */}
        <form onSubmit={handleAddPost} className="bg-zinc-900 p-6 sm:p-8 rounded-3xl border border-zinc-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-purple-500" />
            <span>Tulis Artikel Blog Baru</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Judul Artikel</label>
              <input
                type="text"
                required
                placeholder="mis. Panduan Merawat Press-on Nails..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 mb-1">Kategori Blog</label>
              <select
                value={blogCategoryId}
                onChange={(e) => setBlogCategoryId(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {MOCK_BLOG_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">URL Cover Image</label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Ringkasan Artikel (Excerpt)</label>
            <input
              type="text"
              required
              placeholder="Ringkasan 1-2 kalimat untuk kartu depan..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-300 mb-1">Isi Artikel Lengkap</label>
            <textarea
              rows={6}
              required
              placeholder="Tuliskan isi panduan/artikel lengkap di sini..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-md transition-transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Terbitkan Artikel</span>
            </button>
          </div>
        </form>

        {/* Existing Posts */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <span>Artikel Terbit ({posts.length})</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((p) => (
              <div key={p.id} className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-sm flex flex-col justify-between">
                <div>
                  <div className="aspect-16/10 bg-zinc-950 relative">
                    <img src={p.coverImageUrl} alt={p.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white">
                      {p.categoryName}
                    </span>
                  </div>
                  <div className="p-5 space-y-1">
                    <h3 className="text-base font-bold text-white line-clamp-2">{p.title}</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">{p.excerpt}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => handleDeletePost(p.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-950/40 hover:bg-rose-900/60 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
