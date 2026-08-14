import { NextResponse } from "next/server";
import { fetchSocialLinks } from "@/db/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const links = await fetchSocialLinks();
    return NextResponse.json(
      { success: true, data: links },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
