import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const saved = localStorage.getItem('nomorecraft_theme');
                if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="text-zinc-900 dark:text-zinc-100 min-h-screen flex flex-col font-sans antialiased selection:bg-rose-200 selection:text-rose-900 transition-colors duration-300">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-white/10 dark:bg-black/30 backdrop-blur-[1px]">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
