import { NextResponse } from "next/server";
import { updateShopLink } from "@/db/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, shopName, url } = body;

    const ok = await updateShopLink(id, shopName, url);
    return NextResponse.json({ success: ok, message: "Shop link updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
