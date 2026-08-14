import { NextResponse } from "next/server";
import { createWork, updateWork, deleteWork } from "@/db/services";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ok = await createWork(body);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Failed to create work in Supabase. Check server logs." }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Work created successfully" });
  } catch (error: any) {
    console.error("POST /api/cms/galeri error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    const ok = await updateWork(id, body);
    if (!ok) {
      return NextResponse.json({ success: false, error: "Failed to update work in Supabase. Check server logs." }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Work updated successfully" });
  } catch (error: any) {
    console.error("PUT /api/cms/galeri error:", error);
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

    const ok = await deleteWork(parseInt(id, 10));
    if (!ok) {
      return NextResponse.json({ success: false, error: "Failed to delete work from Supabase." }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: "Work deleted successfully" });
  } catch (error: any) {
    console.error("DELETE /api/cms/galeri error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
