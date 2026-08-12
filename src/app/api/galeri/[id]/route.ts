import { NextResponse } from "next/server";
import { db, initDatabase } from "@/db";
import { works } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await initDatabase();
    const { id } = await params;
    const workId = parseInt(id, 10);

    const result = await db.select().from(works).where(eq(works.id, workId));

    if (!result || result.length === 0) {
      return NextResponse.json({ success: false, error: "Work not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
