import { NextResponse } from "next/server";
import { fetchTikTokVideos } from "@/db/services";

export async function GET() {
  try {
    const videos = await fetchTikTokVideos();
    return NextResponse.json({ success: true, data: videos });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
