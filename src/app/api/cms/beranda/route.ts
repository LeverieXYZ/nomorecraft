import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { settings, heroBanners } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await initDatabase();
    const heroSettings = await db.select().from(settings).where(eq(settings.id, 1));
    const bannersList = await db.select().from(heroBanners);
    return NextResponse.json({
      success: true,
      settings: heroSettings[0] || null,
      banners: bannersList,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { action, data } = body;

    if (action === "UPDATE_SETTINGS") {
      await db
        .update(settings)
        .set({
          heroTitle: data.heroTitle || data.title,
          heroSubtitle: data.heroSubtitle || data.subtitle,
        })
        .where(eq(settings.id, 1));

      return NextResponse.json({ success: true, message: "Hero settings updated in database" });
    }

    if (action === "UPDATE_BANNER") {
      await db
        .update(heroBanners)
        .set({
          title: data.title,
          subtitle: data.subtitle,
          imageUrl: data.imageUrl,
          buttonText: data.buttonText,
          buttonLink: data.buttonLink,
          badgeText: data.tag || data.badgeText,
        })
        .where(eq(heroBanners.id, data.id));

      return NextResponse.json({ success: true, message: "Banner updated in database" });
    }

    if (action === "TOGGLE_BANNER") {
      await db
        .update(heroBanners)
        .set({ isActive: data.isActive })
        .where(eq(heroBanners.id, data.id));

      return NextResponse.json({ success: true, message: "Banner status updated" });
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { id, title, subtitle, imageUrl, buttonText, buttonLink, badgeText, tag } = body;

    const result = await db.insert(heroBanners).values({
      title,
      subtitle,
      imageUrl,
      buttonText: buttonText || "Lihat Detail",
      buttonLink: buttonLink || "#galeri",
      isActive: true,
      badgeText: tag || badgeText || "Promo ✨",
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await db.delete(heroBanners).where(eq(heroBanners.id, parseInt(id, 10)));
    return NextResponse.json({ success: true, message: "Banner deleted from database" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
