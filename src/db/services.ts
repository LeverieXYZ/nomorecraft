import { getSupabase, db } from "./index";
import {
  MOCK_SETTINGS,
  MOCK_BANNERS,
  MOCK_CATEGORIES,
  MOCK_WORKS,
  MOCK_BLOG_CATEGORIES,
  MOCK_BLOG_POSTS,
  MOCK_TIKTOK_VIDEOS,
  MOCK_SHOP_PRODUCTS,
  MOCK_SOCIAL_LINKS,
  MOCK_SHOP_LINKS,
  SiteSettings,
  HeroBanner,
  Work,
  BlogPost,
  TikTokVideo,
  ShopProduct,
  SocialLink,
  ShopLink,
  Category,
} from "@/data/mockData";
import {
  settings as settingsTable,
  heroBanners as heroBannersTable,
  categories as categoriesTable,
  works as worksTable,
  blogCategories as blogCategoriesTable,
  blogPosts as blogPostsTable,
  tiktokVideos as tiktokVideosTable,
  shopProducts as shopProductsTable,
  socialLinks as socialLinksTable,
  shopLinks as shopLinksTable,
} from "./schema";
import { eq } from "drizzle-orm";

// ----------------------------------------------------
// SETTINGS
// ----------------------------------------------------
export async function fetchSettings(): Promise<SiteSettings> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("settings").select("*").eq("id", 1).maybeSingle();
    if (!error && data) {
      return {
        siteName: data.site_name || MOCK_SETTINGS.siteName,
        tagline: data.tagline || MOCK_SETTINGS.tagline,
        heroTitle: data.hero_title || MOCK_SETTINGS.heroTitle,
        heroSubtitle: data.hero_subtitle || MOCK_SETTINGS.heroSubtitle,
        heroImageUrl: data.hero_image_url || MOCK_SETTINGS.heroImageUrl,
        aboutText: data.about_text || MOCK_SETTINGS.aboutText,
        ownerName: data.owner_name || MOCK_SETTINGS.ownerName,
        whatsappNumber: data.whatsapp_number || MOCK_SETTINGS.whatsappNumber,
      };
    }
  }

  // Fallback to SQLite or Mock
  try {
    const res = await db.select().from(settingsTable).where(eq(settingsTable.id, 1));
    if (res && res.length > 0) {
      const s = res[0];
      return {
        siteName: s.siteName,
        tagline: s.tagline,
        heroTitle: s.heroTitle,
        heroSubtitle: s.heroSubtitle,
        heroImageUrl: s.heroImageUrl,
        aboutText: s.aboutText,
        ownerName: s.ownerName,
        whatsappNumber: s.whatsappNumber,
      };
    }
  } catch (err) {
    console.error("Error fetching settings from SQLite:", err);
  }

  return MOCK_SETTINGS;
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const payload: any = {};
    if (data.siteName !== undefined) payload.site_name = data.siteName;
    if (data.tagline !== undefined) payload.tagline = data.tagline;
    if (data.heroTitle !== undefined) payload.hero_title = data.heroTitle;
    if (data.heroSubtitle !== undefined) payload.hero_subtitle = data.heroSubtitle;
    if (data.heroImageUrl !== undefined) payload.hero_image_url = data.heroImageUrl;
    if (data.aboutText !== undefined) payload.about_text = data.aboutText;
    if (data.ownerName !== undefined) payload.owner_name = data.ownerName;
    if (data.whatsappNumber !== undefined) payload.whatsapp_number = data.whatsappNumber;

    const { error } = await supabase.from("settings").update(payload).eq("id", 1);
    if (!error) return true;
    console.error("Supabase updateSettings error:", error);
  }

  try {
    await db
      .update(settingsTable)
      .set({
        siteName: data.siteName,
        tagline: data.tagline,
        heroTitle: data.heroTitle,
        heroSubtitle: data.heroSubtitle,
        heroImageUrl: data.heroImageUrl,
        aboutText: data.aboutText,
        ownerName: data.ownerName,
        whatsappNumber: data.whatsappNumber,
      })
      .where(eq(settingsTable.id, 1));
    return true;
  } catch (err) {
    console.error("SQLite updateSettings error:", err);
    return false;
  }
}

