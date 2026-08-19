import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// Users / Admin
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Hero Banners
export const heroBanners = sqliteTable("hero_banners", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  imageUrl: text("image_url").notNull(),
  buttonText: text("button_text").notNull(),
  buttonLink: text("button_link").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  badgeText: text("badge_text"),
});

// Categories (Galeri)
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  description: text("description"),
});

// Works (Karya Kerajinan)
export const works = sqliteTable("works", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  images: text("images"),
  buyLink: text("buy_link").notNull(),
  shopeeUrl: text("shopee_url"),
  tiktokShopUrl: text("tiktok_shop_url"),
  price: text("price").notNull(),
  isSold: integer("is_sold", { mode: "boolean" }).notNull().default(false),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

// Blog Categories
export const blogCategories = sqliteTable("blog_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
});

// Blog Posts
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  blogCategoryId: integer("blog_category_id").notNull().references(() => blogCategories.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImageUrl: text("cover_image_url").notNull(),
  publishedAt: text("published_at").notNull(),
  readTime: text("read_time").notNull().default("3 min baca"),
});

// TikTok Videos
export const tiktokVideos = sqliteTable("tiktok_videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  videoUrl: text("video_url").notNull(),
  embedUrl: text("embed_url").notNull(),
  title: text("title").notNull(),
  isFeatured: integer("is_featured", { mode: "boolean" }).notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  thumbnailUrl: text("thumbnail_url").notNull(),
});

// Shop Products
export const shopProducts = sqliteTable("shop_products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  workId: integer("work_id").references(() => works.id),
  name: text("name").notNull(),
  price: text("price").notNull(),
  stockStatus: text("stock_status").notNull().default("Ready Stock"),
  shopeeUrl: text("shopee_url").notNull(),
  tiktokshopUrl: text("tiktokshop_url").notNull(),
  imageUrl: text("image_url").notNull(),
});

// Social Links
export const socialLinks = sqliteTable("social_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  platform: text("platform").notNull(),
  username: text("username").notNull(),
  url: text("url").notNull(),
});

// Shop Links
export const shopLinks = sqliteTable("shop_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  platform: text("platform").notNull(),
  shopName: text("shop_name").notNull(),
  url: text("url").notNull(),
});

// Settings
export const settings = sqliteTable("settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  siteName: text("site_name").notNull(),
  tagline: text("tagline").notNull(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  heroImageUrl: text("hero_image_url").notNull(),
  aboutText: text("about_text").notNull(),
  ownerName: text("owner_name").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
});
