import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MOCK_BLOG_POSTS } from "@/data/mockData";
import { Calendar, Clock, ArrowLeft, BookOpen, Share2, Sparkles } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = MOCK_BLOG_POSTS.filter(
    (p) => p.blogCategoryId === post.blogCategoryId && p.id !== post.id
  ).slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-rose-200">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-purple-50/50 via-pink-50/20 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-bold text-purple-600 dark:text-purple-400 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Blog</span>
          </Link>

          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300">
              <Sparkles className="w-3.5 h-3.5" />
              {post.categoryName}
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 pt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-purple-500" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-500" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      <section className="max-w-4xl mx-auto px-4 -mt-4">
        <div className="aspect-21/9 rounded-3xl overflow-hidden shadow-xl border border-rose-100 dark:border-zinc-800 bg-rose-50 dark:bg-zinc-900">
          <img src={post.coverImageUrl} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 max-w-3xl mx-auto px-4">
        {/* Excerpt Lead */}
        <div className="p-6 rounded-2xl bg-purple-50/80 dark:bg-zinc-900/80 border border-purple-100 dark:border-zinc-800 text-base font-semibold text-purple-900 dark:text-purple-200 leading-relaxed mb-8">
          {post.excerpt}
        </div>

        {/* Body Text */}
        <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line text-base font-normal space-y-4">
          {post.content}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-rose-100 dark:border-zinc-800 space-y-6">
            <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span>Artikel Terkait</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="group bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-rose-100 dark:border-zinc-800 shadow-xs hover:shadow-md transition-all space-y-2"
                >
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">{rel.categoryName}</span>
                  <h4 className="text-base font-bold text-zinc-900 dark:text-white group-hover:text-purple-600 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-zinc-500 line-clamp-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
