import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq, ne, and } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const excludeId = searchParams.get("excludeId");

    if (!categoryId) {
      return NextResponse.json({ success: false, error: "categoryId query parameter is required" }, { status: 400 });
    }

    let conditions = [eq(blogPosts.blogCategoryId, parseInt(categoryId, 10))];
    if (excludeId) {
      conditions.push(ne(blogPosts.id, parseInt(excludeId, 10)));
    }

    const related = await db.select().from(blogPosts).where(and(...conditions)).limit(3);

    return NextResponse.json({ success: true, data: related });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
