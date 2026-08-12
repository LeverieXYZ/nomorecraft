import { NextResponse } from "next/server";
import { initDatabase } from "@/db";

export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({
      success: true,
      data: [
        {
          num: "01",
          title: "Pilih Karya / Produk",
          desc: "Pilih model Press-on Nails atau Buket Bunga Pipe Cleaner favoritmu di katalog.",
        },
        {
          num: "02",
          title: "Klik Marketplace / Custom WA",
          desc: "Pilih checkout di Shopee untuk promo gratis ongkir atau diskon TikTok Shop.",
        },
        {
          num: "03",
          title: "Pengemasan & Pengiriman",
          desc: "Produk dibuat 100% handmade dan dikirim aman dengan box & bubble wrap.",
        },
      ],
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    return NextResponse.json({ success: true, message: "Shopping guide updated", data: body });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
