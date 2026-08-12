import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { blogPosts, blogCategories } from "@/db/schema";
import { eq, like, and } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(req.url);
    const blogCategoryId = searchParams.get("blogCategoryId");
    const search = searchParams.get("search");

    let conditions = [];

    if (blogCategoryId) {
      conditions.push(eq(blogPosts.blogCategoryId, parseInt(blogCategoryId, 10)));
    }

    if (search) {
      conditions.push(like(blogPosts.title, `%${search}%`));
    }

    let posts;
    if (conditions.length > 0) {
      posts = await db.select().from(blogPosts).where(and(...conditions));
    } else {
      posts = await db.select().from(blogPosts);
    }

    const categoriesList = await db.select().from(blogCategories);

    return NextResponse.json({
      success: true,
      data: {
        posts,
        categories: categoriesList,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