// ----------------------------------------------------
// HERO BANNERS
// ----------------------------------------------------
export async function fetchHeroBanners(): Promise<HeroBanner[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("hero_banners").select("*").order("id", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((b: any) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        imageUrl: b.image_url,
        buttonText: b.button_text,
        buttonLink: b.button_link,
        isActive: Boolean(b.is_active),
        badgeText: b.badge_text,
        tag: b.badge_text,
      }));
    }
  }

  try {
    const res = await db.select().from(heroBannersTable);
    if (res && res.length > 0) {
      return res.map((b) => ({
        id: b.id,
        title: b.title,
        subtitle: b.subtitle,
        imageUrl: b.imageUrl,
        buttonText: b.buttonText,
        buttonLink: b.buttonLink,
        isActive: Boolean(b.isActive),
        badgeText: b.badgeText || undefined,
        tag: b.badgeText || undefined,
      }));
    }
  } catch (err) {
    console.error("Error fetching banners from SQLite:", err);
  }

  return MOCK_BANNERS;
}

export async function createHeroBanner(banner: Partial<HeroBanner>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("hero_banners").insert([
      {
        title: banner.title,
        subtitle: banner.subtitle || "",
        image_url: banner.imageUrl || (banner as any).image_url,
        button_text: banner.buttonText || (banner as any).button_text || "Lihat Detail",
        button_link: banner.buttonLink || (banner as any).button_link || "#galeri",
        is_active: banner.isActive !== undefined ? banner.isActive : true,
        badge_text: banner.badgeText || banner.tag || "Promo ✨",
      },
    ]);
    if (!error) return true;
    console.error("Supabase createHeroBanner error:", error);
  }

  try {
    await db.insert(heroBannersTable).values({
      title: banner.title!,
      subtitle: banner.subtitle || "",
      imageUrl: banner.imageUrl || (banner as any).image_url,
      buttonText: banner.buttonText || "Lihat Detail",
      buttonLink: banner.buttonLink || "#galeri",
      isActive: banner.isActive !== undefined ? banner.isActive : true,
      badgeText: banner.badgeText || banner.tag || "Promo ✨",
    });
    return true;
  } catch (err) {
    console.error("SQLite createHeroBanner error:", err);
    return false;
  }
}

