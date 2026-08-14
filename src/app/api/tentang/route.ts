import { NextResponse } from "next/server";
import { fetchSettings, updateSettings } from "@/db/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const settings = await fetchSettings();
    return NextResponse.json(
      { success: true, data: settings },
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

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const ok = await updateSettings(body);
    return NextResponse.json({ success: ok, message: "About section updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
