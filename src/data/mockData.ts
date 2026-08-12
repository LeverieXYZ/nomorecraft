export interface HeroBanner {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  badgeText?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface Work {
  id: number;
  categoryId: number;
  categoryName: string;
  title: string;
  description: string;
  imageUrl: string;
  buyLink: string;
  shopeeUrl?: string;
  tiktokShopUrl?: string;
  price: string;
  isSold: boolean;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  blogCategoryId: number;
  categoryName: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  publishedAt: string;
  readTime: string;
}

export interface TikTokVideo {
  id: number;
  videoUrl: string;
  embedUrl: string;
  title: string;
  isFeatured: boolean;
  sortOrder: number;
  thumbnailUrl: string;
}

export interface ShopProduct {
  id: number;
  workId: number;
  name: string;
  price: string;
  stockStatus: "Ready Stock" | "Pre-Order" | "Sold Out";
  shopeeUrl: string;
  tiktokshopUrl: string;
  imageUrl: string;
}

export interface SocialLink {
  id: number;
  platform: "Instagram" | "TikTok" | "WhatsApp";
  username: string;
  url: string;
}

export interface ShopLink {
  id: number;
  platform: "Shopee" | "TikTok Shop";
  shopName: string;
  url: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  aboutText: string;
  ownerName: string;
  whatsappNumber: string;
}

export const MOCK_SETTINGS: SiteSettings = {
  siteName: "No More Craft",
  tagline: "Unik, Lucu & Dibuat Spesial Sepenuh Hati",
  heroTitle: "Kreasi Handcrafted Spesial Untuk Momen Manismu",
  heroSubtitle: "Temukan koleksi Nail Art kustom, Pipe Cleaner Flowers yang tak pernah layu, dan Crochet imut karya tangan penuh kasih.",
  heroImageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
  aboutText: "No More Craft berawal dari kecintaan pada karya tangan yang aesthetic dan bermakna. Kami percaya setiap detik yang dihabiskan untuk merangkai kerajinan memberikan jiwa tersendiri pada setiap produk.",
  ownerName: "Cherish & Team",
  whatsappNumber: "6281234567890",
};

export const MOCK_BANNERS: HeroBanner[] = [
  {
    id: 1,
    title: "Koleksi Pastel Crochet Bunny Headband",
    subtitle: "Dibuat terbatas! Dapatkan bonus keychain unik setiap pembelian edisi terbatas bulan ini.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Beli di Shopee",
    buttonLink: "#belanja",
    isActive: true,
    badgeText: "New Launch 🎉",
  },
  {
    id: 2,
    title: "Custom Press-On Nail Art Aesthetic",
    subtitle: "Pilih desain impianmu! Ukuran presisi dan bahan gel premium yang tahan lama.",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Pesan via WhatsApp",
    buttonLink: "https://wa.me/6281234567890",
    isActive: true,
    badgeText: "Best Seller ⭐",
  },
  {
    id: 3,
    title: "Buket Bunga Pipe Cleaner Abadi",
    subtitle: "Hadiah wisuda dan ulang tahun unik yang tidak akan pernah layu.",
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Lihat Galeri",
    buttonLink: "#galeri",
    isActive: true,
    badgeText: "Gift Recommendation 🎁",
  },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 1,
    name: "Nail Art",
    slug: "nail-art",
    icon: "Sparkles",
    description: "Press-on nails kustom dengan pola hand-painted yang detail & cantik.",
  },
  {
    id: 2,
    name: "Pipe Cleaner Craft",
    slug: "pipe-cleaner",
    icon: "Flower2",
    description: "Buket bunga kawat kawat bulu & hiasan meja yang warna-warni.",
  },
  {
    id: 3,
    name: "Crochet",
    slug: "crochet",
    icon: "Heart",
    description: "Rajutan manis mulai dari gantungan kunci, bando, hingga tas mini.",
  },
];

