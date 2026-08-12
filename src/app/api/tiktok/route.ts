import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { tiktokVideos } from "@/db/schema";

export async function GET() {
  try {
    await initDatabase();
    const videos = await db.select().from(tiktokVideos);
    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
