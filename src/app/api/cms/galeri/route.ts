import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { works } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { categoryId, title, description, imageUrl, buyLink, shopeeUrl, tiktokShopUrl, price, isFeatured } = body;

    const result = await db.insert(works).values({
      categoryId,
      title,
      description,
      imageUrl,
      buyLink: buyLink || "https://shopee.co.id/nomorecraft",
      shopeeUrl: shopeeUrl || "https://shopee.co.id/nomorecraft",
      tiktokShopUrl: tiktokShopUrl || "https://tiktok.com/@nomorecraft",
      price,
      isSold: false,
      isFeatured: isFeatured !== undefined ? isFeatured : true,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await db.delete(works).where(eq(works.id, parseInt(id, 10)));
    return NextResponse.json({ success: true, message: "Work deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
