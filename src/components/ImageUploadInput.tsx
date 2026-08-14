"use client";

import React, { useRef, useState } from "react";
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check } from "lucide-react";

interface ImageUploadInputProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
}

export default function ImageUploadInput({
  label,
  value,
  onChange,
  required = true,
  placeholder = "https://images.unsplash.com/...",
}: ImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<"file" | "url">(value.startsWith("data:") ? "file" : "url");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange(result);
      }
      setIsUploading(false);
    };
    reader.onerror = (err) => {
      console.error("Error reading image file:", err);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-zinc-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        <div className="flex items-center gap-1 bg-zinc-800 p-0.5 rounded-lg border border-zinc-700">
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
              activeTab === "url"
                ? "bg-rose-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1">
              <LinkIcon className="w-3 h-3" />
              <span>URL</span>
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("file");
              fileInputRef.current?.click();
            }}
            className={`px-2 py-0.5 text-[10px] font-bold rounded-md transition-colors ${
              activeTab === "file"
                ? "bg-rose-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1">
              <Upload className="w-3 h-3" />
              <span>Upload Foto</span>
            </span>
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Active Tab View */}
      {activeTab === "url" ? (
        <div className="relative">
          <input
            type="url"
            required={required && !value}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-dashed border-zinc-600 text-sm font-semibold text-zinc-300 transition-colors"
          >
            <Upload className="w-4 h-4 text-rose-400" />
            <span>{isUploading ? "Mengunggah..." : "Pilih File Gambar dari Komputer"}</span>
          </button>
        </div>
      )}

      {/* Image Preview Container */}
      {value && (
        <div className="mt-2 relative rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 aspect-[16/9] max-h-40 flex items-center justify-center group">
          <img
            src={value}
            alt="Preview Upload"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-white bg-emerald-600 px-3 py-1 rounded-full flex items-center gap-1 shadow">
              <Check className="w-3 h-3" />
              <span>Gambar Siap Disimpan</span>
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700 shadow"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
