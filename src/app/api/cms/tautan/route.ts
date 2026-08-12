import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { shopLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { id, shopName, url } = body;

    await db.update(shopLinks).set({ shopName, url }).where(eq(shopLinks.id, id));

    return NextResponse.json({ success: true, message: "Shop link updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
