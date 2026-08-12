import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { socialLinks } from "@/db/schema";

export async function GET() {
  try {
    await initDatabase();
    const links = await db.select().from(socialLinks);
    return NextResponse.json({ success: true, data: links });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
