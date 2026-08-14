import { NextResponse } from "next/server";
import { createWork, updateWork, deleteWork } from "@/db/services";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ok = await createWork(body);
    return NextResponse.json({ success: ok });
  } catch (error: any) {
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
    return NextResponse.json({ success: ok, message: "Work updated" });
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

    const ok = await deleteWork(parseInt(id, 10));
    return NextResponse.json({ success: ok, message: "Work deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
