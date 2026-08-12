import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { tiktokVideos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { title, videoUrl, thumbnailUrl, isFeatured } = body;

    const result = await db.insert(tiktokVideos).values({
      title,
      videoUrl,
      embedUrl: videoUrl,
      thumbnailUrl: thumbnailUrl || "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800",
      isFeatured: isFeatured !== undefined ? isFeatured : false,
      sortOrder: 0,
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

    await db.delete(tiktokVideos).where(eq(tiktokVideos.id, parseInt(id, 10)));
    return NextResponse.json({ success: true, message: "TikTok video deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
