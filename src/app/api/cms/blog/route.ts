import { NextResponse } from "next/server";
import { createBlogPost, deleteBlogPost } from "@/db/services";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ok = await createBlogPost(body);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const ok = await deleteBlogPost(parseInt(id, 10));
    return NextResponse.json({ success: ok, message: "Blog post deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
