import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    await initDatabase();
    const result = await db.select().from(settings).where(eq(settings.id, 1));
    return NextResponse.json({ success: true, data: result[0] || null });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { aboutText, ownerName, whatsappNumber } = body;

    await db
      .update(settings)
      .set({
        aboutText,
        ownerName,
        whatsappNumber,
      })
      .where(eq(settings.id, 1));

    return NextResponse.json({ success: true, message: "About section updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
