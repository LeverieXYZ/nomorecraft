import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await initDatabase();
    const { slug } = await params;

    const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));

    if (!result || result.length === 0) {
      return NextResponse.json({ success: false, error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
