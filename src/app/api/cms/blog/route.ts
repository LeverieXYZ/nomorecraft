import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { blogCategoryId, title, excerpt, content, coverImageUrl, readTime } = body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const publishedAt = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

    const result = await db.insert(blogPosts).values({
      blogCategoryId,
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      publishedAt,
      readTime: readTime || "3 min baca",
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

    await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id, 10)));
    return NextResponse.json({ success: true, message: "Blog post deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
