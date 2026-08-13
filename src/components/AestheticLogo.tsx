"use client";

import React from "react";
import { Sparkles, Heart } from "lucide-react";

interface AestheticLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function AestheticLogo({ size = "md", className = "" }: AestheticLogoProps) {
  const sizeClasses = {
    sm: "h-8",
    md: "h-11",
    lg: "h-14",
  };

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* Cute Aesthetic Icon Badge */}
      <div className="relative">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-amber-300 p-0.5 shadow-md shadow-rose-200 group-hover:scale-108 transition-all duration-300">
          <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center relative overflow-hidden">
            {/* Sparkle background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50 opacity-80" />
            <Sparkles className="w-5 h-5 text-rose-500 relative z-10 animate-pulse" />
            <Heart className="w-2.5 h-2.5 text-pink-400 fill-pink-400 absolute top-1.5 right-1.5 z-10 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Aesthetic Text Layout */}
      <div className="flex flex-col justify-center">
        {/* Title: "no more craft" */}
        <div className="flex items-center gap-1">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-rose-600 via-pink-500 to-amber-500 bg-clip-text text-transparent group-hover:from-rose-500 group-hover:to-pink-600 transition-all font-sans">
            no more craft
          </span>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
        </div>

        {/* Subtitle: "imut • lucu • handmade" */}
        <div className="flex items-center gap-1 text-[10px] font-bold tracking-wide">
          <span className="text-pink-500">imut</span>
          <span className="w-1 h-1 rounded-full bg-rose-400 inline-block" />
          <span className="text-sky-500">lucu</span>
          <span className="w-1 h-1 rounded-full bg-amber-400 inline-block" />
          <span className="text-amber-600">handmade</span>
        </div>
      </div>
    </div>
  );
}
