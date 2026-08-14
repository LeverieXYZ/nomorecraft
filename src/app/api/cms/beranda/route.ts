import { NextResponse } from "next/server";
import {
  fetchSettings,
  updateSettings,
  fetchHeroBanners,
  createHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
} from "@/db/services";

export async function GET() {
  try {
    const [heroSettings, bannersList] = await Promise.all([
      fetchSettings(),
      fetchHeroBanners(),
    ]);

    return NextResponse.json({
      success: true,
      settings: heroSettings,
      banners: bannersList,
    });
  } catch (error: any) {
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

      return NextResponse.json({ success: ok, message: "Hero settings updated in database" });
    }

    if (action === "UPDATE_BANNER") {
      const ok = await updateHeroBanner(data.id, data);
      return NextResponse.json({ success: ok, message: "Banner updated in database" });
    }

    if (action === "TOGGLE_BANNER") {
      const ok = await updateHeroBanner(data.id, { isActive: data.isActive });
      return NextResponse.json({ success: ok, message: "Banner status updated" });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ok = await createHeroBanner(body);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
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
    return NextResponse.json({ success: ok, message: "Banner deleted from database" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