export async function updateHeroBanner(id: number, banner: Partial<HeroBanner>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const payload: any = {};
    if (banner.title !== undefined) payload.title = banner.title;
    if (banner.subtitle !== undefined) payload.subtitle = banner.subtitle;
    if (banner.imageUrl || (banner as any).image_url) payload.image_url = banner.imageUrl || (banner as any).image_url;
    if (banner.buttonText || (banner as any).button_text) payload.button_text = banner.buttonText || (banner as any).button_text;
    if (banner.buttonLink || (banner as any).button_link) payload.button_link = banner.buttonLink || (banner as any).button_link;
    if (banner.isActive !== undefined) payload.is_active = banner.isActive;
    if (banner.badgeText || banner.tag) payload.badge_text = banner.badgeText || banner.tag;

    const { error } = await supabase.from("hero_banners").update(payload).eq("id", id);
    if (!error) return true;
    console.error("Supabase updateHeroBanner error:", error);
  }

  try {
    await db
      .update(heroBannersTable)
      .set({
        title: banner.title,
        subtitle: banner.subtitle,
        imageUrl: banner.imageUrl,
        buttonText: banner.buttonText,
        buttonLink: banner.buttonLink,
        isActive: banner.isActive,
        badgeText: banner.badgeText || banner.tag,
      })
      .where(eq(heroBannersTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite updateHeroBanner error:", err);
    return false;
  }
}

export async function deleteHeroBanner(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("hero_banners").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase deleteHeroBanner error:", error);
  }

  try {
    await db.delete(heroBannersTable).where(eq(heroBannersTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite deleteHeroBanner error:", err);
    return false;
  }
}

// ----------------------------------------------------
// WORKS & CATEGORIES
// ----------------------------------------------------
export async function fetchCategories(): Promise<Category[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("categories").select("*").order("id", { ascending: true });
    if (!error && data && data.length > 0) {
      return data;
    }
  }

  try {
    const res = await db.select().from(categoriesTable);
    if (res && res.length > 0) return res as Category[];
  } catch (err) {
    console.error("Error fetching categories from SQLite:", err);
  }

  return MOCK_CATEGORIES;
}

export async function fetchWorks(categoryId?: number, search?: string): Promise<Work[]> {
  const categories = await fetchCategories();
  const catMap = new Map<number, string>(categories.map((c) => [c.id, c.name]));

  const supabase = getSupabase();
  if (supabase) {
    let query = supabase.from("works").select("*").order("id", { ascending: false });
    if (categoryId) {
      query = query.eq("category_id", categoryId);
    }
    if (search) {
      query = query.ilike("title", `%${search}%`);
    }
    const { data, error } = await query;
    if (!error && data) {
      return data.map((w: any) => ({
        id: w.id,
        categoryId: w.category_id,
        categoryName: catMap.get(w.category_id) || "Kerajinan",
        title: w.title,
        description: w.description,
        imageUrl: w.image_url,
        buyLink: w.buy_link,
        shopeeUrl: w.shopee_url,
        tiktokShopUrl: w.tiktok_shop_url,
        price: w.price,
        isSold: Boolean(w.is_sold),
        isFeatured: Boolean(w.is_featured),
        createdAt: w.created_at,
      }));
    }
  }

  try {
    const res = await db.select().from(worksTable);
    if (res && res.length > 0) {
      let filtered = res;
      if (categoryId) filtered = filtered.filter((w) => w.categoryId === categoryId);
      if (search) filtered = filtered.filter((w) => w.title.toLowerCase().includes(search.toLowerCase()));

      return filtered.map((w) => ({
        id: w.id,
        categoryId: w.categoryId,
        categoryName: catMap.get(w.categoryId) || "Kerajinan",
        title: w.title,
        description: w.description,
        imageUrl: w.imageUrl,
        buyLink: w.buyLink,
        shopeeUrl: w.shopeeUrl || undefined,
        tiktokShopUrl: w.tiktokShopUrl || undefined,
        price: w.price,
        isSold: Boolean(w.isSold),
        isFeatured: Boolean(w.isFeatured),
        createdAt: w.createdAt || undefined,
      }));
    }
  } catch (err) {
    console.error("Error fetching works from SQLite:", err);
  }

  let mock = MOCK_WORKS;
  if (categoryId) mock = mock.filter((w) => w.categoryId === categoryId);
  if (search) mock = mock.filter((w) => w.title.toLowerCase().includes(search.toLowerCase()));
  return mock;
}

export async function createWork(work: Partial<Work>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("works").insert([
      {
        category_id: Number(work.categoryId) || 1,
        title: work.title,
        description: work.description || "",
        image_url: work.imageUrl || (work as any).image_url,
        buy_link: work.buyLink || work.shopeeUrl || "https://shopee.co.id/nomorecraft",
        shopee_url: work.shopeeUrl || "https://shopee.co.id/nomorecraft",
        tiktok_shop_url: work.tiktokShopUrl || "https://tiktok.com/@nomorecraft",
        price: work.price || "Rp 0",
        is_sold: Boolean(work.isSold),
        is_featured: work.isFeatured !== undefined ? Boolean(work.isFeatured) : true,
      },
    ]);
    if (!error) return true;
    console.error("Supabase createWork error:", error);
  }

  try {
    await db.insert(worksTable).values({
      categoryId: Number(work.categoryId) || 1,
      title: work.title!,
      description: work.description || "",
      imageUrl: work.imageUrl || "",
      buyLink: work.buyLink || work.shopeeUrl || "https://shopee.co.id/nomorecraft",
      shopeeUrl: work.shopeeUrl,
      tiktokShopUrl: work.tiktokShopUrl,
      price: work.price || "Rp 0",
      isSold: Boolean(work.isSold),
      isFeatured: work.isFeatured !== undefined ? Boolean(work.isFeatured) : true,
    });
    return true;
  } catch (err) {
    console.error("SQLite createWork error:", err);
    return false;
  }
}

