"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export default function ThemeToggle({ showLabel = false, className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`p-2 rounded-full w-9 h-9 bg-zinc-100 dark:bg-zinc-800 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${
        isDark
          ? "bg-zinc-800 text-amber-300 hover:bg-zinc-700 hover:text-amber-200 border border-zinc-700 shadow-md"
          : "bg-rose-50 text-zinc-700 hover:bg-rose-100 hover:text-zinc-900 border border-rose-100 shadow-xs"
      } ${className}`}
      aria-label={isDark ? "Ganti ke Mode Terang (Light Mode)" : "Ganti ke Mode Gelap (Dark Mode)"}
      title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-amber-300 fill-amber-300/30" />
        ) : (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 scale-100 text-amber-500 fill-amber-500/20" />
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-bold">
          {isDark ? "Mode Terang" : "Mode Gelap"}
        </span>
      )}
    </button>
  );
}
