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
// AUTO-SEED HELPER (Ensures Supabase is populated)
// ----------------------------------------------------
let isAutoSeeding = false;
export async function ensureSupabaseSeeded() {
  if (isAutoSeeding) return;
  const supabase = getSupabase();
  if (!supabase) return;

  try {
    isAutoSeeding = true;
    const { data: existingSettings } = await supabase.from("settings").select("id").limit(1);
    if (!existingSettings || existingSettings.length === 0) {
      console.log("Supabase empty — auto-seeding initial data...");

      // 1. Settings
      await supabase.from("settings").upsert({
        id: 1,
        site_name: MOCK_SETTINGS.siteName,
        tagline: MOCK_SETTINGS.tagline,
        hero_title: MOCK_SETTINGS.heroTitle,
        hero_subtitle: MOCK_SETTINGS.heroSubtitle,
        hero_image_url: MOCK_SETTINGS.heroImageUrl,
        about_text: MOCK_SETTINGS.aboutText,
        owner_name: MOCK_SETTINGS.ownerName,
        whatsapp_number: MOCK_SETTINGS.whatsappNumber,
      });

      // 2. Categories
      await supabase.from("categories").upsert(
        MOCK_CATEGORIES.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          icon: c.icon,
          description: c.description,
        }))
      );

      // 3. Hero Banners
      await supabase.from("hero_banners").insert(
        MOCK_BANNERS.map((b) => ({
          title: b.title,
          subtitle: b.subtitle,
          image_url: b.imageUrl,
          button_text: b.buttonText,
          button_link: b.buttonLink,
          is_active: b.isActive,
          badge_text: b.badgeText || "Promo ✨",
        }))
      );

      // 4. Works
      await supabase.from("works").insert(
        MOCK_WORKS.map((w) => ({
          category_id: w.categoryId,
          title: w.title,
          description: w.description,
          image_url: w.imageUrl,
          buy_link: w.buyLink,
          shopee_url: w.shopeeUrl || "",
          tiktok_shop_url: w.tiktokShopUrl || "",
          price: w.price,
          is_sold: w.isSold,
          is_featured: w.isFeatured,
        }))
      );

      // 5. Blog Categories
      await supabase.from("blog_categories").upsert(
        MOCK_BLOG_CATEGORIES.map((bc) => ({
          id: bc.id,
          name: bc.name,
          slug: bc.slug,
        }))
      );

      // 6. Blog Posts
      await supabase.from("blog_posts").insert(
        MOCK_BLOG_POSTS.map((bp) => ({
          blog_category_id: bp.blogCategoryId,
          title: bp.title,
          slug: bp.slug,
          excerpt: bp.excerpt,
          content: bp.content,
          cover_image_url: bp.coverImageUrl,
          published_at: bp.publishedAt,
          read_time: bp.readTime,
        }))
      );

      // 7. TikTok Videos
      await supabase.from("tiktok_videos").insert(
        MOCK_TIKTOK_VIDEOS.map((tv) => ({
          video_url: tv.videoUrl,
          embed_url: tv.embedUrl,
          title: tv.title,
          is_featured: tv.isFeatured,
          sort_order: tv.sortOrder,
          thumbnail_url: tv.thumbnailUrl,
        }))
      );

      // 8. Shop Products
      await supabase.from("shop_products").insert(
        MOCK_SHOP_PRODUCTS.map((sp) => ({
          work_id: sp.workId,
          name: sp.name,
          price: sp.price,
          stock_status: sp.stockStatus,
          shopee_url: sp.shopeeUrl,
          tiktokshop_url: sp.tiktokshopUrl,
          image_url: sp.imageUrl,
        }))
      );

      // 9. Social Links
      await supabase.from("social_links").upsert(
        MOCK_SOCIAL_LINKS.map((sl) => ({
          id: sl.id,
          platform: sl.platform,
          username: sl.username,
          url: sl.url,
        }))
      );

      // 10. Shop Links
      await supabase.from("shop_links").upsert(
        MOCK_SHOP_LINKS.map((sl) => ({
          id: sl.id,
          platform: sl.platform,
          shop_name: sl.shopName,
          url: sl.url,
        }))
      );

      console.log("Supabase auto-seed completed successfully!");
    }
  } catch (err) {
    console.error("Auto-seed error:", err);
  } finally {
    isAutoSeeding = false;
  }
}

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
    // Auto-seed if table is empty
    ensureSupabaseSeeded();
  }

  // Fallback to SQLite (local dev only)
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
    // Ignore SQLite errors in production
  }

  return MOCK_SETTINGS;
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      // 1. Fetch existing settings row if available
      const { data: existing } = await supabase
        .from("settings")
        .select("*")
        .eq("id", 1)
        .maybeSingle();

      // 2. Build full payload guaranteeing NO NOT-NULL constraint violations
      const fullPayload = {
        id: 1,
        site_name: data.siteName ?? existing?.site_name ?? MOCK_SETTINGS.siteName,
        tagline: data.tagline ?? existing?.tagline ?? MOCK_SETTINGS.tagline,
        hero_title: data.heroTitle ?? existing?.hero_title ?? MOCK_SETTINGS.heroTitle,
        hero_subtitle: data.heroSubtitle ?? existing?.hero_subtitle ?? MOCK_SETTINGS.heroSubtitle,
        hero_image_url: data.heroImageUrl ?? existing?.hero_image_url ?? MOCK_SETTINGS.heroImageUrl,
        about_text: data.aboutText ?? existing?.about_text ?? MOCK_SETTINGS.aboutText,
        owner_name: data.ownerName ?? existing?.owner_name ?? MOCK_SETTINGS.ownerName,
        whatsapp_number: data.whatsappNumber ?? existing?.whatsapp_number ?? MOCK_SETTINGS.whatsappNumber,
      };

      console.log("Supabase updateSettings payload:", JSON.stringify(fullPayload).substring(0, 300));
      const { error } = await supabase.from("settings").upsert(fullPayload);
      if (error) {
        console.error("Supabase updateSettings error:", JSON.stringify(error));
        return false;
      }
      return true;
    } catch (err) {
      console.error("updateSettings exception:", err);
      return false;
    }
  }

  // Local dev only
  try {
    const existing = await db.select().from(settingsTable).where(eq(settingsTable.id, 1));
    if (!existing || existing.length === 0) {
      await db.insert(settingsTable).values({
        id: 1,
        siteName: data.siteName || MOCK_SETTINGS.siteName,
        tagline: data.tagline || MOCK_SETTINGS.tagline,
        heroTitle: data.heroTitle || MOCK_SETTINGS.heroTitle,
        heroSubtitle: data.heroSubtitle || MOCK_SETTINGS.heroSubtitle,
        heroImageUrl: data.heroImageUrl || MOCK_SETTINGS.heroImageUrl,
        aboutText: data.aboutText || MOCK_SETTINGS.aboutText,
        ownerName: data.ownerName || MOCK_SETTINGS.ownerName,
        whatsappNumber: data.whatsappNumber || MOCK_SETTINGS.whatsappNumber,
      });
    } else {
      await db
        .update(settingsTable)
        .set({
          siteName: data.siteName ?? existing[0].siteName,
          tagline: data.tagline ?? existing[0].tagline,
          heroTitle: data.heroTitle ?? existing[0].heroTitle,
          heroSubtitle: data.heroSubtitle ?? existing[0].heroSubtitle,
          heroImageUrl: data.heroImageUrl ?? existing[0].heroImageUrl,
          aboutText: data.aboutText ?? existing[0].aboutText,
          ownerName: data.ownerName ?? existing[0].ownerName,
          whatsappNumber: data.whatsappNumber ?? existing[0].whatsappNumber,
        })
        .where(eq(settingsTable.id, 1));
    }
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
    // Auto-seed if empty
    ensureSupabaseSeeded();
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
  } catch (err) {}

  return MOCK_BANNERS;
}