export async function updateWork(id: number, work: Partial<Work>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const payload: any = {};
    if (work.categoryId !== undefined) payload.category_id = Number(work.categoryId);
    if (work.title !== undefined) payload.title = work.title;
    if (work.description !== undefined) payload.description = work.description;
    if (work.imageUrl || (work as any).image_url) payload.image_url = work.imageUrl || (work as any).image_url;
    if (work.buyLink) payload.buy_link = work.buyLink;
    if (work.shopeeUrl) payload.shopee_url = work.shopeeUrl;
    if (work.tiktokShopUrl) payload.tiktok_shop_url = work.tiktokShopUrl;
    if (work.price !== undefined) payload.price = work.price;
    if (work.isSold !== undefined) payload.is_sold = Boolean(work.isSold);
    if (work.isFeatured !== undefined) payload.is_featured = Boolean(work.isFeatured);

    const { error } = await supabase.from("works").update(payload).eq("id", id);
    if (!error) return true;
    console.error("Supabase updateWork error:", error);
  }

  try {
    await db
      .update(worksTable)
      .set({
        categoryId: work.categoryId !== undefined ? Number(work.categoryId) : undefined,
        title: work.title,
        description: work.description,
        imageUrl: work.imageUrl,
        buyLink: work.buyLink,
        shopeeUrl: work.shopeeUrl,
        tiktokShopUrl: work.tiktokShopUrl,
        price: work.price,
        isSold: work.isSold !== undefined ? Boolean(work.isSold) : undefined,
        isFeatured: work.isFeatured !== undefined ? Boolean(work.isFeatured) : undefined,
      })
      .where(eq(worksTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite updateWork error:", err);
    return false;
  }
}

export async function deleteWork(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("works").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase deleteWork error:", error);
  }

  try {
    await db.delete(worksTable).where(eq(worksTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite deleteWork error:", err);
    return false;
  }
}

// ----------------------------------------------------
// BLOG POSTS
// ----------------------------------------------------
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data: catData } = await supabase.from("blog_categories").select("*");
    const catMap = new Map<number, string>((catData || []).map((c: any) => [c.id, c.name]));

    const { data, error } = await supabase.from("blog_posts").select("*").order("id", { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((p: any) => ({
        id: p.id,
        blogCategoryId: p.blog_category_id,
        categoryName: catMap.get(p.blog_category_id) || "Tutorial",
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverImageUrl: p.cover_image_url,
        publishedAt: p.published_at,
        readTime: p.read_time,
      }));
    }
  }

  try {
    const res = await db.select().from(blogPostsTable);
    if (res && res.length > 0) {
      return res.map((p) => ({
        id: p.id,
        blogCategoryId: p.blogCategoryId,
        categoryName: "Tutorial",
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverImageUrl: p.coverImageUrl,
        publishedAt: p.publishedAt,
        readTime: p.readTime,
      }));
    }
  } catch (err) {
    console.error("Error fetching blog posts from SQLite:", err);
  }

  return MOCK_BLOG_POSTS;
}

