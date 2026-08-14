import { NextResponse } from "next/server";
import { updateSocialLink } from "@/db/services";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, username, url } = body;

    const ok = await updateSocialLink(id, username, url);
    return NextResponse.json({ success: ok, message: "Social link updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
