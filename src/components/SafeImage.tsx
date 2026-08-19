"use client";

import React, { useState } from "react";

// Beautiful aesthetic SVG placeholder for No More Craft products
export const FALLBACK_PRODUCT_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
      <defs>
        <linearGradient id="craftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff1f2"/>
          <stop offset="50%" stop-color="#fdf2f8"/>
          <stop offset="100%" stop-color="#fce7f3"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#craftGrad)"/>
      <circle cx="400" cy="270" r="90" fill="#f43f5e" fill-opacity="0.12"/>
      <!-- Sparkle & Craft Icon -->
      <path d="M400 200 L408 245 L453 253 L408 261 L400 306 L392 261 L347 253 L392 245 Z" fill="#e11d48"/>
      <circle cx="440" cy="220" r="5" fill="#fb7185"/>
      <circle cx="360" cy="290" r="6" fill="#fb7185"/>
      <!-- Text -->
      <text x="400" y="390" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="bold" fill="#881337" text-anchor="middle">No More Craft</text>
      <text x="400" y="425" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" fill="#9f1239" text-anchor="middle" opacity="0.8">Handmade Craft &amp; Art</text>
    </svg>
  `);

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  alt,
  className = "",
  fallbackSrc = FALLBACK_PRODUCT_IMAGE,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(() => {
    if (!src || src.trim() === "") return fallbackSrc;
    return src;
  });
  const [hasError, setHasError] = useState(false);

  // Sync state if prop changes
  React.useEffect(() => {
    if (!src || src.trim() === "") {
      setImgSrc(fallbackSrc);
    } else {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      loading="lazy"
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