export async function createHeroBanner(banner: Partial<HeroBanner>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const insertPayload = {
      title: banner.title || "Banner Baru",
      subtitle: banner.subtitle || "",
      image_url: banner.imageUrl || (banner as any).image_url || "",
      button_text: banner.buttonText || (banner as any).button_text || "Lihat Detail",
      button_link: banner.buttonLink || (banner as any).button_link || "#galeri",
      is_active: banner.isActive !== undefined ? banner.isActive : true,
      badge_text: banner.badgeText || banner.tag || "Promo ✨",
    };

    const { error } = await supabase.from("hero_banners").insert([insertPayload]);
    if (error) {
      console.error("Supabase createHeroBanner error:", error);
      return false;
    }
    return true;
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
    return false;
  }
}

export async function updateHeroBanner(id: number, banner: Partial<HeroBanner>): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const payload: Record<string, any> = {};
    if (banner.title !== undefined) payload.title = banner.title;
    if (banner.subtitle !== undefined) payload.subtitle = banner.subtitle;
    if (banner.imageUrl !== undefined) payload.image_url = banner.imageUrl;
    else if ((banner as any).image_url !== undefined) payload.image_url = (banner as any).image_url;
    if (banner.buttonText !== undefined) payload.button_text = banner.buttonText;
    else if ((banner as any).button_text !== undefined) payload.button_text = (banner as any).button_text;
    if (banner.buttonLink !== undefined) payload.button_link = banner.buttonLink;
    else if ((banner as any).button_link !== undefined) payload.button_link = (banner as any).button_link;
    if (banner.isActive !== undefined) payload.is_active = banner.isActive;
    if (banner.badgeText !== undefined) payload.badge_text = banner.badgeText;
    else if (banner.tag !== undefined) payload.badge_text = banner.tag;

    const { error } = await supabase.from("hero_banners").update(payload).eq("id", id);
    if (error) {
      console.error("Supabase updateHeroBanner error:", error);
      return false;
    }
    return true;
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
    return false;
  }
}