export async function createBlogPost(post: Partial<BlogPost>): Promise<boolean> {
  const slug = post.slug || (post.title ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `post-${Date.now()}`);
  const publishedAt = post.publishedAt || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("blog_posts").insert([
      {
        blog_category_id: Number(post.blogCategoryId) || 1,
        title: post.title,
        slug,
        excerpt: post.excerpt || "",
        content: post.content || "",
        cover_image_url: post.coverImageUrl || (post as any).cover_image_url,
        published_at: publishedAt,
        read_time: post.readTime || "3 min baca",
      },
    ]);
    if (!error) return true;
    console.error("Supabase createBlogPost error:", error);
  }

  try {
    await db.insert(blogPostsTable).values({
      blogCategoryId: Number(post.blogCategoryId) || 1,
      title: post.title!,
      slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverImageUrl: post.coverImageUrl || "",
      publishedAt,
      readTime: post.readTime || "3 min baca",
    });
    return true;
  } catch (err) {
    console.error("SQLite createBlogPost error:", err);
    return false;
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase deleteBlogPost error:", error);
  }

  try {
    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite deleteBlogPost error:", err);
    return false;
  }
}

// ----------------------------------------------------
// TIKTOK VIDEOS
// ----------------------------------------------------
export async function fetchTikTokVideos(): Promise<TikTokVideo[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("tiktok_videos").select("*").order("id", { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((v: any) => ({
        id: v.id,
        videoUrl: v.video_url,
        embedUrl: v.embed_url,
        title: v.title,
        isFeatured: Boolean(v.is_featured),
        sortOrder: v.sort_order || 0,
        thumbnailUrl: v.thumbnail_url,
      }));
    }
  }

  try {
    const res = await db.select().from(tiktokVideosTable);
    if (res && res.length > 0) {
      return res.map((v) => ({
        id: v.id,
        videoUrl: v.videoUrl,
        embedUrl: v.embedUrl,
        title: v.title,
        isFeatured: Boolean(v.isFeatured),
        sortOrder: v.sortOrder,
        thumbnailUrl: v.thumbnailUrl,
      }));
    }
  } catch (err) {
    console.error("Error fetching tiktok videos from SQLite:", err);
  }

  return MOCK_TIKTOK_VIDEOS;
}

export async function createTikTokVideo(video: Partial<TikTokVideo>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("tiktok_videos").insert([
      {
        title: video.title,
        video_url: video.videoUrl,
        embed_url: video.embedUrl || video.videoUrl,
        thumbnail_url: video.thumbnailUrl || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
        is_featured: Boolean(video.isFeatured),
        sort_order: video.sortOrder || 0,
      },
    ]);
    if (!error) return true;
    console.error("Supabase createTikTokVideo error:", error);
  }

  try {
    await db.insert(tiktokVideosTable).values({
      title: video.title!,
      videoUrl: video.videoUrl!,
      embedUrl: video.embedUrl || video.videoUrl!,
      thumbnailUrl: video.thumbnailUrl || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
      isFeatured: Boolean(video.isFeatured),
      sortOrder: video.sortOrder || 0,
    });
    return true;
  } catch (err) {
    console.error("SQLite createTikTokVideo error:", err);
    return false;
  }
}

export async function deleteTikTokVideo(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("tiktok_videos").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase deleteTikTokVideo error:", error);
  }

  try {
    await db.delete(tiktokVideosTable).where(eq(tiktokVideosTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite deleteTikTokVideo error:", err);
    return false;
  }
}

// ----------------------------------------------------
// SOCIAL LINKS & SHOP LINKS
// ----------------------------------------------------
export async function fetchSocialLinks(): Promise<SocialLink[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("social_links").select("*").order("id", { ascending: true });
    if (!error && data && data.length > 0) return data;
  }

  try {
    const res = await db.select().from(socialLinksTable);
    if (res && res.length > 0) return res as SocialLink[];
  } catch (err) {
    console.error("Error fetching social links from SQLite:", err);
  }

  return MOCK_SOCIAL_LINKS;
}

