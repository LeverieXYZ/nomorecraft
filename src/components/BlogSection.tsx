"use client";

import React, { useState } from "react";
import { MOCK_BLOG_POSTS, BlogPost } from "@/data/mockData";
import { Sparkles, BookOpen, Clock, Calendar, ArrowRight, X } from "lucide-react";

export default function BlogSection() {
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 bg-white dark:bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Jurnal & Artikel Crafting</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Tutorial, Tips & Cerita Kreatif
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-base">
              Dapatkan inspirasi seputar perawatan karya buatan tangan, tips pemakaian, dan cerita menarik di balik meja kreasi.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              onClick={() => setActiveArticle(post)}
              className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-rose-50 dark:bg-zinc-800">
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-zinc-900/90 text-rose-600 dark:text-rose-400 backdrop-blur-md shadow-xs">
                      {post.categoryName}
                    </span>
                  </div>
                </div>

                {/* Body */}
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

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center text-sm font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
                <span>Baca Artikel Selengkapnya</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Modal View Full Article */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative my-8">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-21/9 bg-rose-50 dark:bg-zinc-800 relative">
              <img
                src={activeArticle.coverImageUrl}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                <div className="space-y-2 text-white">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500">
                    {activeArticle.categoryName}
                  </span>
                  <h3 className="text-2xl font-bold">{activeArticle.title}</h3>
                  <div className="flex items-center gap-4 text-xs opacity-80">
                    <span>{activeArticle.publishedAt}</span>
                    <span>•</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium bg-rose-50/50 dark:bg-zinc-800/50 p-4 rounded-2xl border border-rose-100 dark:border-zinc-700">
                {activeArticle.excerpt}
              </p>

              <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line text-sm">
                {activeArticle.content}
              </div>

              {/* Related Articles Section */}
              <div className="pt-6 border-t border-rose-100 dark:border-zinc-800 space-y-3">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                  Artikel Terkait Lainnya
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOCK_BLOG_POSTS.filter((p) => p.id !== activeArticle.id).map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => setActiveArticle(rel)}
                      className="cursor-pointer p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 hover:bg-rose-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center gap-3 transition-colors"
                    >
                      <img
                        src={rel.coverImageUrl}
                        alt={rel.title}
                        className="w-12 h-12 rounded-xl object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white line-clamp-1">{rel.title}</p>
                        <span className="text-[10px] text-zinc-400">{rel.readTime}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
