import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { settings, heroBanners } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { action, data } = body;

    if (action === "UPDATE_SETTINGS") {
      await db
        .update(settings)
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
        .where(eq(settings.id, 1));

      return NextResponse.json({ success: true, message: "Settings updated successfully" });
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
    const { title, subtitle, imageUrl, buttonText, buttonLink, badgeText } = body;

    const result = await db.insert(heroBanners).values({
      title,
      subtitle,
      imageUrl,
      buttonText: buttonText || "Lihat Promo",
      buttonLink: buttonLink || "#galeri",
      isActive: true,
      badgeText: badgeText || "Promo ✨",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
