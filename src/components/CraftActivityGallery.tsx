"use client";

import React, { useState } from "react";
import { Camera, Eye, X } from "lucide-react";

interface ActivityPhoto {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  caption: string;
}

const MOCK_ACTIVITY_PHOTOS: ActivityPhoto[] = [
  {
    id: 1,
    title: "Proses Hand-Painting Press-on Nails",
    category: "Nail Art Sesi",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
    caption: "Setiap detail garis dan motif gel digambar teliti satu per satu menggunakan kuas mikro.",
  },
  {
    id: 2,
    title: "Merangkai Bunga Pipe Cleaner",
    category: "Pipe Cleaner Craft",
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    caption: "Membentuk kawat kawat kawat bulu menjadi mahkota bunga mawar dan sunflower yang cantik.",
  },
  {
    id: 3,
    title: "Finishing & Packaging Box Buket",
    category: "Quality Control",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
    caption: "Pengecekan kualitas ketat dan pengemasan boks pita cantik agar aman tiba di tangan pemesan.",
  },
  {
    id: 4,
    title: "Rajutan Crochet Handmade",
    category: "Crochet Sesi",
    imageUrl: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80&w=800",
    caption: "Merajut benang katun pilihan menjadi gantungan kunci lucu dan aksesoris imut.",
  },
];

export default function CraftActivityGallery() {
  const [activePhoto, setActivePhoto] = useState<ActivityPhoto | null>(null);

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-xs font-bold">
          <Camera className="w-3.5 h-3.5" />
          <span>Dokumentasi Meja Kerja</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white">
          Galeri Foto Kegiatan & Proses Pengerjaan
        </h2>
        <p className="text-sm text-zinc-500">
          Suasana pembuatan pesanan sehari-hari di studio No More Craft.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_ACTIVITY_PHOTOS.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group cursor-pointer bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-rose-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
          >
            <div className="aspect-[4/3] overflow-hidden bg-rose-50 dark:bg-zinc-800 relative">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md">
                {photo.category}
              </span>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="p-3 rounded-full bg-white text-zinc-900 shadow-lg">
                  <Eye className="w-5 h-5" />
                </span>
              </div>
            </div>
            <div className="p-5 space-y-1">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-rose-600 transition-colors">
                {photo.title}
              </h4>
              <p className="text-xs text-zinc-500 line-clamp-2">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-rose-100 dark:border-zinc-800">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] bg-zinc-950">
              <img src={activePhoto.imageUrl} alt={activePhoto.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
                {activePhoto.category}
              </span>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{activePhoto.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{activePhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
