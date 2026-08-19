"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Work, MOCK_SETTINGS } from "@/data/mockData";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Video,
  ExternalLink,
  MessageCircle,
  PackageCheck,
  Clock,
  Ban,
  Images,
} from "lucide-react";
import ModalPortal from "./ModalPortal";
import SafeImage from "./SafeImage";

interface GalleryDetailModalProps {
  work: Work | null;
  onClose: () => void;
}

export default function GalleryDetailModal({ work, onClose }: GalleryDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Reset index when modal opens for a new work
  useEffect(() => {
    setActiveImageIndex(0);
  }, [work]);

  const images = React.useMemo(() => {
    if (!work) return [];
    if (work.images && work.images.length > 0) {
      return work.images;
    }
    return [work.imageUrl];
  }, [work]);

  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!work) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [work, onClose, prevImage, nextImage]);

  // Touch Swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      nextImage(); // Swipe left -> next image
    } else if (diff < -50) {
      prevImage(); // Swipe right -> previous image
    }
    setTouchStart(null);
  };

  if (!work) return null;

  const itemStatus = work.stockStatus || (work.isSold ? "Sold Out" : "Ready Stock");
  const shopeeLink = work.shopeeUrl || work.buyLink || "https://shopee.co.id/nomorecraft";
  const tiktokLink = work.tiktokShopUrl || "https://tiktok.com/@nomorecraft";

  return (
    <ModalPortal>
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md cursor-pointer animate-fade-in"
        onClick={onClose}
      >
        <div
          className="bg-white dark:bg-zinc-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-rose-100 dark:border-zinc-800 relative cursor-default flex flex-col justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-rose-100 dark:hover:bg-zinc-700 transition-colors shadow-md"
            aria-label="Tutup Popup"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-12 max-h-[90vh] overflow-y-auto">
            {/* Left Column: Carousel Image Area */}
            <div className="sm:col-span-6 bg-rose-50/50 dark:bg-zinc-950 flex flex-col justify-between p-4 relative select-none">
              
              {/* Main Active Image with Swipe & Navigation */}
              <div
                className="relative aspect-square sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-900 flex items-center justify-center shadow-inner"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <SafeImage
                  key={activeImageIndex}
                  src={images[activeImageIndex]}
                  alt={`${work.title} - Foto ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain transition-all duration-300 animate-fade-in"
                />

                {/* Counter Badge */}
                {images.length > 1 && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/70 text-white backdrop-blur-md shadow-md pointer-events-none">
                    <Images className="w-3 h-3 text-rose-400" />
                    <span>
                      {activeImageIndex + 1} / {images.length}
                    </span>
                  </div>
                )}

                {/* Left/Right Carousel Nav Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-all hover:scale-110 shadow-lg"
                      aria-label="Foto Sebelumnya"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-rose-600 text-white transition-all hover:scale-110 shadow-lg"
                      aria-label="Foto Selanjutnya"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Bottom Thumbnail Strip (If multiple images) */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 pt-3 overflow-x-auto pb-1 justify-center">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIndex === idx
                          ? "border-rose-500 ring-2 ring-rose-500/40 scale-105"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <SafeImage
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Work Details & Buy Buttons */}
            <div className="sm:col-span-6 p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
                    {work.categoryName}
                  </span>

                  {itemStatus === "Ready Stock" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-300 flex items-center gap-1">
                      <PackageCheck className="w-3 h-3" />
                      <span>Ready Stock</span>
                    </span>
                  )}
                  {itemStatus === "Pre-Order" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>Pre-Order (PO)</span>
                    </span>
                  )}
                  {itemStatus === "Sold Out" && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                      <Ban className="w-3 h-3" />
                      <span>Sold Out</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-white leading-snug">
                  {work.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-h-32 overflow-y-auto">
                  {work.description}
                </p>

                {/* Price */}
                <div className="pt-1">
                  <span className="text-[10px] text-zinc-400 block font-semibold uppercase tracking-wider">
                    Harga Karya
                  </span>
                  <span className="text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                    {work.price}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t border-rose-100 dark:border-zinc-800">
                {/* Shopee Button */}
                <a
                  href={shopeeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-md transition-all hover:scale-[1.02]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Beli di Shopee</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>

                {/* TikTok Shop Button */}
                <a
                  href={tiktokLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold text-white bg-zinc-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-xl border border-zinc-700 transition-all hover:scale-[1.02]"
                >
                  <Video className="w-4 h-4 text-pink-400" />
                  <span>Beli di TikTok Shop</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto" />
                </a>

                {/* Custom Order WA Button */}
                <a
                  href={`https://wa.me/${MOCK_SETTINGS.whatsappNumber}?text=Halo%20No%20More%20Craft,%20saya%20tertarik%20dengan%20karya%20${encodeURIComponent(
                    work.title
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Tanya / Request Custom via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