export const MOCK_WORKS: Work[] = [
  {
    id: 1,
    categoryId: 1,
    categoryName: "Nail Art",
    title: "Coquette Pearl Press-on Nails",
    description: "Desain serba pita dan mutiara bernuansa baby pink yang manis & girly.",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    buyLink: "https://shopee.co.id",
    shopeeUrl: "https://shopee.co.id",
    tiktokShopUrl: "https://tiktok.com",
    price: "Rp 65.000",
    isSold: false,
    isFeatured: true,
    createdAt: "2026-08-01",
  },
  {
    id: 2,
    categoryId: 1,
    categoryName: "Nail Art",
    title: "Emerald Cat-Eye Chrome Nails",
    description: "Efek shimmer magnetik cat-eye hijau zamrud dengan aksen silver chrome mewah.",
    imageUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
    buyLink: "https://shopee.co.id",
    shopeeUrl: "https://shopee.co.id",
    tiktokShopUrl: "https://tiktok.com",
    price: "Rp 75.000",
    isSold: false,
    isFeatured: true,
    createdAt: "2026-08-05",
  },
  {
    id: 3,
    categoryId: 2,
    categoryName: "Pipe Cleaner Craft",
    title: "Sunflower & Tulip Pastel Bouquet",
    description: "Buket bunga matahari dan tulip dari kawat bulu halus lengkap dengan pembungkus aesthetic.",
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80",
    buyLink: "https://shopee.co.id",
    shopeeUrl: "https://shopee.co.id",
    tiktokShopUrl: "https://tiktok.com",
    price: "Rp 89.000",
    isSold: false,
    isFeatured: true,
    createdAt: "2026-08-02",
  },
  {
    id: 4,
    categoryId: 2,
    categoryName: "Pipe Cleaner Craft",
    title: "Cute Pipe Cleaner Desk Plant Pot",
    description: "Pot kaktus mini imut dari kawat bulu, menghias meja belajar tanpa perlu disiram.",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    buyLink: "https://shopee.co.id",
    shopeeUrl: "https://shopee.co.id",
    tiktokShopUrl: "https://tiktok.com",
    price: "Rp 45.000",
    isSold: false,
    isFeatured: false,
    createdAt: "2026-08-07",
  },
  {
    id: 5,
    categoryId: 3,
    categoryName: "Crochet",
    title: "Strawberry Chunky Crochet Bag",
    description: "Tas tangan rajut berbenang katun tebal dengan liontin stoberi yang menggemaskan.",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
    buyLink: "https://shopee.co.id",
    shopeeUrl: "https://shopee.co.id",
    tiktokShopUrl: "https://tiktok.com",
    price: "Rp 120.000",
    isSold: false,
    isFeatured: true,
    createdAt: "2026-08-03",
  },
  {
    id: 6,
    categoryId: 3,
    categoryName: "Crochet",
    title: "Matcha Frog Crochet Keychain",
    description: "Gantungan kunci katak hijau matcha imut buatan tangan 100% benang milk cotton.",
    imageUrl: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    buyLink: "https://shopee.co.id",
    shopeeUrl: "https://shopee.co.id",
    tiktokShopUrl: "https://tiktok.com",
    price: "Rp 28.000",
    isSold: true,
    isFeatured: false,
    createdAt: "2026-08-08",
  },
];

export const MOCK_BLOG_CATEGORIES: BlogCategory[] = [
  { id: 1, name: "Tutorial", slug: "tutorial" },
  { id: 2, name: "Tips & Care", slug: "tips" },
  { id: 3, name: "Craft Story", slug: "story" },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    blogCategoryId: 1,
    categoryName: "Tutorial",
    title: "Cara Memasang Press-On Nails Supaya Tahan Hingga 3 Minggu!",
    slug: "cara-memasang-press-on-nails-tahan-lama",
    excerpt: "Langkah demi langkah menyiapkan kuku asli dan mengaplikasikan lem gel jelly agar kuku palsu menempel kuat tanpa merusak kuku alami.",
    content: `
# Cara Memasang Press-On Nails Tahan Lama

Press-on nails adalah solusi praktis untuk tampil cantik instan. Supaya kuku palsu menempel sempurna:

1. **Bersihkan Kuku:** Gunakan alcohol pad untuk menghilangkan minyak alami di kuku.
2. **Dorong Kutikula:** Pakai pendorong kayu halus untuk membentuk area kuku lebih rapi.
3. **Kikir Permukaan:** Kikir perlahan permukaan kuku agar agak kasar sehingga lem merekat kuat.
4. **Pilih Ukuran Lem Gel:** Tempelkan lem jelly presisi sesuai ukuran kuku.
5. **Tekan Selama 30 Detik:** Pasang press-on nail dari sudut 45 derajat dan tekan kuat.
    `,
    coverImageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    publishedAt: "10 Agustus 2026",
    readTime: "3 min baca",
  },
  {
    id: 2,
    blogCategoryId: 2,
    categoryName: "Tips & Care",
    title: "Tips Merawat Bunga Kawat Bulu (Pipe Cleaner) Agar Selalu Bersih & Aesthetic",
    slug: "tips-merawat-bunga-pipe-cleaner",
    excerpt: "Hindari air dan debu menumpuk! Ini dia trik mudah membersihkan buket pipe cleaner favoritmu.",
    content: `
# Tips Merawat Buket Pipe Cleaner

Bunga dari kawat bulu memang abadi, namun butuh perawatan sederhana agar tetap bersih:

- **Gunakan Hairdryer Dingin:** Tiup debu halus dengan angin dingin tingkat rendah.
- **Simpan di Tempat Kering:** Jauhkan dari area lembab agar kawat di dalamnya tidak berkarat.
- **Rapikan Bentuk Kelopak:** Kawat bulu fleksibel, kamu bisa membentuk ulang kelopaknya jika agak bengkok!
    `,
    coverImageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80",
    publishedAt: "08 Agustus 2026",
    readTime: "2 min baca",
  },
  {
    id: 3,
    blogCategoryId: 3,
    categoryName: "Craft Story",
    title: "Dibalik Layar No More Craft: Dari Hobi Kamar Tidur Menjadi Brand Kerajinan Pilihan",
    slug: "dibalik-layar-no-more-craft",
    excerpt: "Kisah di balik pembuatan setiap karya handmade dan bagaimana semangat kami membawa keceriaan untuk kamu.",
    content: `
# Kisah Kami

Berawal dari kebiasaan merajut di waktu luang, kami menyadari bahwa barang buatan tangan menyimpan kehangatan khusus yang tidak dimiliki produk pabrikan massal...
    `,
    coverImageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    publishedAt: "04 Agustus 2026",
    readTime: "5 min baca",
  },
];

