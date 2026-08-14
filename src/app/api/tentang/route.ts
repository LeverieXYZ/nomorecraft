import { NextResponse } from "next/server";
import { fetchSettings, updateSettings } from "@/db/services";

export async function GET() {
  try {
    const settings = await fetchSettings();
    return NextResponse.json({ success: true, data: settings });
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
