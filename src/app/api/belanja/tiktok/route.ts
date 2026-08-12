import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { shopLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await initDatabase();
    const result = await db.select().from(shopLinks).where(eq(shopLinks.platform, "TikTok Shop"));
    return NextResponse.json({ success: true, data: result[0] || null });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { shopName, url } = body;

    await db.update(shopLinks).set({ shopName, url }).where(eq(shopLinks.platform, "TikTok Shop"));

    return NextResponse.json({ success: true, message: "TikTok Shop link updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
