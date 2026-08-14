import { NextResponse } from "next/server";
import { getSupabase } from "@/db/index";
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
} from "@/data/mockData";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  return POST();
}

export async function POST() {
  const supabase = getSupabase();
  if (!supabase) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Supabase client not available. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
      },
      { status: 500 }
    );
  }

  const results: Record<string, string> = {};

  try {
    // 1. Settings (Upsert)
    const { error: settingsErr } = await supabase.from("settings").upsert([
      {
        id: 1,
        site_name: MOCK_SETTINGS.siteName,
        tagline: MOCK_SETTINGS.tagline,
        hero_title: MOCK_SETTINGS.heroTitle,
        hero_subtitle: MOCK_SETTINGS.heroSubtitle,
        hero_image_url: MOCK_SETTINGS.heroImageUrl,
        about_text: MOCK_SETTINGS.aboutText,
        owner_name: MOCK_SETTINGS.ownerName,
        whatsapp_number: MOCK_SETTINGS.whatsappNumber,
      },
    ]);
    results.settings = settingsErr ? `FAIL: ${settingsErr.message}` : "SEEDED ✅";

    // 2. Categories (Upsert)
    const catRows = MOCK_CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      icon: c.icon,
      description: c.description,
    }));
    const { error: catErr } = await supabase.from("categories").upsert(catRows);
    results.categories = catErr ? `FAIL: ${catErr.message}` : `SEEDED ✅ (${catRows.length} rows)`;

    // 3. Hero Banners
    const { data: existingBanners } = await supabase.from("hero_banners").select("id").limit(1);
    if (!existingBanners || existingBanners.length === 0) {
      const rows = MOCK_BANNERS.map((b) => ({
        title: b.title,
        subtitle: b.subtitle,
        image_url: b.imageUrl,
        button_text: b.buttonText,
        button_link: b.buttonLink,
        is_active: b.isActive,
        badge_text: b.badgeText || "Promo ✨",
      }));
      const { error } = await supabase.from("hero_banners").insert(rows);
      results.hero_banners = error ? `FAIL: ${error.message}` : `SEEDED ✅ (${rows.length} rows)`;
    } else {
      results.hero_banners = "ALREADY POPULATED ✅";
    }

    // 4. Works
    const { data: existingWorks } = await supabase.from("works").select("id").limit(1);
    if (!existingWorks || existingWorks.length === 0) {
      const rows = MOCK_WORKS.map((w) => ({
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
      }));
      const { error } = await supabase.from("works").insert(rows);
      results.works = error ? `FAIL: ${error.message}` : `SEEDED ✅ (${rows.length} rows)`;
    } else {
      results.works = "ALREADY POPULATED ✅";
    }

    // 5. Blog Categories
    const blogCatRows = MOCK_BLOG_CATEGORIES.map((bc) => ({
      id: bc.id,
      name: bc.name,
      slug: bc.slug,
    }));
    const { error: blogCatErr } = await supabase.from("blog_categories").upsert(blogCatRows);
    results.blog_categories = blogCatErr ? `FAIL: ${blogCatErr.message}` : `SEEDED ✅ (${blogCatRows.length} rows)`;

    // 6. Blog Posts
    const { data: existingPosts } = await supabase.from("blog_posts").select("id").limit(1);
    if (!existingPosts || existingPosts.length === 0) {
      const rows = MOCK_BLOG_POSTS.map((bp) => ({
        blog_category_id: bp.blogCategoryId,
        title: bp.title,
        slug: bp.slug,
        excerpt: bp.excerpt,
        content: bp.content,
        cover_image_url: bp.coverImageUrl,
        published_at: bp.publishedAt,
        read_time: bp.readTime,
      }));
      const { error } = await supabase.from("blog_posts").insert(rows);
      results.blog_posts = error ? `FAIL: ${error.message}` : `SEEDED ✅ (${rows.length} rows)`;
    } else {
      results.blog_posts = "ALREADY POPULATED ✅";
    }

    // 7. TikTok Videos
    const { data: existingTikTok } = await supabase.from("tiktok_videos").select("id").limit(1);
    if (!existingTikTok || existingTikTok.length === 0) {
      const rows = MOCK_TIKTOK_VIDEOS.map((tv) => ({
        video_url: tv.videoUrl,
        embed_url: tv.embedUrl,
        title: tv.title,
        is_featured: tv.isFeatured,
        sort_order: tv.sortOrder,
        thumbnail_url: tv.thumbnailUrl,
      }));
      const { error } = await supabase.from("tiktok_videos").insert(rows);
      results.tiktok_videos = error ? `FAIL: ${error.message}` : `SEEDED ✅ (${rows.length} rows)`;
    } else {
      results.tiktok_videos = "ALREADY POPULATED ✅";
    }

    // 8. Shop Products
    const { data: existingProducts } = await supabase.from("shop_products").select("id").limit(1);
    if (!existingProducts || existingProducts.length === 0) {
      const rows = MOCK_SHOP_PRODUCTS.map((sp) => ({
        work_id: sp.workId,
        name: sp.name,
        price: sp.price,
        stock_status: sp.stockStatus,
        shopee_url: sp.shopeeUrl,
        tiktokshop_url: sp.tiktokshopUrl,
        image_url: sp.imageUrl,
      }));
      const { error } = await supabase.from("shop_products").insert(rows);
      results.shop_products = error ? `FAIL: ${error.message}` : `SEEDED ✅ (${rows.length} rows)`;
    } else {
      results.shop_products = "ALREADY POPULATED ✅";
    }

    // 9. Social Links (Upsert)
    const socialRows = MOCK_SOCIAL_LINKS.map((sl) => ({
      id: sl.id,
      platform: sl.platform,
      username: sl.username,
      url: sl.url,
    }));
    const { error: socialErr } = await supabase.from("social_links").upsert(socialRows);
    results.social_links = socialErr ? `FAIL: ${socialErr.message}` : `SEEDED ✅ (${socialRows.length} rows)`;

    // 10. Shop Links (Upsert)
    const shopLinkRows = MOCK_SHOP_LINKS.map((sl) => ({
      id: sl.id,
      platform: sl.platform,
      shop_name: sl.shopName,
      url: sl.url,
    }));
    const { error: shopLinksErr } = await supabase.from("shop_links").upsert(shopLinkRows);
    results.shop_links = shopLinksErr ? `FAIL: ${shopLinksErr.message}` : `SEEDED ✅ (${shopLinkRows.length} rows)`;

    return NextResponse.json(
      {
        success: true,
        message: "Seeding finished. Check results object.",
        results,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message, results },
      { status: 500 }
    );
  }
}
