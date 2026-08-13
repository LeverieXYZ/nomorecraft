import { drizzle } from "drizzle-orm/libsql";
import { createClient as createLibsqlClient } from "@libsql/client";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import * as schema from "./schema";
import {
  MOCK_BANNERS,
  MOCK_CATEGORIES,
  MOCK_WORKS,
  MOCK_BLOG_CATEGORIES,
  MOCK_BLOG_POSTS,
  MOCK_TIKTOK_VIDEOS,
  MOCK_SHOP_PRODUCTS,
  MOCK_SOCIAL_LINKS,
  MOCK_SHOP_LINKS,
  MOCK_SETTINGS,
} from "@/data/mockData";

// Initialize SQLite client for local development
const libsqlClient = createLibsqlClient({
  url: process.env.DATABASE_URL || "file:sqlite.db",
});

export const db = drizzle(libsqlClient, { schema });

// Initialize Supabase Client (if SUPABASE environment variables are set)
export const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};

// Initialize database tables and seed data
export async function initDatabase() {
  try {
    await libsqlClient.executeMultiple(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS hero_banners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        image_url TEXT NOT NULL,
        button_text TEXT NOT NULL,
        button_link TEXT NOT NULL,
        is_active INTEGER NOT NULL DEFAULT 1,
        badge_text TEXT
      );

      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        icon TEXT NOT NULL,
        description TEXT
      );

      CREATE TABLE IF NOT EXISTS works (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        buy_link TEXT NOT NULL,
        shopee_url TEXT,
        tiktok_shop_url TEXT,
        price TEXT NOT NULL,
        is_sold INTEGER NOT NULL DEFAULT 0,
        is_featured INTEGER NOT NULL DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS blog_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blog_category_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image_url TEXT NOT NULL,
        published_at TEXT NOT NULL,
        read_time TEXT NOT NULL DEFAULT '3 min baca'
      );

      CREATE TABLE IF NOT EXISTS tiktok_videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        video_url TEXT NOT NULL,
        embed_url TEXT NOT NULL,
        title TEXT NOT NULL,
        is_featured INTEGER NOT NULL DEFAULT 0,
        sort_order INTEGER NOT NULL DEFAULT 0,
        thumbnail_url TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS shop_products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        work_id INTEGER,
        name TEXT NOT NULL,
        price TEXT NOT NULL,
        stock_status TEXT NOT NULL DEFAULT 'Ready Stock',
        shopee_url TEXT NOT NULL,
        tiktokshop_url TEXT NOT NULL,
        image_url TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS social_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT NOT NULL,
        username TEXT NOT NULL,
        url TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS shop_links (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        platform TEXT NOT NULL,
        shop_name TEXT NOT NULL,
        url TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        site_name TEXT NOT NULL,
        tagline TEXT NOT NULL,
        hero_title TEXT NOT NULL,
        hero_subtitle TEXT NOT NULL,
        hero_image_url TEXT NOT NULL,
        about_text TEXT NOT NULL,
        owner_name TEXT NOT NULL,
        whatsapp_number TEXT NOT NULL
      );
    `);

    const bannerCount = await libsqlClient.execute("SELECT count(*) as count FROM hero_banners");
    if (Number(bannerCount.rows[0]?.count || 0) === 0) {
      // Seed Settings
      await libsqlClient.execute({
        sql: `INSERT INTO settings (id, site_name, tagline, hero_title, hero_subtitle, hero_image_url, about_text, owner_name, whatsapp_number)
              VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          MOCK_SETTINGS.siteName,
          MOCK_SETTINGS.tagline,
          MOCK_SETTINGS.heroTitle,
          MOCK_SETTINGS.heroSubtitle,
          MOCK_SETTINGS.heroImageUrl,
          MOCK_SETTINGS.aboutText,
          MOCK_SETTINGS.ownerName,
          MOCK_SETTINGS.whatsappNumber,
        ],
      });

      // Seed Banners
      for (const b of MOCK_BANNERS) {
        await libsqlClient.execute({
          sql: `INSERT INTO hero_banners (title, subtitle, image_url, button_text, button_link, is_active, badge_text)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
          args: [b.title, b.subtitle, b.imageUrl, b.buttonText, b.buttonLink, b.isActive ? 1 : 0, b.badgeText || ""],
        });
      }

      // Seed Categories
      for (const c of MOCK_CATEGORIES) {
        await libsqlClient.execute({
          sql: `INSERT INTO categories (id, name, slug, icon, description) VALUES (?, ?, ?, ?, ?)`,
          args: [c.id, c.name, c.slug, c.icon, c.description],
        });
      }

      // Seed Works
      for (const w of MOCK_WORKS) {
        await libsqlClient.execute({
          sql: `INSERT INTO works (id, category_id, title, description, image_url, buy_link, shopee_url, tiktok_shop_url, price, is_sold, is_featured)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            w.id,
            w.categoryId,
            w.title,
            w.description,
            w.imageUrl,
            w.buyLink,
            w.shopeeUrl || "",
            w.tiktokShopUrl || "",
            w.price,
            w.isSold ? 1 : 0,
            w.isFeatured ? 1 : 0,
          ],
        });
      }

      // Seed Blog Categories
      for (const bc of MOCK_BLOG_CATEGORIES) {
        await libsqlClient.execute({
          sql: `INSERT INTO blog_categories (id, name, slug) VALUES (?, ?, ?)`,
          args: [bc.id, bc.name, bc.slug],
        });
      }

      // Seed Blog Posts
      for (const bp of MOCK_BLOG_POSTS) {
        await libsqlClient.execute({
          sql: `INSERT INTO blog_posts (id, blog_category_id, title, slug, excerpt, content, cover_image_url, published_at, read_time)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [
            bp.id,
            bp.blogCategoryId,
            bp.title,
            bp.slug,
            bp.excerpt,
            bp.content,
            bp.coverImageUrl,
            bp.publishedAt,
            bp.readTime,
          ],
        });
      }

      // Seed TikTok Videos
      for (const tv of MOCK_TIKTOK_VIDEOS) {
        await libsqlClient.execute({
          sql: `INSERT INTO tiktok_videos (id, video_url, embed_url, title, is_featured, sort_order, thumbnail_url)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
          args: [tv.id, tv.videoUrl, tv.embedUrl, tv.title, tv.isFeatured ? 1 : 0, tv.sortOrder, tv.thumbnailUrl],
        });
      }

      // Seed Shop Products
      for (const sp of MOCK_SHOP_PRODUCTS) {
        await libsqlClient.execute({
          sql: `INSERT INTO shop_products (id, work_id, name, price, stock_status, shopee_url, tiktokshop_url, image_url)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          args: [sp.id, sp.workId, sp.name, sp.price, sp.stockStatus, sp.shopeeUrl, sp.tiktokshopUrl, sp.imageUrl],
        });
      }

      // Seed Social Links
      for (const sl of MOCK_SOCIAL_LINKS) {
        await libsqlClient.execute({
          sql: `INSERT INTO social_links (id, platform, username, url) VALUES (?, ?, ?, ?)`,
          args: [sl.id, sl.platform, sl.username, sl.url],
        });
      }

      // Seed Shop Links
      for (const sl of MOCK_SHOP_LINKS) {
        await libsqlClient.execute({
          sql: `INSERT INTO shop_links (id, platform, shop_name, url) VALUES (?, ?, ?, ?)`,
          args: [sl.id, sl.platform, sl.shopName, sl.url],
        });
      }
    }
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}
