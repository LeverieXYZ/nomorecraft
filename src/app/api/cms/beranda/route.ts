import { NextResponse } from "next/server";
import {
  fetchSettings,
  updateSettings,
  fetchHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
} from "@/db/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const [heroSettings, bannersList] = await Promise.all([
      fetchSettings(),
      fetchHeroBanners(),
    ]);

    return NextResponse.json(
      {
        success: true,
        settings: heroSettings,
        banners: bannersList,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/cms/beranda error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { action, data } = body;

    if (action === "UPDATE_SETTINGS") {
      const ok = await updateSettings({
        heroTitle: data.heroTitle || data.title,
        heroSubtitle: data.heroSubtitle || data.subtitle,
        siteName: data.siteName,
        tagline: data.tagline,
        aboutText: data.aboutText,
        ownerName: data.ownerName,
        whatsappNumber: data.whatsappNumber,
      });

      if (!ok) {
        return NextResponse.json({ success: false, error: "Failed to update settings in Supabase. Check server logs." }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: "Hero settings updated in database" });
    }

    if (action === "UPDATE_BANNER") {
      const ok = await updateHeroBanner(data.id, data);
      if (!ok) {
        return NextResponse.json({ success: false, error: "Failed to update banner in Supabase. Check server logs." }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: "Banner updated in database" });
    }

    if (action === "TOGGLE_BANNER") {
      const ok = await updateHeroBanner(data.id, { isActive: data.isActive });
      if (!ok) {
        return NextResponse.json({ success: false, error: "Failed to toggle banner status." }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: "Banner status updated" });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("PUT /api/cms/beranda error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ok = await createHeroBanner(body);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Failed to create banner in Supabase. Check server logs." }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Banner created successfully" });
  } catch (error: any) {
    console.error("POST /api/cms/beranda error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const ok = await deleteHeroBanner(parseInt(id, 10));
    if (!ok) {
      return NextResponse.json({ success: false, error: "Failed to delete banner from Supabase." }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Banner deleted from database" });
  } catch (error: any) {
    console.error("DELETE /api/cms/beranda error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