export const MOCK_TIKTOK_VIDEOS: TikTokVideo[] = [
  {
    id: 1,
    videoUrl: "https://www.tiktok.com/@nomorecraft/video/7300000000000000001",
    embedUrl: "https://www.tiktok.com/embed/v2/7300000000000000001",
    title: "Process Making Coquette Pearl Nail Art ✨ #nailart #handmade",
    isFeatured: true,
    sortOrder: 1,
    thumbnailUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    videoUrl: "https://www.tiktok.com/@nomorecraft/video/7300000000000000002",
    embedUrl: "https://www.tiktok.com/embed/v2/7300000000000000002",
    title: "Unboxing Buket Bunga Sunflower Pipe Cleaner 🌻 #pipecleanerflower",
    isFeatured: false,
    sortOrder: 2,
    thumbnailUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    videoUrl: "https://www.tiktok.com/@nomorecraft/video/7300000000000000003",
    embedUrl: "https://www.tiktok.com/embed/v2/7300000000000000003",
    title: "Crocheting Strawberry Bag from Scratch 🍓 #crochettok #diycraft",
    isFeatured: false,
    sortOrder: 3,
    thumbnailUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  },
];

export const MOCK_SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 1,
    workId: 1,
    name: "Coquette Pearl Press-on Nails",
    price: "Rp 65.000",
    stockStatus: "Ready Stock",
    shopeeUrl: "https://shopee.co.id",
    tiktokshopUrl: "https://tiktok.com",
    imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 2,
    workId: 3,
    name: "Sunflower & Tulip Pastel Bouquet",
    price: "Rp 89.000",
    stockStatus: "Ready Stock",
    shopeeUrl: "https://shopee.co.id",
    tiktokshopUrl: "https://tiktok.com",
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    workId: 5,
    name: "Strawberry Chunky Crochet Bag",
    price: "Rp 120.000",
    stockStatus: "Pre-Order",
    shopeeUrl: "https://shopee.co.id",
    tiktokshopUrl: "https://tiktok.com",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
  },
];

export const MOCK_SOCIAL_LINKS: SocialLink[] = [
  { id: 1, platform: "Instagram", username: "@nomorecraft", url: "https://instagram.com/nomorecraft" },
  { id: 2, platform: "TikTok", username: "@nomorecraft", url: "https://tiktok.com/@nomorecraft" },
  { id: 3, platform: "WhatsApp", username: "+62 812-3456-7890", url: "https://wa.me/6281234567890" },
];

export const MOCK_SHOP_LINKS: ShopLink[] = [
  { id: 1, platform: "Shopee", shopName: "No More Craft Official", url: "https://shopee.co.id/nomorecraft" },
  { id: 2, platform: "TikTok Shop", shopName: "No More Craft Shop", url: "https://tiktok.com/@nomorecraft/shop" },
];