export async function updateSocialLink(id: number, username: string, url: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("social_links").update({ username, url }).eq("id", id);
    if (!error) return true;
    console.error("Supabase updateSocialLink error:", error);
  }

  try {
    await db.update(socialLinksTable).set({ username, url }).where(eq(socialLinksTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite updateSocialLink error:", err);
    return false;
  }
}

export async function fetchShopLinks(): Promise<ShopLink[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("shop_links").select("*").order("id", { ascending: true });
    if (!error && data && data.length > 0) {
      return data.map((sl: any) => ({
        id: sl.id,
        platform: sl.platform,
        shopName: sl.shop_name,
        url: sl.url,
      }));
    }
  }

  try {
    const res = await db.select().from(shopLinksTable);
    if (res && res.length > 0) {
      return res.map((sl) => ({
        id: sl.id,
        platform: sl.platform,
        shopName: sl.shopName,
        url: sl.url,
      }));
    }
  } catch (err) {
    console.error("Error fetching shop links from SQLite:", err);
  }

  return MOCK_SHOP_LINKS;
}

export async function updateShopLink(id: number, shopName: string, url: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("shop_links").update({ shop_name: shopName, url }).eq("id", id);
    if (!error) return true;
    console.error("Supabase updateShopLink error:", error);
  }

  try {
    await db.update(shopLinksTable).set({ shopName, url }).where(eq(shopLinksTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite updateShopLink error:", err);
    return false;
  }
}

// ----------------------------------------------------
// SHOP PRODUCTS
// ----------------------------------------------------
export async function fetchShopProducts(): Promise<ShopProduct[]> {
  const supabase = getSupabase();
  if (supabase) {
    const { data, error } = await supabase.from("shop_products").select("*").order("id", { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map((sp: any) => ({
        id: sp.id,
        workId: sp.work_id,
        name: sp.name,
        price: sp.price,
        stockStatus: sp.stock_status,
        shopeeUrl: sp.shopee_url,
        tiktokshopUrl: sp.tiktokshop_url,
        imageUrl: sp.image_url,
      }));
    }
  }

  try {
    const res = await db.select().from(shopProductsTable);
    if (res && res.length > 0) {
      return res.map((sp) => ({
        id: sp.id,
        workId: sp.workId || undefined,
        name: sp.name,
        price: sp.price,
        stockStatus: sp.stockStatus,
        shopeeUrl: sp.shopeeUrl,
        tiktokshopUrl: sp.tiktokshopUrl,
        imageUrl: sp.imageUrl,
      }));
    }
  } catch (err) {
    console.error("Error fetching shop products from SQLite:", err);
  }

  return MOCK_SHOP_PRODUCTS;
}

export async function createShopProduct(product: Partial<ShopProduct>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("shop_products").insert([
      {
        work_id: product.workId || null,
        name: product.name,
        price: product.price,
        stock_status: product.stockStatus || "Ready Stock",
        shopee_url: product.shopeeUrl || "https://shopee.co.id",
        tiktokshop_url: product.tiktokshopUrl || "https://tiktok.com",
        image_url: product.imageUrl || "",
      },
    ]);
    if (!error) return true;
    console.error("Supabase createShopProduct error:", error);
  }

  try {
    await db.insert(shopProductsTable).values({
      workId: product.workId,
      name: product.name!,
      price: product.price!,
      stockStatus: product.stockStatus || "Ready Stock",
      shopeeUrl: product.shopeeUrl || "https://shopee.co.id",
      tiktokshopUrl: product.tiktokshopUrl || "https://tiktok.com",
      imageUrl: product.imageUrl || "",
    });
    return true;
  } catch (err) {
    console.error("SQLite createShopProduct error:", err);
    return false;
  }
}

export async function deleteShopProduct(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("shop_products").delete().eq("id", id);
    if (!error) return true;
    console.error("Supabase deleteShopProduct error:", error);
  }

  try {
    await db.delete(shopProductsTable).where(eq(shopProductsTable.id, id));
    return true;
  } catch (err) {
    console.error("SQLite deleteShopProduct error:", err);
    return false;
  }
}