export async function deleteHeroBanner(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("hero_banners").delete().eq("id", id);
    return !error;
  }

  try {
    await db.delete(heroBannersTable).where(eq(heroBannersTable.id, id));
    return true;
  } catch (err) {
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
    ensureSupabaseSeeded();
  }

  try {
    const res = await db.select().from(categoriesTable);
    if (res && res.length > 0) return res as Category[];
  } catch (err) {}

  return MOCK_CATEGORIES;
}

// Helper to encode multiple images safely into description as a universal fallback
function encodeDescriptionWithImages(desc: string, images?: string[]): string {
  const cleanDesc = (desc || "").replace(/<!--IMAGES:[\s\S]*?-->/g, "").trim();
  if (images && images.length > 0) {
    return `${cleanDesc}\n<!--IMAGES:${JSON.stringify(images)}-->`;
  }
  return cleanDesc;
}

// Helper to extract images and clean description
function extractImagesAndDescription(rawDesc: string, rawImages: any, rawImageUrl: string): { description: string; images: string[] } {
  let images: string[] = [];
  let description = rawDesc || "";

  // 1. Try column images first
  if (Array.isArray(rawImages)) {
    images = rawImages.filter(Boolean);
  } else if (typeof rawImages === "string" && rawImages.trim().startsWith("[")) {
    try {
      const parsed = JSON.parse(rawImages);
      if (Array.isArray(parsed)) images = parsed.filter(Boolean);
    } catch {}
  }

  // 2. If no images column, check description marker
  if (images.length === 0 && description.includes("<!--IMAGES:")) {
    const match = description.match(/<!--IMAGES:([\s\S]*?)-->/);
    if (match && match[1]) {
      try {
        const parsed = JSON.parse(match[1]);
        if (Array.isArray(parsed)) images = parsed.filter(Boolean);
      } catch {}
    }
  }

  // Clean description of any internal markers
  description = description.replace(/<!--IMAGES:[\s\S]*?-->/g, "").trim();

  const primaryImage = rawImageUrl || "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80";
  if (images.length === 0) {
    images = [primaryImage];
  }

  return { description, images };
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
    if (!error && data && data.length > 0) {
      return data.map((w: any) => {
        const isSoldBool = Boolean(w.is_sold);
        const resolvedStatus = (w.stock_status || (isSoldBool ? "Sold Out" : "Ready Stock")) as "Ready Stock" | "Pre-Order" | "Sold Out";
        const { description, images } = extractImagesAndDescription(w.description, w.images, w.image_url);

        return {
          id: w.id,
          categoryId: w.category_id,
          categoryName: catMap.get(w.category_id) || "Kerajinan",
          title: w.title,
          description,
          imageUrl: images[0] || w.image_url || "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
          images,
          buyLink: w.buy_link,
          shopeeUrl: w.shopee_url,
          tiktokShopUrl: w.tiktok_shop_url,
          price: w.price,
          isSold: resolvedStatus === "Sold Out" || isSoldBool,
          stockStatus: resolvedStatus,
          isFeatured: Boolean(w.is_featured),
          createdAt: w.created_at,
        };
      });
    }
    ensureSupabaseSeeded();
  }

  try {
    const res = await db.select().from(worksTable);
    if (res && res.length > 0) {
      let filtered = res;
      if (categoryId) filtered = filtered.filter((w) => w.categoryId === categoryId);
      if (search) filtered = filtered.filter((w) => w.title.toLowerCase().includes(search.toLowerCase()));

      return filtered.map((w) => {
        const { description, images } = extractImagesAndDescription(w.description, w.images, w.imageUrl);

        return {
          id: w.id,
          categoryId: w.categoryId,
          categoryName: catMap.get(w.categoryId) || "Kerajinan",
          title: w.title,
          description,
          imageUrl: images[0] || w.imageUrl || "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
          images,
          buyLink: w.buyLink,
          shopeeUrl: w.shopeeUrl || undefined,
          tiktokShopUrl: w.tiktokShopUrl || undefined,
          price: w.price,
          isSold: Boolean(w.isSold),
          stockStatus: (w.isSold ? "Sold Out" : "Ready Stock") as "Ready Stock" | "Pre-Order" | "Sold Out",
          isFeatured: Boolean(w.isFeatured),
          createdAt: w.createdAt || undefined,
        };
      });
    }
  } catch (err) {}

  let mock = MOCK_WORKS;
  if (categoryId) mock = mock.filter((w) => w.categoryId === categoryId);
  if (search) mock = mock.filter((w) => w.title.toLowerCase().includes(search.toLowerCase()));
  return mock;
}

