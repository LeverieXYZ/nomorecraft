-- ============================================================
-- Nomorecraft — Supabase Migration Script
-- ============================================================
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- This creates all required tables for the Nomorecraft CMS.
-- Safe to run multiple times.
-- ============================================================

-- 1. Settings (site configuration, hero text, about info)
CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  site_name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT NOT NULL,
  hero_image_url TEXT NOT NULL,
  about_text TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL
);

-- 2. Hero Banners (carousel slides on homepage)
CREATE TABLE IF NOT EXISTS hero_banners (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  image_url TEXT NOT NULL,
  button_text TEXT NOT NULL DEFAULT 'Lihat Detail',
  button_link TEXT NOT NULL DEFAULT '#galeri',
  is_active BOOLEAN NOT NULL DEFAULT true,
  badge_text TEXT
);

-- 3. Categories (gallery categories)
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL,
  description TEXT
);

-- 4. Works (gallery items / products)
CREATE TABLE IF NOT EXISTS works (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  buy_link TEXT NOT NULL,
  shopee_url TEXT,
  tiktok_shop_url TEXT,
  price TEXT NOT NULL,
  is_sold BOOLEAN NOT NULL DEFAULT false,
  stock_status TEXT NOT NULL DEFAULT 'Ready Stock',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Ensure stock_status column exists on existing tables
ALTER TABLE works ADD COLUMN IF NOT EXISTS stock_status TEXT DEFAULT 'Ready Stock';

-- 5. Blog Categories
CREATE TABLE IF NOT EXISTS blog_categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE
);

-- 6. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  blog_category_id INTEGER NOT NULL REFERENCES blog_categories(id),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  published_at TEXT NOT NULL,
  read_time TEXT NOT NULL DEFAULT '3 min baca'
);

-- 7. TikTok Videos
CREATE TABLE IF NOT EXISTS tiktok_videos (
  id SERIAL PRIMARY KEY,
  video_url TEXT NOT NULL,
  embed_url TEXT NOT NULL,
  title TEXT NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  thumbnail_url TEXT NOT NULL
);

-- 8. Shop Products
CREATE TABLE IF NOT EXISTS shop_products (
  id SERIAL PRIMARY KEY,
  work_id INTEGER REFERENCES works(id),
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  stock_status TEXT NOT NULL DEFAULT 'Ready Stock',
  shopee_url TEXT NOT NULL,
  tiktokshop_url TEXT NOT NULL,
  image_url TEXT NOT NULL
);

-- 9. Social Links
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  username TEXT NOT NULL,
  url TEXT NOT NULL
);

-- 10. Shop Links
CREATE TABLE IF NOT EXISTS shop_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  shop_name TEXT NOT NULL,
  url TEXT NOT NULL
);

-- ============================================================
-- Enable Row Level Security (RLS) & Add Permissive Policies
-- PostgreSQL does not support 'CREATE POLICY IF NOT EXISTS',
-- so we DROP POLICY IF EXISTS before CREATE POLICY.
-- ============================================================

-- 1. Settings
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on settings" ON settings;
CREATE POLICY "Allow all on settings" ON settings FOR ALL USING (true) WITH CHECK (true);

-- 2. Hero Banners
ALTER TABLE hero_banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on hero_banners" ON hero_banners;
CREATE POLICY "Allow all on hero_banners" ON hero_banners FOR ALL USING (true) WITH CHECK (true);

-- 3. Categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on categories" ON categories;
CREATE POLICY "Allow all on categories" ON categories FOR ALL USING (true) WITH CHECK (true);

-- 4. Works
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on works" ON works;
CREATE POLICY "Allow all on works" ON works FOR ALL USING (true) WITH CHECK (true);

-- 5. Blog Categories
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on blog_categories" ON blog_categories;
CREATE POLICY "Allow all on blog_categories" ON blog_categories FOR ALL USING (true) WITH CHECK (true);

-- 6. Blog Posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on blog_posts" ON blog_posts;
CREATE POLICY "Allow all on blog_posts" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

-- 7. TikTok Videos
ALTER TABLE tiktok_videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on tiktok_videos" ON tiktok_videos;
CREATE POLICY "Allow all on tiktok_videos" ON tiktok_videos FOR ALL USING (true) WITH CHECK (true);

-- 8. Shop Products
ALTER TABLE shop_products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on shop_products" ON shop_products;
CREATE POLICY "Allow all on shop_products" ON shop_products FOR ALL USING (true) WITH CHECK (true);

-- 9. Social Links
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on social_links" ON social_links;
CREATE POLICY "Allow all on social_links" ON social_links FOR ALL USING (true) WITH CHECK (true);

-- 10. Shop Links
ALTER TABLE shop_links ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all on shop_links" ON shop_links;
CREATE POLICY "Allow all on shop_links" ON shop_links FOR ALL USING (true) WITH CHECK (true);
