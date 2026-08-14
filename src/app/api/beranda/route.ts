import { NextResponse } from "next/server";
import {
  fetchSettings,
  fetchHeroBanners,
  fetchCategories,
  fetchWorks,
  fetchBlogPosts,
  fetchTikTokVideos,
  fetchShopProducts,
  fetchSocialLinks,
  fetchShopLinks,
} from "@/db/services";

export async function GET() {
  try {
    const [
      siteSettings,
      bannersList,
      categoriesList,
      worksList,
      blogPostsList,
      tiktokList,
      shopProductsList,
      socialList,
      shopLinksList,
    ] = await Promise.all([
      fetchSettings(),
      fetchHeroBanners(),
      fetchCategories(),
      fetchWorks(),
      fetchBlogPosts(),
      fetchTikTokVideos(),
      fetchShopProducts(),
      fetchSocialLinks(),
      fetchShopLinks(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        settings: siteSettings,
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