export async function createWork(work: Partial<Work>): Promise<boolean> {
  const supabase = getSupabase();
  const allImages = (work.images && work.images.length > 0)
    ? work.images
    : (work.imageUrl ? [work.imageUrl] : []);
  const mainImage = allImages[0] || work.imageUrl || (work as any).image_url || "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80";
  const imagesJson = JSON.stringify(allImages.length > 0 ? allImages : [mainImage]);
  const encodedDesc = encodeDescriptionWithImages(work.description || "", allImages);

  if (supabase) {
    const catId = Number(work.categoryId) || 1;
    await supabase.from("categories").upsert({
      id: catId,
      name: work.categoryName || "Nail Art",
      slug: (work.categoryName || "nail-art").toLowerCase().replace(/\s+/g, "-"),
      icon: "✨",
      description: "Kategori kerajinan",
    });

    const isSoldFinal = work.stockStatus === "Sold Out" || Boolean(work.isSold);
    const insertPayload: Record<string, any> = {
      category_id: catId,
      title: work.title || "Karya Baru",
      description: encodedDesc,
      image_url: mainImage,
      images: imagesJson,
      buy_link: work.buyLink || work.shopeeUrl || "https://shopee.co.id/nomorecraft",
      shopee_url: work.shopeeUrl || "https://shopee.co.id/nomorecraft",
      tiktok_shop_url: work.tiktokShopUrl || "https://tiktok.com/@nomorecraft",
      price: work.price || "Rp 0",
      is_sold: isSoldFinal,
      is_featured: work.isFeatured !== undefined ? Boolean(work.isFeatured) : true,
    };

    let { error } = await supabase.from("works").insert([insertPayload]);
    if (error) {
      console.warn("Supabase createWork initial attempt error:", error.message);
      // If error is caused by missing images column, retry without images field
      if (error.message?.includes("images") || error.code === "42703" || error.code === "PGRST204") {
        delete insertPayload.images;
        const retry = await supabase.from("works").insert([insertPayload]);
        if (retry.error) {
          console.error("Supabase createWork retry error:", retry.error);
          return false;
        }
        return true;
      }
      return false;
    }
    return true;
  }

  try {
    await db.insert(worksTable).values({
      categoryId: Number(work.categoryId) || 1,
      title: work.title!,
      description: encodedDesc,
      imageUrl: mainImage,
      images: imagesJson,
      buyLink: work.buyLink || work.shopeeUrl || "https://shopee.co.id/nomorecraft",
      shopeeUrl: work.shopeeUrl,
      tiktokShopUrl: work.tiktokShopUrl,
      price: work.price || "Rp 0",
      isSold: work.stockStatus === "Sold Out" || Boolean(work.isSold),
      isFeatured: work.isFeatured !== undefined ? Boolean(work.isFeatured) : true,
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function updateWork(id: number, work: Partial<Work>): Promise<boolean> {
  const supabase = getSupabase();
  const allImages = work.images;
  const mainImage = allImages && allImages.length > 0 ? allImages[0] : work.imageUrl;

  if (supabase) {
    const payload: Record<string, any> = {};
    if (work.categoryId !== undefined) payload.category_id = Number(work.categoryId);
    if (work.title !== undefined) payload.title = work.title;
    if (work.description !== undefined || allImages !== undefined) {
      const desc = work.description !== undefined ? work.description : "";
      payload.description = encodeDescriptionWithImages(desc, allImages);
    }
    if (mainImage !== undefined) payload.image_url = mainImage;
    else if ((work as any).image_url !== undefined) payload.image_url = (work as any).image_url;
    if (allImages !== undefined) payload.images = JSON.stringify(allImages);
    if (work.buyLink !== undefined) payload.buy_link = work.buyLink;
    if (work.shopeeUrl !== undefined) payload.shopee_url = work.shopeeUrl;
    if (work.tiktokShopUrl !== undefined) payload.tiktok_shop_url = work.tiktokShopUrl;
    if (work.price !== undefined) payload.price = work.price;
    if (work.stockStatus !== undefined) {
      payload.is_sold = work.stockStatus === "Sold Out";
    } else if (work.isSold !== undefined) {
      payload.is_sold = Boolean(work.isSold);
    }
    if (work.isFeatured !== undefined) payload.is_featured = Boolean(work.isFeatured);

    let { error } = await supabase.from("works").update(payload).eq("id", id);
    if (error) {
      console.warn("Supabase updateWork initial attempt error:", error.message);
      if (error.message?.includes("images") || error.code === "42703" || error.code === "PGRST204") {
        delete payload.images;
        const retry = await supabase.from("works").update(payload).eq("id", id);
        if (retry.error) {
          console.error("Supabase updateWork retry error:", retry.error);
          return false;
        }
        return true;
      }
      return false;
    }
    return true;
  }

  try {
    const desc = work.description !== undefined ? encodeDescriptionWithImages(work.description, allImages) : undefined;
    await db
      .update(worksTable)
      .set({
        categoryId: work.categoryId !== undefined ? Number(work.categoryId) : undefined,
        title: work.title,
        description: desc,
        imageUrl: mainImage,
        images: allImages !== undefined ? JSON.stringify(allImages) : undefined,
        buyLink: work.buyLink,
        shopeeUrl: work.shopeeUrl,
        tiktokShopUrl: work.tiktokShopUrl,
        price: work.price,
        isSold: work.stockStatus !== undefined ? work.stockStatus === "Sold Out" : work.isSold !== undefined ? Boolean(work.isSold) : undefined,
        isFeatured: work.isFeatured !== undefined ? Boolean(work.isFeatured) : undefined,
      })
      .where(eq(worksTable.id, id));
    return true;
  } catch (err) {
    return false;
  }
}

export async function deleteWork(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("works").delete().eq("id", id);
    return !error;
  }

  try {
    await db.delete(worksTable).where(eq(worksTable.id, id));
    return true;
  } catch (err) {
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
    ensureSupabaseSeeded();
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
  } catch (err) {}

  return MOCK_BLOG_POSTS;
}

export async function createBlogPost(post: Partial<BlogPost>): Promise<boolean> {
  const slug = post.slug || (post.title ? post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : `post-${Date.now()}`);
  const publishedAt = post.publishedAt || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const supabase = getSupabase();
  if (supabase) {
    const catId = Number(post.blogCategoryId) || 1;
    await supabase.from("blog_categories").upsert({
      id: catId,
      name: post.categoryName || "Tutorial",
      slug: (post.categoryName || "tutorial").toLowerCase().replace(/\s+/g, "-"),
    });

    const { error } = await supabase.from("blog_posts").insert([
      {
        blog_category_id: catId,
        title: post.title,
        slug,
        excerpt: post.excerpt || "",
        content: post.content || "",
        cover_image_url: post.coverImageUrl || (post as any).cover_image_url || "",
        published_at: publishedAt,
        read_time: post.readTime || "3 min baca",
      },
    ]);
    if (error) {
      console.error("Supabase createBlogPost error:", error);
      return false;
    }
    return true;
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
    return false;
  }
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    return !error;
  }

  try {
    await db.delete(blogPostsTable).where(eq(blogPostsTable.id, id));
    return true;
  } catch (err) {
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
    ensureSupabaseSeeded();
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
  } catch (err) {}

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
    if (error) {
      console.error("Supabase createTikTokVideo error:", error);
      return false;
    }
    return true;
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
    return false;
  }
}

export async function deleteTikTokVideo(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("tiktok_videos").delete().eq("id", id);
    return !error;
  }

  try {
    await db.delete(tiktokVideosTable).where(eq(tiktokVideosTable.id, id));
    return true;
  } catch (err) {
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
    ensureSupabaseSeeded();
  }

  try {
    const res = await db.select().from(socialLinksTable);
    if (res && res.length > 0) return res as SocialLink[];
  } catch (err) {}

  return MOCK_SOCIAL_LINKS;
}

