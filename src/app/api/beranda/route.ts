import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import {
  heroBanners,
  categories,
  works,
  blogPosts,
  tiktokVideos,
  shopProducts,
  socialLinks,
  shopLinks,
  settings,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await initDatabase();

    const bannersList = await db.select().from(heroBanners).where(eq(heroBanners.isActive, true));
    const categoriesList = await db.select().from(categories);
    const worksList = await db.select().from(works);
    const blogPostsList = await db.select().from(blogPosts);
    const tiktokList = await db.select().from(tiktokVideos);
    const shopProductsList = await db.select().from(shopProducts);
    const socialList = await db.select().from(socialLinks);
    const shopLinksList = await db.select().from(shopLinks);
    const siteSettings = await db.select().from(settings).where(eq(settings.id, 1));

    return NextResponse.json({
      success: true,
      data: {
        settings: siteSettings[0] || null,
        banners: bannersList,
        categories: categoriesList,
        works: worksList,
        blogPosts: blogPostsList,
        tiktokVideos: tiktokList,
        shopProducts: shopProductsList,
        socialLinks: socialList,
        shopLinks: shopLinksList,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch beranda data" },
      { status: 500 }
    );
  }
}
