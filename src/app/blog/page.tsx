"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_BLOG_POSTS, MOCK_BLOG_CATEGORIES, BlogPost } from "@/data/mockData";
import { BookOpen, Calendar, Clock, ArrowRight, Search, X } from "lucide-react";
import SafeImage from "@/components/SafeImage";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data?.posts) && json.data.posts.length > 0) {
          setPosts(json.data.posts);
        }
      })
      .catch(() => {});
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory ? post.blogCategoryId === selectedCategory : true;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-purple-50/50 via-pink-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold">
            <BookOpen className="w-4 h-4" />
            <span>Jurnal & Panduan Crafting</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Blog, Tutorial & Tips Kreatif
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto">
            Pelajari teknik merawat kuku palsu, tips bunga pipe cleaner, dan kisah seru di balik meja pembuatan kerajinan.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel (mis. Press-on, Pipe Cleaner, Perawatan...)"
                className="w-full pl-12 pr-4 py-3.5 rounded-full border border-purple-200 dark:border-zinc-700 bg-white/90 dark:bg-zinc-900 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === null
                ? "bg-purple-600 text-white shadow-md scale-105"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-purple-50"
            }`}
          >
            Semua Artikel ({posts.length})
          </button>
          {MOCK_BLOG_CATEGORIES.map((cat) => {
            const count = posts.filter((p) => p.blogCategoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  isSelected
                    ? "bg-purple-600 text-white shadow-md scale-105"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-purple-50"
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-rose-50 dark:bg-zinc-800">
                  <SafeImage
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-zinc-900/90 text-purple-600 dark:text-purple-400 backdrop-blur-md">
                    {post.categoryName}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center text-sm font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                <span>Baca Artikel</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Modal Full Article */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative my-8">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[21/9] bg-rose-50 dark:bg-zinc-800 relative">
              <SafeImage
                src={activeArticle.coverImageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div className="space-y-2 text-white">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600">
                    {activeArticle.categoryName}
                  </span>
                  <h3 className="text-2xl font-bold">{activeArticle.title}</h3>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium bg-purple-50 dark:bg-zinc-800 p-4 rounded-2xl">
                {activeArticle.excerpt}
              </p>
              <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line text-sm">
                {activeArticle.content}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
