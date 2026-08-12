import { NextResponse } from "next/server";
import { initDatabase } from "@/db";

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({
      success: true,
      data: [
        {
          id: 1,
          title: "Proses Hand-Painting Press-on Nails",
          category: "Nail Art Sesi",
          imageUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800",
          caption: "Setiap detail garis dan motif gel digambar teliti satu per satu.",
        },
        {
          id: 2,
          title: "Merangkai Bunga Pipe Cleaner",
          category: "Pipe Cleaner Craft",
          imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
          caption: "Membentuk kawat kawat kawat bulu menjadi mahkota bunga mawar yang cantik.",
        },
      ],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    return NextResponse.json({ success: true, message: "Photo uploaded", data: body });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
