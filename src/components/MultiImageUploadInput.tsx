"use client";

import React, { useRef, useState } from "react";
import { Upload, Link as LinkIcon, X, Plus, Star, Check, Image as ImageIcon } from "lucide-react";
import SafeImage from "./SafeImage";

interface MultiImageUploadInputProps {
  label?: string;
  values: string[];
  onChange: (urls: string[]) => void;
  required?: boolean;
  maxImages?: number;
}

export default function MultiImageUploadInput({
  label = "Foto Karya & Galeri",
  values = [],
  onChange,
  required = true,
  maxImages = 8,
}: MultiImageUploadInputProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [activeTab, setActiveTab] = useState<"file" | "url">("file");

  // Compress each image using HTML5 Canvas to keep data size tiny (~50KB)
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 900;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.82);
          resolve(compressedDataUrl);
        };
        img.onerror = () => reject(new Error("Gagal membaca file gambar"));
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleMultipleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const compressedList: string[] = [];
      for (let i = 0; i < files.length; i++) {
        if (values.length + compressedList.length >= maxImages) break;
        const compressed = await compressImage(files[i]);
        compressedList.push(compressed);
      }
      onChange([...values, ...compressedList]);
    } catch (err) {
      console.error("Gagal mengunggah foto:", err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAddUrl = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (values.length >= maxImages) return;

    onChange([...values, trimmed]);
    setUrlInput("");
  };

  const handleRemove = (indexToRemove: number) => {
    const updated = values.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  const handleSetCover = (indexToMakeCover: number) => {
    if (indexToMakeCover === 0) return;
    const coverItem = values[indexToMakeCover];
    const rest = values.filter((_, idx) => idx !== indexToMakeCover);
    onChange([coverItem, ...rest]);
  };

  return (
    <div className="space-y-3">
      {/* Header & Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="block text-xs font-bold text-zinc-300">
            {label} {required && <span className="text-rose-400">*</span>}
          </label>
          <span className="text-[11px] text-zinc-400 font-medium">
            ({values.length}/{maxImages} Foto)
          </span>
        </div>

        <div className="flex items-center gap-1 bg-zinc-800 p-0.5 rounded-lg border border-zinc-700">
          <button
            type="button"
            onClick={() => setActiveTab("file")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === "file"
                ? "bg-rose-500 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File (Bisa Banyak)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-colors flex items-center gap-1.5 ${
              activeTab === "url"
                ? "bg-rose-500 text-white shadow-sm"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Tambah via URL</span>
          </button>
        </div>
      </div>

      {/* Hidden File Input for Multiple Uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleMultipleFiles}
        className="hidden"
      />

      {/* Action Box based on activeTab */}
      {activeTab === "file" ? (
        <div>
          <button
            type="button"
            disabled={isUploading || values.length >= maxImages}
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-zinc-800 hover:bg-zinc-750 border-2 border-dashed border-zinc-700 hover:border-rose-500/60 text-xs font-bold text-zinc-200 transition-all hover:bg-zinc-800/80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4 text-rose-400" />
            <span>
              {isUploading
                ? "Sedang Mengompres & Memproses Foto..."
                : values.length >= maxImages
                ? `Batas Maksimal ${maxImages} Foto Tercapai`
                : "Pilih 1 atau Beberapa Foto Sekaligus dari Komputer / HP"}
            </span>
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="https://images.unsplash.com/... atau URL foto"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            className="flex-1 px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="button"
            onClick={() => handleAddUrl()}
            disabled={!urlInput.trim() || values.length >= maxImages}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>
      )}

      {/* Uploaded Photos Grid Preview */}
      {values.length > 0 ? (
        <div className="space-y-2 pt-1">
          <p className="text-[11px] text-zinc-400 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Foto pertama bertanda <b className="text-amber-400">⭐ Cover</b> akan dijadikan tampilan depan galeri. Klik &apos;Jadikan Cover&apos; untuk mengubah urutan.
            </span>
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {values.map((imgUrl, index) => {
              const isCover = index === 0;
              return (
                <div
                  key={index}
                  className={`group relative rounded-2xl overflow-hidden border transition-all ${
                    isCover
                      ? "border-amber-400 ring-2 ring-amber-400/40 bg-zinc-900 shadow-md"
                      : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"
                  }`}
                >
                  {/* Photo Container */}
                  <div className="aspect-[4/3] bg-zinc-950 relative overflow-hidden">
                    <SafeImage
                      src={imgUrl}
                      alt={`Foto #${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Cover Badge */}
                    {isCover ? (
                      <div className="absolute top-2 left-2 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-400 text-zinc-950 shadow-md">
                        <Star className="w-3 h-3 fill-zinc-950" />
                        <span>Cover Utama</span>
                      </div>
                    ) : (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                        #{index + 1}
                      </span>
                    )}

                    {/* Delete Button */}
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white shadow-md transition-transform hover:scale-110"
                      title="Hapus foto ini"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Actions Footer inside card */}
                  {!isCover && (
                    <div className="p-1.5 bg-zinc-900 border-t border-zinc-800 flex justify-center">
                      <button
                        type="button"
                        onClick={() => handleSetCover(index)}
                        className="w-full py-1 rounded-lg text-[10px] font-bold text-amber-300 hover:bg-amber-950/40 transition-colors flex items-center justify-center gap-1"
                      >
                        <Star className="w-3 h-3" />
                        <span>Jadikan Cover</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center space-y-1">
          <ImageIcon className="w-6 h-6 text-zinc-500 mx-auto" />
          <p className="text-xs text-zinc-400 font-medium">Belum ada foto yang dipilih</p>
          <p className="text-[11px] text-zinc-500">Unggah minimal 1 foto karya untuk ditampilkan di galeri.</p>
        </div>
      )}
    </div>
  );
}
