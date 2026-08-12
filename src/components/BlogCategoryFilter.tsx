"use client";

import React from "react";
import { BlogCategory } from "@/data/mockData";
import { Layers } from "lucide-react";

interface BlogCategoryFilterProps {
  categories: BlogCategory[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
  totalPosts: number;
}

export default function BlogCategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
  totalPosts,
}: BlogCategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
          selectedCategoryId === null
            ? "bg-purple-600 text-white shadow-md scale-105"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-purple-50"
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>Semua Artikel</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${selectedCategoryId === null ? "bg-white/20 text-white" : "bg-zinc-200 dark:bg-zinc-700"}`}>
          {totalPosts}
        </span>
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategoryId === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
              isSelected
                ? "bg-purple-600 text-white shadow-md scale-105"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-purple-50"
            }`}
          >
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
