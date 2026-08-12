import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { shopProducts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await initDatabase();
    const products = await db.select().from(shopProducts);
    return NextResponse.json({ success: true, data: products });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { name, price, stockStatus, shopeeUrl, tiktokshopUrl, imageUrl } = body;

    const result = await db.insert(shopProducts).values({
      name,
      price,
      stockStatus: stockStatus || "Ready Stock",
      shopeeUrl,
      tiktokshopUrl,
      imageUrl,
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
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    await db.delete(shopProducts).where(eq(shopProducts.id, parseInt(id, 10)));
    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
