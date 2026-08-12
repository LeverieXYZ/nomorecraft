import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { socialLinks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { id, username, url } = body;

    await db.update(socialLinks).set({ username, url }).where(eq(socialLinks.id, id));

    return NextResponse.json({ success: true, message: "Social link updated" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
