import { NextResponse } from "next/server";
import { initDatabase } from "@/db";

export async function POST(req: Request) {
  try {
    await initDatabase();
    const body = await req.json();
    const { email, password } = body;

    if (email === "admin@nomorecraft.com" && password === "admin123") {
      return NextResponse.json({
        success: true,
        user: { id: 1, email: "admin@nomorecraft.com", name: "Admin No More Craft" },
        token: "mock-jwt-token-nomorecraft-admin",
      });
    }

    return NextResponse.json({ success: false, error: "Email atau kata sandi salah" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
