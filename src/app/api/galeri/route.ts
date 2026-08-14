import { NextResponse } from "next/server";
import { fetchWorks, fetchCategories } from "@/db/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId");
    const search = searchParams.get("search");

    const [allWorks, allCategories] = await Promise.all([
      fetchWorks(categoryId ? parseInt(categoryId, 10) : undefined, search || undefined),
      fetchCategories(),
    ]);

    return NextResponse.json(
      {
        success: true,
        data: {
          works: allWorks,
          categories: allCategories,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch gallery works" },
      { status: 500 }
    );
  }
}