export async function updateSocialLink(id: number, username: string, url: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("social_links").upsert({ id, username, url });
    if (error) {
      console.error("Supabase updateSocialLink error:", error);
      return false;
    }
    return true;
  }

  try {
    await db.update(socialLinksTable).set({ username, url }).where(eq(socialLinksTable.id, id));
    return true;
  } catch (err) {
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
    ensureSupabaseSeeded();
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
  } catch (err) {}

  return MOCK_SHOP_LINKS;
}

export async function updateShopLink(id: number, shopName: string, url: string): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("shop_links").upsert({ id, shop_name: shopName, url });
    if (error) {
      console.error("Supabase updateShopLink error:", error);
      return false;
    }
    return true;
  }

  try {
    await db.update(shopLinksTable).set({ shopName, url }).where(eq(shopLinksTable.id, id));
    return true;
  } catch (err) {
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
    ensureSupabaseSeeded();
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
  } catch (err) {}

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
    if (error) {
      console.error("Supabase createShopProduct error:", error);
      return false;
    }
    return true;
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
    return false;
  }
}

export async function deleteShopProduct(id: number): Promise<boolean> {
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("shop_products").delete().eq("id", id);
    return !error;
  }

  try {
    await db.delete(shopProductsTable).where(eq(shopProductsTable.id, id));
    return true;
  } catch (err) {
    return false;
  }
}
