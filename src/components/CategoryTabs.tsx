"use client";

import React from "react";
import { Category, Work } from "@/data/mockData";
import { Sparkles, Flower2, Heart, Layers } from "lucide-react";

interface CategoryTabsProps {
  categories: Category[];
  works: Work[];
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function CategoryTabs({
  categories,
  works,
  selectedCategoryId,
  onSelectCategory,
}: CategoryTabsProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-4 h-4" />;
      case "Flower2":
        return <Flower2 className="w-4 h-4" />;
      case "Heart":
        return <Heart className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
      {/* All Tab */}
      <button
        onClick={() => onSelectCategory(null)}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
          selectedCategoryId === null
            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200 dark:shadow-none scale-105"
            : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-700"
        }`}
      >
        <Layers className="w-4 h-4" />
        <span>Semua Karya</span>
        <span className={`px-2 py-0.5 rounded-full text-xs ${selectedCategoryId === null ? "bg-white/20 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"}`}>
          {works.length}
        </span>
      </button>

      {/* Category Tabs */}
      {categories.map((cat) => {
        const count = works.filter((w) => w.categoryId === cat.id).length;
        const isSelected = selectedCategoryId === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
              isSelected
                ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200 dark:shadow-none scale-105"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-rose-50 dark:hover:bg-zinc-700"
            }`}
          >
            {getIcon(cat.icon)}
            <span>{cat.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${isSelected ? "bg-white/20 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"}`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
