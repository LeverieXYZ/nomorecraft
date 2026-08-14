import { NextResponse } from "next/server";
import { fetchBlogPosts } from "@/db/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const blogCategoryId = searchParams.get("blogCategoryId");
    const search = searchParams.get("search");

    let posts = await fetchBlogPosts();

    if (blogCategoryId) {
      posts = posts.filter((p) => p.blogCategoryId === parseInt(blogCategoryId, 10));
    }
    if (search) {
      posts = posts.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          posts,
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
      { success: false, error: error.message || "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
