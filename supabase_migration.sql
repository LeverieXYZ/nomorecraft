-- ========================================================
-- NO MORE CRAFT — SUPABASE POSTGRESQL MIGRATION & SEED SCRIPT
-- Run this script inside Supabase Dashboard -> SQL Editor
-- ========================================================

-- 1. USERS (Admin Authentication)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, email, password_hash)
VALUES (1, 'Admin NoMoreCraft', 'admin@nomorecraft.com', 'admin123')
ON CONFLICT (email) DO NOTHING;

-- 2. HERO BANNERS
CREATE TABLE IF NOT EXISTS hero_banners (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT NOT NULL,
  button_text VARCHAR(100) NOT NULL,
  button_link VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  badge_text VARCHAR(100)
);

INSERT INTO hero_banners (id, title, subtitle, image_url, button_text, button_link, is_active, badge_text)
VALUES 
(1, 'Koleksi Pastel Crochet Bunny Headband', 'Dibuat terbatas! Dapatkan bonus keychain unik setiap pembelian edisi terbatas bulan ini.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80', 'Beli di Shopee', '#belanja', TRUE, 'New Launch 🎉'),
(2, 'Custom Press-On Nail Art Aesthetic', 'Pilih desain impianmu! Ukuran presisi dan bahan gel premium yang tahan lama.', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=80', 'Pesan via WhatsApp', 'https://wa.me/6281234567890', TRUE, 'Best Seller ⭐'),
(3, 'Buket Bunga Pipe Cleaner Abadi', 'Hadiah wisuda dan ulang tahun unik yang tidak akan pernah layu.', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=1200&q=80', 'Lihat Galeri', '#galeri', TRUE, 'Gift Recommendation 🎁')
ON CONFLICT (id) DO NOTHING;

-- 3. CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  icon VARCHAR(100) NOT NULL,
  description TEXT
);

INSERT INTO categories (id, name, slug, icon, description)
VALUES 
(1, 'Nail Art', 'nail-art', 'Sparkles', 'Press-on nails kustom dengan pola hand-painted yang detail & cantik.'),
(2, 'Pipe Cleaner Craft', 'pipe-cleaner', 'Flower2', 'Buket bunga kawat kawat bulu & hiasan meja yang warna-warni.'),
(3, 'Crochet', 'crochet', 'Heart', 'Rajutan manis mulai dari gantungan kunci, bando, hingga tas mini.')
ON CONFLICT (slug) DO NOTHING;

-- 4. WORKS (Karya Kerajinan)
CREATE TABLE IF NOT EXISTS works (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  buy_link TEXT NOT NULL,
  shopee_url TEXT,
  tiktok_shop_url TEXT,
  price VARCHAR(100) NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO works (id, category_id, title, description, image_url, buy_link, shopee_url, tiktok_shop_url, price, is_sold, is_featured)
VALUES 
(1, 1, 'Coquette Pearl Press-on Nails', 'Desain serba pita dan mutiara bernuansa baby pink yang manis & girly.', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80', 'https://shopee.co.id', 'https://shopee.co.id', 'https://tiktok.com', 'Rp 65.000', FALSE, TRUE),
(2, 1, 'Emerald Cat-Eye Chrome Nails', 'Efek shimmer magnetik cat-eye hijau zamrud dengan aksen silver chrome mewah.', 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80', 'https://shopee.co.id', 'https://shopee.co.id', 'https://tiktok.com', 'Rp 75.000', FALSE, TRUE),
(3, 2, 'Sunflower & Tulip Pastel Bouquet', 'Buket bunga matahari dan tulip dari kawat bulu halus lengkap dengan pembungkus aesthetic.', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80', 'https://shopee.co.id', 'https://shopee.co.id', 'https://tiktok.com', 'Rp 89.000', FALSE, TRUE),
(4, 2, 'Cute Pipe Cleaner Desk Plant Pot', 'Pot kaktus mini imut dari kawat bulu, menghias meja belajar tanpa perlu disiram.', 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80', 'https://shopee.co.id', 'https://shopee.co.id', 'https://tiktok.com', 'Rp 45.000', FALSE, FALSE),
(5, 3, 'Strawberry Chunky Crochet Bag', 'Tas tangan rajut berbenang katun tebal dengan liontin stoberi yang menggemaskan.', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', 'https://shopee.co.id', 'https://shopee.co.id', 'https://tiktok.com', 'Rp 120.000', FALSE, TRUE),
(6, 3, 'Matcha Frog Crochet Keychain', 'Gantungan kunci katak hijau matcha imut buatan tangan 100% benang milk cotton.', 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80', 'https://shopee.co.id', 'https://shopee.co.id', 'https://tiktok.com', 'Rp 28.000', TRUE, FALSE)
ON CONFLICT (id) DO NOTHING;

-- 5. BLOG CATEGORIES
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO blog_categories (id, name, slug)
VALUES 
(1, 'Tutorial', 'tutorial'),
(2, 'Tips & Care', 'tips'),
(3, 'Craft Story', 'story')
ON CONFLICT (slug) DO NOTHING;

-- 6. BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  blog_category_id INT NOT NULL REFERENCES blog_categories(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  published_at VARCHAR(100) NOT NULL,
  read_time VARCHAR(100) NOT NULL DEFAULT '3 min baca'
);

INSERT INTO blog_posts (id, blog_category_id, title, slug, excerpt, content, cover_image_url, published_at, read_time)
VALUES 
(1, 1, 'Cara Memasang Press-On Nails Supaya Tahan Hingga 3 Minggu!', 'cara-memasang-press-on-nails-tahan-lama', 'Langkah demi langkah menyiapkan kuku asli dan mengaplikasikan lem gel jelly agar kuku palsu menempel kuat tanpa merusak kuku alami.', '# Cara Memasang Press-On Nails Tahan Lama...', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80', '10 Agustus 2026', '3 min baca'),
(2, 2, 'Tips Merawat Bunga Kawat Bulu (Pipe Cleaner) Agar Selalu Bersih & Aesthetic', 'tips-merawat-bunga-pipe-cleaner', 'Hindari air dan debu menumpuk! Ini dia trik mudah membersihkan buket pipe cleaner favoritmu.', '# Tips Merawat Buket Pipe Cleaner...', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80', '08 Agustus 2026', '2 min baca'),
(3, 3, 'Dibalik Layar No More Craft: Dari Hobi Kamar Tidur Menjadi Brand Kerajinan Pilihan', 'dibalik-layar-no-more-craft', 'Kisah di balik pembuatan setiap karya handmade dan bagaimana semangat kami membawa keceriaan untuk kamu.', '# Kisah Kami...', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', '04 Agustus 2026', '5 min baca')
ON CONFLICT (slug) DO NOTHING;

-- 7. TIKTOK VIDEOS
CREATE TABLE IF NOT EXISTS tiktok_videos (
  id SERIAL PRIMARY KEY,
  video_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  title VARCHAR(255) NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INT NOT NULL DEFAULT 0,
  thumbnail_url TEXT NOT NULL
);

INSERT INTO tiktok_videos (id, video_url, embed_url, title, is_featured, sort_order, thumbnail_url)
VALUES 
(1, 'https://www.tiktok.com/@nomorecraft/video/7300000000000000001', 'https://www.tiktok.com/embed/v2/7300000000000000001', 'Process Making Coquette Pearl Nail Art ✨ #nailart #handmade', TRUE, 1, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80'),
(2, 'https://www.tiktok.com/@nomorecraft/video/7300000000000000002', 'https://www.tiktok.com/embed/v2/7300000000000000002', 'Unboxing Buket Bunga Sunflower Pipe Cleaner 🌻 #pipecleanerflower', FALSE, 2, 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80'),
(3, 'https://www.tiktok.com/@nomorecraft/video/7300000000000000003', 'https://www.tiktok.com/embed/v2/7300000000000000003', 'Crocheting Strawberry Bag from Scratch 🍓 #crochettok #diycraft', FALSE, 3, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (id) DO NOTHING;

-- 8. SHOP PRODUCTS
CREATE TABLE IF NOT EXISTS shop_products (
  id SERIAL PRIMARY KEY,
  work_id INT REFERENCES works(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  price VARCHAR(100) NOT NULL,
  stock_status VARCHAR(100) NOT NULL DEFAULT 'Ready Stock',
  shopee_url TEXT NOT NULL,
  tiktokshop_url TEXT NOT NULL,
  image_url TEXT NOT NULL
);

INSERT INTO shop_products (id, work_id, name, price, stock_status, shopee_url, tiktokshop_url, image_url)
VALUES 
(1, 1, 'Coquette Pearl Press-on Nails', 'Rp 65.000', 'Ready Stock', 'https://shopee.co.id', 'https://tiktok.com', 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80'),
(2, 3, 'Sunflower & Tulip Pastel Bouquet', 'Rp 89.000', 'Ready Stock', 'https://shopee.co.id', 'https://tiktok.com', 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80'),
(3, 5, 'Strawberry Chunky Crochet Bag', 'Rp 120.000', 'Pre-Order', 'https://shopee.co.id', 'https://tiktok.com', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80')
ON CONFLICT (id) DO NOTHING;

-- 9. SOCIAL LINKS
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  username VARCHAR(255) NOT NULL,
  url TEXT NOT NULL
);

INSERT INTO social_links (id, platform, username, url)
VALUES 
(1, 'Instagram', '@nomorecraft', 'https://instagram.com/nomorecraft'),
(2, 'TikTok', '@nomorecraft', 'https://tiktok.com/@nomorecraft'),
(3, 'WhatsApp', '+62 812-3456-7890', 'https://wa.me/6281234567890')
ON CONFLICT (id) DO NOTHING;

-- 10. SHOP LINKS
CREATE TABLE IF NOT EXISTS shop_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  shop_name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL
);

INSERT INTO shop_links (id, platform, shop_name, url)
VALUES 
(1, 'Shopee', 'No More Craft Official', 'https://shopee.co.id/nomorecraft'),
(2, 'TikTok Shop', 'No More Craft Shop', 'https://tiktok.com/@nomorecraft/shop')
ON CONFLICT (id) DO NOTHING;

-- 11. SETTINGS
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255) NOT NULL,
  hero_title VARCHAR(255) NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  about_text TEXT NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  whatsapp_number VARCHAR(100) NOT NULL
);

INSERT INTO settings (id, site_name, tagline, hero_title, hero_subtitle, hero_image_url, about_text, owner_name, whatsapp_number)
VALUES 
(1, 'No More Craft', 'Unik, Lucu & Dibuat Spesial Sepenuh Hati', 'Kreasi Handcrafted Spesial Untuk Momen Manismu', 'Temukan koleksi Nail Art kustom, Pipe Cleaner Flowers yang tak pernah layu, dan Crochet imut karya tangan penuh kasih.', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80', 'No More Craft berawal dari kecintaan pada karya tangan yang aesthetic dan bermakna.', 'Cherish & Team', '6281234567890')
ON CONFLICT (id) DO NOTHING;

-- ========================================================
-- 12. RESET AUTO-INCREMENT SEQUENCES (CRITICAL FOR NEW INSERTS)
-- ========================================================
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM users));
SELECT setval('hero_banners_id_seq', (SELECT COALESCE(MAX(id), 1) FROM hero_banners));
SELECT setval('categories_id_seq', (SELECT COALESCE(MAX(id), 1) FROM categories));
SELECT setval('works_id_seq', (SELECT COALESCE(MAX(id), 1) FROM works));
SELECT setval('blog_categories_id_seq', (SELECT COALESCE(MAX(id), 1) FROM blog_categories));
SELECT setval('blog_posts_id_seq', (SELECT COALESCE(MAX(id), 1) FROM blog_posts));
SELECT setval('tiktok_videos_id_seq', (SELECT COALESCE(MAX(id), 1) FROM tiktok_videos));
SELECT setval('shop_products_id_seq', (SELECT COALESCE(MAX(id), 1) FROM shop_products));
SELECT setval('social_links_id_seq', (SELECT COALESCE(MAX(id), 1) FROM social_links));
SELECT setval('shop_links_id_seq', (SELECT COALESCE(MAX(id), 1) FROM shop_links));
SELECT setval('settings_id_seq', (SELECT COALESCE(MAX(id), 1) FROM settings));

-- ========================================================
-- 13. DISABLE ROW LEVEL SECURITY (RLS) FOR UNRESTRICTED CMS UPDATES
-- ========================================================
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_banners DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE works DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_videos DISABLE ROW LEVEL SECURITY;
ALTER TABLE shop_products DISABLE ROW LEVEL SECURITY;
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE shop_links DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
