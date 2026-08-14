import { NextResponse } from "next/server";
import { fetchSocialLinks } from "@/db/services";

export async function GET() {
  try {
    const links = await fetchSocialLinks();
    return NextResponse.json({ success: true, data: links });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
