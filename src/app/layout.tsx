import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "No More Craft — Handmade Craft, Nail Art, Pipe Cleaner & Crochet",
  description: "Selamat datang di No More Craft! Jelajahi koleksi kuku palsu press-on custom, buket kawat bulu pipe cleaner abadi, dan rajutan crochet yang aesthetic dan handmade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="text-zinc-900 min-h-screen flex flex-col font-sans antialiased selection:bg-rose-200 selection:text-rose-900">
        <div className="min-h-screen flex flex-col bg-white/10 backdrop-blur-[1px]">
          {children}
        </div>
      </body>
    </html>
  );
}
