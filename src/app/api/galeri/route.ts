import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { works, categories } from "@/db/schema";
import { eq, like, and } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    await initDatabase();
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    let queryConditions = [];

    if (categoryId) {
      queryConditions.push(eq(works.categoryId, parseInt(categoryId, 10)));
    }

    if (search) {
      queryConditions.push(like(works.title, `%${search}%`));
    }

    let allWorks;
    if (queryConditions.length > 0) {
      allWorks = await db.select().from(works).where(and(...queryConditions));
    } else {
      allWorks = await db.select().from(works);
    }

    const allCategories = await db.select().from(categories);

    return NextResponse.json({
      success: true,
      data: {
        works: allWorks,
        categories: allCategories,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch gallery works" },
      { status: 500 }
    );
  }
}
